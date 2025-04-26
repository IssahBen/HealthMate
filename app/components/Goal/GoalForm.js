import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useGoal } from "../../context/GoalContext";

const GoalForm = () => {
  const { addGoal } = useGoal();
  const [title, setTitle] = useState("");
  const [totalHours, setTotalHours] = useState(10);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!title.trim()) {
      setError("Please enter a goal title");
      return;
    }

    if (totalHours <= 0) {
      setError("Total hours must be greater than 0");
      return;
    }

    if (hoursPerDay <= 0 || hoursPerDay > 24) {
      setError("Hours per day must be between 1 and 24");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addGoal(title, totalHours, hoursPerDay);
      setTitle("");
      setTotalHours(10);
      setHoursPerDay(2);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl px-5 py-6 space-y-5 mb-5"
    >
      <Text className="text-2xl font-inter-extrabold text-gray-800 dark:text-white">
        🎯 Create New Goal
      </Text>

      <View className="space-y-1">
        <Text className="text-sm text-gray-600 dark:text-gray-300 font-inter-medium">
          Goal Title
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Learn React Native"
          placeholderTextColor="#9ca3af"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1 space-y-1">
          <Text className="text-sm text-gray-600 dark:text-gray-300 font-inter-medium">
            Total Hours Needed
          </Text>
          <TextInput
            value={String(totalHours)}
            onChangeText={(text) => setTotalHours(parseInt(text) || 0)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9ca3af"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </View>

        <View className="flex-1 space-y-1">
          <Text className="text-sm text-gray-600 dark:text-gray-300 font-inter-medium">
            Hours Per Day
          </Text>
          <TextInput
            value={String(hoursPerDay)}
            onChangeText={(text) => setHoursPerDay(parseInt(text) || 0)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9ca3af"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </View>
      </View>

      {error && (
        <View className="p-3 rounded-xl bg-red-100 dark:bg-red-900">
          <Text className="text-sm text-red-600 dark:text-red-300">
            {error}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 px-4 mb-5 mt-5 rounded-xl transition-all duration-150 ${
          isSubmitting
            ? "bg-blue-400 opacity-70"
            : "bg-blue-500 active:scale-95"
        }`}
      >
        <Text className="text-white font-inter-medium text-center">
          {isSubmitting ? "Creating..." : "Create Goal"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default GoalForm;
