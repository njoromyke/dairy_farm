import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, TextInput, useTheme, Text } from "react-native-paper";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useUserAuth } from "../../context/UserAutContext";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitButton";
import { db } from "../../config/firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required("Please enter a password")
    .min(6, "Password must be at least 6 characters"),
  name: Yup.string()
    .label("Name")
    .required("Please enter a name")
    .min(3, "Name must be at least 3 characters"),
});

const SignUpScreen = () => {
  const { colors } = useTheme();
  const { signUp } = useUserAuth();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRegister = async ({ email, password, name }) => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      if (user) {
        const userId = user.user.uid;
        const userData = {
          email,
          isAdmin: false,
          name,
        };
        await setDoc(doc(db, "users", userId), userData);
      }
      navigation.navigate("home");
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  


  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.Content
          style={{
            alignItems: "center",
          }}
          title="Register"
        />
      </Appbar>
      <>
        {loading && <Loader />}

        <View
          style={{
            justifyContent: "center",
            padding: 10,
            flex: 1,
          }}
        >
          <Form
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: "",
              name: "",
            }}
            onSubmit={handleRegister}
          >
            <InputComponent
              secureTextEntry={false}
              label={"email"}
              keyboardType="email-address"
            />
            <InputComponent
              secureTextEntry={false}
              label={"name"}
              keyboardType="default"
            />
            <InputComponent
              secureTextEntry={visible}
              label={"password"}
              keyboardType="default"
              right={
                <TextInput.Icon
                  onPress={() => {
                    setVisible(!visible);
                  }}
                  name={visible ? "eye" : "eye-off"}
                />
              }
            />
            <SubmitButton
              color={colors.primary}
              icon="login"
              textColor={colors.background}
              value={"Register"}
            />
          </Form>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: colors.text,
            }}
          >
            Have an account?{" "}
            <Text
              style={{
                color: colors.primary,
              }}
            >
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};
export default SignUpScreen;
