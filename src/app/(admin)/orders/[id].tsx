import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import OrderItem from '@/src/components/order-item'
import orders from '@/assets/data/orders'
import OrderItemListItem from '@/src/components/order-item-list-item'
import { Order, OrderStatus, OrderStatusList } from '@/src/types'
import Colors from '@/src/constants/Colors'

export default function SingleOrderScreen() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const currentOrder = orders.find((order) => order.id.toString() === id)
    if (!currentOrder || !currentOrder.order_items) {
        return router.back()
    }
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("New")

    const updateStatus = (status: OrderStatus) => {
        setSelectedStatus(status)
    }

    return (
        <>
            <Stack.Screen options={{ title: "Order #" + id }} />
            <View style={{ padding: 10, display: "flex", gap: 0 }}>
                <OrderItem order={currentOrder} />

                <FlatList
                    data={currentOrder.order_items}
                    renderItem={({ item }) => <OrderItemListItem order={item} />}
                    ListFooterComponent={() => (
                        <>
                            <Text style={{ fontWeight: 'bold' }}>Status</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                {OrderStatusList.map((status) => (
                                    <Pressable
                                        key={status}
                                        onPress={() => updateStatus(status)}
                                        style={{
                                            borderColor: Colors.light.tint,
                                            borderWidth: 1,
                                            padding: 10,
                                            borderRadius: 5,
                                            marginVertical: 10,
                                            backgroundColor:
                                                selectedStatus === status
                                                    ? Colors.light.tint
                                                    : 'transparent',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    selectedStatus === status ? 'white' : Colors.light.tint,
                                            }}
                                        >
                                            {status}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </>
                    )}
                />



            </View>
        </>
    )
}