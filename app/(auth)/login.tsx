import {Alert, Image, ScrollView, Text, View} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";
import FormField from "@/app/components/FormField";
import CustomButton from "@/app/components/CustomButton";
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/app/context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const router = useRouter();
    const {signIn} = useAuth();
    const handleLogin = async () => {
        // if (!form.email || !form.password) {
        //     Alert.alert("Error", "All fields are required")
        // }
        await signIn(form.email, form.password);
        router.replace("/");
    }
    return (
        <SafeAreaView className="bg-[#161622] h-full">
            <ScrollView>
                <View className="px-[24px] flex justify-center pt-[100px]">
                    <Image source={images.logo} className="mt-[26px] w-[115px] h-[34px]"
                           resizeMode="contain"/>
                    <Text
                        className="mt-[40px] mb-[24px] text-[22px] font-[Poppins-SemiBold] text-[#CDCDE0]">Sign
                        in</Text>
                    <FormField
                        label="Email"
                        onChangeText={(text) => setForm({...form, email: text})}
                        value={form.email}
                        placeholder="mayorkunabdulazeez@gmail.com"
                    />
                    <FormField
                        label="password"
                        onChangeText={(text) => setForm({...form, password: text})}
                        value={form.password}
                        placeholder="MAYOR 002"
                        secureTextEntry={true}
                    />

                    <Text className="text-[#CDCDE0] mb-[24px] text-[14px] text-right font-[Poppins-SemiBold]">Forgot
                        password</Text>

                    <CustomButton title="Log in" handlePress={handleLogin}/>

                    <Text className="text-[14px] text-[#CDCDE0] mt-[20px] font-[Poppins-SemiBold] text-center">Already
                        have an account?{' '}
                        <Link href="/register">
                            <Text className="text-[#FF8E01] font-[Poppins-SemiBold]">Signup</Text>
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Login

