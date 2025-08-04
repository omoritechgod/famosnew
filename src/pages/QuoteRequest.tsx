"use client"

import type React from "react"

import { useState } from "react"
import Layout from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, FileText, Send, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface ProductRow {
  id: string
  code: string
  description: string
  quantity: number
  currentPrice: string
}

interface QuoteFormData {
  customerName: string
  email: string
  phone: string
  company: string
  products: ProductRow[]
  additionalRequirements: string
  urgency: string
}

const QuoteRequest = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    customerName: "",
    email: "",
    phone: "",
    company: "",
    products: [
      { id: "1", code: "", description: "", quantity: 1, currentPrice: "" },
      { id: "2", code: "", description: "", quantity: 1, currentPrice: "" },
    ],
    additionalRequirements: "",
    urgency: "standard",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProductChange = (id: string, field: keyof ProductRow, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product) => (product.id === id ? { ...product, [field]: value } : product)),
    }))
  }

  const addProductRow = () => {
    const newId = Date.now().toString()
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { id: newId, code: "", description: "", quantity: 1, currentPrice: "" }],
    }))
  }

  const removeProductRow = (id: string) => {
    if (formData.products.length > 1) {
      setFormData((prev) => ({
        ...prev,
        products: prev.products.filter((product) => product.id !== id),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create detailed email content
      const productsList = formData.products
        .filter((product) => product.description.trim() !== "")
        .map(
          (product, index) =>
            `${index + 1}. Product Code: ${product.code || "N/A"}\n   Description: ${product.description}\n   Quantity: ${product.quantity}\n   Current Price: ${product.currentPrice || "N/A"}`,
        )
        .join("\n\n")

      const emailBody =
        `QUOTE REQUEST\n\n` +
        `Customer Information:\n` +
        `Name: ${formData.customerName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Company: ${formData.company || "N/A"}\n\n` +
        `Products Requested:\n${productsList}\n\n` +
        `Additional Requirements:\n${formData.additionalRequirements || "None specified"}\n\n` +
        `Urgency: ${formData.urgency}\n\n` +
        `Please provide a detailed quote for the above items including:\n` +
        `- Unit prices and total cost\n` +
        `- Availability and delivery timeframes\n` +
        `- Payment terms and conditions\n` +
        `- Technical specifications (if applicable)`

      const mailtoLink = `mailto:support@famousitsolutionltd.com?subject=Quote Request from ${formData.customerName}&body=${encodeURIComponent(emailBody)}`

      window.location.href = mailtoLink

      toast.success("Email client opened with your quote request. Please send the email to complete your request.")

      // Reset form
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        company: "",
        products: [
          { id: "1", code: "", description: "", quantity: 1, currentPrice: "" },
          { id: "2", code: "", description: "", quantity: 1, currentPrice: "" },
        ],
        additionalRequirements: "",
        urgency: "standard",
      })
    } catch (error) {
      toast.error("Failed to open email client. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Get Custom Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Quotation</h1>
            <p className="text-xl text-white/80">
              Get personalized pricing for your IT hardware and software requirements. Our team will provide you with
              competitive quotes within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Instructions */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fill out the form below with your requirements</li>
                    <li>• Add multiple products using the "Add Product" button</li>
                    <li>• Submit your request and we'll email you a detailed quote</li>
                    <li>• Our team will contact you within 24 hours with pricing and availability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+234 814 531 9706"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your company name (optional)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Section */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Requirements</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addProductRow}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Table Header */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                    <div className="col-span-2">Product Code</div>
                    <div className="col-span-4">Product Description *</div>
                    <div className="col-span-2">Quantity *</div>
                    <div className="col-span-3">Current Price (if known)</div>
                    <div className="col-span-1">Action</div>
                  </div>

                  {/* Product Rows */}
                  {formData.products.map((product, index) => (
                    <div key={product.id} className="space-y-4 md:space-y-0">
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-4 p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Product {index + 1}</h4>
                          {formData.products.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProductRow(product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs">Product Code (if known)</Label>
                            <Input
                              value={product.code}
                              onChange={(e) => handleProductChange(product.id, "code", e.target.value)}
                              placeholder="e.g., HP-DL380-G10"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-xs">Product Description *</Label>
                            <Textarea
                              value={product.description}
                              onChange={(e) => handleProductChange(product.id, "description", e.target.value)}
                              placeholder="Describe the product you need..."
                              rows={2}
                              className="mt-1"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Quantity *</Label>
                              <Input
                                type="number"
                                min="1"
                                value={product.quantity}
                                onChange={(e) =>
                                  handleProductChange(product.id, "quantity", Number.parseInt(e.target.value) || 1)
                                }
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Current Price</Label>
                              <Input
                                value={product.currentPrice}
                                onChange={(e) => handleProductChange(product.id, "currentPrice", e.target.value)}
                                placeholder="$0.00"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-12 gap-4 items-start">
                        <div className="col-span-2">
                          <Input
                            value={product.code}
                            onChange={(e) => handleProductChange(product.id, "code", e.target.value)}
                            placeholder="Product code"
                          />
                        </div>

                        <div className="col-span-4">
                          <Textarea
                            value={product.description}
                            onChange={(e) => handleProductChange(product.id, "description", e.target.value)}
                            placeholder="Describe the product you need..."
                            rows={2}
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) =>
                              handleProductChange(product.id, "quantity", Number.parseInt(e.target.value) || 1)
                            }
                            required
                          />
                        </div>

                        <div className="col-span-3">
                          <Input
                            value={product.currentPrice}
                            onChange={(e) => handleProductChange(product.id, "currentPrice", e.target.value)}
                            placeholder="$0.00 (optional)"
                          />
                        </div>

                        <div className="col-span-1 flex justify-center">
                          {formData.products.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProductRow(product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="urgency">Project Urgency</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (5-7 business days)</SelectItem>
                      <SelectItem value="urgent">Urgent (2-3 business days)</SelectItem>
                      <SelectItem value="emergency">Emergency (24-48 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalRequirements">Additional Requirements or Comments</Label>
                  <Textarea
                    id="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                    placeholder="Any specific requirements, delivery instructions, or additional information..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Your quote request will be processed within 24 hours</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 min-w-48"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending Request..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    By submitting this form, you agree to be contacted by our sales team regarding your quote request.
                    We respect your privacy and will not share your information with third parties.
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default QuoteRequest
