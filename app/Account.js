import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Lock, Mail, Bell, Globe } from "lucide-react-native";
import { useState } from "react";
import InfoMessage from "./context/InfoMessage";
import { useData } from "./context/DataContext";
import { clearAllReminders } from "./components/ReminderManager";
export default function AccountSettings() {
  const navigation = useNavigation();

  const [pushNotifications, setPushNotifications] = useState(true);
  const {
    setInfo,
    setInfoVisible,
    destroyAccount,
    setDestroyAccount,
    setIsLoading,
    setIsLoggedIn,
    deleteAllGoals,
    destroyUser,
  } = useData();
  //   const handleInfo = () => {
  // console.log("Feature coming soon");
  // setInfo("Feature coming soon");
  // setInfoVisible(true);
  //   };
  const handleDestroy = async () => {
    setIsLoading(true);
    setDestroyAccount(true);
    await clearAllReminders();
    const result = await destroyUser();

    if (result === "success") {
      setIsLoggedIn(false);
      setIsLoading(false);
      navigation.navigate("Home");
    } else {
      setIsLoading(false);
      console.log("destroy failed");
    }
  };
  const SettingItem = ({
    icon,
    title,
    description,
    onPress,
    value,
    isSwitch,
  }) => (
    <View className="px-4 py-4 bg-white border-b border-gray-100">
      <View className="flex-row items-center">
        <View className="w-8">{icon}</View>
        <View className="flex-1 ml-3">
          <Text
            className="text-base text-gray-800"
            style={{ fontFamily: "Inter-Medium" }}
          >
            {title}
          </Text>
          <Text
            className="text-sm text-gray-500 mt-1"
            style={{ fontFamily: "Inter-Regular" }}
          >
            {description}
          </Text>
        </View>
        {isSwitch ? (
          <Switch
            value={value}
            onValueChange={onPress}
            trackColor={{ false: "#d1d5db", true: "#0ea5e9" }}
          />
        ) : (
          <TouchableOpacity
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onPress={onPress}
          >
            <Text
              className="text-sm text-gray-600"
              style={{ fontFamily: "Inter-Medium" }}
            >
              Change
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 relative bg-gray-50">
      <View className="flex-row relative items-center px-4 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text
          className="ml-4 text-xl font-semibold text-gray-900"
          style={{ fontFamily: "Inter-Medium" }}
        >
          Account Settings
        </Text>
      </View>

      <ScrollView>
        <View className="py-4 relative">
          <Text
            className="px-4 pb-2 text-sm text-gray-500"
            style={{ fontFamily: "Inter-Medium" }}
          >
            SECURITY
          </Text>
          <SettingItem
            icon={<Lock size={20} color="#0ea5e9" />}
            title="Password"
            description="Change your password"
            onPress={() => navigation.navigate("ChangePassword")}
          />
        </View>

        <View className="py-4">
          <Text
            className="px-4 pb-2 text-sm text-gray-500"
            style={{ fontFamily: "Inter-Medium" }}
          >
            NOTIFICATIONS
          </Text>
          <SettingItem
            icon={<Bell size={20} color="#0ea5e9" />}
            title="Push Notifications"
            description="Receive updates on your device"
            value={pushNotifications}
            isSwitch={true}
            onPress={() => setPushNotifications(!pushNotifications)}
          />
        </View>

        <TouchableOpacity
          className="mx-4 mt-6 mb-8 py-3 bg-red-500 rounded-lg"
          onPress={handleDestroy}
        >
          <Text
            className="text-center text-white font-medium"
            style={{ fontFamily: "Inter-Medium" }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
