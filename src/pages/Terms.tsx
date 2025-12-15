import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 15, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction and Acceptance</h2>
                        <p>
                            Welcome to TechProjectHub ("we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website <strong>techprojecthub.tech</strong> and all related services, content, and products (collectively, the "Services").
                        </p>
                        <p>
                            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services. We reserve the right to modify these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
                        </p>
                        <p>
                            These Terms constitute a legally binding agreement between you and TechProjectHub. Please read them carefully before making any purchase or using our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
                        <p>For the purposes of these Terms:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>"User," "You," "Your"</strong> refers to any individual or entity accessing or using our Services.</li>
                            <li><strong>"Content"</strong> refers to all digital products, projects, source code, documentation, and materials available on our platform.</li>
                            <li><strong>"Purchase"</strong> refers to the acquisition of a license to use our digital products.</li>
                            <li><strong>"Account"</strong> refers to the user account you create to access certain features of our Services.</li>
                            <li><strong>"Intellectual Property"</strong> includes all copyrights, trademarks, patents, trade secrets, and other proprietary rights.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Digital Products and Delivery</h2>
                        <p>
                            All products available on TechProjectHub are <strong>digital downloadable files</strong>. We do not ship physical products. Upon successful payment, you will receive:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Instant Access:</strong> Immediate download links via email and your account dashboard</li>
                            <li><strong>Complete Source Code:</strong> Full project files, databases, and assets</li>
                            <li><strong>Documentation:</strong> Project reports, setup guides, and user manuals</li>
                            <li><strong>Support Materials:</strong> Additional resources as specified in the product description</li>
                        </ul>
                        <p className="mt-4">
                            <strong>Delivery Timeframe:</strong> Digital products are delivered instantly upon payment confirmation. If you do not receive your download link within 10 minutes, please check your spam folder or contact our support team.
                        </p>
                        <p>
                            <strong>Download Limitations:</strong> Download links are valid for 30 days from the date of purchase. We recommend downloading and backing up your files immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. User Accounts</h2>
                        <p>
                            To purchase and access certain features, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Provide accurate, current, and complete information during registration</li>
                            <li>Maintain and promptly update your account information</li>
                            <li>Keep your password secure and confidential</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Accept responsibility for all activities that occur under your account</li>
                        </ul>
                        <p className="mt-4">
                            We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. License and Usage Rights</h2>
                        <p>
                            When you purchase a digital product from TechProjectHub, you are granted a <strong>non-exclusive, non-transferable, limited license</strong> to use the Content for the following purposes:
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">Permitted Uses:</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Personal Learning:</strong> Study and understand the code for educational purposes</li>
                            <li><strong>Academic Projects:</strong> Use as a reference or base for your final year, mini, or major projects</li>
                            <li><strong>Portfolio:</strong> Showcase modified versions in your personal portfolio (with attribution)</li>
                            <li><strong>Customization:</strong> Modify and adapt the code for your specific needs</li>
                            <li><strong>Deployment:</strong> Deploy the project for personal or academic demonstration purposes</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3 mt-4">Prohibited Uses:</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>❌ No Reselling:</strong> You may NOT resell, redistribute, or sublicense the original or modified code</li>
                            <li><strong>❌ No Sharing:</strong> You may NOT share download links or files with others</li>
                            <li><strong>❌ No Public Distribution:</strong> You may NOT upload the code to public repositories (GitHub, GitLab, etc.) without significant modifications</li>
                            <li><strong>❌ No Commercial Use:</strong> You may NOT use the code for commercial purposes without explicit written permission</li>
                            <li><strong>❌ No Claiming Authorship:</strong> You may NOT claim the original work as entirely your own creation</li>
                        </ul>

                        <p className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
                            <strong>Important:</strong> Violation of these usage terms may result in legal action and permanent ban from our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
                        <p>
                            All Content available on TechProjectHub, including but not limited to source code, documentation, graphics, logos, and text, is the intellectual property of TechProjectHub or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                        </p>
                        <p>
                            The purchase of a digital product grants you a license to use the Content as specified in Section 5, but does NOT transfer ownership of the intellectual property rights to you.
                        </p>
                        <p>
                            <strong>Third-Party Libraries:</strong> Some projects may include open-source libraries and frameworks. These components are subject to their respective licenses (MIT, Apache, GPL, etc.), which are clearly documented in the project files.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Payments and Pricing</h2>
                        <p>
                            All payments are processed securely through <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway. We accept the following payment methods:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Credit and Debit Cards (Visa, Mastercard, RuPay, etc.)</li>
                            <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                            <li>Net Banking</li>
                            <li>Digital Wallets</li>
                        </ul>
                        <p className="mt-4">
                            <strong>Pricing:</strong> All prices are listed in Indian Rupees (INR) unless otherwise specified. Prices are subject to change without notice, but changes will not affect orders already placed.
                        </p>
                        <p>
                            <strong>Taxes:</strong> Prices include applicable GST and other taxes as required by Indian law.
                        </p>
                        <p>
                            <strong>Payment Security:</strong> We do NOT store your payment card details or banking information. All sensitive data is handled securely by Razorpay.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Prohibited Activities</h2>
                        <p>
                            You agree NOT to engage in any of the following prohibited activities:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Violating any applicable laws or regulations</li>
                            <li>Infringing on intellectual property rights</li>
                            <li>Transmitting viruses, malware, or harmful code</li>
                            <li>Attempting to gain unauthorized access to our systems</li>
                            <li>Interfering with the proper functioning of the Services</li>
                            <li>Impersonating another person or entity</li>
                            <li>Collecting user data without consent</li>
                            <li>Using automated systems (bots, scrapers) to access the Services</li>
                            <li>Engaging in fraudulent transactions or chargebacks</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Disclaimers and Warranties</h2>
                        <p>
                            <strong>AS-IS BASIS:</strong> Our Services and Content are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.
                        </p>
                        <p>
                            We make reasonable efforts to ensure that all projects are functional and well-documented, but we do NOT guarantee:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>That the Content will meet your specific requirements</li>
                            <li>That the Content will be error-free or bug-free</li>
                            <li>That the Services will be uninterrupted or secure</li>
                            <li>That defects will be corrected</li>
                            <li>Compatibility with all systems and environments</li>
                        </ul>
                        <p className="mt-4">
                            <strong>Educational Purpose:</strong> Our projects are designed for educational and learning purposes. They should be used as reference materials and learning tools, not as production-ready commercial applications without proper review and testing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, TechProjectHub and its affiliates, officers, employees, and agents shall NOT be liable for:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                            <li>Loss of profits, revenue, data, or business opportunities</li>
                            <li>Damages resulting from your use or inability to use the Services</li>
                            <li>Damages resulting from unauthorized access to your account</li>
                            <li>Damages resulting from errors or omissions in the Content</li>
                        </ul>
                        <p className="mt-4">
                            Our total liability for any claim arising from your use of the Services shall not exceed the amount you paid for the specific product or service giving rise to the claim.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless TechProjectHub and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any third-party rights</li>
                            <li>Your misuse of the Content or Services</li>
                            <li>Your fraudulent or illegal activities</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account and access to the Services at any time, without notice, for:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Violation of these Terms</li>
                            <li>Fraudulent or illegal activity</li>
                            <li>Abuse of our Services or staff</li>
                            <li>Any other reason at our sole discretion</li>
                        </ul>
                        <p className="mt-4">
                            Upon termination, your right to use the Services will immediately cease. However, your license to use previously purchased Content will remain valid subject to the usage restrictions in Section 5.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Jurisdiction</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        </p>
                        <p>
                            Any disputes arising from these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts located in Maharashtra, India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">14. Dispute Resolution</h2>
                        <p>
                            In the event of any dispute, claim, or controversy arising from these Terms, you agree to first attempt to resolve the matter informally by contacting our support team.
                        </p>
                        <p>
                            If the dispute cannot be resolved within 30 days, either party may pursue formal legal remedies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page with an updated "Last Updated" date.
                        </p>
                        <p>
                            Your continued use of the Services after any changes constitutes acceptance of the new Terms. We encourage you to review these Terms periodically.
                        </p>
                        <p>
                            For significant changes, we may notify you via email or through a prominent notice on our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">16. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">17. Entire Agreement</h2>
                        <p>
                            These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and TechProjectHub regarding the use of our Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">18. Contact and Support</h2>
                        <p>
                            If you have any questions about these Terms or need support, please contact us:
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
                        <p className="mt-4">
                            We strive to respond to all inquiries within 24-48 hours.
                        </p>
                    </section>

                    <section className="bg-muted/50 p-6 rounded-lg mt-8">
                        <p className="mb-0">
                            <strong>By using TechProjectHub, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
