"use client"

import { useState } from "react"
import Layout from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, ShoppingCart, Grid3X3, List, Search } from "lucide-react"
import ProductCategories from "@/components/products/ProductCategories"
import QuoteRequestBanner from "@/components/products/QuoteRequestBanner"

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  availability: boolean
  features: string[]
  rating: number
  reviews_count: number
  brand: string
  model: string
  specifications: Record<string, string>
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [showFilters, setShowFilters] = useState(false)

  // Mock products data
  const products: Product[] = [
    {
      id: 1,
      name: "Lenovo ThinkPad T14 AMD Ryzen 7 PRO 8840U Laptop",
      description: '35.6 cm (14") WUXGA 16 GB DDR5-SDRAM 512 GB SSD Wi-Fi 6E (802.11ax) Windows 11 Pro Black',
      price: 1299,
      originalPrice: 1499,
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Computing",
      availability: true,
      features: ["AMD Ryzen 7 PRO", "16GB DDR5 RAM", "512GB SSD", "Wi-Fi 6E", "Windows 11 Pro"],
      rating: 4.8,
      reviews_count: 124,
      brand: "Lenovo",
      model: "ThinkPad T14",
      specifications: {
        Processor: "AMD Ryzen 7 PRO 8840U",
        RAM: "16GB DDR5",
        Storage: "512GB SSD",
        Display: '14" WUXGA',
        OS: "Windows 11 Pro",
      },
    },
    {
      id: 2,
      name: "HP ProLiant DL380 Gen10 Plus Server",
      description: "2U rack server with Intel Xeon processors, enterprise-grade performance and reliability",
      price: 3299,
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Computing",
      availability: true,
      features: ["Intel Xeon Processor", "32GB RAM", "2TB Storage", "Redundant PSU", "iLO Management"],
      rating: 4.9,
      reviews_count: 89,
      brand: "HP",
      model: "ProLiant DL380 Gen10 Plus",
      specifications: {
        "Form Factor": "2U Rack",
        Processor: "Intel Xeon",
        RAM: "32GB DDR4",
        Storage: "2TB HDD",
        Management: "iLO 5",
      },
    },
    {
      id: 3,
      name: "Cisco Catalyst 9300 Series Switch",
      description: "48-port Gigabit Ethernet switch with advanced security and management features",
      price: 2199,
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Networking",
      availability: true,
      features: ["48 Gigabit Ports", "PoE+", "Stacking", "Advanced Security", "Cloud Management"],
      rating: 4.7,
      reviews_count: 67,
      brand: "Cisco",
      model: "Catalyst 9300",
      specifications: {
        Ports: "48 x Gigabit Ethernet",
        PoE: "PoE+ Support",
        Stacking: "Up to 8 units",
        Management: "Cisco DNA Center",
        Security: "MACsec, TrustSec",
      },
    },
    {
      id: 4,
      name: "Canon EOS R6 Mark II Digital Camera",
      description: "Professional mirrorless camera with 24.2MP sensor and advanced video capabilities",
      price: 2499,
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Sound and Vision",
      availability: true,
      features: ["24.2MP Sensor", "4K Video", "In-Body Stabilization", "Dual Card Slots", "Weather Sealed"],
      rating: 4.9,
      reviews_count: 156,
      brand: "Canon",
      model: "EOS R6 Mark II",
      specifications: {
        Sensor: "24.2MP Full Frame",
        Video: "4K 60p",
        Stabilization: "In-Body IS",
        Autofocus: "Dual Pixel CMOS AF II",
        Storage: "Dual SD Cards",
      },
    },
    {
      id: 5,
      name: "Synology DiskStation DS920+ NAS",
      description: "4-bay network attached storage with powerful performance for home and business",
      price: 549,
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Storage",
      availability: true,
      features: ["4-Bay Design", "Intel Celeron J4125", "4GB RAM", "2x M.2 Slots", "Plex Support"],
      rating: 4.8,
      reviews_count: 203,
      brand: "Synology",
      model: "DS920+",
      specifications: {
        Bays: '4 x 3.5" SATA',
        Processor: "Intel Celeron J4125",
        RAM: "4GB DDR4",
        Cache: "2 x M.2 2280 slots",
        Network: "2 x Gigabit",
      },
    },
    {
      id: 6,
      name: "Microsoft Surface Pro 9",
      description: "Versatile 2-in-1 laptop with Intel 12th Gen processors and all-day battery life",
      price: 1099,
      images: ["/placeholder.svg?height=300&width=400"],
      category: "Computing",
      availability: true,
      features: ["Intel 12th Gen", '13" PixelSense', "All-day Battery", "Windows 11", "Type Cover Ready"],
      rating: 4.6,
      reviews_count: 178,
      brand: "Microsoft",
      model: "Surface Pro 9",
      specifications: {
        Processor: "Intel 12th Gen",
        Display: '13" PixelSense',
        RAM: "8GB LPDDR5",
        Storage: "256GB SSD",
        OS: "Windows 11",
      },
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(product.category.toLowerCase())

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesCategory && matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IT Products & Solutions</h1>
            <p className="text-xl text-white/80">
              Discover our comprehensive range of enterprise-grade IT hardware, software, and networking solutions.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        {/* Quote Request Banner */}
        <QuoteRequestBanner />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Categories */}
              <ProductCategories onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />

              {/* Price Filter */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Price Range</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-20"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 10000])}
                        className="w-20"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setPriceRange([0, 10000])} className="w-full">
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search & Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} of {products.length} products
                {selectedCategory && (
                  <span className="ml-2">
                    in <Badge variant="secondary">{selectedCategory}</Badge>
                  </span>
                )}
              </p>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-card-hover transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-primary">
                          {product.brand}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      {product.originalPrice && (
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="destructive">Save ${product.originalPrice - product.price}</Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews_count})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</div>
                          {product.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <Badge variant={product.availability ? "default" : "secondary"}>
                          {product.availability ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Key Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <div className="flex space-x-2 w-full">
                      <Button className="flex-1 bg-gradient-primary hover:opacity-90" disabled={!product.availability}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Quote
                      </Button>
                      <Button variant="outline" size="default" className="px-3 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse our categories.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    setPriceRange([0, 10000])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
