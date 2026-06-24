
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import React, { useState } from 'react'

import { MotiView, AnimatePresence } from 'moti'

import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons'

import { router } from 'expo-router'

import {
  countries,
  stageIcons,
} from '../../utilities/TypeData'

const talentStages = [
  { id: "1", name: "Singing", icon: "🎤" },
  { id: "2", name: "Dancing", icon: "💃" },
  { id: "3", name: "Fitness", icon: "🏋️" },
  { id: "4", name: "Magic", icon: "🪄" },
  { id: "5", name: "Sport", icon: "⚽" },
  { id: "6", name: "Melody", icon: "🎹" },
  { id: "7", name: "Art", icon: "🎨" },
  { id: "8", name: "Comedy", icon: "😂" },
];

export default function StageMenu({
  height,
  width,
  setParticipationType,
  isFavourite,
  stage,
  setStage,
  handleRefresh,
  talentRoom,
  setTalentRoom,
  globalRefresh,
  edition,
  isRefreshing,
  setNewChallenge,
  stageName,
  setStageName,
  setShowIntroduction ,
  showResult , setShowResult
}) {

  const [menuOpen, setMenuOpen] = useState(false)
  const [openStagesMenu, setOpenStagesMenu] = useState(false);
  const [selected, setSelected] = useState("stage");

  const region = countries.find(
    c => c.code === talentRoom.region
  )

  /* ---------------- RESPONSIVE SIZES ---------------- */
  const ICON_BOX = height * 0.25
  const ICON_SIZE = height * 0.15
  const TOGGLE_HEIGHT = height * 0.25
  const TITLE_SIZE = height * 0.11
  const SUB_SIZE = height * 0.075
  const LABEL_SIZE = height * 0.09
  const EMOJI_SIZE = height * 0.17

  return (

    <MotiView
      from={{
        opacity: 0,
        translateY: height * 0.3
      }}
      animate={{
        opacity: 1,
        translateY: 0
      }}
      transition={{
        type: "timing",
        duration: 450
      }}
      style={{
        height,
        width,
        position: "absolute",
        bottom: 0,
      }}
    >

      

      {/* MAIN CONTAINER */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(8,8,12,0.72)",
          borderTopWidth: 1,
          borderColor: "rgba(255,255,255,0.06)",
          paddingHorizontal: width * 0.01,
          paddingTop: height * 0.05,
          paddingBottom: height * 0.04,
        }}
        className="rounde d-t-[28px] justify-between"
      >

        {/* ================= TOP ROW ================= */}

      <View 
      style = {{
        width : width
      }}
      className="flex-row w-full  items-center justify-between">
       
       {/* <View
          style={{
            width: width * 0.25,
            height: TOGGLE_HEIGHT,
              }}
          className="w-[25%] justify-center items-start pl- 2">
            <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setMenuOpen(false)

                      !globalRefresh &&
                        router.back()
                    }}
                    style={{
                      width: "96%",
                      height: "100%",
                      borderRadius: 8,
                      backgroundColor: stage
                        ? "rgba(212,175,55,0.28)"
                        : "rgba(212,175,55,0.12)",
                    }}
                    className = " flex-row items-center justify-center px- 4 py- 2  b g-red-500/30 "
                  >

                 
                    <Text
                      style={{
                        color: "#FFFFFF",
                        marginLeft: 8,
                        fontWeight: "600",
                      }}
                      className ="font-bebas tracking-wider" >
                      Results
                    </Text>
            </TouchableOpacity>
       </View> */}
        <View
            style={{
              width: width * 0.8,
              height: TOGGLE_HEIGHT,
            }}
            className="flex-row items-center ga p -2 justify-between"
          >
          
            {/* STAGE SELECT MENU */}
              {openStagesMenu && (
                <View
                  style={{
                    bottom: TOGGLE_HEIGHT - height * 0.25,
                    left: 0,
                    width: width * 0.98,
                  }}
                  className="
                    absolute
                    bg-[#111114]
                    border
                    border-white/10
                    rounded-xl
                    p-2
                    z-50 " >

                  {talentStages.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        
                        setStage(true)
                        setStageName(item.name)
                        setNewChallenge(false)
                        setOpenStagesMenu(false)
                      }}
                      className="
                        flex-row
                        items-center
                        gap-3
                        px-3
                        py-3
                        rounded-xl
                        bg-white/0
                      "
                      style={{
                        backgroundColor : item.name == stageName ? "rgba(255,255,255,0.18)" :"transparent"  
                      }}
                    >

                      <Text
                        style={{
                          fontSize: width * 0.05,
                        }}
                      >
                        {item.icon}
                      </Text>

                      <Text
                        style={{
                          fontSize: LABEL_SIZE,
                        }}
                        className="
                          text-white
                          font-bebas
                          tracking-[1px]
                        "
                      >
                        {item.name}
                      </Text>

                    </TouchableOpacity>
                  ))}

                </View>
              )}

          
            {/* STAGE */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setSelected("stage")
                !stage && setStage(true)
                setShowResult(false)
                setOpenStagesMenu(false)
              }}
              style={{
                width: "32%",
                height: "100%",
                borderRadius: 8,
                backgroundColor: selected == "stage" 
                  ? "rgba(212,175,55,0.28)"
                  : "rgba(212,175,55,0.12)",
              }}
              className="items-center justify-center overflow-hidden" >
              {/* GOLD DOT */}
              {stage && (
                <View
                  className="absolute top-2 right-2 rounded-full bg-[#F5D77A]"
                  style={{
                    width: width * 0.012,
                    height: width * 0.012,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: LABEL_SIZE,
                  color: selected == "stage" 
                    ? "#F5D77A"
                    : "#9ca3af",
                  letterSpacing: 1,
                }}
                className="font-bebas"
              >
                Stage
              </Text>
            </TouchableOpacity>

            {/* PERFORMANCE */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setSelected("performance")
                stage && setStage(false)
                showResult && setShowResult(false)
                setOpenStagesMenu(false)
              }}
              style={{
                width: "32%",
                height: "100%",
                borderRadius: 8,
                backgroundColor: selected == "performance" 
                  ? "rgba(212,175,55,0.28)"
                  : "rgba(212,175,55,0.12)",
                // borderWidth: 1,
                // borderColor: !stage
                //   ? "rgba(255,215,120,0.35)"
                //   : "rgba(212,175,55,0.10)",
              }}
              className="items-center justify-center overflow-hidden"
            >
              {/* GOLD DOT */}
              {selected === "performance" && (
                <View
                  className="absolute top-2 right-2 rounded-full bg-[#F5D77A]"
                  style={{
                    width: width * 0.012,
                    height: width * 0.012,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: LABEL_SIZE,
                  color: selected == "performance"
                    ? "#F5D77A"
                    : "#9ca3af",
                  letterSpacing: 1,
                }}
                className="font-bebas track ing-[1px]"
              >
                Performance
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setSelected("result")
                      stage && setStage(false)
                      setShowResult(true)
                    }}
                    style={{
                      width: "32%",
                      height: "100%",
                      borderRadius: 8,
                      backgroundColor: selected == "result"
                        ? "rgba(212,175,55,0.28)"
                        : "rgba(212,175,55,0.12)",
                    }}
                    className="items-center justify-center overflow-hidden"
                    >
                    {selected === "result" && (
                      <View
                        className="absolute top-2 right-2 rounded-full bg-[#F5D77A]"
                        style={{
                          width: width * 0.012,
                          height: width * 0.012,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        color: selected == "result"
                        ? "#F5D77A"
                        : "#9ca3af",
                        // marginLeft: 8,
                        fontWeight: "600",
                        letterSpacing: 1,
                      }}
                      className ="font-bebas tracking-wider" >
                      Result
                    </Text>
            </TouchableOpacity>
              
          </View>



          {/* BURGER MENU */}
          <View className="rela tive w-[20%] pr-2 items-end">

            {/* BURGER BUTTON */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>{
                setMenuOpen(!menuOpen)
                setOpenStagesMenu(false)
              }
              }
              style={{
                width: width/6,
                height: ICON_BOX,
                borderRadius: 8,
                backgroundColor:
                !menuOpen?  "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.22)",
              }}
              className="
                items-center
                justify-center
                border
                bor der-white/10
                border-gold/40     "
            >
              
               <View
                  style={{
                    width: width/8,
                    height: 1.5,
                    // backgroundColor: "#FFF",
                    marginVertical: 3,
                    borderRadius: 999,
                  }}
                  className="bg-gold"
                />

                <View
                  style={{
                    width: width/8,
                    height: 1.5,
                    // backgroundColor: "#FFF",
                    marginVertical: 3,
                    borderRadius: 999,
                  }}
                  className="bg-gold"
                />

                <View
                  style={{
                    width: width/8,
                    height: 1.5,
                    // backgroundColor: "#FFF",
                    marginVertical: 3,
                    borderRadius: 999,
                  }}
                  className="bg-gold"
                />
            </TouchableOpacity>

            {/* DROPDOWN */}
            <AnimatePresence>

              {menuOpen && (

                <MotiView
                  from={{
                    opacity: 0,
                    translateY: -10,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    translateY: -10,
                    scale: 0.96,
                  }}
                  transition={{
                    type: "timing",
                    duration: 180,
                  }}
                  style={{
                    position: "absolute",
                    bottom: ICON_BOX + 10,
                    right: 0,
                    width: width * 0.42,
                    zIndex: 999,
                  }}
                  className="
                    rounded-xl
                    overflow-hidden
                    bor  der
                    bor der-gold/20
                    bg-[#111114]
                  "
                >

                  {/* REFRESH */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setMenuOpen(false)
                      handleRefresh()
                    }}
                    className="
                      flex-row
                      items-center
                      px-4
                      py-4
                      border-b
                      border-white/5
                      
                    " >

                    {isRefreshing ? (
                      <ActivityIndicator
                        size="small"
                        color="white"
                      />
                    ) : (
                      <AntDesign
                        name="reload"
                        size={ICON_SIZE * 0.9}
                        color="#d4d4d8"
                      />
                    )}

                    <Text
                      style={{
                        fontSize: LABEL_SIZE,
                      }}
                      className="
                        text-white
                        ml-3
                        font-semibold
                      "
                    >
                      Refresh Stage
                    </Text>

                  </TouchableOpacity>

                  {/* FAVORITE */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setMenuOpen(false)
                      !isFavourite
                        ? setParticipationType("addFavourite")
                        : setParticipationType("removeFavourite")
                    }}
                    className="
                      flex-row
                      items-center
                      px-4
                      py-4
                      border-b
                      border-white/5
                    "
                  >

                    <MaterialCommunityIcons
                      name={
                        isFavourite
                          ? "heart"
                          : "heart-outline"
                      }
                      size={ICON_SIZE * 0.9}
                      color={
                        isFavourite
                          ? "#ff4d4d"
                          : "#d4d4d8"
                      }
                    />

                    <Text
                      style={{
                        fontSize: LABEL_SIZE,
                      }}
                      className="
                        text-white
                        ml-3
                        font-semibold
                      "
                    >
                      {
                        isFavourite
                          ? "Remove Favorite"
                          : "Add Favorite"
                      }
                    </Text>

                  </TouchableOpacity>

                  {/* HELP */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setMenuOpen(false)
                      setParticipationType("help")
                    }}
                    className="
                      flex-row
                      items-center
                      px-4
                      py-4
                      border-b
                      border-white/5
                    "
                  >

                    <MaterialCommunityIcons
                      name="help-circle-outline"
                      size={ICON_SIZE * 0.9}
                      color="#d4d4d8"
                    />

                    <Text
                      style={{
                        fontSize: LABEL_SIZE,
                      }}
                      className="
                        text-white
                        ml-3
                        font-semibold
                      "
                    >
                      Help
                    </Text>

                  </TouchableOpacity>

                  {/* CLOSE */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setMenuOpen(false)

                      !globalRefresh &&
                        router.back()
                    }}
                    className="
                      flex-row
                      items-center
                      px-4
                      py-4
                    "
                  >

                    <AntDesign
                      name="close"
                      size={ICON_SIZE * 0.9}
                      color="#d4d4d8"
                    />

                    <Text
                      style={{
                        fontSize: LABEL_SIZE,
                      }}
                      className="
                        text-white
                        ml-3
                        font-semibold
                      "
                    >
                      Close
                    </Text>

                  </TouchableOpacity>

                </MotiView>

              )}

            </AnimatePresence>

          </View>

        </View>

        {/* ================= INFO ROW ================= */}

        <View
          style={{
            marginTop: height * 0.04,
            paddingHorizontal: width * 0.02,
          }}
          className="flex-row flex-1 items-center justify-between"
        >

          {/* STAGE */}

          
           <View className="items-center w-[25%] justify-center">
                <TouchableOpacity
                    // activeOpacity={0.9}
                    onPress={() => {
                      setOpenStagesMenu(!openStagesMenu)
                      setMenuOpen(false)
                    }}
                    style={{
                      width: height * 0.5,
                      height: height * 0.5,
                      // borderRadius: 5,
                      backgroundColor: openStagesMenu
                        ? "rgba(212,175,55,0.26)"
                        : "rgba(212,175,55,0.12)",
                      borderWidth: 1,
                
                    }}
                    className="
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                    "
                  >

                  <Text
                    style={{
                      fontSize: EMOJI_SIZE
                    }}
                  >
                    {stageIcons[talentRoom.name]}
                  </Text>

                  <Text
                    style={{
                      fontSize: LABEL_SIZE,
                      marginTop: 2,
                    }}
                    className="text-gray-200 font-bebas tracking-widest"
                  >
                    {talentRoom.name}
                  </Text>

              </TouchableOpacity>
          </View>

          {/* CENTER INFO */}
          <View className="items-center w-[50%] gap-1 justify-center">

            <Text
              style={{
                fontSize: TITLE_SIZE,
              }}
              className="text-white font-bebas tracking-wider"
            >
              {talentRoom.name} STAGE
            </Text>

            <Text
              style={{
                fontSize: SUB_SIZE,
                marginTop: 1,
              }}
              className="text-yellow-500 font-semibold"
            >
              {edition.title}
            </Text>

          </View>

          {/* REGION */}
          <View className="items-center w-[25%] justify-center">

            <Text
              style={{
                fontSize: EMOJI_SIZE
              }}
            >
              {region?.flag}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: LABEL_SIZE,
                marginTop: 2,
                width:"100%"
              }}
              className="
                text-gray-200
                font-bebas
                text-center
                tracking-widest
              "
            >
              {region?.name}
            </Text>

          </View>

        </View>

      </View>

    </MotiView>
  )
}