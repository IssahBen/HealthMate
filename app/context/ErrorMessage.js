import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useData } from "./DataContext";
export default function ErrorMessage({ duration = 3000 }) {
  const { show, setShow, errorMessage, visible, setVisible } = useData();
  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <View className="absolute top-12 left-4 right-4 z-50 bg-red-100 border border-red-400 px-4 py-3 rounded-lg shadow-lg">
      <Text className="text-red-700 font-semibold text-base">
        ⚠️ Error: {errorMessage}
      </Text>
    </View>
  );
}
