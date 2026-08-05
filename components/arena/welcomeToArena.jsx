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
import { User } from "lucide-react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import SpotlightIcon from "../custom/spotlightIcon";

export default function WelcomeToArena({
  onCreateArena,onScroll
}) {
  const {user} = useGlobalContext()
  const { width, height } = useWindowDimensions();

  // return (
  //   <View
  //     style={{
  //       flex:1,
  //       height :height,
  //       backgroundColor: "#050505",
  //     }}
  //     className ="justify-between flex-col"
  //   >
   

  //       <View
  //         style={{
  //           alignItems: "center",
  //           paddingTop: height * 0.02,
  //           paddingHorizontal: 25,
  //         }}
  //       >
  //         <View
  //           style={{
  //             width: 60,
  //             height: 60,
  //             borderRadius: 999,
  //             backgroundColor:
  //               "rgba(234,179,8,0.08)",
  //             justifyContent:
  //               "center",
  //             alignItems: "center",
  //             borderWidth: 1,
  //             borderColor:
  //               "rgba(234,179,8,0.15)",
  //           }}
  //           className = "absolute top-2 left-5"
  //         >
  //           <MaterialCommunityIcons
  //             name="star-four-points"
  //             size={32}
  //             color="#eab308"
  //           />

  //         </View>

  //         <View
  //           style={{
  //             width: 60,
  //             height: 60,
  //             borderRadius: 999,
  //             backgroundColor:
  //               "rgba(234,179,8,0.08)",
  //             justifyContent:
  //               "center",
  //             alignItems: "center",
  //             borderWidth: 1,
  //             borderColor:
  //               "rgba(234,179,8,0.15)",
  //           }}
  //           className = "absolute top-2 right-5"
  //         >
  //           <MaterialCommunityIcons
  //             name="star-four-points"
  //             size={32}
  //             color="#eab308"
  //           />

  //         </View>

  //         <Text
  //           style={{
  //             color: "#eab308",
  //             fontSize: width / 18,
  //             fontWeight: "900",
  //             marginTop: 10,
  //             letterSpacing: 2,
  //           }}
         
  //         >
  //           YOUR ARENA
  //         </Text>

  //         <Text
  //           style={{
  //             color: "#FFFFFF",
  //             fontSize: width / 22,
  //             fontWeight: "900",
  //             textAlign: "center",
  //             marginTop: 0,
  //             lineHeight: 45,
  //           }}
  //         >
  //           Where Talent
  //         </Text>

  //         <Text
  //           style={{
  //             color: "#FFFFFF",
  //             fontSize: width / 22,
  //             fontWeight: "900",
  //             textAlign: "center",
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
  //             fontSize: width / 28,
  //           }}
  //         >
  //           Create your personal talent space,
  //           showcase your journey, build an
  //           audience, and let people discover
  //           what makes you unique.
  //         </Text>
  //       </View>

  //       {/* BENEFITS */}

  //       <View
  //         style={{
  //           // marginTop: 40,
  //           paddingHorizontal: 18,
  //           flex:1
  //         }}
  //         className ="items-center justify-center"
  //       >
  //         {[
  //           "Share talent-focused content",
  //           // "Build your followers",
  //           "Create your personal brand",
  //           // "Receive support and feedback",
  //           // "Showcase achievements",
  //           "Earn Spotlight recognition",
  //         ].map((item) => (
  //           <View
  //             key={item}
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               marginBottom: 16,
  //               backgroundColor:
  //                 "#111214",
  //               borderRadius: 18,
  //               paddingVertical: 14,
  //               paddingHorizontal: 16,
  //               borderWidth: 1,
  //               borderColor:
  //                 "rgba(234,179,8,0.08)",
  //             }}
  //             className = "justify-center"
  //           >
  //             <MaterialCommunityIcons
  //               name="check-circle"
  //               size={20}
  //               color="#eab308"
  //             />

  //             <Text
  //               style={{
  //                 color: "#FFFFFF",
  //                 marginLeft: 12,
  //                 fontSize: width / 27,
  //                 fontWeight: "600",
  //               }}
  //             >
  //               {item}
  //             </Text>
  //           </View>
  //         ))}
  //       </View>



  //       <View
  //         style={{
  //           alignItems: "center",
  //           // marginTop: 35,
  //           paddingHorizontal: 30,
  //         }}
  //          className = "mt-auto flex-1 mb-4"   >
  //           <Text
  //             style={{
  //               color: "#FFFFFF",
  //               fontWeight: "800",
  //               fontSize: width / 19,
  //               textAlign: "center",
  //             }}
  //           >
  //             Your Journey Starts Here
  //           </Text>

  //           <Text
  //             style={{
  //               color: "#9CA3AF",
  //               textAlign: "center",
  //               marginTop: 10,
  //               lineHeight: 22,
  //               fontSize: width / 28,
  //             }}
  //           >
  //             Create your first Arena and
  //             begin building your presence
  //             within the Itri community.
  //           </Text>
  //           <TouchableOpacity
  //             activeOpacity={0.9}
  //             onPress={onCreateArena}
  //             style={{
  //               marginHorizontal: 22,
  //               marginTop: 30,
  //               height: 62,
  //               borderRadius: 20,
  //               backgroundColor: "#eab308",
  //               justifyContent: "center",
  //               alignItems: "center",
                
  //             }}  className = "w-full"  >
  //             <Text
  //               style={{
  //                 color: "#000",
  //                 fontWeight: "900",
  //                 fontSize: width / 22,
  //               }}
  //             >
  //               Create My Arena
  //             </Text>
  //          </TouchableOpacity>
  //       </View>

  //   </View>
  // );
  return (
    <View
      style={{
        flex: 1,
        paddingBottom :60,
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
      className ="justify-between "
    >
  
      {/* ================= BACKGROUND ================= */}
  
      {/* <View
        style={{
          position: "absolute",
          width: width,
          height: width,
          borderRadius: 999,
          backgroundColor: "rgba(234,179,8,0.08)",
          top:  -width/2,
          alignSelf: "center",
        }}
      />
   */}
      {/* <View
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: 999,
          backgroundColor: "rgba(234,179,8,0.04)",
          bottom: -80,
          left: -60,
        }}
      /> */}
  
      {/* <View
        style={{
          position: "absolute",
          width: 170,
          height: 170,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.93)",
          top: height * 0.38,
          right: -40,
        }}
      /> */}
  
      {/* ================= MAIN CONTAINER ================= */}
  
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          // paddingTop: height * 0.029,
        }}
      >
  
        {/* ================= HERO ================= */}
  
        <View
          style={{
            alignItems: "center",
            // height: height * 0.25,
          }}
          className ="b g-white py-2 justify-center"
        >
  
          {/* Spotlight */}
  
          {/* <SpotlightIcon size ={24} /> */}
  
          <Text
            style={{
              marginTop: 18,
              color: "#fff",
              fontSize: width / 24,
              fontWeight: "900",
              letterSpacing: 1,
            }}
          >
            CREATE YOUR ARENA
          </Text>
  
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "900",
              fontSize: width / 22,
              textAlign: "center",
            }}
          >
            {/* Inspire The World. */}
          </Text>
  
        </View>
             

      <View
        style={{
          // marginTop: 16,
          flex:1,
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
            size={68}
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

        {/* Arena Name */}
        <Text
          style={{
            // marginTop: 24,
            marginBottom : 6,
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: "900",
            fontSize: width / 22,
          }}
          className ="mt-auto"
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
              fontSize: width / 25,
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

     
      {/* YOUR JOURNEY */}
 

      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          // paddingTop: 20,
        }}
        className = "w-full"
      >

        {/* <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "900",
            fontSize: width / 18,
            textAlign: "center",
            marginBottom: 26,
          }}
        >
          Your Journey Begins Here
        </Text> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          className = "w-full"
        >

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
                width: "31%",
                alignItems: "center",
              }}
            >

              {/* Circle */}

              <View
                style={{
                  width: height/12,
                  height: height/12,
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
                  size={34}
                  color="#EAB308"
                />

              </View>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "800",
                  marginTop: 14,
                  textAlign: "center",
                  fontSize: width / 28,
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


    </View>

  </View>
);

}