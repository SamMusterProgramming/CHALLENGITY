// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   useWindowDimensions,
//   Image,
// } from "react-native";

// import {
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { User } from "lucide-react-native";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import SpotlightIcon from "../custom/spotlightIcon";

// export default function WelcomeToArena({
//   onCreateArena  ,onScroll
// }) {
//   const {user} = useGlobalContext()
//   const { width, height } = useWindowDimensions();

// return (

// <View
//   style={{
//     flex: 1,
//     paddingBottom :40,
//     backgroundColor: "#050505",
//     overflow: "hidden",
//   }} className ="justify-between w-full "  >

//   {/* ================= MAIN CONTAINER ================= */}
  
//   <View
//     style={{
//       flex: 1,
//       paddingHorizontal: 8,
//       // paddingTop: height * 0.029,
//     }} >
  
//         {/* ================= HERO ================= */}
  
//     <View
//           style={{
//             alignItems: "center",
//             // height: height * 0.25,
//           }}
//           className ="b g-white py-2 mb-4 justify-center" >
  
//             <Text
//               style={{
//                 marginTop: 18,
//                 color: "#fff",
//                 fontSize: width / 24,
//                 fontWeight: "900",
//                 letterSpacing: 1,
//               }}  >
//               CREATE YOUR ARENA
//             </Text>

//             <View
//               style={{
//                 // backgroundColor: "#171717",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }} className ="mt-4"  >
//               <MaterialCommunityIcons
//                 name="stadium"
//                 size={48}
//                 color="#EAB308"
//               />
//             </View>
  
//           {/* <Text
//             style={{
//               color: "#AAA",
//               fontWeight: "900",
//               fontSize: width / 32,
//               textAlign: "center",
//             }}
//           >
//             Inspire The World.
//           </Text> */}
  
//     </View>
             

//     <View
//         style={{
//           flex:1,
//           backgroundColor: "#101010",
//           borderRadius: 8,
//           overflow: "hidden",
//           borderWidth: 1,
//           borderColor: "rgba(234,179,8,0.15)",
//           marginBottom : 24,
//           padding:24
//         }}
//         className = "justify-between w-full"  >
//           <View
//             style={{
//               backgroundColor: "#171717",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             className = "absolute top-2 left-2"
//           >
//             <MaterialCommunityIcons
//               name="star-four-points"
//               size={28}
//               color="#EAB308"
//             />
//           </View>

//           <View
//             style={{
//               backgroundColor: "#171717",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             className = "absolute top-2 right-2"
//           >
//             <MaterialCommunityIcons
//               name="star-four-points"
//               size={28}
//               color="#EAB308"
//             />
//           </View>
       
//           {/* Avatar */}

//           <View
//             style={{
//               alignItems: "center",
//               marginTop: 12,
//             }}   >
//             <View
//               style={{
//                 width: height/8,
//                 height:height/8,
//                 borderRadius: 999,
//                 backgroundColor: "#050505",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderWidth: 3,
//                 borderColor: "#EAB308",
//               }}
//             >
//               <Image
//               source={{uri:user.profileImage.publicUrl}}
//               resizeMethod="cover"
//               style = {{
//                 height:height/8.5,
//                 width:height/8.5,
//                 borderRadius : 999
//               }}
//               />
//             </View>
//           </View>



//            {/* YOUR JOURNEY */}
 

//           <View
//             style={{
//               // flex: 1,
//               justifyContent: "center",
//               // paddingTop: 20,
//             }}
//             className = "w-full"  >

//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   className = "w-full "  >

//                   {[
//                     {
//                       icon: "movie-open-play",
//                       title: "Create",
//                       // text: "Upload amazing performances.",
//                     },
//                     {
//                       icon: "account-group",
//                       title: "Connect",
//                       // text: "Build a loyal community.",
//                     },
//                     {
//                       icon: "fire",
//                       title: "Rise",
//                       // text: "Reach Spotlight rankings.",
//                     },
//                   ].map((item) => (

//                     <View
//                       key={item.title}
//                       style={{
//                         width: "25%",
//                         alignItems: "center",
//                       }}
//                     >

//                       {/* Circle */}

//                       <View
//                         style={{
//                           width: width/6,
//                           height: width/6,
//                           borderRadius: 999,
//                           justifyContent: "center",
//                           alignItems: "center",
//                           backgroundColor: "rgba(234,179,8,0.08)",
//                           borderWidth: 1,
//                           borderColor: "rgba(234,179,8,0.18)",
//                         }}
//                       >

//                         <MaterialCommunityIcons
//                           name={item.icon}
//                           size={width/18}
//                           color="#EAB308"
//                         />

//                       </View>

//                       <Text
//                         style={{
//                           color: "#FFFFFF",
//                           fontWeight: "800",
//                           marginTop: 14,
//                           textAlign: "center",
//                           fontSize: width / 32,
//                         }}
//                       >
//                         {item.title}
//                       </Text>

//                       <Text
//                         style={{
//                           color: "#8B8B8B",
//                           textAlign: "center",
//                           marginTop: 8,
//                           lineHeight: 18,
//                           fontSize: width / 34,
//                         }}
//                       >
//                         {item.text}
//                       </Text>

//                     </View>

//                   ))}
//                 </View>
//           </View>



//           <View>
//             <Text
//               style={{
//                 // marginTop: 24,
//                 marginBottom : 6,
//                 textAlign: "center",
//                 color: "#FFFFFF",
//                 fontWeight: "900",
//                 fontSize: width / 22,
//               }}
//               // className ="mt-auto"
//             >
//               Your Arena
//             </Text>

//             <Text
//               style={{
//                 color: "#fff",
//                 textAlign: "center",
//                 // marginTop: 8,
//                 fontSize: width / 26,
//                 marginBottom : 6,
//               }}  >
//                 Ready to welcome your first audience
//             </Text>

//             {/* Badge */}
//             <TouchableOpacity
//               onPress={onCreateArena}
//               style={{
//                 // alignSelf: "center",
//                 marginTop: 12,
//                 backgroundColor: "rgba(234,179,8,0.9)",
//                 borderRadius: 9,
//                 paddingHorizontal: 24,
//                 paddingVertical: 14,
//               }}
//               className = "mt- auto flex-row justify-center gap-2 w-full items-center"
//             >
//               <Ionicons
//                 name="add"
//                 size={width/22}
//                 color="#111111"
//               />
//               <Text
//                 style={{
//                   color: "#000",
//                   fontWeight: "700",
//                   fontSize: width / 25,
//                 }}  >
//                 Create Arena
//               </Text>
//             </TouchableOpacity>
//           </View>
  
//       </View>

     

//     </View>

//   </View>
// );

// }

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function WelcomeToArena({ onCreateArena, onScroll , setShowArenaSelector}) {
  const { user ,setOpenArenaAlertModal,
    setArenaActionModal } = useGlobalContext();
  const { width, height } = useWindowDimensions();

  const profileImage = user?.profileImage?.publicUrl;
  const coverImage = user?.coverImage?.publicUrl;

  const heroHeight = height * 0.22;
  const avatarSize = Math.min(width * 0.23, 96);

  const journey = [
    {
      icon: "movie-open-play",
      title: "Create",
      description: "Showcase Talent.",
    },
    {
      icon: "account-group-outline",
      title: "Connect",
      description: "Build  audience.",
    },
    {
      icon: "fire",
      title: "Rise",
      description: "Earn spotlight.",
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "#05080A",
        width,
        marginBottom : height/16
        }}
        className = "justify-between flex-1 p -20"
      >
     
        
      <View
        style={{
          height: height * 0.22,
          width: "100%",
          backgroundColor: "#080B0D",
        }}
        className = "rounded-t-xl"  >
          {coverImage ? (
            <Image
              source={{ uri: coverImage }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
              className = "rounded-t-3xl"
              />
          ) : (
            <View className="absolute inset-0 bg-[#111111]" />
          )}

         <LinearGradient
              colors={[
                "rgba(0,0,0,0.02)",
                "rgba(0,0,0,0.04)",
                "rgba(3,6,7,0.20)",
                "rgba(3,6,7,0.68)",
                "#05080A",
              ]}
              locations={[0, 0.28, 0.52, 0.78, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />

          {/* Subtle atmospheric glow */}
          <View className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-yellow-500/10" />
          <View className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-yellow-500/5" />

          <View
          style={{
            position: "absolute",
            // width,
            bottom: 0,
            // left: 300,
            right: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:10
                }}    >
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowArenaSelector?.(true)}
                style={{
                  // height: 38,
                  paddingHorizontal: 23,
                  paddingVertical: 13,
                  borderRadius: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.55)",
                  // borderWidth: 1,
                  // borderColor: "rgba(255,255,255,0.18)",
                }}  >
                  <Text
                    style={{
                      color: "#F0F0F1",
                      fontSize:width/27,
                      fontWeight: "800",
                    }}
                  >
                    My Arenas
                  </Text>

                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={width/17}
                    color="#D6D6D8"
                    style={{
                      marginLeft: 5,
                    }}
                  />
                </TouchableOpacity>
          </View>

          {/* Profile image */}
         
            
          <View
          style={{
            position: "absolute",
            left: 20,
            bottom: -1,
            width: width/5,
            height: width /5,
            borderRadius: 48,
            padding: 3,
            backgroundColor: "#05080A",
            borderWidth: 1.5,
            borderColor: "#D9B83F",
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 45,
              overflow: "hidden",
              backgroundColor: "#101416",
            }}
          >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  resizeMode="cover"
                  className="rounded-full"
                  style={{
                   flex:1
                  }}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={avatarSize * 0.48}
                  color="#737373"
                />
              )}
              
            </View>
        </View>


        </View>

        {/* INTRO */}
        <View className="ite ms-center px-2 pt-5">
          {/* <View className="mb-3 flex-row items-center">
            <MaterialCommunityIcons
              name="star-four-points"
              size={13}
              color="#EAB308"
            />

            <Text className="mx-2 text-[10px] font-extrabold uppercase tracking-[2px] text-yellow-500">
              Your Arena starts here
            </Text>

            <MaterialCommunityIcons
              name="star-four-points"
              size={13}
              color="#EAB308"
            />
          </View> */}

          <Text
          style = {{
            fontSize : width /22
          }}
           className="te xt-center te xt-[25px] font-black leading-[33px] text-white">
            Build your Arena.
          </Text>

          <Text
           style = {{
            fontSize : width /22
           }}
           className="text -center te xt-[24px] font-black leading-[32px] text-yellow-500">
            Define your identity.
          </Text>

          <Text className="mt-4 max-w-[360px] text- center text-[15px] leading-[22px] text-neutral-400">
            Create your Arena to showcase your performances, grow your talent
            identity, and give your audience a place to follow your journey.
          </Text>
        </View>

        {/* JOURNEY */}
        <View className="mt- 9 px-2 flex-1 justify-center">

          <View className="mb-5 flex-row items-center">
            <View className="h-px flex-1 bg-white/10" />
              <Text 
               style = {{
                fontSize :width/38
              }}
              className="mx-4 text-[10px] font-bold uppercase tracking-[1.8px] text-neutral-500">
                Your journey
              </Text>
            <View className="h-px flex-1 bg-white/10" />
          </View>

          <View className="flex-row justify-between">
            {journey.map((item, index) => (
              <View
                key={item.title}
                className="flex-1 items-center"
                style={{
                  marginHorizontal: index === 1 ? 8 : 0,
                }}
              >
                <View className="p-4 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/[0.07]">
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={width/17}
                    color="#EAB308"
                  />
                </View>

                <Text
                style = {{
                  fontSize :width/32
                }}
                 className="mt-3 text-[14px] font-extrabold text-white">
                  {item.title}
                </Text>

                <Text className="mt-1 text-center text-[11px] leading-[16px] text-neutral-500">
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ARENA IDENTITY */}
        {/* <View className="mx-5 mt-9 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
          <LinearGradient
            colors={[
              "rgba(234,179,8,0.08)",
              "rgba(255,255,255,0.015)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0"
          />

          <View className="flex-row items-center px-5 py-4">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
              <MaterialCommunityIcons
                name="stadium-outline"
                size={20}
                color="#EAB308"
              />
            </View>

            <View className="flex-1">
              <Text className="text-[13px] font-bold text-white">
                Your Arena. Your identity.
              </Text>

              <Text className="mt-1 text-[11px] leading-[16px] text-neutral-500">
                One place for your performances, talent, and growing audience.
              </Text>
            </View>
          </View>
        </View> */}

        {/* CTA */}
        <View className="px-5 ">
          
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setOpenArenaAlertModal(true);
              setArenaActionModal("create_arena")
            }}
            style={{
              // height: 56,
              borderRadius: 14,
              backgroundColor: "#EAB308",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="p-4 w-full flex-row items-center justify-center rounded-3xl bg-yellow-500"
          >
            <View className="mr-4 p-1 items-center justify-center rounded-full bg-black/10">
              <Ionicons
                name="add"
                size={width/32}
                color="#111111"
              />
            </View>

            <Text 
             style={{
              marginLeft: 10,
              color: "#000",
              fontWeight: "900",
              fontSize: width/25,
              letterSpacing: 1.3,
            }}
            className="text-[16px] font-black text-[#111111]">
              Create Your Arena
            </Text>
          </TouchableOpacity>

          <View className="mt-3 flex-row items-center justify-center">
            <MaterialCommunityIcons
              name="creation"
              size={11}
              color="#525252"
            />
            <Text 
             style = {{
              fontSize :width/40
            }}
            className="mx-2 tex t-[10px] font-medium text-neutral-500">
              Your first step toward the spotlight
            </Text>
            <MaterialCommunityIcons
              name="creation"
              size={11}
              color="#525252"
            />
          </View>
        </View>
      {/* </ScrollView> */}
    </View>
  );
}