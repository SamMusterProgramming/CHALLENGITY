import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from "react-native";

import { router } from "expo-router";
// import { User } from "lucide-react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import ArenaCard from "../viewArenas/displayArena/arenaCard";
import StageIndicator from "../custom/stageIndicator";
import { getUserById } from "../../apiCalls";
import PerformanceRepresentation from "./performance/performanceRepresentation";


export default function SpotlightPerformances({
  height,
}) {
  const { width } = Dimensions.get("window");
  const {user, colorTheme , globalSpotlightPerformances } = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [profile , setProfile] = useState(null)
  const [arenaPosts , setArenaPosts] = useState([])
  const [selectedProfile , setSelectedProfile] = useState(null)
  const [selectedPost , setSelectedPost] = useState(null)

  const CARD_WIDTH = width * 0.96;


const loadUProfile = async()=>{
   
}

useEffect(() => {
    if(!selectedProfile) return ; 
    // getUserById(selectedArena.owner_id ,setProfile)
    console.log(selectedProfile)
    router.push({
              pathname: "/ProfileScreen",
              params: {
                userProfile: JSON.stringify(
                  selectedProfile
                ),
                arena_id : null // selectedArena._id
              },
          });
}, [selectedProfile])

useEffect(() => {
    if(!selectedPost) return ; 
    let posts = []
    globalSpotlightPerformances.map((a) => {
           let post = a
           post = {...post, arena_id : a.arena._id ,
                            arenaName :a.arena.arenaName ,
                            talentType : a.arena.talentType ,
                            region : a.arena.region ,
                            profileImage : a.owner.profileImage ,
                            owner_id : a.owner._id
                  }
           posts.push(post)
        // }
    })
    const updatedPosts = [
        posts.find(p => p._id.toString() === selectedPost._id.toString()),
        ...posts.filter(p => p._id.toString() !== selectedPost._id.toString()),
      ];
    setArenaPosts(updatedPosts)
}, [selectedPost])

// const playPerformance = async() => {
//   await getPostsArena(selectedArena._id , setArenaPosts)
// }

// useEffect(() => {
//   if(!profile || selectedArena.owner_id === user._id) return ;
//   router.push({
//       pathname: "/ProfileScreen",
//       params: {
//         userProfile: JSON.stringify(
//           profile
//         ),
//         arena_id : selectedArena._id
//       },
//   });
// }, [profile])

useEffect(() => {
  if(!arenaPosts.length) return ; 
  router.push({
    pathname:
      "/arenaPerformancePlayer",
    params: {
      selectedPostId:
      arenaPosts[0]._id,
      arenaPosts:
        JSON.stringify(
          arenaPosts
        ),
      arena : JSON.stringify(
        null
      )
    },
  });
}, [arenaPosts])

  return (

    <View
      style={{
        width:"100%",
        alignItems:"center",
        // marginTop:16,
      }}
      className ="mt-4"
    >

      {/* HEADER */}

      <View className="px- 3 w-full text-center pb-4 b g-darkBg">
        <Text
          style={{
            color:colorTheme,
            fontSize:width/24,
            fontWeight:"800",
            letterSpacing:0.6,
            textTransform:"uppercase",
          }}
        >
          Spotlight Performances
        </Text>
        <Text
          style={{
            marginTop:6,
            color:"rgba(255,255,255,0.7)",
            fontSize:width/30,
            fontWeight:"700",
            letterSpacing:0.3,
          }}
          className="text-gray-100 mt-1 mb-2 font-semiMontserrat tex t-center mt- "
        >
          Explore talent arenas and creators near you
        </Text>
      </View>

      {/* CAROUSEL */}
      <View
          style={{
            height: height,
            width,
            }}
          className="flex- 1 h-[100%] w-full items-start justify-center mb-6 bg-[#392a0e]/30">
            <FlatList
                style={{
                width,
                }}
                horizontal
                data={globalSpotlightPerformances}
                keyExtractor={(item)=>item._id}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                decelerationRate="fast"
                onMomentumScrollEnd={(event)=>{
                const index =
                    Math.round(
                    event.nativeEvent.contentOffset.x /
                    width
                    );
                setCurrentIndex(index);
                }}
                renderItem={({item})=>(
                <View
                    style={{
                    width,
                    alignItems:"center",
                    justifyContent:"center",
                    }}
                >
                    <PerformanceRepresentation
                    performance = {item}
                    width={CARD_WIDTH}
                    height={height}
                    loadUProfile ={loadUProfile}
                    // playPerformance = {playPerformance}
                    setSelectedProfile = {setSelectedProfile}
                    setSelectedPost = {setSelectedPost}
                    />
                </View>
                )}
            />
      </View>

      {/* INDICATOR */}

      { globalSpotlightPerformances.length > 1 && (
        <StageIndicator
                title="Performances"
                count={globalSpotlightPerformances.length}
                currentStage={currentIndex}
                width={width}
            /> 

        )}

        <View
            style={{
                alignSelf: "start",
                width: width ,
                height: 8,
                backgroundColor: "rgba(212,175,55,0.52)",
                // marginVertical: 20,
            }}
            className="  [95%] px-2 h-[8] bg-gold/90 mb-6 mt-6"
        />

    </View>

  );
}