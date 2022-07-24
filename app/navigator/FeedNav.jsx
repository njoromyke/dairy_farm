import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ListCattle from "../screens/cattle/ListCattle";
import ListMilk from "../screens/milk/ListMilk";
import ListReport from "../screens/reports/ListReport";
import AddCattle from "../screens/cattle/AddCattle";
import ViewCow from "../screens/cattle/ViewCow";
import ListLoans from "../screens/loans/ListLoans";
import RequestLoan from "../screens/loans/RequestLoan";
import ViewLoan from "../screens/loans/ViewLoan";
import ListAdminLoans from "../screens/loans/ListAdminLoans";
import EditLoan from "../screens/loans/EditLoan";
import AddMilk from "../screens/milk/AddMilk";
import ViewMilk from "../screens/milk/ViewMilk";
import Profile from "../screens/users/Profile";
import UserList from "../screens/users/UserList";

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
          name="cattle-add"
          options={{ headerShown: false }}
          component={AddCattle}
        />
        <Stack.Screen
          name="view-cattle"
          options={{ headerShown: false }}
          component={ViewCow}
        />
        <Stack.Screen
          name="milk"
          options={{ headerShown: false }}
          component={ListMilk}
        />
        <Stack.Screen
          name="milk-add"
          options={{ headerShown: false }}
          component={AddMilk}
        />
        <Stack.Screen
          name="view-milk"
          options={{ headerShown: false }}
          component={ViewMilk}
        />
        <Stack.Screen
          name="reports"
          options={{ headerShown: false }}
          component={ListReport}
        />
        <Stack.Screen
          name="loan"
          options={{ headerShown: false }}
          component={ListLoans}
        />
        <Stack.Screen
          name="loan-request"
          options={{ headerShown: false }}
          component={RequestLoan}
        />
        <Stack.Screen
          name="loan-view"
          options={{ headerShown: false }}
          component={ViewLoan}
        />
        <Stack.Screen
          name="loans"
          options={{ headerShown: false }}
          component={ListAdminLoans}
        />
        <Stack.Screen
          name="users"
          options={{ headerShown: false }}
          component={UserList}
        />
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
          component={Profile}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default FeedNav;
