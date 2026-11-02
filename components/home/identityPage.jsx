import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Animated,
  Pressable,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import IdentityHero
  from "../identity/components/hero/IdentityHero";

import IdentityTopBar
  from "../identity/components/hero/IdentityTopBar";





import {
  useGlobalContext,
} from "../../context/GlobalProvider";
import IdentityGlobalStats from "../identity/components/stats/globalStats";
import IdentitySpace from "../identity/components/overView/IdentitySpace";
import LegacyStats from "../identity/components/IdentitySpace/legacy/legacyStats";
import LegacyTabs from "../identity/components/IdentitySpace/legacy/legacyTabs";
import Arenas from "../identity/components/IdentitySpace/legacy/arena/arenas";
import { ProfileSpaceProvider } from "../identity/components/context/ProfileSpaceContext";
import LegacyContent from "../identity/components/IdentitySpace/legacy/LegacyContent";
import LegacyOverview from "../identity/components/IdentitySpace/legacy/LegacyOverview";
import CircleOverview from "../identity/components/IdentitySpace/circle/circleOverview";
import CircleTabs from "../identity/components/IdentitySpace/circle/circleTabs";
import CircleContent from "../identity/components/IdentitySpace/circle/circleContent";
import SettingsDrawer from "../identity/components/settings/SettingsDrawer";
import { Ionicons } from "@expo/vector-icons";

export default function IdentityPage({
  visible = true,
  onClose,
  onScroll,
  settingsVisible, setSettingsVisible
}) {
  const insets = useSafeAreaInsets();

  const {
    user,
    userFriends,
    userFollowers,
    userFollowings,
    spacing,
    scale,
  } = useGlobalContext();
  
  // const [settingsVisible, setSettingsVisible] = useState(false);
  const flatListRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const HERO_HEIGHT = scale(350);

  const scrollY = useRef(
    new Animated.Value(0)
  ).current;

  const sections = useMemo(
    () => [
      {
        id: "hero",
        type: "hero",
      },
      {
        id: "globalStats",
        type: "globalStats",
      },
      {
        id: "identitySpace",
        type: "identitySpace",
      },
      //legacy
      {
        id: "legacyOverView",
        type: "legacyOverView",
      },
      
      {
        id: "legacyTabs",
        type: "legacyTabs",
      },
      {
        id: "legacyContent",
        type: "legacyContent",
      },
      //circle
      {
        id: "circleOverView",
        type: "circleOverView",
      },
      {
        id: "circleTabs",
        type: "circleTabs",
      },
      
      // {
      //   id: "legacyTabs",
      //   type: "legacyTabs",
      // },
      {
        id: "circleContent",
        type: "circleContent",
      },
    ],
    []
  );

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const handleScroll = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: scrollY,
            },
          },
        },
      ],
      {
        useNativeDriver: true,
        listener: (e) => {
             const offsetY = e.nativeEvent.contentOffset.y;
             setShowScrollTop(offsetY > 650);
             onScroll?.(e) // Add this line
            }
      }
    ),
    [scrollY, onScroll]
  );


  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {

        case "hero":
          return (
            <IdentityHero
              user={user}
              height={HERO_HEIGHT}
            />
          );

        case "globalStats":
          return (
            <IdentityGlobalStats />
          );

        case "identitySpace":
          return (
            <IdentitySpace />
          );

        case "legacyContent":
          return <LegacyContent />;

        case "circleContent":
          return <CircleContent />;

        default:
          return null;
      }
    },
    [
      user,
      userFriends,
      userFollowers,
      userFollowings,
      HERO_HEIGHT
    ]
  );

  if (!visible) {
    return null;
  }

  return (
    <ProfileSpaceProvider>
    <View className="flex-1 w-full bg-[#08090B]">

      {/* ====================================================== */}
      {/* IDENTITY CONTENT                                      */}
      {/* ====================================================== */}

      <Animated.FlatList
        ref={flatListRef}
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{
          paddingBottom: spacing(20),
        }}
        nestedScrollEnabled = {true}
        removeClippedSubviews={false}
      />

      {/* ====================================================== */}
      {/* FLOATING TOP NAVIGATION                               */}
      {/* ====================================================== */}

      <IdentityTopBar
        user={user}
        scrollY={scrollY}
        topInset={insets.top}
        onClose={onClose}
        onPress={() => setSettingsVisible(true)}
      />

        {/* SCROLL TO TOP BUTTON */}

        {showScrollTop && (
          <>
          {/* Left scroll-to-top button */}
          <Pressable
            onPress={scrollToTop}
            accessibilityRole="button"
            accessibilityLabel="Scroll to top"
            style={{
              position: "absolute",
              left: spacing(18),
              bottom: spacing(8),
              width: scale(42),
              height: scale(42),
              borderRadius: scale(21),
              backgroundColor: "rgba(18, 19, 22, 0.58)",
              borderWidth: 1,
              borderColor: "rgba(212, 175, 95, 0.22)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
            }}
          >
            <Ionicons
              name="chevron-up"
              size={scale(21)}
              color="rgba(212, 175, 95, 0.75)"
            />
          </Pressable>
      
          {/* Right scroll-to-top button */}
          {/* <Pressable
            onPress={scrollToTop}
            accessibilityRole="button"
            accessibilityLabel="Scroll to top"
            style={{
              position: "absolute",
              right: spacing(18),
              bottom: spacing(68),
              width: scale(42),
              height: scale(42),
              borderRadius: scale(21),
              backgroundColor: "rgba(18, 19, 22, 0.58)",
              borderWidth: 1,
              borderColor: "rgba(212, 175, 95, 0.22)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
            }}
          >
            <Ionicons
              name="chevron-up"
              size={scale(21)}
              color="rgba(212, 175, 95, 0.75)"
            />
          </Pressable> */}
        </>
        
      )}

      <SettingsDrawer
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />

    </View>
    </ProfileSpaceProvider>
  );
}