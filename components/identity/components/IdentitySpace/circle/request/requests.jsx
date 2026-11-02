import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";

import { useGlobalContext } from "../../../../../../context/GlobalProvider";
import ArenaFooter from "../../legacy/arena/arenaFooter/arenaFooter";
import FriendsIcon from "../../../../../svgIcons/others/friendsIcon";
import RequestsTabs from "./requestTabs";
import FriendRequestCard from "./friendRequestCard./friendRequestCard";
import { acceptFriendRequest, denyFriendRequest } from "../../../../../../apiCalls";
// import FriendRequestCard from "./friendRequestCard./friendRequestCard";

const { width } = Dimensions.get("window");
const GOLD = "#E8B95A";
const BG = "#050505";

const Requests = ({data , title}) => {
  const { userFriendRequestsReceived ,  setUserFriendRequestsReceived, scale, spacing ,setUserFriends  , user , setUser } = useGlobalContext();
  const [activePage, setActivePage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselWidth = width * 0.93;
  const carouselHeight = scale(380);
  const horizontalPadding = scale(5);
  const topPadding = scale(5);
  const paddingBottom = scale(5);
  const cardGap = scale(9);
  const columns = 2;
  const preferredRowHeight = scale(86);
  const [activeFriendTab, setActiveFriendTab] = useState("myFriendQuests");
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


//   useEffect(() => {
//     console.log(
//       "USER FRIEND REQUESTS:",
//       userFriendRequestsReceived
//     );
  
//     console.log(
//       "USER FRIEND REQUEST USERS:",
//       userFriendRequestsReceived?.users
//     );
//   }, [userFriendRequestsReceived]);

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



  const sectionTitle =
    activeFriendTab === "myFriendQuests"
      ? "Friend Requests"
      : activeFriendTab === "myRequests"
      ? "Requests Received"
      : "My Friends";

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


  const acceptFRequest = async(u) => {
  
     await acceptFriendRequest(
      u._id,
      user._id,
      setUserFriendRequestsReceived
     );

     setUser((prev) => ({
      ...prev,
      friendCount: (prev.friendCount || 0) + 1,
    }));

  }
  
  const denyFRequest = async(u) => {
  
    await denyFriendRequest(
     u._id,
     user._id,
     setUserFriendRequestsReceived
   );
 }

 if(!data?.length) return null ;


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


      {/* <RequestsTabs
        activeFriendTab={activeFriendTab}
        setActiveFriendTab={handleFriendTabChange}
        width
      /> */}


      {/* =========================================
          FRIENDS COLLECTION HEADER
          ========================================= */}

      <View
        style={{
          paddingVertical: scale(16),
          marginTop: scale(20),
          width: "95%",
          flexDirection: "row",
        }}
        className="self-center justify-start"
      >
        <View className="flex-row items-center">
          <Text
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: scale(11),
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
            ({friends.length})
          </Text>
        </View>
      

        {/* carousel */}
        {pages.length > 1 ? (
          <View
            style={{
              marginLeft: scale(20),
              flexDirection: "row",
              gap: scale(5),
            }}
            className="justify-center items-center"
          >
            {pages.map((_, index) => {
              const isActive = index === activePage;

              return (
                <View
                  key={`friend-dot-${index}`}
                  style={{
                    width: scale(8),
                    height: scale(8),
                    borderRadius: scale(4),
                    backgroundColor: isActive
                      ? "rgba(232,185,90,0.85)"
                      : "rgba(255,255,255,0.42)",
                  }}
                />
              );
            })}
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}

        <Pressable
          onPress={() => {}}
          style={{
            // alignItems: "flex-end",
          }}
          className="ml-auto"  >
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
          setContainerWidth( event.nativeEvent.layout.width )
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
                    
                    <FriendRequestCard
                      key={
                        friend?._id?.toString?.() ||
                        friend?.uid ||
                        friend?.username ||
                        `friend-${index}`
                        }
                      user={friend}
                      width={cardWidth}
                      height={cardHeight}
                      scale={scale}
                      onAccept = {acceptFRequest}
                      onDeny = {denyFRequest}

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
              letterSpacing: scale(0.2),
            }}
          >
            NO  REQUESTS  YET
          </Text>
        </View>
       )}

       
     

    </View>
  );
};

export default Requests;