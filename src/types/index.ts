export interface Product {
  id: number
  name: string
  description: string
  price: string
  category: string
  brand: string
  model: string
  specifications: string[]
  features: string[]
  images: string[]
  availability: boolean
  featured: boolean
  created_at: string
  updated_at?: string
}

export interface ProductFilters {
  category?: string
  brand?: string
  price_min?: number
  price_max?: number
  search?: string
  featured?: boolean
  page?: number
  per_page?: number
}

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface QuoteItem {
  id: string
  productName: string
  description: string
  quantity: number
  currentPrice: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  message: string
}

// New Quote Request Types
export type Urgency = "standard" | "urgent" | "emergency"

export interface QuoteProductInput {
  id?: number | string // number (catalog) or "55-..." string (guest)
  code?: string // "CUSTOM" if unknown
  description: string
  quantity: number // integer >= 1
  current_price?: number // 0 if unknown
}

export interface QuoteRequestPayload {
  customer_name: string
  email: string
  phone?: string
  company_name?: string
  additional_requirements?: string
  urgency?: Urgency
  products: QuoteProductInput[]
}

export interface QuoteRequestResponse {
  message: string
  quote_id: number
}

export interface QuoteRequestItem {
  id: number
  quote_request_id: number
  product_id: number | null
  product_code: string
  product_description: string
  quantity: number
  price: number
}

// Updated to match the actual API response structure
export interface QuoteRequest {
  id: number
  full_name: string
  email: string
  phone?: string
  company_name?: string
  message?: string | null
  urgency: Urgency
  status: "pending" | "processing" | "quoted" | "completed" | "cancelled"
  created_at: string
  updated_at: string
  items?: QuoteRequestItem[] // Optional since it might not be included in list view
}
