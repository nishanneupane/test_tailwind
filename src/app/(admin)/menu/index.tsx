import { View } from '@/src/components/Themed';
import { ProductListItem } from '@/src/components/ProductListItem';
import { ActivityIndicator, FlatList, Image, ScrollView, Text } from 'react-native';
import { useProductList } from '@/src/api/products';
import Colors from '@/src/constants/Colors';


export default function Home() {
  const { data, error, isLoading } = useProductList()

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

  return (
    <View>

      <FlatList
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        ListHeaderComponent={<ScrollView style={{ width: "100%", margin: 0, padding: 0 }}>
          <Image
            source={require("@assets/images/deliveroo_ui/hero-1.jpg")}
            style={{ objectFit: "cover", display: "flex", width: "100%", height: 200, borderRadius: 5 }}
          />
        </ScrollView>}
      />
    </View>
  );
}
