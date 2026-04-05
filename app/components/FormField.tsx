import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {icons} from "@/constants";

interface FormProps {
    label: string;
    value: string;
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

const FormField = ({label, value, onChangeText, placeholder, secureTextEntry}: FormProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <View className="mb-[22px] relative">
            <Text className="text-[#CDCDE0] font-[Poppins-Medium] text-[16px] mb-[8px]">{label}</Text>
                <TextInput
                    className="bg-[#1E1E2D] border border-[#232533] text-white py-[18px] px-[16px] pr-12 rounded-lg"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    secureTextEntry={secureTextEntry && !showPassword}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 bottom-4"
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
        </View>
    )
}
export default FormField
