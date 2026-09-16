// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import SpotlightIcon from "../../custom/spotlightIcon";
// import NonSpotlightIcon from "../../custom/nonSpotlightIcon";


// export default function ArenaPostHeader({
//   item,
//   width,
//   setShowMenuPostId,
//   showMenuPostId,
// }) {

//   const isLocalSpotlight = item?.localSpotlight?.spotlight;
//   const isRegionalSpotlight = item?.regionalSpotlight?.spotlight;
//   const isGlobalSpotlight = item?.globalSpotlight?.spotlight;
//   const noSpotLight = isLocalSpotlight  || isRegionalSpotlight ||  isGlobalSpotlight 

//   return (
//     <View
//       style={{
//         // height: 52,
//         // width : "100%" ,
//         paddingHorizontal: 10,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//       className = "py-2 z-50 abso lute bg-black/60 round ed-2xl  top -2 rig ht-2 lef t-2"
//     >

//       {/* STATUS */}
      
    
//         <View className="flex-row items-center gap-1 rounded-full b g-[#eab308]/10 px-1 py-1">
//              {noSpotLight ? (
//             <SpotlightIcon size={15} />
//              ):(
//               <NonSpotlightIcon size={15} />
//             )}
//         </View>
      
   

//       <View
//         style={{
//           flexDirection:"col",
//           alignItems:"center",
//           justifyContent : "center",
//           flex:1,
//         }} >

//           <View className="flex-row  items-center ga p-2">

//             {isLocalSpotlight && (
//              <Text
//              style = {{
//               fontSize : width /32
//              }}
//              className="text-[#fffffd]  font-bold">
//                  LOCAL {' '}
//              </Text>
//             )}

//           {isRegionalSpotlight && (
//               <Text
//               style = {{
//                 fontSize : width /32
//               }}
//                className="text-[#fffffd]  font-bold">
//                 REGIONAL {' '}
//               </Text>
//           )}

//           {isGlobalSpotlight && (
//               <Text
//               style = {{
//                 fontSize : width /32
//               }}
//                className="text-[#fffffd]  font-bold">
//                   GLOBAL {' '}
//               </Text>
//           )}
//           {!noSpotLight && (
//               <Text
//               style = {{
//                 fontSize : width /32
//               }}
//                className="text-[#fffffd]  font-bold">
//                  Progressive performance {' '}
//               </Text>
//           )}

//           </View>


//         {/* CAPTION */}

//         { item?.caption &&
//         <View
//           style={{
//             // marginLeft:12,
//             flex:1,
//             paddingHorizontal:10,
//             paddingVertical:2,
//             borderRadius:2,
//             backgroundColor:"rgba(255,255,255,0.04)",
//             // borderWidth:1,
//             // borderColor:"rgba(255,255,255,0.08)",
//             justifyContent:"center",
//           }} className ="text-center items-center "  >

//           <Text
//             numberOfLines={1}
//             ellipsizeMode="tail"
//             style={{
//               color:"#fff",
//               fontSize:width/38,
//               fontWeight:"600",
//               fontStyle:"italic",
//             }}
//           >
//            -- {item.caption} --
//           </Text>

//         </View>
//         }

//       </View>



//       {/* MENU */}

//       <TouchableOpacity

//         activeOpacity={0.8}

//         onPress={()=>{
//           setShowMenuPostId(
//             showMenuPostId === item._id
//             ? null
//             : item._id
//           );
//         }}

//         style={{
       
//           justifyContent:"center",
//           alignItems:"center",
//           backgroundColor:"rgba(0,0,0,0.45)",
//           // borderWidth:1,
//           // borderColor: "rgba(234,179,8,0.2)",
//           marginLeft:8,
//         }}
//         className = "p-2 rounded-full" >

//         <MaterialCommunityIcons
//           name="dots-horizontal"
//           size={25}
//           color="#eab308"
//         />

//       </TouchableOpacity>

//     </View>
//   );
// }import React from "react";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SpotlightIcon from "../../custom/spotlightIcon";
import NonSpotlightIcon from "../../custom/nonSpotlightIcon";

export default function ArenaPostHeader({
  item,
  width,
  setShowMenuPostId,
  showMenuPostId,
}) {
  const isLocalSpotlight =
    item?.localSpotlight?.spotlight;

  const isRegionalSpotlight =
    item?.regionalSpotlight?.spotlight;

  const isGlobalSpotlight =
    item?.globalSpotlight?.spotlight;

  const isSpotlight =
    isLocalSpotlight ||
    isRegionalSpotlight ||
    isGlobalSpotlight;

    const spotlightTypes = [
      isLocalSpotlight && "LOCAL",
      isRegionalSpotlight && "REGIONAL",
      isGlobalSpotlight && "GLOBAL",
    ].filter(Boolean);
    
    const spotlightType =
      spotlightTypes.length > 0
        ? `${spotlightTypes.join(" - ")} SPOTLIGHT`
        : "PROGRESSIVE PERFORMANCEG";

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.68)",
      }}
      className="z-50"
    >
      {/* SPOTLIGHT ICON */}

      <View
        style={{
          // width: 28,
          // height: 28,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        {isSpotlight ? (
          <SpotlightIcon size={22} />
        ) : (
          <NonSpotlightIcon size={22} />
        )}
      </View>

      {/* PERFORMANCE INFO */}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          minWidth: 0,
          marginRight: 17,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: isSpotlight
              ? "#eab308"
              : "rgba(255,255,255,0.85)",
            fontSize: width / 42,
            fontWeight: "700",
            marginTop: 0,
          }}
        >
          {spotlightType}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: "#ffffff",
            fontSize: width / 39,
            fontWeight: "600",
          }}
          className = "mt-2"

        >
          {item?.caption || "Performance"}
        </Text>

        
      </View>

      {/* THREE BAR MENU */}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setShowMenuPostId(
            showMenuPostId === item._id
              ? null
              : item._id
          );
        }}
        style={{
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 6,
        }}
      >
        <View
          style={{
            width: 17,
            height: 2,
            backgroundColor: "#eab308",
            marginVertical: 2,
            borderRadius: 1,
          }}
        />
        <View
          style={{
            width: 17,
            height: 2,
            backgroundColor: "#eab308",
            marginVertical: 3,
            borderRadius: 1,
          }}
        />
        <View
          style={{
            width: 17,
            height: 2,
            backgroundColor: "#eab308",
            marginVertical: 2,
            borderRadius: 1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}