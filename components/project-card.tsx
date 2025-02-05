'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
  link: string;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  index,
  link,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll based animations
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['100% 0%', '100% 100%', '0% 100%']
  );

  return (
    <motion.div
      ref={cardRef}
      className="relative my-8 bg-primary/10 rounded-xl shadow-lg overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? 'none'
          : `translateX(${index % 2 === 0 ? '-' : ''}200px)`,
      }}
      transition={{ duration: 0.8 }}>
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Background layers */}
        <div className="absolute inset-0 rounded-3xl bg-muted/20 transition-transform duration-300 group-hover:scale-95" />
        <div className="absolute inset-2 rounded-2xl bg-muted/30 transition-transform duration-300 group-hover:scale-100" />

        {/* Main content container */}
        <div className="relative rounded-xl overflow-hidden">
          <motion.div className="relative grid grid-cols-[0.8fr,1.2fr] min-h-[400px] p-1">
            {/* Image section with mask */}
            <div className="relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent"
                style={{
                  clipPath: `polygon(0 0, ${clipProgress}, 0 100%)`,
                }}
              />
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="h-full">
                <Image
                  src={imageUrl || '/placeholder.svg'}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Animated overlay patterns */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none">
                <motion.path
                  d="M0,0 L100,0 L100,100 L0,100 Z"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isHovered ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* Content section */}
            <div className="relative pl-8 pr-4 py-8 flex flex-col justify-between">
              {/* Title and description */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}>
                  <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                  <motion.div
                    className="h-1 bg-primary/30 mt-2 rounded-full overflow-hidden"
                    initial={{ width: '2rem' }}
                    animate={{ width: isHovered ? '4rem' : '2rem' }}
                    transition={{ duration: 0.3 }}>
                    <motion.div
                      className="h-full bg-primary"
                      animate={{
                        x: isHovered ? ['0%', '100%'] : '0%',
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'reverse',
                      }}
                    />
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-muted-foreground text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  {description}
                </motion.p>
              </div>

              {/* Action button */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2">
                  <motion.div
                    className="relative px-6 py-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      animate={{
                        background: isHovered
                          ? [
                              'radial-gradient(circle at 0% 50%, hsl(var(--primary) / 0.2) 0%, transparent 50%)',
                              'radial-gradient(circle at 100% 50%, hsl(var(--primary) / 0.2) 0%, transparent 50%)',
                            ]
                          : 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 0%)',
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'reverse',
                      }}
                    />
                    <span className="relative text-sm font-medium text-primary">
                      Ver proyecto
                    </span>
                  </motion.div>
                  <motion.div
                    animate={{
                      x: isHovered ? 5 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    }}>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            {/* Decorative elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={false}
                animate={
                  isHovered
                    ? {
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 180, 360],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                  top: `${20 + i * 30}%`,
                  right: `${10 + i * 5}%`,
                  width: `${20 + i * 5}px`,
                  height: `${20 + i * 5}px`,
                  border: '2px solid hsl(var(--primary) / 0.2)',
                  borderRadius: '2px',
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
