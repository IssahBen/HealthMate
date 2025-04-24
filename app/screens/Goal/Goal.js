import React from "react";
import { View, Text, ScrollView } from "react-native";
import { GoalProvider } from "../../context/GoalContext";
import Header from "../../components/Goal/Header";
import GoalForm from "../../components/GoalForm";
import GoalList from "../../components/Goal/GoalList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Goal() {
  return (
    <GoalProvider>
      <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
        <View className="flex-1 bg-gray-50">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Header />

            <View className="px-4 py-6 w-full max-w-4xl self-center">
              <GoalForm />
              <GoalList />
            </View>

            <View className="mt-12 py-6 border-t border-gray-200 items-center">
              <Text className="text-gray-500 text-sm text-center">
                © {new Date().getFullYear()} PUSH - Track your progress one hour
                at a time
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GoalProvider>
  );
}
