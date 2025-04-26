import React from "react";
import { View, Text } from "react-native";
import { Clock } from "lucide-react-native";

const Header = () => {
  return (
    <View className="bg-white shadow-sm py-4 mb-6">
      <View className="px-4 flex-row items-center gap-2">
        <Clock size={32} color="#3B82F6" className="mr-3" />
        <Text className="text-2xl font-bold text-gray-800 font-inter-medium">
          Goal Tracker
        </Text>
      </View>
    </View>
  );
};

export default Header;
