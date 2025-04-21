import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useData } from "./DataContext";

export default function InfoMessage({ duration = 3000 }) {
  const { infoshow, setInfoShow, info, infoVisible, setInfoVisible } =
    useData();

  useEffect(() => {
    if (true) {
      console.log("InfoMessage: infoVisible is true");
      setInfoShow(true);
      const timer = setTimeout(() => {
        setInfoShow(false);
        setInfoVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [infoVisible]);

  if (!infoshow) return null;

  return (
    <View className="absolute top-12 left-4 right-4 z-50 bg-red-100 border border-red-400 px-4 py-3 rounded-lg shadow-lg">
      <Text className="text-red-700 font-semibold text-base">{info}</Text>
    </View>
  );
}
