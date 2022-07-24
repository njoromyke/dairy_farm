import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "../../context/UserAutContext";
import { db } from "../../config/firebase";
import { PieChart } from "react-native-chart-kit";

const LoansReport = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loans, setLoans] = useState([]);
  const loansRef = collection(db, "loans");
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuth();

  const fetchloans = async () => {
    setLoading;
    try {
      setLoading(true);
      const c = await getDocs(loansRef);
      setLoans(
        c.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((c) => c.user.uid === user.uid)
      );
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchloans();
  }, []);

  const paidLoansTaken = loans
    .filter((c) => c.isPaid === true)

    .reduce((acc, curr) => acc + curr.amount, 0);

  const unpaidLoansTaken = loans
    .filter((c) => c.isPaid === false)
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Title
            style={{
              textAlign: "center",
            }}
          >
            Loan Performance report
          </Title>
          <PieChart
            data={[
              {
                name: "Paid Loans",
                population: paidLoansTaken,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Unpaid Loans",
                population: unpaidLoansTaken,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute //for the absolute number remove if you want percentage
          />
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Paid Loans Taken: {paidLoansTaken}
          </Text>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Unpaind Loans Taken: {unpaidLoansTaken}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoansReport;
