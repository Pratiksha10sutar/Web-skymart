import React, { useContext, useState } from "react";
import { Zap, LogOut, ShoppingCart, Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { MyStore } from "../context/MyContext";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const [isopen, setIsopen] = useState(false);
  const { isCartOpen, setIsCartOpen, totalQuantity } = useContext(MyStore);
  const { setLoggedInUser, loggedInUser } = useContext(Auth);

  const getFirstandLastName = (fullName) => {
    if (!fullName) return "User";

    const parts = fullName.trim().split(/\s+/);
    const selectedParts = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : [parts[0]];
    return selectedParts
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogout = () => {
    localStorage.removeItem("LoggedInUser");
    setLoggedInUser(null);
    setIsopen(false);
  };

  return (
    <nav className="bg-[#0a0a0a] text-white border-b border-zinc-900 font-sans relative">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#a3e635] w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="fill-black text-black" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Sky<span className="text-[#a3e635]">Mart</span>
          </span>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink
            to={"/main"}
            className={({ isActive }) =>
              isActive ? "text-[#a3e635]" : "text-zinc-400 hover:text-white transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/shop"}
            className={({ isActive }) =>
              isActive ? "text-[#a3e635]" : "text-zinc-400 hover:text-white transition-colors"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive ? "text-[#a3e635]" : "text-zinc-400 hover:text-white transition-colors"
            }
          >
            About
          </NavLink>
        </div>

        {/* Right: Actions & Hamburger Menu */}
        <div className="flex items-center gap-3">
          {/* User Pill (Desktop) */}
          {loggedInUser && (
            <div className="hidden sm:flex items-center gap-2 bg-[#171717] border border-zinc-800/80 rounded-full pl-1 pr-3.5 py-1">
              <div className="bg-[#a3e635] text-black w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs">
                {loggedInUser.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-white">
                {getFirstandLastName(loggedInUser.name)}
              </span>
            </div>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative bg-[#171717] border border-zinc-800/80 p-2.5 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <ShoppingCart size={18} className="text-white" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#a3e635] text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {totalQuantity || 0}
            </span>
          </button>

          {/* Logout Button (Desktop) */}
          {loggedInUser && (
            <button
              onClick={handleLogout}
              className="hidden sm:flex bg-[#171717] border border-zinc-800/80 p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}

          {/* Hamburger / Close Button */}
          <button
            onClick={() => setIsopen(!isopen)}
            className="md:hidden bg-[#171717] border border-zinc-800/80 p-2.5 rounded-xl text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isopen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isopen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-zinc-900 px-4 py-4 flex flex-col gap-4 font-medium animate-in slide-in-from-top duration-200">
          <NavLink
            to={"/main"}
            onClick={() => setIsopen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#a3e635]" : "text-zinc-400 hover:text-white transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/shop"}
            onClick={() => setIsopen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#a3e635]" : "text-zinc-400 hover:text-white transition-colors"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to={"/about"}
            onClick={() => setIsopen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#a3e635]" : "text-zinc-400 hover:text-white transition-colors"
            }
          >
            About
          </NavLink>

          {loggedInUser && (
            <>
              {/* User Profile Row */}
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-950">
                <div className="bg-[#a3e635] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {loggedInUser.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-white text-base">
                  {getFirstandLastName(loggedInUser.name)}
                </span>
              </div>

              {/* Logout Row */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-500 hover:text-red-400 text-left py-2 text-base transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;