import React, { useContext } from "react";
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { MyStore } from "../context/MyContext";

const Cart = () => {
  let {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    totalQuantity
  } = useContext(MyStore);

  if (!isCartOpen) {
    return null;
  }


  const totalPrice = cartItems.reduce((total,val) => {
    return total + val.price * val.quantity;
  },0)

  

  return (
    <div className="fixed inset-0 z-50 font-sans">
      {/* Overlay Backdrop - Click karne par cart close hoga */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Aside Right Container */}
      <aside className="absolute right-0 top-0 flex h-screen w-full sm:w-[420px] flex-col bg-[#0a0a0a] text-white border-l border-zinc-800/80 shadow-2xl z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 p-5 bg-[#111111]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-[#a3e635]" />
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            <span className="bg-[#182a0d] text-[#a3e635] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#a3e635]/20">
             {totalQuantity}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            type="button"
            className="text-zinc-400 hover:text-white bg-zinc-900 p-2 rounded-xl border border-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cartItems.map((val) => (
            <div key={val.id} className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-4 flex gap-4 items-center">
              {/* Product Image */}
              <div className="bg-white p-2 rounded-xl shrink-0 w-20 h-20 flex items-center justify-center">
                <img
                  src={val.image}
                  alt="Mens Cotton Jacket"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-white line-clamp-1">
                    {val.title}
                  </h3>
                  <span className="font-extrabold text-[#a3e635] text-sm shrink-0">
                    ${val.price}
                  </span>
                </div>

                <p className="text-xs text-zinc-500">{val.category}</p>

                {/* Quantity Counter & Delete Button */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900/80">
                    <button
                      onClick={() => decrementQuantity(val.id)}
                      type="button"
                      className="px-2.5 py-1 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-3 text-xs font-bold text-white">
                      {val.quantity}
                    </span>

                    <button
                      onClick={() => incrementQuantity(val.id)}
                      type="button"
                      className="px-2.5 py-1 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(val.id)}
                    type="button"
                    className="text-rose-400 hover:text-rose-300 bg-zinc-900/80 border border-zinc-800 p-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Summary */}
        <div className="border-t border-zinc-800/80 p-5 bg-[#111111] space-y-4">
          <div className="flex justify-between items-center text-base font-medium">
            <span className="text-zinc-400">Total</span>
            <span className="font-extrabold text-2xl text-white">${totalPrice}</span>
          </div>

          <button
            type="button"
            className="w-full rounded-2xl bg-[#a3e635] hover:bg-[#8ece28] py-3.5 text-black font-extrabold text-sm transition-colors shadow-lg shadow-[#a3e635]/10 flex items-center justify-center gap-2"
          >
            Checkout
            <ArrowRight size={16} />
          </button>

          <div className="text-center">
            <button
            onClick={clearCart}
              type="button"
              className="text-zinc-500 hover:text-zinc-400 text-xs font-medium transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Cart;
