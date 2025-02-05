"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import data from "@/data/personal-info.json"

export function HeroSection() {
  const { personal } = data
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <motion.div style={{ y, opacity }} className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Animated background shapes */}
          <motion.div
            className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] bg-accent/30 rounded-full blur-3xl"
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Floating elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
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
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            {personal.name}
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{personal.title}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 text-muted-foreground mb-8"
        >
          {[
            { Icon: MapPin, text: personal.location },
            { Icon: Mail, text: personal.email, href: `mailto:${personal.email}` },
            { Icon: Phone, text: personal.phone, href: `tel:${personal.phone}` },
          ].map(({ Icon, text, href }, index) => (
            <motion.div key={text} className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <Icon className="w-5 h-5" />
              {href ? (
                <a href={href} className="hover:text-foreground transition-colors relative group">
                  {text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ) : (
                <span>{text}</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="relative px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <span className="relative">Ver Proyectos</span>
        </motion.button>
      </div>
    </div>
  )
}

