import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../../context/GlobalProvider";


import FriendsIcon from "../../../../../svgIcons/others/friendsIcon";

import { getUserFriendsData } from "../../../../../../apiCalls";
import FollowTabs from "./followTabs";
import FriendCard from "../friend/friendCard/friendCard";

const { width } = Dimensions.get("window");

const GOLD = "#E8B95A";
const BG = "#050505";

const Follows = () => {
  const { userFollowers ,setUserFollowers,userFollowings, scale, spacing, user } = useGlobalContext();
  const [activePage, setActivePage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselWidth = width * 0.93;
  const carouselHeight = scale(380);
  const horizontalPadding = scale(5);
  const topPadding = scale(5);
  const paddingBottom = scale(5);
  const cardGap = scale(9);
  const columns = 2;
  const preferredRowHeight = scale(76);
  const [activeFollowTab, setActiveFollowTab] = useState("myFollowers");
  const followListRef = useRef(null);

  const availableHeight =
    carouselHeight -
    topPadding -
    paddingBottom;

  const rows = Math.max(
    3,
    Math.min(
      4,
      Math.floor(
        (availableHeight + cardGap) /
          (preferredRowHeight + cardGap)
      )
    )
  );

  const followsPerPage = rows * columns;

  const cardWidth =
    (carouselWidth -
      horizontalPadding * 2 -
      cardGap) /
    columns;

  const cardHeight =
    (availableHeight -
      cardGap * (rows - 1)) /
    rows;


//   useEffect(() => {
//     const loadFriends = async() =>  { await getUserFriendsData(user._id, setUserFriends) }
//     loadFriends()
//   }, [])
  
  /*
   * --------------------------------------------------------------------------
   * FRIEND DATA
   * --------------------------------------------------------------------------
   */

  const follows = useMemo(() => {
    const source =
      activeFollowTab === "myFollowers"
        ? userFollowers
        : userFollowings;

    return Array.isArray(source)
      ? source
      : [];
  }, [userFollowers , activeFollowTab]);



  const pages = useMemo(() => {
    if (!follows.length) {
      return [];
    }

    const result = [];

    for (
      let index = 0;
      index < follows.length;
      index += followsPerPage
    ) {
      result.push(
        follows.slice(
          index,
          index + followsPerPage
        )
      );
    }

    return result;
  }, [follows, followsPerPage]);



  const sectionTitle =
    activeFollowTab === "myFollowers"
      ? "My Followers"
      : activeFollowTab === "myRequests"
      ? "Requests Received"
      : "My Friends";

  const handleFriendTabChange = (tab) => {
    setActiveFollowTab(tab);
    setActivePage(0);

    requestAnimationFrame(() => {
      followListRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    });
  };

  /*
   * --------------------------------------------------------------------------
   * CAROUSEL CONTROLS
   * --------------------------------------------------------------------------
   */

  const goToFriendPage = (direction) => {
    const nextPage = activePage + direction;

    if (
      nextPage < 0 ||
      nextPage >= pages.length
    ) {
      return;
    }

    followListRef.current?.scrollToOffset({
      offset: nextPage * carouselWidth,
      animated: true,
    });

    setActivePage(nextPage);
  };

  const totalPages = pages.length;

  /*
   * --------------------------------------------------------------------------
   * CAROUSEL
   * --------------------------------------------------------------------------
   */

  return (
    <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(16),
        paddingBottom: spacing(24),
        width,
      }}
      className="justify-center item s-center"
    >

      <View
        className="items-center justify-center"
        style={{
          width: "100%",
          marginBottom: spacing(10),
          gap: spacing(4),
        }}
      >
        <View
          className="flex-row items-center justify-center"
          style={{
            gap: spacing(8),
            marginBottom: spacing(4),
          }}
        >
          <View
            style={{
              // width: scale(18),
              height: scale(1),
              backgroundColor: "rgba(232,185,90,0.55)",
            }}
            className = "flex-1"
          />

          <Text
            style={{
              fontSize: scale(11),
              fontWeight: "800",
              letterSpacing: scale(1.4),
              color: "#E8B95A",
            }}
          >
            YOUR CONNECTION
          </Text>

          <View
            style={{
              // width: scale(18),
              height: scale(1),
              backgroundColor: "rgba(232,185,90,0.55)",
            }}
            className = "flex-1"
          />
        </View>

        <Text
          style={{
            fontSize: scale(20),
            fontWeight: "900",
            letterSpacing: scale(2.2),
            color: "#F5F5F5",
            textAlign: "center",
            textShadowColor: "rgba(232,185,90,0.14)",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: scale(8),
          }}
        >
          Follow
        </Text>

        <Text
          style={{
            marginTop: spacing(3),
            fontSize: scale(8),
            fontWeight: "600",
            letterSpacing: scale(1.2),
            color: "rgba(255,255,255,0.60)",
            textAlign: "center",
          }}
        >
          STRONGER TOGETHER
        </Text>
      </View>


      <FollowTabs
        activeTab={activeFollowTab}
        setActiveTab={handleFriendTabChange}
        width
      />

      {/* =========================================
          FRIENDS COLLECTION HEADER
          ========================================= */}

      <View
        style={{
          paddingVertical: scale(16),
          marginTop: scale(16),
          width: "95%",
          flexDirection: "row",
        }}
        className="self-center justify-start"
      >
        <View className="flex-row items-center">
          <Text
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: scale(12),
              fontWeight: "800",
            }}
          >
            {sectionTitle}
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: scale(10),
              fontWeight: "800",
              marginLeft: scale(5),
            }}
          >
            ({user.friendCount})
          </Text>
        </View>

       

        <Pressable
          onPress={() => {}}
          style={{
            // alignItems: "flex-end",
          }}
          className="ml-auto"
        >
          <Text
            style={{
              color: "gold",
              fontSize: scale(11),
              fontWeight: "700",
            }}
          >
            View All
          </Text>
        </Pressable>
      </View>

      {/* =========================================
          FRIENDS CAROUSEL
          ========================================= */}

      {pages.length > 0 ? (
        <View
          onLayout={(event) =>
            setContainerWidth(
              event.nativeEvent.layout.width
            )
          }
          style={{
            height: carouselHeight,
            width: carouselWidth,
            overflow: "hidden",
          }}
          className="justify-center self-center b g-[#161616] items-center"
        >
          {containerWidth > 0 && (
            <FlatList
              ref={followListRef}
              data={pages}
              horizontal
              pagingEnabled
              bounces={false}
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              keyExtractor={(_, index) =>
                `friends-page-${index}`
              }
              getItemLayout={(_, index) => ({
                length: carouselWidth,
                offset: carouselWidth * index,
                index,
              })}
              onMomentumScrollEnd={(event) => {
                const offsetX =
                  event.nativeEvent.contentOffset.x;

                const page = Math.round(
                  offsetX / carouselWidth
                );

                setActivePage(page);
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: carouselWidth,
                    height: carouselHeight,
                    paddingHorizontal:
                      horizontalPadding,
                    paddingTop: topPadding,
                    paddingBottom: paddingBottom,
                  }}
                >
                  <View
                    className="flex-1 flex-row sel f-center flex-wrap"
                    style={{
                      columnGap: cardGap,
                      rowGap: cardGap,
                      alignContent: "flex-start",
                    }}
                  >
                    {item.map((friend, index) => (
                      <FriendCard
                        key={
                          friend?._id?.toString?.() ||
                          friend?.uid ||
                          friend?.username ||
                          `friend-${index}`
                        }
                        friend={friend}
                        width={cardWidth}
                        height={cardHeight}
                        scale={scale}
                      />
                    ))}
                  </View>
                </View>
              )}
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
          <FriendsIcon
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
            NO FREINDS YET
          </Text>
        </View>
      )}

      {/* =========================================
          FRIENDS CAROUSEL PAGE CONTROLS
          ========================================= */}

      {totalPages > 0 && (
        <View
          style={{
            width: carouselWidth,
            marginTop: scale(16),
            height: scale(34),
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
          className = "justify-between"
        >
          {/* LEFT / BACK */}
          <Pressable
            onPress={() => goToFriendPage(-1)}
            disabled={activePage === 0}
            hitSlop={scale(8)}
            style={{
              width: scale(34),
              height: scale(28),
              alignItems: "start",
              justifyContent: "center",
              opacity:
                activePage === 0 ? 0.35 : 1,
            }}
          >
            <Ionicons
              name="chevron-back"
              size={scale(22)}
              color={
                activePage === 0
                  ? "rgba(255,255,255,0.7)"
                  : GOLD
              }
            />
          </Pressable>

          {/* PAGE NUMBER */}
          <View
            style={{
              minWidth: scale(48),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: scale(12),
                fontWeight: "800",
                letterSpacing: scale(0.5),
              }}
            >
              {activePage + 1} / {totalPages}
            </Text>
          </View>

          {/* RIGHT / NEXT */}
          <Pressable
            onPress={() => goToFriendPage(1)}
            disabled={
              activePage === totalPages - 1
            }
            hitSlop={scale(8)}
            style={{
              width: scale(34),
              height: scale(28),
              alignItems: "center",
              justifyContent: "center",
              opacity:
                activePage === totalPages - 1
                  ? 0.45
                  : 1,
            }}
          >
            <Ionicons
              name="chevron-forward"
              size={scale(22)}
              color={
                activePage === totalPages - 1
                  ? "rgba(255,255,255,0.7)"
                  : GOLD
              }
            />
          </Pressable>
        </View>
      )}

      {/* <View
        style={{
          paddingVertical: scale(16),
          width: "95%",
        }}
        className="justify-center self-center item s-center"
      >
        <ArenaFooter
          scale={scale}
          spacing={spacing}
          onPress={null}
          activeArenaTab={null}
        />
      </View> */}
    </View>
  );
};

export default Follows;