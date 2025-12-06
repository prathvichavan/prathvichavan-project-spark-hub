
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DeliveryPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Digital Delivery Policy</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">All products provided by TechProjectHub are digital.</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Delivery Method</h2>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>All products are delivered digitally via email or direct download link.</li>
                            <li>No physical shipping is involved for any product.</li>
                            <li>Files are available instantly after successful payment.</li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DeliveryPolicy;
