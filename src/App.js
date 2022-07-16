import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { Routes, Route } from "react-router-dom";
import { ProductList, NavBar, Cart, PlaceOrder, MainContainer } from "./components";
import { Link, useLocation } from "react-router-dom";
import { commerce } from "./lib/commerce";

// we use commerce for doing all the backend stuff for us

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [error, setError] = useState("");
    const location=useLocation();
    // async func are similar to .then .catch

    const fetchProducts = async () => {
        //fetching
        const { data } = await commerce.products.list();
        // here data is our products
        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    };

    const handleUpdateCartQuantity = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        // quantity is an object
        setCart(cart);
    };

    const handleRemoveItem = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    const refreshCart = async()=>{
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    // TO FULFILL / COMPLETE THE ORDER
    const handleCaptureCheckout = async (checkoutTokenId, newOrder)=>{
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            
            // once the order is done we have to refresh the page and the cart
            refreshCart();
            console.log("refreshed the cart")
        }catch(error){
            setError(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <>
            <NavBar totalItems={cart.total_unique_items} />
            {location.pathname==="/" && <MainContainer/>}
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProductList
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    }
                ></Route>
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            removeAll={handleEmptyCart}
                            removeItem={handleRemoveItem}
                            updateQty={handleUpdateCartQuantity}
                        />
                    }
                ></Route>
                <Route
                    path="/placeorder"
                    element={<PlaceOrder cart={cart} order={order} onCapture = {handleCaptureCheckout} error={error}/>}
                ></Route>
            </Routes>
        </>
    );
};

export default App;