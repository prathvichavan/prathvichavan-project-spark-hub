
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins to avoid CORS issues on domain change
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Use Service Role Key to bypass RLS for admin updates
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = await req.json()

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const secret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? '';

        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );
        const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
        const generated_signature = Array.from(new Uint8Array(signature))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        if (generated_signature === razorpay_signature) {
            // Update order status
            if (dbOrderId) {
                const { error: updateError } = await supabaseClient
                    .from('orders')
                    .update({ status: 'paid' })
                    .eq('id', dbOrderId)

                if (updateError) console.error("Error updating order:", updateError);
            }

            // Create payment record
            const { error: insertError } = await supabaseClient
                .from('payments')
                .insert([
                    {
                        order_id: dbOrderId,
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                        status: 'successful'
                    }
                ])

            if (insertError) {
                console.error("Error inserting payment:", insertError);
                throw insertError;
            }

            // Get order details to fetch user_id
            const { data: orderDataRel, error: orderRelError } = await supabaseClient
                .from('orders')
                .select('user_id, project_id')
                .eq('id', dbOrderId)
                .single();

            if (orderRelError) {
                console.error("Error fetching order details:", orderRelError);
            } else if (orderDataRel) {
                // Fetch user email
                const { data: userData, error: userError } = await supabaseClient.auth.admin.getUserById(orderDataRel.user_id);

                if (userError) {
                    console.error("Error fetching user:", userError);
                } else if (userData && userData.user) {
                    // Insert into downloads table
                    const { error: downloadError } = await supabaseClient
                        .from('downloads')
                        .insert([
                            {
                                project_id: orderDataRel.project_id,
                                user_email: userData.user.email,
                                created_at: new Date().toISOString()
                            }
                        ]);

                    if (downloadError) {
                        console.error("Error inserting download record:", downloadError);
                    }
                }
            }

            return new Response(
                JSON.stringify({ success: true }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200,
                }
            )
        } else {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid signature" }),
                {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 400,
                }
            )
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
