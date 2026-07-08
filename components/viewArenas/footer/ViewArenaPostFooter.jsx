import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function ViewArenaPostFooter({
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
        // position:"absolute",
        // bottom:8,
        // left:10,
        // right:10,
        borderRadius:16,
        backgroundColor:"rgba(8,8,8,0.86)",
        // borderWidth:1,
        // borderColor: "rgba(234,179,8,0.20)",
        paddingHorizontal:14,
        paddingVertical:12,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
      }}
    >


      {/* VIEWS */}

      <View
        style={{
          flexDirection:"row",
          alignItems:"center",
        }}
      >

        <MaterialCommunityIcons
          name="eye-outline"
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

        <MaterialCommunityIcons

          name={
            hasFired
            ?
            "star-four-points"
            :
            "star-four-points-outline"
          }

          size={21}

          color={
            hasFired
            ?
            "#eab308"
            :
            "#9CA3AF"
          }

        />


        <Text

          style={{

            marginLeft:5,

            color:
              hasFired
              ?
              "#eab308"
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

        <MaterialCommunityIcons
          name="message-outline"
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
          size={21}
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

      <TouchableOpacity

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

      </TouchableOpacity>


    </View>

  );
}