import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useGlobalContext,
} from "../../../../../../context/GlobalProvider";
import ArenaPortalIcon
  from "../../../../../svgIcons/ArenaPortalIcon";
import { useProfileSpace } from "../../../context/ProfileSpaceContext";
import CreateArenaModal
  from "../../../../../modal/createArenaModal";

import { createArenaByUser } from "../../../../../../apiCalls";

// import ArenaFooter from "./arenaFooter/arenaFooter";

import ArenaFooter from "../arena/arenaFooter/arenaFooter";
import RisingStarIcon from "../../../../../svgIcons/RisingStarIcon";
import PerformanceTabs from "./performanceTabs";
import PerformanceCard from "./performanceCard/performanceCard";

export default function Performances({
  data , title
}) {
  const {
    userSpotlights,
    userArenas,
    userFollowedArenas,
    setSelectedArena,
    setUserArenas,
    spacing,
    scale,
    user,
  } = useGlobalContext();

  const {
    activeSpace,
  } = useProfileSpace();

  const [openModal, setOpenModal] = useState(false);

  const [activePerformanceTab, setActivePerformanceTab] =
    useState("myPerformances");

  const [activePerformanceIndex, setActivePerformanceIndex] = useState(0);
  const performanceListRef = useRef(null);
  const { width } = useWindowDimensions();
  const [containerWidth, setContainerWidth] =
    useState(0);

  if (activeSpace !== "legacy") {
    return null;
  }

  const GOLD = "#E8B95A";

  const createArena = async (d) => {
    const data = await createArenaByUser(
      user._id,
      d
    );
    if (data.message) return;
    setUserArenas(data.arenas);
    setSelectedArena(data.selectedArena);
  };

  const handleAction = () => {
    switch (activePerformanceTab) {
      case "myArenas":
        setOpenModal(true);
        break;

      default:
        break;
    }
  };

  const isSpotlight = (post) =>
    post?.globalSpotlight?.spotlight === true ||
    post?.regionalSpotlight?.spotlight === true ||
    post?.localSpotlight?.spotlight === true;

  const allPerformances = userArenas.flatMap((arena) =>
    Array.isArray(arena.posts)
      ? arena.posts
      : []
  );

  const spotlights = userArenas.flatMap((arena) =>
    Array.isArray(arena.posts)
      ? arena.posts.filter(isSpotlight)
      : []
  );

  const performances = useMemo(() => {
    const performs = userArenas.flatMap((arena) =>
      Array.isArray(arena.posts)
        ? arena.posts
        : []
    );

   const source = data
      // activePerformanceTab === "myPerformances"
      //   ? allPerformances
      //   : spotlights;

    return Array.isArray(source)
      ? source
      : [];
  }, [
    activePerformanceTab,
    userSpotlights,
    userFollowedArenas,
  ]);

  const arenaSectionTitle = title
    // activePerformanceTab === "myPerformances"
    //   ? "My Performances"
    //   : activePerformanceTab === "mySpotlights"
    //   ? "My Spotlights"
    //   : "My Friends";

  const handleArenaTabChange = (tab) => {
    setActivePerformanceTab(tab);
    setActivePerformanceIndex(0);

    requestAnimationFrame(() => {
      performanceListRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    });
  };

  const handleArenaSwipe = (event) => {
    if (containerWidth <= 0) return;

    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(
      offsetX / containerWidth
    );

    setActivePerformanceIndex(index);
  };

  /* =========================================
      PERFORMANCE PAGE CONTROLS
     ========================================= */

  const totalPages = performances.length;

  const goToPerformancePage = (direction) => {
    const nextPage =
      activePerformanceIndex + direction;

    if (
      nextPage < 0 ||
      nextPage >= totalPages
    ) {
      return;
    }

    performanceListRef.current?.scrollToOffset({
      offset: nextPage * containerWidth,
      animated: true,
    });

    setActivePerformanceIndex(nextPage);
  };
  
  if(!data.length) return null ;


  return (
    <View
        style={{
          paddingHorizontal: spacing(12),
          // paddingTop: spacing(26),
          paddingBottom: spacing(26),
          width,
        }}
        className="justify-center items -center"
      >

   

      {/* =========================================
          SPOTLIGHTS COLLECTION HEADER
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
          // justifyContent: "space-between",

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
            {arenaSectionTitle}
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
            {performances.length}
          </Text>

        </View>

        {/* VIEW ALL */}
        <Pressable
          onPress={() => {
            // Open all arenas
          }}
          accessibilityRole="button"
          accessibilityLabel={`View all ${arenaSectionTitle}`}
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



      {/* =========================================
          ARENA COLLECTION
          ========================================= */}

      {performances.length > 0 ? (
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
          className="bg-[#050505] justify-center items-center"
        >
          {containerWidth > 0 && (
            <FlatList
              ref={performanceListRef}
              key={activePerformanceTab}
              data={performances}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
              onMomentumScrollEnd={
                handleArenaSwipe
              }
              keyExtractor={(arena, index) =>
                String(
                  arena?._id ||
                  arena?.id ||
                  `arena-${index}`
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
                  <PerformanceCard
                    performance={item}
                    performances={performances}
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
          className="items-center justify-center"
          style={{
            height: spacing(380),
            borderRadius: scale(17),
            backgroundColor:
              "rgba(255,255,255,0.018)",
          }}
        >
          <RisingStarIcon
            size={scale(42)}
          />

          <Text
            style={{
              marginTop: spacing(9),
              color:
                "rgba(255,255,255,0.68)",
              fontSize: scale(11),
              fontWeight: "700",
              letterSpacing: scale(0.6),
            }}
          >
            NO ARENAS YET
          </Text>
        </View>
      )}

      {/* =========================================
          PERFORMANCE CAROUSEL PAGE CONTROLS
          ========================================= */}

      {/* {totalPages > 1 && (
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
         onPress={() => goToPerformancePage(-1)}
         disabled={activePerformanceIndex === 0}
         hitSlop={scale(8)}
         accessibilityRole="button"
         accessibilityLabel="Previous arena page"
         style={{
           width: scale(42),

           alignItems: "center",
           justifyContent: "center",
           borderRadius: scale(12),
           opacity: activePerformanceIndex === 0 ? 0.28 : 1,
         }}
       >
         <Ionicons
           name="chevron-back"
           size={scale(23)}
           color={
             activePerformanceIndex === 0
               ? "rgba(255,255,255,0.65)"
               : GOLD
           }
         />
       </Pressable>
     
       <View
         accessibilityRole="progressbar"
         accessibilityLabel={`Arena page ${activePerformanceIndex + 1} of ${totalPages}`}
         style={{
           flex: 1,
           flexDirection: "row",
           alignItems: "center",
           justifyContent: "center",
           gap: scale(7),
         }}
       >
         {Array.from({ length: totalPages }, (_, index) => {
           const isActive = index === activePerformanceIndex;
     
           return (
             <View
               key={`arena-page-${index}`}
               style={{
                 width: !isActive ? scale(9) : scale(9),
                 height: scale(9),
                 borderRadius: scale(4),
                 backgroundColor: isActive
                    ? GOLD
                    : "rgba(255,255,255,0.34)",
                 shadowColor: "#E8B95A",
                 shadowOffset: { width: 0, height: 0 },
                 shadowOpacity: isActive ? 0.55 : 0,
                 shadowRadius: isActive ? 5 : 0,
                 elevation: isActive ? 2 : 0,
               }}
             />
           );
         })}
       </View>
     
       <Pressable
         onPress={() => goToPerformancePage(1)}
         disabled={activePerformanceIndex === totalPages - 1}
         hitSlop={scale(8)}
         accessibilityRole="button"
         accessibilityLabel="Next arena page"
         style={{
           width: scale(42),
          //  height: scale(36),
           alignItems: "center",
           justifyContent: "center",
           borderRadius: scale(12),
           opacity: activePerformanceIndex === totalPages - 1 ? 0.28 : 1,
         }}
       >
         <Ionicons
           name="chevron-forward"
           size={scale(23)}
           color={
             activePerformanceIndex === totalPages - 1
               ? "rgba(255,255,255,0.65)"
               : GOLD
           }
         />
       </Pressable>
     </View>
      )} */}

      

         {/* BOTTOM PAGE INDICATOR */}
         {totalPages > 1 && (
          <View
            style={{
              width: "99%",
              flexDirection: "row",
              // alignItems: "end",
              justifyContent: "space-between",
              marginTop: spacing(24),
              // gap: spacing(14),
              // height: scale(64)
            }}
            className = " bg-[#1b1a1a] self-center py-3 px-3 rounded-xl items-end bo rder bor der-white"
          >
            {/* PREVIOUS */}
            <Pressable
              onPress={() => goToPerformancePage(-1)}
              disabled={activePerformanceIndex === 0}
              hitSlop={8}
              style={{
                // width: scale(40),
                // height: scale(38),
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                activePerformanceIndex === 0
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                activePerformanceIndex === 0
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={scale(21)}
                color={
                  activePerformanceIndex === 0
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
                  {String(activePerformanceIndex + 1)}
                </Text>
                {"  /  "}
                {String(totalPages)}
              </Text>
            </View>

            {/* NEXT */}
            <Pressable
              onPress = {() => goToPerformancePage(1)}
              disabled={activePerformanceIndex === totalPages - 1}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                activePerformanceIndex === totalPages - 1
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                activePerformanceIndex === totalPages - 1
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-forward"
                size={scale(21)}
                color={
                  activePerformanceIndex === totalPages - 1
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