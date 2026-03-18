// import React, { useState } from "react";
import OrderSummary from "@/components/ui/OrderSumary";
import CartCard from "@/components/ui/CartCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useAuthStore, useThemeStore } from "@/store/useThemeStore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const theme=useThemeStore((state)=>(state.theme));
    const  login  = useAuthStore(state => (state.token));
    
    if (!login) {
        return <Navigate to="/login" replace />;
    }

    // const [cartItems, setCartItems] = useState(
    //     JSON.parse(localStorage.getItem("cart")) || []
    // );

    // const onRemove = (itemId) => {
    //     const updatedCart = cartItems.filter((item) => item.id !== itemId);
       
    //     setCartItems(updatedCart);
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));

    //     alert("Item removed from cart!");
    // };
    // const incrementQuantity = (itemId) => {
    //     const updatedCart = cartItems.map((item) =>
    //         item.id === itemId
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     );

    //     setCartItems(updatedCart);
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));
    // };

    // const decrementQuantity = (itemId) => {
    //     const updatedCart = cartItems
    //         .map((item) => {
    //         if (item.id === itemId) {
    //             return { ...item, quantity: item.quantity - 1 };
    //         }
    //         return item;
    //         })
    //         .filter((item) => item.quantity > 0);

    //     setCartItems(updatedCart);
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));
    //     };
    const items = [
        { label: "Home", to: "/" },
        { label: "Cart" }
    ];

    return (
        < div style={theme === "light" ? { backgroundColor: "#fff", color: "#000" } : { backgroundColor: "#333", color: "#fff" }} className="min-h-screen">
        <Breadcrumb items={items} />
        <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
            {cartItems.length === 0? (
            <p className="text-muted-foreground">Your cart is empty</p>
            ) : (
            cartItems.map((item) => (
                <CartCard key={item.id} item={item}/>
            ))
            )}
        </div>

        <OrderSummary items={cartItems} />
        </div>
    </div>);
}

export default Cart;