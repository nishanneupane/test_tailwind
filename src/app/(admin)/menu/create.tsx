import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/constants/images'
import Button from '@/src/components/button'
import * as ImagePicker from "expo-image-picker"

const CreateProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState<string | null>(null)
    const [errors, setErrors] = useState("")

    const router = useRouter()

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
        Alert.alert("Item created successfully", "you have successfully created your product. Happy sales!:)")
        setName('')
        setImage('')
        setPrice('')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result)
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: "Create a Product" }} />
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
                <Button onPress={onCreate} text="Create" />
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
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
})