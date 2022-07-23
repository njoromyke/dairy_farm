import { View, Text } from "react-native";
import React from "react";
import { Card, useTheme } from "react-native-paper";

const CardContetText = ({ name, title }) => {
  const { colors } = useTheme();
  return (
    <>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text>{name}</Text>
          <Text style={{ color: colors.primary }}>{title}</Text>
        </View>
      </Card.Content>
    </>
  );
};

export default CardContetText;
