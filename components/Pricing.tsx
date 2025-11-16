'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter Automation',
    price: '$5,000',
    period: 'one-time',
    description: 'Perfect for small businesses looking to automate key processes',
    features: [
      'Basic workflow automation',
      'CRM integration',
      'Email automation',
      'Up to 5 workflows',
      '3 months support',
    ],
    popular: false,
  },
  {
    name: 'Business AI Package',
    price: '$15,000',
    period: 'one-time',
    description: 'Comprehensive AI solution for growing businesses',
    features: [
      'Custom AI agent development',
      'RAG knowledge base',
      'Advanced automation workflows',
      'Unlimited workflows',
      '6 months support',
      'Performance analytics',
    ],
    popular: true,
  },
  {
    name: 'Enterprise AI Transformation',
    price: 'Custom',
    period: 'project-based',
    description: 'Complete AI transformation for large organizations',
    features: [
      'Multi-agent AI systems',
      'Enterprise RAG + Vector DB',
      'Full-stack AI applications',
      'Custom integrations',
      '12 months support',
      'Dedicated AI team',
      'Ongoing optimization',
    ],
    popular: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const header = element.querySelector('.pricing-header')
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

    const cards = container.querySelectorAll('.pricing-card')
    
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
      id="pricing"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pricing-header"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Pricing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your automation needs
          </p>
        </motion.div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 cards-container">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="pricing-card group relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div
                    className="px-4 py-1.5 bg-black border border-white/20 rounded-full text-xs font-semibold flex items-center gap-2 text-white backdrop-blur-sm"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Most Popular
                  </motion.div>
                </div>
              )}

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 h-full hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative overflow-hidden">
                {/* Subtle purple gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:to-purple-900/5 transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-200 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-400 ml-2 text-sm">/{plan.period}</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-lg font-semibold mb-8 bg-black border border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                  >
                    Get Started
                  </motion.button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-0.5 group-hover:border-purple-400/50 transition-colors">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
