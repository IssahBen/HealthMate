import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import { getReminders, deleteReminder } from "./components/ReminderManager";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyRemindersScreen = () => {
  const [reminders, setReminders] = useState([]);
  const navigation = useNavigation();

  const loadReminders = async () => {
    const data = await getReminders();
    setReminders(data);
  };

  const handleDelete = async (id, notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    await deleteReminder(id);
    loadReminders();
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const renderReminder = ({ item }) => (
    <View className="mb-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-800 mb-1">
        {item.title}
      </Text>
      <Text className="text-sm text-gray-500 mb-4">Time: {item.time}</Text>
      <View className="flex-row space-x-4">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditReminder", { reminder: item })
          }
          className="bg-blue-500 px-4 py-2 rounded-full"
        >
          <Text className="text-white text-sm font-medium">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id, item.notificationId)}
          className="bg-red-500 px-4 py-2 rounded-full"
        >
          <Text className="text-white text-sm font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800">My Reminders</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReminderForm")}
            className="ml-auto bg-emerald-600 px-4 py-2 rounded-full shadow-md active:opacity-80"
          >
            <Text className="text-white text-sm font-semibold">
              Add Reminder
            </Text>
          </TouchableOpacity>
        </View>

        {reminders.length === 0 ? (
          <View className="mt-12 items-center">
            <Text className="text-gray-500 text-base">
              You haven&apos;t added any reminders yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={renderReminder}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyRemindersScreen;
