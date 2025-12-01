import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Refund = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Refund and Cancellation Policy</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 1, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Digital Products Policy</h2>
                        <p>
                            At TechProjectHub, we specialize in providing digital downloadable content (IT projects, source code, documentation). Due to the nature of digital goods, which are instantly accessible and cannot be "returned," we have a strict refund policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. No Refunds After Download</h2>
                        <p>
                            Once a purchase is made and the download link has been generated or the file has been accessed/downloaded, <strong>we do not offer refunds</strong>. This is industry standard for digital downloadable goods.
                        </p>
                        <p className="mt-2">
                            Please read the project description, features, and requirements carefully before making a purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Cancellation Policy</h2>
                        <p>
                            Since our orders are processed instantly and the digital product is delivered immediately upon payment, <strong>cancellation is not possible</strong> once the payment is successful.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Exceptions</h2>
                        <p>
                            We may consider a refund or exchange only under the following specific circumstances:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>If the downloaded file is corrupted and we are unable to provide a working replacement.</li>
                            <li>If the product delivered is completely different from the one described on the website.</li>
                        </ul>
                        <p className="mt-2">
                            In such cases, you must contact our support team within 24 hours of purchase with proof of the issue.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Contact Support</h2>
                        <p>
                            If you face any issues with your download or have questions before purchasing, please contact us:
                            <br />
                            Email: mr.prathvirajchavan@gmail.com
                            <br />
                            Phone: +91 9766638211
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Refund;
