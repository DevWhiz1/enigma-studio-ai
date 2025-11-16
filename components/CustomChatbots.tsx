'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Plus, Link as LinkIcon, Folder, Mic, Send } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VoiceAssistants from './VoiceAssistants'
gsap.registerPlugin(ScrollTrigger)

const tabs = ['PLAN', 'ANALYZE', 'FORECAST']
const messages = [
  { id: 1, text: 'How do I reset my password?', isUser: true, delay: 0 },
  { id: 2, text: 'I can help you reset your password. Let me guide you through the process.', isUser: false, delay: 1 },
  { id: 3, text: 'First, click on the "Forgot Password" link on the login page...', isUser: false, delay: 2 },
]

export default function CustomChatbots() {
  const [activeTab, setActiveTab] = useState('PLAN')
  const [inputValue, setInputValue] = useState('How do')
  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Animate messages appearing
    messages.forEach((msg) => {
      setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, msg])
      }, msg.delay * 1000)
    })
  }, [])

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const chatContainer = element.querySelector('.chat-container')
    if (!chatContainer) return

    // Set initial state
    gsap.set(chatContainer, { opacity: 0, y: 50 })

    const animation = gsap.to(chatContainer, {
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

  return (
    <>
    <section
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Custom Chatbots
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We build custom AI chat solutions for instant support and a seamless audience experience.
          </p>
        </motion.div>

        <div className="chat-container bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden" style={{ opacity: 0 }}>
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-6 min-h-[300px]">
            <AnimatePresence>
              {displayedMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.isUser
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {displayedMessages.length < messages.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1 items-center"
              >
                <div className="flex gap-1 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <LinkIcon className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Folder className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none px-4"
              placeholder="Type your message..."
            />
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Mic className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <VoiceAssistants />
        </div>
      </div>
    </section>
   
    {/* <VoiceAssistants /> */}
    </>
  )
  
}

