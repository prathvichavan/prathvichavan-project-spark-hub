import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Lock, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const DownloadPage = () => {
    const { id } = useParams();
    const { user, loading: authLoading } = useAuth();
    const [verifying, setVerifying] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        const checkAccess = async () => {
            if (!user || !id) return;

            try {
                // 1. Check for paid order
                const { data: orders, error: orderError } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("project_id", id)
                    .eq("user_id", user.id)
                    .eq("status", "paid") // Ensure we check for 'paid' status
                    .limit(1);

                if (orderError) throw orderError;

                const order = orders?.[0];

                if (order) {
                    setHasAccess(true);
                    // 2. Fetch project details
                    const { data: projectData, error: projectError } = await supabase
                        .from("projects")
                        .select("*")
                        .eq("id", id)
                        .single();

                    if (projectError) throw projectError;
                    setProject(projectData);
                }
            } catch (error: any) {
                console.error("Access check failed:", error);
                toast.error(`Failed to verify purchase: ${error.message || "Unknown error"}`);
            } finally {
                setVerifying(false);
            }
        };

        if (!authLoading) {
            if (user) {
                checkAccess();
            } else {
                setVerifying(false);
            }
        }
    }, [user, id, authLoading]);

    if (authLoading || verifying) {
        return (
            <div className="min-h-screen bg-gradient-hero flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!user) {
        return <Navigate to={`/auth/login?redirect=/download/${id}`} replace />;
    }

    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-gradient-hero flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center p-4">
                    <Card className="max-w-md w-full p-8 text-center space-y-6 bg-gradient-card border-destructive/20">
                        <div className="flex justify-center">
                            <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center">
                                <Lock className="h-10 w-10 text-destructive" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold">Access Denied</h1>
                        <p className="text-muted-foreground">
                            You have not purchased this project yet. Please purchase it to access the download.
                        </p>
                        <Button asChild className="w-full">
                            <Link to={`/project/${id}`}>View Project</Link>
                        </Button>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center p-4">
                <Card className="max-w-lg w-full p-8 space-y-6 bg-gradient-card animate-scale-in">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Download Ready</h1>
                        <p className="text-muted-foreground">
                            Your project files are ready for download.
                        </p>
                    </div>

                    {project && (
                        <div className="bg-muted/50 p-4 rounded-lg flex items-center space-x-4">
                            <img
                                src={project.thumbnail_url}
                                alt={project.title}
                                className="w-16 h-16 rounded object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">{project.title}</h3>
                                <p className="text-sm text-muted-foreground">Category: {project.category}</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4 pt-4">
                        <Button
                            className="w-full shadow-primary"
                            size="lg"
                            onClick={async () => {
                                try {
                                    toast.loading("Preparing download...");
                                    const { data, error } = await supabase.functions.invoke('download-project', {
                                        body: { projectId: id }
                                    });

                                    toast.dismiss();

                                    if (error) throw error;
                                    if (data.error) throw new Error(data.error);

                                    if (data.url) {
                                        window.location.href = data.url;
                                        toast.success("Download started!");
                                    } else {
                                        throw new Error("No download URL returned");
                                    }
                                } catch (err: any) {
                                    toast.dismiss();
                                    console.error("Download error:", err);
                                    toast.error(err.message || "Download failed. Please contact support.");
                                }
                            }}
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Download Now
                        </Button>

                        <Button asChild variant="ghost" className="w-full">
                            <Link to="/dashboard">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go to Dashboard
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div >
            <Footer />
        </div >
    );
};

export default DownloadPage;
