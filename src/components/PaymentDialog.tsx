
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  amount: number;
  projectId: string;
}

const PaymentDialog = ({ open, onOpenChange, projectTitle, amount, projectId }: PaymentDialogProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { session } = useAuth();
  const user = session?.user;

  const loadRazorpayScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);

    try {
      const isLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // 1. Create Order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-order', {
        body: { amount, projectId }
      });

      if (orderError) {
        console.error("Order Creation Error (Invoke Failed):", orderError);
        throw new Error("Failed to connect to payment server.");
      }

      // Check for error returned in the body (status 200 but logic error)
      if (orderData && orderData.error) {
        console.error("Order Creation Logic Error:", orderData.error);
        throw new Error(orderData.error);
      }

      if (!orderData || !orderData.orderId) {
        throw new Error("Invalid order data received from server");
      }

      // 2. Open Razorpay
      const options = {
        key: orderData.key, // Key from server
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        name: "TechProjectHub",
        description: `Purchase: ${projectTitle}`,
        image: "https://techprojecthub.tech/images/blog/logo.png", // Updated to new domain
        order_id: orderData.orderId,
        prefill: {
          name: user?.user_metadata?.full_name || user?.email,
          email: user?.email,
          contact: user?.phone || "",
        },
        theme: {
          color: "#4f46e5",
        },
        // Callback URL for fallback (optional, but good for some flows)
        // callback_url removed to ensure handler is called for verification logic

        handler: async function (response: any) {
          try {
            console.log("Payment success, verifying...", response);
            // 3. Verify Payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: orderData.dbOrderId
              }
            });

            if (verifyError || !verifyData.success) {
              console.error("Verification Failed:", verifyError || verifyData);
              throw new Error("Payment verification failed");
            }

            toast.success("Payment Successful!");
            window.location.href = `/payment/success?payment_id=${response.razorpay_payment_id}&project_id=${projectId}`;

          } catch (err: any) {
            console.error("Verification Error:", err);
            toast.error("Payment verification failed. Please contact support.");
            window.location.href = `/payment/failed?error_description=${encodeURIComponent(err.message)}`;
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast("Payment cancelled");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Something went wrong");
      setIsProcessing(false);
    }
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
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
