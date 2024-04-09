import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { CartItem, Product } from '../types'
import { randomUUID } from "expo-crypto"


type CartType = {
    items: CartItem[]
    addItem: (product: Product, size: CartItem['size']) => void
    updateQuantity: (itemId: string, amount: 1 | -1) => void
}
export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: (itemId: string, amount: 1 | -1) => { }
})


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])


    const addItem = (product: Product, size: CartItem['size']) => {

        const newCartItem: CartItem = {
            product,
            product_id: product.id,
            quantity: 1,
            size,
            id: randomUUID()
        }

        setItems([newCartItem, ...items])
    }

    const updateQuantity = (itemId: string, amount: 1 | -1) => {
        const updatedItems = items.map((item) => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount })
        setItems(updatedItems)
    }

    return (
        <CartContext.Provider
            value={{ items, addItem, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)