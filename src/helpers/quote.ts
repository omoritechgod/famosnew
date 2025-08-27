import type { QuoteRequestPayload } from "@/types"

export const makeGuestItemId = () => `55-${Date.now()}-${Math.floor(Math.random() * 1000)}`

export function toApiPayload(formData: any): QuoteRequestPayload {
  console.log("Converting form data to API payload:", formData)

  const products = formData.products
    .filter((p: any) => p.description?.trim()) // Only include products with descriptions
    .map((p: any) => {
      console.log("Processing product:", p)

      // Determine if this is a guest product or catalog product
      const isGuestProduct = !p.id || (typeof p.id === "string" && p.id.startsWith("55-"))

      const productPayload: any = {
        code: p.code?.trim() || "CUSTOM",
        description: String(p.description || "").trim(),
        quantity: Math.max(1, Number.parseInt(p.quantity as any, 10) || 1),
        current_price: p.current_price !== "" && p.current_price !== undefined ? Number(p.current_price) : 0,
      }

      // Only add ID for catalog products (numeric IDs)
      if (!isGuestProduct && typeof p.id === "number") {
        productPayload.id = p.id
      }
      // For guest products, we don't send ID at all - backend will handle it

      console.log("Product payload:", productPayload)
      return productPayload
    })

  const payload = {
    customer_name: String(formData.customerName || formData.customer_name || "").trim(),
    email: String(formData.email || "").trim(),
    phone: formData.phone?.trim() || undefined,
    company_name: formData.company?.trim() || formData.company_name?.trim() || undefined,
    additional_requirements:
      formData.additionalRequirements?.trim() || formData.additional_requirements?.trim() || undefined,
    urgency: (formData.urgency as any) || "standard",
    products,
  }

  console.log("Final API payload:", payload)
  return payload
}
