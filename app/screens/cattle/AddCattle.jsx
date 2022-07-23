import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Form from "../../components/form/Form";
import CustomDropdown from "../../components/form/CustomDropDown";
import { breeds, cattleStage, gender, obtainMethods } from "../../data/data";
import InputComponent from "../../components/form/InputComponent";
import DatePickerComponent from "../../components/form/DatePickerComponent";
import SubmitButton from "../../components/form/SubmitButton";
import { useUserAuth } from "../../context/UserAutContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Loader from "../../components/loader/Loader";

const validationSchema = Yup.object().shape({
  breed: Yup.string().required("Breed is required"),
  name: Yup.string().required("Name is required"),
  tagNo: Yup.string().required("Tag No is required"),
  gender: Yup.string().required("Gender is required"),
  weight: Yup.number().required("Weight is required"),
  dob: Yup.date().required("Date of Birth is required"),
  dofEntry: Yup.date().required("Date of farm entry is required"),
  obtainMethod: Yup.string().required("Obtain Method is required"),
  cattleStage: Yup.string().required("Cattle Stage is required"),
});

const AddCattle = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user } = useUserAuth();
  const cattleRef = collection(db, "cattle");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    breed,
    name,
    tagNo,
    gender,
    weight,
    dob,
    dofEntry,
    obtainMethod,
    cattleStage,
  }) => {
    setLoading(true);

    try {
      const cattle = {
        breed,
        name,
        tagNo,
        gender,
        weight,
        dob,
        dofEntry,
        obtainMethod,
        cattleStage,
        user: {
          uid: user.uid,
          email: user.email,
        },
      };
      await addDoc(cattleRef, cattle);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          style={{
            alignItems: "center",
          }}
          title="Add Cattle"
        />
      </Appbar>
      <ScrollView>
        {loading && <Loader />}
        <View style={{ padding: 10 }}>
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              breed: "",
              name: "",
              tagNo: "",
              gender: "",
              weight: "",
              dob: "",
              dofEntry: "",
              obtainMethod: "",
              cattleStage: "",
            }}
          >
            <CustomDropdown label="breed" roles={breeds} />
            <InputComponent label="name" secureTextEntry={false} />
            <InputComponent label="tagNo" secureTextEntry={false} />
            <CustomDropdown label="gender" roles={gender} />
            <InputComponent
              label="weight"
              keyboardType="number-pad"
              secureTextEntry={false}
            />
            <DatePickerComponent label="dob" mb={20} />
            <DatePickerComponent label="dofEntry" mb={15} />
            <CustomDropdown label="obtainMethod" roles={obtainMethods} />
            <CustomDropdown label="cattleStage" roles={cattleStage} />
            <SubmitButton
              color={colors.primary}
              value="Add Cattle"
              textColor={colors.background}
            />
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCattle;
