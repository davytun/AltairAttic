import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/utils/blogData";
import { DotBackground } from "@/components/ui/DotBackground";

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await blogService.getBlogs();
        setBlogs(data.slice(0, 3)); // Only show top 3 on home
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <section className="bg-obsidian py-32 px-[6vw] relative overflow-hidden border-t border-white/5">
      <DotBackground
        dotSize={1}
        gap={35}
        dotColor="rgba(139, 92, 246, 0.08)"
        fade={true}
      />

      <div className="container-luxury relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black mb-8 block">
              / Insights & Intel
            </span>
            <h2 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-none">
              Thought <br />{" "}
              <span className="text-white/40 italic font-serif lowercase tracking-normal">
                Leadership.
              </span>
            </h2>
          </div>
          <Link to="/blog" className="group">
            <button className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black">
              View All Articles
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-obsidian transition-all duration-700">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white/5 rounded-3xl h-[400px]"
                />
              ))
            : blogs.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  {/* Image Card */}
                  <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-8 border border-white/5 group-hover:border-accent/30 transition-all duration-700">
                    <div className="absolute inset-0 bg-obsidian/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <motion.img
                      src={post.image}
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="w-full h-full object-cover"
                      alt={post.title}
                    />
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-4 py-2 bg-obsidian/80 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest text-accent border border-white/10">
                        {post.category || "Insight"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col grow">
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/50 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-accent" />
                        {post.date}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-accent" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-2xl font-display font-medium leading-[1.2] mb-4 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm font-light text-white/60 leading-relaxed mb-8 grow">
                      {post.excerpt}
                    </p>

                    <div className="pt-6 border-t border-white/5">
                      <Link to={`/blog/${post.slug}`} className="contents">
                        <span className="text-[10px] uppercase tracking-widest font-black flex items-center gap-2 group-hover:gap-4 transition-all text-white">
                          Read Article{" "}
                          <ArrowUpRight className="w-3 h-3 text-accent" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
