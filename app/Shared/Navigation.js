import Login from "../screens/Home/Login";
import Signup from "../screens/Home/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useData } from "../context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import ChatBot from "../screens/ChatBot/Chatbot";
import Home from "../screens/Home/Home";
import NutrientDatabase from "../screens/NutrientDatabase/NutrientDatabase";
import { useNavigation } from "@react-navigation/native";
import MyRemindersScreen from "../screens/Reminder/ReminderScreen";
import ReminderForm from "../screens/Reminder/ReminderForm";
import EditReminder from "../screens/Reminder/EditReminder";
import SettingsScreen from "../screens/Settings/Settings";
import AccountSettings from "../screens/Settings/Account";
import ProfileSettings from "../screens/Settings/Profile";
import PurchasesScreen from "../screens/Settings/Purchases";
import ChangePasswordScreen from "../screens/Settings/UpdatePassword";
import PrivacySettings from "../screens/Settings/PrivacyPage";
import React from "react";
import Goal from "../screens/Goal/Goal";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function Tabs() {
  const { isLoggedIn } = useData();
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const { setErrorMessage, setVisible } = useData();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      {isLoggedIn ? null : (
        <Tab.Screen
          name="Home"
          component={EntryStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="log-in-outline" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (isLoggedIn) {
                navigation.navigate("Bot");
              } else {
                navigation.navigate("Home");
              }
            },
          })}
        />
      )}

      <>
        <Tab.Screen
          name="Bot"
          component={BotStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="logo-electron" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                navigation.navigate("Home");
                setErrorMessage("Sign in .");
                setVisible(true);
              } else {
                navigation.navigate("Bot");
              }
            },
          })}
        />

        <Tab.Screen
          name="NutrientDatabase"
          component={NutrientDatabase}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="nutrition" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                navigation.navigate("Home");
                setErrorMessage("Sign in ");
                setVisible(true);
              } else {
                navigation.navigate("NutrientDatabase");
              }
            },
          })}
        />
        <Tab.Screen
          name="Reminders"
          component={ReminderStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="alarm" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                navigation.navigate("Home");
                setErrorMessage("Sign in ");
                setVisible(true);
              } else {
                navigation.navigate("Reminders");
              }
            },
          })}
        />
        <Tab.Screen
          name="Goal"
          component={Goal}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="trophy-outline" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                navigation.navigate("Home");
                setErrorMessage("Sign in");
                setVisible(true);
              } else {
                navigation.navigate("Goal");
              }
            },
          })}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={24} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                navigation.navigate("Home");
                setErrorMessage("Sign in");
                setVisible(true);
              } else {
                navigation.navigate("Settings");
              }
            },
          })}
        />
      </>
    </Tab.Navigator>
  );
}

function EntryStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "black", // makes the back arrow white
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "black", // back arrow color
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function BotStack() {
  return (
    <Stack.Navigator initialRouteName="ChatBot">
      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ReminderStack() {
  return (
    <Stack.Navigator initialRouteName="ReminderScreen">
      <Stack.Screen
        name="ReminderScreen"
        component={MyRemindersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReminderForm"
        component={ReminderForm}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="EditReminder" component={EditReminder} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen
        name="Details"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Purchases"
        component={PurchasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacySettings}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Main"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
