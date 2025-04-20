import { DataProvider } from "./context/DataContext";
import { useState } from "react";
import ChatBot from "./Chatbot";
import Login from "./Login";
import Tabs from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications"; // 👈 Add this
import "../global.css";

// 👇 Set notification handler at the top level (outside the component)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </DataProvider>
  );
}
