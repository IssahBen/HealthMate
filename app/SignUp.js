import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useData } from "./context/DataContext";

export default function Signup() {
  const {
    isLoggedIn,
    setIsloggedIn,
    setConfirmPassword,
    confirmPassword,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    fullName,
    setFullName,
  } = useData();
  const router = useNavigation();

  const handleSignup = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsloggedIn(true);
      setConfirmPassword("");
      router.navigate("Bot");
    }, 1000);
  };

  const handleLogin = () => {
    router.navigate("Login");
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
        <View className="flex-1 bg-black/50 px-6 justify-between">
          {/* Header Section */}
          <View className="items-center mt-12 mb-8">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1579547621869-0ddb5f237392?w=400&auto=format&fit=crop&q=80",
              }}
              className="w-32 h-32 rounded-full mb-6"
            />
            <Text className="text-3xl font-bold text-white mb-2">
              Create Account
            </Text>
            <Text className="text-base text-white/80 text-center">
              Join us and start your journey
            </Text>
          </View>

          {/* Form Section */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="mb-6 px-4">
              <View className="mb-4">
                <Text className="mb-2 text-base text-white">Full Name</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  autoCapitalize="words"
                  className="bg-white/90 px-4 py-3 rounded-xl text-base"
                />
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-base text-white">Email Address</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white/90 px-4 py-3 rounded-xl text-base"
                />
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-base text-white">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  secureTextEntry
                  className="bg-white/90 px-4 py-3 rounded-xl text-base"
                />
              </View>

              <View className="mb-6">
                <Text className="mb-2 text-base text-white">
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  secureTextEntry
                  className="bg-white/90 px-4 py-3 rounded-xl text-base"
                />
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                onPress={handleSignup}
                disabled={isLoading}
                className={`bg-cyan-600 py-4 rounded-xl items-center mt-6 ${
                  isLoading ? "opacity-70" : ""
                }`}
              >
                <Text className="text-white text-base font-semibold">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>

              {/* Terms Text */}
              <Text className="text-xs text-white text-center mt-4">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </Text>
            </View>
          </ScrollView>

          {/* Footer Section */}
          <View className="flex-row justify-center mt-auto mb-6">
            <Text className="text-white text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-cyan-600 text-sm font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
