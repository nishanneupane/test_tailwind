import { View, Text, SafeAreaView, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/button'
import { Link } from 'expo-router'

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")

    const validate = () => {
        if (!email) {
            setErrors("Email is required")
            return false
        }
        if (!password) {
            setErrors("Password is required")
            return false
        }
        return true
    }
    
    const onSubmit = () => {
        setErrors('')
        if (!validate()) {
            return
        }
        Alert.prompt("You are signed in")

        setEmail('')
        setPassword('')
    }
    return (
        <SafeAreaView>
            <View style={{ display: "flex", alignContent: "center", justifyContent: "center", padding: 20, width: "100%", height: "100%" }}>
                <Image
                    source={require("@assets/images/deliveroo_banners/1.jpg")}

                    style={{
                        aspectRatio: 1,
                        maxWidth: "100%",
                        maxHeight: 350,
                        objectFit: "contain",
                        padding: 10
                    }}
                />
                <Text style={{ fontWeight: "600", marginBottom: 5 }}>Email</Text>
                <TextInput
                    placeholder='john@deliveoo.com.np'
                    style={{
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: "white"
                    }}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={{ fontWeight: "600", marginBottom: 5 }}>Password</Text>
                <TextInput
                    placeholder='Enter a password ...'
                    style={{
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                        padding: 10,
                        marginBottom: 20,
                        backgroundColor: "white"

                    }}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Text style={{ textAlign: "center", color: "red" }}>{errors}</Text>
                <Button text='Sign In' onPress={onSubmit} />
                <Link href={"/(auth)/sign-up"} style={{ width: "100%", textAlign: 'center' }}>
                    <Text style={{ textAlign: "center", color: "#f97316" }}>
                        I don&apos;t have an account
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default SignIn