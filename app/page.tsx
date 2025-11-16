import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import Companies from '@/components/Companies'
import ChatbotsAndVoice from '@/components/ChatbotsAndVoice'
import AIAutomation from '@/components/AIAutomation'
import AIAgentProcess from '@/components/AIAgentProcess'
import Stats from '@/components/Stats'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Team from '@/components/Team'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-black">
      <Navigation />
      <HeroSection />
      {/* <Companies /> */}
      <ChatbotsAndVoice />
      <AIAutomation />
      <AIAgentProcess />
       {/* <Stats /> */}
      <CaseStudies />
      {/* <Testimonials /> */}
      <Pricing />
      <CTA />
      {/* <Team /> */}
      <FAQ />
      <Contact />
     
      <Footer />
    </main>
  )
}

