import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import uuid from "react-native-uuid";
import { saveReminder } from "../../Shared/ReminderManager";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReminderForm = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
  };

  const scheduleReminder = async () => {
    if (!title.trim()) return;

    // Create proper future datetime from selected time
    const now = new Date();
    const scheduledDate = new Date(now);
    scheduledDate.setHours(time.getHours());
    scheduledDate.setMinutes(time.getMinutes());
    scheduledDate.setSeconds(0);

    // If the selected time is earlier today, schedule for tomorrow
    if (scheduledDate <= now) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "iCare Reminder",
        body: title,
        sound: "default",
      },
      trigger: scheduledDate,
    });

    console.log("Scheduled Notification ID:", notificationId);

    const id = uuid.v4();
    await saveReminder({
      id,
      title,
      time: scheduledDate.toLocaleTimeString(), // optionally save full date
      notificationId,
    });

    setTitle("");
    navigation.navigate("ReminderScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6">
        Set a Reminder
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
        onPress={scheduleReminder}
        className="bg-emerald-600 py-4 rounded-full items-center shadow-md active:opacity-80"
      >
        <Text className="text-white text-base font-semibold">
          Save Reminder
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReminderForm;
