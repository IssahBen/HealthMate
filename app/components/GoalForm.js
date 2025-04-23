import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useGoal } from "../context/GoalContext";

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
      className="bg-white rounded-2xl shadow p-6 mb-6"
    >
      <Text className="text-xl font-semibold text-gray-800 mb-4">
        Create New Goal
      </Text>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">
          Goal Title
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Learn React, Complete Project, etc."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </View>

      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Total Hours Needed
          </Text>
          <TextInput
            value={String(totalHours)}
            onChangeText={(text) => setTotalHours(parseInt(text) || 0)}
            keyboardType="numeric"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            Hours Per Day
          </Text>
          <TextInput
            value={String(hoursPerDay)}
            onChangeText={(text) => setHoursPerDay(parseInt(text) || 0)}
            keyboardType="numeric"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </View>
      </View>

      {error && (
        <View className="mb-4 p-2 bg-red-100 rounded-md">
          <Text className="text-red-500 text-sm">{error}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-md bg-blue-500 ${
          isSubmitting ? "opacity-70" : "active:scale-95"
        }`}
      >
        <Text className="text-white font-medium text-center">
          {isSubmitting ? "Creating..." : "Create Goal"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default GoalForm;
