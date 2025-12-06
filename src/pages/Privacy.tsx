import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 6, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Privacy Commitment</h2>
                        <p>
                            We respect user privacy and are committed to protecting your personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Payment Data</h2>
                        <p>
                            <strong>No card or UPI data is stored on our servers.</strong>
                            <br />
                            All payments are processed securely via Razorpay. They handle all secure payment processing and data encryption.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Data Usage</h2>
                        <p>
                            We collect your email address solely for the purpose of sending purchase receipts, product delivery, and account verification.
                            <br />
                            <strong>Your data is never shared with third parties.</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
                        <p>
                            If you have questions about our privacy practices, please contact us:
                            <br />
                            <strong>Email:</strong> techprojecthub.tech@gmail.com
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
