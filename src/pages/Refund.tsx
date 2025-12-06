import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Refund = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 6, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">No Refunds</h2>
                        <p>
                            <strong>Digital files are non-refundable.</strong> Due to the nature of digital products, once they are downloaded or accessed, they cannot be returned.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Payment Issues</h2>
                        <p>
                            If payment has been deducted but you are unable to download the file, please contact our support team immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Support & Resolution</h2>
                        <p>
                            All issues will be resolved within 24 hours.
                        </p>
                        <p>
                            <strong>Email:</strong> techprojecthub.tech@gmail.com
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Refund;
