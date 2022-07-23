import { FlatList, ScrollView, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useUserAuth } from "../context/UserAutContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";
import CardDisplay from "../components/card-display/CardDisplay";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { user } = useUserAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const items = [
    {
      icon: (
        <MaterialCommunityIcons name="cow" size={100} color={colors.primary} />
      ),
      title: "Cattle",
      onPress: () => {
        navigation.navigate("cattle");
      },
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="bottle-tonic"
          size={100}
          color={colors.primary}
        />
      ),
      title: "Milk Records",
      onPress: () => {
        navigation.navigate("milk");
      },
    },
    {
      icon: <Entypo name="area-graph" size={100} color={colors.primary} />,
      title: "Reports",
      onPress: () => {
        navigation.navigate("reports");
      },
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.Content
          style={{
            alignItems: "center",
          }}
          title="My Cattle Manager"
        />
      </Appbar>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardDisplay
              icon={item.icon}
              title={item.title}
              onPress={item.onPress}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
