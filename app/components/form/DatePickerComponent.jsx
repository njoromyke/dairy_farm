import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HelperText, TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import moment from "moment";

export default function DatePickerComponent({ label, mt, mb, disabled }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { errors, setFieldValue, touched, values } = useFormikContext();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setFieldValue(label, currentDate.toLocaleDateString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={values[label] || date}
          mode={mode}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      <TextInput
        onChangeText={(text) => setDate(moment(text).toDate())}
        value={moment(date).format("MM/DD/YYYY")}
        label={label}
        mode="outlined"
        disabled={disabled}
        style={{ marginTop: mt, marginBottom: mb }}
        right={
          <TextInput.Icon
            onPress={showDatepicker}
            disabled={disabled}
            name="calendar"
          />
        }
      />
      {errors[label] && touched[label] && (
        <HelperText type="error" visible={true}>
          {errors[label]}
        </HelperText>
      )}
    </>
  );
}
