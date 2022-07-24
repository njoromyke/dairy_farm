import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Title, useTheme } from "react-native-paper";
import { useUserAuth } from "../../context/UserAutContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-chart-kit";

const MilkReport = () => {
  const { colors } = useTheme();
  const [milk, setMilk] = React.useState([]);
  const milkRef = collection(db, "milk");
  const [loading, setLoading] = useState(false);
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

  //totalMilk produced AmTotal, PmTotal, NoonTotal
  const totalMilk = milk.reduce(
    (acc, curr) => {
      return {
        AmTotal: parseInt(acc.AmTotal) + parseInt(curr.AmTotal),
        PmTotal: parseInt(acc.PmTotal) + parseInt(curr.PmTotal),
        NoonTotal: parseInt(acc.NoonTotal) + parseInt(curr.NoonTotal),
      };
    },
    { AmTotal: 0, PmTotal: 0, NoonTotal: 0 }
  );

  // total ProducedPerCowToday
  const totalProducedPerCow = milk.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.cow.name]: curr.totalProduced,
    };
  }, {});

  // convert to array
  const totalProducedPerCowArray = Object.keys(totalProducedPerCow).map(
    (key) => {
      return {
        name: key,

        totalProduced: totalProducedPerCow[key],
      };
    }
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Title
        style={{
          textAlign: "center",
        }}
      >
        Morning, Afternoon, and Night Milk production
      </Title>
      <BarChart
        data={{
          labels: ["AM", "PM", "Noon"],
          datasets: [
            {
              data: [totalMilk.AmTotal, totalMilk.PmTotal, totalMilk.NoonTotal],
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        yAxisLabel={"Rs"}
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
      />
      <Title
        style={{
          textAlign: "center",
        }}
      >
        Milk Production per Cow
      </Title>
      <BarChart
        data={{
          labels: [...totalProducedPerCowArray.map((c) => c.name)],
          datasets: [
            {
              data: [...totalProducedPerCowArray.map((c) => c.totalProduced)],
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        yAxisLabel={"Rs"}
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
      />
    </SafeAreaView>
  );
};

export default MilkReport;
