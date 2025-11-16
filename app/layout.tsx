import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Enigma Studio AI - Intelligent Automations & AI Agents',
  description: 'Cutting-edge AI systems, custom automations, and smart workflows powered by LangChain, CrewAI, RAG, and Vector Databases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

