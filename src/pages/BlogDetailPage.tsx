import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/utils/blogData";
import { DotBackground } from "@/components/ui/DotBackground";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await blogService.getBlogBySlug(slug);
        if (data) {
          setPost(data);
          // Fetch related posts (could be another service call or filtered from a list)
          const allBlogs = await blogService.getBlogs();
          setRelatedPosts(allBlogs.filter((p) => p.slug !== slug).slice(0, 2));
        } else {
          navigate("/blog");
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        navigate("/blog");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }, containerRef);

    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, [post]);

  if (isLoading) {
    return (
      <main className="bg-obsidian min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-white/40 font-display uppercase tracking-widest text-xs">
            Deep Loading...
          </p>
        </div>
      </main>
    );
  }

  if (!post) return null;

  return (
    <main className="bg-obsidian min-h-screen selection:bg-accent selection:text-obsidian">
      <Navbar />

      <div
        ref={containerRef}
        className="pt-24 md:pt-32 pb-12 md:pb-20 relative"
      >
        <DotBackground
          dotSize={1}
          gap={35}
          dotColor="rgba(139, 92, 246, 0.08)"
          fade={true}
          className="z-0 fixed inset-0 pointer-events-none"
        />

        {/* Back Button */}
        <div className="container-luxury px-[4vw] relative z-10 mb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors text-xs uppercase tracking-widest font-bold group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container-luxury px-[4vw] relative z-10 mb-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="hero-content flex items-center justify-center gap-4 mb-8">
              <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>
            <h1 className="hero-content text-3xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 md:mb-8 tracking-tighter leading-[1.1]">
              {post.title}
            </h1>
            <div className="hero-content flex items-center justify-center gap-8 text-white/50 text-sm font-light">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full aspect-21/9 md:aspect-2/1 rounded-2xl md:rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-transparent opacity-60" />
          </motion.div>
        </section>

        {/* Content Section */}
        <article className="container-luxury px-[4vw] relative z-10">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg md:prose-xl prose-headings:font-display prose-headings:font-medium prose-p:font-light prose-p:text-white/70 prose-a:text-accent prose-li:text-white/70">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>

        {/* Share / Tags Footer (Simple) */}
        <div className="container-luxury px-[4vw] relative z-10 mt-20 mb-32">
          <div className="max-w-3xl mx-auto border-t border-white/10 pt-12 flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-white/30 text-xs uppercase tracking-widest">
                Tags:
              </span>
              <span className="text-white/60 text-xs uppercase tracking-widest">
                {post.category}, Technology, Altair
              </span>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <section className="container-luxury px-[4vw] relative z-10 border-t border-white/10 pt-24">
          <h3 className="text-3xl font-display text-white mb-12">
            More to Explore
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className="group block bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex items-center gap-4 mb-3 text-[10px] uppercase tracking-widest text-white/40">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-xl font-display text-white group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default BlogDetailPage;
