import { View } from '@/src/components/Themed';
import { ProductListItem } from '@/src/components/ProductListItem';
import { FlatList, Image, ScrollView } from 'react-native';
import products from '@/assets/data/products';


export default function Home() {
  return (
    <>
      <FlatList
        data={products}
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
    </>
  );
}
