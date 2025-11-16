'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    // Set initial states
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 })
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
    }
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 20 })
    }

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
        once: true,
      },
    })

    if (titleRef.current) {
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }

    if (subtitleRef.current) {
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }

    if (buttonRef.current) {
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }

    return () => {
      tl.kill()
      const triggers = ScrollTrigger.getAll()
      triggers.forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Animated particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated particles - white and purple dots */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Additional purple particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`purple-${i}`}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
        >
          Ready to Transform Your
          <br />
          <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Business with AI?
          </span>
        </h2>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          Book a free strategy session and discover how intelligent automation
          can revolutionize your operations.
        </p>

        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-black border border-white/20 rounded-lg font-semibold text-white flex items-center gap-2 hover:bg-white/5 transition-all duration-300 mx-auto"
        >
          <span>Book a Free Strategy Session</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  )
}
