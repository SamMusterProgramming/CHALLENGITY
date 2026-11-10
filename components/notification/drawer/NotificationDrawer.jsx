
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  useWindowDimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../context/GlobalProvider";

import DisplayTalentNotification from "../sections/DisplayTalentNotifications";
import DisplayArenaNotification from "../sections/DisplayArenaNotification";
import DisplaySocialNotification from "../sections/DisplaySocialNotification";

const COLORS = {
  background: "#080808",
  gold: "#E8BE66",
  goldLight: "#F5D58E",
  secondary: "#A9A39A",
  muted: "#716D66",
};

const TABS = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "stage",
    label: "Stage",
    category: "competition",
  },
  {
    key: "arena",
    label: "Arena",
    category: "arena",
  },
  {
    key: "social",
    label: "Social",
    category: "friends",
  },
];

const AnimatedSectionList =
  Animated.createAnimatedComponent(SectionList);

const getDateGroup = (createdAt) => {
  if (!createdAt) return "EARLIER";

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "EARLIER";

  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const notificationDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (notificationDate.getTime() === today.getTime()) {
    return "TODAY";
  }

  if (notificationDate.getTime() === yesterday.getTime()) {
    return "YESTERDAY";
  }

  return "EARLIER";
};

export default function NotificationDrawer({
  visible,
  onClose,
}) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const drawerWidth = width * 0.99;

  const translateX = useSharedValue(drawerWidth);
  const scrollY = useSharedValue(0);

  const flatListRef = useRef(null);

  const {
    notifications = [],
    setNotifications,
    user,
    scale,
  } = useGlobalContext();

  const [activeTab, setActiveTab] = useState("all");

  // --------------------------------------------------
  // ANIMATED TAB INDICATOR
  // --------------------------------------------------

  const [tabBarWidth, setTabBarWidth] = useState(0);

  const tabIndicatorX = useSharedValue(0);

  const activeTabIndex = Math.max(
    0,
    TABS.findIndex((tab) => tab.key === activeTab)
  );

  const tabSlotWidth =
    tabBarWidth > 0 ? tabBarWidth / TABS.length : 0;

  const indicatorWidth = Math.min(
    34,
    tabSlotWidth * 0.42
  );

  useEffect(() => {
    if (!tabSlotWidth) return;

    const targetX =
      activeTabIndex * tabSlotWidth +
      (tabSlotWidth - indicatorWidth) / 2;

    tabIndicatorX.value = withSpring(targetX, {
      damping: 22,
      stiffness: 180,
      mass: 0.8,
    });
  }, [
    activeTabIndex,
    tabSlotWidth,
    indicatorWidth,
  ]);

  const tabIndicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tabIndicatorX.value,
      },
    ],
  }));

  const nativeGesture = Gesture.Native();

  // --------------------------------------------------
  // DRAWER ANIMATION
  // --------------------------------------------------

  useEffect(() => {
    if (visible) {
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 150,
        mass: 0.85,
        overshootClamping: true,
      });

      scrollY.value = 0;
    } else {
      translateX.value = withTiming(drawerWidth, {
        duration: 260,
      });
    }
  }, [visible, drawerWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // --------------------------------------------------
  // COLLAPSING HEADER
  // --------------------------------------------------

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = Math.max(0, event.contentOffset.y);
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      scrollY.value,
      [0, 55],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      height: interpolate(
        scrollY.value,
        [0, 55],
        [70, 0],
        Extrapolation.CLAMP
      ),
      opacity: progress,
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 55],
            [0, -12],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  // --------------------------------------------------
  // NOTIFICATION DATA
  // --------------------------------------------------

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    );
  }, [notifications]);

  const tabCounts = useMemo(
    () => ({
      all: sortedNotifications.length,

      stage: sortedNotifications.filter(
        (item) => item.category === "competition"
      ).length,

      arena: sortedNotifications.filter(
        (item) => item.category === "arena"
      ).length,

      social: sortedNotifications.filter(
        (item) => item.category === "friends"
      ).length,
    }),
    [sortedNotifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") {
      return sortedNotifications;
    }

    const selectedTab = TABS.find(
      (tab) => tab.key === activeTab
    );

    if (!selectedTab?.category) return [];

    return sortedNotifications.filter(
      (item) => item.category === selectedTab.category
    );
  }, [sortedNotifications, activeTab]);

  // --------------------------------------------------
  // DATE GROUPING
  // --------------------------------------------------

  const sections = useMemo(() => {
    const groups = {
      TODAY: [],
      YESTERDAY: [],
      EARLIER: [],
    };

    filteredNotifications.forEach((notification) => {
      const group = getDateGroup(notification.createdAt);
      groups[group].push(notification);
    });

    return Object.entries(groups)
      .filter(([_, data]) => data.length > 0)
      .map(([title, data]) => ({
        title,
        data,
      }));
  }, [filteredNotifications]);

  // --------------------------------------------------
  // CLOSE DRAWER
  // --------------------------------------------------

  const closeDrawer = () => {
    onClose?.();
  };

  // --------------------------------------------------
  // SWIPE TO CLOSE
  // --------------------------------------------------

  const panGesture = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-12, 12])
    .onUpdate((event) => {
      translateX.value = Math.max(0, event.translationX);
    })
    .onEnd(() => {
      if (translateX.value > drawerWidth * 0.25) {
        translateX.value = withTiming(drawerWidth, {
          duration: 220,
        });

        runOnJS(closeDrawer)();
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 160,
        });
      }
    });

  // --------------------------------------------------
  // TAB NAVIGATION
  // --------------------------------------------------

  const handleTabPress = (tabKey) => {
    if (tabKey === activeTab) return;

    setActiveTab(tabKey);

    scrollY.value = 0;

    flatListRef.current?.scrollToOffset?.({
      offset: 0,
      animated: false,
    });
  };

  // --------------------------------------------------
  // TAB RENDERER
  // --------------------------------------------------

  const renderTab = (tab) => {
    const isActive = activeTab === tab.key;
    const count = tabCounts[tab.key] || 0;

    return (
      <TouchableOpacity
        key={tab.key}
        activeOpacity={0.7}
        onPress={() => handleTabPress(tab.key)}
        className="flex-1 min-w-0 h-[48px] flex-row items-center justify-center"
      >
        <Text
          numberOfLines={1}
          style={{
            color: isActive ? "#F5D58E" : "#99938A",
            fontSize: scale(12),
            fontWeight: isActive ? "700" : "500",
            letterSpacing: isActive ? 0.2 : 0,
          }}
        >
          {tab.label}
        </Text>

        <Text
          style={{
            marginLeft: 5,
            color: isActive ? "#DDB65F" : "#716D66",
            fontSize: scale(10),
            fontWeight: isActive ? "700" : "500",
          }}
        >
          {count}
        </Text>
      </TouchableOpacity>
    );
  };

  // --------------------------------------------------
  // NOTIFICATION RENDERER
  // --------------------------------------------------

  const renderNotification = ({ item }) => {
    switch (item.category) {
      case "competition":
        // return (
        //   <DisplayTalentNotification
        //     notification={item}
        //     setNotifications={setNotifications}
        //     user={user}
        //   />
        // );

      case "arena":
        return (
          <DisplayArenaNotification
            notification={item}
            setNotifications={setNotifications}
            user={user}
          />
        );

      // case "friends":
      //   return (
      //     <DisplaySocialNotification
      //       notification={item}
      //       setNotifications={setNotifications}
      //       user={user}
      //     />
      //   );

      default:
        return null;
    }
  };

  // --------------------------------------------------
  // SECTION HEADER
  // --------------------------------------------------

  const renderSectionHeader = ({ section }) => (
    <View className="flex-row items-center gap-3 mb-3 mt-1">
      <Text
        className="text-[#E8BE66] font-bold tracking-[1.4px]"
        style={{ fontSize: scale(10) }}
      >
        {section.title}
      </Text>

      <View className="flex-1 h-[1px] bg-[#E8BE66]/15" />
    </View>
  );

  // --------------------------------------------------
  // EMPTY STATE
  // --------------------------------------------------

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-9 pb-12">
      <View className="w-[68px] h-[68px] rounded-full bg-[#E8BE66]/[0.10] border border-[#E8BE66]/25 items-center justify-center mb-4">
        <MaterialCommunityIcons
          name="bell-outline"
          size={scale(29)}
          color={COLORS.gold}
        />
      </View>

      <Text
        className="text-[#F5F3EF] font-bold mb-2"
        style={{ fontSize: scale(16) }}
      >
        You're all caught up
      </Text>

      <Text
        className="text-[#A9A39A] text-center leading-5"
        style={{ fontSize: scale(12) }}
      >
        Your activity and updates will appear here.
      </Text>
    </View>
  );

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-[9999]">
      {/* BACKDROP */}

      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        className="absolute inset-0 bg-black/90"
      />

      {/* DRAWER */}

      <GestureDetector gesture={panGesture}>
        <Animated.View
          className="absolute right-0 bottom-0 bg-[#000000] rounded-tl-[30px] border-l border-[#E8BE66]/20 overflow-hidden"
          style={[
            animatedStyle,
            {
              width: drawerWidth,
              top: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {/* GOLD EDGE */}

          <View className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E8BE66]/50 z-10" />

          {/* COMPACT COLLAPSING HEADER */}

          <Animated.View
            style={[
              headerAnimatedStyle,
              {
                overflow: "hidden",
              },
            ]}
          >
            <View className="h-[70px] flex-row items-center px-5">
              <View className="p-2 rounded-xl border border-[#E8BE66]/35 bg-[#E8BE66]/[0.08] items-center justify-center mr-3">
                <MaterialCommunityIcons
                  name="bell-ring-outline"
                  size={scale(30)}
                  color={COLORS.goldLight}
                />
              </View>

              <View className="flex-1 justify-center">
                <Text
                  className="text-[#F5F3EF] font-bold tracking-[-0.3px]"
                  style={{ fontSize: scale(18) }}
                >
                  Your Activity
                </Text>

                <Text
                  className="text-[#A9A39A] mt-0.5"
                  style={{
                    fontSize: scale(10),
                    paddingTop: scale(8),
                  }}
                  numberOfLines={1}
                >
                  Your latest updates across the community
                </Text>
              </View>

              <TouchableOpacity
                onPress={closeDrawer}
                activeOpacity={0.7}
                className="w-10 h-10 items-center justify-center ml-2"
              >
                <MaterialCommunityIcons
                  name="close"
                  size={scale(24)}
                  color={COLORS.gold}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* MINIMAL STICKY CATEGORY NAVIGATION */}

          <View className="px-4 pt-1.5 bg-[#080808]">
            <View
              className="relative"
              onLayout={(event) => {
                const measuredWidth =
                  event.nativeEvent.layout.width;

                setTabBarWidth(measuredWidth);
              }}
            >
              {/* TAB LABELS */}

              <View className="flex-row items-center">
                {TABS.map(renderTab)}
              </View>

              {/* SUBTLE BASELINE */}

              <View
                pointerEvents="none"
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                }}
              />

              {/* MOVING GOLD UNDERLINE */}

              {tabBarWidth > 0 && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    {
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: indicatorWidth,
                      height: 2.5,
                      borderRadius: 10,
                      backgroundColor: COLORS.gold,
                      shadowColor: COLORS.gold,
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowOpacity: 0.75,
                      shadowRadius: 6,
                      elevation: 4,
                    },
                    tabIndicatorAnimatedStyle,
                  ]}
                />
              )}
            </View>

            <View className="h-3" />
          </View>

          {/* NOTIFICATION LIST */}

          <GestureDetector gesture={nativeGesture}>
            <AnimatedSectionList
              ref={flatListRef}
              sections={sections}
              keyExtractor={(item, index) =>
                item._id?.toString() || index.toString()
              }
              renderItem={renderNotification}
              // renderSectionHeader={renderSectionHeader}
              ListEmptyComponent={renderEmptyState}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={false}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              removeClippedSubviews
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 11,
                paddingBottom: 10,
                flexGrow: sections.length === 0 ? 1 : undefined,
              }}
              ItemSeparatorComponent={() => (
                <View className="h-2.5" />
              )}
            />
          </GestureDetector>

          {/* COMPACT FOOTER */}

          <View className="px-5 pt-1 bg-[#080808]">
            <View className="h-[1px] bg-[#E8BE66]/15" />

            <View className="flex-row items-center justify-center py-2 gap-2">
              <MaterialCommunityIcons
                name="creation"
                size={scale(13)}
                color={COLORS.gold}
              />

              <Text
                className="text-[#E8BE66] font-medium tracking-[0.2px]"
                style={{ fontSize: scale(10) }}
              >
                Keep going. Your talent matters.
              </Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
