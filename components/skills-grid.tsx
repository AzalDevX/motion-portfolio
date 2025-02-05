'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Skill {
  name: string;
  category: string;
  level: number; // 1-100
  icon?: string;
}

const categories = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Herramientas',
  design: 'Diseño',
};

const skillsData: Skill[] = [
  { name: 'React', category: 'frontend', level: 90 },
  { name: 'Vue', category: 'frontend', level: 85 },
  { name: 'Astro', category: 'frontend', level: 80 },
  { name: 'HTML/CSS', category: 'frontend', level: 95 },
  { name: 'JavaScript', category: 'frontend', level: 90 },
  { name: 'Node', category: 'backend', level: 85 },
  { name: 'Laravel', category: 'backend', level: 80 },
  { name: 'PHP', category: 'backend', level: 85 },
  { name: 'SQL', category: 'backend', level: 80 },
  { name: 'Bootstrap', category: 'tools', level: 90 },
  { name: 'TailwindCSS', category: 'tools', level: 95 },
  { name: 'Figma', category: 'design', level: 85 },
];

export function SkillsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skillsData.filter(
    (skill) => selectedCategory === 'all' || skill.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <CategoryButton
          active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}>
          Todos
        </CategoryButton>
        {Object.entries(categories).map(([key, label]) => (
          <CategoryButton
            key={key}
            active={selectedCategory === key}
            onClick={() => setSelectedCategory(key)}>
            {label}
          </CategoryButton>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        layout>
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            className="relative">
            <div className="group relative overflow-hidden rounded-xl bg-secondary/20 p-4 pb-6 py-7 transition-colors hover:bg-secondary/30">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />

              {/* Skill content */}
              <div className="relative space-y-2">
                <div className="text-center font-medium">{skill.name}</div>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/30">
                  <motion.div
                    className="h-full bg-primary/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>

                {/* Level indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                  {skill.level}%
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function CategoryButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${
          active
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/30'
        }
      `}>
      {children}
    </motion.button>
  );
}
