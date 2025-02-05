import { HeroSection } from "@/components/hero-section"
import { ProjectCard } from "@/components/project-card"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import data from "@/data/personal-info.json"

export default function Home() {
  const { projects } = data

  return (
    <main className="bg-background min-h-screen">
      <HeroSection />

      <section className="py-20 px-4">
        <div id="proyectos" className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Proyectos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}

