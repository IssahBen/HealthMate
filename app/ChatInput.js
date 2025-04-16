import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useData } from "./context/DataContext";

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
      className="p-4 border-t border-gray-200 bg-white"
    >
      <View className="flex-row items-end">
        <TextInput
          className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 mr-2 text-base max-h-24"
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#9ca3af"
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          className={`w-10 h-10 rounded-full justify-center items-center ${
            message.trim() ? "bg-indigo-500" : "bg-gray-200"
          }`}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={message.trim() ? "#ffffff" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
