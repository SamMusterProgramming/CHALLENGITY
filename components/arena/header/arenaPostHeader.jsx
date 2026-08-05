import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SpotlightIcon from "../../custom/spotlightIcon";


export default function ArenaPostHeader({
  item,
  width,
  setShowMenuPostId,
  showMenuPostId,
}) {

  const isLocalSpotlight = item?.localSpotlight?.spotlight;
  const isRegionalSpotlight = item?.regionalSpotlight?.spotlight;
  const isGlobalSpotlight = item?.globalSpotlight?.spotlight;
  const noSpotLight = isLocalSpotlight  || isRegionalSpotlight ||  isGlobalSpotlight 

  return (
    <View
      style={{
        // height: 52,
        // width : "100%" ,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className = "py-2 z-50 absolute bg-black/60 rounded-2xl  top-2 right-2 left-2"
    >

      {/* STATUS */}
      
      {noSpotLight ? (
        <View className="flex-row items-center gap-1 rounded-full bg-[#eab308]/10 px-1 py-1">
            <SpotlightIcon size={14} />
        </View>
        ):(
        <View className="flex-row items-center p-2 rounded-full bg-[#eab308]/20 ">
      
              <MaterialCommunityIcons
                name="chart-line"
                size={20}
                color="#fff"
              />
        </View>
      )}
   

      <View
        style={{
          flexDirection:"col",
          alignItems:"center",
          justifyContent : "center",
          flex:1,
        }} >

          <View className="flex-row  items-center ga p-2">

            {isLocalSpotlight && (
             <Text className="text-[#fffffd] text-[10px] font-bold">
                 LOCAL {' '}
             </Text>
            )}

          {isRegionalSpotlight && (
              <Text className="text-[#fffffd] text-[10px] font-bold">
                REGIONAL {' '}
              </Text>
          )}

          {isGlobalSpotlight && (
              <Text className="text-[#fffffd] text-[10px] font-bold">
                  GLOBAL {' '}
              </Text>
          )}
          {!noSpotLight && (
              <Text className="text-[#fffffd] text-[10px] font-bold">
                 Progressive performance {' '}
              </Text>
          )}

          </View>


        {/* CAPTION */}

        { item?.caption &&
        <View
          style={{
            // marginLeft:12,
            flex:1,
            paddingHorizontal:10,
            paddingVertical:2,
            borderRadius:2,
            backgroundColor:"rgba(255,255,255,0.04)",
            // borderWidth:1,
            // borderColor:"rgba(255,255,255,0.08)",
            justifyContent:"center",
          }} className ="text-center items-center "  >

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color:"#fff",
              fontSize:width/38,
              fontWeight:"600",
              fontStyle:"italic",
            }}
          >
           -- {item.caption} --
          </Text>

        </View>
        }

      </View>



      {/* MENU */}

      <TouchableOpacity

        activeOpacity={0.8}

        onPress={()=>{
          setShowMenuPostId(
            showMenuPostId === item._id
            ? null
            : item._id
          );
        }}

        style={{
       
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"rgba(0,0,0,0.45)",
          // borderWidth:1,
          // borderColor: "rgba(234,179,8,0.2)",
          marginLeft:8,
        }}
        className = "p-2 rounded-full" >

        <MaterialCommunityIcons
          name="dots-horizontal"
          size={23}
          color="#eab308"
        />

      </TouchableOpacity>

    </View>
  );
}