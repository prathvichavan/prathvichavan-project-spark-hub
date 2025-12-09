import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay@2.9.2"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use Service Role for safe db writes
        )

        const keyId = Deno.env.get('RAZORPAY_KEY_ID');
        const keySecret = Deno.env.get('RAZORPAY_SECRET_KEY'); // As requested by user

        if (!keyId || !keySecret) {
            throw new Error("Server configuration error: Razorpay keys are missing.");
        }

        const { amount, projectId, userId } = await req.json()

        // Validate inputs
        if (!amount || !projectId) {
            throw new Error("Missing required fields: amount, projectId");
        }

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        })

        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}_${projectId.substring(0, 8)}`,
            notes: {
                projectId: projectId,
                userId: userId
            }
        }

        const order = await razorpay.orders.create(options)

        // Store order in Supabase
        const { data, error } = await supabaseClient
            .from('orders')
            .insert([
                {
                    project_id: projectId,
                    user_id: userId, // Ensure userId is passed from frontend or extracted from token
                    razorpay_order_id: order.id,
                    amount: amount,
                    status: 'created',
                    currency: order.currency
                }
            ])
            .select()
            .single()

        if (error) {
            console.error("Supabase Insert Error:", error);
            throw new Error("Failed to create local order record");
        }

        return new Response(
            JSON.stringify({
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                key: keyId,
                dbOrderId: data.id
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )
    } catch (error: any) {
        console.error("Error creating order:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
