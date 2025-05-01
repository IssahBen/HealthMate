import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import React from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      className="px-4 pb-4 pt-2 bg-white/90 border-t border-gray-100 shadow-sm rounded-t-2xl"
    >
      <View className="flex-row items-end bg-white/70 backdrop-blur-md p-2 rounded-3xl shadow-md">
        <TextInput
          className="flex-1 text-base text-gray-800 px-4 py-2 rounded-2xl bg-gray-100"
          value={message}
          onChangeText={setMessage}
          placeholder="Ask me anything..."
          placeholderTextColor="#a1a1aa"
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
          style={{
            fontFamily: "Inter-Regular",
          }}
        />
        <TouchableOpacity
          className={`ml-2 w-11 h-11 rounded-full justify-center items-center shadow-md ${
            message.trim()
              ? "bg-gradient-to-br from-rose-500 to-pink-500"
              : "bg-gray-200"
          }`}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={message.trim() ? "#fff" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
