import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function PostFooter({
  width,
  views = 0,
  fires = 0,
  comments = 0,
  shares = 0,
  hasFired,
  toggleFire,
  onComments,
  onShare,
  onReport,
}) {


  return (

    <View
      style={{
   
        borderRadius:16,
        // backgroundColor:"rgba(8,8,8,0.86)",
        // borderWidth:1,
        // borderColor: "rgba(234,179,8,0.20)",
        paddingHorizontal:14,
        paddingVertical:12,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
      }}
      className = "w- [100%] absolute bottom-2 bg-black/60 left-2 right-2"
    >


      {/* VIEWS */}
      <View
        style={{
          flexDirection:"row",
          alignItems:"center",
        }}
      >
        <MaterialCommunityIcons
          name="eye"
          size={23}
          color="#eab308"
        />
        <Text
          style={{
            marginLeft:5,
            color:"#E5E5E5",
            fontSize:width/40,
            fontWeight:"700",
          }}
        >
          {views}
        </Text>
      </View>

      {/* FIRE */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={toggleFire}
        style={{
          flexDirection:"row",
          alignItems:"center",
        }}
      >

        {/* <Text
            style={{
                fontSize: width/15,
                color: hasFired ? "#eab308" : "#eab308",
                fontWeight: "900",
                }} >
                {hasFired ? "✦" : "✧"}
        </Text> */}
        <MaterialCommunityIcons
                    name="fire"
                    size={width/13}
                    color= {hasFired ? "#eab308" : "#fff"}
                />
        <Text
          style={{
            marginLeft:5,
            color:
              hasFired
              ?
              "#E5E5E5"
              :
              "#E5E5E5",
            fontSize:width/40,
            fontWeight:"800",
          }}
        >
          {fires}
        </Text>
      </TouchableOpacity>

      {/* COMMENTS */}

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onComments}
        style={{
          flexDirection:"row",
          alignItems:"center",
        }}
      >

      <Ionicons
            name="chatbubble"
            size={20}
            color="#eab308"
      />
        <Text
          style={{
            marginLeft:5,
            color:"#E5E5E5",
            fontSize:width/40,
            fontWeight:"700",
          }}
        >
          {comments}
        </Text>
      </TouchableOpacity>

      {/* SHARE */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onShare}
        style={{
          flexDirection:"row",
          alignItems:"center",
        }}

      >
        <MaterialCommunityIcons
          name="share"
          size={28}
          color="#eab308"
        />
        <Text
          style={{
            marginLeft:5,
            color:"#E5E5E5",
            fontSize:width/40,
            fontWeight:"700",
          }}

        >
          {shares}

        </Text>


      </TouchableOpacity>




      {/* REPORT */}

      {/* <TouchableOpacity

        activeOpacity={0.75}

        onPress={onReport}

        style={{
          flexDirection:"row",
          alignItems:"center",
        }}

      >

        <MaterialCommunityIcons

          name="flag-outline"

          size={20}

          color="#9CA3AF"

        />

      </TouchableOpacity> */}


    </View>

  );
}