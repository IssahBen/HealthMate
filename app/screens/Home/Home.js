import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "./context/ErrorMessage";
export default function Home() {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignup = () => {
    navigation.navigate("Signup");
  };
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1579547621869-0ddb5f237392?w=400&auto=format&fit=crop&q=80",
        }}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 relative bg-black/60 px-6 justify-between">
          {/* Header */}
          <ErrorMessage />
          <View className="mt-12 flex-row items-center">
            <View className="h-12 w-12 bg-cyan-500 rounded-full items-center justify-center">
              <Text className="text-white text-lg font-bold">P</Text>
            </View>
            <Text className="ml-3 text-3xl font-bold text-white">PUSH</Text>
          </View>

          {/* Content */}
          <View className="items-center justify-center px-4">
            <Text className="text-white text-4xl font-extrabold text-center mb-4">
              Your Health, Powered by AI
            </Text>
            <Text className="text-white/90 text-lg text-center mb-8">
              Instantly understand your health using cutting-edge AI technology.
              It&apos;s fast, accurate, and always on your side.
            </Text>

            {/* Buttons */}
            <View className="w-full">
              <TouchableOpacity
                onPress={handleSignup}
                className="bg-cyan-600 py-4 rounded-xl mb-4 shadow-lg active:opacity-80"
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Get Started
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-white py-4 rounded-xl border border-cyan-600 shadow-lg active:opacity-80"
              >
                <Text className="text-cyan-700 text-center text-lg font-semibold">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="mb-6 items-center">
            <Text className="text-gray-200 text-sm">
              © 2025 pUSH. All rights reserved.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
