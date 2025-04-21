import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Download } from "lucide-react-native";

export default function PurchasesScreen() {
  const navigation = useNavigation();

  const PurchaseItem = ({ title, date, amount, status }) => (
    <View className="p-4 bg-white border-b border-gray-100">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text
            className="text-base text-gray-900"
            style={{ fontFamily: "Inter-Medium" }}
          >
            {title}
          </Text>
          <Text
            className="text-sm text-gray-500 mt-1"
            style={{ fontFamily: "Inter-Regular" }}
          >
            {date}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className="text-base text-gray-900"
            style={{ fontFamily: "Inter-Medium" }}
          >
            ${amount}
          </Text>
          <View
            className={`mt-1 px-2 py-1 rounded-full ${
              status === "Completed" ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <Text
              className={`text-xs ${
                status === "Completed" ? "text-green-800" : "text-yellow-800"
              }`}
              style={{ fontFamily: "Inter-Medium" }}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

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
          Purchases
        </Text>
      </View>

      <ScrollView>
        <View className="py-4">
          <Text
            className="px-4 pb-2 text-sm text-gray-500"
            style={{ fontFamily: "Inter-Medium" }}
          >
            RECENT PURCHASES
          </Text>
          <PurchaseItem
            title="Premium Subscription"
            date="Mar 15, 2024"
            amount="29.99"
            status="Completed"
          />
          <PurchaseItem
            title="Fitness Program"
            date="Mar 1, 2024"
            amount="49.99"
            status="Completed"
          />
          <PurchaseItem
            title="Personal Training Session"
            date="Feb 28, 2024"
            amount="75.00"
            status="Pending"
          />
        </View>

        <View className="py-4">
          <Text
            className="px-4 pb-2 text-sm text-gray-500"
            style={{ fontFamily: "Inter-Medium" }}
          >
            OLDER PURCHASES
          </Text>
          <PurchaseItem
            title="Nutrition Plan"
            date="Feb 15, 2024"
            amount="19.99"
            status="Completed"
          />
          <PurchaseItem
            title="Workout Bundle"
            date="Feb 1, 2024"
            amount="89.99"
            status="Completed"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
