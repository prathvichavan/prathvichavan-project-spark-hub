import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 15, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>
                            Welcome to TechProjectHub ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>techprojecthub.tech</strong> and use our services.
                        </p>
                        <p>
                            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us when you use our services. The types of information we may collect include:
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">Personal Information</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
                            <li><strong>Contact Information:</strong> Email address and phone number when you contact us for support or inquiries.</li>
                            <li><strong>Purchase Information:</strong> Order details, project selections, and transaction history (but NOT payment card details).</li>
                            <li><strong>Communication Data:</strong> Information you provide when you communicate with us via email, contact forms, or WhatsApp.</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-3 mt-4">Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution.</li>
                            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, and navigation paths.</li>
                            <li><strong>IP Address:</strong> Your Internet Protocol address for security and analytics purposes.</li>
                            <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your browsing experience (see Section 6 for details).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p>
                            We use the information we collect for various purposes, including:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Service Delivery:</strong> To process your orders, deliver digital products, and provide customer support.</li>
                            <li><strong>Account Management:</strong> To create and manage your user account, verify your identity, and enable account features.</li>
                            <li><strong>Communication:</strong> To send you purchase receipts, download links, order confirmations, and important updates about our services.</li>
                            <li><strong>Improvement:</strong> To analyze usage patterns, improve our website functionality, and enhance user experience.</li>
                            <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and unauthorized access.</li>
                            <li><strong>Marketing:</strong> To send you promotional emails about new projects, special offers, and updates (you can opt-out anytime).</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
                            <li><strong>Analytics:</strong> To understand how users interact with our website and identify areas for improvement.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Payment Data Security</h2>
                        <div className="bg-primary/10 border-l-4 border-primary p-4 my-4">
                            <p className="font-semibold text-primary mb-2">🔒 Your Payment Information is Secure</p>
                            <p>
                                <strong>We do NOT store any payment card information, UPI details, or banking credentials on our servers.</strong>
                            </p>
                        </div>
                        <p>
                            All payment transactions are processed securely through <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway. Razorpay handles all sensitive payment data using industry-standard encryption and security protocols.
                        </p>
                        <p>
                            When you make a payment, you are redirected to Razorpay's secure payment interface. We only receive confirmation of successful transactions along with a transaction ID – we never have access to your card numbers, CVV, or banking passwords.
                        </p>
                        <p>
                            For more information about how Razorpay protects your payment data, please visit their privacy policy at <a href="https://razorpay.com/privacy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">razorpay.com/privacy</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. How We Share Your Information</h2>
                        <p>
                            We respect your privacy and do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your information only in the following limited circumstances:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Service Providers:</strong> We share data with trusted third-party service providers who assist us in operating our website, processing payments (Razorpay), sending emails, and analyzing website traffic (Google Analytics). These providers are contractually obligated to protect your data and use it only for the purposes we specify.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, court order, or government regulation, or if we believe such action is necessary to comply with legal obligations.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                            <li><strong>Protection of Rights:</strong> We may share information to protect our rights, property, or safety, or that of our users or the public.</li>
                        </ul>
                        <p className="mt-4">
                            <strong>We will NEVER share your personal information with third parties for their direct marketing purposes without your explicit consent.</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-4">Types of Cookies We Use:</h3>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., authentication, security).</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google Analytics).</li>
                            <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
                            <li><strong>Advertising Cookies:</strong> Used to display relevant advertisements (if applicable).</li>
                        </ul>

                        <p className="mt-4">
                            You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality. Most browsers allow you to refuse cookies or delete existing cookies. Please refer to your browser's help documentation for specific instructions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Encryption:</strong> We use SSL/TLS encryption to protect data transmitted between your browser and our servers.</li>
                            <li><strong>Secure Storage:</strong> Personal data is stored in secure databases with restricted access.</li>
                            <li><strong>Access Controls:</strong> Only authorized personnel have access to personal information, and they are bound by confidentiality obligations.</li>
                            <li><strong>Regular Security Audits:</strong> We conduct periodic security assessments to identify and address vulnerabilities.</li>
                            <li><strong>Password Protection:</strong> User passwords are hashed and encrypted using industry-standard algorithms.</li>
                        </ul>
                        <p className="mt-4">
                            While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously work to improve our security practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
                        <p>
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Account Data:</strong> Retained as long as your account is active or as needed to provide services.</li>
                            <li><strong>Transaction Records:</strong> Retained for accounting, tax, and legal compliance purposes (typically 7 years).</li>
                            <li><strong>Communication Records:</strong> Retained for customer support and quality assurance purposes.</li>
                            <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely for statistical purposes.</li>
                        </ul>
                        <p className="mt-4">
                            When we no longer need your personal information, we will securely delete or anonymize it in accordance with our data retention policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Your Privacy Rights</h2>
                        <p>
                            Depending on your location, you may have certain rights regarding your personal information:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Access:</strong> You have the right to request a copy of the personal information we hold about you.</li>
                            <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete personal information.</li>
                            <li><strong>Deletion:</strong> You may request that we delete your personal information, subject to certain legal exceptions.</li>
                            <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications by clicking the "unsubscribe" link in our emails.</li>
                            <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
                            <li><strong>Withdraw Consent:</strong> If we process your data based on consent, you can withdraw that consent at any time.</li>
                        </ul>
                        <p className="mt-4">
                            To exercise any of these rights, please contact us at <a href="mailto:techprojecthub.tech@gmail.com" className="text-primary hover:underline">techprojecthub.tech@gmail.com</a>. We will respond to your request within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Third-Party Services</h2>
                        <p>
                            Our website may contain links to third-party websites and services, including:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Razorpay:</strong> Payment processing</li>
                            <li><strong>Google Analytics:</strong> Website analytics</li>
                            <li><strong>Supabase:</strong> Database and authentication services</li>
                            <li><strong>Vercel:</strong> Website hosting</li>
                        </ul>
                        <p className="mt-4">
                            These third-party services have their own privacy policies, and we are not responsible for their practices. We encourage you to review their privacy policies before providing any personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
                        <p>
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">12. International Data Transfers</h2>
                        <p>
                            Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. By using our services, you consent to the transfer of your information to India and other countries where we operate.
                        </p>
                        <p>
                            We take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy, regardless of where it is processed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Posting the updated policy on this page with a new "Last Updated" date</li>
                            <li>Sending you an email notification (for significant changes)</li>
                            <li>Displaying a prominent notice on our website</li>
                        </ul>
                        <p className="mt-4">
                            We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes indicates your acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                        <p>
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
                            We are committed to resolving any privacy concerns you may have and will respond to your inquiries within 48 hours.
                        </p>
                    </section>

                    <section className="bg-muted/50 p-6 rounded-lg mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
                        <p className="mb-0">
                            At TechProjectHub, we take your privacy seriously. We are committed to transparency, security, and giving you control over your personal information. Thank you for trusting us with your data.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
