'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Plus, Link as LinkIcon, Folder, Mic, Send } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tabs = ['PLAN', 'ANALYZE', 'FORECAST']
const messages = [
  { id: 1, text: 'How do I reset my password?', isUser: true, delay: 0 },
  { id: 2, text: 'I can help you reset your password. Let me guide you through the process.', isUser: false, delay: 1 },
  { id: 3, text: 'First, click on the "Forgot Password" link on the login page...', isUser: false, delay: 2 },
]

const typingQuestions = [
  'how do i forget my password?',
  'how can i refund my amount?',
  'how do i contact support?',
  'how can i update my profile?',
  'how do i cancel my subscription?',
  'how can i change my email?',
  'how do i reset my account?',
  'how can i get a refund?',
]

const incomingCalls = [
  { id: 1, name: 'Potential Buyer', avatar: '👤' },
  { id: 2, name: 'Potential Buyer', avatar: '👨' },
  { id: 3, name: 'Potential Buyer', avatar: '👩' },
  { id: 4, name: 'Potential Buyer', avatar: '🧑' },
  { id: 5, name: 'Potential Buyer', avatar: '👴' },
  { id: 6, name: 'Potential Buyer', avatar: '👵' },
]

export default function ChatbotsAndVoice() {
  const [activeTab] = useState('PLAN')
  const [inputValue, setInputValue] = useState('')
  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messagesInitialized = useRef(false)

  useEffect(() => {
    // Prevent duplicate messages in React Strict Mode
    if (messagesInitialized.current) return
    messagesInitialized.current = true

    // Animate messages appearing
    messages.forEach((msg) => {
      setTimeout(() => {
        setDisplayedMessages((prev) => {
          // Check if message already exists to prevent duplicates
          if (prev.some(m => m.id === msg.id)) return prev
          return [...prev, msg]
        })
      }, msg.delay * 1000)
    })
  }, [])

  // Animated typing effect for input field
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout
    let currentCharIndex = 0
    let questionIndex = 0
    let currentQuestion = typingQuestions[questionIndex]
    let isActive = true

    const typeText = () => {
      if (!isActive) return
      
      if (currentCharIndex < currentQuestion.length) {
        setInputValue(currentQuestion.slice(0, currentCharIndex + 1))
        currentCharIndex++
        typingTimeout = setTimeout(typeText, 100) // Typing speed: 100ms per character
      } else {
        // Finished typing, wait then clear and move to next question
        setTimeout(() => {
          if (!isActive) return
          setInputValue('')
          currentCharIndex = 0
          questionIndex = (questionIndex + 1) % typingQuestions.length
          currentQuestion = typingQuestions[questionIndex]
          setCurrentQuestionIndex(questionIndex)
          // Start typing next question after a pause
          setTimeout(() => {
            if (isActive) {
              typeText()
            }
          }, 1500)
        }, 2000) // Wait 2 seconds before clearing
      }
    }

    // Start typing after initial delay
    const startDelay = setTimeout(() => {
      if (isActive) {
        setIsTyping(true)
        typeText()
      }
    }, 3000)

    return () => {
      isActive = false
      clearTimeout(startDelay)
      clearTimeout(typingTimeout)
    }
  }, [])

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const chatContainer = element.querySelector('.chat-container')
    const voiceContainer = element.querySelector('.voice-container')
    
    if (!chatContainer || !voiceContainer) return

    // Set initial states
    gsap.set([chatContainer, voiceContainer], { opacity: 0, y: 50 })

    const animation = gsap.to([chatContainer, voiceContainer], {
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

  // Continuous scroll animation for voice assistants
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let tl: gsap.core.Timeline | null = null

    // Wait for container to render
    const timeoutId = setTimeout(() => {
      // Calculate height of one complete set (6 calls)
      // Each call item is approximately 90px with spacing
      const itemHeight = 90
      const setHeight = incomingCalls.length * itemHeight
      
      // Create infinite scroll timeline
      tl = gsap.timeline({ repeat: -1 })
      
      tl.to(container, {
        y: -setHeight,
        duration: 20,
        ease: 'none',
      })
      
      // Reset position instantly (invisible to user due to duplicate content)
      tl.set(container, { y: 0 })
    }, 200)

    return () => {
      clearTimeout(timeoutId)
      if (tl) {
        tl.kill()
      }
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            AI Solutions
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Custom chatbots and voice assistants for seamless customer experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Custom Chatbots Panel */}
          <div className="chat-container bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden" style={{ opacity: 0 }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Custom Chatbots</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                We build custom AI chat solutions for instant support and a seamless audience experience.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 pointer-events-none ${
                    activeTab === tab
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-400'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 min-h-[250px] sm:min-h-[300px]">
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
                      className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 sm:px-4 py-2 sm:py-3 ${
                        message.isUser
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-white/5 text-gray-300 border border-white/10'
                      }`}
                    >
                      <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
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
                  <div className="flex gap-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 rounded-lg border border-white/10">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full"
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
            <div className="flex items-center gap-1 sm:gap-2 p-2 sm:p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-1 sm:gap-2 pointer-events-none">
                <div className="p-1.5 sm:p-2 rounded-lg">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
                <div className="hidden sm:block p-1.5 sm:p-2 rounded-lg">
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
                <div className="hidden sm:block p-1.5 sm:p-2 rounded-lg">
                  <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </div>
              <div className="flex-1 relative min-w-0">
                <input
                  type="text"
                  value={inputValue}
                  readOnly
                  disabled
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none px-2 sm:px-4 text-xs sm:text-sm pointer-events-none"
                  placeholder="Type your message..."
                />
                {isTyping && (
                  <motion.span
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white text-base sm:text-lg"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-2 pointer-events-none">
                <div className="p-1.5 sm:p-2 rounded-lg">
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Voice Assistants Panel */}
          <div className="voice-container bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden" style={{ opacity: 0 }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Voice Assistants</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                We build smart voice solutions for effortless control, better access, and engaging user experiences.
              </p>
            </div>

            {/* Scrollable Calls List */}
            <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
              <div 
                ref={scrollContainerRef}
                className="space-y-3"
              >
                {/* Render calls multiple times for seamless infinite scroll */}
                {[...incomingCalls, ...incomingCalls, ...incomingCalls].map((call, index) => (
                  <motion.div
                    key={`${call.id}-${index}`}
                    className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <motion.div
                        className="text-2xl sm:text-3xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: (index % incomingCalls.length) * 0.3,
                        }}
                      >
                        {call.avatar}
                      </motion.div>
                      <div>
                        <p className="text-white font-medium text-sm sm:text-base">{call.name}</p>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                          <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"
                            animate={{
                              opacity: [1, 0.3, 1],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                            }}
                          />
                          <span className="text-xs sm:text-sm text-gray-400">INCOMING CALL</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 sm:p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

