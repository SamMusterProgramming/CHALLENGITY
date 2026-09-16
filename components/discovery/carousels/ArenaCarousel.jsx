import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import StageIndicator from "../../custom/stageIndicator";
import { router } from "expo-router";
import { getUserById } from "../../../apiCalls";
import ArenaCard from "../cards/ArenaCard";


export default function ArenaCarousel({
//   arenas = [],
  type ="local",
  height,
}) {

const { width } = Dimensions.get("window");
const {user, colorTheme , localArenas , scale} = useGlobalContext();
const [currentIndex, setCurrentIndex] =useState(0);
const [profile , setProfile] = useState(null)
const [arenaPosts , setArenaPosts] = useState([])
const [selectedArena , setSelectedArena] = useState(null)
const [selectedPost , setSelectedPost] = useState(null)
const CARD_WIDTH = width * 0.96;

const arenas =  type === "global" ? localArenas :  
                type === "regional" ? localArenas :
                type === "local" ? localArenas: []

const title = type == "global" ?  "Hot Stages" : type === "regional" ? " Regional Stages ": "Trending Stages"
const subTitle = type == "global" ?  "Stages across the globe" :
                 type == "regional" ? "Stages from your region" : "Stages near you"

useEffect(() => {
    if(!selectedArena) return ; 
    getUserById(selectedArena.owner_id ,setProfile)
}, [selectedArena])

useEffect(() => {
    if(!selectedPost) return ; 
    let posts = []
    arenas.map((a) => {
           let post = a.posts[0]
           post = {...post, arena_id : a._id ,
                            arenaName :a.arenaName ,
                            talentType : a.talentType ,
                            region : a.region ,
                            profileImage : a . profileImage,
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

const playPerformance = async() => {
  await getPostsArena(selectedArena._id , setArenaPosts)
}

useEffect(() => {
  if(!profile || selectedArena.owner_id === user._id) return ;
  router.push({
      pathname: "/ProfileScreen",
      params: {
        userProfile: JSON.stringify(
          profile
        ),
        arena_id : selectedArena._id
      },
  });
}, [profile])

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

const openArena = (entry) =>{
  router.push({
    pathname:
      "/arenaDisplayer",
    params: {
      arena_id:
        entry._id,
    },
  });
}


if (!arenas?.length) {
  return null;
}
  return (

    <View
    style={{
      width:"100%",
      alignItems:"center",
    }}
    className ="mt-1 bg-[#18191e]  rounde d-3xl">

      <View className="px-6 w-[100%] text-center pb- 4 bg-[black] rounde d-t-full ">
        <Text
          style={{
            color:colorTheme,
            fontSize:scale(14),
            fontWeight:"800",
            letterSpacing:0.6,
            textTransform:"uppercase",
          }}
          className = "text-center b g-[black] pt-4 pb- 2 rounde d-t-xl" >
          Local Arenas
        </Text>
        <Text
            style={{
              marginTop:6,
              color:"rgba(255,255,255,0.9)",
              fontSize:scale(12),
              // fontWeight:"500",
              // letterSpacing:0.3,
            }}
            className=" b g-[black] pb-2 px- 6 rou nde d-t-xl font-semiMontserrat text-center  ">
          Explore talent arenas and creators near you
        </Text>
      </View>

      {/* CAROUSEL */}
      <View
          style={{
            // height: height,
            width,
            }}
            className="flex-1 h-[100%] w-full items-start justify-center pt-2 pb-2 6 bg-[#000000] bord er-2 bo rder-white /30">
            <FlatList
                style={{
                width,
                }}
                horizontal
                data={arenas}
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
                   <ArenaCard
                    entry={item}
                    width={CARD_WIDTH}
                    height={width/1.1}
                    onPress={openArena}
                    />
                </View>
                )}
            />
      </View>

      {/* INDICATOR */}

      { arenas.length > 1 && (
        <StageIndicator
                title="Arena"
                count={arenas.length}
                currentStage={currentIndex}
                width={width}
            /> 

        )}

    </View>

  );
}