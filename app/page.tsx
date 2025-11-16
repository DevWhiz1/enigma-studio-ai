import Navigation from '@/components/Navigation'
import HeroSimple from '@/components/HeroSimple'
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
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-black">
      <Navigation />
      <HeroSimple />
      {/* <Companies /> */}
      <ChatbotsAndVoice />
      <AIAutomation />
      <AIAgentProcess />
       {/* <Stats /> */}
      <CaseStudies />
      {/* <Testimonials /> */}
      <Pricing />
      <FinalCTA />
      {/* <Team /> */}
      <FAQ />
      <Contact />
     
      <Footer />
    </main>
  )
}

