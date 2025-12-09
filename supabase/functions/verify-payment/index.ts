import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { orderId, paymentId, signature } = await req.json()

        // Server-side signature verification
        const secret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? ''

        // Generate signature locally
        const text = `${orderId}|${paymentId}`;

        // HMAC SHA256 using Web Crypto API
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const message = encoder.encode(text);

        const cryptoKey = await crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const sigArrayBuffer = await crypto.subtle.sign("HMAC", cryptoKey, message);
        const sigBytes = new Uint8Array(sigArrayBuffer);
        const generated_signature = Array.from(sigBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (generated_signature !== signature) {
            console.error("Signature Mismatch: ", generated_signature, " vs ", signature)
            throw new Error("Invalid signature")
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // Update order status to paid
        const { error: updateError } = await supabaseClient
            .from('orders')
            .update({ status: 'paid' })
            .eq('razorpay_order_id', orderId)

        if (updateError) throw updateError

        // Fetch order details to log payment
        const { data: orderData } = await supabaseClient
            .from('orders')
            .select('id, user_id, amount, project_id')
            .eq('razorpay_order_id', orderId)
            .single()

        if (orderData) {
            const { error: paymentError } = await supabaseClient.from('payments').insert({
                order_id: orderData.id,
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
                user_id: orderData.user_id,
                amount: orderData.amount,
                status: 'captured'
            })
            if (paymentError) console.error("Payment log cancel", paymentError)
        }

        return new Response(
            JSON.stringify({ success: true, projectId: orderData?.project_id }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error("Verification Error:", error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
