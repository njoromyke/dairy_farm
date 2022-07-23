import { DarkTheme, DefaultTheme } from "react-native-paper";

const theme = {
  dark: false,
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary:"#00600f",
   
  },
  animation: {
    scale: 1.0,
  },
};
const darkmodeTheme = {
  dark: true,
  ...DarkTheme,
  mode: "adaptive",
  roundness: 10,
  colors: {
    ...DarkTheme.colors,
  },
};
export { theme, darkmodeTheme };
