import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Appbar, useTheme } from "react-native-paper";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitButton";
import Check from "../../components/form/Check";

const EditLoan = () => {
  const route = useRoute();
  const loan = route.params.loan;
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleSumbit = async (values) => {
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
        <Appbar.Content title="Edit Loan" />
      </Appbar>
      <View
        style={{
          flex: 1,
          padding: 10,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Form
          onSubmit={handleSumbit}
          initialValues={{
            isApproved: loan.isApproved,
            isPaid: loan.isPaid,
          }}
        >
          <Check label={"isApproved"} title="Approve" />
          <Check label={"isPaid"} title="Mark as Paid" />
          <SubmitButton
            value="Submit"
            textColor={colors.background}
            color={colors.primary}
          />
        </Form>
      </View>
    </SafeAreaView>
  );
};

export default EditLoan;
