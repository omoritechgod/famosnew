import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import carousel1 from '@/assets/carousel-1.jpg';
import carousel2 from '@/assets/carousel-2.jpg';

const HeroCarousel = () => {
  const [showServices, setShowServices] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const services = [
    { name: "IT Procurement", description: "Efficient acquisition of technology solutions" },
    { name: "IT Support", description: "Fast, expert assistance remotely and on-site" },
    { name: "Managed Services", description: "Proactive monitoring and maintenance" },
    { name: "Logistics", description: "Secure transport and deployment" }
  ];

  const slides = [
    {
      image: carousel1,
      title: "Seamless IT Procurement,",
      subtitle: "Reliable Managed Services, Efficient Logistics",
      description: "We empower businesses with cutting-edge technology solutions, driving innovation and efficiency."
    },
    {
      image: carousel2,
      title: "Expert IT Solutions,",
      subtitle: "Professional Services & Support",
      description: "Comprehensive IT services and logistics support tailored to meet your business needs."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-primary/60" />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container px-4">
              <div className="max-w-2xl text-white">
                <p className="text-lg mb-4 animate-fade-in">{slide.title}</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                  {slide.subtitle}
                </h1>
                <p className="text-xl mb-8 text-white/90 animate-fade-in">
                  {slide.description}
                </p>
                <div className="space-y-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      Get Started
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-primary ml-4"
                    onClick={() => setShowServices(!showServices)}
                  >
                    Explore More
                  </Button>
                </div>
                
                {showServices && (
                  <div className="mt-6 grid grid-cols-2 gap-4 max-w-2xl animate-fade-in">
                    {services.map((service, serviceIndex) => (
                      <Card key={serviceIndex} className="bg-white/10 backdrop-blur-sm border-white/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                          <p className="text-white/80 text-sm">{service.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
