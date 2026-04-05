import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';

interface CustomButtonProps {
    title: string;
    handlePress?: () => void;
}

const CustomButton = ({title, handlePress}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`rounded-lg overflow-hidden ${
                title === "Continue with Email" ? "mx-[24px]" : "mx-0"
            }`}
        >
            <LinearGradient
                colors={['#FF8C00', '#FFA300']}
                className="py-[18px] justify-center items-center rounded-full"
            >
                <Text className="text-[#161622] font-[Poppins-SemiBold] text-[16px]">
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CustomButton;