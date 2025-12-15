import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Disclaimer = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 15, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. General Information</h2>
                        <p>
                            The information provided by <strong>TechProjectHub</strong> ("we," "us," or "our") on <strong>techprojecthub.tech</strong> (the "Site") is for general informational and educational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                        </p>
                        <p>
                            ERROR OR OMISSION IN THE SITE OR THE CONTENT IS AT YOUR OWN RISK. WE WILL NOT BE LIABLE TO YOU FOR ANY LOSS OR DAMAGES OF ANY KIND.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Educational Purposes Only</h2>
                        <p>
                            The projects, source code, and documentation available on this Site are intended strictly for <strong>educational and learning purposes</strong>. They are designed to help students, developers, and researchers understand technical concepts, programming languages, and system architectures.
                        </p>
                        <p>
                            <strong>We do NOT condone or support academic dishonesty.</strong> These projects should use be used as references, study guides, or starting points for your own work. You are responsible for ensuring that your use of our materials complies with your institution's academic integrity policies. We are not responsible for any disciplinary action taken against you by your educational institution.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Professional Disclaimer</h2>
                        <p>
                            The Site cannot and does not contain software engineering advice. The software engineering information is provided for general educational and informational purposes only and is not a substitute for professional advice.
                        </p>
                        <p>
                            Our projects are "as is" and may strictly NOT be suitable for production environments or commercial use without significant modification, testing, and security hardening. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. External Links Disclaimer</h2>
                        <p>
                            The Site may contain (or you may be sent through the Site to) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                        </p>
                        <p>
                            WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Affiliates Disclaimer</h2>
                        <p>
                            The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Testimonials Disclaimer</h2>
                        <p>
                            The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Errors and Omissions Disclaimer</h2>
                        <p>
                            While we strive to ensure that the information contained in this site has been obtained from reliable sources, TechProjectHub is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in this Site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. "Use at Your Own Risk" Disclaimer</h2>
                        <p>
                            All information in the Service is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.
                        </p>
                        <p>
                            In no event will TechProjectHub, its related partnerships or corporations, or the partners, agents or employees thereof be liable to you or anyone else for any decision made or action taken in reliance on the information in the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Disclaimer, please contact us:
                        </p>
                        <div className="bg-muted p-6 rounded-lg mt-4">
                            <p className="mb-2">
                                <strong>Email:</strong> <a href="mailto:techprojecthub.tech@gmail.com" className="text-primary hover:underline">techprojecthub.tech@gmail.com</a>
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Disclaimer;
