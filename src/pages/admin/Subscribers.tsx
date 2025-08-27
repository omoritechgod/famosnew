"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Mail, Calendar, Users } from "lucide-react"
import { toast } from "sonner"
import { adminService } from "@/services/adminService"

interface Subscriber {
  id: number
  email: string
  created_at: string
}

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const data = await adminService.getSubscribers()
      setSubscribers(data)
    } catch (error) {
      console.error("Failed to fetch subscribers:", error)
      toast.error("Failed to fetch subscribers")
    } finally {
      setLoading(false)
    }
  }

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportToCSV = () => {
    try {
      // Create CSV content
      const headers = ["ID", "Email", "Subscribed Date"]
      const csvContent = [
        headers.join(","),
        ...filteredSubscribers.map((subscriber) =>
          [
            subscriber.id,
            `"${subscriber.email}"`,
            `"${new Date(subscriber.created_at).toLocaleDateString()}"`,
          ].join(",")
        ),
      ].join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `subscribers_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success(`Exported ${filteredSubscribers.length} subscribers to CSV`)
    } catch (error) {
      console.error("Failed to export CSV:", error)
      toast.error("Failed to export CSV")
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
          <div>
            <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
            <p className="text-muted-foreground">Manage your newsletter subscriber list</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{filteredSubscribers.length} subscribers</Badge>
            <Button onClick={exportToCSV} className="bg-gradient-primary">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
              <p className="text-xs text-muted-foreground">All time subscribers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  subscribers.filter(
                    (sub) =>
                      new Date(sub.created_at).getMonth() === new Date().getMonth() &&
                      new Date(sub.created_at).getFullYear() === new Date().getFullYear()
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">New subscribers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">From last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by email address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers List */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriber List</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubscribers.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No subscribers found</h3>
                <p className="text-gray-600">
                  {searchTerm ? "Try adjusting your search criteria" : "Subscribers will appear here when they sign up"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-6">Email Address</div>
                  <div className="col-span-3">Subscribed Date</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {/* Subscriber Rows */}
                {filteredSubscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{subscriber.email}</p>
                          <p className="text-sm text-muted-foreground">ID: {subscriber.id}</p>
                        </div>
                        <Badge variant="outline">
                          {new Date(subscriber.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(`mailto:${subscriber.email}?subject=Newsletter Update from FAMOS IT`)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:contents">
                      <div className="col-span-1">
                        <Badge variant="outline">#{subscriber.id}</Badge>
                      </div>
                      <div className="col-span-6">
                        <p className="font-medium">{subscriber.email}</p>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm text-muted-foreground">
                          {new Date(subscriber.created_at).toLocaleDateString()} at{" "}
                          {new Date(subscriber.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(`mailto:${subscriber.email}?subject=Newsletter Update from FAMOS IT`)
                          }
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default AdminSubscribers