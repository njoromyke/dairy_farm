import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FABComponent from "../../components/FAB";

const ListCattle = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          style={{
            alignItems: "center",
          }}
          title="Cattle"
        />
      </Appbar>
      <FABComponent
        buttons={[
          {
            icon: "plus",
            label: "Add Cattle",
            onPress: () => {
              navigation.navigate("cattle-add");
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ListCattle;
