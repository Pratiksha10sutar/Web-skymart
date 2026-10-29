import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../components/ProductDetails";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Pages with Navbar (Wrapped inside Layout) */}
        <Route element={<ProtectedRoute/>}>
          <Route element={<MainLayout />}>
            <Route path="/main" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="/detail/:id" element={<ProductDetails />} />
          </Route>
        </Route>

        {/* Standalone Pages without Navbar */}
       <Route element={<PublicRoute/>}>
         <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
       </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
