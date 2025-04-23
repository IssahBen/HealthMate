import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TokenDisplay from "./TokenDisplay"; // Adjust the import path as necessary
import { useData } from "../../context/DataContext";

export default function Purchase() {
  const { balance, setBalance } = useData();
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    if (amount) {
      onBuy(amount);
      setAmount("");
      toggleModal();
    }
  };
  const handleAddFunds = () => {
    setBalance((prev) => prev + 10); // Example: Add $10 each time
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center p-4">
      <View className="w-full max-w-sm">
        <TokenDisplay
          balance={balance}
          onAddClick={toggleModal}
          className="animate-in fade-in duration-300"
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center items-center bg-black/50 px-4"
        >
          <View className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl space-y-6">
            <Text className="text-2xl font-bold text-center text-gray-800">
              Buy Tokens
            </Text>

            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <TouchableOpacity
              onPress={handleBuy}
              className="bg-blue-600 py-3 rounded-xl shadow-md active:opacity-80"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Buy Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal}>
              <Text className="text-center text-sm text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
