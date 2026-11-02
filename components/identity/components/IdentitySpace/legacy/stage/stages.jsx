
import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  FlatList,
} from "react-native";

import {
  useGlobalContext,
} from "../../../../../../context/GlobalProvider";

// import ArenaPortalIcon
//   from "../../../../../svgIcons/ArenaPortalIcon");

// import CountryFlag
//   from "../../../../../common/CountryFlag");

// import ArenaCard
//   from "./arenaCard/ArenaCard";

import { useProfileSpace } from "../../../context/ProfileSpaceContext";
import CreateArenaModal from "../../../../../modal/createArenaModal";
import { createArenaByUser } from "../../../../../../apiCalls";
import { LinearGradient } from "expo-linear-gradient";
import DiamandSeperator from "../../../../../custom/diamandSeperator";
import StagePortalIcon from "../../../../../svgIcons/StagePortalIcon";
import StageTabs from "./stageTabs";
import StageCard from "./stageCard/stageCard";
import ArenaFooter from "../arena/arenaFooter/arenaFooter";
import { Ionicons } from "@expo/vector-icons";

export default function Stages({
  data , title
}) {
  const {
    userTalents,
    FavouriteStages,
    setSelectedArena,
    setUserArenas,
    spacing,
    scale,
    user,
    // openModal,setOpenModal
  } = useGlobalContext();

  

  const {
    activeSpace,
    changeSpace,
  } = useProfileSpace();

  const [openModal, setOpenModal] = useState(false);
  const [activeStageTab, setActiveStageTab] = useState('myEntries')
  const { width } = useWindowDimensions();

  const [activeStageIndex, setActiveStageIndex] =
    useState(0);

  const [containerWidth, setContainerWidth] =
    useState(0);

  const stageListRef = useRef(null);

  const GOLD = "#E8B95A";

  if (activeSpace !== "legacy") {
    return null;
  }

  const createArena = async (d) => {
    const data = await createArenaByUser(user._id, d);

    if (data.message) return;

    setUserArenas(data.arenas);
    setSelectedArena(data.selectedArena);
  };

  const handleArenaSwipe = (event) => {
    if (containerWidth <= 0) return;
    const offsetX =
      event.nativeEvent.contentOffset.x;
    const index = Math.round(
      offsetX / containerWidth
    );
    setActiveStageIndex(index);
  };

  const handleArenaTabChange = (tab) => {
    setActiveStageTab(tab);
    setActiveStageIndex(0);

    requestAnimationFrame(() => {
      stageListRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    });
  };

  const stages = useMemo(() => {
    const source = data
      // activeStageTab === "myEntries"
      //   ? userTalents
      //   : FavouriteStages;
    return Array.isArray(source) ? source : [];
  }, [activeStageTab, userTalents, FavouriteStages]);

  const stageSectionTitle = title
    // activeStageTab === "myEntries"
    //   ? "My Stages"
    //   : activeStageTab === "myFavourites"
    //   ? "My Favourites"
    //   : "My Friends";

  /*
   * --------------------------------------------------------------------------
   * STAGE CAROUSEL CONTROLS
   * --------------------------------------------------------------------------
   */

  const goToStagePage = (direction) => {
    const nextPage =
      activeStageIndex + direction;

    if (
      nextPage < 0 ||
      nextPage >= stages.length
    ) {
      return;
    }

    stageListRef.current?.scrollToOffset({
      offset: nextPage * containerWidth,
      animated: true,
    });

    setActiveStageIndex(nextPage);
  };

  const totalStagePages = stages.length;

  if(!data.length) return null ;

  return (
    <View
      style={{
        paddingHorizontal: spacing(12),
        // paddingTop: spacing(26),
        paddingBottom: spacing(12),
        width,
      }}
      className="justify-center items -center"
    >

    
      {/* =========================================
          stage COLLECTION HEADER
       ========================================= */}


      <View
        style={{
          width: "100%",
          marginTop: scale(24),
          marginBottom: scale(10),
          paddingVertical: scale(10),
          paddingHorizontal: scale(12),
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-center",

          // backgroundColor: "rgba(255,255,255,0.025)",
          // borderWidth: 1,
          // borderColor: "rgba(232,185,90,0.16)",
          // borderRadius: scale(7),
        }}
        className = "justify-center gap-4 flex-1"
      >
        {/* SECTION TITLE + COUNT */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexShrink: 1,
            minWidth: 0,
          }}
        >
          {/* GOLD ACCENT */}
          <View
            style={{
              width: scale(3),
              height: scale(12),
              borderRadius: scale(2),
              backgroundColor: "#E8B95A",
              marginRight: scale(10),
              opacity: 0.9,
            }}
          />

          <Text
            numberOfLines={1}
            style={{
              color: "#F4F0E8",
              fontSize: scale(12),
              fontWeight: "700",
              letterSpacing: scale(0.35),
              flexShrink: 1,
            }}
          >
             {stageSectionTitle}
            </Text>

          {/* COUNT BADGE */}
      
          <Text
            style={{
              marginLeft: scale(9),
              color: "#E8B95A",
              fontSize: scale(11),
              fontWeight: "700",
              fontVariant: ["tabular-nums"],
            }}
          >
            {stages.length}
          </Text>

        </View>

        {/* VIEW ALL */}
        <Pressable
          onPress={() => {
            // Open all arenas
          }}
          accessibilityRole="button"
          accessibilityLabel={`View all ${stageSectionTitle}`}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 4 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: scale(10),
            paddingVertical: scale(5),
            paddingLeft: scale(5),
          }}
        >
          <Text
            style={{
              color: "#E8B95A",
              fontSize: scale(11),
              fontWeight: "600",
              letterSpacing: scale(0.15),
            }}
          >
            View all
          </Text>

          <Ionicons
            name="arrow-forward"
            size={scale(13)}
            color="#E8B95A"
            style={{ marginLeft: scale(5) }}
          />
        </Pressable>
      </View>


      {stages.length > 0 ? 
      (
        <View
          onLayout={(event) =>
            setContainerWidth(
              event.nativeEvent.layout.width
            )
          }
          style={{
            height: spacing(420),
            width: "100%",
            overflow: "hidden",
          }}
          className="bg- [#050505] justify-center items-center"
        >
          {containerWidth > 0 && (
            <FlatList
              ref={stageListRef}
              key={activeStageTab}
              data={stages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
              onMomentumScrollEnd={
                handleArenaSwipe
              }
              keyExtractor={(stage, index) =>
                String(
                  stage?._id ||
                  stage?.id ||
                  `stage-${index}`
                )
              }
              renderItem={({
                item,
                index,
              }) => (
                <View
                  style={{
                    width: containerWidth,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <StageCard
                    stage={item}
                    isLast={
                      index ===
                      stages.length - 1
                    }
                    width={containerWidth}
                  />
                </View>
              )}
              removeClippedSubviews={false}
            />
          )}
        </View>
      ) : (
        <View
          className="items-center b order-2 borde r-[white]/30 justify-center"
          style={{
            height: spacing(420),
            borderRadius: scale(17),
          }}
        >
          <StagePortalIcon size={scale(42)} />

          <Text
            style={{
              marginTop: spacing(9),
              color: "rgba(255,255,255,0.48)",
              fontSize: scale(10),
              fontWeight: "700",
              letterSpacing: scale(0.6),
            }}
          >
            NO Stages
          </Text>
        </View>
      )}

      {/* =========================================
          STAGE CAROUSEL PAGE CONTROLS
      ========================================= */}

      {/* {totalStagePages > 0 && (
       <View
       style={{
        width: "100%",
        marginTop: scale(24),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
  
       }}
     >
       <Pressable
         onPress={() => goToStagePage(-1)}
         disabled={activeStageIndex === 0}
         hitSlop={scale(8)}
         accessibilityRole="button"
         accessibilityLabel="Previous stage page"
         style={{
           width: scale(42),
          //  height: scale(36),
           alignItems: "center",
           justifyContent: "center",
           borderRadius: scale(12),
           opacity: activeStageIndex === 0 ? 0.28 : 1,
         }}
       >
         <Ionicons
           name="chevron-back"
           size={scale(23)}
           color={
             activeStageIndex === 0
               ? "rgba(255,255,255,0.65)"
               : GOLD
           }
         />
       </Pressable>

       <View
         accessibilityRole="progressbar"
         accessibilityLabel={`Stage page ${activeStageIndex + 1} of ${totalStagePages}`}
         style={{
           flex: 1,
           flexDirection: "row",
           alignItems: "center",
           justifyContent: "center",
           gap: scale(7),
         }}
       >
         {Array.from({ length: totalStagePages }, (_, index) => {
           const isActive = index === activeStageIndex;
     
           return (
             <View
               key={`stage-page-${index}`}
               style={{
                 width: !isActive ? scale(9) : scale(9),
                 height: scale(9),
                 borderRadius: scale(4),
                 backgroundColor: isActive
                   ?  GOLD
                   : "rgba(255,255,255,0.34)",
               }}
             />
           );
         })}
       </View>
     
       <Pressable
         onPress={() => goToStagePage(1)}
         disabled={activeStageIndex === totalStagePages - 1}
         hitSlop={scale(8)}
         accessibilityRole="button"
         accessibilityLabel="Next stage page"
         style={{
           width: scale(42),
          //  height: scale(36),
           alignItems: "center",
           justifyContent: "center",
           borderRadius: scale(12),
           opacity: activeStageIndex === totalStagePages - 1 ? 0.28 : 1,
         }}
       >
         <Ionicons
           name="chevron-forward"
           size={scale(23)}
           color={
             activeStageIndex === totalStagePages - 1
               ? "rgba(255,255,255,0.65)"
               : GOLD
           }
         />
       </Pressable>
     </View>
      )} */}

        {/* BOTTOM PAGE INDICATOR */}
        {totalStagePages  > 1 && (
          <View
            style={{
              width: "99%",
              flexDirection: "row",
              // alignItems: "end",
              justifyContent: "space-between",
              marginTop: spacing(28),
              // gap: spacing(14),
              // height: scale(64)
            }}
            className = " bg-[#1b1a1a] self-center py-3 px-3 rounded-xl items-end bo rder bor der-white"
          >
            {/* PREVIOUS */}
            <Pressable
              onPress={() => goToStagePage(-1)}
              disabled={activeStageIndex === 0}
              hitSlop={8}
              style={{
                // width: scale(40),
                // height: scale(38),
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                activeStageIndex === 0
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                activeStageIndex === 0
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={scale(21)}
                color={
                  activeStageIndex === 0
                    ? "rgba(255,255,255,0.22)"
                    : "#E8B95A"
                }
              />
            </Pressable>

            {/* DOTS AND PAGE COUNT */}
            <View
              style={{
                alignItems: "center",
                paddingBottom : scale(4),
                gap: scale(16)
              }}
              className = "justify-end py -2 h- full flex-1 "  >
          

              <Text
                style={{
                  fontSize: scale(13),
                  fontWeight: "800",
                  letterSpacing: scale(1.3),
                  color: "rgba(255,255,255,0.76)",
                  fontVariant: ["tabular-nums"],
                }}
              >
                <Text style={{ color: "#E8B95A" }}>
                  {String(activeStageIndex + 1)}
                </Text>
                {"  /  "}
                {String(totalStagePages )}
              </Text>
            </View>

            {/* NEXT */}
            <Pressable
              onPress = {() => goToStagePage(1)}
              disabled={activeStageIndex === totalStagePages  - 1}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                activeStageIndex === totalStagePages  - 1
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                activeStageIndex === totalStagePages  - 1
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-forward"
                size={scale(21)}
                color={
                  activeStageIndex === totalStagePages  - 1
                    ? "rgba(255,255,255,0.22)"
                    : "#E8B95A"
                }
              />
            </Pressable>
          </View>
        )}


      {openModal && (
        <CreateArenaModal
          user={user}
          isVisible={openModal}
          setIsVisible={setOpenModal}
          onCreateArena={createArena}
        />
      )}
    </View>
  );
}