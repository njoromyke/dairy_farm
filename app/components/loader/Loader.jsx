
import * as React from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

const Loader = () => {
  const { colors } = useTheme();

  return (
    <ActivityIndicator
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        zIndex: 1000,
      }}
      animating={true}
      color={colors.primary}
      size="large"
    />
  );
};

export default Loader;
