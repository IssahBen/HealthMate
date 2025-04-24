/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useData } from "./context/DataContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
// eslint-disable-next-line no-unused-vars
export default function Login({ onLogin }) {
  const {
    setIsLoggedIn,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    Login,
  } = useData();
  const navigation = useNavigation();

  // Animation for loading spinner

  const handleLogin = async () => {
    const formprops = { user: { email: email, password: password } };
    setIsLoading(true);
    const result = await Login(formprops);

    if (result === "success") {
      setIsLoggedIn(true);
      setIsLoading(false);
      navigation.navigate("Bot");
    } else {
      setIsLoading(false);
      console.log("Login failed");
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  // Spin animation for loader

  return (
    <>
      {isLoading ? (
        <View
          className=" flex-1 loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
     aspect-square w-8 flex justify-center items-center text-yellow-700"
        ></View>
      ) : null}
      {!isLoading ? (
        <ImageBackground
          source={require("../assets/45.jpg")} // Add your custom health-themed background image
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SafeAreaView className="flex-1 justify-center items-center  bg-opacity-40">
            {/* Header */}

            <View className="w-11/12 max-w-md p-6 bg-white rounded-lg shadow-xl">
              <View className="gap-4">
                {/* Email Input */}
                <View>
                  <TextInput
                    className="text-black border-b border-gray-500 px-2 py-3 text-lg"
                    placeholder="Email"
                    placeholderTextColor="#cfe6ed"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* Password Input */}
                <View>
                  <TextInput
                    className="text-black border-b border-gray-500 px-2 py-3 text-lg"
                    placeholder="Password"
                    placeholderTextColor="#cfe6ed"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  className="mt-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                  }}
                >
                  <Text className="text-black text-xl font-semibold text-center">
                    Sign In
                  </Text>
                </TouchableOpacity>

                {/* Sign up link */}
                <TouchableOpacity onPress={handleSignup} className="mt-4">
                  <Text className="text-teal-500 text-center">
                    Don&apos;t have an account? Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      ) : null}
    </>
  );
}
