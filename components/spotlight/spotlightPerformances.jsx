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
  type = "global"
}) {
  const { width } = Dimensions.get("window");
  const {user, colorTheme , globalSpotlightPerformances , regionalSpotlightPerformances,localSpotlightPerformances,
        setLocalSpotlightPerformances } = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile , setProfile] = useState(null)
  const [arenaPosts , setArenaPosts] = useState([])
  const [selectedProfile , setSelectedProfile] = useState(null)
  const [selectedPost , setSelectedPost] = useState(null)

  const CARD_WIDTH = width * 0.95;
  
  const performances = type === "global" ? globalSpotlightPerformances :  
                       type === "regional" ? regionalSpotlightPerformances :
                       type === "local" ? localSpotlightPerformances: []

  const title = type == "global" ?  "Global Spotlights" : type === "regional" ? "Regional Spotlight":"Local spotlight"
  const subTitle = type == "global" ?  "explore best performances acrros the globe" :
                   type == "regional" ? "explore the best performances from your region" : "explore the best performances near you"
  
  const loadUProfile = async()=>{
   
  }

useEffect(() => {
    if(!selectedProfile) return ; 
    // getUserById(selectedArena.owner_id ,setProfile)
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
    performances.map((a) => {
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
      selectedPostId: arenaPosts[0]._id,
      type : type,
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

if(performances.length == 0 ) return ;

  return (

    <View
      style={{
        width:"100%",
        alignItems:"center",
        // marginTop:16,
      }}
      className ="mt-4 mb-4 pb-4 pt-4 px- 4 bg-[#18191e] rounde d-3xl"
    >

      {/* HEADER */}

      <View className="px-6 w-[100%] text-center pb- 4 bg-[black] roun ed-t-full ">
        <Text
          style={{
            color:colorTheme,
            fontSize:width/25,
            fontWeight:"800",
            letterSpacing:0.6,
            textTransform:"uppercase",
          }}
          className = "text-center b g-[black] pt-4 pb- 2 rounde d-t-xl"
        > 
           {title} 
        </Text>
        <Text
          style={{
            marginTop:6,
            color:"rgba(255,255,255,0.9)",
            fontSize:width/32,
            // fontWeight:"500",
            // letterSpacing:0.3,
          }}
          className=" b g-[black] pb-2 px- 6 rou nde d-t-xl font-semiMontserrat text-center  " >
           {subTitle}
        </Text>
      </View>

      {/* CAROUSEL */}
      <View
          style={{
            height: height,
            width,
            }}
          className="flex-1 bg-black h- [100%] w -full items-start justify-center pb-2 pt-2 bg- [#392a0e] /30">
            <FlatList
                style={{
                width,
                }}
                horizontal
                data={performances}
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
                    height={height * 0.95}
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

      { performances.length > 1 && (
        <StageIndicator
                title="Performances"
                count={performances.length}
                currentStage={currentIndex}
                width={width}
            /> 

        )}

        {/* <View
            style={{
                alignSelf: "start",
                width: width ,
                height: 4,
                backgroundColor: "rgba(212,175,55,0.52)",
                marginVertical: 20,
            }}
            className="  [95%] px-2 h- [8] b g-gold/90 mb-4 mt-6"
        /> */}

    </View>

  );
}