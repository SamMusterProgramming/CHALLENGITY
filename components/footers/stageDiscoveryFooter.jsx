// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from "react-native";

// import { LinearGradient } from "expo-linear-gradient";
// import FloatingStagePill from "../custom/floatingStagePill";
// import { STAGES } from "../../utilities/TypeData";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import { MaterialCommunityIcons } from "@expo/vector-icons";




// export default function StageDiscoveryFooter({width, height , onPress = () => {} } ) {
//     const {setActiveIndex , user} = useGlobalContext()
//   return (
//     <View  
//         style={{
//           // marginTop: 16,
//           flex:1,
//           // width : width * 0.95 ,
//           alignSelf : "center",
//           backgroundColor: "#101010",
//           borderRadius: 8,
//           overflow: "hidden",
//           borderWidth: 1,
//           borderColor: "rgba(234,179,8,0.15)",
//           // marginBottom : 24,
//           padding:24
//         }}
//         className = "justify-between w-full"
//       >
//         <View
//           style={{
//             backgroundColor: "#171717",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           className = "absolute top-2 left-2"
//         >
//           <MaterialCommunityIcons
//             name="star-four-points"
//             size={18}
//             color="#EAB308"
//           />
//         </View>

//         <View
//           style={{
//             backgroundColor: "#171717",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           className = "absolute top-2 right-2"
//         >
//           <MaterialCommunityIcons
//             name="star-four-points"
//             size={18}
//             color="#EAB308"
//           />
//         </View>

//         {/* Banner */}
//         <View
//           style={{
//             // backgroundColor: "#171717",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop : 24
//           }}
//         >
//           <MaterialCommunityIcons
//             name="trophy"
//             size={height/14}
//             color="#EAB308"
//           />
//         </View>

//         {/* Avatar */}

//         {/* <View
//           style={{
//             alignItems: "center",
//             marginTop: 12,
//           }}   >
//           <View
//             style={{
//               width: height/10,
//               height:height/10,
//               borderRadius: 999,
//               backgroundColor: "#050505",
//               justifyContent: "center",
//               alignItems: "center",
//               borderWidth: 3,
//               borderColor: "#EAB308",
//             }}
//           >
//             <Image
//              source={{uri:user.profileImage.publicUrl}}
//              resizeMethod="cover"
//              style = {{
//               height:height/10.5,
//               width:height/10.5,
//               borderRadius : 999
//              }}
//             />
//           </View>
//         </View> */}

//         {/* Arena Name */}
//         <Text
//           style={{
//             // marginTop: 24,
//             marginBottom : 12,
//             textAlign: "center",
//             color: "#FFFFFF",
//             fontWeight: "900",
//             fontSize: width / 25,
//           }}
//           className ="mt-auto"
//         >
//           Find Stage
//         </Text>

//         <Text
//           style={{
//             color: "#fff",
//             textAlign: "center",
//             // marginTop: 8,
//             fontSize: width / 29,
//             marginBottom : 12,
//           }}  >
//             Discover more stages , 
//         </Text>

//         {/* Badge */}
//         <TouchableOpacity
//         onPressOut={onPress}
//            onPress={() =>{
//              setActiveIndex(1)
//           }}
//           style={{
//             alignSelf: "center",
//             marginTop: 10,
//             backgroundColor: "rgba(234,179,8,0.9)",
//             borderRadius: 9,
//             paddingHorizontal: 24,
//             paddingVertical: 14,
//           }}
//           className = "mt-auto w-full items-center"
//         >
//           <Text
//             style={{
//               color: "#000",
//               fontWeight: "700",
//               fontSize: width / 28,
//             }}
//           >
//             Discover Stages
//           </Text>
//         </TouchableOpacity>

//       </View>
//   );
// }

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function StageDiscoveryFooter({
  width,
  height,
  onPress = () => {},
}) {
  const { setActiveIndex, user } = useGlobalContext();

  return (
    <View
      className="w-full flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#080808]"
      style={{
        alignSelf: "center",
        padding: 24,
      }}
    >
      {/* Ambient glow */}
      <View
        className="absolute rounded-full bg-yellow-500/5"
        style={{
          width: width * 0.85,
          height: width * 0.85,
          bottom: 20,
        }}
      />

      {/* Subtle corner sparks */}
      <View className="absolute left-5 top-5">
        <MaterialCommunityIcons
          name="star-four-points"
          size={22}
          color="#EAB308"
        />
      </View>

      <View className="absolute right-5 top-5">
        <MaterialCommunityIcons
          name="star-four-points"
          size={22}
          color="#EAB308"
        />
      </View>

      {/* CENTER CONTENT */}
      <View className="flex-1 items-center gap-4 justify-end">
        {/* Icon */}
        <View className="mb-7 items-center justify-center">
          <View className="h-[82px] w-[82px] items-center justify-center">
            <MaterialCommunityIcons
              name="trophy-outline"
              size={width / 8}
              color="#EAB308"
            />
          </View>
        </View>

        {/* Main message */}
        <Text
          className="text-center font-black text-white"
          style={{
            fontSize: width / 16,
            letterSpacing: -0.5,
          }}
        >
          Discover Your Stage
        </Text>

        <Text
          className="mt-3 max-w-[290px] text-center font-medium text-neutral-500"
          style={{
            fontSize: width / 30,
            lineHeight: width / 22,
          }}
        >
          Find new stages and discover where your talent belongs.
        </Text>

        {/* CTA */}
        <TouchableOpacity
          onPressOut={onPress}
          onPress={() => {
            setActiveIndex(1);
          }}
          activeOpacity={0.85}
          style={{
            width: width * 0.85,
          }}
          className="mt-8 h-[54px] w-full flex-row items-center justify-center rounded-xl bg-yellow-500"
        >
          <MaterialCommunityIcons
            name="compass-outline"
            size={21}
            color="#080808"
          />

          <Text
            className="ml-2 font-black text-[#080808]"
            style={{
              fontSize: width / 27,
            }}
          >
            Discover Stages
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom accent */}
      <View className="items-center pb-1">
        <View className="h-[2px] w-10 rounded-full bg-yellow-500/40" />
      </View>
    </View>
  );
}