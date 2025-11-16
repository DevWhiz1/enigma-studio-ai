'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { ArrowRight, Target, Database, Cpu, CheckCircle2, Rocket } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    id: 1,
    number: '01',
    title: 'Define Objectives and Use Cases',
    description: 'We begin by identifying specific challenges or workflows where AI agents can add value. Clear goals are defined to align the AI solution with your business objectives, ensuring measurable outcomes.',
    icon: Target,
  },
  {
    id: 2,
    number: '02',
    title: 'Collect and Prepare Data',
    description: 'Data is the foundation of AI. We gather, clean, and refine data to ensure its quality and relevance for training and deploying AI agents. This step ensures accuracy and reliability in decision-making.',
    icon: Database,
  },
  {
    id: 3,
    number: '03',
    title: 'Design and Train the AI Agent',
    description: 'Using advanced tools and algorithms, we design and train the AI agent to perform tasks autonomously. This includes equipping the agent with memory, reasoning capabilities, and access to relevant systems and data sources.',
    icon: Cpu,
  },
  {
    id: 4,
    number: '04',
    title: 'Test and Validate Performance',
    description: 'The AI agent undergoes rigorous testing in real-world scenarios to validate its accuracy and functionality. Feedback loops are used to refine the agent\'s performance and address any issues before full deployment.',
    icon: CheckCircle2,
  },
  {
    id: 5,
    number: '05',
    title: 'Deploy, Monitor, and Optimize',
    description: 'Once validated, the AI agent is deployed into your operations. Continuous monitoring ensures the agent adapts to new data and evolving business needs. Regular updates and optimizations keep the system running smoothly and effectively.',
    icon: Rocket,
  },
]

export default function AIAgentProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const leftPanel = leftPanelRef.current
    const timeline = timelineRef.current
    
    if (!leftPanel || !timeline) return

    // Set initial states
    gsap.set(leftPanel, { opacity: 0, x: -50 })
    gsap.set(timeline, { opacity: 0, x: 50 })

    const animation = gsap.to([leftPanel, timeline], {
      opacity: 1,
      x: 0,
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

  // Animate steps appearing one by one
  useEffect(() => {
    const container = timelineRef.current
    if (!container) return

    const stepItems = container.querySelectorAll('.step-item')
    
    stepItems.forEach((item, index) => {
      gsap.fromTo(item,
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
            trigger: item,
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
      id="process"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Panel - Title and CTA Button */}
          <div 
            ref={leftPanelRef}
            className="flex flex-col justify-center items-start space-y-8"
            style={{ opacity: 0 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              The AI Agent Implementation Process
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white hover:bg-gray-100 rounded-xl font-semibold text-black flex items-center gap-3 transition-all duration-300 group"
            >
              <span>Shape your Idea</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Right Panel - Timeline */}
          <div 
            ref={timelineRef}
            className="relative"
            style={{ opacity: 0 }}
          >
            {/* Vertical Dashed Timeline Line */}
            <div 
              className="absolute left-6 top-0 bottom-0"
              style={{
                width: '2px',
                background: 'repeating-linear-gradient(to bottom, transparent, transparent 8px, rgba(255, 255, 255, 0.2) 8px, rgba(255, 255, 255, 0.2) 12px)',
              }}
            />
            
            <div className="space-y-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                const isLast = index === processSteps.length - 1
                
                return (
                  <motion.div
                    key={step.id}
                    className="step-item relative pl-16"
                  >
                    {/* Step Circle */}
                    <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center z-10">
                      <motion.div 
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:border-purple-400/50 hover:bg-white/15 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      {!isLast && (
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 border-l-2 border-dashed border-white/20" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

