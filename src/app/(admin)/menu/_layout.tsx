import Colors from '@/src/constants/Colors'
import { useCart } from '@/src/providers/cart-provider'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, useColorScheme, View } from 'react-native'

const MenuStack = () => {
    const colorScheme = useColorScheme()
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    // headerShown: false,
                    headerTitle: "Home",
                    headerRight: () => (
                        <Link href="/(admin)/menu/create" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <View style={{ display: "flex", alignItems: "center", width: "100%", borderRadius: 5, marginBottom: 0, marginRight: 20, position: "relative" }}>
                                        <FontAwesome
                                            name="plus-square-o"
                                            size={30}
                                            color={Colors[colorScheme ?? 'light'].text}
                                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                        />

                                    </View>
                                )}
                            </Pressable>
                        </Link>
                    ),
                    headerLeft: () => (
                        <Link href="/" asChild style={{ width: 50, height: 50, marginLeft: 20 }}>
                            <Image
                                source={require("@assets/images/deliveroo_ui/logo-1.jpg")}
                                width={50}
                                height={50}
                            />
                        </Link>
                    ),

                    headerBackground: () => (
                        <View style={{ backgroundColor: '#fd9221', height: "100%", borderBottomWidth: 1, borderBottomColor: "rgb(229, 229, 229)" }} />
                    )
                }}
            />
        </Stack>
    )
}

export default MenuStack