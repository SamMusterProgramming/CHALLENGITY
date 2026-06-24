


// import React, { useEffect, useState } from "react";
// import {
// View,
// Text,
// Image,
// TouchableOpacity,
// FlatList,
// ScrollView,
// useWindowDimensions,
// } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import { router, useLocalSearchParams } from "expo-router";
// import { getArenaByUser, getPostsArena } from "../apiCalls";

// import { useGlobalContext } from "../context/GlobalProvider";
// import ArenaPost from "../components/arena/arenaPost";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import ViewArenaPost from "../components/viewArenas/viewArenaPost";
// import { ViewArenaHeader } from "../components/viewArenas/viewArenaHeader";

// export default function ViewProfile() {
// const { userProfile } = useLocalSearchParams();
// const { user } = useGlobalContext();
// const {width ,height} = useWindowDimensions()
// const insets = useSafeAreaInsets();

// const profile = userProfile
// ? JSON.parse(userProfile)
// : null;

// const [arenas, SetArenas] = useState([]);
// const [selectedArena, setSelectedArena] =
// useState(null);

// const [arenaPosts, setArenaPosts] =
// useState([]);

// useEffect(() => {
// if (!profile?._id) return;


// getArenaByUser(
//   profile._id,
//   setSelectedArena,
//   SetArenas
// );


// }, []);

// useEffect(() => {
// if (!selectedArena) return;

// getPostsArena(
//   selectedArena._id,
//   setArenaPosts
// );


// }, [selectedArena]);

// return (
//   <View
//   style={{
//     flex:1,
//     width:"100%",
//     backgroundColor:"#000",
//     paddingTop:insets.top,
//     }}>
//        <TouchableOpacity
//           onPress={() => router.back()}
//           activeOpacity={0.85}
//           style={{
//             position: "absolute",
//             top: 55,
//             left: 18,
//             zIndex: 999,
//             width: 42,
//             height: 42,
//             borderRadius: 21,
//             backgroundColor: "rgba(0,0,0,0.75)",
//             borderWidth: 1,
//             borderColor: "rgba(234,179,8,0.25)",
//             justifyContent: "center",
//             alignItems: "center",
//           }}  >
//           <MaterialCommunityIcons
//             name="close"
//             size={20}
//             color="#eab308"
//           />
//       </TouchableOpacity>
//     <FlatList
//     data={arenaPosts.length && arenaPosts}
//     keyExtractor={(item) => item._id}
//     showsVerticalScrollIndicator={false}
//     // renderItem={({ item }) => ( 
//     //       <ViewArenaPost
//     //       item={item}
//     //       arena={selectedArena}
//     //       onPress={(post) => {
//     //         router.push({
//     //             pathname:
//     //               "/arenaPerformancePlayer",
//     //             params: {
//     //               selectedPostId: post._id,
//     //               arenaPosts: JSON.stringify(arenaPosts),
//     //             },
//     //           });
//     //       }}
//     //       profile ={profile}
//     //       />
//     // )}
//     ListHeaderComponent={() => {
//       console.log("HEADER FUNCTION");
//     return (
//     <>
//               <View
//                 style={{
//                   height: 220,
//                   width: "100%",
//                 }}
//                 className ="w-full"
//               >
//                 <Image
//                   source={{
//                     uri:
//                       profile?.coverImage
//                         ?.publicUrl,
//                   }}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                   }}
//                 />
              
//               </View>

//               {/* PROFILE */}

//               <View
//                 className="items-center"
//                 style={{
//                   marginTop: -50,
//                 }}
//               >
//                 <Image
//                   source={{
//                     uri:
//                       profile?.profileImage
//                         ?.publicUrl,
//                   }}
//                   style={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: 50,
//                     borderWidth: 3,
//                     borderColor: "#eab308",
//                     backgroundColor: "#111",
//                   }}
//                 />

//                 <Text
//                   style={{
//                     color: "#fff",
//                     fontSize: 15,
//                     fontWeight: "700",
//                     marginTop: 14,
//                   }}
//                 >
//                   {profile?.name}
            
//                 </Text>

//                 {!!profile?.biography && (
//                   <Text
//                     style={{
//                       color:
//                         "rgba(255,255,255,0.65)",
//                       textAlign: "center",
//                       marginTop: 8,
//                       paddingHorizontal: 24,
//                     }}
//                   >
//                     {profile.biography}
//                   </Text>
//                 )}

//                 {profile?._id !== user?._id && (
//                   <TouchableOpacity
//                     style={{
//                       marginTop: 20,
//                       backgroundColor:
//                         "#eab308",
//                       paddingHorizontal: 25,
//                       height: 42,
//                       borderRadius: 12,
//                       justifyContent:
//                         "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "#000",
//                         fontWeight: "700",
//                       }}
//                     >
//                       Add Friend
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>

//               {/* ARENAS */}

//               <ViewArenaHeader
//                 arenas={arenas}
//                 selectedArena={selectedArena}
//                 // arenaIndex={arenaIndex}
//                 setSelectedArena={setSelectedArena}
//                 width ={width}
//               />

//               {/* POSTS TITLE */}

//               <Text
//                 style={{
//                   color: "#fff",
//                   fontSize: width/29,
//                   fontWeight: "700",
//                   // letterSpacing: 2,
//                   marginTop: 30,
//                   marginBottom: 12,
//                   marginLeft: 18,
//                 }}
//               >
//                 PERFORMANCES
//               </Text>

//               {selectedArena &&
//                 arenaPosts.length === 0 && (
//                   <View
//                     style={{
//                       marginHorizontal:
//                         16,
//                       backgroundColor:
//                         "#111",
//                       borderRadius: 18,
//                       padding: 24,
//                       borderWidth: 1,
//                       borderColor:
//                         "rgba(234,179,8,0.12)",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color:
//                           "rgba(255,255,255,0.7)",
//                         textAlign: "center",
//                       }}
//                     >
//                       No performances have
//                       been published in this
//                       arena yet.
//                     </Text>
//                   </View>
//                 )}
//             </>
//           );
//         }}
//         ListFooterComponent={() => (
//           <View
//             style={{
//               height: 40,
//             }}
//           />
//         )}
//       />
//   </View>

// );
// }


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getArenaByProfile, getArenaByUser, getPostsArena, toggleFollowerArena, toggleStarArena } from "../apiCalls";
import { useGlobalContext } from "../context/GlobalProvider";

import ViewArenaPost from "../components/viewArenas/viewArenaPost";
import { ViewArenaHeader } from "../components/viewArenas/viewArenaHeader";
import FriendButton from "../components/custom/FriendButton";
import FollowButton from "../components/custom/FollowButton";
import { useLoading } from "../context/loadingContext";
import AuthLoadingScreen from "../components/auth/authLoadingScreen";

export default function ViewProfile() {
  const { userProfile , userId , arena_id} = useLocalSearchParams();
  const { user } = useGlobalContext();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { showLoading, hideLoading } = useLoading();
  const profile = userProfile
    ? JSON.parse(userProfile)
    : null;
  const [arenas, SetArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);
  const [arenaPosts, setArenaPosts] = useState([]);

  useEffect(() => {
    if (!profile?._id) return;
    getArenaByProfile( profile._id,  setSelectedArena, SetArenas , arena_id);
  }, []);

  useEffect(() => {
    if (!selectedArena) return;
    // getPostsArena( selectedArena._id, setArenaPosts);
    setArenaPosts(selectedArena.posts)
  }, [selectedArena]);

  const listData = [
    {
      type: "profileArena",
    },
    ...(selectedArena &&
    arenaPosts.length === 0
      ? [
          {
            type: "emptyPosts",
          },
        ]
      : arenaPosts.map((post) => ({
          type: "arenaPost",
          data: post,
        }))),
  ];

  const toggleStar = async () => {
    const updatedArena =
      await toggleStarArena(
        selectedArena._id,
        { userId: user._id }
      );
    const newArena = selectedArena;
    newArena.stars = updatedArena.stars
    setSelectedArena(newArena);
    SetArenas(prev =>
      prev.map(arena =>
        arena._id === updatedArena._id
          ? newArena
          : arena
      )
    );
  };

  const toggleFollower = async () => {
    const updatedArena =
      await toggleFollowerArena(
        selectedArena._id,
        { userId: user._id }
      );
    const newArena = selectedArena;
    newArena.followers = updatedArena.followers
    setSelectedArena(newArena);
    SetArenas(prev =>
      prev.map(arena =>
        arena._id === updatedArena._id
          ? newArena
          : arena
      )
    );
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "profileArena":
        return (
          <>
            {/* COVER */}
            <View
              style={{
                height: 220,
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri:
                    profile?.coverImage
                      ?.publicUrl,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>

            {/* PROFILE */}

            <View
              style={{
                alignItems: "center",
                marginTop: -50,
              }}
            >
              <Image
                source={{
                  uri:
                    profile?.profileImage
                      ?.publicUrl,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: "#eab308",
                  backgroundColor: "#111",
                }}
              />

              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "700",
                  marginTop: 14,
                }}
              >
                {profile?.name}
              </Text>

              {!!profile?.biography && (
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.65)",
                    textAlign: "center",
                    marginTop: 8,
                    paddingHorizontal: 24,
                  }}
                >
                  {profile.biography}
                </Text>
              )}

              {profile?._id !== user?._id && (
                <View 
                className ="flex-row w-full">
                  <View
                    style={{
                      marginTop: 20,
                      // paddingHorizontal: 5,
                      // height: 42,
                      // borderRadius: 12,
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                        width : width /3
                    }}
                    className = "flex-row" >
                        <FriendButton userProfile={profile} />
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      // paddingHorizontal: 5,
                      // height: 42,
                      // borderRadius: 12,
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                        width : width /3
                    }}
                    className = "flex-row" >
                        <FollowButton userProfile={profile} />
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      // paddingHorizontal: 5,
                      // height: 42,
                      // borderRadius: 12,
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                        width : width /3
                    }}
                    className = "flex-row" >
                        <FollowButton userProfile={profile} />
                  </View>
               </View>
              )}
            </View>

            {/* EMPTY ARENAS */}

            {arenas.length === 0 ? (
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 25,
                  backgroundColor: "#111",
                  borderRadius: 18,
                  padding: 24,
                  borderWidth: 1,
                  borderColor:
                    "rgba(234,179,8,0.12)",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "700",
                    marginBottom: 8,
                  }}
                >
                  No Arenas Yet
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.65)",
                    textAlign: "center",
                  }}
                >
                  This user has not
                  created any arenas yet.
                </Text>
              </View>
            ) : (
              <>
               <ViewArenaHeader
                arenas = {arenas}
                selectedArena = {selectedArena}
                setSelectedArena = {setSelectedArena}
                width = {width}
                toggleStar = {toggleStar}
                toggleFollower={toggleFollower}
               />
               <Text
                  style={{
                    color: "#fff",
                    fontSize: width / 29,
                    fontWeight: "700",
                    marginTop: 30,
                    marginBottom: 12,
                    marginLeft: 18,
                  }} >
                PERFORMANCES
               </Text>
              </>
            )}
            </>
        );
      case "arenaPost":
        return (
          <ViewArenaPost
            item={item.data}
            arena={selectedArena}
            profile={profile}
            onPress={(post) => {
              router.push({
                pathname:
                  "/arenaPerformancePlayer",
                params: {
                  selectedPostId:
                    post._id,
                  arenaPosts:
                    JSON.stringify(
                      arenaPosts
                    ),
                  arena : JSON.stringify(
                    selectedArena
                  )
                },
              });
            }}
          />
        );
      case "emptyPosts":
        return (
          <View
            style={{
              marginHorizontal: 16,
              backgroundColor: "#111",
              borderRadius: 18,
              padding: 24,
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.12)",
            }}
          >
            <Text
              style={{
                color:
                  "rgba(255,255,255,0.7)",
                textAlign: "center",
              }}
            >
              No performances have
              been published in this
              arena yet.
            </Text>
          </View>
        );

      default:
        return null;
    }
  };


  if(!selectedArena){
    return  <AuthLoadingScreen />
  } 

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
        paddingTop: insets.top,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          router.back()
        }
        activeOpacity={0.85}
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          zIndex: 999,
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor:
            "rgba(0,0,0,0.75)",
          borderWidth: 1,
          borderColor:
            "rgba(234,179,8,0.25)",
          justifyContent:
            "center",
          alignItems: "center",
          }} >
        <MaterialCommunityIcons
          name="close"
          size={20}
          color="#eab308"
        />
      </TouchableOpacity>

      <FlatList
        data={listData}
        extraData={selectedArena}
        renderItem={renderItem}
        showsVerticalScrollIndicator={
          false
        }
        keyExtractor={(
          item,
          index
        ) => {
          switch (item.type) {
            case "profileArena":
              return "profileArena";
            case "emptyPosts":
              return "emptyPosts";
            case "arenaPost":
              return item.data._id;
            default:
              return String(index);
          }
        }}
        ListFooterComponent={() => (
          <View
            style={{
              height: 40,
            }}
          />
        )}
      />
    </View>
  );
}