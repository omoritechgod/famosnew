import type { QuoteRequest } from "@/types"

export const adminService = {
  // Get all quote requests
  async getQuotes(): Promise<QuoteRequest[]> {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      throw new Error("No admin token found")
    }

    console.log("AdminService: Fetching quotes...")
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/api/admin/quotes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("AdminService: Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("AdminService: Error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("AdminService: Response data:", data)

    // Handle the actual API response structure: { success: true, data: [...] }
    if (data.success && Array.isArray(data.data)) {
      return data.data
    } else {
      console.error("AdminService: Unexpected response structure:", data)
      return []
    }
  },

  // Get single quote request
  async getQuote(id: number): Promise<QuoteRequest> {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      throw new Error("No admin token found")
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/api/admin/quotes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Handle the response structure
    if (data.success && data.data) {
      return data.data
    } else {
      throw new Error("Invalid response structure")
    }
  },

  // Update quote status
  async updateQuoteStatus(id: number, status: string): Promise<void> {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      throw new Error("No admin token found")
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/api/admin/quotes/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("AdminService: Update status error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  },

  // Get dashboard summary
  async getDashboardSummary(): Promise<{
    totalProducts: number
    totalQuotes: number
    pendingQuotes: number
    recentQuotes: Array<{
      id: number
      customerName: string | null
      company: string | null
      status: string
      totalItems: number
      createdAt: string
    }>
  }> {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      throw new Error("No admin token found")
    }

    console.log("AdminService: Fetching dashboard summary...")
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/api/admin/dashboard-summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log("AdminService: Dashboard response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("AdminService: Dashboard error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("AdminService: Dashboard response data:", data)
    return data
  },

  // Get all subscribers
  async getSubscribers(): Promise<Array<{
    id: number
    email: string
    created_at: string
  }>> {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      throw new Error("No admin token found")
    }

    console.log("AdminService: Fetching subscribers...")
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/api/admin/subscribers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log("AdminService: Subscribers response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("AdminService: Subscribers error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("AdminService: Subscribers response data:", data)

    // Handle the response structure
    if (data.success && Array.isArray(data.data)) {
      return data.data
    } else if (Array.isArray(data)) {
      return data
    } else {
      console.error("AdminService: Unexpected subscribers response structure:", data)
      return []
    }
  },

  // Delete quote request
  async deleteQuote(id: number): Promise<void> {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      throw new Error("No admin token found")
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/api/admin/quotes/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("AdminService: Delete quote error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  },
}
