import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Chip, Divider, List, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FABComponent from "../../components/FAB";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAutContext";

const ListAdminLoans = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loans, setLoans] = React.useState([]);
  const loansRef = collection(db, "loans");
  const [loading, setLoading] = React.useState(false);
  const { user } = useUserAuth();

  const fetchloans = async () => {
    setLoading;
    try {
      const c = await getDocs(loansRef);
      setLoans(c.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchloans();
  }, []);

  console.log(loans);

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
          title="Loans"
        />
      </Appbar>
      {loans.map((c) => {
        return (
          <>
            <List.Item
              description={c.amount}
              title={`Due Date ${c.dueDate}`}
              key={c.id}
              onPress={() => {
                navigation.navigate("loan-view", { loan: c });
              }}
              left={() => <List.Icon icon="cash" />}
              right={() => (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  <Text>
                    {c.isApproved ? (
                      <Text style={{ color: colors.primary }}>Approved</Text>
                    ) : (
                      <Text style={{ color: colors.notification }}>
                        Pending
                      </Text>
                    )}
                  </Text>
                  <Text>
                    {c.isPaid ? (
                      <Text style={{ color: colors.primary }}>Paid</Text>
                    ) : (
                      <Text style={{ color: colors.notification }}>
                        Not Paid
                      </Text>
                    )}
                  </Text>
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
            label: "Request Loan",
            onPress: () => {
              navigation.navigate("loan-request");
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ListAdminLoans;
