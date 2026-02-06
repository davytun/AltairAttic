import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Search,
  Filter,
  Tag,
} from "lucide-react";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/utils/blogData";
import { DotBackground } from "@/components/ui/DotBackground";

const categories = [
  "All",
  "Home Tips",
  "Technology",
  "Design",
  "Eco-Friendly",
  "Lifestyle",
];

const BlogPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await blogService.getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".blog-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      (post.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (post.excerpt?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-obsidian min-h-screen selection:bg-accent selection:text-obsidian">
      <Navbar />

      <div ref={containerRef} className="pt-28 pb-20 relative">
        <DotBackground
          dotSize={1}
          gap={35}
          dotColor="rgba(139, 92, 246, 0.08)"
          fade={true}
          className="z-0 fixed inset-0 pointer-events-none"
        />

        {/* === SIMPLE HEADER === */}
        {/* === SIMPLE HEADER === */}
        <div className="pt-32 pb-20 px-[4vw] text-center relative z-10 flex flex-col items-center">
          <span className="text-accent text-[10px] uppercase font-black tracking-[0.4em] mb-6 block">
            / Insights
          </span>
          <h1 className="blog-header text-5xl md:text-8xl font-display font-medium text-white mb-8 tracking-tighter">
            Our Blog
          </h1>
          <p className="blog-header text-lg md:text-xl text-white/50 font-light max-w-2xl leading-relaxed">
            Simple tips and advice for a smarter, safer home.
          </p>
        </div>

        {/* === FILTERS & SEARCH === */}
        <div className="z-40 border-y border-white/5 py-6 mb-24 transition-all duration-300">
          <div className="container-luxury px-[4vw] flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar scroll-smooth">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                          px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all whitespace-nowrap border
                          ${
                            activeCategory === cat
                              ? "bg-white text-obsidian border-white scale-105"
                              : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10 hover:text-white"
                          }
                       `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div
              className={`relative flex items-center transition-all duration-500 ${isSearchFocused ? "w-full md:w-96" : "w-full md:w-64"}`}
            >
              <Search
                className={`absolute left-4 w-4 h-4 pointer-events-none transition-colors ${isSearchFocused ? "text-accent" : "text-white/30"}`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search articles..."
                className="w-full bg-obsidian-muted border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/40 transition-all font-light"
              />
            </div>
          </div>
        </div>

        {/* === GRID LAYOUT === */}
        <section className="px-[4vw] container-luxury relative z-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
              <p className="text-white/40 font-display uppercase tracking-widest text-xs">
                Syncing Insights...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              <AnimatePresence>
                {filteredPosts.map((post, i) => (
                  <motion.div
                    layout
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group cursor-pointer flex flex-col h-full bg-obsidian-surface p-6 rounded-[2.5rem] border border-white/5 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,159,255,0.05)]"
                  >
                    <Link to={`/blog/${post.slug}`} className="contents">
                      {/* Image */}
                      <div className="relative aspect-16/10 rounded-3xl overflow-hidden mb-8 border border-white/5 bg-obsidian-muted">
                        <div className="absolute inset-0 bg-obsidian/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale group-hover:grayscale-0"
                        />

                        {/* Floating Category Pits */}
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <div className="px-3 py-1.5 bg-obsidian/90 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                            <Tag className="w-3 h-3 text-accent" />
                            <span className="text-[9px] uppercase font-bold text-white/80 tracking-wider">
                              {post.category || "Insight"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-widest text-white/40 font-medium">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-accent" />
                          {post.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-accent" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Text */}
                      <h3 className="text-2xl font-display font-medium text-white group-hover:text-accent transition-colors duration-300 leading-tight mb-4">
                        {post.title}
                      </h3>
                      <p className="text-sm font-light text-white/60 leading-relaxed line-clamp-3 mb-8">
                        {post.excerpt}
                      </p>

                      {/* Spacer to push button down */}
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group/link">
                        <span className="text-[10px] uppercase font-black tracking-widest text-white group-hover/link:text-accent transition-colors">
                          Read Full Story
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-accent group-hover/link:text-obsidian transition-all">
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <h3 className="text-2xl font-display text-white mb-2">
                No Articles Found
              </h3>
              <p className="text-white/40 font-light">
                Try searching for different keywords or categories.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default BlogPage;
