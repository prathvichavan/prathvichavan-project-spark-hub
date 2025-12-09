
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "npm:crypto";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5";

serve(async (req) => {
    try {
        const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? "";
        const body = await req.json();
        const signature = req.headers.get("x-razorpay-signature") ?? "";

        console.log("Webhook received:", { event: body.event, timestamp: new Date().toISOString() });

        const expected = crypto
            .createHmac("sha256", secret)
            .update(JSON.stringify(body))
            .digest("hex");

        if (expected !== signature) {
            console.error("Invalid signature");
            return new Response(JSON.stringify({ success: false, msg: "Invalid Signature" }), { status: 400 });
        }

        const data = body.payload.payment.entity;
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_KEY") ?? ""
        );

        // Insert payment record
        const { error: paymentError } = await supabase.from("payments").insert({
            payment_id: data.id,
            order_id: data.order_id,
            email: data.email ?? "",
            contact: data.contact ?? "",
            amount: data.amount / 100,
            status: data.status
        });

        if (paymentError) {
            console.error("Payment insert error:", paymentError);
            throw paymentError;
        }

        console.log("Payment recorded:", { payment_id: data.id, status: data.status });

        // Update order status to 'paid' if payment is captured
        if (data.status === "captured") {
            const { error: orderError } = await supabase
                .from("orders")
                .update({ status: "paid" })
                .eq("razorpay_order_id", data.order_id);

            if (orderError) {
                console.error("Order update error:", orderError);
                throw orderError;
            }

            console.log("Order status updated to 'paid':", { order_id: data.order_id });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
});
