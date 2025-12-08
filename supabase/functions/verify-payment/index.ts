import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
};

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { order_id, razorpay_payment_id, razorpay_signature, user_id } = await req.json();

        console.log("Verifying payment:", { order_id, razorpay_payment_id });

        const secret = Deno.env.get("RAZORPAY_KEY_SECRET");
        if (!secret) {
            throw new Error("Missing server Razorpay secret");
        }

        const generatedSignature = await generateHmacSha256(order_id + "|" + razorpay_payment_id, secret);

        console.log("Signature comparison:", {
            generatedSignature,
            razorpay_signature,
            match: generatedSignature === razorpay_signature
        });

        if (generatedSignature !== razorpay_signature) {
            return new Response(JSON.stringify({ verified: false, error: "Signature mismatch" }), {
                headers: corsHeaders,
                status: 200
            });
        }

        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // CRITICAL FIX: Database uses 'razorpay_order_id' column, not 'order_id'
        const { data, error } = await supabaseAdmin
            .from("orders")
            .update({
                status: "paid",
                payment_id: razorpay_payment_id,
                updated_at: new Date().toISOString()
            })
            .eq("razorpay_order_id", order_id)  // Match on razorpay_order_id column
            .select()
            .single();

        if (error) {
            console.error("DB Error:", error);
            return new Response(JSON.stringify({ verified: false, error: "Database error: " + error.message }), {
                headers: corsHeaders,
                status: 200
            });
        }

        console.log("Payment verified successfully:", data);

        return new Response(JSON.stringify({ verified: true, order: data }), {
            headers: corsHeaders,
            status: 200
        });

    } catch (error: any) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ verified: false, error: error.message }), {
            headers: corsHeaders,
            status: 200
        });
    }
});

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
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
