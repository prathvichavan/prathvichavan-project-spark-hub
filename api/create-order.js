import Razorpay from "razorpay";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { amount } = req.body;

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY) {
            console.error("Missing credentials");
            return res.status(500).json({ error: "Server configuration error: Missing Razorpay keys" });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({ orderId: order.id });

    } catch (error) {
        console.error("ORDER ERROR:", error);
        return res.status(500).json({ error: "Unable to create order" });
    }
}
