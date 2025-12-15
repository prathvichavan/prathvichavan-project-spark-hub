import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            category: "General Questions",
            questions: [
                {
                    q: "What is TechProjectHub?",
                    a: "TechProjectHub is an educational platform that provides ready-made academic projects, source code, and documentation for students pursuing degrees in Computer Science, IT, and related fields. We help students learn by providing well-documented, working projects that they can study, modify, and use as references for their own work."
                },
                {
                    q: "Are these projects suitable for final year submissions?",
                    a: "Yes! Our projects are designed specifically for final year, mini projects, and major projects. However, we strongly recommend that you customize and add your own features to make the project truly yours. Use our projects as a learning resource and foundation, not as a direct submission. Academic integrity is important."
                },
                {
                    q: "Do I need programming knowledge to use these projects?",
                    a: "Basic programming knowledge is recommended. Our projects come with detailed documentation and setup guides, but you should have fundamental understanding of the technologies used (Python, JavaScript, databases, etc.). We provide support to help you understand and run the projects."
                }
            ]
        },
        {
            category: "Purchase & Payment",
            questions: [
                {
                    q: "What payment methods do you accept?",
                    a: "We accept all major payment methods through Razorpay, including Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Digital Wallets. All transactions are secure and encrypted."
                },
                {
                    q: "Is my payment information secure?",
                    a: "Absolutely! We do NOT store any payment card details, UPI information, or banking credentials on our servers. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway that uses industry-standard encryption."
                },
                {
                    q: "How do I get my project after payment?",
                    a: "After successful payment, you'll receive an instant download link via email and in your account dashboard. The link is valid for 30 days. You'll get the complete source code, database files, documentation, and setup instructions in a ZIP file."
                },
                {
                    q: "Can I get a refund if I'm not satisfied?",
                    a: "Due to the digital nature of our products, refunds are generally not provided once the download link is generated. However, we do offer refunds in exceptional cases such as corrupted files, product not as described, or technical failures on our end. Please refer to our Refund Policy for details."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    q: "What if I face issues setting up the project?",
                    a: "We provide comprehensive technical support! Contact us via email at techprojecthub.tech@gmail.com or WhatsApp at +91 9766638211. Our team will guide you through installation, configuration, and troubleshooting. We typically respond within 24 hours."
                },
                {
                    q: "Do you provide customization services?",
                    a: "Yes, we offer customization services for an additional fee. If you need specific features added, UI changes, or modifications to suit your requirements, contact us with your requirements and we'll provide a quote."
                },
                {
                    q: "What if the project doesn't work on my system?",
                    a: "Each project comes with detailed system requirements and setup instructions. If you follow the steps correctly, the project should work. If you still face issues, contact our support team. We'll help you troubleshoot or provide alternative solutions."
                },
                {
                    q: "Can I get help during my project presentation/viva?",
                    a: "While we can't attend your viva, we can help you prepare! We provide detailed documentation explaining the architecture, technologies, and implementation. We can also answer your questions about the project to help you understand it thoroughly for your presentation."
                }
            ]
        },
        {
            category: "Project Details",
            questions: [
                {
                    q: "What's included in each project?",
                    a: "Each project includes: Complete source code, Database files (SQL/NoSQL), Detailed documentation (project report, synopsis), Setup and installation guide, Screenshots and demo videos (where applicable), and Technical support via email/WhatsApp."
                },
                {
                    q: "Are the projects original and plagiarism-free?",
                    a: "Yes! All our projects are developed in-house by our team of experienced developers. While the core concepts may be common (e.g., e-commerce, chatbot), the implementation, code structure, and features are unique to each project."
                },
                {
                    q: "Can I modify the project code?",
                    a: "Absolutely! You have full rights to modify, customize, and enhance the code for your personal or academic use. In fact, we encourage you to add your own features and improvements to make the project unique."
                },
                {
                    q: "Do you provide project reports and documentation?",
                    a: "Yes! Every project comes with a comprehensive project report (50-100 pages) including Introduction, Literature Review, System Design, Implementation, Testing, and Conclusion. You can use this as a reference to create your own report."
                }
            ]
        },
        {
            category: "Usage Rights & Restrictions",
            questions: [
                {
                    q: "Can I use the project for commercial purposes?",
                    a: "Our standard license is for educational and personal use only. If you want to use the project commercially (e.g., launch it as a real business), you need to contact us for a commercial license."
                },
                {
                    q: "Can I share the project with my classmates?",
                    a: "No, sharing is not allowed. Each purchase is for individual use only. If your classmates need the same project, they should purchase their own copy. This helps us continue providing quality projects and support."
                },
                {
                    q: "Can I upload the project to GitHub or public repositories?",
                    a: "You can upload a significantly modified version with your own additions and changes. However, uploading the original, unmodified code to public repositories is not permitted as it violates our terms of use."
                }
            ]
        },
        {
            category: "Delivery & Access",
            questions: [
                {
                    q: "How long does delivery take?",
                    a: "Delivery is instant! As soon as your payment is confirmed, you'll receive the download link via email and in your account dashboard. If you don't receive it within 10 minutes, check your spam folder or contact support."
                },
                {
                    q: "What if I lose my download link?",
                    a: "No worries! Log in to your account dashboard where you can access all your purchased projects. You can also contact our support team with your order details, and we'll resend the link."
                },
                {
                    q: "Can I download the project multiple times?",
                    a: "Yes, you can download the project multiple times within the 30-day validity period from your account dashboard. We recommend downloading and backing up the files immediately after purchase."
                }
            ]
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about our projects, payments, support, and more.
                        Can't find what you're looking for? Contact us directly!
                    </p>
                </div>

                <div className="space-y-8">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-4">
                            <h2 className="text-2xl font-semibold text-primary mb-4">
                                {category.category}
                            </h2>
                            <div className="space-y-3">
                                {category.questions.map((faq, questionIndex) => {
                                    const globalIndex = categoryIndex * 100 + questionIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div
                                            key={questionIndex}
                                            className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                                        >
                                            <button
                                                onClick={() => toggleFAQ(globalIndex)}
                                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                                            >
                                                <span className="font-semibold text-foreground pr-4">
                                                    {faq.q}
                                                </span>
                                                <ChevronDown
                                                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 py-4 bg-muted/30 border-t border-border">
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-primary/10 rounded-lg border border-primary/20">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Still Have Questions?</h2>
                    <p className="text-center text-muted-foreground mb-6">
                        Our support team is here to help you with any questions or concerns.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a
                            href="mailto:techprojecthub.tech@gmail.com"
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                        >
                            Email Us
                        </a>
                        <a
                            href="tel:+919766638211"
                            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
                        >
                            Call Us: +91 9766638211
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
