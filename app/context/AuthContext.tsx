import React, {createContext, useContext, useEffect, useState} from "react";
import {Alert} from "react-native";
import {supabase} from "@/app/lib/supabase/client";
import {useRouter} from "expo-router";

// It's better to handle routing logic in your root layout (_layout.tsx)
// based on the auth state, not inside the context.

export interface User {
    username: string;
    email?: string;
    name: string;
    avatar_url?: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    signUp: (username: string, email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Listen for changes in authentication state
        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                const sessionUser = session.user;
                setUser({
                    username: sessionUser.user_metadata?.username || "",
                    email: sessionUser.email,
                    name: sessionUser.user_metadata?.username || "",
                });
            } else {
                setUser(null);
                router.replace("/onboarding");
            }
            // The first time this callback is called, the initial session is loaded.
            setIsLoading(false);
        });

        return () => {
            // Cleanup subscription on unmount
            subscription.unsubscribe();
        };
    }, []);

    const signUp = async (username: string, email: string, password: string) => {
        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {username}, // This will store the username in user_metadata
            },
        });

        if (error) {
            Alert.alert("Registration Error", error.message);
            throw error;
        }
        // The onAuthStateChange listener will handle setting the user state.
        // Alert.alert("Success", "Registration successful! Please check your email to verify.");
    };

    const signIn = async (email: string, password: string) => {
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert("Sign In Error", error.message);
            throw error;
        }
        // The onAuthStateChange listener will handle setting the user state.
    };

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();

        if (error) {
            Alert.alert("Sign Out Error", error.message);
            throw error;
        }
        // The onAuthStateChange listener will handle setting the user state to null.
    };

    const contextValue: AuthContextType = {
        user,
        isLoggedIn: !!user, // Derived from the user state
        signUp,
        signIn,
        signOut,
        isLoading,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
