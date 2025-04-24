/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";

const TokenDisplay = ({ balance, onAddClick, className = "" }) => {
  return (
    <View
      className={` w-[180px] py-1  px-3 absolute left-0 bg-white rounded-lg shadow-sm  flex-row items-center justify-between ${className}`}
    >
      <View>
        <Text className="text-sm text-gray-500">Balance</Text>
        <Text className="text-2xl font-semibold">${balance}</Text>
      </View>

      <TouchableOpacity
        onPress={onAddClick}
        accessibilityLabel="Add funds"
        className="h-10 w-10 rounded-full bg-blue-500 active:bg-blue-600 text-white items-center justify-center"
      >
        <Plus size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TokenDisplay;
