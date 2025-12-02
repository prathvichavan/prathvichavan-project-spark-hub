import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PaymentDialog from "@/components/PaymentDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useProject } from "@/hooks/useProject";
import { IndianRupee, CheckCircle2, Package, ArrowLeft } from "lucide-react";

const ProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { session } = useAuth();
    const { toast } = useToast();
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

    // Ensure ID is present
    const projectId = id || "";

    const { data: project, isLoading, error } = useProject(projectId);

    // Debugging logs
    useEffect(() => {
        console.log("ProjectPage mounted. ID:", id);
        if (error) console.error("Project fetch error:", error);
        if (project) console.log("Project loaded:", project);
    }, [id, project, error]);

    const handleBuyNow = () => {
        if (!session) {
            toast({
                title: "Authentication Required",
                description: "Please login or sign up to purchase this project.",
                variant: "destructive",
            });
            navigate("/auth/login");
            return;
        }
        setPaymentDialogOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-hero flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-xl text-muted-foreground">Loading project details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-gradient-hero flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            The project you are looking for does not exist or has been removed.
                        </p>
                        <Button asChild>
                            <Link to="/projects">Back to Projects</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Breadcrumb */}
                <div className="mb-6 animate-fade-in">
                    <Button asChild variant="ghost" size="sm">
                        <Link to="/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 animate-fade-in-up">
                        {/* Header */}
                        <div>
                            <Badge className="mb-3">
                                {project.category || "Uncategorized"}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {project.title}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="rounded-xl overflow-hidden border border-border bg-muted">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
                                    No Image Available
                                </div>
                            )}
                        </div>

                        {/* Full Description */}
                        <Card className="p-6 bg-gradient-card">
                            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {project.fullDescription || "No detailed description available."}
                            </div>
                        </Card>

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <Card className="p-6 bg-gradient-card">
                                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature: string, index: number) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}

                        {/* Tools Used */}
                        {project.tools && project.tools.length > 0 && (
                            <Card className="p-6 bg-gradient-card">
                                <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool: string, index: number) => (
                                        <Badge key={index} variant="secondary">
                                            {tool}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Deliverables */}
                        {project.deliverables && project.deliverables.length > 0 && (
                            <Card className="p-6 bg-gradient-card">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <Package className="mr-2 h-6 w-6" />
                                    What You'll Receive
                                </h2>
                                <ul className="space-y-3">
                                    {project.deliverables.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar - Price & Purchase */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24 bg-gradient-card border-2 border-primary/20 animate-scale-in">
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center text-4xl font-bold text-primary mb-2">
                                    <IndianRupee className="h-8 w-8" />
                                    <span>{project.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    One-time payment • Instant access
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <Button
                                    size="lg"
                                    className="w-full shadow-primary"
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </Button>
                                <Button asChild size="lg" variant="outline" className="w-full">
                                    <Link to="/contact">Request Custom Project</Link>
                                </Button>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-border">
                                <div className="flex items-center space-x-3 text-sm">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Instant download after payment</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Complete source code included</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>Documentation & video tutorials</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                    <span>WhatsApp & email support</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-muted rounded-lg">
                                <p className="text-sm text-center text-muted-foreground">
                                    Need help? Contact us via WhatsApp for instant support
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
            <WhatsAppButton />

            <PaymentDialog
                open={paymentDialogOpen}
                onOpenChange={setPaymentDialogOpen}
                projectTitle={project.title}
                amount={project.price}
                projectId={project.id}
            />
        </div>
    );
};

export default ProjectPage;
