import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Contact } from "@/components/sections/Contact";

const ProjectsPage = () => {
  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />

      <ProjectsHero />

      <ProjectsGrid />

      <Contact />

      <Footer />
    </main>
  );
};

export default ProjectsPage;
