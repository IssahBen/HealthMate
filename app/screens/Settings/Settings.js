/* eslint-disable react/prop-types */
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronRight,
  User,
  Settings,
  CreditCard,
  Shield,
  Moon,
  CircleHelp as HelpCircle,
} from "lucide-react-native";
import { useData } from "../../context/DataContext";
import PropTypes from "prop-types";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const {
    setIsLoggedIn,
    setEmail,
    setFullName,
    setPassword,
    destroySession,
    theme,
    toggleTheme,
  } = useData();

  const onPress = async () => {
    const result = await destroySession();
    if (result === "success") {
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
      className="flex-row items-center px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
      onPress={onPress}
    >
      <View className="w-8">{icon}</View>
      <Text className="flex-1 ml-3 text-base font-inter-regular text-gray-800 dark:text-gray-100">
        {title}
      </Text>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: "#d1d5db", true: "#0ea5e9" }}
        />
      ) : (
        <ChevronRight
          size={20}
          color={theme === "dark" ? "#94a3b8" : "#94a3b8"}
        />
      )}
    </TouchableOpacity>
  );

  SettingItem.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    value: PropTypes.bool,
    isSwitch: PropTypes.bool,
  };

  const SettingSection = ({ title, children }) => (
    <View className="mb-6">
      <Text className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 font-inter-medium bg-gray-50 dark:bg-gray-950">
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView>
        <View className="px-4 pt-6 pb-4">
          <Text className="text-2xl font-inter-bold text-gray-900 dark:text-white">
            Settings
          </Text>
        </View>

        <SettingSection title="PROFILE">
          <SettingItem
            icon={<User size={20} color="#0ea5e9" />}
            title="Profile Settings"
            onPress={() => navigation.navigate("Profile")}
          />
          <SettingItem
            icon={<Settings size={20} color="#0ea5e9" />}
            title="Account Settings"
            onPress={() => navigation.navigate("Account")}
          />
          <SettingItem
            icon={<CreditCard size={20} color="#0ea5e9" />}
            title="Purchases"
            onPress={() => navigation.navigate("Purchases")}
          />
        </SettingSection>

        <SettingSection title="SECURITY">
          <SettingItem
            icon={<Shield size={20} color="#0ea5e9" />}
            title="Privacy Settings"
            onPress={() => navigation.navigate("Privacy")}
          />
        </SettingSection>

        <SettingSection title="SUPPORT">
          <SettingItem
            icon={<HelpCircle size={20} color="#0ea5e9" />}
            title="Help & Support"
            onPress={() => Alert.alert("Help & Support coming soon!")}
          />
        </SettingSection>

        <TouchableOpacity
          className="mx-4 mt-6 mb-8 py-3 rounded-lg bg-red-500"
          onPress={onPress}
        >
          <Text className="text-center text-white font-inter-medium dark:text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
