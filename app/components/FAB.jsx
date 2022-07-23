import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FAB, useTheme } from "react-native-paper";

const FABComponent = ({ buttons }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const { colors } = useTheme();
  return (
    <>
      <>
        <FAB.Group
          style={{
            position: "absolute",
            right: 0,
            color: colors.accent,
            zIndex: 999,
          }}
          color={colors.background}
          open={open}
          icon={open ? "close-circle" : "plus"}
          actions={buttons.map((button) => {
            return {
              icon: button.icon,
              label: button.label,
              onPress: () => {
                button.onPress();
              },
            };
          })}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </>
    </>
  );
};
export default FABComponent;
