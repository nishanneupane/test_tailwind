import { Alert, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, Tabs, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { PizzaSize } from '@/src/types'
import Button from '@/src/components/button'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useCart } from '@/src/providers/cart-provider'

export const sizes: PizzaSize[] = ['L', 'M', 'S', 'XL']

const ProductDetailsScreen = () => {
    const { productId } = useLocalSearchParams()
    const { addItem, items } = useCart()

    const product = products.find((p) => p.id.toString() === productId)

    if (!product) {
        return (
            <View style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                <Text >No products found</Text>
            </View>
        )
    }

    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
    const colorScheme = useColorScheme()
    const router = useRouter()
    const addToCart = () => {
        if (!product) return
        addItem(product, selectedSize)
        Alert.alert("Added to cart", "product successfully added to cart")
        router.push("/cart")

    }
    return (
        <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-around", paddingHorizontal: 23 }}>
            <Stack.Screen options={{
                title: `${product.name}`, headerRight: () => (
                    <Link href="/cart" asChild>
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
                    source={{ uri: product.image }}
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