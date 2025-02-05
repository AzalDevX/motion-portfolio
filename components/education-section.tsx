'use client';

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState } from 'react';
import {
  GraduationCap,
  Calendar,
  ChevronRight,
  BookOpen,
  Rocket,
} from 'lucide-react';

interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
  subjects: string[];
  projects: string[];
}

export function EducationSection({ education }: { education: Education[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <motion.div
            className="inline-block relative"
            whileHover={{ scale: 1.05 }}>
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}>
              Educación
            </motion.h3>
            <motion.div
              className="absolute -inset-x-6 -inset-y-2 rounded-lg bg-primary/5 -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Timeline line container */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-secondary/10">
            {/* Animated progress */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: progressHeight }}
            />

            {/* Floating particles along the line */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 -left-1 bg-primary rounded-full"
                animate={{
                  y: ['0%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}>
              {/* Content for larger screens */}
              <div
                className={`hidden md:block ${
                  index % 2 === 0 ? '' : 'md:col-start-3'
                }`}>
                <EducationCard
                  edu={edu}
                  isExpanded={expandedIndex === index}
                  isHovered={hoveredIndex === index}
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                />
              </div>

              {/* Center dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="relative"
                  animate={
                    expandedIndex === index
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat:
                      expandedIndex === index ? Number.POSITIVE_INFINITY : 0,
                  }}>
                  <motion.div
                    className={`
                      w-8 h-8 rounded-full bg-background border-4 
                      flex items-center justify-center relative z-10
                      ${
                        expandedIndex === index
                          ? 'border-primary'
                          : 'border-secondary'
                      }
                    `}
                    whileHover={{ scale: 1.2 }}>
                    <GraduationCap
                      className={`w-4 h-4 ${
                        expandedIndex === index
                          ? 'text-primary'
                          : 'text-secondary'
                      }`}
                    />
                  </motion.div>

                  {/* Orbital dots */}
                  {(expandedIndex === index || hoveredIndex === index) && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-primary/30"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                            ease: 'linear',
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${i * 45}deg) translateY(-20px)`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </div>

              {/* Content for mobile */}
              <div
                className={`md:hidden ${
                  index % 2 === 0 ? 'md:col-start-3' : ''
                }`}>
                <EducationCard
                  edu={edu}
                  isExpanded={expandedIndex === index}
                  isHovered={hoveredIndex === index}
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                />
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
              'radial-gradient(circle at 20% 20%, var(--primary-color) 0%, transparent 40%)',
              'radial-gradient(circle at 80% 80%, var(--primary-color) 0%, transparent 40%)',
              'radial-gradient(circle at 20% 20%, var(--primary-color) 0%, transparent 40%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          style={
            {
              '--primary-color': 'hsl(30 40% 40% / 0.2)',
            } as any
          }
        />
      </div>
    </div>
  );
}

function EducationCard({
  edu,
  isExpanded,
  isHovered,
  onClick,
}: {
  edu: Education;
  isExpanded: boolean;
  isHovered: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="group relative overflow-hidden">
      <motion.div
        className={`
          relative p-6 rounded-xl backdrop-blur-sm
          border border-border/50 transition-colors
          ${isExpanded ? 'bg-card' : 'bg-card/50 hover:bg-card/80'}
        `}
        whileHover={{ scale: 1.02 }}
        animate={isExpanded ? { scale: 1.02 } : { scale: 1 }}>
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <div className="relative space-y-2">
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            animate={isHovered ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 1 }}>
            <Calendar className="w-4 h-4" />
            <span>{edu.period}</span>
          </motion.div>

          <motion.h4
            layout="position"
            className="text-lg font-medium flex items-center gap-2">
            {edu.school}
            <motion.div
              animate={isExpanded ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.h4>

          <motion.p layout="position" className="text-muted-foreground">
            {edu.degree}
          </motion.p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-4 mt-4 border-t border-border">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}>
                    <p className="text-sm text-muted-foreground">
                      {edu.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <h5>Asignaturas principales</h5>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {edu.subjects.map((subject, i) => (
                        <motion.li
                          key={subject}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {subject}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Rocket className="w-4 h-4 text-primary" />
                      <h5>Proyectos destacados</h5>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {edu.projects.map((project, i) => (
                        <motion.li
                          key={project}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {project}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating particles */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
