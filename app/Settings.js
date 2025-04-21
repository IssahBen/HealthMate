import React from "react"; // Must be at the top
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronRight,
  User,
  Settings,
  CreditCard,
  Bell,
  Shield,
  Moon,
  CircleHelp as HelpCircle,
  LogOut,
} from "lucide-react-native";
import { useData } from "./context/DataContext";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const {
    setIsQuitting,
    setIsLoggedIn,
    setEmail,
    setFullName,
    setPassword,
    destroySession,
  } = useData();
  const onPress = async () => {
    const result = await destroySession();
    if (result === "success") {
      setIsQuitting(true);
      setIsLoggedIn(false);
      setEmail("");
      setFullName("");
      setPassword("");
      navigation.navigate("Home");
    } else {
      console.log("Logout failed");
    }
  };
  const SettingItem = ({ icon, title, onPress, value, isSwitch }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100"
      onPress={onPress}
    >
      <View className="w-8">{icon}</View>
      <Text
        className="flex-1 ml-3 text-base text-gray-800"
        style={{ fontFamily: "Inter-Regular" }}
      >
        {title}
      </Text>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: "#d1d5db", true: "#0ea5e9" }}
        />
      ) : (
        <ChevronRight size={20} color="#94a3b8" />
      )}
    </TouchableOpacity>
  );

  const SettingSection = ({ title, children }) => (
    <View className="mb-6">
      <Text
        className="px-4 py-2 text-sm text-gray-500 bg-gray-50"
        style={{ fontFamily: "Inter-Medium" }}
      >
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="px-4 pt-6 pb-4">
          <Text
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Inter-Bold" }}
          >
            Settings
          </Text>
        </View>

        <SettingSection title="PROFILE">
          <SettingItem
            icon={<User size={20} color="#0ea5e9" />}
            title="Profile Settings"
            onPress={() => navigation.navigate("profile")}
          />
          <SettingItem
            icon={<Settings size={20} color="#0ea5e9" />}
            title="Account Settings"
            onPress={() => navigation.navigate("account")}
          />
          <SettingItem
            icon={<CreditCard size={20} color="#0ea5e9" />}
            title="Purchases"
            onPress={() => navigation.navigate("purchases")}
          />
        </SettingSection>

        <SettingSection title="PREFERENCES">
          <SettingItem
            icon={<Bell size={20} color="#0ea5e9" />}
            title="Notifications"
            value={notifications}
            isSwitch={true}
            onPress={() => setNotifications(!notifications)}
          />
          <SettingItem
            icon={<Moon size={20} color="#0ea5e9" />}
            title="Dark Mode"
            value={isDarkMode}
            isSwitch={true}
            onPress={() => setIsDarkMode(!isDarkMode)}
          />
        </SettingSection>

        <SettingSection title="SECURITY">
          <SettingItem
            icon={<Shield size={20} color="#0ea5e9" />}
            title="Privacy Settings"
            onPress={() => {}}
          />
        </SettingSection>

        <SettingSection title="SUPPORT">
          <SettingItem
            icon={<HelpCircle size={20} color="#0ea5e9" />}
            title="Help & Support"
            onPress={() => {}}
          />
        </SettingSection>

        <TouchableOpacity
          className="mx-4 mt-6 mb-8 py-3 rounded-lg bg-red-500"
          onPress={onPress}
        >
          <Text
            className="text-center text-white font-medium"
            style={{ fontFamily: "Inter-Medium" }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
