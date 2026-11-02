import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useGlobalContext } from "../../../../../context/GlobalProvider";
import { useProfileSpace } from "../../context/ProfileSpaceContext";

import FollowersIcon from "../../../../svgIcons/others/followersIcon";
import FriendsIcon from "../../../../svgIcons/others/friendsIcon";
import FollowingsIcon from "../../../../svgIcons/others/followingsIcon";
import SpotlightIcon from "../../../../custom/spotlightIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BG = "#050505";

const TABS = [
  {
    id: "friends",
    label: "FRIENDS",
  }, 
  {
    id: "requests",
    label: "REQUESTS",
  },
  {
    id: "followers",
    label: "FOLLOWERS",
  },
  {
    id: "followings",
    label: "FOLLOWINGS",
  }
];

const CircleTabs = () => {
  const { scale } = useGlobalContext();

  const {
    activeSpace,
    activeCircleTab,
    setActiveCircleTab,
  } = useProfileSpace();

  const flatListRef = useRef(null);

  /*
   * --------------------------------------------------------------------------
   * DIMENSIONS
   * --------------------------------------------------------------------------
   */

  const CAROUSEL_WIDTH = SCREEN_WIDTH * 0.90;

  const CARD_WIDTH = SCREEN_WIDTH * 0.40;
  const CARD_HEIGHT = scale(57);
  const ITEM_WIDTH = CARD_WIDTH;

  const CAROUSEL_HEIGHT = scale(63);

  /*
   * --------------------------------------------------------------------------
   * CAROUSEL ITEMS
   * --------------------------------------------------------------------------
   */

  const CAROUSEL_ITEMS = [
    {
      id: "__start__",
      type: "indicator",
      label: "START",
    },

    ...TABS.map((tab) => ({
      ...tab,
      type: "tab",
    })),

    {
      id: "__end__",
      type: "indicator",
      label: "END",
    },
  ];

  /*
   * --------------------------------------------------------------------------
   * SCROLL
   * --------------------------------------------------------------------------
   */

  const scrollX = useRef(
    new Animated.Value(ITEM_WIDTH)
  ).current;

  /*
   * --------------------------------------------------------------------------
   * CENTERING
   * --------------------------------------------------------------------------
   */

  const PADDING_LEFT =
    CAROUSEL_WIDTH / 2 -
    ITEM_WIDTH / 2;

  const PADDING_RIGHT =
    CAROUSEL_WIDTH / 2 -
    ITEM_WIDTH / 2;

  /*
   * --------------------------------------------------------------------------
   * SNAP LIMITS
   * --------------------------------------------------------------------------
   */

  const FIRST_SNAP = ITEM_WIDTH;
  const LAST_SNAP = ITEM_WIDTH * 4;

  /*
   * --------------------------------------------------------------------------
   * INITIAL POSITION
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    if (activeSpace !== "circle") {
      return;
    }

    const activeIndex = TABS.findIndex(
      (tab) => tab.id === activeCircleTab
    );

    if (activeIndex < 0) {
      return;
    }

    const carouselIndex = activeIndex + 1;

    const targetOffset =
      carouselIndex * ITEM_WIDTH;

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: targetOffset,
        animated: false,
      });

      scrollX.setValue(targetOffset);
    });
  }, [
    activeSpace,
    activeCircleTab,
    ITEM_WIDTH,
  ]);

  if (activeSpace !== "circle") {
    return null;
  }

  /*
   * --------------------------------------------------------------------------
   * ICON PICKER
   * --------------------------------------------------------------------------
   */

  const getCircleTabIcon = (
    tabId,
    size = 18
  ) => {
    switch (tabId) {
      case "friends":
        return <FriendsIcon size={size} />;

      case "followers":
        return <FollowersIcon size={size} />;

      case "followings":
        return <FollowingsIcon size={size} />;

      case "spotlights":
        return <SpotlightIcon size={size} />;

      default:
        return null;
    }
  };

  /*
   * --------------------------------------------------------------------------
   * INDICATOR CARD
   * --------------------------------------------------------------------------
   */

  const renderIndicatorCard = (item) => {
    const isStart =
      item.id === "__start__";

    return (
      <View
        style={{
          flex: 1,
          borderRadius: scale(11),
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={[
            "rgba(72,86,100,0.34)",
            "rgba(25,29,33,0.92)",
            "rgba(58,69,80,0.30)",
          ]}
          locations={[0, 0.48, 1]}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: scale(20),
              height: scale(20),
              borderRadius: scale(10),
              borderWidth: scale(0.8),
              borderColor:
                "rgba(232,185,90,0.72)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: scale(5),
                height: scale(5),
                borderRadius: scale(3),
                backgroundColor:
                  "rgba(232,185,90,0.72)",
              }}
            />
          </View>

          <Text
            style={{
              marginTop: scale(6),
              color:
                "rgba(255,255,255,0.72)",
              fontSize: scale(11),
              fontWeight: "700",
              letterSpacing: scale(0.8),
            }}
          >
            {isStart ? "START" : "END"}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  /*
   * --------------------------------------------------------------------------
   * NORMAL CARD
   * --------------------------------------------------------------------------
   */

  const renderNormalCard = (
    item,
    isActive,
    pressed
  ) => {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: scale(11),
          overflow: "hidden",
          backgroundColor:
            "rgba(10,10,10,0.94)",
          opacity: pressed ? 0.82 : 1,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(72,86,100,0.38)",
            "rgba(25,29,33,0.92)",
            "rgba(58,69,80,0.34)",
          ]}
          locations={[0, 0.46, 1]}
          style={{
            flex: 1,
            paddingHorizontal: scale(6),
            paddingVertical: scale(3),
            alignItems: "center",
            justifyContent: "center",
            gap: scale(4),
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: scale(1),
            }}
          >
            {getCircleTabIcon(
              item.id,
              scale(25)
            )}
          </View>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: isActive
                ? "#FFF3C7"
                : "rgba(255,255,255,0.78)",
              fontSize: scale(11),
              fontWeight: isActive
                ? "900"
                : "700",
              letterSpacing: scale(0.2),
              textAlign: "center",
            }}
          >
            {item.label}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  /*
   * --------------------------------------------------------------------------
   * RENDER ITEM
   * --------------------------------------------------------------------------
   */

  const renderItem = ({
    item,
    index,
  }) => {
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
      (index + 2) * ITEM_WIDTH,
    ];

    const cardScale =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.67,
          0.69,
          1,
          0.69,
          0.97,
        ],
        extrapolate: "clamp",
      });

    const opacity =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.48,
          0.74,
          1,
          0.74,
          0.48,
        ],
        extrapolate: "clamp",
      });

    /*
     * Keeps the bottom edge of every scaled card
     * on the same horizontal line.
     */
    const bottomOffset =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          CARD_HEIGHT * (1 - 0.67) / 2,
          CARD_HEIGHT * (1 - 0.69) / 2,
          0,
          CARD_HEIGHT * (1 - 0.69) / 2,
          CARD_HEIGHT * (1 - 0.97) / 2,
        ],
        extrapolate: "clamp",
      });

    const isIndicator =
      item.type === "indicator";

    const isActive =
      !isIndicator &&
      activeCircleTab === item.id;

    const handlePress = () => {
      if (isIndicator) {
        return;
      }

      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_WIDTH,
        animated: true,
      });
    };

    return (
      <Animated.View
        style={{
          width: ITEM_WIDTH,
          height: CAROUSEL_HEIGHT,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,

            opacity: isIndicator
              ? Animated.multiply(
                  opacity,
                  0.70
                )
              : opacity,

            zIndex: isActive ? 50 : 20,

            transform: [
              {
                translateY: bottomOffset,
              },
              {
                scale: cardScale,
              },
            ],
          }}
        >
          {isIndicator ? (
            renderIndicatorCard(item)
          ) : (
            <Pressable
              onPress={handlePress}
              style={{
                flex: 1,
              }}
            >
              {({ pressed }) =>
                renderNormalCard(
                  item,
                  isActive,
                  pressed
                )
              }
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
    );
  };

  /*
   * --------------------------------------------------------------------------
   * CLAMP
   * --------------------------------------------------------------------------
   */

  const clampScrollPosition = (
    offsetX
  ) => {
    if (offsetX < FIRST_SNAP) {
      flatListRef.current?.scrollToOffset({
        offset: FIRST_SNAP,
        animated: false,
      });

      scrollX.setValue(FIRST_SNAP);

      return FIRST_SNAP;
    }

    if (offsetX > LAST_SNAP) {
      flatListRef.current?.scrollToOffset({
        offset: LAST_SNAP,
        animated: false,
      });

      scrollX.setValue(LAST_SNAP);

      return LAST_SNAP;
    }

    return offsetX;
  };

  /*
   * --------------------------------------------------------------------------
   * MOMENTUM END
   * --------------------------------------------------------------------------
   */

  const handleMomentumEnd = (
    event
  ) => {
    const offsetX =
      clampScrollPosition(
        event.nativeEvent.contentOffset.x
      );

    let closestIndex = 1;
    let smallestDistance = Infinity;

    [1, 2, 3, 4].forEach(
      (carouselIndex) => {
        const snap =
          carouselIndex * ITEM_WIDTH;

        const distance =
          Math.abs(
            offsetX - snap
          );

        if (
          distance <
          smallestDistance
        ) {
          smallestDistance = distance;
          closestIndex =
            carouselIndex;
        }
      }
    );

    setActiveCircleTab(
      TABS[closestIndex - 1].id
    );
  };

  /*
   * --------------------------------------------------------------------------
   * DRAG END
   * --------------------------------------------------------------------------
   */

  const handleScrollEndDrag = (
    event
  ) => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    if (offsetX < FIRST_SNAP) {
      flatListRef.current?.scrollToOffset({
        offset: FIRST_SNAP,
        animated: true,
      });

      return;
    }

    if (offsetX > LAST_SNAP) {
      flatListRef.current?.scrollToOffset({
        offset: LAST_SNAP,
        animated: true,
      });
    }
  };

  /*
   * --------------------------------------------------------------------------
   * RENDER
   * --------------------------------------------------------------------------
   */

  return (
    <View
      style={{
        width: CAROUSEL_WIDTH,
        height: CAROUSEL_HEIGHT,
        overflow: "hidden",
        backgroundColor: BG,
        marginTop: scale(16),
        marginBottom: scale(8),
        alignSelf: "center",
      }}
    >
      <Animated.FlatList
        ref={flatListRef}
        data={CAROUSEL_ITEMS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        disableIntervalMomentum
        contentContainerStyle={{
          paddingLeft: PADDING_LEFT,
          paddingRight: PADDING_RIGHT,
        }}
        initialScrollIndex={1}
        style={{
          width: CAROUSEL_WIDTH,
          flex: 1,
        }}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={16}
        onScrollEndDrag={
          handleScrollEndDrag
        }
        onMomentumScrollEnd={
          handleMomentumEnd
        }
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset:
            ITEM_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

export default CircleTabs;