import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/GlobalProvider";

export default function NoArena() {
  const { width, height } = useWindowDimensions();


  return (
 
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
        className = "justify-center gap-6 w-full"
      >
        <View
          style={{
            backgroundColor: "#171717",
            justifyContent: "center",
            alignItems: "center",
            marginTop :24
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
          }}
        >
          <MaterialCommunityIcons
            name="stadium"
            size={height/18}
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
            marginBottom : 6,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: "900",
            fontSize: width / 25,
          }}
          className ="mt-20"
        >
          No Arena
        </Text>

        {/* <Text
          style={{
            color: "#fff",
            textAlign: "center",
            // marginTop: 8,
            fontSize: width / 29,
            marginBottom : 6,
          }}  >
            Ready to welcome your first audience
        </Text> */}

        {/* Badge */}
        {/* <TouchableOpacity
           onPress={() =>{
            setOpenArenaAlertModal(true)
            setArenaActionModal("create_arena")
            // setVisible(false)
          }}
          style={{
            alignSelf: "center",
            marginTop: 12,
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
            Create Arena
          </Text>
        </TouchableOpacity> */}

        

      </View>
  )
}