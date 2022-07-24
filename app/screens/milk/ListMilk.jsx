import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Divider, List, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FABComponent from "../../components/FAB";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAutContext";

const ListMilk = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [milk, setMilk] = React.useState([]);
  const milkRef = collection(db, "milk");
  const [loading, setLoading] = React.useState(false);
  const { user } = useUserAuth();

  const fetchMilk = async () => {
    setLoading;
    try {
      const c = await getDocs(milkRef);
      setMilk(
        c.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((c) => c.user.uid === user.uid)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchMilk();
  }, []);

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
          title="Milk Production"
        />
      </Appbar>
      {milk.map((c) => {
        return (
          <>
            <List.Item
              description={`Milking Date ${c.milkingDate}`}
              title={`Produced ${c.totalProduced} L`}
              key={c.id}
              onPress={() => {
                navigation.navigate("view-milk", { milk: c });
              }}
              left={() => <List.Icon icon="bottle-tonic" />}
              right={() => (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text>Cow: {" " + c.cow.name} </Text>
                  <Text>Used {c.totalUsed} L</Text>
                </View>
              )}
            />
            <Divider />
          </>
        );
      })}

      <FABComponent
        buttons={[
          {
            icon: "plus",
            label: "Add Milk Record",
            onPress: () => {
              navigation.navigate("milk-add");
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ListMilk;
