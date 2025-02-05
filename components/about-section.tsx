"use client"

import { motion } from "framer-motion"
import { ParallaxScroll } from "./animations/parallax-scroll"
import { FadeInStagger, FadeInStaggerItem } from "./animations/fade-in-stagger"
import { SkillsGrid } from "./skills-grid"
import { EducationSection } from "./education-section"
import data from "@/data/personal-info.json"

export function AboutSection() {
  const { languages, education } = data

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ParallaxScroll>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Sobre Mí
          </motion.h2>
        </ParallaxScroll>

        <div className="space-y-20">
          <EducationSection education={education} />

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold mb-8 text-center"
            >
              Idiomas
            </motion.h3>
            <div className="max-w-2xl mx-auto">
              <FadeInStagger>
                {languages.map((lang) => (
                  <FadeInStaggerItem key={lang.name}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between bg-secondary/20 rounded-xl p-4 mb-2"
                    >
                      <span>{lang.name}</span>
                      <span className="text-muted-foreground">{lang.level}</span>
                    </motion.div>
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-semibold mb-8 text-center">Habilidades</h3>
            <SkillsGrid />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

