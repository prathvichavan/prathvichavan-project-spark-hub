import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 6, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Digital Products</h2>
                        <p>
                            All products available on TechProjectHub are digital downloadable files. No physical products are shipped.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Usage Rights</h2>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>You are purchasing a license to use the digital content for personal or educational purposes.</li>
                            <li><strong>No sharing or redistribution allowed.</strong> You may not resell or distribute the files.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Payments & Pricing</h2>
                        <p>
                            Payments are processed securely via Razorpay. We do not store your payment details.
                            TechProjectHub reserves the right to modify products and pricing at any time without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Contact & Support</h2>
                        <p>
                            For any support or queries, please contact us at:
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

export default Terms;
