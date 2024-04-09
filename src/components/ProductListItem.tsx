import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Product } from "../types";
import { Link } from "expo-router";

export const ProductListItem = ({ product }: {
    product: Product
}) => {
    return (
        <Link href={`/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: product.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png' }}
                    // source={{ uri: product.image ? product.image : 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png' }}
                    style={styles.image}
                    resizeMode="contain"
                    alt='Image'
                />
                <Text style={styles.title}>{product.name}</Text>
                <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexDirection: "row" }}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
                        <Ionicons name="star" size={20} color="#f97316" />
                        <Text>4.8</Text>
                    </View>
                    <Text style={{ color: "#f97316" }}>Pizza</Text>
                </View>
                <Text style={styles.price}>Rs.{product.price}</Text>
                <View style={{ padding: 5, backgroundColor: "#f97316", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#fff", fontWeight: "900", fontSize: 17 }}>
                        See More <AntDesign name="arrowright" size={17} color={"#fff"} />
                    </Text>
                </View>



            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        flex: 1,
        maxWidth: "50%",
        borderWidth: 1,
        borderColor: "rgb(229, 229, 229)"
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 10,
        color: "#262626"
    },
    price: {
        color: "#262626",
        fontWeight: "900",
        fontSize: 24
    },
    image: {
        width: "100%",
        aspectRatio: 1
    }
});