
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        let razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId;
        const contentType = req.headers.get('content-type') || '';
        let isRedirectMode = false;

        // Parse Request Body (Support JSON and Form Data)
        if (contentType.includes('application/json')) {
            const jsonBody = await req.json();
            razorpay_order_id = jsonBody.razorpay_order_id;
            razorpay_payment_id = jsonBody.razorpay_payment_id;
            razorpay_signature = jsonBody.razorpay_signature;
            dbOrderId = jsonBody.dbOrderId;
        } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            razorpay_order_id = formData.get('razorpay_order_id')?.toString();
            razorpay_payment_id = formData.get('razorpay_payment_id')?.toString();
            razorpay_signature = formData.get('razorpay_signature')?.toString();
            // In redirect mode, we typically don't get dbOrderId, so we look it up.
            isRedirectMode = true;
        }

        console.log("Received verification request:", { razorpay_order_id, razorpay_payment_id, isRedirectMode });

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            throw new Error("Missing required payment details");
        }

        // 1. Verify Signature
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

        if (generated_signature !== razorpay_signature) {
            console.error("Signature verification failed");
            if (isRedirectMode) {
                return Response.redirect("https://techprojecthub.tech/payment/failed?reason=signature_mismatch", 302);
            }
            return new Response(JSON.stringify({ success: false, error: "Invalid signature" }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // 2. Fetch Order Details (if dbOrderId missing)
        let orderData = null;
        if (!dbOrderId) {
            const { data: fetchedOrder, error: fetchError } = await supabaseClient
                .from('orders')
                .select('*')
                .eq('razorpay_order_id', razorpay_order_id)
                .single();

            if (fetchError || !fetchedOrder) {
                console.error("Order not found:", fetchError);
                throw new Error("Order not found");
            }
            orderData = fetchedOrder;
            dbOrderId = orderData.id;
        } else {
            // Fetch just to be sure we have project_id
            const { data: fetchedOrder } = await supabaseClient.from('orders').select('*').eq('id', dbOrderId).single();
            orderData = fetchedOrder;
        }

        // 3. Update Order Status
        const { error: updateError } = await supabaseClient
            .from('orders')
            .update({ status: 'paid' })
            .eq('id', dbOrderId);

        if (updateError) console.error("Error updating order:", updateError);

        // 4. Record Payment
        const { error: insertError } = await supabaseClient
            .from('payments')
            .insert([{
                order_id: dbOrderId,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                status: 'successful'
            }]);

        if (insertError) console.error("Error inserting payment:", insertError);

        // 5. Assign Project (Create Download Record)
        if (orderData) {
            const { data: userData, error: userError } = await supabaseClient.auth.admin.getUserById(orderData.user_id);

            if (userData && userData.user) {
                const { error: downloadError } = await supabaseClient
                    .from('downloads')
                    .insert([{
                        project_id: orderData.project_id,
                        user_email: userData.user.email,
                        created_at: new Date().toISOString()
                    }]);

                if (downloadError) console.error("Error inserting download:", downloadError);
            }
        }

        // 6. Return Response (Redirect or JSON)
        if (isRedirectMode) {
            console.log("Redirecting to download page...");
            return Response.redirect(`https://techprojecthub.tech/download/${orderData.project_id}`, 302);
        } else {
            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

    } catch (error: any) {
        console.error("Error in verify-payment:", error);
        // In redirect mode, redirect to error page
        // We can't easily detect isRedirectMode deep here unless parsed, assuming loose handling
        // If we can't parse signature, we probably sent JSON error.
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
})
