import React from "react";
import { View, Text } from "react-native";
import { useGoal } from "../../context/GoalContext";
import GoalItem from "./GoalItem";
import { Clock } from "lucide-react-native";

const GoalList = () => {
  const { goals, activeGoal, setActiveGoal, resetGoal, deleteGoal } = useGoal();

  if (goals.length === 0) {
    return (
      <View className="bg-white rounded-xl shadow-md p-8 items-center justify-center">
        <Clock size={48} className="text-gray-400 mb-3" />
        <Text className="text-xl font-inter-semibold text-gray-700 mb-2">
          No Goals Yet
        </Text>
        <Text className="text-gray-500 text-center">
          Create your first goal by filling out the form above.
        </Text>
      </View>
    );
  }

  return (
    <View className="space-y-4">
      <Text className="text-xl font-inter-semibold text-gray-800 mb-4">
        Your Goals
      </Text>

      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          isActive={activeGoal?.id === goal.id}
          onSelect={() => setActiveGoal(goal)}
          onReset={() => resetGoal(goal.id)}
          onDelete={() => deleteGoal(goal.id)}
        />
      ))}
    </View>
  );
};

export default GoalList;
