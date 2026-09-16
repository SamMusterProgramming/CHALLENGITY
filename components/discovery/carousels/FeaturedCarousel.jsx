import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
} from "react-native";

import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import StageIndicator from "../../custom/stageIndicator";
import { countries, regionIcons } from "../../../utilities/TypeData";
import { getRegionName } from "../../../helper";
import FeaturedCard from "../cards/FeaturedCard";


export default function FeaturedCarousel({
  height,
  type = "global"
}) {
  const { width } = Dimensions.get("window");
  const {user, scale, colorTheme , globalSpotlightPerformances , regionalSpotlightPerformances,localSpotlightPerformances} = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arenaPosts , setArenaPosts] = useState([])
  const [selectedProfile , setSelectedProfile] = useState(null)
  const [selectedPost , setSelectedPost] = useState(null)
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



useEffect(() => {
    if(!selectedProfile) return ; 
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



if (!performances?.length) {
  return null;
}

  return (
  <>
    <View
      style={{
        width:"100%",
        alignItems:"center",
        // marginTop:16,
      }}
      className ="mt-1 pb -2 pb- 4  b g-[black] "
    >

      {/* HEADER */}

      <View className="px-4 6 w-full flex-col gap-4 justify-start items-center py-4 bg-[black] roun ed-t-full ">
          <View
          className = "justify-center w-full gap-2 flex-col items-center">
            <View>
                <Text
                  style={{
                    color:colorTheme,
                    fontSize:scale(14),
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
                color:"rgba(255,255,255,0.8)",
                fontSize:scale(12),
                fontWeight:"800",
                // letterSpacing:0.3,
              }}
              className=" b g-[black] rou nde d-t-xl upp ercase font-semiMontserrat te xt-center  " >
              {regionInfos.name}  {regionInfos.flag}
            </Text>
          </View>

         
      </View>

      {/* CAROUSEL */}
      <View
          style={{
            // height: height,
            width,
            }}
          className="flex-1 bg-black h- [100%] w -full items-start justify-center pb-2 pt-2 bg- [#392a0e] /30">
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
                    }}  >
                  <FeaturedCard
                    entry={item}
                    width={width * 0.95}
                    height={width / 1.5}
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

    {/* {openModal && (
    <TalentPickerModal 
      visible ={openModal}
      onClose = { () => setOpenModal(false)}
      onSelectTalent = {handleSelectTalent}
      selectedTalent = {selectedTalent}
      // onSelectAll
    />
    )} */}
 </>

  );
}