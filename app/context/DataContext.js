import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
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
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

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
    setupNotifications();
    Setter();
  }, []);

  async function createUser(obj) {
    try {
      setIsLoading(true);

      const res = await fetch(
        "https://1e81-99-230-98-234.ngrok-free.app/api/v1/register",
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
        setFullName(data.user.first_name);
        setEmail(data.user.email);
        setToken(data.token);
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
        "https://1e81-99-230-98-234.ngrok-free.app/api/v1/logout",
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

  async function Login(obj) {
    try {
      const res = await fetch(
        "https://1e81-99-230-98-234.ngrok-free.app/api/v1/login",
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
    destroySession,
    show,
    setShow,
    errorMessage,
    setErrorMessage,
    visible,
    setVisible,
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
