import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import { useFormikContext } from "formik";

const SubmitButton = ({
  color,
  value,
  textColor,
  icon,
  onPress,
  ...otherProps
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <>
      <Button
        onPress={handleSubmit}
        mode="outlined"
        style={{ marginTop: 20, backgroundColor: color }}
        theme={{ roundness: 40 }}
        color={textColor}
        {...otherProps}
        icon={icon}
      >
        {value}
      </Button>
    </>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({});
