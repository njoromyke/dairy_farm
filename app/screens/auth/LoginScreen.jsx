import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, TextInput, useTheme, Text } from "react-native-paper";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import Form from "../../components/form/Form";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitButton";
import { useUserAuth } from "../../context/UserAutContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required("Please enter a password")
    .min(6, "Password must be at least 6 characters"),
});

const LoginScreen = () => {
  const { colors } = useTheme();
  const { login } = useUserAuth();
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      await login(email, password);
      navigation.navigate("home");
      alert("Login Successful");
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  const user = getAuth().currentUser;
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
          title="Login"
        />
      </Appbar>
      {loading && <Loader />}

      <>
        <View
          style={{
            justifyContent: "center",
            padding: 10,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Form
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
          >
            <InputComponent
              secureTextEntry={false}
              label={"email"}
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
              value={"Login"}
            />
          </Form>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("signUp");
          }}
          style={{
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: colors.text,
            }}
          >
            Don't have an account?
            <Text
              style={{
                color: colors.primary,
              }}
            >
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};
export default LoginScreen;
