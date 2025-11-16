'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow Inc.',
    content:
      'Enigma Studio transformed our operations with intelligent automation. Our team now focuses on strategy while AI handles the routine tasks. The results exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO, DataVault Solutions',
    content:
      'The RAG system they built for us revolutionized how we access and use our knowledge base. Search times dropped by 90%, and accuracy improved dramatically.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Operations Director, RealEstate Pro',
    content:
      'Their AI agent handles lead qualification so well that our sales team can focus on closing deals. We\'ve seen a 4x increase in conversion rates.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Founder, EcomBoost',
    content:
      'The automation engine they created runs our entire e-commerce operation. Inventory, customer service, marketing—all automated and working flawlessly.',
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(sliderRef.current.children,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
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
            <span className="gradient-text">Client Success Stories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear from businesses transformed by intelligent automation
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-center group"
                initial={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ 
                  hover: { type: 'spring', stiffness: 300 }
                }}
              >
                <div className="glass rounded-2xl p-8 h-full border border-white/10 group-hover:border-neon-cyan/70 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

                  <div className="relative z-10">
                    <Quote className="w-12 h-12 text-neon-cyan mb-6 opacity-50" />
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <span
                              key={i}
                              className="text-neon-cyan text-xl"
                            >
                              ★
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

