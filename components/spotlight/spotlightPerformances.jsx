import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
// import { User } from "lucide-react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import ArenaCard from "../viewArenas/displayArena/arenaCard";
import StageIndicator from "../custom/stageIndicator";
import { getUserById } from "../../apiCalls";
import PerformanceRepresentation from "./performance/performanceRepresentation";
import SpotlightCard from "./performance/SpotlightCard";
import { Ionicons } from "@expo/vector-icons";
import TalentPickerModal from "../modal/TalentPickerModal";
import { countries, regionIcons, stageIcons } from "../../utilities/TypeData";
import { getCountriesByRegion, getRegionName } from "../../helper";


export default function SpotlightPerformances({
  height,
  type = "global"
}) {
  const { width } = Dimensions.get("window");
  const {user, colorTheme , globalSpotlightPerformances , regionalSpotlightPerformances,localSpotlightPerformances,
        setLocalSpotlightPerformances , openTalentPicker, setOpenTalentPicker} = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile , setProfile] = useState(null)
  const [arenaPosts , setArenaPosts] = useState([])
  const [selectedProfile , setSelectedProfile] = useState(null)
  const [selectedPost , setSelectedPost] = useState(null)
  const [openModal , setOpenModal] = useState(null)
  const [selectedTalent , setSelectedTalent] = useState("ALL TALENT")


  const CARD_WIDTH = width * 0.95;
  
  const performances = type === "global" ? globalSpotlightPerformances :  
                       type === "regional" ? regionalSpotlightPerformances :
                       type === "local" ? localSpotlightPerformances: []
  const regionStatus = () => {
      switch (type) {
        case "local":
             return {
               name: countries.find( c => c.code == user.country).name,
               flag: countries.find( c => c.code == user.country).flag,
             }
          break;
        case "regional":
            return {
              name: getRegionName(user.country) ,
              flag: regionIcons[getRegionName(user.country)],
            }
        break;
        case "global":
            return {
              name: "Global",
              flag: regionIcons["Global"],
            }
        break;
        default:
          return {}
          break;
      }
  }

  const regionInfos = regionStatus()
  
  const displayData = useMemo(() => {
        if (selectedTalent === "ALL TALENT") {
          return performances;
        }
        return performances.filter(
          (p) => p.arena.talentType === selectedTalent
        );
  }, [performances, selectedTalent]);

  const title = type == "global" ?  "Global Spotlights" : type === "regional" ? "Regional Spotlight":"Local spotlight"
  const subTitle = type == "global" ?  "Performances across the globe" :
                   type == "regional" ? "Performances from your region" : "Performances near you"
  
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

const handleSelectTalent = (talent) =>{
   if(talent == "ALL TALENT") return setSelectedTalent("ALL TALENT")
   setSelectedTalent(talent.label)
}

// if (!performances?.length) {
//   return null;
// }

  return (
  <>
    <View
      style={{
        width:"100%",
        alignItems:"center",
        // marginTop:16,
      }}
      className ="mt-4 mb-4 pb-4 pt-4 px- 4 bg-[#18191e] rounde d-3xl"
    >

      {/* HEADER */}

      <View className="px-1 6 w-full flex-col gap-4 justify-start items-center pb-4 pt-4 bg-[black] roun ed-t-full ">
          <View
          className = "justify-between w-full mb2 flex-row items-start">
            <View>
                <Text
                  style={{
                    color:colorTheme,
                    fontSize:width/30,
                    fontWeight:"800",
                    letterSpacing:0.6,
                    textTransform:"uppercase",
                  }}
                  className = "te xt-center b g-[black] pt -4 pb- 2 rounde d-t-xl" > 
                  {title} 
                </Text>
            </View>
              
            <Text
              style={{
                color:"rgba(255,255,255,0.9)",
                fontSize:width/30,
                fontWeight:"800",
                // letterSpacing:0.3,
              }}
              className=" b g-[black] rou nde d-t-xl upp ercase font-semiMontserrat te xt-center  " >
              {regionInfos.name}  {regionInfos.flag}
            </Text>
          </View>

          {/* <View
          className ="flex-1 w-full justify-center items-center ">
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => setOpenModal(true)}
                className="w-full p-3 flex-row justify-between items-center border border-yellow-500/30 bg-[#0D0D0D] px- 4"
                style={{
                  borderRadius: 5,
                }}
                >
                
                <View className="h-7 w-7 items-center justify-center rounded-md b g-yellow-500/10">
               
                    <Text className="ml-2.5 text-[14px] font-bold uppercase tracking-[1.5px] text-white/80">
                        {stageIcons[selectedTalent]}
                    </Text>
                </View>

             
                <Text className="ml-2.5 text-[14px] font-bold uppercase tracking-[1.5px] text-white/80">
                 {selectedTalent}
                </Text>

           
                <View className="ml-3 h-6 w-6 items-center justify-center border-l border-white/10">
                  <Ionicons
                    name="chevron-down"
                    size={19}
                    color="#EAB308"
                  />
                </View>
              </TouchableOpacity>
            </View> */}
      </View>

      {/* CAROUSEL */}
      <View
          style={{
            // height: height,
            width,
            }}
          className="flex-1 bg-black h- [100%] w -full items-start justify-center pb-2 pt- 2 bg- [#392a0e] /30">
            <FlatList
                style={{
                width,
                }}
                horizontal
                data={displayData}
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
                    {/* <PerformanceRepresentation
                    performance = {item}
                    width={CARD_WIDTH}
                    height={height * 0.95}
                    loadUProfile ={loadUProfile}
                    // playPerformance = {playPerformance}
                    setSelectedProfile = {setSelectedProfile}
                    setSelectedPost = {setSelectedPost}
                    /> */}
                  <SpotlightCard
                    entry={item}
                    width={width * 0.95}
                    height={width / 2}
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
                count={displayData.length}
                currentStage={currentIndex}
                width={width}
            /> 

        )}


    </View>

    {openModal && (
    <TalentPickerModal 
      visible ={openModal}
      onClose = { () => setOpenModal(false)}
      onSelectTalent = {handleSelectTalent}
      selectedTalent = {selectedTalent}
      // onSelectAll
    />
    )}
 </>

  );
}