import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import DatePickerComponent from "../../components/form/DatePickerComponent";
import moment from "moment";
import { INTEREST_RATE } from "../../utils/constants";
import SubmitButton from "../../components/form/SubmitButton";
import Loader from "../../components/loader/Loader";
import { useUserAuth } from "../../context/UserAutContext";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  idNumber: Yup.string().required("ID number is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  amount: Yup.string().required("Amount requested is required"),
  dueDate: Yup.string().required("Due date is required"),
});

const RequestLoan = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const loansRef = collection(db, "loans");
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();

  const dateDue = () => {
    // three months from today
    const date = moment().add(3, "months");
    return date.format("YYYY-MM-DD");
  };

  const handleSumbit = async ({
    firstName,
    lastName,
    idNumber,
    phoneNumber,
    amount,
  }) => {
    const loan = {
      firstName,
      lastName,
      idNumber,
      phoneNumber,
      amount: parseFloat(amount),
      isApproved: false,
      isPaid: false,
      dueDate: dateDue(),
      loanInterest: INTEREST_RATE,
      totalRepayment: amount * (1 + INTEREST_RATE) * 3,
      user: {
        uid: user.uid,
        email: user.email,
      },
      paidOn: null,
    };

    setLoading(true);
    try {
      await addDoc(loansRef, loan);
      navigation.navigate("loan");
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      {loading && <Loader />}
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Request Loan" />
      </Appbar>

      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          backgroundColor: colors.notification,
          color: colors.background,
          textAlign: "center",
        }}
      >
        Note {INTEREST_RATE * 100}% interest rate
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          backgroundColor: colors.notification,
          color: colors.background,
          textAlign: "center",
        }}
      >
        Due on {dateDue()} 3 months from today
      </Text>

      <ScrollView>
        <View
          style={{
            padding: 10,
          }}
        >
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSumbit}
            initialValues={{
              firstName: "",
              lastName: "",
              idNumber: "",
              phoneNumber: "",
              amount: "",
              dueDate: dateDue(),
            }}
          >
            <InputComponent label="firstName" secureTextEntry={false} />
            <InputComponent label="lastName" secureTextEntry={false} />
            <InputComponent
              label="idNumber"
              secureTextEntry={false}
              keyboardType="number-pad"
            />
            <InputComponent
              label="phoneNumber"
              secureTextEntry={false}
              keyboardType="number-pad"
            />
            <InputComponent
              label="amount"
              keyboardType="number-pad"
              secureTextEntry={false}
            />
            <InputComponent label="dueDate" disabled secureTextEntry={false} />
            <SubmitButton
              color={colors.primary}
              value="Request Loan"
              textColor={colors.background}
            />
          </Form>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestLoan;
