import {Tabs} from 'expo-router';
import React from "react";
import {Image, Text, View} from "react-native";
import {icons} from "@/constants";

type tabProps = {
    icon: any,
    focused: boolean,
    title: string,
}
const TabIcon = ({icon, focused, title}: tabProps) => {
    return (
        <View className="flex-1 flex-col items-center mt-4">
            <Image
                source={icon}
                tintColor={focused ? '#FFA001' : '#CDCDE0'}
                resizeMode="contain"
                className="size-6"
            />
            <Text
                className={`${focused ? 'text-[#FFA001] font-[Poppins-SemiBold]' : 'text-[#CDCDE0] font-[Poppins-Regular]'} text-xs mt-0.5 w-full text-center`}>
                {title}
            </Text>
        </View>
    )
}

const TabLayout = () => {

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#161622',
                    minHeight: 70,
                    borderTopColor: '#232533',
                    borderTopWidth: 1,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home"/>
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.plus} title="Create"/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.profile} title="Profile"/>
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.bookmark} title="Saved"/>
                    ),
                }}
            />

        </Tabs>
    );
}

export default TabLayout;