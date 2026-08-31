import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import FloatingStagePill from "../custom/floatingStagePill";
import { STAGES } from "../../utilities/TypeData";
import { useGlobalContext } from "../../context/GlobalProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";




export default function StageDiscoveryFooter({width, height , onPress = () => {} } ) {
    const {setActiveIndex , user} = useGlobalContext()
  return (
    // <View
    //   style={{
    //     // height: height * 0.35,
    //     // width,
    //     marginBottom : height * 0.023
    //   }}
    //   className="justify-center flex-1 items-center overflow-hidden bg-[#000000]"
    // >
      
    //   <View
    //     style={{
    //       position: "absolute",
    //     //   width: width * 0.7,
    //     //   height: width * 0.7,
    //       padding : width/4 ,
    //       borderRadius: 999,
    //     //   backgroundColor:
    //     //     "rgba(212,175,55,0.18)",
    //     }}
    //     className ="items-center b g-gold/30 justify-center"
    //   />

    //   <View
    //     style={{
    //       position: "absolute",
    //     //   width: width * 0.55,
    //     //   height: width * 0.55,
    //       padding : width/4 ,
    //       borderRadius: 999,
    //       backgroundColor:
    //         "rgba(247,215,116,0.05)",
    //     }}
    //   />

    //   {/* Floating Stage Pills */}

    //   {STAGES.map((item, index) => (
    //    <FloatingStagePill
    //    key={item}
    //    label={item}
    //    index={index}
    //    width={width}
    //    height = {height * 0.35}
    //    />
    //   ))}

    //   {/* Center CTA */}

    //   <TouchableOpacity
    //     activeOpacity={0.9}
    //     onPress={() => { setActiveIndex(1) }}
    //     onPressOut={onPress}
    //   >
    //     <View
    //       style={{
    //         width: width * 0.32,
    //         height: width * 0.32,
    //         borderRadius: 999,
    //         backgroundColor: "#111",
    //         borderWidth: 1,
    //         borderColor:
    //           "rgba(247,215,116,0.35)",
    //         shadowColor: "#D4AF37",
    //         shadowOpacity: 0.35,
    //         shadowRadius: 30,
    //         shadowOffset: {
    //           width: 0,
    //           height: 0,
    //         },

    //         elevation: 20,
    //       }}
    //     >
    //       <View className="flex-1 gap-2 justify-center items-center px-5">
    //         <Text
    //           style={{
    //             color: "#FFFFFF",
    //             fontWeight: "800",
    //             letterSpacing: 2,
    //             fontSize: width / 32,
    //           }}
    //         >
    //           EXPLORE
    //         </Text>

    //         <Text
    //           style={{
    //             color: "#F7D774",
    //             fontWeight: "700",
    //             marginTop: 4,
    //             letterSpacing: 1,
    //             fontSize: width / 38,
    //           }}
    //         >
    //           STAGES
    //         </Text>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
      
    // </View>

    <View  
       
        style={{
          // marginTop: 16,
          flex:1,
          // width : width * 0.95 ,
          alignSelf : "center",
          backgroundColor: "#101010",
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.15)",
          // marginBottom : 24,
          padding:24
        }}
        className = "justify-between w-full"
      >
        <View
          style={{
            backgroundColor: "#171717",
            justifyContent: "center",
            alignItems: "center",
          }}
          className = "absolute top-2 left-2"
        >
          <MaterialCommunityIcons
            name="star-four-points"
            size={18}
            color="#EAB308"
          />
        </View>

        <View
          style={{
            backgroundColor: "#171717",
            justifyContent: "center",
            alignItems: "center",
          }}
          className = "absolute top-2 right-2"
        >
          <MaterialCommunityIcons
            name="star-four-points"
            size={18}
            color="#EAB308"
          />
        </View>

        {/* Banner */}
        <View
          style={{
            // backgroundColor: "#171717",
            justifyContent: "center",
            alignItems: "center",
            marginTop : 24
          }}
        >
          <MaterialCommunityIcons
            name="trophy"
            size={height/14}
            color="#EAB308"
          />
        </View>

        {/* Avatar */}

        {/* <View
          style={{
            alignItems: "center",
            marginTop: 12,
          }}   >
          <View
            style={{
              width: height/10,
              height:height/10,
              borderRadius: 999,
              backgroundColor: "#050505",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 3,
              borderColor: "#EAB308",
            }}
          >
            <Image
             source={{uri:user.profileImage.publicUrl}}
             resizeMethod="cover"
             style = {{
              height:height/10.5,
              width:height/10.5,
              borderRadius : 999
             }}
            />
          </View>
        </View> */}

        {/* Arena Name */}
        <Text
          style={{
            // marginTop: 24,
            marginBottom : 12,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: "900",
            fontSize: width / 25,
          }}
          className ="mt-auto"
        >
          Find Stage
        </Text>

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            // marginTop: 8,
            fontSize: width / 29,
            marginBottom : 12,
          }}  >
            Discover more stages , 
        </Text>

        {/* Badge */}
        <TouchableOpacity
        onPressOut={onPress}
           onPress={() =>{
             setActiveIndex(1)
          }}
          style={{
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: "rgba(234,179,8,0.9)",
            borderRadius: 9,
            paddingHorizontal: 24,
            paddingVertical: 14,
          }}
          className = "mt-auto w-full items-center"
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "700",
              fontSize: width / 28,
            }}
          >
            Discover Stages
          </Text>
        </TouchableOpacity>

      </View>
  );
}