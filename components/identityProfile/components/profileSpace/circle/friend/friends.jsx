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
import FriendCard from "./friendCard/friendCard";
import FriendsIcon from "../../../../../svgIcons/others/friendsIcon";


const { width } = Dimensions.get("window");

const GOLD = "#E8B95A";
const BG = "#050505";


const Friends = ({data , title}) => {
  const { userFriends,setUserFriends, scale, spacing, user } = useGlobalContext();
  const [activePage, setActivePage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselWidth = width * 0.93;
  const carouselHeight = scale(386);
  const horizontalPadding = scale(4);
  const topPadding = scale(0);
  const paddingBottom = scale(0);
  const cardGap = scale(6);
  const columns = 2;
  const preferredRowHeight = scale(72);
  const [activeFriendTab, setActiveFriendTab] = useState("myFriends");
  const friendListRef = useRef(null);

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

  const friendsPerPage = rows * columns;

  const cardWidth =
    (carouselWidth -
      horizontalPadding * 2 -
      cardGap) /
    columns;

  const cardHeight =
    (availableHeight -
      cardGap * (rows - 1)) /
    rows;

  
  /*
   * --------------------------------------------------------------------------
   * FRIEND DATA
   * --------------------------------------------------------------------------
   */

  const friends = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.filter(Boolean);
  }, [data]);

  const pages = useMemo(() => {
    if (!friends.length) {
      return [];
    }

    const result = [];

    for (
      let index = 0;
      index < friends.length;
      index += friendsPerPage
    ) {
      result.push(
        friends.slice(
          index,
          index + friendsPerPage
        )
      );
    }

    return result;
  }, [friends, friendsPerPage]);



  const sectionTitle = title
    // activeFriendTab === "myFriends"
    //   ? "My Friends"
    //   : activeFriendTab === "myRequests"
    //   ? "Requests Received"
    //   : "My Friends";

  const handleFriendTabChange = (tab) => {
    setActiveFriendTab(tab);
    setActivePage(0);

    requestAnimationFrame(() => {
      friendListRef.current?.scrollToOffset({
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

    friendListRef.current?.scrollToOffset({
      offset: nextPage * carouselWidth,
      animated: true,
    });

    setActivePage(nextPage);
  };

  const totalPages = pages.length;
  

  if(!friends.length) return null ;

  /*
   * --------------------------------------------------------------------------
   * CAROUSEL
   * --------------------------------------------------------------------------
   */

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
          FRIENDS COLLECTION HEADER
       ========================================= */}

      <View
        style={{
          width: "100%",
          marginTop: scale(28),
          marginBottom: scale(20),
          paddingVertical: scale(10),
          paddingHorizontal: scale(12),
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-between",

          // backgroundColor: "rgba(255,255,255,0.075)",
          // borderWidth: 1,
          // borderColor: "rgba(232,185,90,0.16)",
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
            {title}
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
            {friends.length}
          </Text>

        </View>

        {/* VIEW ALL */}
        <Pressable
          onPress={() => {
            // Open all arenas
          }}
          accessibilityRole="button"
          accessibilityLabel={`View all ${title}`}
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
            // height: carouselHeight,
            width: carouselWidth,
            overflow: "hidden",
          }}
          className="justify-center self-center b g-[#6b3434] items-center"
        >
          {containerWidth > 0 && (
            <FlatList
              ref={friendListRef}
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
                    // height: cardHeight * rows,
                    paddingHorizontal: horizontalPadding,
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
            height: spacing(160),
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
            List is empty
          </Text>
        </View>
      )}

      {/* =========================================
          FRIENDS CAROUSEL PAGE CONTROLS
          ========================================= */}

      {totalPages > 1 && (
         <View
         style={{
           width: "100%",
           marginTop: scale(26),
          //  paddingHorizontal: scale(8),
           paddingVertical: scale(4),
           flexDirection: "row",
           alignItems: "center",
           justifyContent: "space-between",
           backgroundColor: "rgba(255,255,255,0.095)",
           borderRadius: scale(8),
         }} >
         {/* PREVIOUS */}
         <Pressable
           onPress={() => goToFriendPage(-1)}
           disabled={activePage === 0}
           hitSlop={scale(8)}
           accessibilityRole="button"
           accessibilityLabel="Previous stage page"
           style={{
             width: scale(42),
             height: scale(36),
             alignItems: "center",
             justifyContent: "center",
             borderRadius: scale(12),
             opacity: activePage === 0 ? 0.28 : 1,
           }}
         >
           <Ionicons
             name="chevron-back"
             size={scale(23)}
             color={
               activePage === 0
                 ? "rgba(255,255,255,0.55)"
                 : GOLD
             }
           />
         </Pressable>
       
         {/* PAGE DOTS */}
         <View
           accessibilityRole="progressbar"
           accessibilityLabel={`Stage page ${activePage + 1} of ${totalPages}`}
           style={{
             flex: 1,
             flexDirection: "row",
             alignItems: "center",
             justifyContent: "center",
             gap: scale(7),
           }}
         >
           {Array.from({ length: totalPages }, (_, index) => {
             const isActive = index === activePage;
       
             return (
               <View
                 key={`stage-page-${index}`}
                 style={{
                   width: !isActive ? scale(9) : scale(9),
                   height: scale(9),
                   borderRadius: 999,
                   backgroundColor: isActive
                     ? "#E8B95A"
                     : "rgba(255,255,255,0.24)",
                  //  shadowColor: "#E8B95A",
                  //  shadowOffset: { width: 0, height: 0 },
                  //  shadowOpacity: isActive ? 0.55 : 0,
                  //  shadowRadius: isActive ? 5 : 0,
                  //  elevation: isActive ? 2 : 0,
                 }}
               />
             );
           })}
         </View>
       
         {/* NEXT */}
         <Pressable
           onPress={() => goToFriendPage(1)}
           disabled={activePage === totalPages - 1}
           hitSlop={scale(8)}
           accessibilityRole="button"
           accessibilityLabel="Next stage page"
           style={{
             width: scale(42),
             height: scale(36),
             alignItems: "center",
             justifyContent: "center",
             borderRadius: scale(12),
             opacity: activePage === totalPages- 1 ? 0.28 : 1,
           }}
         >
           <Ionicons
             name="chevron-forward"
             size={scale(23)}
             color={
               activePage === totalPages - 1
                 ? "rgba(255,255,255,0.55)"
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

export default Friends;