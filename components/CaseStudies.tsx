'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, TrendingUp, Zap, FileText } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const caseStudies = [
  {
    id: 1,
    title: 'Real Estate AI Agent',
    description:
      'Automated lead qualification, instant property matching, and intelligent client communication.',
    results: ['4× faster closing', '90% lead qualification accuracy', '24/7 automated responses'],
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'E-commerce Automation Engine',
    description:
      'Complete automation system for inventory management, customer support, and personalized marketing.',
    results: [
      'Real-time inventory sync',
      'AI-powered support chatbot',
      'Automated customer segmentation',
    ],
    icon: Zap,
  },
  {
    id: 3,
    title: 'Finance Document Intelligence',
    description:
      'Advanced RAG system for document processing, extraction, and compliance monitoring.',
    results: [
      'Vector-based document search',
      'Automated data extraction',
      'Real-time compliance alerts',
    ],
    icon: FileText,
  },
]

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const header = element.querySelector('.case-studies-header')
    const cardsContainer = element.querySelector('.cards-container')
    
    if (!header || !cardsContainer) return

    // Set initial states
    gsap.set([header, cardsContainer], { opacity: 0, y: 50 })

    const animation = gsap.to([header, cardsContainer], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
        once: true,
      },
    })

    return () => {
      animation.kill()
      const triggers = ScrollTrigger.getAll()
      triggers.forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Animate cards appearing one by one
  useEffect(() => {
    const container = cardsContainerRef.current
    if (!container) return

    const cards = container.querySelectorAll('.case-card')
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 case-studies-header"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Case Studies
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real results from intelligent automation and AI solutions
          </p>
        </motion.div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 cards-container">
          {caseStudies.map((caseStudy) => {
            const Icon = caseStudy.icon
            return (
              <motion.div
                key={caseStudy.id}
                className="case-card group cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCase(caseStudy.id)}
              >
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 h-full hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative overflow-hidden">
                  {/* Subtle purple gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:to-purple-900/5 transition-all duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 w-fit group-hover:border-white/20 transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {caseStudy.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-white font-medium group-hover:text-purple-200 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl w-full relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-transparent -z-10" />

              {/* Close button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {(() => {
                const caseStudy = caseStudies.find((c) => c.id === selectedCase)
                if (!caseStudy) return null

                const Icon = caseStudy.icon

                return (
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10 w-fit">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {caseStudy.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {caseStudy.description}
                    </p>

                    {/* Results */}
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-white mb-4">
                        Key Results:
                      </h4>
                      {caseStudy.results.map((result, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-purple-400" />
                          <span className="text-gray-300">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

