import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ViewCow = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();



  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Text>ViewCow</Text>
    </SafeAreaView>
  );
};

export default ViewCow;
