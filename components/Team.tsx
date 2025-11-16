'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Linkedin, Github, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const teamMembers = [
  {
    name: 'Lucas Harris',
    role: 'AI Expert',
    description: '12+ years building intelligent systems and automation workflows.',
    image: '/team-1.jpg',
    gradient: 'from-neon-cyan to-neon-blue',
  },
  {
    name: 'Peter Johnson',
    role: 'Founder of Enigma',
    description: 'Visionary leader transforming businesses through AI innovation.',
    image: '/team-2.jpg',
    gradient: 'from-neon-blue to-neon-teal',
  },
  {
    name: 'Daniel Lee',
    role: 'Full-Stack Developer',
    description: 'Crafting seamless AI applications with cutting-edge technology.',
    image: '/team-3.jpg',
    gradient: 'from-neon-teal to-neon-cyan',
  },
  {
    name: 'Sofia Martin',
    role: 'Project Manager',
    description: 'Ensuring flawless execution and client satisfaction.',
    image: '/team-4.jpg',
    gradient: 'from-neon-pink to-neon-teal',
  },
]

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.team-card')
    
    cards?.forEach((card, index) => {
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
          delay: index * 0.15,
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="team"
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
            <span className="gradient-text">Our Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Skilled experts, not generic teams — we craft tailored AI systems that drive success and lasting impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card group relative"
              initial={{ opacity: 1 }}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="glass rounded-2xl p-6 border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 relative overflow-hidden">
                {/* Animated gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                />

                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div
                        className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.gradient} p-1 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center text-4xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center border-2 border-dark-bg">
                        <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-white text-center group-hover:text-neon-cyan transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-neon-cyan text-sm font-semibold mb-3 text-center">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm text-center leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {[Linkedin, Github, Mail].map((Icon, idx) => (
                      <motion.a
                        key={idx}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center hover:border-neon-cyan transition-colors"
                      >
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

