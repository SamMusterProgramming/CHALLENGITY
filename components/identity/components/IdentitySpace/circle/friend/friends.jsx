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


const Friends = ({data , title , textHeader , description1 , description2}) => {
  const { userFriends,setUserFriends, scale, spacing, user } = useGlobalContext();
  const [activePage, setActivePage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselWidth = width * 0.93;
  const carouselHeight = scale(386);
  const horizontalPadding = scale(0);
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


  // useEffect(() => {
  //   const loadFriends = async() =>  { await getUserFriends(user._id, setUserFriends) }
  //   loadFriends()
  // }, [])
  
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
          FRIENDS COLLECTION HEADER
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
          // justifyContent: "space-between",

          // backgroundColor: "rgba(255,255,255,0.025)",
          // borderWidth: 1,
          // borderColor: "rgba(232,185,90,0.16)",
          borderRadius: scale(12),
        }}
        className = "justify-between bg-[#1b1a1a] gap-4 flex-1"
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
            {title}
          </Text>

          {/* COUNT BADGE */}
          {/* <View
            style={{
              marginLeft: scale(9),
              minWidth: scale(24),
              height: scale(22),
              paddingHorizontal: scale(6),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: scale(7),
              backgroundColor: "rgba(232,185,90,0.09)",
              borderWidth: 1,
              borderColor: "rgba(232,185,90,0.18)",
            }}
          > */}
            <Text
              style={{
                color: "#E8B95A",
                marginLeft: scale(9),
                fontSize: scale(11),
                fontWeight: "700",
                fontVariant: ["tabular-nums"],
              }}
            >
              {friends.length}
            </Text>
          {/* </View> */}
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
            height: data.length >= 7 ?
             carouselHeight : cardHeight * Math.round(data.length / 2 + 0.2) + (Math.round(data.length / 2 + 0.2)-1) * cardGap ,
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
                    // height: carouselHeight,
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

   

         {/* BOTTOM PAGE INDICATOR */}
         {totalPages > 1 && (
          <View
            style={{
              width: "99%",
              flexDirection: "row",
              // alignItems: "end",
              justifyContent: "space-between",
              marginTop: spacing(28),
            }}
            className = " bg-[#1b1a1a] self-center py-3 px-3 rounded-xl items-end bo rder bor der-white"
          >
            {/* PREVIOUS */}
            <Pressable
              onPress={() => goToFriendPage(-1)}
              disabled={activePage === 0}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                  activePage === 0
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                  activePage === 0
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={scale(21)}
                color={
                  activePage === 0
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
                  {String(activePage + 1)}
                </Text>
                {"  /  "}
                {String(totalPages)}
              </Text>
            </View>

            {/* NEXT */}
            <Pressable
              onPress={() => goToFriendPage(1)}
              disabled={activePage === totalPages - 1}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                  activePage === totalPages - 1
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                  activePage === totalPages - 1
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-forward"
                size={scale(21)}
                color={
                  activePage === totalPages - 1
                    ? "rgba(255,255,255,0.22)"
                    : "#E8B95A"
                }
              />
            </Pressable>
          </View>
        )}

    </View>
  );
};

export default Friends;