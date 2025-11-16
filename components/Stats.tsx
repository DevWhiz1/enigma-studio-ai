'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp, Users, Zap, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Project success',
    description: 'Delivered across 20+ countries—from startups to top corporations.',
    color: 'text-neon-cyan',
  },
  {
    icon: Users,
    value: '95%',
    label: 'Client efficiency',
    description: 'Clients reporting enhanced efficiency with our custom strategies.',
    color: 'text-neon-blue',
  },
  {
    icon: Zap,
    value: '10,000+',
    label: 'AI innovation',
    description: 'Hours spent crafting smart AI tools to optimize workflows across key industries.',
    color: 'text-neon-teal',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Industry recognition',
    description: 'Recognized for design, tech, and sustainability—past five years.',
    color: 'text-neon-pink',
  },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [countedValues, setCountedValues] = useState<string[]>(['0', '0%', '0', '0'])

  useEffect(() => {
    const counters = sectionRef.current?.querySelectorAll('.stat-card')
    
    counters?.forEach((card, index) => {
      const stat = stats[index]
      const targetValue = stat.value
      const isPercentage = targetValue.includes('%')
      const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''))
      
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
          onStart: () => {
            // Animate counting
            gsap.to(
              {},
              {
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  const progress = this.progress()
                  const current = Math.floor(numericValue * progress)
                  const displayValue = isPercentage
                    ? `${current}%`
                    : `${current.toLocaleString()}+`
                  setCountedValues((prev) => {
                    const newValues = [...prev]
                    newValues[index] = displayValue
                    return newValues
                  })
                },
              }
            )
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="results"
      className="min-h-screen py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Our Results</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tangible results, not empty claims — we build efficient AI tools that scale, optimize, and save valuable hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="stat-card group relative"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="glass rounded-2xl p-8 h-full border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-neon-blue/10 to-neon-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative z-10 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>

                    <motion.div
                      className="text-5xl md:text-6xl font-bold mb-2 gradient-text"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                    >
                      {countedValues[index]}
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-neon-cyan transition-colors">
                      {stat.label}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

