'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Youtube } from 'lucide-react'
import Image from 'next/image'
import logo from '../assets/logo.png'

const navigationLinks = [
  { name: 'About', href: '#' },
  { name: 'Services', href: '#services' },
  { name: 'Plans', href: '#pricing' },
  { name: 'Team', href: '#team' },

]

const legalLinks = [
  { name: 'Terms of service', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'FAQs', href: '#faqs' },
]

const socialLinks = [
  { name: 'X/Twitter', href: '#', icon: Twitter },
  { name: 'Linkedin', href: '#', icon: Linkedin },
  { name: 'YouTube', href: '#', icon: Youtube },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black via-black to-purple-900/30">
      {/* Large background text overlay with glowing effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[200px] md:text-[300px] lg:text-[400px] font-bold text-white select-none"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textShadow: `
              0 0 40px rgba(168, 85, 247, 0.4),
              0 0 80px rgba(168, 85, 247, 0.3),
              0 0 120px rgba(168, 85, 247, 0.2),
              0 0 160px rgba(168, 85, 247, 0.1)
            `,
            filter: 'blur(0.5px)',
          }}
        >
          Enigma
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Left Section - Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <Image
                src={logo}
                alt="Enigma Logo"
                width={40}
                height={40}
                className="object-contain h-10 w-10"
              />
              <span className="text-2xl font-bold text-white">Enigma</span>
            </div>

            {/* Description */}
            <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
              Enigma is a premium AI agency designed specifically for Artificial Intelligence (AI) solutions and automation.
            </p>

            {/* Small dot */}
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>

          {/* Middle Section - Navigation Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-purple-200 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Legals
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-purple-200 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Social
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white hover:text-purple-200 transition-colors text-sm flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-4">
          <p className="text-white text-sm">
            © 2025, Enigma. Designed By Ahmad.
          </p>
         
        </div>
      </div>
    </footer>
  )
}
