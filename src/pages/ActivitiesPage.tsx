import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const activities = [
  {
    id: 1,
    title: "Community Outreach",
    desc: "Empowering local tech talent through workshops and mentorship programs.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Tech Workshops",
    desc: "Hands-on training sessions for smart home integration and IoT development.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
  },
];

const ActivitiesPage = () => {
  return (
    <main className="bg-obsidian min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container-luxury">
          <h1 className="text-huge font-display font-black tracking-tighter uppercase mb-12">
            Our <br /> <span className="text-white/20">Activities.</span>
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 md:mb-12 border border-white/5 relative group-hover:border-accent/20 transition-all duration-1000">
                  <img
                    src={activity.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[3s]"
                    alt={activity.title}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-transparent" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-display uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-lg font-light text-white/50 leading-relaxed max-w-xl">
                    {activity.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ActivitiesPage;
