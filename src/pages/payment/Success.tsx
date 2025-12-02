
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("payment_id");
    const projectId = searchParams.get("project_id");

    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center space-y-6 bg-gradient-card border-primary/20 animate-scale-in">
                    <div className="flex justify-center">
                        <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your transaction has been completed successfully.
                        </p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                        <p className="font-mono font-medium">{paymentId}</p>
                    </div>

                    <div className="space-y-3 pt-4">
                        {projectId && (
                            <Button asChild className="w-full shadow-primary" size="lg">
                                <Link to={`/download/${projectId}`}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Project
                                </Link>
                            </Button>
                        )}
                        <Button asChild variant="outline" className="w-full">
                            <Link to="/projects">Browse More Projects</Link>
                        </Button>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;
