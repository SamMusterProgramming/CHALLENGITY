import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ChallengifyLogo({ size = 56, showText = true }) {

  const iconSize = size * 1.3;

  return (
    <View className="flex-row h- [100%] p- 1  items-end">
      {/* <LinearGradient
          pointerEvents="none"
          colors={["gray", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            alignSelf: "center",
            width: size * 5.5,
            height:  size * 1,
            borderRadius: 4,
          }}
        />
          <LinearGradient
          pointerEvents="none"
          colors={[ "transparent","gray"]}
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: size * 6.5,
            height: size * 1,
            borderRadius: 4,
          }}
        /> */}
        
      {/* <LinearGradient
        colors={["gray","white","lightgray"]}
        style={{
          width: size * 1.3,
          height: size * 1.3,
          borderRadius: size * 0.28,
          justifyContent: "center",
          alignItems: "center"
        }}
      > */}
        <MaterialCommunityIcons
          name="trophy"
          size={iconSize}
          color="#b17e0f"
        />
      {/* </LinearGradient> */}

      {showText && (
        <Text
        className="ml-2 b order-[#152ac4]"
          style={{
            fontSize: size * 0.60,
            color: "white",
            fontWeight: "900",
            letterSpacing: 1.5
          }}
        >
          CHALLENGIFY
        </Text>
      )}


    

    </View>
  );
}