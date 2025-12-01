import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  amount: number;
  projectId: string; // <-- ADD THIS (required for download redirect)
}

const PaymentDialog = ({ open, onOpenChange, projectTitle, amount, projectId }: PaymentDialogProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Start Payment
  const startPayment = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load");
      setIsProcessing(false);
      return;
    }

    // CALL SUPABASE EDGE FUNCTION
    const res = await fetch(
      "https://bgawccnumjzdobswnvkq.supabase.co/functions/v1/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );

    const order = await res.json();

    if (!order.id) {
      toast.error("Failed to create Razorpay order");
      setIsProcessing(false);
      return;
    }

    // RAZORPAY OPTIONS
    const options: any = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "TechProjectHub",
      description: projectTitle,
      image: window.location.origin + "/logo.png",
      order_id: order.id,

      handler: async function (response: any) {
        // SAVE PAYMENT IN SUPABASE
        await supabase.from("payments").insert({
          project_id: projectId,
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });

        toast.success("Payment Successful!");

        // REDIRECT TO DOWNLOAD PAGE
        window.location.href = `/download/${projectId}`;
      },

      theme: {
        color: "#4f46e5", // fixed spelling
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

    setIsProcessing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            You are purchasing: <b>{projectTitle}</b>
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 text-xl font-semibold">
          Amount: ₹{amount}
        </div>

        <div className="flex items-start space-x-2 border-t pt-4">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(val) => setTermsAccepted(val as boolean)}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I accept the terms, refund policy, and agree to receive project files after payment.
          </label>
        </div>

        <Button
          className="w-full mt-4"
          size="lg"
          onClick={startPayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
