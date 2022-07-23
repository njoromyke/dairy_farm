import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ListCattle from "../screens/cattle/ListCattle";
import ListMilk from "../screens/milk/ListMilk";
import ListReport from "../screens/reports/ListReport";

const Stack = createNativeStackNavigator();
const FeedNav = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="cattle"
          options={{ headerShown: false }}
          component={ListCattle}
        />
        <Stack.Screen
          name="milk"
          options={{ headerShown: false }}
          component={ListMilk}
        />
        <Stack.Screen
          name="reports"
          options={{ headerShown: false }}
          component={ListReport}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default FeedNav;
