/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RecentSearches = ({ searches, onSearchSelect, onClear }) => {
  if (searches.length === 0) return null;

  return (
    <View className="mt-4 px-4 w-full max-w-2xl self-center">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-medium text-gray-500">
          Recent Searches
        </Text>
        <TouchableOpacity onPress={onClear}>
          <Text className="text-xs text-gray-500 hover:text-gray-700">
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {searches.map((search, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSearchSelect(search)}
            className="px-3 py-1 bg-gray-100 rounded-full"
          >
            <Text className="text-xs text-gray-700">{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RecentSearches;
