"use client"

import { motion } from "framer-motion"
import { ExperienceTimeline } from "./experience-timeline"
import data from "@/data/personal-info.json"

export function ExperienceSection() {
  const { experience } = data

  return (
    <div className="bg-background text-foreground">
      <div className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="inline-block"
          >
            <h2 className="text-4xl font-bold">Experiencia</h2>
            <motion.div
              className="h-1 w-0 bg-primary mt-2"
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground mt-4"
          >
            Descubre mi trayectoria profesional
          </motion.p>
        </motion.div>

        <ExperienceTimeline experiences={experience} />
      </div>
    </div>
  )
}

