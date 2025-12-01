import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">Last updated: December 1, 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TechProjectHub ("we," "us" or "our"), concerning your access to and use of our website and digital products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Digital Products</h2>
                        <p>
                            We sell digital downloadable products (IT projects, source code, documentation). By purchasing, you acknowledge that:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>You are purchasing a license to use the digital content for educational or personal purposes.</li>
                            <li>Delivery is instant via digital download link or email.</li>
                            <li>There is no physical shipping involved.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
                        <p>
                            Unless otherwise indicated, the Site and the digital products are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") are owned or controlled by us or licensed to us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                            <br />
                            <strong>TechProjectHub</strong>
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

export default Terms;
