import Razorpay from "razorpay";
// Attempt to load .env for local dev if not in standard env
try {
    const dotenv = await import('dotenv');
    dotenv.config();
} catch (e) {
    // dotenv not found or failed, ignore
}

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { amount } = req.body;

        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_SECRET_KEY || process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            console.error("Missing Credentials Debug info:", {
                hasKeyId: !!key_id,
                hasSecret: !!key_secret,
                envKeys: Object.keys(process.env).filter(k => k.includes('RAZORPAY'))
            });
            return res.status(500).json({ error: "Server configuration error: Missing Razorpay keys" });
        }

        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
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
        return res.status(500).json({ error: "Unable to create order: " + error.message });
    }
}
