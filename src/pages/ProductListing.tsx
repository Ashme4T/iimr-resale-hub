import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { SearchFilters } from "@/components/search-filters";
import { useSearchParams } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    title: "Financial Management Textbook",
    price: 850,
    originalPrice: 1200,
    condition: "Like New",
    seller: "Hostel 2, PGP",
    image: "/placeholder.svg",
    views: 24,
    category: "Books",
    course: "PGP"
  },
  {
    id: 2,
    title: "Casio Scientific Calculator",
    price: 400,
    originalPrice: 600,
    condition: "Used",
    seller: "Faculty - Finance Dept",
    image: "/placeholder.svg",
    views: 18,
    category: "Study Tools",
    course: "Faculty"
  },
  {
    id: 3,
    title: "Business Formal Shirt",
    price: 300,
    originalPrice: 800,
    condition: "Used",
    seller: "Hostel 1, IPM",
    image: "/placeholder.svg",
    views: 12,
    category: "Clothes",
    course: "IPM"
  },
  {
    id: 4,
    title: "Laptop Stand",
    price: 200,
    originalPrice: 500,
    condition: "New",
    seller: "Hostel 4, DPM",
    image: "/placeholder.svg",
    views: 31,
    category: "Electronics",
    course: "DPM"
  },
  {
    id: 5,
    title: "Free MBA Notes Set",
    price: 0,
    originalPrice: 0,
    condition: "Like New",
    seller: "Hostel 3, PGP",
    image: "/placeholder.svg",
    views: 45,
    category: "Books",
    course: "PGP",
    isDonation: true
  },
  {
    id: 6,
    title: "Wireless Mouse",
    price: 150,
    originalPrice: 400,
    condition: "Used",
    seller: "Faculty - IT Dept",
    image: "/placeholder.svg",
    views: 8,
    category: "Electronics",
    course: "Faculty"
  }
];

export const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  // Filter and search logic
  useEffect(() => {
    let filtered = [...products];

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(product => product.condition === filters.condition);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(product => 
        product.seller.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'condition':
        filtered.sort((a, b) => a.condition.localeCompare(b.condition));
        break;
      default: // newest
        filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters, sortBy, products]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="flex flex-col space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Products'}
              </h1>
              <p className="text-muted-foreground mt-2">
                Found {filteredProducts.length} items
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search 'textbooks under ₹500 in Hostel 3'..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg rounded-xl border-2 focus:border-primary"
            />
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={sortBy === 'newest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('newest')}
            >
              Newest
            </Button>
            <Button
              variant={sortBy === 'price-low' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('price-low')}
            >
              Price: Low-High
            </Button>
            <Button
              variant={sortBy === 'price-high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('price-high')}
            >
              Price: High-Low
            </Button>
            <Button
              variant={sortBy === 'condition' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('condition')}
            >
              Condition
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <SearchFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">🔍</div>
                  <h3 className="text-xl font-semibold">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      category: '',
                      minPrice: '',
                      maxPrice: '',
                      condition: '',
                      location: ''
                    });
                    setSearchParams({});
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};