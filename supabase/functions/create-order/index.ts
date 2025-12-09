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
        const { amount, projectId } = await req.json()

        // 1. Authenticate User
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

        if (userError || !user) {
            throw new Error("User not authenticated")
        }

        // 2. Create Order via Razorpay API (using fetch)
        const keyId = Deno.env.get('RAZORPAY_KEY_ID') ?? ''
        const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET') ?? ''

        console.log("Razorpay Key ID:", keyId ? `${keyId.substring(0, 10)}...` : 'MISSING')
        console.log("Razorpay Secret:", keySecret ? 'SET' : 'MISSING')

        const auth = btoa(`${keyId}:${keySecret}`)

        const razorpayBody = {
            amount: Math.round(amount * 100), // in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}_${user.id.slice(0, 5)}`,
            notes: {
                projectId: projectId,
                userId: user.id
            }
        }

        console.log("Calling Razorpay API with body:", JSON.stringify(razorpayBody))

        const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(razorpayBody)
        })

        console.log("Razorpay Response Status:", rzpResponse.status)

        const order = await rzpResponse.json()

        console.log("Razorpay Response Body:", JSON.stringify(order))

        if (!rzpResponse.ok) {
            console.error("Razorpay API Error - Full Response:", JSON.stringify(order))
            throw new Error(order.error?.description || JSON.stringify(order) || "Failed to create Razorpay order")
        }

        console.log("Razorpay Order Created Successfully:", order.id)

        // 3. Insert into DB (using Service Role to bypass RLS)
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { error: insertError } = await supabaseAdmin
            .from('orders')
            .insert({
                user_id: user.id,
                project_id: projectId,
                razorpay_order_id: order.id,
                amount: amount,
                status: 'created',
                currency: 'INR'
            })

        if (insertError) {
            console.error("Supabase Insert Error:", insertError)
            throw new Error("Failed to create local order record: " + insertError.message)
        }

        // 4. Return Success Response
        const responseHeaders = new Headers(corsHeaders)
        responseHeaders.set('Content-Type', 'application/json')

        return new Response(
            JSON.stringify({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                key: keyId
            }),
            {
                status: 200,
                headers: responseHeaders
            }
        )

    } catch (error) {
        console.error("Create Order Error:", error)

        const errorHeaders = new Headers(corsHeaders)
        errorHeaders.set('Content-Type', 'application/json')

        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500, // Returning 500 on failure as requested (or 400 if client error, but user said 200 or 500)
                headers: errorHeaders
            }
        )
    }
})
