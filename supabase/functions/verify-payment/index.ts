
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "npm:crypto";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
        const secret = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

        if (!secret) {
            throw new Error("Razorpay secret not configured");
        }

        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return new Response(JSON.stringify({ error: "Invalid signature", success: false }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        // Update order status to paid
        const { data: orderData, error: orderError } = await supabaseClient
            .from('orders')
            .update({
                status: 'paid',
                payment_id: razorpay_payment_id, // Store the payment ID provided by Razorpay
                updated_at: new Date().toISOString()
            })
            .eq('razorpay_order_id', razorpay_order_id)
            .select()
            .single();

        if (orderError) {
            console.error("Error updating order:", orderError);
            throw orderError;
        }

        return new Response(JSON.stringify({ success: true, order: orderData }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error: any) {
        console.error("Verification Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
