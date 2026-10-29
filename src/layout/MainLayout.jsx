import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
import {Outlet} from 'react-router'

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Cart/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout
