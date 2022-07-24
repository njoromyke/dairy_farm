import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  Appbar,
  Avatar,
  Card,
  Divider,
  List,
  useTheme,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserAuth } from "../../context/UserAutContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user, logout } = useUserAuth();
  const [userData, setUserData] = React.useState([]);
  const usersRef = collection(db, "users");

  const fetchUserData = async () => {
    try {
      const u = await getDocs(usersRef);
      setUserData(
        u.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((u) => u.id === user.uid)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const userLogout = async () => {
    await logout();
    // navigation.navigate("login");
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
          title="My Profile"
          style={{
            alignItems: "center",
          }}
        />
      </Appbar>
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
        }}
      >
        <Card>
          <FontAwesome
            name="user-circle-o"
            size={100}
            style={{
              alignSelf: "center",
              marginBottom: 10,
            }}
            color="black"
          />
          <Card.Content>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Name: {userData[0]?.name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Email: {userData[0]?.email}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Phone: {userData[0]?.phone ? userData[0]?.phone : "Not Provided"}
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Status: {userData[0]?.isAdmin ? "Admin" : "Not Admin"}
            </Text>
          </Card.Content>
        </Card>

        <List.Item
          title="Logout"
          style={{
            marginTop: 10,
            backgroundColor: colors.surface,
          }}
          right={() => (
            <List.Icon
              icon="logout"
              color={colors.primary}
              size={30}
              style={{ marginRight: 10 }}
            />
          )}
          onPress={() => {
            userLogout();
          }}
        />
        <Divider />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
