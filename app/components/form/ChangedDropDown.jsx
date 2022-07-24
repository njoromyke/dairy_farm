import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useFormikContext } from "formik";

const ChangedDropDown = ({ items, label }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Picker
      selectedValue={values[label]}
      onValueChange={(itemValue, itemIndex) => setFieldValue(label, itemValue)}
    >
      {items.map((item, index) => {
        return <Picker.Item label={item.name} value={item} key={index} />;
      })}
    </Picker>
  );
};

export default ChangedDropDown;
