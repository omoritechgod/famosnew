"use client"

import { useState } from "react"
import Layout from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  Target,
  Award,
  Globe,
  Shield,
  Lightbulb,
  Heart,
  Handshake,
  CheckCircle,
  Lock,
  UserCheck,
} from "lucide-react"

const About = () => {
  const [isValuesModalOpen, setIsValuesModalOpen] = useState(false)

  const stats = [
    { icon: Users, label: "Happy Customers", value: "500+" },
    { icon: Target, label: "Projects Completed", value: "1000+" },
    { icon: Award, label: "Years of Experience", value: "5+" },
    { icon: Globe, label: "Partner Vendors", value: "50+" },
  ]

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold the highest standards of honesty, ethics, and accountability. Trust is the foundation of our relationships with clients, partners, and our team.",
    },
    {
      icon: Award,
      title: "Excellence & Professionalism",
      description:
        "We strive for superior performance in every service we deliver. Our commitment to quality and continuous improvement ensures that we exceed expectations every time.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace change and champion forward-thinking. By leveraging emerging technologies and creative solutions, we stay ahead in delivering value-driven services.",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description:
        "Our clients are central to our mission. We listen actively, respond promptly, and tailor solutions that align with their goals, challenges, and vision for growth.",
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description:
        "We are dependable and consistent. Whether it's hardware procurement, IT support, or logistics fulfillment, clients can count on us for timely and accurate service delivery.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork. Through strategic collaboration, internally and with partners, we unlock synergies that drive shared success.",
    },
    {
      icon: Lock,
      title: "Security & Responsibility",
      description:
        "We prioritize data security, regulatory compliance, and responsible service delivery. We are committed to protecting our clients' digital assets and maintaining the highest standards of confidentiality and reliability.",
    },
  ]

  const whyChooseUs = [
    {
      icon: UserCheck,
      title: "Expertise You Can Trust",
      description:
        "Our team brings deep technical knowledge and real-world experience across multiple industries, ensuring your IT environment is handled with precision and care.",
    },
    {
      icon: Target,
      title: "End-to-End Solutions",
      description:
        "From procurement and support to managed services and logistics, we offer a complete suite of services under one roof, eliminating the need to juggle multiple vendors.",
    },
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description:
        "We take time to understand your business goals and challenges, tailoring every solution to fit your unique needs and long-term vision.",
    },
    {
      icon: CheckCircle,
      title: "Fast and Reliable Support",
      description:
        "Downtime is costly. Our responsive support team ensures issues are resolved quickly—minimizing disruption and maximizing productivity.",
    },
    {
      icon: Shield,
      title: "Secure and Scalable",
      description:
        "We prioritize data protection, system security, and future-ready solutions, giving you the confidence to grow without compromise.",
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description:
        "With a strong portfolio of satisfied clients and successful projects, Famos IT is a name businesses trust to deliver consistent results and long-term value.",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              About FAMOS IT Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Company Overview</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A progressive and innovation-driven technology and logistics company, officially established on April 1st,
              2025.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Famos IT Solutions Limited is a progressive and innovation-driven technology and logistics company,
                officially established on April 1st, 2025. We specialize in the procurement of top-tier hardware and
                software infrastructure, managed IT services, and end-to-end logistics support tailored to meet the
                needs of businesses operating in a digitally evolving world.
              </p>

              <p className="text-lg text-muted-foreground mb-6">
                At Famos IT Solutions, we understand that technology is the backbone of every successful business.
                That's why we offer a full spectrum of IT procurement services, sourcing enterprise-grade computing
                equipment, networking devices, cybersecurity solutions, and licensed software from trusted global
                vendors. Our procurement process is designed to be efficient, transparent, and customized to meet both
                large-scale and specialized technology needs.
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                We deliver comprehensive logistics services to ensure your technology assets are stored, managed, and
                deployed efficiently. Backed by certified professionals and industry expertise, we are dedicated to
                providing reliable, innovative, and cost-effective solutions that drive business growth and lasting
                partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak to our commitment to excellence and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="p-8 hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to revolutionize the digital experience of businesses by delivering integrated IT
                  solutions that are reliable, scalable, and future-ready. We are dedicated to helping organizations
                  harness the power of technology to optimize operations, improve productivity, and enhance
                  competitiveness in a rapidly changing world. Through our commitment to service excellence, continuous
                  innovation, and a customer-centric approach, we aim to be a trusted technology partner to every
                  business we serve.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="p-8 hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our vision is to become a leading force in Africa's digital transformation, recognized for our
                  excellence in IT procurement, managed services, and logistics delivery. We aspire to empower
                  enterprises of all sizes by making technology accessible, efficient, and strategically aligned with
                  their growth ambitions. As we grow, we aim to expand our reach beyond regional borders and redefine
                  the standards of service delivery in the global IT and logistics ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The principles that guide everything we do and every decision we make.
            </p>

            <Dialog open={isValuesModalOpen} onOpenChange={setIsValuesModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                  Learn About Our Values
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center mb-6">Our Core Values</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  {coreValues.map((value, index) => {
                    const IconComponent = value.icon
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Famos IT, we go beyond providing technology—we deliver peace of mind. Our commitment to reliability,
              responsiveness, and results-driven service makes us a trusted partner for businesses seeking efficient and
              scalable IT solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card key={index} className="p-6 hover:shadow-card-hover transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the FAMOS Difference?</h2>
            <p className="text-lg text-white/80 mb-8">
              Join hundreds of satisfied customers who have chosen FAMOS for their premium IT service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About
