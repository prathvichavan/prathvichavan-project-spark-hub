import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">About Us</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                        <p>
                            TechProjectHub is a premier platform dedicated to providing high-quality, ready-made academic and IT projects for students and developers. We understand the challenges students face in their final year projects, and we aim to bridge the gap by offering professional, well-documented, and working source code.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p>
                            Our mission is to empower students with practical knowledge and resources. We believe in "learning by doing," and our projects serve as excellent reference materials for understanding complex concepts in:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Machine Learning & AI</li>
                            <li>Data Science & Power BI</li>
                            <li>Web Development (Full Stack)</li>
                            <li>Deep Learning</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Instant Access:</strong> Digital downloads immediately after purchase.</li>
                            <li><strong>Quality Code:</strong> Tested and working projects.</li>
                            <li><strong>Documentation:</strong> Comprehensive guides and reports included.</li>
                            <li><strong>Support:</strong> Dedicated support to help you run the projects.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            Have questions? Reach out to us at:
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

export default About;
