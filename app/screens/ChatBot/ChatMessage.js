import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import React from "react";

// eslint-disable-next-line react/prop-types
export default function ChatMessage({ message, isBot, timestamp }) {
  return (
    <Animated.View
      entering={FadeInUp}
      className={`flex-row mx-4 my-2 max-w-[80%] ${
        isBot ? "self-start" : "self-end"
      }`}
    >
      {isBot && (
        <View className="w-8 h-8 rounded-full bg-rose-600 justify-center items-center mr-2">
          <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
        </View>
      )}

      <View
        className={`rounded-2xl px-4 py-3 shadow-md ${
          isBot ? "bg-slate-800" : "bg-rose-600"
        }`}
      >
        <Text
          className={`text-base leading-5 ${
            isBot ? "text-slate-100" : "text-white"
          }`}
        >
          {message}
        </Text>
        <Text className="text-xs text-slate-400 mt-1 self-end">
          {timestamp}
        </Text>
      </View>
    </Animated.View>
  );
}
