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
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { User } from "lucide-react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import SpotlightIcon from "../custom/spotlightIcon";

export default function WelcomeToArena({
  onCreateArena  ,onScroll
}) {
  const {user} = useGlobalContext()
  const { width, height } = useWindowDimensions();

return (

<View
  style={{
    flex: 1,
    paddingBottom :40,
    backgroundColor: "#050505",
    overflow: "hidden",
  }} className ="justify-between w-full "  >

  {/* ================= MAIN CONTAINER ================= */}
  
  <View
    style={{
      flex: 1,
      paddingHorizontal: 8,
      // paddingTop: height * 0.029,
    }} >
  
        {/* ================= HERO ================= */}
  
    <View
          style={{
            alignItems: "center",
            // height: height * 0.25,
          }}
          className ="b g-white py-2 mb-4 justify-center" >
  
            <Text
              style={{
                marginTop: 18,
                color: "#fff",
                fontSize: width / 24,
                fontWeight: "900",
                letterSpacing: 1,
              }}  >
              CREATE YOUR ARENA
            </Text>

            <View
              style={{
                // backgroundColor: "#171717",
                justifyContent: "center",
                alignItems: "center",
              }} className ="mt-4"  >
              <MaterialCommunityIcons
                name="stadium"
                size={48}
                color="#EAB308"
              />
            </View>
  
          {/* <Text
            style={{
              color: "#AAA",
              fontWeight: "900",
              fontSize: width / 32,
              textAlign: "center",
            }}
          >
            Inspire The World.
          </Text> */}
  
    </View>
             

    <View
        style={{
          flex:1,
          backgroundColor: "#101010",
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.15)",
          marginBottom : 24,
          padding:24
        }}
        className = "justify-between w-full"  >
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
              size={28}
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
              size={28}
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
                width: height/8,
                height:height/8,
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
                height:height/8.5,
                width:height/8.5,
                borderRadius : 999
              }}
              />
            </View>
          </View>



           {/* YOUR JOURNEY */}
 

          <View
            style={{
              // flex: 1,
              justifyContent: "center",
              // paddingTop: 20,
            }}
            className = "w-full"  >

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  className = "w-full "  >

                  {[
                    {
                      icon: "movie-open-play",
                      title: "Create",
                      // text: "Upload amazing performances.",
                    },
                    {
                      icon: "account-group",
                      title: "Connect",
                      // text: "Build a loyal community.",
                    },
                    {
                      icon: "fire",
                      title: "Rise",
                      // text: "Reach Spotlight rankings.",
                    },
                  ].map((item) => (

                    <View
                      key={item.title}
                      style={{
                        width: "25%",
                        alignItems: "center",
                      }}
                    >

                      {/* Circle */}

                      <View
                        style={{
                          width: width/6,
                          height: width/6,
                          borderRadius: 999,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(234,179,8,0.08)",
                          borderWidth: 1,
                          borderColor: "rgba(234,179,8,0.18)",
                        }}
                      >

                        <MaterialCommunityIcons
                          name={item.icon}
                          size={width/18}
                          color="#EAB308"
                        />

                      </View>

                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "800",
                          marginTop: 14,
                          textAlign: "center",
                          fontSize: width / 32,
                        }}
                      >
                        {item.title}
                      </Text>

                      <Text
                        style={{
                          color: "#8B8B8B",
                          textAlign: "center",
                          marginTop: 8,
                          lineHeight: 18,
                          fontSize: width / 34,
                        }}
                      >
                        {item.text}
                      </Text>

                    </View>

                  ))}
                </View>
          </View>



          <View>
            <Text
              style={{
                // marginTop: 24,
                marginBottom : 6,
                textAlign: "center",
                color: "#FFFFFF",
                fontWeight: "900",
                fontSize: width / 22,
              }}
              // className ="mt-auto"
            >
              Your Arena
            </Text>

            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                // marginTop: 8,
                fontSize: width / 26,
                marginBottom : 6,
              }}  >
                Ready to welcome your first audience
            </Text>

            {/* Badge */}
            <TouchableOpacity
              onPress={onCreateArena}
              style={{
                // alignSelf: "center",
                marginTop: 12,
                backgroundColor: "rgba(234,179,8,0.9)",
                borderRadius: 9,
                paddingHorizontal: 24,
                paddingVertical: 14,
              }}
              className = "mt- auto flex-row justify-center gap-2 w-full items-center"
            >
              <Ionicons
                name="add"
                size={width/22}
                color="#111111"
              />
              <Text
                style={{
                  color: "#000",
                  fontWeight: "700",
                  fontSize: width / 25,
                }}  >
                Create Arena
              </Text>
            </TouchableOpacity>
          </View>
  
      </View>

     

    </View>

  </View>
);

}