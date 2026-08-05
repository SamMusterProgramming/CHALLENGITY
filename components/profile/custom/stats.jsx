import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function Stats({ icon, label, value, width }) {
  return (
    <View
      style={{
        // width: width / 5.8,
        // height: width / 7.7,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.035)",
        // borderWidth: 1,
        // borderColor: "rgba(234,179,8,.12)",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical :8,
        // marginTop:10
      }}
    >
      {/* <MaterialCommunityIcons
        name={icon}
        size={width/25}
        color="#eab308"
      /> */}

      <Text
        style={{
          marginTop: 4,
          color: "#fff",
          fontSize: width / 30,
          fontWeight: "800",
        }}
      >
        <MaterialCommunityIcons
        name={icon}
        size={width/25}
        color="#eab308"
        />
        {'  ' + value}
      </Text>

      <Text
        style={{
          marginTop: 3,
          color: "rgba(255,255,255,.85)",
          fontSize: width / 45,
          fontWeight: "600",
          letterSpacing: 1,
        //   textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    </View>
  );
}