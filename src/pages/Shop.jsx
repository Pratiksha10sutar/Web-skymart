import React, { useContext, useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { MyStore } from "../context/MyContext";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../utils/constants";

const Shop = () => {
  const { productsData, setProductsData, cartItems, search, setSearch, searchProduct } =
    useContext(MyStore);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortOption, setSortOption] = useState("featured");

  // Keep state synchronized with URL query params
  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategory(cat || "all");
  }, [searchParams]);

  
  // Optimized filtering and sorting using useMemo (Industry Standard for performance)
  const sortedProducts = useMemo(() => {
    const filtered = searchProduct.filter((product) => {
      if (selectedCategory === "all") return true;
      return product.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    return [...filtered].sort((a, b) => {
      if (sortOption === "low-high") return a.price - b.price;
      if (sortOption === "high-low") return b.price - a.price;
      if (sortOption === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      return 0;
    });
  }, [searchProduct, selectedCategory, sortOption]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    
    if (val === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", val);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto font-sans space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">All Products</h1>
          <p className="text-zinc-400 text-sm mt-1">{sortedProducts.length} products found</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full md:flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="w-full bg-[#141414] text-white text-sm outline-none placeholder:text-zinc-500 pl-11 pr-4 py-3 rounded-xl border border-zinc-800/80 focus:border-[#a3e635] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-1/2 md:w-48 bg-[#141414] text-white text-sm outline-none px-4 py-3 rounded-xl border border-zinc-800/80 cursor-pointer focus:border-[#a3e635]"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.query}>
                  {cat.title}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-1/2 md:w-44 bg-[#141414] text-white text-sm outline-none px-4 py-3 rounded-xl border border-zinc-800/80 cursor-pointer focus:border-[#a3e635]"
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((val) => {
              const isInCart = cartItems.find((elem) => elem.id === val.id);
              return <ProductCard key={val.id} product={val} isInCart={isInCart} />;
            })
          ) : (
            <div className="col-span-full text-center py-16 text-zinc-500">
              No products found matching your filter.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Shop;