"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Eye, Mail, Phone, Calendar } from "lucide-react"
import { toast } from "sonner"
import { adminService } from "@/services/adminService"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface QuoteRequest {
  id: number
  full_name: string
  email: string
  phone: string
  company_name: string
  message: string | null
  urgency: string
  status: "pending" | "in_progress" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

interface QuoteRequestItem {
  id: number
  quote_request_id: number
  product_id: number | null
  product_code: string
  product_description: string
  quantity: number
  price: number
}

interface QuoteRequestDetails extends QuoteRequest {
  items: QuoteRequestItem[]
}
const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestDetails | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const data = await adminService.getQuotes()
      setQuotes(data)
    } catch (error) {
      console.error("Failed to fetch quotes:", error)
      toast.error("Failed to fetch quotes")
    } finally {
      setLoading(false)
    }
  }

  const updateQuoteStatus = async (quoteId: number, status: string) => {
    try {
      await adminService.updateQuoteStatus(quoteId, status)
      toast.success("Quote status updated successfully")
      fetchQuotes()
    } catch (error) {
      console.error("Error updating quote status:", error)
      toast.error("Failed to update quote status")
    }
  }

  const viewQuoteDetails = async (quoteId: number) => {
    setLoadingDetails(true)
    try {
      const quoteDetails = await adminService.getQuote(quoteId)
      setSelectedQuote(quoteDetails)
      setShowDetailsModal(true)
    } catch (error) {
      console.error("Error fetching quote details:", error)
      toast.error("Failed to fetch quote details")
    } finally {
      setLoadingDetails(false)
    }
  }
  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.company_name && quote.company_name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || quote.urgency === urgencyFilter

    return matchesSearch && matchesStatus && matchesUrgency
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive"
      case "in_progress":
        return "default"
      case "completed":
        return "default"
      case "cancelled":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "destructive"
      case "urgent":
        return "default"
      case "standard":
        return "secondary"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Quote Requests</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{filteredQuotes.length} total</Badge>
            <Badge variant="destructive">{quotes.filter((q) => q.status === "pending").length} pending</Badge>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info */}
        {process.env.NODE_ENV === "development" && (
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">
                Debug: Found {quotes.length} quotes, filtered to {filteredQuotes.length}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No quote requests found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== "all" || urgencyFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Quote requests will appear here when customers submit them"}
                </p>
                {quotes.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    ({quotes.length} total quotes available, but filtered out)
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{quote.full_name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {quote.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {quote.phone}
                        </span>
                        {quote.company_name && <span>Company: {quote.company_name}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(quote.status)}>
                        {quote.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant={getUrgencyColor(quote.urgency)}>{quote.urgency}</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Quote ID */}
                    <div>
                      <p className="text-sm text-gray-600">Quote ID: #{quote.id}</p>
                    </div>

                    {/* Additional Message */}
                    {quote.message && quote.message.trim() && (
                      <div>
                        <h4 className="font-medium mb-2">Additional Requirements</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{quote.message}</p>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 pt-2 border-t space-y-1 sm:space-y-0">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Submitted: {new Date(quote.created_at).toLocaleDateString()} at{" "}
                        {new Date(quote.created_at).toLocaleTimeString()}
                      </span>
                      <span>Updated: {new Date(quote.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>

                <CardContent className="pt-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewQuoteDetails(quote.id)}
                        disabled={loadingDetails}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {loadingDetails ? "Loading..." : "View Details"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(`mailto:${quote.email}?subject=Quote Request Response - #${quote.id}`)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                    </div>

                    <Select value={quote.status} onValueChange={(value) => updateQuoteStatus(quote.id, value)}>
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quote Details Modal */}
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Quote Request Details</DialogTitle>
            </DialogHeader>
            {selectedQuote && (
              <div className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="text-base">{selectedQuote.full_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-base">{selectedQuote.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-base">{selectedQuote.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Company</p>
                        <p className="text-base">{selectedQuote.company_name || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <Badge variant={getStatusColor(selectedQuote.status)}>
                          {selectedQuote.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Urgency</p>
                        <Badge variant={getUrgencyColor(selectedQuote.urgency)}>
                          {selectedQuote.urgency}
                        </Badge>
                      </div>
                    </div>
                    {selectedQuote.message && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Additional Requirements</p>
                        <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedQuote.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quote Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requested Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedQuote.items && selectedQuote.items.length > 0 ? (
                      <div className="space-y-4">
                        {selectedQuote.items.map((item, index) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Product Code</p>
                                <p className="text-base">{item.product_code}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-sm font-medium text-gray-500">Description</p>
                                <p className="text-base">{item.product_description}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Quantity</p>
                                <p className="text-base">{item.quantity}</p>
                              </div>
                            </div>
                            {item.price && item.price > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-500">Current Price</p>
                                <p className="text-base font-semibold">₦{item.price.toLocaleString()}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No items found for this quote request.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Timestamps */}
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">Created At</p>
                        <p>{new Date(selectedQuote.created_at).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Last Updated</p>
                        <p>{new Date(selectedQuote.updated_at).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

export default AdminQuotes
