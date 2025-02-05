'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  index: number;
  link?: string;
  tags?: string[];
}

export function ProjectCard({
  title,
  description,
  longDescription,
  imageUrl,
  index,
  link,
  tags = [],
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    damping: 15,
  });
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
    { damping: 15 }
  );
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [-2, 2]), {
    damping: 15,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleProjectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        scale,
        rotate: index % 2 === 0 ? rotate : rotate.get() * -1,
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Background glow - lowest z-index */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10"
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card container */}
      <motion.div
        className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
        style={{ y }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}>
        {/* Image section */}
        <motion.div
          className="relative aspect-[16/9] overflow-hidden cursor-pointer"
          onClick={handleProjectClick}>
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Image overlay - above image */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"
            animate={{
              opacity: isHovered ? 0.9 : 0.7,
            }}
          />

          {/* Animated border - above overlay */}
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
        </motion.div>

        {/* Content section - highest z-index for interactivity */}
        <div className="relative p-6 space-y-4 z-20">
          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}>
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Title */}
          <div className="space-y-2">
            <motion.h3
              className="text-2xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}>
              {title}
            </motion.h3>
            <motion.div
              className="h-1 w-12 bg-primary/30 rounded-full overflow-hidden"
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
          </div>

          {/* Description */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={isExpanded ? 'expanded' : 'collapsed'}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{ height: 0, opacity: 0 }}>
                <motion.p
                  className="text-muted-foreground text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}>
                  {isExpanded && longDescription
                    ? longDescription
                    : description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {longDescription && (
              <motion.button
                onClick={handleExpandClick}
                className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors relative z-30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </motion.button>
            )}
          </div>

          {/* Link */}
          {link && (
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}>
              <motion.button
                onClick={handleProjectClick}
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors relative z-30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <span>Ver proyecto</span>
                <motion.div
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Decorative hover effects - between card and content */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none z-10"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: '-100%' }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none z-10"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '-100%' }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
