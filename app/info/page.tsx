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
import Link from 'next/link';
import {
  Mail,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const socialLinks = [
  { name: 'Portafolio', url: 'https://lalo.lol/me', icon: Globe },
  { name: 'GitHub', url: 'https://lalo.lol/gh', icon: Github },
  { name: 'LinkedIn', url: 'https://lalo.lol/in', icon: Linkedin },
  { name: 'Twitter', url: 'https://lalo.lol/x', icon: Twitter },
];

const services = [
  {
    icon: '🎨',
    title: 'Diseño de Páginas Web',
    description:
      'Soluciones personalizadas ideales para restaurantes, estudios de yoga, tiendas de moda y más.',
  },
  {
    icon: '🚀',
    title: 'Optimización SEO y Velocidad',
    description:
      'Todos los sitios están optimizados para motores de búsqueda y rendimiento rápido.',
  },
  {
    icon: '🛠️',
    title: 'Soporte y Actualizaciones',
    description:
      'Brindo soporte continuo para mantener tu sitio seguro y actualizado.',
  },
];

const contactInfo = [
  { icon: Globe, text: 'tunuevaweb.es', href: 'https://lalo.lol/tnw' },
  {
    icon: Mail,
    text: 'contacto@tunuevaweb.es',
    href: 'mailto:contacto@tunuevaweb.es',
  },
  {
    icon: Instagram,
    text: '@tunuevawebya',
    href: 'https://instagram.com/tunuevawebya',
  },
  {
    icon: MessageSquare,
    text: '@tunuevaweb',
    href: 'https://www.tiktok.com/@tunuevaweb',
  },
];

export default function InfoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    damping: 15,
  });

  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300]),
    { damping: 15 }
  );

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.9]), {
    damping: 15,
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 10]), {
    damping: 15,
  });

  return (
    <motion.main
      ref={containerRef}
      className="min-h-screen bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* Animated background patterns */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle at center, hsl(var(--primary) / 0.05), transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
            animate={{
              y: [0, 50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 py-16 max-w-4xl relative">
        {/* Header with Personal Information */}
        <motion.header
          className="text-center mb-12 relative z-10"
          style={{ y, scale }}>
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
            <div className="relative">
              <Image
                src="/profile-pic.png"
                alt="Gonzalo Azaldegi"
                width={200}
                height={200}
                className="rounded-full border-4 border-primary/20 relative z-10"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
                animate={{
                  backgroundPosition: ['200% 0%', '-200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.h1
              className="text-5xl font-bold mt-6 mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}>
              Gonzalo Azaldegi
              <motion.span
                className="absolute -inset-x-6 -inset-y-2 rounded-lg bg-primary/5"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl mb-4 text-foreground font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}>
            Desarrollador Web | Astro & Vue Specialist
          </motion.p>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}>
            Soy Gonzalo Azaldegi, desarrollador web especializado en frameworks
            modernos como Astro y Vue. Me apasiona el diseño minimalista y crear
            experiencias web atractivas y funcionales.
          </motion.p>
        </motion.header>

        {/* Social Links */}
        <motion.section
          className="grid gap-6 mb-16 md:grid-cols-2 lg:grid-cols-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between p-5 bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              style={{ rotate }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ['200% 0%', '-200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />
              <span className="font-semibold text-foreground text-lg relative z-10">
                {link.name}
              </span>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}>
                <link.icon className="w-6 h-6 text-primary relative z-10" />
              </motion.div>
            </motion.a>
          ))}
        </motion.section>

        {/* TuNuevaWeb Section */}
        <motion.section
          className="relative overflow-hidden rounded-2xl mb-16 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <motion.h2
                className="text-3xl font-bold mb-6 inline-block"
                animate={{
                  color: [
                    'hsl(var(--primary))',
                    'hsl(var(--secondary))',
                    'hsl(var(--accent))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}>
                TuNuevaWeb - Servicios Profesionales
                <motion.div
                  className="absolute -inset-x-4 -inset-y-2 rounded-lg bg-primary/5"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </motion.h2>
            </motion.div>

            <motion.p
              className="mb-6 leading-relaxed text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              En TuNuevaWeb ofrezco sitios web modernos y funcionales para
              negocios de todos los tamaños, desde muy bajo costo. Mis sitios te
              ayudarán a destacar en el ámbito digital.
            </motion.p>

            <motion.ul
              className="list-none mb-8 space-y-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}>
              {services.map((service, index) => (
                <motion.li
                  key={service.title}
                  className="group relative flex items-start p-4 rounded-xl transition-colors hover:bg-secondary/5"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}>
                  <motion.span
                    className="text-2xl mr-3 relative"
                    animate={
                      hoveredService === index
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}>
                    {service.icon}
                  </motion.span>
                  <span className="flex-1">
                    <strong className="text-foreground block mb-1">
                      {service.title}
                    </strong>
                    <span className="text-muted-foreground">
                      {service.description}
                    </span>
                  </span>
                  <AnimatePresence>
                    {hoveredService === index && (
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}>
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="group flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.3 }}>
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="relative">
                    {item.text}
                    <motion.span
                      className="absolute left-0 right-0 bottom-0 h-px bg-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Examples Section */}
        <motion.div
          className="text-center text-lg mb-16 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}>
          <p>Puedes ver dos ejemplos de páginas web en</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              {
                name: 'Bite&Smash',
                href: 'https://bite-and-smash.tunuevaweb.es',
                color: 'primary',
              },
              {
                name: 'Pulse Studio',
                href: 'https://pulse-studio.tunuevaweb.es',
                color: 'secondary',
              },
            ].map((example) => (
              <motion.div
                key={example.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  href={example.href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${example.color}/10 text-${example.color} hover:bg-${example.color}/20 transition-colors`}>
                  <span>{example.name}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Astro Template Section */}
        <motion.section
          className="relative overflow-hidden bg-card border border-border rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
            animate={{
              x: ['100%', '-100%'],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />

          <div className="relative">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              Astro Template
            </motion.h2>

            <motion.p
              className="mb-6 text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              Plantilla minimalista y moderna en Astro + TailwindCSS, ideal para
              proyectos rápidos y con estilo. Descárgala y personalízala.
            </motion.p>

            <motion.a
              href="https://github.com/AzalDevX/astro-template"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <span>Descargar Template</span>
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </div>
        </motion.section>

        {/* Vue Template Section */}
        <motion.section
          className="relative overflow-hidden bg-card border border-border rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
            animate={{
              x: ['100%', '-100%'],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />

          <div className="relative">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              Vue Template
            </motion.h2>

            <motion.p
              className="mb-6 text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}>
              Plantilla minimalista y moderna para Vue 3 + Vite + TailwindCSS,
              diseñada para aplicaciones de una sola página (SPA). Incluye
              configuración inicial optimizada y soporte para personalización
              completa.
            </motion.p>

            <motion.a
              href="https://github.com/AzalDevX/vue-template"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <span>Descargar Template</span>
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}>
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </div>
        </motion.section>

        {/* Contact Button */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
          <motion.div
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
          <motion.a
            href="mailto:me@azaldev.com"
            className="relative block w-full text-center bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground py-4 rounded-full text-xl font-bold overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
            <motion.span
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              className="relative inline-block">
              Contáctame
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Blog Link */}
        <motion.a
          href="https://lalo.lol/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-primary hover:text-primary/80 transition-colors mt-16 text-lg font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}>
          Lee mis artículos sobre desarrollo web
        </motion.a>
      </div>
    </motion.main>
  );
}
