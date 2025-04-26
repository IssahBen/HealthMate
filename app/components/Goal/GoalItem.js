/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Trash2, RefreshCw } from "lucide-react-native";
import ProgressBar from "./ProgessBar";
import BoxGrid from "./BoxGrid";
import { calculateProgress, formatDate } from "../../context/generatedId";

const GoalItem = ({ goal, isActive, onSelect, onReset, onDelete }) => {
  const { id, title, totalHours, hoursPerDay, progress, createdAt } = goal;
  // eslint-disable-next-line no-unused-vars
  const percentage = calculateProgress(progress);
  const completedHours = progress.filter((p) => p).length;

  const handleReset = () => {
    onReset();
  };

  const handleDelete = () => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <Pressable
      onPress={onSelect}
      className={`bg-white rounded-xl shadow-md p-5 mb-5 ${
        isActive ? "border-l-4 border-blue-500 shadow-lg" : "hover:shadow-lg"
      }`}
    >
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-lg font-inter-semibold text-gray-800">
            {title}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Created on {formatDate(createdAt)}
          </Text>
        </View>

        <View className="flex-row space-x-2">
          <Pressable
            onPress={handleReset}
            className="p-2 rounded-full hover:bg-gray-100"
            accessibilityLabel="Reset progress"
          >
            <RefreshCw size={20} color="gray" />
          </Pressable>
          <Pressable
            onPress={handleDelete}
            className="p-2 rounded-full hover:bg-gray-100"
            accessibilityLabel="Delete goal"
          >
            <Trash2 size={20} color="gray" />
          </Pressable>
        </View>
      </View>

      <View className="mt-3 flex flex-col md:flex-row gap-2">
        <View className="bg-gray-50 p-2 rounded-md items-center">
          <Text className="text-xs text-gray-500">Total Hours</Text>
          <Text className="text-lg font-inter-semibold">{totalHours}</Text>
        </View>
        <View className="bg-gray-50 p-2 rounded-md items-center">
          <Text className="text-xs text-gray-500">Hours Per Day</Text>
          <Text className="text-lg font-inter-semibold">{hoursPerDay}</Text>
        </View>
        <View className="bg-gray-50 p-2 rounded-md items-center">
          <Text className="text-xs text-gray-500">Completed</Text>
          <Text className="text-lg font-inter-semibold">
            {completedHours}/{totalHours}
          </Text>
        </View>
      </View>

      <ProgressBar progress={progress} />

      {isActive && (
        <BoxGrid goalId={id} progress={progress} hoursPerDay={hoursPerDay} />
      )}
    </Pressable>
  );
};

export default GoalItem;
