'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    id: 1,
    question: 'What does the membership include?',
    answer:
      'The membership gives you unlimited access to our AI tools, regular updates, priority support, and expert resources to help you achieve your business goals.',
  },
  {
    id: 2,
    question: 'How do I get started with your services?',
    answer:
      'Getting started is simple. Book a free strategy session with our team, and we\'ll assess your needs, create a custom roadmap, and begin implementation within days.',
  },
  {
    id: 3,
    question: 'Can I cancel my membership anytime?',
    answer:
      'Yes, you can cancel your membership at any time. There are no long-term contracts or cancellation fees. Your access continues until the end of your billing period.',
  },
  {
    id: 4,
    question: 'Do I need technical expertise to use your tools?',
    answer:
      'Not at all. Our AI solutions are designed to be user-friendly and intuitive. We provide comprehensive training and support to ensure your team can leverage the full power of our tools.',
  },
  {
    id: 5,
    question: 'Are there additional costs?',
    answer:
      'Our pricing is transparent with no hidden fees. The plans include all core features, updates, and support. Custom integrations or enterprise features may have additional costs, which we discuss upfront.',
  },
  {
    id: 6,
    question: 'How often do you release updates?',
    answer:
      'We release updates monthly with new features, improvements, and security patches. Major updates are released quarterly, and all updates are included in your membership at no extra cost.',
  },
]

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.faq-item')
    
    items?.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.08,
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="min-h-screen py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">FAQs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to the most common questions about our services, AI solutions, and how we can help your business grow.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="faq-item group"
              initial={{ opacity: 1 }}
            >
              <div className="glass rounded-xl border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-neon-cyan" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

