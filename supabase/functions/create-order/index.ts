import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "https://esm.sh/razorpay@2.9.2"
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
        const { amount, projectId } = await req.json()

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

        if (userError || !user) {
            throw new Error("User not authenticated")
        }

        const razorpay = new Razorpay({
            key_id: Deno.env.get('RAZORPAY_KEY_ID') ?? '',
            key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') ?? '',
        })

        const options = {
            amount: Math.round(amount * 100), // Razorpay amount is in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}_${user.id.slice(0, 5)}`,
            notes: {
                projectId: projectId,
                userId: user.id
            }
        }

        const order = await razorpay.orders.create(options)
        console.log("Razorpay Order Created:", order)

        // Insert into orders table
        const { error: insertError } = await supabaseClient
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
            throw new Error("Failed to create local order record")
        }

        return new Response(
            JSON.stringify({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                key: Deno.env.get('RAZORPAY_KEY_ID')
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error("Create Order Error:", error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
