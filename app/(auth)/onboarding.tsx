import {Image, ScrollView, Text, View} from 'react-native'
import React from 'react'
import {images} from "@/constants";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "@/app/components/CustomButton";
import {useRouter} from "expo-router";

const Onboarding = () => {
    const router = useRouter();
    const handleNavigation = () => {
        router.replace("/register");
    }
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-[#161622]">
            <ScrollView contentContainerStyle={{
                height: "100%",
            }}>
                <View className="w-full">
                    <View className="w-full justify-center items-center">
                        <Image source={images.logo} className="mt-[26px] w-[115px] h-[34px]"
                               resizeMode="contain"/>
                    </View>
                    <Image source={images.cards} className="w-full h-[375px]" resizeMode="contain"/>
                    <View className="relative">
                        <Text className="mt-[12px] text-center text-[30px] font-[Poppins-Bold] text-[#CDCDE0]">
                            Discover Endless{"\n"} Possibilities with <Text className="text-[#FF8E01]">Aora</Text>
                        </Text>
                        <Image source={images.path} resizeMode="contain"
                               className="absolute w-[65.03px] h-[13.69px] right-6 bottom-2"/>
                    </View>
                    <Text className="mt-[20px] mb-[30px] text-[#CDCDE0] text-center text-[14px] font-[Poppins-Regular]">
                        Where Creativity Meets Innovation: Embark on a Journey of
                        Limitless Exploration with Aora
                    </Text>
                    <CustomButton title="Continue with Email" handlePress={handleNavigation}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Onboarding
