import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
    const colorScheme = useColorScheme()
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: "Notifications" }} />
        </Stack>
    )
}