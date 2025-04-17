import Login from "./Login";
import Signup from "./SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useData } from "./context/DataContext";
import { Ionicons } from "@expo/vector-icons";
import ChatBot from "./Chatbot";
import Home from "./Home";
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function Tabs() {
  const { isLoggedIn } = useData();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={EntryStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={24} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (isLoggedIn) {
              navigation.navigate("Bot");
            }
          },
        })}
      />
      <Tab.Screen
        name="Bot"
        component={BotStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={24} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (!isLoggedIn) {
              navigation.navigate("Home");
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}

function EntryStack() {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen
        name="main"
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
          headerTintColor: "white", // makes the back arrow white
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
          headerTintColor: "white", // back arrow color
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
