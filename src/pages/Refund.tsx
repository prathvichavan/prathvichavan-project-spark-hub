import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Refund = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Refund and Cancellation Policy</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 15, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. General Policy</h2>
                        <p>
                            Thank you for purchasing from TechProjectHub. We appreciate your interest in our educational projects and resources.
                        </p>
                        <p>
                            Due to the digital nature of our products (downloadable source code, documents, and software), <strong>all sales are generally considered final and non-refundable</strong> once the download link has been generated or the files have been accessed. This is a standard industry practice for digital goods, as unlike physical products, they cannot be "returned" in the traditional sense.
                        </p>
                        <p>
                            However, we understand that exceptional circumstances can take place. Therefore, we honor requests for the refund on the following reasons exclusively.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Non-refundable Circumstances</h2>
                        <p>
                            We generally do NOT offer refunds in the following situations:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Change of Mind:</strong> You decided you no longer need the project after purchasing.</li>
                            <li><strong>Incompatibility:</strong> You do not have the necessary software or environment (e.g., Python, Node.js, VS Code) installed to run the project, despite clearly listed requirements.</li>
                            <li><strong>Skill Level:</strong> You lack the technical knowledge to run or modify the project (though we provide support to help you).</li>
                            <li><strong>Mistake Purchase:</strong> You purchased the "wrong" project by accident and downloaded the files.</li>
                            <li><strong>No Longer Needed:</strong> Your academic requirements changed after purchase.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Refund Eligibility (Exceptions)</h2>
                        <p>
                            We MAY consider a refund or exchange under the following specific circumstances, at our sole discretion:
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">A. Files are Corrupted or Defective</h3>
                        <p>
                            If the downloaded files are corrupted, damaged, or cannot be extracted, and our support team is unable to resolve the issue or provide a working copy within 48 hours.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">B. Product Not as Described</h3>
                        <p>
                            If the product is materially different from the description or preview provided on our website. This does not include minor bugs or cosmetic differences.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">C. Duplicate Purchase</h3>
                        <p>
                            If you accidentally purchased the exact same product twice using the same email address. In this case, we will refund one of the transactions.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">D. Technical Failure</h3>
                        <p>
                            If a technical error on our end prevented the delivery of the download link, and we are unable to manually deliver the product to you within a reasonable timeframe.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
                        <p>
                            If you believe you qualify for a refund based on the exceptions above, please follow these steps:
                        </p>
                        <ol className="list-decimal pl-6 mt-2 space-y-2">
                            <li>Contact our support team at <a href="mailto:techprojecthub.tech@gmail.com" className="text-primary hover:underline">techprojecthub.tech@gmail.com</a> within <strong>3 days</strong> of your purchase.</li>
                            <li>Use the subject line "Refund Request - [Order ID]".</li>
                            <li>Include detailed evidence (screenshots, error logs) of the issue you are facing.</li>
                            <li>Allow us 24-48 hours to investigate and attempt to resolve the issue technically.</li>
                        </ol>
                        <p className="mt-4">
                            If we cannot resolve the technical issue and confirm the validity of your claim, we will process your refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Refund Timeline</h2>
                        <p>
                            Once a refund is approved:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>We will initiate the refund via the original payment method (Razorpay).</li>
                            <li>You will receive a notification email from Razorpay.</li>
                            <li>The amount typically reflects in your bank account within <strong>5-7 business days</strong>, depending on your bank's processing speed.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Chargebacks and Disputes</h2>
                        <p>
                            We strictly advise against filing a chargeback or dispute with your bank or credit card provider without contacting us first.
                        </p>
                        <p>
                            If you file a chargeback or dispute:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Your access to our Services will be permanently suspended.</li>
                            <li>We will submit evidence of your purchase, download activity, and our terms to the dispute body.</li>
                            <li>You may be blacklisted from purchasing future projects.</li>
                        </ul>
                        <p>
                            Technical issues can almost always be resolved through our support channels. Please talk to us first.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Support and Resolution</h2>
                        <p>
                            We take pride in the quality of our projects and want you to succeed. Before requesting a refund, we encourage you to utilize our support:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Setup Help:</strong> We can guide you through installation difficulties.</li>
                            <li><strong>Documentation:</strong> Check the "ReadMe" files included with your download.</li>
                            <li><strong>Contact Us:</strong> Reach out via email or WhatsApp for direct assistance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                        <p>
                            For any billing or refund related queries, please contact us:
                        </p>
                        <div className="bg-muted p-6 rounded-lg mt-4">
                            <p className="mb-2">
                                <strong>Email:</strong> <a href="mailto:techprojecthub.tech@gmail.com" className="text-primary hover:underline">techprojecthub.tech@gmail.com</a>
                            </p>
                            <p className="mb-2">
                                <strong>Alternative Email:</strong> <a href="mailto:mr.prathvirajchavan@gmail.com" className="text-primary hover:underline">mr.prathvirajchavan@gmail.com</a>
                            </p>
                            <p className="mb-2">
                                <strong>Phone:</strong> <a href="tel:+919766638211" className="text-primary hover:underline">+91 9766638211</a>
                            </p>
                            <p className="mb-0">
                                <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 8:00 PM IST
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Refund;
