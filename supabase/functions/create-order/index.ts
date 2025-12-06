b
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay@2.9.2"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins to avoid CORS issues on domain change
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Create a Supabase client with the Auth context of the logged in user.
        const supabaseClient = createClient(
            // Supabase API URL - env var exported by default.
            Deno.env.get('SUPABASE_URL') ?? '',
            // Supabase API ANON KEY - env var exported by default.
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            // Create client with Auth context of the user that called the function.
            // This way your row-level-security (RLS) policies are applied.
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const keyId = Deno.env.get('RAZORPAY_KEY_ID');
        const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

        if (!keyId || !keySecret) {
            console.error("Missing Razorpay Keys");
            throw new Error("Server configuration error: Razorpay keys are missing in Supabase secrets.");
        }

        const { amount, projectId } = await req.json()

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        })

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        // Get the user from the auth context
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

        if (userError || !user) {
            throw new Error("User not authenticated")
        }

        // Store in Supabase
        const { data, error } = await supabaseClient
            .from('orders')
            .insert([
                {
                    project_id: projectId,
                    user_id: user.id,
                    razorpay_order_id: order.id,
                    amount: amount,
                    status: 'created'
                }
            ])
            .select()
            .single()

        if (error) {
            console.error("Supabase Insert Error:", error);
            throw error;
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
        // Return 200 even on error so the client can read the error message easily
        // Try to extract the most useful message
        let errorMessage = "Unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else {
            try {
                errorMessage = JSON.stringify(error);
            } catch (e) {
                errorMessage = "Error object could not be stringified";
            }
        }

        return new Response(
            JSON.stringify({ error: errorMessage }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )
    }
})
