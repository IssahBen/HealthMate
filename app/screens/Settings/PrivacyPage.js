import React, { useState } from "react";
import { View, Text, Switch, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacySettings = () => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white p-4">
        <Text className="text-2xl font-bold mb-4">Privacy Settings</Text>

        <View className="mb-4 p-4 bg-gray-100 rounded-2xl">
          <Text className="text-lg font-semibold mb-2">Data Preferences</Text>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base">Allow Analytics</Text>
            <Switch
              value={analyticsEnabled}
              onValueChange={setAnalyticsEnabled}
            />
          </View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base">Personalized Ads</Text>
            <Switch
              value={personalizedAds}
              onValueChange={setPersonalizedAds}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySettings;
