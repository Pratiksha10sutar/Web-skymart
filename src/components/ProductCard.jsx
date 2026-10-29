import React, { useContext } from "react";
import { Star, ShoppingCart, Check } from "lucide-react";
import { MyStore } from "../context/MyContext";
import {useNavigate} from 'react-router'

const ProductCard = ({ product, isInCart }) => {
  let { cartItems, setCartItems,setIsCartOpen } = useContext(MyStore);
 let navigate = useNavigate();

  const addToCart = () => {
    // let arr = [...cartItems, { ...product, quantity: 1 }];
    // setCartItems(arr);

    const existingItem = cartItems.find((val) => val.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((val) =>
        val.id === product.id ? { ...val, quantity: val.quantity + 1 } : val,
      );
    }else{
      updatedCart = [...cartItems, {...product,quantity:1}]
    }

    setCartItems(updatedCart);
    localStorage.setItem("updatedCart",JSON.stringify(updatedCart));
    setIsCartOpen(true);
  };

  return (
    <div>
      <div className="bg-[#111111] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 group h-full">
        {/* Image Container with Floating Category Tag */}
        <div className="bg-white p-6 relative flex items-center justify-center h-56 shrink-0">
          <span className="absolute top-3 left-3 bg-zinc-800/90 text-zinc-300 text-[10px] font-semibold px-2.5 py-1 rounded-md z-10">
            {product.category}
          </span>
          <img
          onClick={() => navigate(`/detail/${product.id}`)}
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Card Details */}
        <div className="p-4 flex flex-col justify-between flex-1 gap-3">
          <div className="space-y-1.5">
            <p className="text-zinc-500 text-xs font-medium">
              {product.category}
            </p>

            {/* Truncated Title */}
            <h3
              className="font-bold text-sm text-white truncate w-full"
              title={product.title}
            >
              {product.title}
            </h3>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 pt-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < Math.floor(product.rating || 4)
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-600"
                    }
                  />
                ))}
              </div>
              <span className="text-zinc-500 text-xs ml-1">
                ({product.reviews || 100})
              </span>
            </div>
          </div>

          {/* Price & Add Button */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 mt-auto">
            <span className="text-base font-extrabold text-[#a3e635]">
              ${product.price}
            </span>
            {isInCart ? (
              <button
                type="button"
                disabled
                className="flex cursor-pointer items-center gap-1.5 font-bold text-xs px-3 py-2 rounded-xl  transition-colors bg-green-500/15 text-green-400 border border-green-500/20 cursor-default"
              >
                <Check size={14} className="text-green-400 stroke-[2.5] " />
                Added
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="flex items-center gap-1.5 cursor-pointer bg-[#a3e635] text-black font-bold text-xs px-3 py-2 rounded-xl hover:bg-[#8ece28] transition-colors"
              >
                <ShoppingCart size={14} />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
