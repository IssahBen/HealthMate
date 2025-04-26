import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BookOpen } from "lucide-react-native";

import SearchBar from "../../components/Nutirent/SearchBar";
import NutrientCard from "../../components/Nutirent/NutrientCard";
import FilterOptions from "../../components/Nutirent/FilterOptions";
import RecentSearches from "../../components/Nutirent/RecentSearches";

import { nutrients } from "../../data/nutrients";

const NutrientDatabase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNutrients, setFilteredNutrients] = useState(nutrients);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let results = nutrients;

    if (searchQuery.trim() !== "") {
      results = results.filter((nutrient) =>
        nutrient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      results = results.filter(
        (nutrient) => nutrient.category === selectedCategory
      );
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      setFilteredNutrients(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() !== "" && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero Section */}
        <View className="bg-emerald-600 px-6 pt-16 pb-10 rounded-b-3xl shadow-lg">
          <View className="items-center mb-4">
            <BookOpen size={48} color="white" />
          </View>
          <Text className="text-3xl font-inter-bold text-white text-center mb-2">
            Nutrient Database
          </Text>
          <Text className="text-emerald-100 text-center mb-6 leading-relaxed">
            Discover essential nutrients, their benefits, food sources, and
            recommended daily intake. Search below to learn more.
          </Text>

          <SearchBar onSearch={handleSearch} />
          <RecentSearches
            searches={recentSearches}
            onSearchSelect={handleSearch}
            onClear={clearRecentSearches}
          />
        </View>

        {/* Filters & Results */}
        <View className="px-4 py-8">
          <FilterOptions
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {isSearching ? (
            <View className="items-center justify-center h-64">
              <ActivityIndicator size="large" color="#10B981" />
            </View>
          ) : filteredNutrients.length > 0 ? (
            <View className="flex flex-wrap justify-between gap-4 mt-4">
              {filteredNutrients.map((nutrient) => (
                <NutrientCard key={nutrient.id} nutrient={nutrient} />
              ))}
            </View>
          ) : (
            <View className="py-20 items-center">
              <Text className="text-xl font-inter-semibold text-gray-700 mb-2">
                No nutrients found
              </Text>
              <Text className="text-gray-500 text-center max-w-sm">
                Try adjusting your search or filter criteria to explore other
                nutrients.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NutrientDatabase;
