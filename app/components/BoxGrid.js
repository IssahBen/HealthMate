import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useGoal } from "../context/GoalContext";

const BoxGrid = ({ goalId, progress, hoursPerDay }) => {
  const { updateGoalProgress } = useGoal();

  const handleBoxClick = (index) => {
    updateGoalProgress(goalId, index);
  };

  const days = [];
  for (let i = 0; i < progress.length; i += hoursPerDay) {
    days.push(progress.slice(i, i + hoursPerDay));
  }

  return (
    <View className="mt-4 space-y-3">
      {days.map((day, dayIndex) => (
        <View key={dayIndex} className="flex-row items-center">
          <Text className="mr-3 w-14 text-sm text-gray-500">
            Day {dayIndex + 1}:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {day.map((isCompleted, hourIndex) => {
              const absoluteIndex = dayIndex * hoursPerDay + hourIndex;

              return (
                <TouchableOpacity
                  key={hourIndex}
                  onPress={() => handleBoxClick(absoluteIndex)}
                  className={`w-6 h-6 border rounded-md duration-200 ${
                    isCompleted
                      ? "bg-green-500 border-green-600"
                      : "bg-white border-gray-300"
                  }`}
                  accessibilityLabel={
                    isCompleted ? "Completed hour" : "Incomplete hour"
                  }
                />
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

export default BoxGrid;
