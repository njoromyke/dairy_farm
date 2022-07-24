import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../navigator/TopBar";

const ListReport = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TopBar />
    </SafeAreaView>
  );
};

export default ListReport;
