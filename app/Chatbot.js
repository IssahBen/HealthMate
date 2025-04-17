import React, { useState, useRef, useEffect } from "react";
import { ScrollView, Platform, KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { DataProvider, useData } from "./context/DataContext";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Assuming you have a global CSS file for Tailwind CSS
export default function ChatBot() {
  const {
    messages,
    setMessages,
    isQuitting,
    setIsQuitting,
    setIsLoggedIn,
    setEmail,
    setFullName,
    isLoggedIn,
  } = useData();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const onPress = () => {
    setIsQuitting(true);
    setIsLoggedIn(false);
    setEmail("");
    setFullName("");
    navigation.navigate("Home");
  };
  const handleSend = (message) => {
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I am a demo bot, so I can only respond with this message.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <DataProvider>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-50"
      >
        <SafeAreaView className="flex-1 justify-between bg-slate-100 gap-10  relative ">
          <View className="items-center justify-center mt-2 relative  shadow-sm z-10">
            <TouchableOpacity
              onPress={onPress}
              className="flex-row items-center   gap-2 bg-red-500  left-5 top-5 absolute px-2 rounded-xl shadow-md"
            >
              <Ionicons name="log-out-outline" size={15} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 px-4 pt-3 bg-slate-100 ">
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{
                paddingVertical: 16,
                gap: 12,
              }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: true })
              }
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isBot={message.isBot}
                  timestamp={message.timestamp}
                />
              ))}
            </ScrollView>
          </View>

          <View className="border-t border-gray-200 bg-white  shadow-sm px-4 pt-2 ">
            <ChatInput onSend={handleSend} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DataProvider>
  );
}
