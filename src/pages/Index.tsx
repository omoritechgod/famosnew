import Layout from "@/components/layout/Layout"
import HeroSection from "@/components/home/HeroSection"
import AboutSection from "@/components/home/AboutSection"
import ServicesSection from "@/components/home/ServicesSection"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import TeamSection from "@/components/home/TeamSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import ProjectsSection from "@/components/home/ProjectsSection"

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedProducts />
      <ProjectsSection />
      <TeamSection />
      <TestimonialsSection />
    </Layout>
  )
}

export default Index
