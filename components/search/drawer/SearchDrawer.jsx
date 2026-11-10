
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  useWindowDimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getSearchSuggestions } from "../../../apiCalls/discovery";
import ArenaJourneyCard from "../../myJourney/card/ArenaJourneyCard";
import UserProfileCard from "../../profile/card/userProfileCard";
import { useGlobalContext } from "../../../context/GlobalProvider";
import DeepSearchModal from "../modal/DeepSearchModal";
import StageCard from "../../discovery/cards/StageCard";
import UserCard from "../../discovery/cards/userCard";
import ArenaCard from "../../discovery/cards/ArenaCard";

const SearchFooter = ({ onPress }) => {
  return (
    <View
      style={{
        backgroundColor: "#090909",
        paddingHorizontal: 0,
        paddingTop: 15,
        paddingBottom: 22,
        borderTopWidth: 1,
        borderTopColor: "rgba(218,184,105,0.13)",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          minHeight: 76,
          paddingHorizontal: 15,
          paddingVertical: 13,
          borderRadius: 13,
          backgroundColor: "#12110E",
          borderWidth: 1,
          borderColor: "rgba(218,184,105,0.32)",
        }}
      >
        {/* ICON */}
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(218,184,105,0.10)",
            borderWidth: 1,
            borderColor: "rgba(218,184,105,0.16)",
          }}
        >
          <Ionicons
            name="scan-outline"
            size={21}
            color="#D8B86A"
          />
        </View>

        {/* LABEL */}
        <View style={{ flex: 1, marginLeft: 13 }}>
          <Text
            style={{
              color: "#F2E8D2",
              fontSize: 14,
              fontWeight: "800",
              letterSpacing: 0.35,
            }}
          >
            Deep Search
          </Text>

          <Text
            style={{
              color: "rgba(235,225,204,0.48)",
              fontSize: 10,
              marginTop: 5,
              letterSpacing: 0.15,
            }}
          >
            Discover beyond the suggestions
          </Text>
        </View>

        {/* ACTION */}
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(218,184,105,0.10)",
            borderWidth: 1,
            borderColor: "rgba(218,184,105,0.22)",
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={16}
            color="#D8B86A"
          />
        </View>
      </TouchableOpacity>

      <Text
        style={{
          color: "rgba(218,184,105,0.38)",
          fontSize: 8,
          fontWeight: "700",
          letterSpacing: 2,
          textAlign: "center",
          marginTop: 12,
        }}
      >
        EXPLORE MORE OF ITRI
      </Text>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

export default function SearchDrawer({
  visible,
  onClose,
}) {
  const insets = useSafeAreaInsets();
  const drawerWidth = width;
  const translateX = useSharedValue(drawerWidth);

  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("suggestions");

  const [suggestions, setSuggestions] = useState({
    users: [],
    arenas: [],
    stages: [],
  });

  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [deepSearchVisible, setDeepSearchVisible] = useState(false);

  const { scale, spacing } = useGlobalContext();

  useEffect(() => {
    if (visible) {
      translateX.value = withSpring(0, {
        damping: 18,
        stiffness: 160,
        overshootClamping: true,
      });
    } else {
      translateX.value = withTiming(drawerWidth, {
        duration: 220,
      });
    }
  }, [visible, drawerWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const closeDrawer = () => {
    translateX.value = withTiming(
      drawerWidth,
      {
        duration: 200,
      },
      () => {
        runOnJS(onClose)();
      }
    );
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.max(
        0,
        event.translationX
      );
    })
    .onEnd(() => {
      if (translateX.value > 120) {
        translateX.value = withTiming(
          drawerWidth,
          {
            duration: 180,
          }
        );

        runOnJS(onClose)();
      } else {
        translateX.value = withSpring(0, {
          damping: 18,
          stiffness: 160,
          overshootClamping: true,
        });
      }
    });

  // API calls
  const searchSuggestions = async (query) => {
    if (!query?.trim()) {
      return [];
    }

    return [];
  };

  useEffect(() => {
    const searchQuery = query.trim();

    if (searchQuery.length < 2) {
      setSuggestions({
        users: [],
        arenas: [],
        stages: [],
      });

      setSearching(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);

        const data = await getSearchSuggestions(searchQuery);

        setSuggestions({
          users: data?.users || [],
          arenas: data?.arenas || [],
          stages: data?.stages || [],
        });
      } catch (error) {
        setSuggestions({
          users: [],
          arenas: [],
          stages: [],
        });
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const suggestionData = [
    ...(suggestions.users || []).map((item) => ({
      ...item,
      resultType: "user",
    })),

    ...(suggestions.arenas || []).map((item) => ({
      ...item,
      resultType: "arena",
    })),

    ...(suggestions.stages || []).map((item) => ({
      ...item,
      resultType: "stage",
    })),
  ];

  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 9999,
      }}
    >
      {/* BACKDROP */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.68)",
        }}
      />

      {/* DRAWER */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              right: 0,
              top: insets.top,
              bottom: 10,
              width: drawerWidth,
              backgroundColor: "#090909",
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              borderLeftWidth: 1,
              borderLeftColor: "rgba(218,184,105,0.16)",
              overflow: "hidden",
            },
          ]}
        >
          <View className="flex-1 bg-[#090909]">

            {/* HEADER */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 19,
                paddingBottom: 17,
              }}
            >
              {/* HEADER TOP */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1, paddingLeft: 2 }}>
                  <Text
                    style={{
                      color: "#D8B86A",
                      fontSize: scale(17),
                      fontWeight: "800",
                      letterSpacing: 2.2,
                    }}
                  >
                    SEARCH
                  </Text>

                  <Text
                    style={{
                      color: "rgba(255,255,255,0.40)",
                      fontSize: scale(10),
                      marginTop: 5,
                      letterSpacing: 0.25,
                    }}
                  >
                    Find people, arenas & stages
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={closeDrawer}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#15130F",
                    borderWidth: 1,
                    borderColor: "rgba(218,184,105,0.18)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={27}
                    color="#D8B86A"
                  />
                </TouchableOpacity>
              </View>

              {/* SEARCH INPUT */}
              <View
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 13,
                  borderWidth: 1,
                  borderColor: focused
                    ? "rgba(218,184,105,0.42)"
                    : "rgba(255,255,255,0.08)",
                  backgroundColor: focused
                    ? "#15130F"
                    : "#111111",
                  paddingHorizontal: 16,
                }}
              >
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#D8B86A"
                />

                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search Itri"
                  placeholderTextColor="rgba(255,255,255,0.32)"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="search"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "500",
                    paddingVertical: 0,
                  }}
                />

                {query.length > 0 && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setQuery("")}
                    style={{
                      marginLeft: 8,
                      width: 29,
                      height: 29,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 15,
                      backgroundColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={scale(17)}
                      color="rgba(255,255,255,0.55)"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* CONTENT */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingTop: 5,
              }}
            >
              {query.length === 0 ? (
                <View>
                  {/* Empty initial search state */}
                </View>
              ) : (
                <View className="w-full flex-1">

                  {/* SUGGESTIONS HEADER */}
                  {/* <View
                    style={{
                      paddingHorizontal: spacing(10),
                      paddingVertical: spacing(14),
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "rgba(242,232,210,0.78)",
                        fontSize: scale(10),
                        fontWeight: "800",
                        letterSpacing: 1.6,
                        textTransform: "uppercase",
                      }}
                    >
                      Suggestions
                    </Text>

                    {searching && (
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color="rgba(218,184,105,0.65)"
                      />
                    )}
                  </View> */}

                  {/* RESULTS */}
                  <FlatList
                    data={suggestionData}
                    keyExtractor={(item) =>
                      `${item.resultType}-${item._id}`
                    }
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      paddingBottom: 10,
                    }}
                    renderItem={({ item }) => {
                      switch (item.resultType) {
                        case "user":
                          return (
                            <View style={{ marginBottom: 20 }}>
                              <UserCard
                                user={item}
                                width={width * 0.90}
                                onPress={() => {
                                  // Navigate to the user's profile
                                }}
                                onFollowPress={() => {
                                  // Handle follow / unfollow
                                }}
                                isFollowing={false}
                              />
                            </View>
                          );

                        case "arena":
                          return (
                            <View style={{ marginBottom: 20 }}>
                              <ArenaCard
                                entry={item}
                                width={width * 0.90}
                                height={width / 1.1}
                              />
                            </View>
                          );

                        case "stage":
                          return (
                            <View style={{ marginBottom: 20 }}>
                              <StageCard
                                entry={item}
                                width={width * 0.95}
                                height={width / 1.1}
                              />
                            </View>
                          );

                        default:
                          return null;
                      }
                    }}
                    ListEmptyComponent={
                      !searching ? (
                        <View
                          style={{
                            height: height / 1.8,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <View
                            style={{
                              width: 76,
                              height: 76,
                              borderRadius: 38,
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(218,184,105,0.06)",
                              borderWidth: 1,
                              borderColor: "rgba(218,184,105,0.13)",
                            }}
                          >
                            <Ionicons
                              name="search-outline"
                              size={scale(32)}
                              color="rgba(218,184,105,0.55)"
                            />
                          </View>

                          <Text
                            style={{
                              color: "rgba(255,255,255,0.48)",
                              fontSize: scale(13),
                              fontWeight: "600",
                              marginTop: 17,
                            }}
                          >
                            No suggestions found
                          </Text>

                          <Text
                            style={{
                              color: "rgba(255,255,255,0.25)",
                              fontSize: scale(10),
                              marginTop: 6,
                            }}
                          >
                            Try another search
                          </Text>
                        </View>
                      ) : null
                    }
                  />

                  {/* DEEP SEARCH FOOTER */}
                  {suggestionData.length > 0 && (
                    <SearchFooter
                      onPress={() => setDeepSearchVisible(true)}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* DEEP SEARCH MODAL */}
      {deepSearchVisible && (
        <DeepSearchModal
          visible={deepSearchVisible}
          query={query}
          onClose={() => setDeepSearchVisible(false)}
        />
      )}
    </View>
  );
}
