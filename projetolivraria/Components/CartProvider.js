import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}){
    const [cart, setCart] = useState([]);

    function addToCart(product){
        setCart((anterior) => [...anterior, product]);
    }

    return(
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext);
}