import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHmac } from "node:crypto";
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
        const { orderId, paymentId, signature, userEmail } = await req.json();

        if (!orderId || !paymentId || !signature) {
            throw new Error("Missing required verification fields");
        }

        const secret = Deno.env.get("RAZORPAY_SECRET_KEY");
        if (!secret) throw new Error("Server configuration error: Missing Secret Key");

        // Verify Signature
        const generated_signature = createHmac("sha256", secret)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        if (generated_signature !== signature) {
            console.error("Signature verification failed");
            return new Response(
                JSON.stringify({ success: false, error: "Invalid payment signature" }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Initialize Supabase Admin Client
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // 1. Update Order Status
        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("razorpay_order_id", orderId)
            .select("id, project_id, user_id, amount")
            .single();

        if (orderError || !orderData) {
            console.error("Failed to update order:", orderError);
            throw new Error("Order not found or update failed");
        }

        const projectId = orderData.project_id;

        // Construct Download URL
        const downloadRoute = `/download/${projectId}`;

        // 2. Record Payment
        const { error: paymentError } = await supabase
            .from("payments")
            .insert({
                order_id: orderData.id,
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
                user_email: userEmail,
                amount: orderData.amount,
                status: "captured",
                user_id: orderData.user_id,
                download_url: downloadRoute
            });

        if (paymentError) {
            console.error("Payment insert error:", paymentError);
            // We still return success because the payment WAS valid and order IS paid. 
            // Just logging logic failed.
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Payment verified successfully",
                redirectUrl: downloadRoute
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );

    } catch (error: any) {
        console.error("Verification Error:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
