import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderItem from '@/src/components/order-item'
import orders from '@/assets/data/orders'
import OrderItemListItem from '@/src/components/order-item-list-item'

export default function SingleOrderScreen() {
    const { id } = useLocalSearchParams()

    const currentOrder = orders.find((order) => order.id.toString() === id)
    if (!currentOrder || !currentOrder.order_items) {
        return <Text>
            Not found
        </Text>
    }

    return (
        <>
            <Stack.Screen options={{ title: "Order #" + id }} />
            <View style={{ padding: 10, display: "flex", gap: 0, width: "100%" }}>
                <OrderItem order={currentOrder} />
                {/* <OrderItemListItem orders={currentOrder.order_items} /> */}
                <FlatList
                    data={currentOrder.order_items}
                    renderItem={({ item }) => <OrderItemListItem order={item} />}
                />


            </View>
        </>
    )
}