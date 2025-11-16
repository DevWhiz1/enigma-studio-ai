'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const companies = [
  'Brand', 'Brand', 'Brand', 'Brand', 'Brand', 'Brand',
  'Brand', 'Brand', 'Brand', 'Brand', 'Brand', 'Brand',
]

export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const logos = sectionRef.current?.querySelectorAll('.company-logo')
    
    logos?.forEach((logo, index) => {
      gsap.fromTo(logo,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: logo,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.05,
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
            Trusted by 100+ companies worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="company-logo group"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="glass rounded-xl p-6 border border-white/5 hover:border-neon-cyan/30 transition-all duration-500 flex items-center justify-center h-24">
                <span className="text-gray-400 group-hover:text-neon-cyan transition-colors font-semibold text-sm">
                  {company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

