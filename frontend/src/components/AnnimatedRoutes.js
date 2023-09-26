import React from 'react'
import CartScreen from '../screens/CartScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ProductScreen from '../screens/ProductScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'
import ProfileScreen from '../screens/ProfileScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PaymentScreen from '../screens/PaymentScreen'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'
import OrderScreen from '../screens/OrderScreen'
import UserListScreen from '../screens/UserListScreen'
import UserEditScreen from '../screens/UserEditScreen'
import ProductListScreen from '../screens/ProductListScreen'
import ProductEditScreen from '../screens/ProductEditScreen'
import OrderListScreen from '../screens/OrdersListScreen'
import Dash from "../screens/dashb"

const AnnimatedRoutes = () => {
    const location=useLocation()

  return (
    <AnimatePresence mode="wait"
    initial={false}
    onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/admin/userList" element={<UserListScreen />} />   
            <Route path="/admin/productlist" element={<ProductListScreen />} />   
            <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />   
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />         
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />   
            <Route path="/admin/orderlist" element={<OrderListScreen />} />   
            <Route path="/admin/dash" element={<Dash />} />   


            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
          </Routes> 
    </AnimatePresence>
 )
}

export default AnnimatedRoutes