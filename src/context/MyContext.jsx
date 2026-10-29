import { createContext, useState ,useEffect} from "react";
import axios from "axios";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("updatedCart")) || [];
  });

  const [search, setSearch] = useState("");

  const searchProduct = productsData.filter((product) => 
    product.title.toLowerCase().includes(search.toLowerCase())
);


// Fetch product data on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProductsData(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProductsData]);


  const incrementQuantity = (id) => {
    // setCartItems((prev) => {
    //   return prev.map((val) =>{
    //     return val.id === id ? {...val, quantity : val.quantity + 1} :val;
    //   })
    // })

    let updatedCart = cartItems.map((val) => {
      return val.id === id ? { ...val, quantity: val.quantity + 1 } : val;
    });
    setCartItems(updatedCart);
    localStorage.setItem("updatedCart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (id) => {
    // setCartItems((prev) => {
    //   return prev.map((val) =>{
    //     return val.id === id ? {...val, quantity : val.quantity - 1} :val;
    //   }).filter((val) => val.quantity > 0)
    // })

    let updatedCart = cartItems
      .map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity - 1 } : val;
      })
      .filter((val) => val.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("updatedCart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    let updatedCart = cartItems.filter((val) => val.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("updatedCart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("updatedCart");
  };

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <MyStore.Provider
      value={{
        showPassword,
        setShowPassword,
        productsData,
        setProductsData,
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
        totalQuantity,
        search,
        setSearch,
        searchProduct,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};
