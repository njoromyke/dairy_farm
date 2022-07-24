import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Card, Title, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardContetText from "../../components/card-display/CardContetText";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ViewCow = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const cow = route.params.cow;

  const handleDelete = async (id) => {
    const dc = doc(db, "cattle", id);
    try {
      await deleteDoc(dc);
      Alert.alert("Deleted");
      navigation.navigate("cattle");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="View Cow" />
        <Appbar.Action
          icon="delete"
          onPress={() =>
            Alert.alert(
              "Delete Cow",

              "Are you sure you want to delete this cow?",

              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: () => {
                    handleDelete(cow.id);
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
                  uri: "https://thedairyalliance.com/wp-content/uploads/2020/04/cow_mystery-1024x746.png",
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
              Cow Details
            </Title>
            <CardContetText name={"Name"} title={cow.name} />
            <CardContetText name={"Breed"} title={cow.breed} />
            <CardContetText name={"Cattle Stage"} title={cow.cattleStage} />
            <CardContetText name={"Date Of Birth"} title={cow.dob} />
            <CardContetText name={"Date Of Entry"} title={cow.dofEntry} />
            <CardContetText name={"Gender"} title={cow.gender} />
            <CardContetText name={"Obtain Method"} title={cow.obtainMethod} />
            <CardContetText name={"Tag Number"} title={cow.tagNo} />
            <CardContetText name={"Weight"} title={cow.weight} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCow;
