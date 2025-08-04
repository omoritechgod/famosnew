import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { productService } from '@/services/productService';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const featuredProducts = await productService.getFeaturedProducts(6);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        // Fallback to mock data
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Premium Experience Package",
      description: "A complete premium experience with all amenities included",
      price: 299,
      images: ["/api/placeholder/300/200"],
      category: "Premium",
      availability: true,
      features: ["24/7 Support", "Premium Access", "Concierge Service"],
      rating: 4.8,
      reviews_count: 124,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 2,
      name: "Standard Service Plan",
      description: "Reliable standard service for everyday needs",
      price: 149,
      images: ["/api/placeholder/300/200"],
      category: "Standard",
      availability: true,
      features: ["Standard Support", "Basic Access", "Essential Features"],
      rating: 4.5,
      reviews_count: 89,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    {
      id: 3,
      name: "Executive Package",
      description: "Exclusive executive-level service and amenities",
      price: 599,
      images: ["/api/placeholder/300/200"],
      category: "Executive",
      availability: true,
      features: ["Priority Support", "VIP Access", "Personal Assistant"],
      rating: 4.9,
      reviews_count: 67,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    }
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Discover our most popular offerings</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-48 bg-muted rounded-lg"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular products and services, carefully selected for their 
            exceptional quality and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayProducts.slice(0, 6).map((product) => (
            <Card key={product.id} className="group hover:shadow-card-hover transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {/* Placeholder for product image */}
                    <div className="text-4xl">📦</div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-primary">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-accent fill-current'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews_count})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      ${product.price}
                    </div>
                    <Badge variant={product.availability ? "default" : "secondary"}>
                      {product.availability ? "Available" : "Sold Out"}
                    </Badge>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex space-x-2 w-full">
                  <Button 
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                    disabled={!product.availability}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                  <Button variant="outline" size="default" className="px-3">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
