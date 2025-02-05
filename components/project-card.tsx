"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import Image from "next/image"
import type { MouseEvent } from "react"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  index: number
}

export function ProjectCard({ title, description, imageUrl, index }: ProjectCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-2xl bg-secondary/50 p-1 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(120, 90, 60, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        <div className="relative overflow-hidden rounded-xl">
          <div className="aspect-video">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

