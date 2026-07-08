import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function ArenaPostHeader({
  item,
  width,
  setShowMenuPostId,
  showMenuPostId,
}) {

  const isSpotlight = item?.spotlight;

  return (
    <View
      style={{
        height: 52,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >

      {/* STATUS */}

      <View
        style={{
          flexDirection:"row",
          alignItems:"center",
          flexShrink:1,
        }}
      >

        <View
          style={{
            flexDirection:"row",
            alignItems:"center",
            // paddingHorizontal:10,
            // height:32,
            borderRadius:8,
            // backgroundColor:
            //   isSpotlight
            //   ? "rgba(234,179,8,0.12)"
            //   : "rgba(255,255,255,0.05)",
            // borderWidth:1,

            // borderColor:
            //   isSpotlight
            //   ? "rgba(234,179,8,0.35)"
            //   : "rgba(255,255,255,0.1)",
          }}
        >

          <MaterialCommunityIcons
            name={
              isSpotlight
              ? "star-four-points"
              : "chart-line"
            }
            size={22}
            color={
              isSpotlight
              ? "#eab308"
              : "#9CA3AF"
            }
          />

          {/* <Text
            style={{
              marginLeft:6,
              color:
                isSpotlight
                ? "#eab308"
                : "#D1D5DB",
              fontSize:width/38,
              fontWeight:"800",
            }}
          >
            {
              isSpotlight
              ? "Spotlight"
              : "Performance"
            }
          </Text> */}

        </View>


        {/* CAPTION */}

        { item?.caption &&
        <View
          style={{
            marginLeft:12,
            flex:1,
            paddingHorizontal:10,
            paddingVertical:6,
            borderRadius:2,
            backgroundColor:"rgba(255,255,255,0.04)",
            // borderWidth:1,
            // borderColor:"rgba(255,255,255,0.08)",
            justifyContent:"center",
          }}  >

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color:"#B8B8B8",
              fontSize:width/32,
              fontWeight:"600",
              fontStyle:"italic",
            }}
          >
            {item.caption}
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
          // width:34,
          // height:34,
          borderRadius:8,
          justifyContent:"center",
          alignItems:"center",
          // backgroundColor:"rgba(255,255,255,0.05)",
          // borderWidth:1,
          // borderColor: "rgba(234,179,8,0.2)",
          marginLeft:8,
        }} >

        <MaterialCommunityIcons
          name="dots-vertical"
          size={23}
          color="#eab308"
        />

      </TouchableOpacity>

    </View>
  );
}