
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { order_id, payment_id, signature, user_id } = await req.json();

        console.log("Verifying payment:", { order_id, payment_id });

        // 1. Verify Razorpay Signature
        const secret = Deno.env.get("RAZORPAY_KEY_SECRET");
        if (!secret) {
            throw new Error("Server Error: RAZORPAY_KEY_SECRET is missing");
        }

        const generatedSignature = await generateHmacSha256(order_id + "|" + payment_id, secret);

        if (generatedSignature !== signature) {
            console.error("Signature mismatch:", { expected: generatedSignature, received: signature });
            return new Response(JSON.stringify({ verified: false, error: "Invalid payment signature" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        // 2. Update Database using SERVICE_ROLE_KEY (Bypasses RLS)
        // We use the Service Role Key because the user might not have permission to UPDATE the `status` field
        // or RLS policies might restricted. The server is trusted, so we force the update.
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '';

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        const { data, error } = await supabaseAdmin
            .from('orders')
            .update({
                status: 'paid',
                payment_id: payment_id,
                updated_at: new Date().toISOString()
            })
            .eq('razorpay_order_id', order_id)
            .select()
            .single();

        if (error) {
            console.error("Database mismatch/error:", error);
            // We return verified: false so frontend knows something went wrong, 
            // but in reality the payment IS valid. 
            // Ideally we should alert support here.
            throw new Error("Payment verified but failed to update order database: " + error.message);
        }

        console.log("Order updated successfully:", data);

        return new Response(JSON.stringify({ verified: true, order: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error: any) {
        console.error("Verification Handler Failed:", error);
        return new Response(JSON.stringify({ verified: false, error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});

// Helper for HMAC SHA256 in Deno
async function generateHmacSha256(message: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);

    // Convert ArrayBuffer to hex string
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
