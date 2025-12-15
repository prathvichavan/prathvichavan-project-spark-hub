import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ShoppingCart, Download, HeadphonesIcon, CheckCircle, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
    const steps = [
        {
            icon: Search,
            title: "Browse Projects",
            description: "Explore our extensive collection of ready-made projects across various categories including Machine Learning, Web Development, Power BI, Deep Learning, and Cloud-based solutions. Use filters to find projects that match your requirements, technology stack, and difficulty level.",
            details: [
                "Filter by category, technology, and difficulty",
                "Read detailed project descriptions",
                "Check system requirements",
                "Preview project features and screenshots"
            ]
        },
        {
            icon: ShoppingCart,
            title: "Select & Purchase",
            description: "Once you find the perfect project, add it to your cart and proceed to checkout. We accept all major payment methods through our secure payment gateway, Razorpay. Your payment information is encrypted and never stored on our servers.",
            details: [
                "Secure payment via Razorpay",
                "Multiple payment options (UPI, Cards, Net Banking)",
                "Instant order confirmation",
                "Email receipt and invoice"
            ]
        },
        {
            icon: Download,
            title: "Instant Download",
            description: "Immediately after payment confirmation, you'll receive a download link via email and in your account dashboard. Download the complete project package including source code, database files, documentation, and setup guides.",
            details: [
                "Instant access to download link",
                "Complete source code package",
                "Database files and schemas",
                "Comprehensive documentation (50-100 pages)",
                "Setup and installation guides"
            ]
        },
        {
            icon: Code2,
            title: "Setup & Customize",
            description: "Follow our detailed setup instructions to get the project running on your local machine. Our documentation includes step-by-step installation guides, troubleshooting tips, and configuration instructions. Customize the project to add your own features and make it unique.",
            details: [
                "Step-by-step installation guide",
                "System requirements checklist",
                "Configuration instructions",
                "Troubleshooting common issues",
                "Tips for customization"
            ]
        },
        {
            icon: HeadphonesIcon,
            title: "Get Support",
            description: "Stuck somewhere? Our dedicated support team is here to help! Contact us via email or WhatsApp for technical assistance, setup guidance, or any questions about the project. We typically respond within 24 hours.",
            details: [
                "Email support: techprojecthub.tech@gmail.com",
                "WhatsApp support: +91 9766638211",
                "Response time: Within 24 hours",
                "Help with setup, configuration, and troubleshooting"
            ]
        },
        {
            icon: CheckCircle,
            title: "Submit & Succeed",
            description: "After understanding and customizing the project, you're ready to present it! Use our comprehensive documentation as a reference to create your own project report. Understand the architecture, technologies, and implementation to confidently present during your viva.",
            details: [
                "Detailed project report included",
                "Architecture diagrams and flowcharts",
                "Technology stack explanation",
                "Implementation details",
                "Testing and results documentation"
            ]
        }
    ];

    const features = [
        {
            title: "100% Working Code",
            description: "All projects are thoroughly tested and guaranteed to work. We don't sell broken or incomplete code."
        },
        {
            title: "Comprehensive Documentation",
            description: "Every project includes detailed documentation (50-100 pages) covering all aspects of the project."
        },
        {
            title: "Instant Delivery",
            description: "No waiting! Get instant access to your project immediately after payment confirmation."
        },
        {
            title: "Full Source Code",
            description: "You get complete, well-commented source code that you can modify and customize freely."
        },
        {
            title: "Technical Support",
            description: "Our team is available to help you with setup, configuration, and troubleshooting."
        },
        {
            title: "Secure Payments",
            description: "All transactions are processed through Razorpay with bank-level encryption and security."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">How TechProjectHub Works</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Getting your perfect academic project is simple and straightforward.
                        Follow these 6 easy steps to get started with your final year project today.
                    </p>
                </div>

                {/* Steps Section */}
                <div className="max-w-4xl mx-auto space-y-12 mb-20">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex gap-6 items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="w-0.5 h-full bg-primary/20 mx-auto mt-4"
                                        style={{ display: index === steps.length - 1 ? 'none' : 'block' }} />
                                </div>
                                <div className="flex-1 pb-12">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm font-semibold text-primary">STEP {index + 1}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {step.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {step.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start gap-2">
                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose TechProjectHub?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="p-6 border border-border rounded-lg bg-card hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What's Included Section */}
                <div className="bg-muted/30 rounded-lg p-8 md:p-12 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">What's Included in Every Project?</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Complete Source Code</h3>
                                <p className="text-sm text-muted-foreground">Well-structured, commented code ready to run</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Database Files</h3>
                                <p className="text-sm text-muted-foreground">SQL/NoSQL database schemas and sample data</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Project Documentation</h3>
                                <p className="text-sm text-muted-foreground">50-100 page detailed project report</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Setup Instructions</h3>
                                <p className="text-sm text-muted-foreground">Step-by-step installation and configuration guide</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Screenshots & Diagrams</h3>
                                <p className="text-sm text-muted-foreground">Visual aids for understanding and presentation</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-1">Technical Support</h3>
                                <p className="text-sm text-muted-foreground">Email and WhatsApp support for assistance</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Browse our collection of high-quality projects and find the perfect one for your academic needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/projects"
                            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                        >
                            Browse Projects
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
