"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar } from "lucide-react"

interface Education {
  school: string
  degree: string
  period: string
}

export function EducationSection({ education }: { education: Education[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="relative py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h3
          className="text-2xl font-semibold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Educación
        </motion.h3>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full bg-secondary/30"
            style={{
              scaleY: scrollYProgress,
            }}
          />

          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Content for larger screens */}
              <div className={`hidden md:block ${index % 2 === 0 ? "" : "md:col-start-3"}`}>
                <EducationCard {...edu} />
              </div>

              {/* Center dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="relative w-8 h-8 rounded-full bg-background border-4 border-secondary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <GraduationCap className="w-4 h-4 text-primary" />
                </motion.div>
              </div>

              {/* Content for mobile and opposite side for larger screens */}
              <div className={`md:hidden ${index % 2 === 0 ? "md:col-start-3" : ""}`}>
                <EducationCard {...edu} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, var(--primary-color) 0%, transparent 40%)",
              "radial-gradient(circle at 80% 80%, var(--primary-color) 0%, transparent 40%)",
              "radial-gradient(circle at 20% 20%, var(--primary-color) 0%, transparent 40%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={
            {
              "--primary-color": "hsl(30 40% 40% / 0.2)",
            } as any
          }
        />
      </div>
    </div>
  )
}

function EducationCard({ school, degree, period }: Education) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-6 bg-secondary/10 rounded-xl hover:bg-secondary/20 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-xl" />
      <div className="relative space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <span>{period}</span>
        </div>
        <h4 className="text-lg font-medium">{school}</h4>
        <p className="text-muted-foreground">{degree}</p>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        initial={false}
        whileHover={{
          boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.2)",
        }}
      />
    </motion.div>
  )
}

