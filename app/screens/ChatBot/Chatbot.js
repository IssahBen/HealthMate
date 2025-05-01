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
import Purchase from "../../components/TokenDisplay/Purchase";
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
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-[#0d1b16]" // dark green background
      >
        <SafeAreaView className="flex-1 relative">
          {/* Header */}
          <View className="items-center justify-center mt-2 z-10">
            <View className="bg-[#122d24] px-6 py-2 rounded-2xl shadow-lg border border-green-500">
              <Text className="text-green-400 text-3xl font-extrabold tracking-widest">
                ELIXIR
              </Text>
            </View>
          </View>

          {/* Message area */}
          <View className="flex-1 pt-2">
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{
                paddingVertical: 12,
                paddingHorizontal: 8,
                gap: 12,
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
                  <ActivityIndicator size="small" color="#22c55e" />{" "}
                  {/* green-500 */}
                  <Text className="ml-2 text-gray-300 italic">
                    Bot is thinking...
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Input area */}
          <View className="bg-[#122d24] border-t border-green-800 px-2 pt-2 pb-3 rounded-t-3xl shadow-xl">
            <ChatInput onSend={handleSend} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </StripeProvider>
  );
}
