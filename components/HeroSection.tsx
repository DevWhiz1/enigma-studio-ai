'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Eye, Phone } from 'lucide-react'
export default function HeroSimple() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial states
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 })
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
    }
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current.children, { opacity: 0, y: 20 })
    }

    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.2 })
    
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
    
    if (buttonsRef.current) {
      tl.to(
        buttonsRef.current.children,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      )
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
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
       
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: 'brightness(1.12) contrast(1.05)' }}
      > 
      <source src="https://res.cloudinary.com/dxrr3gb42/video/upload/v1764920792/HomePage_bfheru.mp4"/>
        {/* <source src="https://res.cloudinary.com/dxrr3gb42/video/upload/f_auto,q_auto/HomePage_bfheru.mp4" type="video/mp4" /> */}
      </video>


      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/10 via-black/10 to-black/20 z-10" />
      
      {/* Grid background (subtle) */}
      <div 
        className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated particles - white and purple dots */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
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
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
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

      <div className="relative z-20 flex h-screen items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          {/* Pill tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/20 rounded-full bg-black/50 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-white uppercase tracking-wider font-medium">
              Cutting-Edge AI Solutions
            </span>
          </motion.div>

          {/* Main headline */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white"
          >
            Fuel Your Growth
            <br />
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              With Next-Gen AI
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Unlock new levels of productivity with intelligent automation.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white border border-white/20 rounded-lg font-semibold text-black flex items-center gap-2 transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              See our pricing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white border border-white/20 rounded-lg font-semibold text-black flex items-center gap-2 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Book a free call
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

