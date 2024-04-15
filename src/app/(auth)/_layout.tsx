import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/auth-provider'

export default function AuthLayout() {
    const { session } = useAuth()
    if (session) {
        return <Redirect href={"/"} />
    }
    return (
        <Stack>
            <Stack.Screen name='sign-in' options={{ title: "Sign In" }} />
            <Stack.Screen name='sign-up' options={{ title: "Sign Up" }} />
        </Stack>
    )
}