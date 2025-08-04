"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

const Footer = () => {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!")
      setEmail("")
    }
  }

  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Office */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Our Office</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p>Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div className="text-sm">
                  <p>0814 531 9706</p>
                  <p>0706 650 0878</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm break-all">support@famousitsolutionltd.com</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61576075276143&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/famosits?s=11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/famos-consultancy-and-it-solutions-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/famositconsultancy?igsh=MXdtZG9sbGQ1aDVz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@FamosConsultancyandITSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Partners</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Hewlett-Packard Enterprise</li>
              <li>Dell</li>
              <li>Cisco</li>
              <li>Sophos</li>
              <li>Microsoft</li>
              <li>Synology</li>
              <li>QNAP</li>
              <li>Fortinet</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Shopping
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribing to our newsletters within your organization helps you stay informed about new developments,
              policies, projects, and achievements. It supports continuous learning, keeps you aligned with company
              goals, and enhances your ability to contribute effectively by staying connected to the organization's
              evolving knowledge and priorities.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 flex-1"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4">
                SignUp
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© FAMOS IT Solutions. All Right Reserved.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">Designed By</span>
              <span className="text-sm text-blue-400 font-medium">Nexa Trux</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
