import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
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
  const [token, setToken] = useState("");
  useEffect(async function () {
    const token = await SecureStore.getItemAsync("token");
    const userObj = await SecureStore.getItemAsync("user");
    if (token && user) {
      setToken(token);
      setEmail(userObj.email);
      setIsLoggedIn(true);
      setFullName(userObj.first_name);
    }
  }, []);
  async function createUser(obj) {
    try {
      setIsLoading(true);

      const res = await fetch(
        `
https://wevotepushapi-0e45561659e2.herokuapp.com
/api/v1/signup`,
        {
          method: "Post",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.token) {
        SecureStore.setItemAsync("user", JSON.stringify(data.user));
        SecureStore.setItemAsync("token", data.token);
        setIsLoggedIn(true);

        setFullName(data.user.first_name);
        setEmail(data.user.email);
        setToken(data.token);
        return "success";
      } else {
        console.log("error");
        return "error";
      }
    } catch (error) {
      console.log("error");
      return "error";
    } finally {
      setIsLoading(false);
    }
  }
  async function destroySession() {
    try {
      const res = await fetch(
        `
https://wevotepushapi-0e45561659e2.herokuapp.com
/api/v1/logout`,
        {
          method: "delete",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": token,
            "X-User-Email": email,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return "error";
      }
      if (data.message) {
        setIsLoggedIn(false);
        return "success";
      }
    } catch {
      console.log("There was an error.");
    } finally {
    }
  }
  async function Login(obj) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `
https://wevotepushapi-0e45561659e2.herokuapp.com
/api/v1/login`,
        {
          method: "Post",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.token) {
        SecureStore.setItemAsync("user", JSON.stringify(data.user));
        SecureStore.setItemAsync("token", data.token);
        setIsLoggedIn(true);

        SecureStore.setItemAsync("ballotId", data.ballotId);

        setEmail(data.user.email);
        setToken(data.token);

        return "success";
      } else {
        console.log("error");
        return "error";
      }
    } catch (error) {
      console.log("Server Offline");
      return "error";
    } finally {
      setIsLoading(false);
    }
  }
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
    Login,
    createUser,
    destroySession,
    setConfirmPassword,
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
