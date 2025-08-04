import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Shield, Headphones, Zap, Users, Award } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Simple and intuitive booking process with instant confirmation and flexible scheduling options.",
      features: ["Instant confirmation", "Flexible dates", "Online management"]
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with enterprise-grade security and multiple payment options.",
      features: ["SSL encryption", "Multiple payment methods", "Fraud protection"]
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any questions or concerns.",
      features: ["Live chat", "Phone support", "Email assistance"]
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times and efficient service delivery for all your needs.",
      features: ["Same-day service", "Express options", "Real-time tracking"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Perfect for teams and groups with collaborative booking and management features.",
      features: ["Group bookings", "Team management", "Shared calendars"]
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "We stand behind our services with quality guarantees and satisfaction assurance.",
      features: ["Money-back guarantee", "Quality assurance", "Customer satisfaction"]
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose FAMOS?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive services designed to make your experience seamless, 
            secure, and satisfying from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FAMOS for their booking and service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Booking Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
