import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import FloatingStagePill from "../custom/floatingStagePill";
import { STAGES } from "../../utilities/TypeData";
import { useGlobalContext } from "../../context/GlobalProvider";




export default function StageDiscoveryFooter({width, height , onPress = () => {} } ) {
    const {setActiveIndex} = useGlobalContext()
  return (
    <View
      style={{
        height: height * 0.35,
        width,
        marginBottom : height * 0.023
      }}
      className="justify-center items-center overflow-hidden bg-[#000000]"
    >
      

      <View
        style={{
          position: "absolute",
        //   width: width * 0.7,
        //   height: width * 0.7,
          padding : width/3 ,
          borderRadius: 999,
        //   backgroundColor:
        //     "rgba(212,175,55,0.18)",
        }}
        className ="items-center b g-gold/30 justify-center"
      />

      <View
        style={{
          position: "absolute",
        //   width: width * 0.55,
        //   height: width * 0.55,
          padding : width/4 ,
          borderRadius: 999,
          backgroundColor:
            "rgba(247,215,116,0.05)",
        }}
      />

      {/* Floating Stage Pills */}

      {STAGES.map((item, index) => (
       <FloatingStagePill
       key={item}
       label={item}
       index={index}
       width={width}
       height = {height * 0.35}
       />
      ))}

      {/* Center CTA */}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => { setActiveIndex(1) }}
        onPressOut={onPress}
      >
        <View
          style={{
            width: width * 0.32,
            height: width * 0.32,
            borderRadius: 999,
            backgroundColor: "#111",
            borderWidth: 1,
            borderColor:
              "rgba(247,215,116,0.35)",
            shadowColor: "#D4AF37",
            shadowOpacity: 0.35,
            shadowRadius: 30,
            shadowOffset: {
              width: 0,
              height: 0,
            },

            elevation: 20,
          }}
        >
          <View className="flex-1 gap-2 justify-center items-center px-5">
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "800",
                letterSpacing: 2,
                fontSize: width / 32,
              }}
            >
              EXPLORE
            </Text>

            <Text
              style={{
                color: "#F7D774",
                fontWeight: "700",
                marginTop: 4,
                letterSpacing: 1,
                fontSize: width / 38,
              }}
            >
              STAGES
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      
    </View>
  );
}