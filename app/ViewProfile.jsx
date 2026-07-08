


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   useWindowDimensions,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { router, useLocalSearchParams } from "expo-router";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { getArenaByProfile, getArenaByUser, getPostsArena, toggleFollowerArena, toggleStarArena } from "../apiCalls";
// import { useGlobalContext } from "../context/GlobalProvider";

// import ViewArenaPost from "../components/viewArenas/viewArenaPost";
// import { ViewArenaHeader } from "../components/viewArenas/viewArenaHeader";
// import FriendButton from "../components/custom/FriendButton";
// import FollowButton from "../components/custom/FollowButton";
// import { useLoading } from "../context/loadingContext";
// import AuthLoadingScreen from "../components/auth/authLoadingScreen";

// export default function ViewProfile() {
//   const { userProfile , userId , arena_id} = useLocalSearchParams();
//   const { user } = useGlobalContext();
//   const { width } = useWindowDimensions();
//   const insets = useSafeAreaInsets();
//   const { showLoading, hideLoading } = useLoading();
//   const profile = userProfile
//     ? JSON.parse(userProfile)
//     : null;
//   const [arenas, setArenas] = useState([]);
//   const [selectedArena, setSelectedArena] = useState(null);
//   const [arenaPosts, setArenaPosts] = useState([]);
//   const [playerPosts, setPlayerPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);


//   useEffect(() => {
//     if (!profile?._id) return;
//     getArenaByProfile( profile._id,{requesterId:user._id} ,setSelectedArena, setArenas , arena_id);
//   }, []);


//   useEffect(() => {
//     if (!selectedArena) return;
//       // getPostsArena( selectedArena._id, setArenaPosts);
//       setArenaPosts(selectedArena.posts)
//   }, [selectedArena]);

//   useEffect(() => {
//     if (!selectedPost || !selectedArena) return;
//     const posts = selectedArena.posts
//     let refactoredPosts = []
//     posts.map((p) => {
//         let post = {...p, 
//         owner_id : selectedArena.owner_id ,
//         arena_id : selectedArena._id ,
//         arenaName :selectedArena.arenaName ,
//         talentType : selectedArena.talentType ,
//         region : selectedArena.region ,
//         profileImage : selectedArena.profileImage
//       }      
//       refactoredPosts.push(post)
//     } )
    
//     const updatedPosts = [
//         refactoredPosts.find(p => p._id.toString() === selectedPost._id.toString()),
//         ...refactoredPosts.filter(p => p._id.toString() !== selectedPost._id.toString()),
//       ];
//     setPlayerPosts(updatedPosts)
//   }, [selectedPost]);

 
//   useEffect(() => {
//       if (!selectedPost) return;
//       router.push({
//         pathname:
//           "/arenaPerformancePlayer",
//         params: {
//           selectedPostId:
//             selectedPost._id,
//           arenaPosts:
//             JSON.stringify(
//               playerPosts
//             ),
//           arena : JSON.stringify(
//             []
//           )
//         },
//       });
//   }, [playerPosts])
  
//   const listData = [
//     {
//       type: "profileArena",
//     },
//     ...(selectedArena &&
//     arenaPosts.length === 0
//       ? [
//           {
//             type: "emptyPosts",
//           },
//         ]
//       : arenaPosts.map((post) => ({
//           type: "arenaPost",
//           data: post,
//         }))),
//   ];

//   const toggleStar = async () => {
//     const updatedArena =
//       await toggleStarArena(
//         {arenaId: selectedArena._id , userId: user._id }
//       );
//     const arena = {...updatedArena , isFollower:selectedArena.isFollower}
//     setSelectedArena(arena);
//     setArenas(prev =>
//       prev.map(a =>
//         a._id.toString() === arena._id.toString()
//           ? arena
//           : a
//           )
//     );
//   };

//   const toggleFollower = async () => {
//     const updatedArena =
//       await toggleFollowerArena(
//         {arenaId: selectedArena._id, userId: user._id }
//       );
//     const arena = {...updatedArena , isStarred:selectedArena.isStarred}
//     setSelectedArena(arena);
//     setArenas(prev =>
//       prev.map(a =>
//           a._id.toString() === arena._id.toString()
//           ? arena
//           : a
//       )
//     );
//   };
  
//   const renderItem = ({ item }) => {
//     switch (item.type) {
//       case "profileArena":
//         return (
//           <>
//             {/* COVER */}
//             <View
//               style={{
//                 height: 220,
//                 width: "100%",
//               }}
//             >
//               <Image
//                 source={{
//                   uri:
//                     profile?.coverImage
//                       ?.publicUrl,
//                 }}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </View>

//             {/* PROFILE */}

//             <View
//               style={{
//                 alignItems: "center",
//                 marginTop: -50,
//               }}
//             >
//               <Image
//                 source={{
//                   uri:
//                     profile?.profileImage
//                       ?.publicUrl,
//                 }}
//                 style={{
//                   width: 100,
//                   height: 100,
//                   borderRadius: 50,
//                   borderWidth: 3,
//                   borderColor: "#eab308",
//                   backgroundColor: "#111",
//                 }}
//               />

//               <Text
//                 style={{
//                   color: "#fff",
//                   fontSize: 16,
//                   fontWeight: "700",
//                   marginTop: 14,
//                 }}
//               >
//                 {profile?.name}
//               </Text>

//               {!!profile?.biography && (
//                 <Text
//                   style={{
//                     color:
//                       "rgba(255,255,255,0.65)",
//                     textAlign: "center",
//                     marginTop: 8,
//                     paddingHorizontal: 24,
//                   }}
//                 >
//                   {profile.biography}
//                 </Text>
//               )}

//               {profile?._id !== user?._id && (
//                 <View 
//                 className ="flex-row w-full">
//                   <View
//                     style={{
//                       marginTop: 20,
//                       // paddingHorizontal: 5,
//                       // height: 42,
//                       // borderRadius: 12,
//                       justifyContent:
//                         "center",
//                       alignItems:
//                         "center",
//                         width : width /3
//                     }}
//                     className = "flex-row" >
//                         <FriendButton userProfile={profile} />
//                   </View>
//                   <View
//                     style={{
//                       marginTop: 20,
//                       // paddingHorizontal: 5,
//                       // height: 42,
//                       // borderRadius: 12,
//                       justifyContent:
//                         "center",
//                       alignItems:
//                         "center",
//                         width : width /3
//                     }}
//                     className = "flex-row" >
//                         <FollowButton userProfile={profile} />
//                   </View>
//                   <View
//                     style={{
//                       marginTop: 20,
//                       // paddingHorizontal: 5,
//                       // height: 42,
//                       // borderRadius: 12,
//                       justifyContent:
//                         "center",
//                       alignItems:
//                         "center",
//                         width : width /3
//                     }}
//                     className = "flex-row" >
//                         <FollowButton userProfile={profile} />
//                   </View>
//                </View>
//               )}
//             </View>

//             {/* EMPTY ARENAS */}

//             {arenas.length === 0 ? (
//               <View
//                 style={{
//                   marginHorizontal: 16,
//                   marginTop: 25,
//                   backgroundColor: "#111",
//                   borderRadius: 18,
//                   padding: 24,
//                   borderWidth: 1,
//                   borderColor:
//                     "rgba(234,179,8,0.12)",
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#fff",
//                     textAlign: "center",
//                     fontWeight: "700",
//                     marginBottom: 8,
//                   }}
//                 >
//                   No Arenas Yet
//                 </Text>

//                 <Text
//                   style={{
//                     color:
//                       "rgba(255,255,255,0.65)",
//                     textAlign: "center",
//                   }}
//                 >
//                   This user has not
//                   created any arenas yet.
//                 </Text>
//               </View>
//             ) : (
//               <>
//                <ViewArenaHeader
//                 arenas = {arenas}
//                 selectedArena = {selectedArena}
//                 setSelectedArena = {setSelectedArena}
//                 width = {width}
//                 toggleStar = {toggleStar}
//                 toggleFollower={toggleFollower}
//                />
//                <Text
//                   style={{
//                     color: "#fff",
//                     fontSize: width / 29,
//                     fontWeight: "700",
//                     marginTop: 30,
//                     marginBottom: 12,
//                     marginLeft: 18,
//                   }} >
//                 PERFORMANCES
//                </Text>
//               </>
//             )}
//             </>
//         );
//       case "arenaPost":
//         return (
//           <ViewArenaPost
//             item={item.data}
//             arena={selectedArena}
//             setSelectedArena = {setSelectedArena}
//             setSelectedPost = {setSelectedPost}
//             setArenas ={setArenas}
//             profile={profile}
//             // onPress={(post) => {
//             //   router.push({
//             //     pathname:
//             //       "/arenaPerformancePlayer",
//             //     params: {
//             //       selectedPostId:
//             //         post._id,
//             //       arenaPosts:
//             //         JSON.stringify(
//             //           arenaPosts
//             //         ),
//             //       arena : JSON.stringify(
//             //         selectedArena
//             //       )
//             //     },
//             //   });
//             // }}
//           />
//         );
//       case "emptyPosts":
//         return (
//           <View
//             style={{
//               marginHorizontal: 16,
//               backgroundColor: "#111",
//               borderRadius: 18,
//               padding: 24,
//               borderWidth: 1,
//               borderColor:
//                 "rgba(234,179,8,0.12)",
//             }}
//           >
//             <Text
//               style={{
//                 color:
//                   "rgba(255,255,255,0.7)",
//                 textAlign: "center",
//               }}
//             >
//               No performances have
//               been published in this
//               arena yet.
//             </Text>
//           </View>
//         );

//       default:
//         return null;
//     }
//   };


//   if(!selectedArena){
//     return  <AuthLoadingScreen />
//   } 

//   return (
//     <View
//       style={{
//         flex: 1,
//         width: "100%",
//         backgroundColor: "#000",
//         paddingTop: insets.top,
//       }}
//     >
//       <TouchableOpacity
//         onPress={() =>
//           router.back()
//         }
//         activeOpacity={0.85}
//         style={{
//           position: "absolute",
//           top: insets.top,
//           left: 0,
//           zIndex: 999,
//           width: 42,
//           height: 42,
//           borderRadius: 21,
//           backgroundColor:
//             "rgba(0,0,0,0.75)",
//           borderWidth: 1,
//           borderColor:
//             "rgba(234,179,8,0.25)",
//           justifyContent:
//             "center",
//           alignItems: "center",
//           }} >
//         <MaterialCommunityIcons
//           name="close"
//           size={20}
//           color="#eab308"
//         />
//       </TouchableOpacity>

//       <FlatList
//         data={listData}
//         extraData={selectedArena}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={
//           false
//         }
//         keyExtractor={(
//           item,
//           index
//         ) => {
//           switch (item.type) {
//             case "profileArena":
//               return "profileArena";
//             case "emptyPosts":
//               return "emptyPosts";
//             case "arenaPost":
//               return item.data._id;
//             default:
//               return String(index);
//           }
//         }}
//         ListFooterComponent={() => (
//           <View
//             style={{
//               height: 40,
//             }}
//           />
//         )}
//       />
//     </View>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalContext } from "../context/GlobalProvider";
import { getArenaByProfile, toggleFollowerArena, toggleStarArena } from "../apiCalls";
import { ViewArenaHeader } from "../components/viewArenas/viewArenaHeader";
import FriendButton from "../components/custom/FriendButton";
import FollowButton from "../components/custom/FollowButton";
import ProfileHeader from "../components/viewArenas/header/profileHeader";
import PerformanceCard from "../components/viewArenas/performance/performanceCard";


export default function ViewProfile() {
  const { userProfile, arena_id } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const {width , height} = useWindowDimensions()
  const profile = userProfile ? JSON.parse(userProfile) : null;
  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);
  // const [totalPerformances, setTotalPerformancesa] = useState(0);

  const CARD_WIDTH = (width - 30) / 2;


  useEffect(() => {
    if (!profile?._id) return;
    getArenaByProfile(
      profile._id,
      { requesterId: user._id },
      (arena) => setSelectedArena(arena),
      (list) => setArenas(list),
      arena_id
    );
  }, []);

  const totalStat = useMemo(() => {
    let totalP = 0
    let totalF = 0
    arenas.map( a => {
       totalP = totalP + a.postCount
       totalF = totalF + a.followerCount
    })
    return {
      totalPerformances : totalP ,
      totalFollowers : totalF
    }; 
  }, [arenas]);

  const performances = useMemo(() => {
    return selectedArena?.posts || [];
  }, [selectedArena]);

  const toggleStar = async () => {
    if (!selectedArena) return;

    const response = await toggleStarArena({
      arenaId: selectedArena._id,
      userId: user._id,
    });
    const updated = {
      ...response,
      isFollower: selectedArena.isFollower,
    }
    setSelectedArena({
      ...updated,
      isFollower: selectedArena.isFollower,
    });
    setArenas(prev =>
      prev.map(a =>
        a._id.toString() === updated._id.toString()
          ? updated
          : a
      )
    );
  };

  const toggleFollower = async () => {
    if (!selectedArena) return;
    const response = await toggleFollowerArena({
      arenaId: selectedArena._id,
      userId: user._id,
    });
    const updated = {
      ...response,
      isStarred: selectedArena.isStarred,
    }
    setSelectedArena({
      ...updated,
      isStarred: selectedArena.isStarred,
    });
    setArenas(prev =>
      prev.map(a =>
        a._id.toString() === updated._id.toString()
          ? updated
          : a
      )
    );
  };

  const playPerformance = (item) => {
    let posts = []
    performances.map( p => {
      let post = {...p, arenaName :selectedArena.arenaName ,
        talentType : selectedArena.talentType ,
        region : selectedArena.region ,
        profileImage : selectedArena.profileImage
      }  
      posts.push(post)    
    })
    const updatedPosts = [
        posts.find(p => p._id.toString() === item._id.toString()),
        ...posts.filter(p => p._id.toString() !== item._id.toString()),
      ];
    router.push({
      pathname: "/arenaPerformancePlayer",
      params: {
        selectedPostId: item._id,
        arenaPosts: JSON.stringify(updatedPosts),
        arena: JSON.stringify(selectedArena),
      },
    });
  }

  const renderPerformance = ( {item , index } ) => {
    return  <PerformanceCard 
        item={item}
        index={index}
        CARD_WIDTH={CARD_WIDTH}
        playPerformance = {playPerformance}
        performanceCount={performances.length}
      />
  };

  if (!selectedArena) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <View style={{ flex: 1,            backgroundColor:"#111214"
      , paddingTop: insets.top }}>

      {/* HEADER BUTTON */}
      {/* <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: insets.top,
          right: 12,
          zIndex: 999,
          padding: 10,
          borderRadius: 999,
          backgroundColor: "rgba(0,0,0,0.6)",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.3)",
        }}
      >
        <MaterialCommunityIcons name="close" size={20} color="#eab308" />
      </TouchableOpacity> */}

      <FlatList
        data={performances}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={renderPerformance}
        contentContainerStyle={{
          // paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          marginBottom: 8,
          gap :8
        }}
        ListHeaderComponent={
          <>
            <ProfileHeader
              profile={profile}
              user={user}
              width={width}
              arenaCount = {arenas.length}
              totalStat = {totalStat}
              onFollow={() => {}}
              onFriend={() => {}}
            />

            <ViewArenaHeader
              arenas={arenas}
              selectedArena={selectedArena}
              setSelectedArena={setSelectedArena}
              toggleStar={toggleStar}
              toggleFollower={toggleFollower}
            />
          </>
        }
      />
    </View>
  );
}