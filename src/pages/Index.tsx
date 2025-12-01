import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CategoryCard from "@/components/CategoryCard";
import ProjectCard from "@/components/ProjectCard";
import { CheckCircle2, Download, IndianRupee, HeadphonesIcon } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import heroBg from "@/assets/hero-bg.jpg";
import powerbiIcon from "@/assets/powerbi-icon.jpg";
import mlIcon from "@/assets/ml-icon.jpg";
import dlIcon from "@/assets/dl-icon.jpg";
import webIcon from "@/assets/web-icon.jpg";

const Index = () => {
  const { data: projects = [], isLoading } = useProjects();
  const featuredProjects = projects.slice(0, 4);

  const categories = [
    {
      title: "Power BI Projects",
      description: "Interactive dashboards and data visualizations",
      icon: powerbiIcon,
      category: "Power BI"
    },
    {
      title: "Machine Learning",
      description: "Predictive models and data analysis projects",
      icon: mlIcon,
      category: "Machine Learning"
    },
    {
      title: "Deep Learning",
      description: "Neural networks and AI-powered solutions",
      icon: dlIcon,
      category: "Deep Learning"
    },
    {
      title: "Website Projects",
      description: "Full-stack web applications and templates",
      icon: webIcon,
      category: "Web Development"
    }
  ];

  const benefits = [
    {
      icon: Download,
      title: "Instant Delivery",
      description: "Download projects immediately after purchase"
    },
    {
      icon: IndianRupee,
      title: "Affordable Prices",
      description: "Quality projects at student-friendly prices"
    },
    {
      icon: CheckCircle2,
      title: "Ready to Submit",
      description: "Complete with code, documentation, and presentation"
    },
    {
      icon: HeadphonesIcon,
      title: "Full Support",
      description: "Get help via WhatsApp and email"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready-Made IT Projects for
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Students & Developers
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Power BI, Machine Learning, Deep Learning & Web Development projects.
              Complete with code, documentation, and video explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg shadow-primary hover:shadow-secondary hover:scale-105 transition-all duration-500 animate-bounce-in">
                <Link to="/projects">Browse All Projects</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg hover:scale-105 hover:shadow-lg transition-all duration-500 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/contact">Request Custom Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect project for your academic needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {categories.map((category, index) => (
              <div key={category.category} style={{ animationDelay: `${index * 0.1}s` }}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top Selling Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most popular projects chosen by students
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {isLoading ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Loading projects...
              </div>
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectCard {...project} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No projects available yet.
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose TechProjectHub?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality, affordability, and support - all in one place
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-md group-hover:shadow-primary">
                  <benefit.icon className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Your Project?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Browse our collection and download instantly. Need something custom? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg hover:scale-105 transition-all duration-500 hover:shadow-xl animate-bounce-in">
              <Link to="/projects">Browse Projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-500 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
