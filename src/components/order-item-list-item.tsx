import { View, Text, Image } from 'react-native'
import React from 'react'
import { OrderItem, Product } from '../types'
import { defaultPizzaImage } from '../constants/images'
import Colors from '../constants/Colors'

type Props = {
    orders: OrderItem[]
}
export default function OrderItemListItem({ orders }: Props) {

    return (
        <>
            {
                orders.map((order) => (
                    <View key={order.id} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", paddingVertical: 5, borderRadius: 10 }}>
                        <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "white", padding: 5 }}>
                            <Image
                                source={{ uri: order.products.image || defaultPizzaImage }}
                                width={80}
                                height={80}
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                            <View style={{ display: "flex", justifyContent: "center" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                    {order.products.name}
                                </Text>
                                <View style={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                                    <Text style={{ fontWeight: "900", fontSize: 20, color: Colors.light.tint }}>${order.products.price}</Text>
                                    <Text>Size : {order.size}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{ fontWeight: "900", fontSize: 22, marginLeft: -20,flex:1 }}>
                            {order.quantity}
                        </Text>
                    </View>
                ))
            }
        </>
    )
}