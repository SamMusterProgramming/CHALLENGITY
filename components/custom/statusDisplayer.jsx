import React from "react";
import { View, Text, useWindowDimensions } from "react-native";

export default function StatusDisplayer({ status , bottom }) {
  const { width } = useWindowDimensions();

  if (!status || status =="Queue" || status == "Join") return null;

  const getColor = () => {
    switch (status) {
      case "Joined":
        return "#22c55e"; // green
      case "Queued":
        return "#38bdf8"; // light blue
      case "Join":
        return "orange";
      case "Queue":
          return "#38bdf8";
      default:
        return "#ef4444"; // red
    }
  };

  const getDescription = () => {
    switch (status) {
      case "Joined":
        return "on stage";
      case "Queued":
        return "in queue";
      case "Eliminated":
          return "from the contest";
      case "Join":
        return "on stage";
      case "Queue":
          return "Spot in the Queue";
      default:
        return "from the contest";
    }
  };

  return (
    <View 
    // style = {{ bottom : bottom}}
    className="w- [50%] flex-1 justify-end items-start gap-2 ">
      <View className="flex-row items-end gap- 2">
         <Text
            style={{
            fontSize: width / 39,
            letterSpacing: 1.5,
            color: "#9ca3af",
            }}
            className="font-bebas"
        >
            STATUS :{' '}
        </Text>
        <Text
          style={{
            color: getColor(),
            fontSize: width / 39,
            letterSpacing: 1,
          }}
          className="font-bebas"
        >
        {status == "Queue"  ? "Reserve": status == "Join" ? "Shine" : status}
        </Text>

        {/* SUBTEXT */}
       

      </View>
      <Text
          style={{
            fontSize: width / 39,
            color: "#d1d5db",
          }}
          className="font-bebas  tracking-widest"
        >
          {getDescription()}
        </Text>

    </View>
  );
}
