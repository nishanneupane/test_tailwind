import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { PizzaSize } from '@/src/types'
import Button from '@/src/components/button'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useCart } from '@/src/providers/cart-provider'
import { useProduct } from '@/src/api/products'
import { defaultPizzaImage } from '@/src/constants/images'

export const sizes: PizzaSize[] = ['L', 'M', 'S', 'XL']

const ProductDetailsScreen = () => {
    const { productId } = useLocalSearchParams()
    const { addItem, items } = useCart()
    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")
    const colorScheme = useColorScheme()
    const router = useRouter()

    const { data: product, error, isLoading } = useProduct(parseInt(typeof productId === 'string' ? productId : productId[0]))

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



    const addToCart = () => {
        if (!product) return
        addItem(product, selectedSize)
        Alert.alert("Added to cart", "product successfully added to cart")
        router.push("/cart")

    }
    return (
        <>
            <Stack.Screen options={{
                title: `${product.name}`, headerRight: () => (
                    <Link href="/cart" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <View style={{ display: "flex", alignItems: "center", width: "100%", marginRight: 20 }}>
                                    <FontAwesome
                                        name="shopping-cart"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1, color: "#f97316" }}
                                    />
                                    {/* <Text style={{ color: "#fff", fontWeight: "900", opacity: pressed ? 0.5 : 1 }}>
                      SIGN IN
                    </Text> */}
                                    <Text style={{ position: "absolute", top: 0, right: 1, padding: 5, borderRadius: 10, width: 20, height: 20, backgroundColor: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", fontSize: 12, paddingBottom: 0, paddingTop: 0, color: "#fff" }}>
                                        {items.length}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                )
            }} />

            <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-around", paddingHorizontal: 23, gap: 3 }}>

                <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image
                        source={{ uri: product.image || defaultPizzaImage }}
                        width={200}
                        height={200}
                        style={styles.image}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: "left", fontWeight: "800", fontSize: 16 }}>
                        Select Size
                    </Text>
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10, marginTop: 20, width: "100%" }}>
                        {
                            sizes.map((size) => (
                                <Pressable key={size} style={[
                                    styles.size,
                                    {
                                        backgroundColor: size === selectedSize ? 'gainsboro' : 'white',
                                    },
                                ]} onPress={() => setSelectedSize(size)}>
                                    <Text>
                                        {size}
                                    </Text>
                                </Pressable>
                            ))
                        }
                    </View>
                </View>

                <View style={{ marginTop: 10, width: "100%" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Price : Rs.{product.price.toFixed(2)}</Text>
                    <Button text='Add to cart' onPress={addToCart} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }} />
                </View>
            </View>
        </>
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