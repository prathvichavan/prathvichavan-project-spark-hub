import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-primary group-hover:shadow-secondary">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              TechProjectHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Home
            </Link>
            <Link to="/projects" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Projects
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" size="sm" className="hover:scale-105 transition-all duration-300">
              <Link to="/contact">Get Support</Link>
            </Button>
            <Button asChild size="sm" className="shadow-primary hover:shadow-secondary hover:scale-105 transition-all duration-300">
              <Link to="/projects">Browse Projects</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-all duration-300 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 animate-bounce-in" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:translate-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <Button asChild variant="outline" size="sm" className="w-full hover:scale-105 transition-all duration-300">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Support
                  </Link>
                </Button>
                <Button asChild size="sm" className="w-full shadow-primary hover:shadow-secondary hover:scale-105 transition-all duration-300">
                  <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>
                    Browse Projects
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
