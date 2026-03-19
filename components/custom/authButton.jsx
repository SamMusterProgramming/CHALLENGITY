import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";

export default function AuthButton({ title, icon, onPress, bgColor = "#fff", textColor = "#000" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {icon && <Image source={icon} style={{ width: 24, height: 24, marginRight: 10 }} />}
      <Text style={{ fontWeight: "bold", fontSize: 16, color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
}