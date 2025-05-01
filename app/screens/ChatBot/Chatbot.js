import React, { useRef, useState } from "react";
import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useData } from "../../context/DataContext";
import { StatusBar } from "expo-status-bar";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Publisher_Key } from "@env";

export default function ChatBot() {
  const { messages, setMessages, call } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const handleSend = async (message) => {
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setIsLoading(true);

    setMessages((prev) => [...prev, userMessage]);
    const message_from_bot = await call({ message: { text: message } });

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: message_from_bot,
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setIsLoading(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <StripeProvider publishableKey={Publisher_Key}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        <SafeAreaView className="flex-1 relative">
          {/* Header */}
          <View className="items-center justify-center mt-4 z-10">
            <View className="bg-white px-8 py-3 rounded-full shadow-sm border border-gray-100 relative">
              <Text className="text-gray-800 text-2xl font-light tracking-widest">
                ELIXIR
              </Text>
              {/* Replaced gradient line with simple border */}
              <View className="absolute -bottom-0.5 w-full h-px bg-gray-200" />
            </View>
          </View>

          {/* Message area */}
          <View className="flex-1 pt-4">
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                flexGrow: 1,
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
              {isLoading && (
                <View className="flex-row items-center px-4">
                  <ActivityIndicator size="small" color="#22c55e" />
                  <Text className="ml-2 text-gray-300 italic">thinking...</Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Input area */}
          <View className="bg-white border-t border-gray-100 px-4 pt-4 pb-6 shadow-lg">
            <ChatInput onSend={handleSend} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </StripeProvider>
  );
}
