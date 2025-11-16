import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Enigma Studio AI - Intelligent Automations & AI Agents',
  description: 'Cutting-edge AI systems, custom automations, and smart workflows powered by LangChain, CrewAI, RAG, and Vector Databases.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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

