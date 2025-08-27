"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { productService } from "@/services/productService"
import type { Product } from "@/types"

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productService.getProducts({ featured: true, per_page: 6 })
        setProducts(response.data || [])
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleRequestQuote = (product: Product) => {
    console.log("Requesting quote for product:", product)

    // Navigate to quote request page with product data
    navigate("/quote-request", {
      state: {
        selectedProduct: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          code: `PROD-${product.id.toString().padStart(3, "0")}`,
          brand: product.brand,
          model: product.model,
        },
      },
    })
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setShowViewDialog(true)
  }

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)
    }
  }
  const handleViewAllProducts = () => {
    navigate("/products")
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular and cutting-edge technology solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-8 bg-gray-200 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            ⭐ Featured Products
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Top Technology Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and cutting-edge technology solutions, carefully selected for their quality and
            performance
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-4xl">💻</div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        Featured
                      </Badge>
                    </div>
                    {!product.availability && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-primary">₦{Number(product.price).toLocaleString()}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{product.rating || 4.5}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleRequestQuote(product)}
                        className="flex-1 bg-gradient-primary hover:opacity-90"
                        disabled={!product.availability}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.availability ? "Request Quote" : "Unavailable"}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleViewProduct(product)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={handleViewAllProducts} variant="outline" size="lg" className="bg-white hover:bg-gray-50">
                View All Products
                <Eye className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* Product Details Modal */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                {/* Image Gallery */}
                <div className="relative">
                  <img
                    src={selectedProduct.images[currentImageIndex] || "/placeholder.svg?height=400&width=600"}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {selectedProduct.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {selectedProduct.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Product Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                      <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Category</span>
                        <Badge variant="outline" className="mt-1 block w-fit">{selectedProduct.category}</Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Price</span>
                        <p className="text-2xl font-bold text-primary">₦{Number(selectedProduct.price).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Brand</span>
                        <p className="text-lg">{selectedProduct.brand}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Model</span>
                        <p className="text-lg">{selectedProduct.model}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">Available:</span>
                        <Badge variant={selectedProduct.availability ? "default" : "secondary"}>
                          {selectedProduct.availability ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {selectedProduct.featured && (
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full bg-gradient-primary hover:opacity-90"
                      onClick={() => {
                        handleRequestQuote(selectedProduct)
                        setShowViewDialog(false)
                      }}
                      disabled={!selectedProduct.availability}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {selectedProduct.availability ? "Request Quote" : "Unavailable"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Features */}
                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Features</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedProduct.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications */}
                    {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Specifications</span>
                        <div className="space-y-1 mt-2">
                          {selectedProduct.specifications.map((spec, index) => (
                            <p key={index} className="text-sm bg-gray-50 p-2 rounded">{spec}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default FeaturedProducts
