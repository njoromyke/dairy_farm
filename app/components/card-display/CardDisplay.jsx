import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Card, IconButton } from "react-native-paper";

const CardDisplay = ({ icon, title, onPress }) => {
  return (
    <Card
      onPress={onPress}
      style={{
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width / 2.2,
      }}
    >
      <IconButton size={100} icon={() => icon} onPress={onPress} />

      <Card.Title title={title} />
    </Card>
  );
};

export default CardDisplay;
