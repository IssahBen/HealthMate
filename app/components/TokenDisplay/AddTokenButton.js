import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Plus } from "lucide-react-native";

const AddTokenButton = ({ onClick, disabled = false, className = "" }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      accessibilityLabel="Add token"
      className={`flex-row items-center justify-center w-full p-2 mt-2 rounded-lg bg-blue-500 active:bg-blue-600 disabled:opacity-50 ${className}`}
    >
      <Plus size={18} color="white" className="mr-1" />
      <Text className="text-white font-medium">Add Token</Text>
    </TouchableOpacity>
  );
};

export default AddTokenButton;
