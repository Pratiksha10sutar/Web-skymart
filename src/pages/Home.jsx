import React, { useContext, useMemo } from "react";
import {
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Star,
  Tag,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  Percent,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { MyStore } from "../context/MyContext";
import { CATEGORIES } from "../utils/constants";

const Home = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(Auth);
  const { productsData, cartItems, setIsCartOpen, setCartItems } = useContext(MyStore);

  // 1. Safe Username Formatting
  const firstName = loggedInUser?.name?.trim().split(/\s+/)[0] || "User";
  const formattedName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  // 2. Dynamic Calculations using useMemo for performance
  const totalProductsCount = productsData.length || 0;

  const totalCartItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cartItems]);

  const totalCartValue = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }, [cartItems]);

  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const count = productsData.filter(
        (p) => p.category?.toLowerCase() === cat.query.toLowerCase()
      ).length;
      return {
        ...cat,
        dynamicCount: `${count} item${count === 1 ? "" : "s"}`,
      };
    });
  }, [productsData]);

 // Top Rated Products (Safely handles both object rating and number rating)
  const topRatedProducts = useMemo(() => {
    if (!Array.isArray(productsData)) return [];
    return [...productsData]
      .sort((a, b) => {
        const rateA = typeof a.rating === "object" ? a.rating?.rate : (a.rating || 0);
        const rateB = typeof b.rating === "object" ? b.rating?.rate : (b.rating || 0);
        return rateB - rateA;
      })
      .slice(0, 5);
  }, [productsData]);

  // New Arrivals Products (Safely handles string or number IDs)
  const newArrivalsProducts = useMemo(() => {
    if (!Array.isArray(productsData)) return [];
    return [...productsData]
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 5);
  }, [productsData]);
  
  const addToCart = (product) => {
    const existingItem = cartItems.find((val) => val.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((val) =>
        val.id === product.id ? { ...val, quantity: val.quantity + 1 } : val
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("updatedCart", JSON.stringify(updatedCart));
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1440px] mx-auto font-sans space-y-8 sm:space-y-10">
        
        {/* 1. HERO BANNER SECTION */}
        <div className="border border-zinc-800/80 bg-[#111111] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[#a3e635] text-xs font-bold tracking-widest uppercase">
                <span>GOOD EVENING</span>
                <span>👋</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Welcome back, <br />
                <span className="text-[#a3e635]">{formattedName}!</span>
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigate("/shop")}
                  className="flex items-center justify-center gap-2 cursor-pointer bg-[#a3e635] text-black font-bold text-sm sm:text-base px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl hover:bg-[#8ece28] transition-colors w-full sm:w-auto"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate("/shop")}
                  className="bg-zinc-900 border cursor-pointer border-zinc-800 text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center"
                >
                  View All Products
                </button>
              </div>
            </div>

            {/* Right Floating Badging Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row lg:flex-col gap-3 sm:gap-4 shrink-0">
              <div className="border border-[#a3e635]/30 bg-[#182a0d]/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center lg:min-w-[180px]">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#a3e635]">
                  {totalProductsCount}+
                </h3>
                <p className="text-zinc-400 text-xs mt-1">Products Available</p>
              </div>

              <div className="border border-zinc-800/80 bg-zinc-900/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center lg:min-w-[180px]">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Free</h3>
                <p className="text-zinc-400 text-xs mt-1">Delivery on ₹999+</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS BAR SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Cart Items */}
          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="bg-[#182a0d] p-3 rounded-xl text-[#a3e635] shrink-0">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">{totalCartItemsCount}</h4>
              <p className="text-zinc-400 text-xs font-medium">Cart Items</p>
              <p className="text-zinc-500 text-[11px]">In your bag</p>
            </div>
          </div>

          {/* Cart Value */}
          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="bg-blue-950/60 p-3 rounded-xl text-blue-400 shrink-0">
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                ${totalCartValue.toFixed(2)}
              </h4>
              <p className="text-zinc-400 text-xs font-medium">Cart Value</p>
              <p className="text-zinc-500 text-[11px]">Ready to checkout</p>
            </div>
          </div>

          {/* Top Products Count */}
          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="bg-amber-950/60 p-3 rounded-xl text-amber-400 shrink-0">
              <Star size={20} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">{topRatedProducts.length}</h4>
              <p className="text-zinc-400 text-xs font-medium">Top Products</p>
              <p className="text-zinc-500 text-[11px]">Highly rated</p>
            </div>
          </div>

          {/* Categories Count */}
          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="bg-purple-950/60 p-3 rounded-xl text-purple-400 shrink-0">
              <Tag size={20} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">{CATEGORIES.length}</h4>
              <p className="text-zinc-400 text-xs font-medium">Categories</p>
              <p className="text-zinc-500 text-[11px]">To explore</p>
            </div>
          </div>
        </div>

        {/* 3. SHOP BY CATEGORY SECTION */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Shop by Category</h2>
            <button
              onClick={() => navigate("/shop")}
              className="text-[#a3e635] text-xs sm:text-sm font-semibold cursor-pointer flex items-center gap-1"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categoriesWithCounts.map((cat) => (
              <div
                key={cat.id}
                onClick={() =>
                  navigate(`/shop?category=${encodeURIComponent(cat.query)}`)
                }
                className="bg-white text-black p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center space-y-2 hover:scale-[1.02] transition-transform cursor-pointer shadow-sm"
              >
                <div className="text-2xl sm:text-3xl mb-1">{cat.icon}</div>
                <h3 className="font-bold text-sm sm:text-lg truncate">{cat.title}</h3>
                <p className="text-zinc-500 text-xs">{cat.dynamicCount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TOP RATED & NEW ARRIVALS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Top Rated Card */}
          <div className="bg-white text-black rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Star size={20} className="fill-amber-400 text-amber-400 shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold">Top Rated</h2>
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="text-[#65a30d] text-xs sm:text-sm font-semibold hover:underline cursor-pointer"
              >
                See all →
              </button>
            </div>

            <div className="space-y-3">
              {topRatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-zinc-100 bg-zinc-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 transition-colors"
                >
                  <div
                    onClick={() => navigate(`/detail/${product.id}`)}
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-contain bg-white rounded-lg p-1 shrink-0"
                    />
                    <span className="font-bold text-zinc-900 text-xs sm:text-sm truncate">
                      {product.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="font-bold text-zinc-900 text-xs sm:text-sm">${product.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-[#ecfccb] text-[#4d7c0f] p-2 sm:p-2.5 rounded-xl hover:bg-[#d9f99d] transition-colors cursor-pointer"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Arrivals Card */}
          <div className="bg-white text-black rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap size={20} className="fill-[#a3e635] text-[#a3e635] shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold">New Arrivals</h2>
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="text-[#65a30d] text-xs sm:text-sm font-semibold hover:underline cursor-pointer"
              >
                See all →
              </button>
            </div>

            <div className="space-y-3">
              {newArrivalsProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-zinc-100 bg-zinc-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 transition-colors"
                >
                  <div
                    onClick={() => navigate(`/detail/${product.id}`)}
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-contain bg-white rounded-lg p-1 shrink-0"
                    />
                    <span className="font-bold text-zinc-900 text-xs sm:text-sm truncate">
                      {product.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="font-bold text-zinc-900 text-xs sm:text-sm">${product.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-[#ecfccb] text-[#4d7c0f] p-2 sm:p-2.5 rounded-xl hover:bg-[#d9f99d] transition-colors cursor-pointer"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. FOOTER FEATURE HIGHLIGHTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <Truck size={20} className="text-[#a3e635] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Fast Delivery</h4>
              <p className="text-zinc-500 text-xs">Same-day on select items</p>
            </div>
          </div>

          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <ShieldCheck size={20} className="text-[#a3e635] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Secure Payments</h4>
              <p className="text-zinc-500 text-xs">100% encrypted checkout</p>
            </div>
          </div>

          <div className="border border-zinc-800/80 bg-[#111111] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:col-span-2 md:col-span-1">
            <Percent size={20} className="text-[#a3e635] shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Best Prices</h4>
              <p className="text-zinc-500 text-xs">Price-match guarantee</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;