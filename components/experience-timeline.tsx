"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Building2, Calendar, ArrowRight, ArrowLeft } from "lucide-react"
import { useScrollLock } from "@/utils/use-scroll-lock"

interface Experience {
  company: string
  period: string
  description: string
}

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Lock scroll during transitions
  useScrollLock(isTransitioning)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Transform scroll progress into experience index with transition lock
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!isTransitioning) {
        const newIndex = Math.min(experiences.length - 1, Math.floor(latest * experiences.length))
        if (newIndex !== currentIndex) {
          setIsTransitioning(true)
          setDirection(newIndex > currentIndex ? 1 : -1)
          setCurrentIndex(newIndex)

          // Release scroll lock after animation
          setTimeout(() => {
            setIsTransitioning(false)
          }, 800) // Match this with your animation duration
        }
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress, experiences.length, currentIndex, isTransitioning])

  const yearProgress = useTransform(scrollYProgress, [0, 1], [2024, 2023])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <div ref={containerRef} className="relative min-h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto px-4">
          {/* Timeline UI */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Year indicator */}
            <motion.div className="absolute -top-32 left-1/2 -translate-x-1/2 flex items-baseline gap-4">
              <motion.span className="text-8xl font-bold text-primary/20">{Math.round(yearProgress.get())}</motion.span>
            </motion.div>

            {/* Content */}
            <div className="col-span-full md:col-span-1 md:col-start-1 relative h-[400px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  <div className="space-y-4 text-right">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-3 bg-secondary/20 px-6 py-2 rounded-full"
                    >
                      <span className="text-sm text-muted-foreground">{experiences[currentIndex].period}</span>
                      <Calendar className="w-4 h-4 text-primary" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold"
                    >
                      {experiences[currentIndex].company}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {experiences[currentIndex].description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center timeline */}
            <div className="hidden md:flex flex-col items-center gap-4">
              <div className="w-px h-32 bg-secondary/50" />
              <motion.div
                className="relative w-16 h-16 rounded-full border-4 border-secondary bg-background flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Building2 className="w-6 h-6 text-primary" />

                {/* Orbital dots */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                      ease: "linear",
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-30px)`,
                    }}
                  />
                ))}
              </motion.div>
              <div className="w-px h-32 bg-secondary/50" />
            </div>

            {/* Progress indicators */}
            <div className="col-span-full md:col-span-1 flex md:flex-col gap-4 justify-center">
              {experiences.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-secondary/50"}`}
                  whileHover={{ scale: 1.2 }}
                  animate={
                    index === currentIndex
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: index === currentIndex ? Number.POSITIVE_INFINITY : 0,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (currentIndex > 0) {
                    setDirection(-1)
                    setCurrentIndex(currentIndex - 1)
                  }
                }}
                className={`p-3 rounded-full ${
                  currentIndex === 0 ? "bg-secondary/20 text-muted-foreground" : "bg-primary text-primary-foreground"
                }`}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (currentIndex < experiences.length - 1) {
                    setDirection(1)
                    setCurrentIndex(currentIndex + 1)
                  }
                }}
                className={`p-3 rounded-full ${
                  currentIndex === experiences.length - 1
                    ? "bg-secondary/20 text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
                disabled={currentIndex === experiences.length - 1}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, var(--primary-color) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, var(--primary-color) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, var(--primary-color) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={
                {
                  "--primary-color": "hsl(30 40% 40% / 0.2)",
                } as any
              }
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

