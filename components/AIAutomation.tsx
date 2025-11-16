'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Zap, Mail, Users, DollarSign, Briefcase, FileText, TrendingUp, Sparkles, Network } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const automationWorkflows = [
  {
    id: 1,
    title: 'CRM Automation',
    description: 'HubSpot, Zoho, Salesforce',
    icon: Users,
  },
  {
    id: 2,
    title: 'Email & WhatsApp',
    description: 'Automated messaging & follow-ups',
    icon: Mail,
  },
  {
    id: 3,
    title: 'Lead Qualification',
    description: 'Automatic follow-ups & scoring',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Finance & Invoicing',
    description: 'Automated billing & payments',
    icon: DollarSign,
  },
  {
    id: 5,
    title: 'HR Onboarding',
    description: 'Streamlined employee setup',
    icon: Briefcase,
  },
]

const tools = ['n8n', 'Make', 'Zapier', 'LangChain', 'CrewAI']

const aiAgents = [
  {
    id: 1,
    title: 'Generative Content Agent',
    description: 'AI-powered content creation and generation',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Predictive Analytics Agent',
    description: 'Data-driven insights and forecasting',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'Recommendation Engine Agent',
    description: 'Personalized recommendations and suggestions',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Multi-Agent Collaboration System',
    description: 'Coordinated multi-agent workflows',
    icon: Network,
  },
]

export default function AIAutomation() {
  const sectionRef = useRef<HTMLElement>(null)
  const workflowContainerRef = useRef<HTMLDivElement>(null)
  const agentsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const automationContainer = element.querySelector('.automation-container')
    const agentsContainer = element.querySelector('.agents-container')
    
    if (!automationContainer || !agentsContainer) return

    // Set initial states
    gsap.set([automationContainer, agentsContainer], { opacity: 0, y: 50 })

    const animation = gsap.to([automationContainer, agentsContainer], {
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

  // Animate workflows appearing one by one
  useEffect(() => {
    const container = workflowContainerRef.current
    if (!container) return

    const workflowItems = container.querySelectorAll('.workflow-item')
    
    workflowItems.forEach((item, index) => {
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

  // Animate agents appearing one by one
  useEffect(() => {
    const container = agentsContainerRef.current
    if (!container) return

    const agentItems = container.querySelectorAll('.agent-item')
    
    agentItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          x: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
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
      id="automation"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            AI Automation & Workflow Systems
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Helping businesses save time and money by automating daily operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Automation Workflows */}
          <div className="automation-container bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden" style={{ opacity: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">Workflow Automation</h3>
              <p className="text-sm text-gray-400">
                Automate daily operations and streamline business processes.
              </p>
            </div>

            {/* Tools Badge */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Tools:</span>
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300"
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Workflows List - Simple and Clean */}
            <div ref={workflowContainerRef} className="space-y-3">
              {automationWorkflows.map((workflow, index) => {
                const Icon = workflow.icon
                return (
                  <motion.div
                    key={workflow.id}
                    className="workflow-item flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{workflow.title}</p>
                        <p className="text-sm text-gray-400 mt-1">{workflow.description}</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Panel - AI Agents */}
          <div className="agents-container bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden" style={{ opacity: 0 }}>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">AI Agents</h3>
              <p className="text-sm text-gray-400">
                Intelligent agents for advanced automation and decision-making.
              </p>
            </div>

            {/* Agents List - Different Design */}
            <div ref={agentsContainerRef} className="space-y-4">
              {aiAgents.map((agent) => {
                const Icon = agent.icon
                return (
                  <motion.div
                    key={agent.id}
                    className="agent-item p-5 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{agent.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{agent.description}</p>
                      </div>
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

