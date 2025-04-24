import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import React from "react";
// eslint-disable-next-line react/prop-types
export default function ChatMessage({ message, isBot, timestamp }) {
  return (
    <Animated.View
      entering={FadeInUp}
      className={`flex-row mx-4 my-1 max-w-[80%] ${
        isBot ? "self-start" : "self-end"
      }`}
    >
      {isBot && (
        <View className="w-8 h-8 rounded-full bg-indigo-500 justify-center items-center mr-2">
          <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
        </View>
      )}
      <View
        className={`rounded-2xl p-3 ${isBot ? "bg-gray-100" : "bg-indigo-500"}`}
      >
        <Text
          className={`text-base leading-5 ${
            isBot ? "text-gray-800" : "text-white"
          }`}
        >
          {message}
        </Text>
        <Text className="text-xs text-gray-500 mt-1 self-end">{timestamp}</Text>
      </View>
    </Animated.View>
  );
}
