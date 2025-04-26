/* eslint-disable react/prop-types */
import React from "react";
import { View, Text, Animated } from "react-native";
import { calculateProgress } from "../../context/generatedId";

const ProgressBar = ({ progress }) => {
  const percentage = calculateProgress(progress);

  const widthAnim = new Animated.Value(0);

  // Animate the width of the progress bar
  React.useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View className="mt-3">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-sm font-medium text-gray-700">Progress</Text>
        <Text className="text-sm font-medium text-gray-700">{percentage}%</Text>
      </View>
      <View className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <Animated.View
          className="bg-green-500 h-2.5 rounded-full"
          style={{
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
