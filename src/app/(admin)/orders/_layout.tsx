import { Stack } from 'expo-router'
import React from 'react'

export default function OrdersLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: "Orders" }} />
        </Stack>
    )
}