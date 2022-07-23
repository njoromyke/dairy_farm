import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkmodeTheme, theme } from "./app/config/theme";
import { registerRootComponent } from "expo";
import AuthHandler from "./app/AuthHandler";
import { UserAuthContextProvider } from "./app/context/UserAutContext";

export default function App() {
  const scheme = useColorScheme();

  return (
    <PaperProvider theme={scheme === "light" ? theme : darkmodeTheme}>
      <StatusBar style="auto" />
      <UserAuthContextProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <NavigationContainer>
            <AuthHandler />
          </NavigationContainer>
        </SafeAreaView>
      </UserAuthContextProvider>
    </PaperProvider>
  );
}
registerRootComponent(App);
