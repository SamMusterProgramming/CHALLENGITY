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

import ArenaPortalIcon from "../../../../svgIcons/ArenaPortalIcon";
import StagePortalIcon from "../../../../svgIcons/StagePortalIcon";
import RisingStarIcon from "../../../../svgIcons/RisingStarIcon";
import PerformanceIcon from "../../../../svgIcons/others/PerformanceIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const GOLD = "#E8B95A";
const BG = "#050505";

const TABS = [
  {
    id: "arenas",
    label: "ARENAS",
  },
  {
    id: "stages",
    label: "STAGES",
  },
  {
    id: "performances",
    label: "PERFORMANCES",
  },
  {
    id: "spotlights",
    label: "SPOTLIGHTS",
  },
];

const LegacyTabs = () => {
  const { scale } = useGlobalContext();

  const {
    activeSpace,
    activeLegacyTab,
    setActiveLegacyTab,
  } = useProfileSpace();

  const flatListRef = useRef(null);

  /*
   * ---------------------------------------------------------
   * DIMENSIONS
   * ---------------------------------------------------------
   */

  const CAROUSEL_WIDTH =
    SCREEN_WIDTH * 0.95;

  const CARD_WIDTH =
    SCREEN_WIDTH * 0.40;

  const CARD_HEIGHT =
    scale(57);

  const ITEM_WIDTH =
    CARD_WIDTH;

  const CAROUSEL_HEIGHT =
    scale(63);

  /*
   * ---------------------------------------------------------
   * CAROUSEL ITEMS
   * ---------------------------------------------------------
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
   * ---------------------------------------------------------
   * SCROLL VALUE
   * ---------------------------------------------------------
   */

  const scrollX = useRef(
    new Animated.Value(ITEM_WIDTH)
  ).current;

  /*
   * ---------------------------------------------------------
   * CENTER SNAP PADDING
   * ---------------------------------------------------------
   */

  const PADDING_LEFT =
    CAROUSEL_WIDTH / 2 -
    CARD_WIDTH / 2;

  const PADDING_RIGHT =
    CAROUSEL_WIDTH / 2 -
    CARD_WIDTH / 2;

  /*
   * ---------------------------------------------------------
   * LEGAL SNAP POSITIONS
   * ---------------------------------------------------------
   */

  const FIRST_SNAP =
    ITEM_WIDTH;

  const LAST_SNAP =
    ITEM_WIDTH * 4;

  /*
   * ---------------------------------------------------------
   * INITIAL POSITION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (activeSpace !== "legacy") {
      return;
    }

    const activeIndex =
      TABS.findIndex(
        (tab) =>
          tab.id === activeLegacyTab
      );

    if (activeIndex < 0) {
      return;
    }

    const carouselIndex =
      activeIndex + 1;

    const targetOffset =
      carouselIndex * ITEM_WIDTH;

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: targetOffset,
        animated: false,
      });

      scrollX.setValue(
        targetOffset
      );
    });
  }, [
    activeSpace,
    activeLegacyTab,
    ITEM_WIDTH,
  ]);

  if (activeSpace !== "legacy") {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * ICON PICKER
   * ---------------------------------------------------------
   */

  const getLegacyTabIcon = (
    tabId,
    size = 18
  ) => {
    switch (tabId) {
      case "arenas":
        return (
          <ArenaPortalIcon size={size} />
        );

      case "stages":
        return (
          <StagePortalIcon size={size} />
        );

      case "spotlights":
        return (
          <RisingStarIcon size={size} />
        );

      case "performances":
        return (
          <PerformanceIcon size={size} />
        );

      default:
        return null;
    }
  };

  /*
   * ---------------------------------------------------------
   * INDICATOR CARD
   * ---------------------------------------------------------
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
            "rgba(55,68,82,0.78)",
            "rgba(25,32,40,0.92)",
            "rgba(45,57,70,0.82)",
          ]}
          locations={[
            0,
            0.22,
            0.48,
            0.72,
            1,
          ]}
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
                "rgba(232,185,90,0.90)",
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
                  "rgba(232,185,90,0.82)",
              }}
            />
          </View>

          <Text
            style={{
              marginTop: scale(6),
              color:
                "rgba(255,255,255,0.92)",
              fontSize: scale(11),
              fontWeight: "700",
              letterSpacing: scale(0.8),
            }}
          >
            {isStart
              ? "START"
              : "END"}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  /*
   * ---------------------------------------------------------
   * NORMAL CARD
   * ---------------------------------------------------------
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
          borderRadius: scale(7),
          overflow: "hidden",
          opacity: pressed
            ? 0.82
            : 1,
        }}
      >
        <LinearGradient
          colors={[
            "rgba(55,68,82,0.78)",
            "rgba(25,32,40,0.92)",
            "rgba(45,57,70,0.82)",
          ]}
          locations={[
            0,
            0.42,
            1,
          ]}
          style={{
            flex: 1,
            paddingHorizontal:
              scale(6),
            paddingVertical:
              scale(3),
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
            {getLegacyTabIcon(
              item.id,
              scale(25)
            )}
          </View>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: "#FFF3C7",
              fontSize: scale(11),
              fontWeight:
                isActive
                  ? "900"
                  : "700",
              letterSpacing:
                scale(0.8),
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
   * ---------------------------------------------------------
   * RENDER ITEM
   * ---------------------------------------------------------
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

    /*
     * SCALE
     */

    const cardScale =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.67,
          0.69,
          1,
          0.69,
          0.67,
        ],
        extrapolate: "clamp",
      });

    /*
     * -------------------------------------------------------
     * BOTTOM ALIGNMENT COMPENSATION
     * -------------------------------------------------------
     */

    const bottomOffset =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          CARD_HEIGHT * 0.165,
          CARD_HEIGHT * 0.155,
          0,
          CARD_HEIGHT * 0.155,
          CARD_HEIGHT * 0.165,
        ],
        extrapolate: "clamp",
      });

    /*
     * -------------------------------------------------------
     * OPACITY
     * -------------------------------------------------------
     */

    const opacity =
      scrollX.interpolate({
        inputRange,
        outputRange: [
          0.48,
          0.84,
          1,
          0.84,
          0.48,
        ],
        extrapolate: "clamp",
      });

    const isIndicator =
      item.type === "indicator";

    const isActive =
      !isIndicator &&
      activeLegacyTab === item.id;

    /*
     * -------------------------------------------------------
     * PRESS
     * -------------------------------------------------------
     */

    const handlePress = () => {
      if (isIndicator) {
        return;
      }

      flatListRef.current?.scrollToOffset({
        offset:
          index * ITEM_WIDTH,
        animated: true,
      });
    };

    return (
      <View
        style={{
          width: ITEM_WIDTH,
          height: CAROUSEL_HEIGHT,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Animated.View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,

            transform: [
              {
                translateY:
                  bottomOffset,
              },
              {
                scale: cardScale,
              },
            ],

            opacity: isIndicator
              ? Animated.multiply(
                  opacity,
                  0.70
                )
              : opacity,

            zIndex: isActive
              ? 50
              : 20,
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
      </View>
    );
  };

  /*
   * ---------------------------------------------------------
   * CLAMP
   * ---------------------------------------------------------
   */

  const clampScrollPosition = (
    offsetX
  ) => {
    if (offsetX < FIRST_SNAP) {
      flatListRef.current?.scrollToOffset({
        offset: FIRST_SNAP,
        animated: false,
      });

      scrollX.setValue(
        FIRST_SNAP
      );

      return FIRST_SNAP;
    }

    if (offsetX > LAST_SNAP) {
      flatListRef.current?.scrollToOffset({
        offset: LAST_SNAP,
        animated: false,
      });

      scrollX.setValue(
        LAST_SNAP
      );

      return LAST_SNAP;
    }

    return offsetX;
  };

  /*
   * ---------------------------------------------------------
   * MOMENTUM END
   * ---------------------------------------------------------
   */

  const handleMomentumEnd = (
    event
  ) => {
    const rawOffset =
      event.nativeEvent.contentOffset.x;

    const offsetX =
      clampScrollPosition(
        rawOffset
      );

    let closestIndex = 1;
    let smallestDistance =
      Infinity;

    [1, 2, 3, 4].forEach(
      (carouselIndex) => {
        const snap =
          carouselIndex *
          ITEM_WIDTH;

        const distance =
          Math.abs(
            offsetX - snap
          );

        if (
          distance <
          smallestDistance
        ) {
          smallestDistance =
            distance;

          closestIndex =
            carouselIndex;
        }
      }
    );

    const tabIndex =
      closestIndex - 1;

    setActiveLegacyTab(
      TABS[tabIndex].id
    );
  };

  /*
   * ---------------------------------------------------------
   * DRAG END
   * ---------------------------------------------------------
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
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
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
      className="items-center justify-center"
    >
      <Animated.FlatList
        ref={flatListRef}
        data={CAROUSEL_ITEMS}
        keyExtractor={(item) =>
          item.id
        }
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        bounces={false}
        decelerationRate="fast"
        snapToInterval={
          ITEM_WIDTH
        }
        snapToAlignment="start"
        disableIntervalMomentum
        contentContainerStyle={{
          paddingLeft:
            PADDING_LEFT,
          paddingRight:
            PADDING_RIGHT,
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
        getItemLayout={(
          _,
          index
        ) => ({
          length: ITEM_WIDTH,
          offset:
            ITEM_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

export default LegacyTabs;