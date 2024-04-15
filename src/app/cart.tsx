import { FlatList, Pressable, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useCart } from '../providers/cart-provider';
import CartListItem from '../components/cart-list-item';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Button from '../components/button';
import { Link } from 'expo-router';

export default function CartScreen() {
  const { items, total } = useCart()
  return (
    <SafeAreaView style={styles.container}>
      {
        items.length > 0 ? (
          <>
            <View style={{ marginRight: 20, display: "flex", gap: 3, backgroundColor: "transparent", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#f97316", backgroundColor: "transparent" }}>Your Cart
              </Text>
              <FontAwesome name='shopping-bag' size={20} color={"#f97316"} />
            </View>


            <FlatList
              data={items}
              renderItem={({ item }) => <CartListItem cartItem={item} />}
              contentContainerStyle={{ padding: 10, gap: 10 }}
              style={{ width: "100%" }}
            />

            <TouchableOpacity style={{ width: "100%", paddingHorizontal: 20 }}>
              <Text style={{ paddingHorizontal: 20, fontSize: 23 }}>
                Total : <Text style={{ fontWeight: "900", fontSize: 29 }}>
                  ${total.toFixed(2)}
                </Text>
              </Text>
              <Button text='Proceed to Checkout' style={{ width: "100%" }} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{ backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <Text style={{ fontSize: 30 }}>
              <MaterialIcons name='remove-shopping-cart' size={35} color={"#f97316"} />
              Your cart is empty !!
            </Text>
            <Link href={"/menu/"} style={{ width: 300, backgroundColor: "#f97316", height: "auto", padding: 7, paddingVertical: 9, fontSize: 23, fontWeight: "bold", color: "white", borderRadius: 10, textAlign: "center" }}>
              Continue Shopping
            </Link>
          </View>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    marginTop: 30,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
