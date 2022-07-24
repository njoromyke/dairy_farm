import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CattleReport from "../screens/reports/CattleReport";
import MilkReport from "../screens/reports/MilkReport";
import LoansReport from "../screens/reports/LoansReport";
import { useTheme } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

export default function TopBar() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      showPageIndicator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        labelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginTop: -5,
        },
        underlineStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Tab.Screen name="cattle-report" component={CattleReport} />
      <Tab.Screen name="milk-report" component={MilkReport} />
      <Tab.Screen name="loan-report" component={LoansReport} />
    </Tab.Navigator>
  );
}
