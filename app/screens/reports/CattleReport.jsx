import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useUserAuth } from "../../context/UserAutContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title, useTheme } from "react-native-paper";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const CattleReport = () => {
  const [cows, setCows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUserAuth();
  const cowsRef = collection(db, "cattle");
  const { colors } = useTheme();

  const fetchCows = async () => {
    setLoading(true);
    try {
      const c = await getDocs(cowsRef);
      setCows(
        c.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((c) => c.user.uid === user.uid)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCows();
  }, []);

  const femaleCows = cows.filter((c) => c.gender === "female").length;
  const maleCows = cows.filter((c) => c.gender === "male").length;

  const freshians = cows.filter((c) => c.breed == "Freshian").length;
  const Guernsey = cows.filter((c) => c.breed == "Guernsey").length;
  const jersey = cows.filter((c) => c.breed == "Jersey").length;
  const Lancashire = cows.filter((c) => c.breed == "Lancashire").length;
  const pregnant = cows.filter((c) => c.cattleStage === "Pregnant").length;
  const heifer = cows.filter((c) => c.cattleStage === "Hiefer").length;
  const Adult = cows.filter((c) => c.cattleStage === "Adult").length;
  const bull = cows.filter((c) => c.cattleStage === "Bull").length;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <Title
          style={{
            textAlign: "center",
          }}
        >
          {" "}
          Gender{" "}
        </Title>
        <PieChart
          data={[
            {
              name: "Female",
              population: femaleCows,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Male",
              population: maleCows,
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
        <Title
          style={{
            textAlign: "center",
          }}
        >
          Breeds
        </Title>
        <BarChart
          data={{
            labels: ["Freshian", "Guernsey", "Jersey", "Lancashire"],
            datasets: [
              {
                data: [freshians, Guernsey, jersey, Lancashire],
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
          Cattle Stage
        </Title>
        <LineChart
          data={{
            labels: ["Pregnant", "Hiefer", "Adult", "Bull"],
            datasets: [
              {
                data: [pregnant, heifer, Adult, bull],
                strokeWidth: 2,
              },
            ],
          }}
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
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CattleReport;
