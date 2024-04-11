import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Order } from '../types'
import { Link, useSegments } from 'expo-router'

type Props = {
    order: Order
}
const OrderItem = ({ order }: Props) => {
    const segments = useSegments()
    return (
        // @ts-ignore
        <Link href={`/${segments[0]}/orders/${order.id}`} asChild style={{ width: "100%", backgroundColor: "white", padding: 15, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            <Pressable >
                
                    <View style={{}}>
                        <Text style={{ fontWeight: "900", fontSize: 18 }}>Order #{order.id}</Text>
                        <Text style={{ color: "gray", fontSize: 14 }}>{order.created_at}</Text>
                    </View>
                    <Text style={{ fontWeight: "900", fontSize: 18 }}>{order.status}</Text>
            </Pressable>
        </Link>
    )
}

export default OrderItem