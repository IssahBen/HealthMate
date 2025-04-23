import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  CircleCheck as CheckCircle2,
} from "lucide-react-native";
import { useState } from "react";
import { useData } from "./context/DataContext";
export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, PasswordUpdate, email } = useData();
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword || currentPassword !== password) {
      // Handle password mismatch
      return;
    } else {
      const formData = {
        user: {
          email: email,
          currentPassword: currentPassword,
          newPassword: newPassword,
          password_confirmation: confirmPassword,
        },
      };
      const result = await PasswordUpdate(formData);
      if (result === "success") {
        navigation.navigate("Details");
      }
    }

    // Handle password change logic
  };

  const PasswordRequirement = ({ met, text }) => (
    <View className="flex-row items-center mb-2">
      <CheckCircle2
        size={16}
        color={met ? "#22c55e" : "#94a3b8"}
        className={met ? "text-green-500" : "text-gray-400"}
      />
      <Text className={`ml-2 ${met ? "text-green-500" : "text-gray-400"}`}>
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 -ml-2"
        >
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="ml-2 text-xl text-gray-900">Change Password</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {[
          {
            label: "Current Password",
            value: currentPassword,
            setValue: setCurrentPassword,
            show: showCurrentPassword,
            toggleShow: () => setShowCurrentPassword(!showCurrentPassword),
          },
          {
            label: "New Password",
            value: newPassword,
            setValue: (text) => {
              setNewPassword(text);
              checkPasswordStrength(text);
            },
            show: showNewPassword,
            toggleShow: () => setShowNewPassword(!showNewPassword),
          },
          {
            label: "Confirm New Password",
            value: confirmPassword,
            setValue: setConfirmPassword,
            show: showConfirmPassword,
            toggleShow: () => setShowConfirmPassword(!showConfirmPassword),
          },
        ].map((field, idx) => (
          <View key={idx} className="mb-6">
            <Text className="mb-2 text-sm text-gray-700">{field.label}</Text>
            <View className="relative">
              <View className="absolute top-3 left-3 z-10">
                <Lock size={20} color="#64748b" />
              </View>
              <TextInput
                className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
                secureTextEntry={!field.show}
                value={field.value}
                onChangeText={field.setValue}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              <TouchableOpacity
                className="absolute top-3 right-3 z-10"
                onPress={field.toggleShow}
              >
                {field.show ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Text className="mb-3 text-sm font-medium text-gray-700">
            Password Requirements
          </Text>
          <PasswordRequirement
            met={passwordStrength.length}
            text="At least 8 characters long"
          />
          <PasswordRequirement
            met={passwordStrength.uppercase}
            text="Contains uppercase letter"
          />
          <PasswordRequirement
            met={passwordStrength.lowercase}
            text="Contains lowercase letter"
          />
          <PasswordRequirement
            met={passwordStrength.number}
            text="Contains number"
          />
          <PasswordRequirement
            met={passwordStrength.special}
            text="Contains special character"
          />
        </View>

        <TouchableOpacity
          className="w-full py-4 bg-emerald-600 rounded-xl active:opacity-80"
          onPress={handleChangePassword}
        >
          <Text className="text-center text-white font-semibold text-base">
            Update Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
