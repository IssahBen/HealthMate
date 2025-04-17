import { DataProvider } from "./context/DataContext";
import { useState } from "react";
import ChatBot from "./Chatbot";
import Login from "./Login";
import Tabs from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import "../global.css";
export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </DataProvider>
  );
}
