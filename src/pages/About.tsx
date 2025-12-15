import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">About TechProjectHub</h1>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg text-muted-foreground">
                        Your trusted partner in academic excellence and technical innovation since 2024.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                        <p>
                            TechProjectHub is a premier platform dedicated to providing high-quality, ready-made academic and IT projects for students, developers, and professionals. Founded by experienced software engineers and educators, we understand the unique challenges that students face during their final year projects, internships, and academic assessments.
                        </p>
                        <p>
                            We are more than just a project repository – we are a learning ecosystem designed to bridge the gap between theoretical knowledge and practical implementation. Our platform serves thousands of students across India and globally, helping them excel in their academic pursuits while building real-world technical skills.
                        </p>
                        <p>
                            Based in India, our team comprises industry professionals with extensive experience in software development, data science, machine learning, and web technologies. We carefully curate and develop each project to ensure it meets the highest standards of code quality, documentation, and educational value.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p>
                            Our mission is to democratize access to quality technical education and empower students with practical knowledge and resources. We believe in "learning by doing," and our projects serve as excellent reference materials and learning tools for understanding complex concepts across multiple domains.
                        </p>
                        <p>
                            We are committed to making technology education accessible, affordable, and practical. Every project we offer is designed not just to help students complete their academic requirements, but to genuinely enhance their understanding and prepare them for professional careers in technology.
                        </p>
                        <p>
                            Our projects cover cutting-edge technologies and industry-relevant domains including:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Machine Learning & Artificial Intelligence:</strong> From basic classifiers to advanced deep learning models</li>
                            <li><strong>Data Science & Power BI:</strong> Comprehensive analytics dashboards and visualization projects</li>
                            <li><strong>Web Development:</strong> Full-stack applications using modern frameworks like React, Node.js, Django, and Flask</li>
                            <li><strong>Deep Learning:</strong> Neural networks, computer vision, and NLP applications</li>
                            <li><strong>Cloud Computing:</strong> Scalable applications deployed on AWS, Azure, and Google Cloud</li>
                            <li><strong>Blockchain:</strong> Decentralized applications and smart contracts</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">What Makes Us Different</h2>
                        <p>
                            Unlike generic project repositories, TechProjectHub focuses on quality over quantity. Each project undergoes rigorous testing and review before being made available. Here's what sets us apart:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Industry-Standard Code:</strong> All projects follow best practices, coding standards, and include proper error handling</li>
                            <li><strong>Complete Documentation:</strong> Every project includes detailed documentation, setup instructions, and project reports suitable for academic submission</li>
                            <li><strong>Real-World Applications:</strong> Our projects solve actual problems and can be showcased in portfolios</li>
                            <li><strong>Learning-Focused:</strong> Code is well-commented and structured to facilitate understanding</li>
                            <li><strong>Continuous Updates:</strong> We regularly update projects to use the latest technologies and frameworks</li>
                            <li><strong>Dedicated Support:</strong> Our team is available to help with setup, troubleshooting, and customization</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                        <p>
                            TechProjectHub provides a comprehensive solution for your academic and learning needs:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Instant Digital Access:</strong> Download your project immediately after purchase – no waiting, no delays</li>
                            <li><strong>Tested & Working Code:</strong> Every project is thoroughly tested across multiple environments to ensure it works flawlessly</li>
                            <li><strong>Complete Source Code:</strong> Full access to all source files, databases, and assets</li>
                            <li><strong>Comprehensive Documentation:</strong> Detailed project reports, system architecture diagrams, and user manuals</li>
                            <li><strong>Setup Guides:</strong> Step-by-step installation and configuration instructions</li>
                            <li><strong>Video Tutorials:</strong> Visual walkthroughs for complex setup procedures (selected projects)</li>
                            <li><strong>Database Scripts:</strong> Pre-configured database schemas and sample data</li>
                            <li><strong>Customization Support:</strong> Guidance on how to modify and extend the projects</li>
                            <li><strong>Academic Reports:</strong> Professional project reports formatted for university submission</li>
                            <li><strong>Affordable Pricing:</strong> Student-friendly prices with occasional discounts and offers</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                        <p>
                            At TechProjectHub, we are guided by core values that shape everything we do:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Quality First:</strong> We never compromise on code quality or documentation standards</li>
                            <li><strong>Student Success:</strong> Your academic and professional success is our primary goal</li>
                            <li><strong>Integrity:</strong> All projects are original and properly attributed where third-party libraries are used</li>
                            <li><strong>Innovation:</strong> We continuously explore new technologies and update our offerings</li>
                            <li><strong>Accessibility:</strong> Making quality technical education accessible to all students</li>
                            <li><strong>Support:</strong> We're committed to helping you succeed even after purchase</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Who Can Benefit</h2>
                        <p>
                            Our projects are designed for:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Final Year Students:</strong> BCA, MCA, B.Tech, M.Tech students needing major projects</li>
                            <li><strong>Diploma Students:</strong> Polytechnic students requiring mini-projects</li>
                            <li><strong>Beginners:</strong> Those learning to code and wanting to study real-world implementations</li>
                            <li><strong>Professionals:</strong> Developers looking for reference implementations or portfolio projects</li>
                            <li><strong>Researchers:</strong> Academic researchers needing baseline implementations for their work</li>
                            <li><strong>Educators:</strong> Teachers and professors looking for teaching materials and examples</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
                        <p>
                            When you choose TechProjectHub, you're not just buying a project – you're investing in your education and future career. We commit to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Providing projects that actually work and can be demonstrated successfully</li>
                            <li>Offering clear, comprehensive documentation that helps you understand the code</li>
                            <li>Being available to answer your questions and help resolve technical issues</li>
                            <li>Continuously improving our projects based on user feedback</li>
                            <li>Maintaining the highest standards of academic integrity</li>
                            <li>Protecting your privacy and securing your data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p>
                            We're here to help! Whether you have questions about a specific project, need technical support, or want to discuss custom requirements, our team is ready to assist you.
                        </p>
                        <div className="bg-muted p-6 rounded-lg mt-4">
                            <p className="mb-2">
                                <strong>Email:</strong> <a href="mailto:mr.prathvirajchavan@gmail.com" className="text-primary hover:underline">mr.prathvirajchavan@gmail.com</a>
                            </p>
                            <p className="mb-2">
                                <strong>Alternative Email:</strong> <a href="mailto:techprojecthub.tech@gmail.com" className="text-primary hover:underline">techprojecthub.tech@gmail.com</a>
                            </p>
                            <p className="mb-2">
                                <strong>Phone:</strong> <a href="tel:+919766638211" className="text-primary hover:underline">+91 9766638211</a>
                            </p>
                            <p className="mb-2">
                                <strong>WhatsApp:</strong> Available for quick queries and support
                            </p>
                            <p className="mb-0">
                                <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 8:00 PM IST
                            </p>
                        </div>
                        <p className="mt-4">
                            We typically respond to all inquiries within 24 hours. For urgent technical support, please mention "URGENT" in your subject line.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
                        <p>
                            Become part of a growing community of students and developers who are building their skills and advancing their careers with TechProjectHub. Follow us on social media for project updates, coding tips, and special offers.
                        </p>
                        <p>
                            Thank you for choosing TechProjectHub. We're excited to be part of your learning journey and look forward to helping you achieve your academic and professional goals!
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
