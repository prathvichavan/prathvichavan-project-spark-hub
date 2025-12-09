import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: new Headers(corsHeaders) })
    }

    try {
        const { orderId, paymentId, signature } = await req.json()

        // 1. Verify Signature locally
        const secret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? ''
        const text = `${orderId}|${paymentId}`;

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

        // 2. Update DB (Service Role to update secure tables)
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Update order status to paid
        const { error: updateError } = await supabaseAdmin
            .from('orders')
            .update({ status: 'paid' })
            .eq('razorpay_order_id', orderId)

        if (updateError) throw updateError

        // Fetch order details to log payment
        const { data: orderData } = await supabaseAdmin
            .from('orders')
            .select('id, user_id, amount, project_id')
            .eq('razorpay_order_id', orderId)
            .single()

        if (orderData) {
            const { error: paymentError } = await supabaseAdmin.from('payments').insert({
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

        // 3. Return Success
        const responseHeaders = new Headers(corsHeaders)
        responseHeaders.set('Content-Type', 'application/json')

        return new Response(
            JSON.stringify({ success: true, projectId: orderData?.project_id }),
            {
                status: 200,
                headers: responseHeaders
            }
        )

    } catch (error) {
        console.error("Verification Error:", error)

        const errorHeaders = new Headers(corsHeaders)
        errorHeaders.set('Content-Type', 'application/json')

        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: errorHeaders
            }
        )
    }
})
