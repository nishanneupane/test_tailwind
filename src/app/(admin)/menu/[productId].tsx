import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useCart } from '@/src/providers/cart-provider'
import { useProduct } from '@/src/api/products'
import { defaultPizzaImage } from '@/src/constants/images'

export const sizes: PizzaSize[] = ['L', 'M', 'S', 'XL']

const ProductDetailsScreen = () => {
    const { productId } = useLocalSearchParams()
    const colorScheme = useColorScheme()

    const { data: product, error, isLoading } = useProduct(parseInt(typeof productId === 'string' ? productId : productId?.[0]))

    if (isLoading) {
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={26} color={Colors.light.tint} />
        </View>
    }

    if (error) {
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Something went wrong!!</Text>
        </View>
    }

    if (!product) {
        return (
            <View style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                <Text >No products found</Text>
            </View>
        )
    }

    return (
        <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-around", paddingHorizontal: 23 }}>
            <Stack.Screen options={{
                title: `${product.name}`, headerRight: () => (
                    <Link href={`/(admin)/menu/create?productId=${productId}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <View style={{ display: "flex", alignItems: "center", width: "100%", marginRight: 20 }}>
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1, color: "#f97316" }}
                                    />


                                </View>
                            )}
                        </Pressable>
                    </Link>
                )
            }} />
            <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={{ uri: product.image || defaultPizzaImage }}
                    width={200}
                    height={200}
                    style={styles.image}
                />
            </View>


            <View style={{ marginTop: 10, width: "100%" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> {product.name}</Text>
                <Text style={{ fontSize: 17, fontWeight: "500" }}>Price : Rs.{product.price.toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        objectFit: "contain"
    },
    size: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

})