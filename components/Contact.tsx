'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Send, Phone, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const sectionRef = useRef<HTMLElement>(null)
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const rightContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const leftContainer = element.querySelector('.left-container')
    const rightContainer = element.querySelector('.right-container')
    
    if (!leftContainer || !rightContainer) return

    // Set initial states
    gsap.set([leftContainer, rightContainer], { opacity: 0, y: 50 })

    const animation = gsap.to([leftContainer, rightContainer], {
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

  // Animate contact cards appearing one by one
  useEffect(() => {
    const container = leftContainerRef.current
    if (!container) return

    const cards = container.querySelectorAll('.contact-card')
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Send,
      title: 'Chat to sales',
      description: 'Contact our sales team.',
      value: 'sales@enigmastudio.ai',
      href: 'mailto:sales@enigmastudio.ai',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Get instant help.',
      value: '+923407005883',
      href: 'tel:+923407005883',
    },
    {
      icon: MapPin,
      title: 'Office:',
      description: 'Reach out to us any time for questions, support, or inquiries.',
      value: 'C-1 Block B-17, Islamad, Pakistan',
      href: '#',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section - Contact Info */}
          <div ref={leftContainerRef} className="left-container space-y-8">
            {/* Contact Us Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Contact Us
              </h2>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="contact-card group block"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative overflow-hidden">
                      {/* Subtle purple gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:to-purple-900/5 transition-all duration-500 rounded-2xl" />

                      <div className="relative z-10 flex items-start gap-4">
                        {/* Icon */}
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex-shrink-0 group-hover:border-white/20 transition-colors">
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-purple-200 transition-colors">
                            {info.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2 leading-relaxed">
                            {info.description}
                          </p>
                          <p className="text-white font-medium">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div ref={rightContainerRef} className="right-container">
            {/* Descriptive Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-right mb-8"
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                No delays, no vague replies — we respond within 24 hours to schedule your personalized discovery call.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>

                {/* More Info Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Your Bussiness Details
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Enter Your Message"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-white hover:bg-gray-100 rounded-lg font-semibold text-black transition-all duration-300"
                >
                  Send the message
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
