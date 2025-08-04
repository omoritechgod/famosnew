import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Target, Users, Award } from "lucide-react"
import { Link } from "react-router-dom"

const AboutSection = () => {
  const features = [
    "Enterprise-grade IT hardware and software",
    "Comprehensive logistics and deployment services",
    "24/7 technical support and maintenance",
    "Customized solutions for every business size",
  ]

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower businesses with reliable, innovative IT solutions that drive growth and efficiency.",
    },
    {
      icon: Users,
      title: "Our Team",
      description: "Certified professionals with years of experience in enterprise IT solutions and logistics.",
    },
    {
      icon: Award,
      title: "Our Promise",
      description: "Quality service delivery with guaranteed satisfaction and ongoing support for all clients.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                About FAMOS IT Solutions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Your Trusted Partner in
                <span className="text-primary"> IT Excellence</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                With years of experience in the IT industry, FAMOS IT Solutions has established itself as a leading
                provider of comprehensive technology solutions across Nigeria. We specialize in hardware procurement,
                software licensing, IT support, and logistics services.
              </p>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button className="bg-gradient-primary hover:opacity-90">Learn More About Us</Button>
            </Link>
          </div>

          {/* Values Cards */}
          <div className="space-y-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground text-sm">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
