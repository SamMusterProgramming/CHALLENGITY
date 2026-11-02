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



import { useProfileSpace } from "../../../context/ProfileSpaceContext";

import CreateArenaModal
  from "../../../../../modal/createArenaModal";

import { createArenaByUser } from "../../../../../../apiCalls";

// import ArenaFooter from "./arenaFooter/arenaFooter";
import SpotlightTabs from "./spotlightTabs";
import SpotlightCard from "./spotlightCard/spotlightCard";
import ArenaFooter from "../arena/arenaFooter/arenaFooter";
import RisingStarIcon from "../../../../../svgIcons/RisingStarIcon";

export default function Spotlights({
  onCreateArena,
}) {
  const {
    userSpotlights,
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

  const [activeSpotlightTab, setActiveSpotlightTab] =
    useState("mySpotlights");

  const [activeSpotlightIndex, setActiveSpotlightIndex] =
    useState(0);

  const arenaListRef = useRef(null);

  const { width } = useWindowDimensions();

  const [containerWidth, setContainerWidth] =
    useState(0);

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
    switch (activeSpotlightTab) {
      case "myArenas":
        setOpenModal(true);
        break;

      default:
        break;
    }
  };

  const spotlights = useMemo(() => {
    // const spotlights = userArenas.flatMap((arena) =>
    //     Array.isArray(arena.posts)
    //       ? arena.posts.filter(
    //           (post) =>
    //             post.globalSpotlight?.spotlight === true ||
    //             post.regionalSpotlight?.spotlight === true ||
    //             post.localSpotlight?.spotlight === true
    //         )
    //       : []
    //   );

    const source =
      activeSpotlightTab === "mySpotlights"
        ?  userSpotlights
        : userFollowedArenas;

    return Array.isArray(source)
      ? source
      : [];
    }, [
    activeSpotlightTab,
    userSpotlights,
    userFollowedArenas,
  ]);



  const arenaSectionTitle =
    activeSpotlightTab === "mySpotlights"
      ? "My Spotlights"
      : activeSpotlightTab === "myFollowings"
      ? "My Saved"
      : "My Friends";

  const handleArenaTabChange = (tab) => {
    setActiveSpotlightTab(tab);
    setActiveSpotlightIndex(0);

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
    setActiveSpotlightIndex(index);
  };

  return (
    <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(16),
        paddingBottom: spacing(24),
        width,
      }}
      className="justify-center items -center"
    >
      {/* =========================================
          SECTION HEADER
          ========================================= */}

      <SpotlightTabs
        activeSpotlightTab={activeSpotlightTab}
        setActiveSpotlightTab={handleArenaTabChange}
        width
      />

  

  

      {spotlights.length >= 1 && (
        <View
          style={{
            width: "100%",
            paddingVertical: scale(16),
            marginTop : scale(8),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: scale(5),
          }}
        >
          {spotlights.map((_, index) => {
            const isActive =
              index === activeSpotlightIndex;

            return (
              <View
                key={`arena-dot-${index}`}
                style={{
                  width: isActive
                    ? scale(8)
                    : scale(8),
                  height: scale(8),
                  borderRadius: scale(4),
                  backgroundColor: isActive
                    ? "rgba(232,185,90,0.85)"
                    : "rgba(255,255,255,0.22)",
                }}
              />
            );
          })}
        </View>
      )}

      {/* =========================================
          ARENA COLLECTION
       ========================================= */}

      {spotlights.length > 0 ? (
        <View
          onLayout={(event) =>
            setContainerWidth(
              event.nativeEvent.layout.width
            )
          }
          style={{
            height: spacing(380),
            width: "100%",
            overflow: "hidden",
          }}
          className="bg-[#050505] justify-center items-center"
        >
          {containerWidth > 0 && (
            <FlatList
              ref={arenaListRef}
              key={activeSpotlightTab}
              data={spotlights}
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
                  <SpotlightCard
                    spotlight={item}
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
            borderWidth: scale(1),
            borderColor:
              "rgba(255,255,255,0.075)",
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
    spotlights COLLECTION HEADER
    ========================================= */}
 
     <View
        style={{
          width: "95%",
          paddingVertical: scale(16),
          flexDirection: "row-reverse",

        }}
        className = "self-center justify-between"
      >

        <Pressable
          onPress={() => {
            // Open all arenas
          }}
          style={{
            // width: scale(60),
            // flex:1,
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: "gold",
              fontSize: scale(11),
              fontWeight: "700",
            //   letterSpacing: scale(0.2),
            }}
          >
            View All
          </Text>
        
        </Pressable>


        <View
          style={{
            // flex: 1,
            // alignItems: "startr",
          }}
          className = "flex-row items-center"
        >
           
          <Text
            // numberOfLines={1}
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: scale(11),
              fontWeight: "800",
            //   letterSpacing: 0.3,
            }}
            className=" "
          >
            {arenaSectionTitle}
          </Text>
          <Text
            // numberOfLines={1}
            style={{
              color: "white",
              fontSize: scale(10),
              fontWeight: "800",
              marginLeft:scale(5),
            //   letterSpacing: 0.3,
            }}
            className=""
             >
           ( {spotlights.length} )
          </Text>
        </View>

      </View>


      <ArenaFooter
        scale={scale}
        spacing={spacing}
        onPress={handleAction}
        activeSpotlightTab={activeSpotlightTab}
      />

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