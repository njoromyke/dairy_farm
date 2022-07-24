import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Card, Title, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardContetText from "../../components/card-display/CardContetText";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAutContext";
import CustomModal from "../../components/form/CustomModal";
import Check from "../../components/form/Check";
import Form from "../../components/form/Form";
import SubmitButton from "../../components/form/SubmitButton";
import moment from "moment";

const ViewLoan = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const usersRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const loan = route.params.loan;
  const { user } = useUserAuth();

  const handleDelete = async (id) => {
    const dc = doc(db, "loans", id);
    try {
      await deleteDoc(dc);
      Alert.alert("Deleted");
      navigation.navigate("loan");
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

  const userLogged = Object.assign({}, users);
  console.log(loan);

  const handleEdit = async ({ isPaid, isApproved }) => {
    const loansDoc = doc(db, "loans", loan.id);
    try {
      await updateDoc(loansDoc, {
        isPaid,
        isApproved,
        paidOn: isPaid ? moment().format("YYYY-MM-DD") : null,
      });

      handleClose();
      navigation.navigate("loans");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShowModal = () => {
    setVisibleModal(true);
  };

  const handleClose = () => {
    setVisibleModal(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="View Loan" />
        {userLogged && userLogged[0]?.isAdmin && (
          <Appbar.Action icon="pencil" onPress={() => handleShowModal()} />
        )}

        <Appbar.Action
          icon="delete"
          onPress={() =>
            Alert.alert(
              "Delete loan",

              "Are you sure you want to delete this loan?",

              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: () => {
                    handleDelete(loan.id);
                  },
                },
              ],
              { cancelable: false }
            )
          }
        />
      </Appbar>
      {visibleModal && (
        <CustomModal showModal={handleEdit} hideModal={handleClose}>
          <View
            style={{
              flex: 1,
              padding: 10,
              marginBottom: 10,
              justifyContent: "center",
            }}
          >
            <Form
              onSubmit={handleEdit}
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
        </CustomModal>
      )}

      <ScrollView>
        <View style={{ flex: 1, padding: 10, marginBottom: 10 }}>
          <Card>
            <Card.Content>
              <Image
                source={{
                  uri: "https://countydevelopment.co.ke/wp-content/uploads/2022/04/kenya-ksh-800000-up-for-grabs-at-savannah-golf-tour-in-karen-allafrica-top-africa-news.png",
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
              loan Details
            </Title>
            <CardContetText name={"Date Due"} title={loan.dueDate} />
            <CardContetText name={"First Name"} title={loan.firstName} />
            <CardContetText name={"Last Name"} title={loan.lastName} />
            <CardContetText name={"Id Number"} title={loan.idNumber} />
            <CardContetText
              name={"Approval Status"}
              title={loan.isApproved ? "Approved" : "Not Approved"}
            />
            <CardContetText
              name={"Payment Status"}
              title={loan.isPaid ? "Paid" : "Not Paid"}
            />
            <CardContetText name={"Phone Number"} title={loan.phoneNumber} />
            <CardContetText
              name={"Total to be Paid "}
              title={`${loan.totalRepayment.toFixed(2)} Ksh`}
            />
            <CardContetText
              name={"Amount Requested Ksh"}
              title={`Ksh ${" "} ${loan.amount}`}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewLoan;
