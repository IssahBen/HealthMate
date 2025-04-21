import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Camera, ArrowLeft } from "lucide-react-native";
import { useData } from "./context/DataContext";
import ErrorMessage from "./context/ErrorMessage";
export default function ProfileSettings() {
  const navigation = useNavigation();
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    number,
    SetNumber,
    bio,
    setBio,
    ProfileUpdate,
    setErrorMessage,
    setVisible,
  } = useData();

  const handleUpdate = async () => {
    if (email === "" || fullName === "" || number === "" || bio === "") {
      setErrorMessage("All fields are required");
      setVisible(true);
      return;
    }
    const formprops = {
      user: { email: email, userName: fullName, bio: bio, number: number },
    };

    const result = await ProfileUpdate(formprops);
    if (result === "success") {
      navigation.navigate("Details");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text
          className="ml-4 text-xl font-semibold text-gray-900"
          style={{ fontFamily: "Inter-Medium" }}
        >
          Profile Settings
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="px-4 py-2">
          <View className="items-center relative py-6">
            <ErrorMessage />
            <View className="relative">
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                }}
                className="w-24 h-24 rounded-full"
              />
              <TouchableOpacity
                className="absolute right-0 bottom-0 p-2 rounded-full bg-primary-500"
                onPress={() => {}}
              >
                <Camera size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <Text
              className="mb-1 text-sm text-gray-600"
              style={{ fontFamily: "Inter-Regular" }}
            >
              User Name
            </Text>
            <TextInput
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              style={{ fontFamily: "Inter-Regular" }}
            />
          </View>
          <View className="mb-4">
            <Text
              className="mb-1 text-sm text-gray-600"
              style={{ fontFamily: "Inter-Regular" }}
            >
              Email
            </Text>
            <TextInput
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={{ fontFamily: "Inter-Regular" }}
            />
          </View>
          <View className="mb-4">
            <Text
              className="mb-1 text-sm text-gray-600"
              style={{ fontFamily: "Inter-Regular" }}
            >
              Phone Number
            </Text>
            <TextInput
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900"
              placeholder="Enter your phone number"
              value={number}
              onChangeText={SetNumber}
              keyboardType="phone-pad"
              style={{ fontFamily: "Inter-Regular" }}
            />
          </View>
          <View className="mb-4">
            <Text
              className="mb-1 text-sm text-gray-600"
              style={{ fontFamily: "Inter-Regular" }}
            >
              Bio
            </Text>
            <TextInput
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900"
              placeholder="Tell us about yourself"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              style={{
                fontFamily: "Inter-Regular",
                height: 100,
                textAlignVertical: "top",
              }}
            />
          </View>
          <TouchableOpacity
            onPress={handleUpdate}
            className="bg-emerald-600 px-6 py-4 rounded-full items-center shadow-lg active:opacity-90"
          >
            <Text className="text-white text-lg font-semibold tracking-wide">
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
