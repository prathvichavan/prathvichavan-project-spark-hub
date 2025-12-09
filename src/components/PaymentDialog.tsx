
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

    if (!user) {
      toast.error("You must be logged in to purchase");
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
        body: {
          amount,
          projectId,
          userId: user.id
        }
      });

      if (orderError) {
        console.error("Order Creation Error:", orderError);
        throw new Error("Failed to create order. Please try again.");
      }

      if (orderData.error) {
        throw new Error(orderData.error);
      }

      // 2. Open Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "TechProjectHub",
        description: `Purchase: ${projectTitle}`,
        image: "https://techprojecthub.tech/images/blog/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: user?.user_metadata?.full_name || user?.email,
          email: user?.email,
          contact: user?.phone || "",
        },
        theme: {
          color: "#4f46e5",
        },
        handler: async function (response: any) {
          console.log("Payment success. Verifying...", response);
          toast.success("Payment Successful! Verifying...");

          try {
            // 3. Verify Payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                userEmail: user?.email
              }
            });

            if (verifyError || verifyData?.error) {
              console.error("Verification failed:", verifyError || verifyData?.error);
              toast.error("Payment successful but verification failed. Contact support.");
              // We might still redirect if we think it's just a network glitch on response, 
              // but strictly we should stop. 
              // However, user said "Provides download page access ONLY IF payment verified".
              // So if verification fails, we do NOT redirect.
              return;
            }

            console.log("Verification Success:", verifyData);
            toast.success("Verification Successful! Redirecting...");

            // 4. Redirect
            if (verifyData.redirectUrl) {
              window.location.href = verifyData.redirectUrl;
            } else {
              window.location.href = `/download/${projectId}`;
            }

          } catch (verifyErr) {
            console.error("Verification Logic Error:", verifyErr);
            toast.error("Verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast("Payment cancelled");
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error("Payment Flow Error:", error);
      toast.error(error.message || "Something went wrong initiating payment");
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
