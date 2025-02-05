"use client"

import { motion } from "framer-motion"

interface FadeInStaggerProps {
  children: React.ReactNode
  delay?: number
}

export function FadeInStagger({ children, delay = 0.2 }: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            staggerChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function FadeInStaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

