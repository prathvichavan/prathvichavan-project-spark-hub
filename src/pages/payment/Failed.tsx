
import { useSearchParams, Link } from "react-router-dom";
import { XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentFailed = () => {
    const [searchParams] = useSearchParams();
    const errorDescription = searchParams.get("error_description") || "Transaction failed";

    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center space-y-6 bg-gradient-card border-destructive/20 animate-scale-in">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-foreground">Payment Failed</h1>
                        <p className="text-muted-foreground">
                            We couldn't process your payment. Please try again.
                        </p>
                    </div>

                    <div className="bg-destructive/10 p-4 rounded-lg text-destructive text-sm">
                        {errorDescription}
                    </div>

                    <div className="space-y-3 pt-4">
                        <Button asChild className="w-full" size="lg">
                            <Link to="/projects">
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Try Again
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" className="w-full">
                            <Link to="/contact">Contact Support</Link>
                        </Button>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentFailed;
