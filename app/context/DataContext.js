import { createContext, useContext } from "react";
import { useState } from "react";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isQuitting, setIsQuitting] = useState(false);
  const value = {
    messages,
    setMessages,
    isLoggedIn,
    setIsLoggedIn,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    fullName,
    setFullName,
    confirmPassword,
    isQuitting,
    setIsQuitting,
  }; // Your actual context values

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
