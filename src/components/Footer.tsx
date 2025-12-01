import { Link } from "react-router-dom";
import { Code2, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 animate-slide-in">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg bg-gradient-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-primary">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TechProjectHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Quality ready-made academic and IT projects for students. Instant delivery, full support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects?category=powerbi" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Power BI Projects
                </Link>
              </li>
              <li>
                <Link to="/projects?category=ml" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/projects?category=dl" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Deep Learning
                </Link>
              </li>
              <li>
                <Link to="/projects?category=web" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Website Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group">
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>mr.prathvirajchavan@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group">
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 9766638211</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 TechProjectHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
                Terms & Conditions
              </Link>
              <Link to="/refund" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
