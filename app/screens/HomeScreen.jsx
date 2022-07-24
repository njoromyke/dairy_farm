import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { useUserAuth } from "../context/UserAutContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";
import CardDisplay from "../components/card-display/CardDisplay";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const HomeScreen = () => {
  const { user } = useUserAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const usersRef = collection(db, "users");
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const u = await getDocs(usersRef);
      setUsers(
        u.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((u) => u.id === user.uid)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const userLogged = Object.assign({}, users);

  const items = [
    {
      icon: (
        <MaterialCommunityIcons name="cow" size={100} color={colors.primary} />
      ),
      title: "Cattle",
      onPress: () => {
        navigation.navigate("cattle");
      },
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="bottle-tonic"
          size={100}
          color={colors.primary}
        />
      ),
      title: "Milk Records",
      onPress: () => {
        navigation.navigate("milk");
      },
    },
    {
      icon: <Entypo name="area-graph" size={100} color={colors.primary} />,
      title: "Reports",
      onPress: () => {
        navigation.navigate("reports");
      },
    },
    {
      icon: (
        <FontAwesome5 name="user-check" size={100} color={colors.primary} />
      ),
      title: "Profile",
      onPress: () => {
        navigation.navigate("profile");
      },
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="cash-fast"
          size={100}
          color={colors.primary}
        />
      ),
      title: "Loans",
      onPress: () => {
        navigation.navigate("loan");
      },
    },

    userLogged &&
      userLogged[0]?.isAdmin && {
        icon: (
          <MaterialCommunityIcons
            name="cash-fast"
            size={100}
            color={colors.primary}
          />
        ),
        title: "Admin Loans",
        onPress: () => {
          navigation.navigate("loans");
        },
      },
    userLogged &&
      userLogged[0]?.isAdmin && {
        icon: <FontAwesome5 name="users" size={100} color={colors.primary} />,
        title: "Users",
        onPress: () => {
          navigation.navigate("users");
        },
      },
  ];

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
          title="E-Milk"
        />
      </Appbar>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <CardDisplay
              icon={item.icon}
              title={item.title}
              onPress={item.onPress}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
