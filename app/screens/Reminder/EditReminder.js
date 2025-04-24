import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { updateReminder } from "./components/ReminderManager";
import { SafeAreaView } from "react-native-safe-area-context";

const EditReminder = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { reminder } = route.params;

  const [title, setTitle] = useState(reminder.title);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const [hours, minutes] = reminder.time.split(":");
    const updatedDate = new Date();
    updatedDate.setHours(hours);
    updatedDate.setMinutes(minutes);
    setTime(updatedDate);
  }, [reminder]);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
  };

  const handleUpdate = async () => {
    if (!title.trim()) return Alert.alert("Title is required");

    // Cancel previous notification
    await Notifications.cancelScheduledNotificationAsync(
      reminder.notificationId
    );

    // Schedule new notification at a specific future time
    const now = new Date();
    const scheduledDate = new Date(now);
    scheduledDate.setHours(time.getHours());
    scheduledDate.setMinutes(time.getMinutes());
    scheduledDate.setSeconds(0);

    if (scheduledDate <= now) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "iCare Reminder",
        body: title,
        sound: "default",
      },
      trigger: scheduledDate,
    });

    await updateReminder(reminder.id, {
      title,
      time: scheduledDate.toLocaleTimeString(),
      notificationId: newNotificationId,
    });

    navigation.navigate("ReminderScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6">
        Edit Reminder
      </Text>

      {/* Title Input */}
      <View className="mb-5">
        <Text className="text-base font-semibold text-gray-700 mb-1">
          Title
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Drink water"
          className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-white"
        />
      </View>

      {/* Time Picker */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-700 mb-1">Time</Text>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
        >
          <Text className="text-gray-800 text-base">
            {time.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleUpdate}
        className="bg-emerald-600 py-4 rounded-full items-center shadow-md active:opacity-80"
      >
        <Text className="text-white text-base font-semibold">
          Update Reminder
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditReminder;
