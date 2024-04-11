import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import OrderItem from '@/src/components/order-item'
import orders from '@/assets/data/orders'
import OrderItemListItem from '@/src/components/order-item-list-item'

export default function SingleOrderScreen() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const currentOrder = orders.find((order) => order.id.toString() === id)
    if (!currentOrder||!currentOrder.order_items) {
        return router.back()
    }

    return (
        <>
            <Stack.Screen options={{ title: "Order #" + id }} />
            <View style={{padding:10,display:"flex",gap:0}}>
                <OrderItem order={currentOrder} />
                <OrderItemListItem orders={currentOrder.order_items}/>
            </View>
        </>
    )
}