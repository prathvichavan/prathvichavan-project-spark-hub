
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
        const { order_id, payment_id, signature, user_id, project_id } = await req.json();

        console.log("Received verification request:", { order_id, payment_id, user_id, project_id });

        // 1. Verify Razorpay Signature
        const secret = Deno.env.get("RAZORPAY_KEY_SECRET");
        if (!secret) {
            throw new Error("Server configuration error: Razorpay secret missing");
        }

        const generatedSignature = await generateHmacSha256(order_id + "|" + payment_id, secret);

        if (generatedSignature !== signature) {
            console.error("Signature verification failed", { expected: generatedSignature, received: signature });
            return new Response(JSON.stringify({ verified: false, error: "Invalid signature" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        // 2. Verified - Update Database
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        // Update existing order to 'paid'
        // We search by razorpay_order_id (which maps to order_id from client)
        const { data, error } = await supabaseClient
            .from('orders')
            .update({
                status: 'paid', // Keep 'paid' to match frontend checks in DownloadPage
                payment_id: payment_id,
                updated_at: new Date().toISOString()
            })
            .eq('razorpay_order_id', order_id)
            .eq('user_id', user_id) // Extra safety check
            .select()
            .single();

        if (error) {
            console.error("Database update error:", error);
            // Even if DB fails, payment was real. But we return false so frontend can alert user/support.
            throw error;
        }

        console.log("Payment verified and order updated:", data);

        return new Response(JSON.stringify({ verified: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error: any) {
        console.error("Verification Handler Error:", error);
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
