
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import crypto from "npm:crypto";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5";

serve(async (req) => {
    const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? "";
    const body = await req.json();
    const signature = req.headers.get("x-razorpay-signature") ?? "";
    const expected = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(body))
        .digest("hex");

    if (expected !== signature) {
        return new Response(JSON.stringify({ success: false, msg: "Invalid Signature" }), { status: 400 });
    }

    const data = body.payload.payment.entity;
    const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_KEY") ?? ""
    );

    await supabase.from("payments").insert({
        payment_id: data.id,
        order_id: data.order_id,
        email: data.email ?? "",
        contact: data.contact ?? "",
        amount: data.amount / 100,
        status: data.status
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
});
