import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "../../context/ErrorMessage";

export default function Home() {
  const navigation = useNavigation();
  const handleLogin = () => navigation.navigate("Login");
  const handleSignup = () => navigation.navigate("Signup");

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView className="flex-1 bg-black">
        <ImageBackground
          source={require("../../../assets/smallleaf.jpg")}
          resizeMode="cover"
          className="flex-1"
        >
          <View className="flex-1 bg-black/70 px-6 py-8 justify-between">
            {/* Header */}
            <ErrorMessage />
            <View className="flex-row items-center gap-3 mt-4">
              <View className="h-12 w-12 bg-cyan-500 rounded-full items-center justify-center">
                <Text className="text-white text-xl font-inter-bold">P</Text>
              </View>
              <Text className="text-white text-3xl font-inter-extrabold">
                PUSH
              </Text>
            </View>

            {/* Hero Section */}
            <View className="flex-1 items-center justify-center space-y-6">
              <Text className="text-white text-4xl font-inter-extrabold text-center">
                Your Health, Powered by AI
              </Text>
              <Text className="text-white/90 text-lg font-inter-regular text-center px-2">
                Instantly understand your health using cutting-edge AI
                technology. It’s fast, accurate, and always on your side.
              </Text>

              {/* Buttons */}
              <View className="w-full flex gap-5 space-y-4 mt-2">
                <TouchableOpacity
                  onPress={handleSignup}
                  className="bg-cyan-600 py-4 rounded-2xl shadow-xl active:opacity-80"
                >
                  <Text className="text-white text-center text-lg font-inter-semibold">
                    Get Started
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-white py-4 rounded-2xl border border-cyan-600 shadow-xl active:opacity-80"
                >
                  <Text className="text-cyan-700 text-center text-lg font-inter-semibold">
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View className="items-center mt-auto mb-4">
              <Text className="text-gray-300 text-sm font-inter-medium">
                © 2025 PUSH. All rights reserved.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
