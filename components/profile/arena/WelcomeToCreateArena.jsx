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

export default function WelcomeToCreateArena({
   setOpenArenaAlertModal , setArenaActionModal
}) {
  const { width, height } = useWindowDimensions();
  const { user } = useGlobalContext()

  return (
  //   <View
  //     style={{
  //       // flex: 1,
  //       backgroundColor: "#050505",
  //     }}
  //   >

  //       <View
  //         style={{
  //           alignItems: "center",
  //           // paddingTop: height * 0.02,
  //           paddingHorizontal: 65,
  //         }}
  //       >
          

  //         <Text
  //           style={{
  //             color: "#eab308",
  //             fontSize: width / 20,
  //             fontWeight: "900",
  //             marginTop: 12,
  //             letterSpacing: 1,
  //           }}
  //         >
  //           YOUR ARENA
  //         </Text>

  //         <Text
  //           style={{
  //             color: "#FFFFFF",
  //             fontSize: width / 24,
  //             fontWeight: "900",
  //             textAlign: "center",
  //             marginTop: 8,
  //           //   lineHeight: 45,
  //           }}
  //         >
  //           Where Talent
  //         </Text>

  //         <Text
  //           style={{
  //             color: "#FFFFFF",
  //             fontSize: width / 24,
  //             fontWeight: "900",
  //             textAlign: "center",
  //             marginTop: 8,
  //           }}
  //         >
  //           Becomes Identity
  //         </Text>

  //         <Text
  //           style={{
  //             color: "#9CA3AF",
  //             textAlign: "center",
  //             marginTop: 20,
  //             lineHeight: 24,
  //             fontSize: width / 26,
  //           }}
  //         >
  //           Create your personal talent space,
  //           showcase your journey, build an
  //           audience, and let people discover
  //           what makes you unique.
  //         </Text>
  //       </View>

  //       <TouchableOpacity
  //         activeOpacity={0.9}
  //         onPress={() =>{
  //           setOpenArenaAlertModal(true)
  //           setArenaActionModal("create_arena")
  //           // setVisible(false)
  //         }}
  //         style={{
  //           marginHorizontal: 62,
  //           marginTop: 15,
  //           // height: 62,
  //           borderRadius: 12,
  //           backgroundColor:
  //             "#eab308",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //         className = "py-4"
  //       >
  //         <Text
  //           style={{
  //             color: "#000",
  //             fontWeight: "900",
  //             fontSize: width / 28,
  //           }}
  //         >
  //           Create My Arena
  //         </Text>
  //       </TouchableOpacity>

       
  //   </View>
  // );
  <View  
       
        style={{
          // marginTop: 16,
          flex:1,
          width : width * 0.95 ,
          alignSelf : "center",
          backgroundColor: "#101010",
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.15)",
          marginBottom : 24,
          padding:24
        }}
        className = "justify-between"
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
          }}
        >
          <MaterialCommunityIcons
            name="stadium"
            size={height/18}
            color="#EAB308"
          />
        </View>

        {/* Avatar */}

        <View
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
        </View>

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
          Your Arena
        </Text>

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            // marginTop: 8,
            fontSize: width / 29,
            marginBottom : 6,
          }}  >
            Ready to welcome your first audience
        </Text>

        {/* Badge */}
        <TouchableOpacity
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
        </TouchableOpacity>

        {/* <View
          style={{
            height: 1,
            backgroundColor: "rgba(255,255,255,0.08)",
            marginTop: 18,
          }}
        /> */}

      </View>
  )
}