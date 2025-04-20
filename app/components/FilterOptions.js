import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";

const FilterOptions = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: "all", label: "All Nutrients" },
    { value: "vitamin", label: "Vitamins" },
    { value: "mineral", label: "Minerals" },
    { value: "fatty-acid", label: "Fatty Acids" },
    { value: "amino-acid", label: "Amino Acids" },
    { value: "antioxidant", label: "Antioxidants" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.value;

        return (
          <TouchableOpacity
            key={category.value}
            onPress={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full mr-2 ${
              isSelected ? "bg-emerald-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isSelected ? "text-white" : "text-gray-600"
              }`}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterOptions;
