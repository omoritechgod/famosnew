import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium">
                 Enterprise IT Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering Your Business with
                <span className="block text-yellow-400">Smart IT Solutions</span>
              </h1>
              <p className="text-xl text-white/80 max-w-lg">
                From hardware procurement to managed services, we provide comprehensive IT solutions that drive
                innovation and growth for businesses across Nigeria.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-white/60 text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-white/60 text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/60 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <img
                src="/src/assets/carousel-1.jpg"
                alt="IT Solutions"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">Enterprise Grade</div>
              <div className="text-xs">Security & Reliability</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-primary p-4 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">24/7 Support</div>
              <div className="text-xs">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
