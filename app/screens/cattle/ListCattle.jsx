import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, List, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FABComponent from "../../components/FAB";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAutContext";

const ListCattle = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [cows, setCows] = React.useState([]);
  const cowsRef = collection(db, "cattle");
  const [loading, setLoading] = React.useState(false);
  const { user } = useUserAuth();

  const fetchCows = async () => {
    setLoading;
    try {
      const c = await getDocs(cowsRef);
      setCows(
        c.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((c) => c.user.id === user.uid)
      );
    } catch (error) {
      alert(error.message);
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
          title="Cattle"
        />
      </Appbar>
      {cows.map((c) => {
        return (
          <List.Item
            title={c.name}
            onPress={() => {
              navigation.navigate("cattle", { id: c.id });
            }}
            left={() => <List.Icon icon="cow" />}
          />
        );
      })}

      <FABComponent
        buttons={[
          {
            icon: "plus",
            label: "Add Cattle",
            onPress: () => {
              navigation.navigate("cattle-add");
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ListCattle;
