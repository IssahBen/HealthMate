import React from "react";
import { View, Text } from "react-native";

const TokenItem = ({ token, className = "" }) => {
  const bgColor = token.color || "#8B5CF6";

  return (
    <View
      className={`flex-row items-center justify-between px-3 py-2 rounded-lg ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <Text className="text-white font-medium">{token.name}</Text>
      <Text className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm text-white">
        {token.amount}
      </Text>
    </View>
  );
};

export default TokenItem;
