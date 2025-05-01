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
      className="px-4 pb-6 pt-4 bg-white border-t border-gray-100 shadow-lg"
    >
      <View className="flex-row items-end bg-white p-2 rounded-xl shadow-sm border border-gray-100">
        <TextInput
          className="flex-1 text-base text-gray-800 px-4 py-3 rounded-xl bg-gray-50"
          value={message}
          onChangeText={setMessage}
          placeholder="Ask me anything..."
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
          style={{
            fontFamily: "Inter-Regular",
            maxHeight: 120,
          }}
        />
        <TouchableOpacity
          className={`ml-3 w-12 h-12 rounded-full justify-center items-center ${
            message.trim() ? "bg-gray-800 shadow-md" : "bg-gray-200"
          }`}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons
            name="send"
            size={22}
            color={message.trim() ? "#fff" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
