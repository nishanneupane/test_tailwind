import React, { createContext, useContext, useState } from 'react'
import { CartItem, Product, Tables } from '../types'
import { randomUUID } from "expo-crypto"


type CartType = {
    items: CartItem[]
    addItem: (product: Tables<'products'>, size: CartItem['size']) => void
    updateQuantity: (itemId: string, amount: 1 | -1) => void
    total: number
}

export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0
})


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])


    const addItem = (product: Product, size: CartItem['size']) => {

        const existingItem = items.find((item) => item.product === product && item.size === size)
        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }
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
        const filteredItems = updatedItems.filter((item) => item.quantity > 0)
        setItems(filteredItems)
    }

    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0)

    return (
        <CartContext.Provider
            value={{ items, addItem, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)