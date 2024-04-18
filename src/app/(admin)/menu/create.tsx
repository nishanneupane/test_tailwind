import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/constants/images'
import Button from '@/src/components/button'
import * as ImagePicker from "expo-image-picker"
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products'
import Colors from '@/src/constants/Colors'

const CreateProduct = () => {
    const { productId } = useLocalSearchParams()

    const { data: product, error, isLoading } = useProduct(parseInt(typeof productId === 'string' ? productId : productId?.[0]))
    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct(parseInt(typeof productId === "string" ? productId : productId?.[0]))

    const idString = parseFloat(typeof productId === 'string' ? productId : productId?.[0]);


    const [name, setName] = useState(product ? product.name : "");
    const [price, setPrice] = useState(product ? product.price.toString() : "");
    const [image, setImage] = useState(product ? product.image : defaultPizzaImage);

    useEffect(() => {
        if (product) {
            setName(product?.name)
            setPrice(product?.price.toString())
            setImage(product.image)
        }
    }, [updateProduct])

    const [errors, setErrors] = useState("")

    const router = useRouter()

    if (isLoading) {
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={26} color={Colors.light.tint} />
        </View>
    }

    const isUpdating = !!idString

    const validateInput = () => {
        setErrors("")
        if (!name) {
            setErrors("Name is required")
            return false
        }
        if (!price) {
            setErrors("Price is required")
            return false
        }
        if (!image) {
            setErrors("Image is required")
            return false
        }
        return true
    }

    const onCreate = () => {
        if (!validateInput()) {
            return
        }
        try {
            insertProduct({ name, image, price: parseFloat(price) })
            Alert.alert("Item created successfully", "you have successfully created your product. Happy sales!:)")
            router.push("/")
        } catch (error) {
            Alert.alert("Something went wrong")
        }
        setName('')
        setImage('')
        setPrice("")
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const onUpdate = () => {
        if (!validateInput()) {
            return
        }
        try {
            updateProduct(
                { id: idString, name, price: parseFloat(price), image },
                {
                    onSuccess: () => {
                        setName('')
                        setImage('')
                        setPrice("")
                        router.push("/(admin)/");
                    },
                }
            );
            Alert.alert("Item updated successfully", "you have successfully updated your product. Happy sales!:)")
            router.push("/")

            setName('')
            setImage('')
            setPrice("")

        } catch (error) {
            Alert.alert("Something went wrong")
        }
    }
    const onDelete = () => {
        deleteProduct(idString, {
            onSuccess: () => {
                router.push("/(admin)/")
                setName('')
                setImage('')
                setPrice("")
            }
        })
        Alert.alert("Deleted successful")
    }

    const confirmDelete = () => {
        Alert.alert("Delete", "Are you sure you want to delete this product?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => onDelete()
            },
        ])
    }

    return (
        <>
            <Stack.Screen options={{ title: isUpdating ? "Edit Product" : "Create a Product" }} />
            <View style={styles.container}>
                <Pressable
                    onPress={pickImage}
                >
                    <Image
                        source={{ uri: image || defaultPizzaImage }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text
                        style={{ color: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", width: "100%", alignSelf: "center", marginTop: 10, textAlign: "center" }}>
                        Select Image
                    </Text>
                </Pressable>
                <Text style={styles.label}>
                    Name
                </Text>
                <TextInput
                    placeholder='Perroni Pizza'
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>
                    Price
                </Text>
                <TextInput
                    placeholder='Rs.90'
                    style={styles.input}
                    keyboardType='numeric'
                    value={price}
                    onChangeText={setPrice}
                />
                <Text style={styles.error}>{errors}</Text>
                {
                    isUpdating ? (
                        <>
                            <Button onPress={onUpdate} text="Update" />
                            <Text onPress={confirmDelete} style={{ color: "red", textAlign: "center" }}>
                                Delete
                            </Text>
                        </>
                    ) : (
                        <Button onPress={onCreate} text="Create" style={{ backgroundColor: "red" }} />

                    )
                }
            </View>
        </>
    )
}

export default CreateProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: "gray",
        fontSize: 16
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 5
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
})