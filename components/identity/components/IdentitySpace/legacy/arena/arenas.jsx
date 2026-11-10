

import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";

import {
  useGlobalContext,
} from "../../../../../../context/GlobalProvider";

import ArenaPortalIcon
  from "../../../../../svgIcons/ArenaPortalIcon";

import ArenaCard
  from "./arenaCard/ArenaCard";

import { useProfileSpace } from "../../../context/ProfileSpaceContext";

import CreateArenaModal
  from "../../../../../modal/createArenaModal";

import { createArenaByUser } from "../../../../../../apiCalls";

import ArenaTabs from "./arenaTabs";

import ArenaFooter from "./arenaFooter/arenaFooter";

import { Ionicons } from "@expo/vector-icons";

export default function Arenas({
  data , title , textHeader , description1 , description2
}) {
  const {
    // userArenas,
    // userFollowedArenas,
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

  const [activeArenaTab, setActiveArenaTab] =
    useState("myArenas");

  const [activeArenaIndex, setActiveArenaIndex] =
    useState(0);

  const arenaListRef = useRef(null);

  const { width } = useWindowDimensions();

  const [containerWidth, setContainerWidth] =
    useState(0);

  const GOLD = "#E8B95A";

  if (activeSpace !== "legacy") {
    return null;
  }

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
    switch (activeArenaTab) {
      case "myArenas":
        setOpenModal(true);
        break;

      default:
        break;
    }
  };

  const arenas = useMemo(() => {
    const source = data
      // activeArenaTab === "myArenas"
      //   ? userArenas
      //   : userFollowedArenas;

    return Array.isArray(source)
      ? source
      : [];
  }, [
    data
  ]);

  const arenaSectionTitle = title
    // activeArenaTab === "myArenas"
    //   ? "My Arenas"
    //   : activeArenaTab === "myFollowings"
    //   ? "My Followings"
    //   : "My Friends";

  const handleArenaTabChange = (tab) => {
    setActiveArenaTab(tab);
    setActiveArenaIndex(0);

    requestAnimationFrame(() => {
      arenaListRef.current?.scrollToOffset({
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

    setActiveArenaIndex(index);
  };

  /*
   * --------------------------------------------------------------------------
   * ARENA CAROUSEL CONTROLS
   * --------------------------------------------------------------------------
   */

  const goToArenaPage = (direction) => {
    const nextPage =
      activeArenaIndex + direction;

    if (
      nextPage < 0 ||
      nextPage >= arenas.length
    ) {
      return;
    }

    arenaListRef.current?.scrollToOffset({
      offset: nextPage * containerWidth,
      animated: true,
    });

    setActiveArenaIndex(nextPage);
  };

  const totalArenaPages = arenas.length;

  if(!data.length) return null ;


  return (
    <View
      style={{
        paddingHorizontal: spacing(12),
        paddingTop: spacing(20), 
        paddingBottom: spacing(12),
        width,
      }}
      className="justify-center items -center"
    >

   

      {/* =========================================
          ARENA COLLECTION HEADER
      ========================================= */}
      
      <View style={{
         marginBottom: spacing(8) ,
        //  paddingHorizontal: scale(12),
        }}>
        
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: spacing(5),
              }}
            >
              <View
                style={{
                  width: scale(18),
                  height: "80%",
                  backgroundColor: "#E8B95A",
                  marginRight: spacing(8),
                }}
              />

              <Text
                style={{
                  color: "#E8B95A",
                  fontSize: scale(11),
                  fontWeight: "900",
                  letterSpacing: scale(0.8),
                }}
              >
                {textHeader}
              </Text>
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: scale(12),
                lineHeight: scale(20),
                fontWeight: "400",
                letterSpacing: scale(0.15),
                opacity: 0.82,
              }}
            >
              {description1}
              <Text
                style={{
                  color: "#E8B95A",
                  fontWeight: "700",
                }}
              >
                performances
              </Text>
              {description2}
            </Text>

      </View>

      
     
      <View
        style={{
          width: "100%",
          marginTop: scale(8),
          marginBottom: scale(16),
          paddingVertical: scale(10),
          paddingHorizontal: scale(12),
          flexDirection: "row",
          alignItems: "center",
          borderRadius: scale(12),
        }}
        className = "justify-between bg-[#1b1a1a]  flex-1"
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
              color: "#c0c0c0",
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
            {arenas.length}
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

      {arenas.length > 0 ? (
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
              ref={arenaListRef}
              data={arenas}
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
                  <ArenaCard
                    arena={item}
                    isLast={
                      index ===
                      arenas.length - 1
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
          className="items-center justify-center"
          style={{
            height: spacing(380),
            borderRadius: scale(17),
            backgroundColor:
              "rgba(255,255,255,0.018)",
          }}
        >
          <ArenaPortalIcon
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
          ARENA CAROUSEL PAGE CONTROLS
      ========================================= */}

       {/* BOTTOM PAGE INDICATOR */}
       {totalArenaPages  > 1 && (
          <View
            style={{
              width: "99%",
              flexDirection: "row",
              // alignItems: "end",
              justifyContent: "space-between",
              marginTop: spacing(16),
              // gap: spacing(14),
              // height: scale(64)
            }}
            className = " bg-[#1b1a1a] self-center py-3 px-3 rounded-xl items-end bo rder bor der-white"
          >
            {/* PREVIOUS */}
            <Pressable
              onPress={() => goToArenaPage(-1)}
              disabled={activeArenaIndex === 0}
              hitSlop={8}
              style={{
                // width: scale(40),
                // height: scale(38),
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                activeArenaIndex === 0
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                activeArenaIndex === 0
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={scale(21)}
                color={
                  activeArenaIndex === 0
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
                  {String(activeArenaIndex + 1)}
                </Text>
                {"  /  "}
                {String(totalArenaPages )}
              </Text>
            </View>

            {/* NEXT */}
            <Pressable
              onPress = {() => goToArenaPage(1)}
              disabled={activeArenaIndex === totalArenaPages  - 1}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                activeArenaIndex === totalArenaPages  - 1
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                activeArenaIndex === totalArenaPages  - 1
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-forward"
                size={scale(21)}
                color={
                  activeArenaIndex === totalArenaPages  - 1
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