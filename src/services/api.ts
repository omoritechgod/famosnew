const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"

class ApiService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    console.log(`API Request: ${options.method || "GET"} ${url}`)
    if (options.body) {
      console.log("Request Body:", options.body)
    }

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)

      console.log(`API Response: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        const errorData = await response.text()
        console.error("API Error Response:", errorData)

        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const parsedError = JSON.parse(errorData)
          if (parsedError.message) {
            errorMessage = parsedError.message
          } else if (parsedError.errors) {
            errorMessage = Array.isArray(parsedError.errors)
              ? parsedError.errors.join(", ")
              : JSON.stringify(parsedError.errors)
          }
        } catch {
          errorMessage = errorData || errorMessage
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("API Response Data:", data)
      return data
    } catch (error) {
      console.error("API Request failed:", error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }
}

export const apiService = new ApiService(API_BASE_URL)
