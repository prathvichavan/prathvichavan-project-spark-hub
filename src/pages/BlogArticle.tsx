import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
import ReactMarkdown from "react-markdown";

const BlogArticle = () => {
    const { slug } = useParams<{ slug: string }>();
    const article = blogArticles.find((a) => a.slug === slug);

    useEffect(() => {
        if (article) {
            // Update page title
            document.title = `${article.title} | TechProjectHub Blog`;

            // Update meta description
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", article.description);
            }

            // Add JSON-LD structured data
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.text = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": article.title,
                "description": article.description,
                "image": `https://techprojecthub.vercel.app${article.featuredImage}`,
                "author": {
                    "@type": "Organization",
                    "name": article.author
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "TechProjectHub",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://techprojecthub.vercel.app/images/blog/logo.png"
                    }
                },
                "datePublished": article.publishDate,
                "dateModified": article.publishDate,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://techprojecthub.vercel.app/blog/${article.slug}`
                }
            });
            document.head.appendChild(script);

            // Add Open Graph meta tags
            const ogTags = [
                { property: "og:title", content: article.title },
                { property: "og:description", content: article.description },
                { property: "og:image", content: `https://techprojecthub.vercel.app${article.featuredImage}` },
                { property: "og:url", content: `https://techprojecthub.vercel.app/blog/${article.slug}` },
                { property: "og:type", content: "article" },
                { property: "article:published_time", content: article.publishDate },
                { property: "article:author", content: article.author },
                { property: "article:section", content: article.category },
            ];

            ogTags.forEach(({ property, content }) => {
                let meta = document.querySelector(`meta[property="${property}"]`);
                if (!meta) {
                    meta = document.createElement("meta");
                    meta.setAttribute("property", property);
                    document.head.appendChild(meta);
                }
                meta.setAttribute("content", content);
            });

            // Add canonical link
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement("link");
                canonical.setAttribute("rel", "canonical");
                document.head.appendChild(canonical);
            }
            canonical.setAttribute("href", `https://techprojecthub.vercel.app/blog/${article.slug}`);

            // Cleanup
            return () => {
                document.title = "TechProjectHub - Ready-Made IT Projects";
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        }
    }, [article]);

    if (!article) {
        return <Navigate to="/blog" replace />;
    }

    // Get related articles (same category, exclude current)
    const relatedArticles = blogArticles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12">
                {/* Back Button */}
                <Link to="/blog">
                    <Button variant="ghost" className="mb-6 hover:scale-105 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Button>
                </Link>

                {/* Article Header */}
                <article className="max-w-4xl mx-auto">
                    <div className="mb-8 animate-fade-in">
                        <div className="mb-4">
                            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-primary">
                                {article.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                            {article.title}
                        </h1>

                        <p className="text-xl text-muted-foreground mb-6">
                            {article.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(article.publishDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{article.readingTime} min read</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 text-xs bg-muted px-3 py-1 rounded-full"
                                >
                                    <Tag className="h-3 w-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-8 rounded-lg overflow-hidden shadow-lg animate-scale-in">
                        <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                            }}
                        />
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none mb-12 animate-fade-in-up">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>
                                ),
                                p: ({ children }) => (
                                    <p className="mb-4 text-foreground leading-relaxed">{children}</p>
                                ),
                                a: ({ href, children }) => (
                                    <Link
                                        to={href || "#"}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        {children}
                                    </Link>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">{children}</ol>
                                ),
                                code: ({ children, className }) => {
                                    const isBlock = className?.includes("language-");
                                    return isBlock ? (
                                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                                            <code className="text-sm">{children}</code>
                                        </pre>
                                    ) : (
                                        <code className="bg-muted px-2 py-1 rounded text-sm">{children}</code>
                                    );
                                },
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                                        {children}
                                    </blockquote>
                                ),
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-card p-8 rounded-lg shadow-lg mb-12 text-center animate-scale-in">
                        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                        <p className="text-muted-foreground mb-6">
                            Browse our collection of ready-made projects with complete source code and documentation.
                        </p>
                        <Link to="/projects">
                            <Button size="lg" className="shadow-primary hover:shadow-secondary">
                                Explore Projects
                            </Button>
                        </Link>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedArticles.map((related) => (
                                    <Link
                                        key={related.id}
                                        to={`/blog/${related.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-gradient-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                            <img
                                                src={related.featuredImage}
                                                alt={related.title}
                                                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder.svg";
                                                }}
                                            />
                                            <div className="p-4">
                                                <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {related.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {related.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogArticle;
