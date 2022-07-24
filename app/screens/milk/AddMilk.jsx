import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Form from "../../components/form/Form";
import CustomDropdown from "../../components/form/CustomDropDown";
import InputComponent from "../../components/form/InputComponent";
import DatePickerComponent from "../../components/form/DatePickerComponent";
import SubmitButton from "../../components/form/SubmitButton";
import { useUserAuth } from "../../context/UserAutContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Loader from "../../components/loader/Loader";
import ChangedDropDown from "../../components/form/ChangedDropDown";

const validationSchema = Yup.object().shape({
  milkingDate: Yup.date().required("milkingDate is required"),
  // cow: Yup.object().required("Cow is required"),
  AmTotal: Yup.number().required("AM Total is required"),
  PmTotal: Yup.number().required("PM Total is required"),
  NoonTotal: Yup.number().required("Noon Total is required"),
  totalUsed: Yup.number().required("Total used is required"),
});

const AddMilk = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user } = useUserAuth();
  const milkRef = collection(db, "milk");
  const cowsRef = collection(db, "cattle");
  const [loading, setLoading] = useState(false);
  const [cows, setCows] = useState([]);

  const handleSubmit = async ({
    milkingDate,
    cow,
    AmTotal,
    PmTotal,
    NoonTotal,
    totalUsed,
  }) => {
    try {
      setLoading(true);
      const milk = {
        milkingDate,
        cow,
        AmTotal,
        PmTotal,
        NoonTotal,
        totalUsed,
        user: {
          uid: user.uid,
          email: user.email,
        },
        totalProduced:
          parseInt(AmTotal) + parseInt(PmTotal) + parseInt(NoonTotal),
      };
      await addDoc(milkRef, milk);
      setLoading(false);
      navigation.navigate("milk");
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchCows = async () => {
    setLoading(true);
    try {
      const c = await getDocs(cowsRef);
      setCows(
        c.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((c) => c.user.uid === user.uid)
          .filter((c) => c.gender === "female")
          .filter((c) => c.cattleStage === "Adult")
      );
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCows();
  }, [user]);

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
          title="Add Milk"
        />
      </Appbar>
      <ScrollView>
        {loading && <Loader />}
        <View style={{ padding: 10 }}>
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              milkingDate: "",
              cow: "",
              AmTotal: "",
              PmTotal: "",
              NoonTotal: "",
              totalUsed: "",
            }}
          >
            <DatePickerComponent label="milkingDate" />
            <ChangedDropDown label="cow" items={cows} />
            <InputComponent
              label="AmTotal"
              keyboardType="number-pad"
              secureTextEntry={false}
            />
            <InputComponent
              label="NoonTotal"
              keyboardType="number-pad"
              secureTextEntry={false}
            />
            <InputComponent
              label="PmTotal"
              keyboardType="number-pad"
              secureTextEntry={false}
            />
            <InputComponent
              label="totalUsed"
              secureTextEntry={false}
              keyboardType="number-pad"
            />

            <SubmitButton
              color={colors.primary}
              value="Add milk"
              textColor={colors.background}
            />
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMilk;
