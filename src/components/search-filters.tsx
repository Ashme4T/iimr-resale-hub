import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  condition: string;
  location: string;
}

interface SearchFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const categories = ["Books", "Study Tools", "Clothes", "Electronics"];
const conditions = ["New", "Like New", "Used", "Worn"];
const locations = [
  "Hostel 1", "Hostel 2", "Hostel 3", "Hostel 4",
  "Faculty - Finance", "Faculty - IT", "Faculty - Marketing", 
  "Faculty - Operations", "Faculty - HR"
];

export const SearchFilters = ({ filters, setFilters }: SearchFiltersProps) => {
  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      location: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Price Range (₹)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                placeholder="Min"
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </div>
            <div>
              <Input
                placeholder="Max"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setFilters({ ...filters, minPrice: '0', maxPrice: '0' })}
            >
              Free
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setFilters({ ...filters, minPrice: '0', maxPrice: '500' })}
            >
              Under ₹500
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setFilters({ ...filters, minPrice: '500', maxPrice: '1000' })}
            >
              ₹500-₹1000
            </Button>
          </div>
        </div>

        <Separator />

        {/* Condition */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Condition</Label>
          <Select value={filters.condition} onValueChange={(value) => setFilters({ ...filters, condition: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Any Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Condition</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Location</Label>
          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Any Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Location</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Quick Filters */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Filters</Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setFilters({ ...filters, minPrice: '0', maxPrice: '0' })}
            >
              💝 Donations Only
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setFilters({ ...filters, category: 'Books' })}
            >
              📚 Textbooks
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setFilters({ ...filters, condition: 'New' })}
            >
              ✨ New Items
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};