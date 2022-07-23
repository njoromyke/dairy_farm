import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./TabNav";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

const Stack = createNativeStackNavigator();
const AuthNav = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="signUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={MyTabs}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AuthNav;
