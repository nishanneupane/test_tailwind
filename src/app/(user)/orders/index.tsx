import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import orders from '@/assets/data/orders'
import OrderItem from '@/src/components/order-item'

const OrdersScreen = () => {
    return (
        <View>
            <FlatList
                data={orders}
                renderItem={({ item }) => (<OrderItem order={item} />)}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
        </View>
    )
}

export default OrdersScreen

const styles = StyleSheet.create({})