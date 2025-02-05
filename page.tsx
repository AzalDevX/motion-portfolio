import { HeroSection } from '@/components/hero-section';
import { ProjectCard } from '@/components/project-card';
import { AboutSection } from '@/components/about-section';
import { ExperienceSection } from '@/components/experience-section';
import { ContactSection } from '@/components/contact-section';
import data from '@/data/personal-info.json';
import { motion } from 'framer-motion';

export default function Home() {
  const { projects, skills } = data;

  return (
    <main className="bg-background min-h-screen">
      <HeroSection />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            Proyectos
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {projects.map((project, index) => {
              return (
                <ProjectCard
                  key={project.title}
                  {...project}
                  index={index}
                  tags={project.tags}
                />
              );
            })}
          </div>
        </div>
      </section>

      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
