import { View, Text, SafeAreaView, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/button'
import { Link } from 'expo-router'
import { supabase } from '@/src/lib/supabase'
import { EvilIcons } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)

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

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    const onSubmit = () => {
        setErrors('')
        if (!validate()) {
            return
        }
        signUpWithEmail()

        Alert.alert("You are signed up", "Verify your email to get started.")

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

                <Button text={loading ? "Signing up ..." : 'Sign Up'} onPress={onSubmit} />

                <Link href={"/(auth)"} style={{ width: "100%", textAlign: 'center' }}>
                    <Text style={{ textAlign: "center", color: "#f97316" }}>
                        I already have an account
                    </Text>
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default SignUp