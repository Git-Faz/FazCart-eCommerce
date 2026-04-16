import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Auth from "@/pages/Auth";
import Order from "@/pages/Order"
import UserProfile from "@/pages/UserProfile";
import Payment from "@/pages/Payment"
import type { JSX } from "react";

const AppRoutes = (): JSX.Element => {
    return(
        <Routes>
            <Route path = "/" element={<Home/>}></Route>
            <Route path="/products" element={<Products />} />
            <Route path = "/cart" element={<Cart/>}></Route>
            <Route path = "/products/:id" element={<ProductDetails/>}></Route>
            <Route path ="/checkout" element={<Checkout/>}></Route>
            <Route path="/orders" element={<Order/>}/>
            <Route path="/payment/:orderId" element={<Payment/>}/>
            <Route path ="/auth" element={<Auth/>}></Route>
            <Route path="/account" element={<UserProfile/>} />
        </Routes>
    )
}

export default AppRoutes;