import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Card, Title, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardContetText from "../../components/card-display/CardContetText";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAutContext";

const ViewMilk = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const usersRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const milk = route.params.milk;
  const { user } = useUserAuth();

  const handleDelete = async (id) => {
    const dc = doc(db, "milk", id);
    try {
      await deleteDoc(dc);
      Alert.alert("Deleted");
      navigation.navigate("milk");
    } catch (error) {
      alert(error.message);
    }
  };

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

  console.log(milk);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="View milk" />

        <Appbar.Action
          icon="delete"
          onPress={() =>
            Alert.alert(
              "Delete milk",

              "Are you sure you want to delete this milk?",

              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: () => {
                    handleDelete(milk.id);
                  },
                },
              ],
              { cancelable: false }
            )
          }
        />
      </Appbar>
      <ScrollView>
        <View style={{ flex: 1, padding: 10, marginBottom: 10 }}>
          <Card>
            <Card.Content>
              <Image
                source={{
                  uri: "https://sothebys-md.brightspotcdn.com/dims4/default/bbe45c0/2147483647/strip/true/crop/2400x2400+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F77%2Fa0%2Ffbdf690e4872a018200c301c8d15%2Fc6zk4front.png",
                }}
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 10,
                  resizeMode: "contain",
                }}
              />
            </Card.Content>
          </Card>
          <Card style={{ marginTop: 10 }}>
            <Title
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
                padding: 10,
                textAlign: "center",
              }}
            >
              milk Details
            </Title>
            <CardContetText name={"Am Total"} title={milk.AmTotal} />
            <CardContetText name={"Noon Total"} title={milk.NoonTotal} />
            <CardContetText name={"Pm Total"} title={milk.PmTotal} />
            <CardContetText name={"Id Cow"} title={milk.cow.name} />
            <CardContetText name={"Milking Date"} title={milk.milkingDate} />
            <CardContetText name={"Total Used"} title={milk.totalUsed} />
            <CardContetText
              name={"Total Produced"}
              title={milk.totalProduced}
            />
            <CardContetText
              name={"Total Sold"}
              title={milk.totalProduced - milk.totalUsed}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewMilk;
