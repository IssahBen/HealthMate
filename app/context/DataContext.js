/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import React from "react";
import { useColorScheme } from "react-native";
const DataContext = createContext();

export function DataProvider({ children }) {
  const systemTheme = useColorScheme();
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
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [bio, setBio] = useState("");
  const [number, setNumber] = useState("");
  const [info, setInfo] = useState("");
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [theme, setTheme] = useState(systemTheme);
  const [destroyAccount, setDestroyAccount] = useState(false);
  const [balance, setBalance] = useState("100");

  useEffect(() => {
    async function Setter() {
      const token = await SecureStore.getItemAsync("token");
      const userObjStr = await SecureStore.getItemAsync("user");

      if (token && userObjStr) {
        const userObj = JSON.parse(userObjStr);
        setToken(token);
        setEmail(userObj.email);
        setIsLoggedIn(true);
        setFullName(userObj.first_name);
      }
    }
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Enable notifications to receive reminders");
      }
    };
    (async () => {
      const storedTheme = await SecureStore.getItemAsync("appTheme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const colorScheme = Appearance.getColorScheme();
        setTheme(colorScheme || "light");
      }
    })();
    setTheme(systemTheme);
    setupNotifications();
    Setter();
  }, []);
  const toggleTheme = async () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    await SecureStore.setItemAsync("appTheme", newTheme);
  };
  async function createUser(obj) {
    try {
      setIsLoading(true);

      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/register",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.token) {
        await SecureStore.setItemAsync("user", JSON.stringify(data.user));
        await SecureStore.setItemAsync("token", data.token);
        setIsLoggedIn(true);
        setFullName(data.user.username);
        setEmail(data.user.email);
        setToken(data.token);
        setBio(data.user.bio);
        setNumber(data.user.number);
        return "success";
      } else {
        setErrorMessage(data.errors.join("||"));
        setVisible(true);
        console.log("error");
        return "error";
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage("Network or server error. Please try again later.");
      setVisible(true);
      return "error";
    } finally {
      setIsLoading(false);
    }
  }

  async function destroySession() {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/logout",
        {
          method: "DELETE",
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
        await SecureStore.setItemAsync("token", "");
        setToken("");
        setEmail("");
        return "success";
      }
    } catch (error) {
      console.log("There was an error.", error);
      return "error";
    }
  }

  async function destroyUser() {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/destroy_account",
        {
          method: "DELETE",
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
        await SecureStore.setItemAsync("token", "");
        setToken("");
        setEmail("");
        setBalance("0");
        setFullName("");
        return "success";
      }
    } catch (error) {
      console.log("There was an error.", error);
      return "error";
    }
  }
  async function Login(obj) {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/login",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.token) {
        await SecureStore.setItemAsync("user", JSON.stringify(data.user));
        await SecureStore.setItemAsync("token", data.token);

        setEmail(data.user.email);
        setToken(data.token);
        setFullName(data.user.username);
        setBio(data.user.bio);
        setNumber(data.user.number);
        setBalance(data.user.balance);
        return "success";
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
        setVisible(true);
        console.log("Login failed:", data);
        return "error";
      }
    } catch (error) {
      console.error("Network or server error:", error);
      setErrorMessage("Network or server error. Please try again later.");
      setVisible(true);

      return "error";
    } finally {
      setIsLoading(false);
    }
  }

  async function ProfileUpdate(obj) {
    console.log("Profile update initiated", obj);
    try {
      const res = await fetch(
        "https://c009-99-230-98-234.ngrok-free.app/api/v1/update_profile",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": token,
            "X-User-Email": email,
          },
        }
      );
      const data = await res.json();
      if (data.user) {
        const userObj = data.user;
        await SecureStore.setItemAsync("user", JSON.stringify(userObj));
        setEmail(userObj.email);
        setFullName(userObj.fullName);
        setBio(userObj.bio);
        setNumber(userObj.number);
        return "success";
      } else {
        setErrorMessage(data.errors.join("||"));
        setVisible(true);
        console.log("error");
        return "error";
      }
    } catch (error) {
      setErrorMessage("Network or server error. Please try again later.");
      setVisible(true);
      console.log("There was an error.", error);
      return "error";
    }
  }
  async function PasswordUpdate(obj) {
    console.log("Password update initiated", obj);
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/update_password",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": token,
            "X-User-Email": email,
          },
        }
      );
      const data = await res.json();
      if (data.message) {
        return "success";
      } else {
        setErrorMessage(data.errors.join("||"));
        setVisible(true);
        console.log("error");
        return "error";
      }
    } catch (error) {
      setErrorMessage("Network or server error. Please try again later.");
      setVisible(true);
      console.log("There was an error.", error);
      return "error";
    }
  }
  async function call(obj) {
    try {
      console.log(5);
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/call",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": token,
            "X-User-Email": email,
          },
        }
      );
      const data = await res.json();
      if (data.message) {
        return data.message;
      } else {
        setErrorMessage(data.error);
        setVisible(true);
        console.log("error");
        return "error";
      }
    } catch (error) {
      setErrorMessage("Network or server error. Please try again later.");
      setVisible(true);
      console.log("There was an error.", error);
      return "error";
    }
  }
  function convertToFormData(data) {
    const formData = new FormData();

    const appendToFormData = (obj, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        const formKey = prefix ? `${prefix}[${key}]` : key;

        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        ) {
          appendToFormData(value, formKey);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            appendToFormData(item, `${formKey}[${index}]`);
          });
        } else {
          formData.append(formKey, value);
        }
      });
    };

    appendToFormData(data);
    return formData;
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
    convertToFormData,
    show,
    setShow,
    errorMessage,
    setErrorMessage,
    visible,
    setVisible,
    bio,
    setBio,
    number,
    setNumber,
    ProfileUpdate,
    info,
    setInfoVisible,
    infoVisible,
    setInfo,
    infoShow,
    setInfoShow,
    PasswordUpdate,
    theme,
    toggleTheme,
    destroyAccount,
    setDestroyAccount,
    destroyUser,
    balance,
    setBalance,

    call,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
