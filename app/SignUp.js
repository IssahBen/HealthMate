import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import { useData } from "./context/DataContext";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "./context/ErrorMessage";
import { StatusBar } from "react-native"; // Add this import
export default function Signup() {
  const {
    isLoggedIn,
    setIsLoggedIn,
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
    createUser,
    convertToFormData,
  } = useData();
  const navigation = useNavigation();

  const handleSignup = async () => {
    const formprops = {
      user: {
        username: fullName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      },
    };
    setIsLoading(true);
    const result = await createUser(formprops);
    if (result === "success") {
      console.log("Signup successful");
      setIsLoading(false);
      setIsLoggedIn(true);
      navigation.navigate("Bot");
    } else {
      console.log("Signup failed");
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Animation for loading spinner
  const spinValue = new Animated.Value(0);
  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
          source={require("../assets/neat.jpg")} // Add your custom health-themed background image
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StatusBar barStyle="light-content" backgroundColor="white" />
          <SafeAreaView className="flex-1 justify-center items-center bg-opacity-40">
            <View className="w-11/12 max-w-md p-6 bg-white rounded-lg shadow-xl">
              <View className="gap-4">
                {/* Full Name Input */}
                <View>
                  <TextInput
                    className="text-black border-b border-gray-500 px-2 py-3 text-lg"
                    placeholder="Full Name"
                    placeholderTextColor="#cfe6ed"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

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

                {/* Confirm Password Input */}
                <View>
                  <TextInput
                    className="text-black border-b border-gray-500 px-2 py-3 text-lg"
                    placeholder="Confirm Password"
                    placeholderTextColor="#cfe6ed"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>

                {/* Signup Button */}
                <TouchableOpacity
                  onPress={handleSignup}
                  disabled={isLoading}
                  className={`mt-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 ${
                    isLoading ? "opacity-70" : ""
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                  }}
                >
                  <Text className="text-white text-xl font-semibold text-center">
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Text>
                </TouchableOpacity>

                {/* Sign in link */}
                <TouchableOpacity onPress={handleLogin} className="mt-4">
                  <Text className="text-teal-500 text-center">
                    Already have an account? Sign in
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
