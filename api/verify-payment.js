import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { orderId, paymentId, signature, userEmail, projectId } = req.body;

        const secret = process.env.RAZORPAY_SECRET_KEY;
        if (!secret) {
            return res.status(500).json({ error: "Missing Razorpay Secret" });
        }

        // 1. Verify Signature
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        if (generated_signature !== signature) {
            return res.status(400).json({ error: "Invalid signature" });
        }

        // 2. Update Database (Supabase)
        // We need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars in Vercel
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Update order
        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("razorpay_order_id", orderId)
            .select()
            .single();

        // Insert payment
        const { error: paymentError } = await supabase
            .from("payments")
            .insert({
                order_id: orderData?.id,
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
                user_email: userEmail,
                amount: orderData?.amount,
                status: "captured",
                download_url: `/download/${projectId}`
            });

        return res.status(200).json({
            success: true,
            message: "Verified",
            redirectUrl: `/download/${projectId}`
        });

    } catch (error) {
        console.error("VERIFY ERROR:", error);
        return res.status(500).json({ error: "Verification failed" });
    }
}
