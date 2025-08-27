import { apiService } from "./api"
import type { QuoteRequestPayload, QuoteRequestResponse } from "@/types"

export const bookingService = {
  async submitQuoteRequest(data: QuoteRequestPayload): Promise<QuoteRequestResponse> {
    console.log("Submitting quote request:", data)

    try {
      const response = await apiService.post<QuoteRequestResponse>("/api/quote-requests", data)
      console.log("Quote request response:", response)
      return response
    } catch (error) {
      console.error("Quote request submission error:", error)
      throw error
    }
  },

  async submitContactForm(data: any): Promise<{ success: boolean; message: string }> {
    console.log("Submitting contact form:", data)

    try {
      // Create mailto link for contact form
      const mailtoLink = `mailto:info@famousitsolutionltd.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `CONTACT FORM SUBMISSION\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
      )}`
      
      window.location.href = mailtoLink
      
      return {
        success: true,
        message: "Email client opened with your message. Please send the email to complete your inquiry."
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      return {
        success: false,
        message: "Failed to open email client. Please try again."
      }
    }
  },
}
