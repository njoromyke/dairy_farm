import * as React from "react";
import { Checkbox, Text } from "react-native-paper";
import { View } from "react-native";
import { useFormikContext } from "formik";

const Check = ({ label, title }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      <Checkbox
        status={values[label] ? "checked" : "unchecked"}
        onPress={() => setFieldValue(label, !values[label])}
      />
    </View>
  );
};

export default Check;
