import React, { useState, useEffect, useContext } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { MyStore } from "../context/MyContext";

const ProductDetails = () => {
  let { cartItems, setCartItems, setIsCartOpen, incrementQuantity, decrementQuantity } = useContext(MyStore);
  let { id } = useParams();
  let navigate = useNavigate();

  const [singleProductData, setsingleProductData] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const getSingleProductData = async () => {
    try {
      let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setsingleProductData(res.data);
    } catch (error) {
      console.log("Error in single product data", error);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, [id]);

  // Check if product is already in cart
  const cartItem = cartItems.find((val) => val.id === singleProductData.id);
  const isInCart = !!cartItem;

  // Add to cart handler for new items
  const addToCart = () => {
    let updatedCart = [...cartItems, { ...singleProductData, quantity: 1 }];
    setCartItems(updatedCart);
    localStorage.setItem("updatedCart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
          <span 
          onClick={() => navigate("/shop")}
           className="hover:text-white transition-colors">
            Products
          </span>
          <span>/</span>
          <span className="capitalize  transition-colors">
            {singleProductData.category || "Loading..."}
          </span>
          <span>/</span>
          <span className="text-zinc-200 font-medium truncate max-w-[200px]">
            {singleProductData.title}
          </span>
        </div>

        {/* Main Content Grid: Image Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-2">
          
          {/* Left: White Image Container */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[350px] sm:min-h-[480px] shadow-lg">
            <img
              src={singleProductData.image}
              alt={singleProductData.title}
              className="max-h-[320px] sm:max-h-[400px] w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Product Info & Actions */}
          <div className="space-y-5">
            {/* Category Tag */}
            <div>
              <span className="inline-block bg-[#12260e] text-[#a3e635] text-xs font-semibold px-3 py-1 rounded-md border border-[#a3e635]/20 uppercase tracking-wide">
                {singleProductData.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {singleProductData.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(singleProductData.rating?.rate || 4)
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-600"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white">
                {singleProductData.rating?.rate || "4.7"}
              </span>
              <span className="text-xs text-zinc-400">
                ({singleProductData.rating?.count || 65} reviews)
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800" />

            {/* Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-[#a3e635] tracking-tight">
              ${singleProductData.price}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {singleProductData.description}
            </p>

            {/* Conditional Action UI based on isInCart */}
            {isInCart ? (
              <div className="space-y-4 pt-2">
                {/* 1. Quantity Selector Bar ("In cart:") */}
                <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl border border-zinc-700 bg-black shadow-sm">
                  <span className="text-zinc-400 text-sm sm:text-base font-medium">
                    In cart:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decrementQuantity(singleProductData.id)}
                      className="w-9 h-9 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-base sm:text-lg w-6 text-center text-white">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementQuantity(singleProductData.id)}
                      className="w-9 h-9 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* 2. Added to Cart & Wishlist Button Row */}
                <div className="flex items-center gap-3 w-full">
                  <button
                    type="button"
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#0a2614] border border-[#1b4d2e] text-[#22c55e] font-semibold text-sm sm:text-base cursor-default shadow-sm"
                  >
                    <Check size={18} className="stroke-[3]" />
                    Added to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-14 h-14 rounded-2xl border border-zinc-800 bg-black flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer shrink-0"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={20}
                      className={isLiked ? "fill-red-500 text-red-500" : "text-zinc-300"}
                    />
                  </button>
                </div>

                {/* 3. View Cart Button */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl border border-zinc-800 bg-black text-zinc-200 font-medium text-sm sm:text-base hover:bg-zinc-900 hover:border-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-2 group shadow-sm"
                >
                  <span>View Cart</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {/* Only Add to Cart & Wishlist Button Row initially */}
                <div className="flex items-center gap-3 w-full">
                  <button
                    type="button"
                    onClick={addToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#a3e635] text-black font-extrabold text-sm sm:text-base hover:bg-[#8ece28] transition-colors cursor-pointer shadow-lg shadow-[#a3e635]/10"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-14 h-14 rounded-2xl border border-zinc-800 bg-black flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer shrink-0"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={20}
                      className={isLiked ? "fill-red-500 text-red-500" : "text-zinc-300"}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Features / Perks Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-3 sm:p-4 text-center space-y-1.5">
                <Truck className="mx-auto text-[#a3e635]" size={20} />
                <h4 className="text-xs font-bold text-white">Free Delivery</h4>
                <p className="text-[10px] text-zinc-500">On orders $50+</p>
              </div>

              <div className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-3 sm:p-4 text-center space-y-1.5">
                <ShieldCheck className="mx-auto text-[#a3e635]" size={20} />
                <h4 className="text-xs font-bold text-white">Secure Pay</h4>
                <p className="text-[10px] text-zinc-500">256-bit SSL</p>
              </div>

              <div className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-3 sm:p-4 text-center space-y-1.5">
                <RefreshCw className="mx-auto text-[#a3e635]" size={20} />
                <h4 className="text-xs font-bold text-white">Easy Returns</h4>
                <p className="text-[10px] text-zinc-500">30-day policy</p>
              </div>
            </div>

            {/* Previous & Next Product Navigation */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  if (Number(id) > 1) {
                    navigate(`/detail/${Number(id) - 1}`);
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#141414] hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm font-bold py-3.5 px-5 rounded-2xl border border-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate(`/detail/${Number(id) + 1}`);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#8ece28] text-black text-xs sm:text-sm font-bold py-3.5 px-5 rounded-2xl transition-colors cursor-pointer"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;