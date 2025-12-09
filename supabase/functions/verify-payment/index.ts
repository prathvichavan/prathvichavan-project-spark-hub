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
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const body = await req.json();
        console.log("Received verification payload:", body);

        // Normalize fields from Frontend OR Webhook
        // Frontend sends: razorpay_order_id, razorpay_payment_id, razorpay_signature
        // Webhook sends: event, payload.payment.entity (payment_id, order_id)

        let r_order_id = body.razorpay_order_id || body.order_id;
        let r_payment_id = body.razorpay_payment_id || body.payment_id;
        let r_signature = body.razorpay_signature || body.signature;

        // Check if it is a Webhook event (simplified logic)
        if (body.event && body.payload?.payment?.entity) {
            console.log("Processing as Webhook Event");
            const entity = body.payload.payment.entity;
            r_order_id = entity.order_id;
            r_payment_id = entity.id;
            // Webhook verification uses a different secret and header signature (x-razorpay-signature)
            // This function currently focuses on Frontend Verification logic as per prompt primary task.
            // However, we extracted IDs if we need to blindly update.
            // For now, we proceed with the Frontend explicit verification flow.
        }

        if (!r_order_id || !r_payment_id || !r_signature) {
            throw new Error("Missing required payment fields (razorpay_payment_id, razorpay_order_id, razorpay_signature)");
        }

        const secret = Deno.env.get("RAZORPAY_KEY_SECRET");
        if (!secret) {
            throw new Error("Missing server Razorpay secret");
        }

        // Verify Signature: order_id + "|" + payment_id
        const generatedSignature = await generateHmacSha256(r_order_id + "|" + r_payment_id, secret);

        if (generatedSignature !== r_signature) {
            console.error("Signature mismatch:", { generated: generatedSignature, received: r_signature });
            // Always return 200 with error status to prevent client side generic errors
            return new Response(JSON.stringify({ status: "failure", verified: false, error: "Signature mismatch" }), {
                headers: corsHeaders,
                status: 200
            });
        }

        // Update Database
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

        const { data, error } = await supabaseAdmin
            .from("orders")
            .update({
                status: "paid",
                payment_id: r_payment_id,
                updated_at: new Date().toISOString()
            })
            .eq("razorpay_order_id", r_order_id)
            .select()
            .single();

        if (error) {
            console.error("DB Error:", error);
            return new Response(JSON.stringify({ status: "failure", verified: false, error: "Database error: " + error.message }), {
                headers: corsHeaders,
                status: 200
            });
        }

        console.log("Payment verified & DB updated:", data);

        // Return Success
        return new Response(JSON.stringify({ status: "success", verified: true, order: data }), {
            headers: corsHeaders,
            status: 200
        });

    } catch (error: any) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ status: "failure", verified: false, error: error.message }), {
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
