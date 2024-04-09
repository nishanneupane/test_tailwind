import { FlatList, Pressable, SafeAreaView, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useCart } from '../providers/cart-provider';
import CartListItem from '../components/cart-list-item';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../components/button';

export default function CartScreen() {
  const { items } = useCart()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginRight: 20, display: "flex", gap: 3, backgroundColor: "transparent", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#f97316", backgroundColor: "none" }}>Your Cart
        </Text>
        <FontAwesome name='shopping-bag' size={20} color={"#f97316"} />
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        style={{ width: "100%" }}
      />

      <Pressable style={{ width: "100%", paddingHorizontal: 20 }}>
        <Button text='Proceed to Checkout' style={{ width: "100%" }} />
      </Pressable>
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
