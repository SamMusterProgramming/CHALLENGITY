
import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  withTiming,
} from "react-native-reanimated";

import ArenaJourneyCard from "../../myJourney/card/ArenaJourneyCard";
import UserProfileCard from "../../profile/card/userProfileCard";
import { useGlobalContext } from "../../../context/GlobalProvider";
import StageCard from "../../discovery/cards/StageCard";
import { deepSearch } from "../../../apiCalls/discovery";
import ArenaCard from "../../discovery/cards/ArenaCard";
import UserCard from "../../discovery/cards/userCard";

const { width, height } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function DeepSearchModal({
  visible,
  query,
  onClose,
}) {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState("people");
  const listRef = useRef(null);
  const scrollY = useSharedValue(0);
  const activeCategory = useSharedValue(0);
  const { scale, spacing } = useGlobalContext();

  /*
   * =========================================================
   * HEADER COLLAPSE ANIMATION
   * =========================================================
   */

  const introAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 100],
        [112, 0],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(
        scrollY.value,
        [0, 35, 100],
        [1, 0.45, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 100],
            [0, -22],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = Math.max(0, event.contentOffset.y);
    },
  });

  /*
   * =========================================================
   * CATEGORY UNDERLINE ANIMATION
   * =========================================================
   */

  const underlineAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            activeCategory.value * ((width - 40 - 16) / 3),
            { duration: 260 }
          ),
        },
      ],
    };
  });

  /*
   * =========================================================
   * INITIALIZATION
   * =========================================================
   */

  useEffect(() => {
    if (visible) {
      setSearchType("people");
      activeCategory.value = 0;
      scrollY.value = 0;
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (!query?.trim()) {
      return;
    }

    performSearch({
      page: 1,
      replace: true,
    });
  }, [visible]);

  /*
   * =========================================================
   * SEARCH
   * =========================================================
   */

  const performSearch = async ({
    pageNumber = 1,
    replace = true,
  } = {}) => {
    if (!query?.trim()) {
      return;
    }

    try {
      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await deepSearch({
        query: query.trim(),
        type: searchType,
        page: pageNumber,
        limit: 20,
      });

      const newResults = response?.results || [];

      if (replace) {
        setResults(newResults);
      } else {
        setResults((prev) => [
          ...prev,
          ...newResults,
        ]);
      }

      setPage(pageNumber);

      setHasMore(
        response?.hasMore ?? false
      );

    } catch (error) {
      console.error(
        "Deep search failed:",
        error
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /*
   * =========================================================
   * SEARCH TYPES
   * =========================================================
   */

  const handleFilterChange = (type) => {
    if (type === searchType) {
      return;
    }

    const selectedIndex = searchTypes.findIndex(
      (item) => item.id === type
    );

    activeCategory.value = selectedIndex;

    setSearchType(type);
    setResults([]);
    setPage(1);
    setHasMore(true);

    scrollY.value = 0;

    listRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (!query?.trim()) {
      return;
    }

    performSearch({
      pageNumber: 1,
      replace: true,
    });
  }, [searchType]);

  const searchTypes = [
    {
      id: "people",
      label: "People",
    },
    {
      id: "arenas",
      label: "Arenas",
    },
    {
      id: "stages",
      label: "Stages",
    },
  ];

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (loadingMore) {
      return;
    }

    if (!hasMore) {
      return;
    }

    performSearch({
      type: searchType,
      pageNumber: page + 1,
      replace: false,
    });
  };

  /*
   * =========================================================
   * RESULT RENDERING
   * =========================================================
   */

  const renderResult = ({ item }) => {
    if (!item) {
      return null;
    }

    if (item.resultType === "user") {
      return (
        <View style={{ marginBottom: 24 }}>
          <UserCard
            user={item}
            width={width * 0.93}
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
    }

    if (item.resultType === "arena") {
      return (
        <View style={{ marginBottom: 22 }}>
          <ArenaCard
            entry={item}
            width={width * 0.95}
            height={width / 1.1}
          />
        </View>
      );
    }

    if (item.resultType === "stage") {
      return (
        <View style={{ marginBottom: 22 }}>
          <StageCard
            entry={item}
            width={width * 0.95}
            height={width / 1.1}
          />
        </View>
      );
    }

    return null;
  };

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  const renderEmpty = () => {
    if (loading) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 22,
            backgroundColor: "rgba(218,184,105,0.07)",
            borderWidth: 1,
            borderColor: "rgba(218,184,105,0.18)",
          }}
        >
          <Ionicons
            name="search-outline"
            size={27}
            color="rgba(218,184,105,0.65)"
          />
        </View>

        <Text
          style={{
            marginTop: 20,
            fontSize: scale(15),
            fontWeight: "700",
            color: "#F0E8D8",
          }}
        >
          Nothing found
        </Text>

        <Text
          style={{
            marginTop: 9,
            textAlign: "center",
            fontSize: scale(11),
            lineHeight: 18,
            color: "rgba(255,255,255,0.38)",
          }}
        >
          No {searchType} matched "{query}"
        </Text>
      </View>
    );
  };

  /*
   * =========================================================
   * LIST FOOTER
   * =========================================================
   */

  const renderFooter = () => {
    if (!loadingMore) {
      return <View style={{ height: 30 }} />;
    }

    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: 26,
        }}
      >
        <ActivityIndicator
          size="small"
          color="#D8B86A"
        />

        <Text
          style={{
            marginTop: 10,
            fontSize: scale(10),
            fontWeight: "600",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Loading more...
        </Text>
      </View>
    );
  };

  /*
   * =========================================================
   * PREMIUM CATEGORY SELECTOR
   * Compact segmented navigation
   * Always stays visible
   * =========================================================
   */

  const renderCategorySelector = () => {
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 5,
          marginBottom: 17,
          padding: 4,
          height: scale(40),
          borderRadius: 13,
          backgroundColor: "#151512",
          borderWidth: 1,
          borderColor: "rgba(218,184,105,0.10)",
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        {/* ACTIVE SEGMENT BACKGROUND */}

        {/* <View
          pointerEvents="none"
          style = {{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 4,
            width: "33.333%",
            paddingRight: 3,
            }} >
          <View
            style={{
              flex: 1,
              borderRadius: 9,
              backgroundColor: "rgba(218,184,105,0.075)",
            }}
          />
        </View> */}

        {/* CATEGORY LABELS */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          {searchTypes.map((item, index) => {
            const active = searchType === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.75}
                onPress={() => handleFilterChange(item.id)}
                className = "rounded-xl"
                style={{
                  flex: 1,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: active ? "black" : "",
                  }} >
                <Text
                  className = "uppercase"
                  style={{
                    fontSize: scale(11),
                    fontWeight: active ? "800" : "500",
                    // letterSpacing: active ? 0.35 : 0.15,
                    color: active
                      ? "#E7CD94"
                      : "#c0c0c0",
                  }}  >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ANIMATED GOLD UNDERLINE */}

        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              bottom: 4,
              left: 4,
              width: "33.333%",
              height: 2,
              alignItems: "center",
            },
            underlineAnimatedStyle,
          ]}
        >
          <View
            style={{
              width: 23,
              height: 2,
              borderRadius: 2,
              backgroundColor: "#D8B86A",
              shadowColor: "#D8B86A",
              shadowOpacity: 0.45,
              shadowRadius: 5,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              elevation: 2,
            }}
          />
        </Animated.View>
      </View>
    );
  };

  /*
   * =========================================================
   * MAIN MODAL
   * =========================================================
   */

  return (
    <View
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "rgba(0,0,0,0.64)",
      }}
    >
      {/* BACKDROP */}

      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* SHEET */}

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: height * 0.94,
          overflow: "hidden",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderTopWidth: 1,
          borderColor: "rgba(218,184,105,0.17)",
          backgroundColor: "#090909",
        }}
      >
        {/* HANDLE */}

        {/* <View
          style={{
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 4,
              backgroundColor: "rgba(218,184,105,0.35)",
            }}
          />
        </View> */}

        {/* =================================================
            COLLAPSIBLE INTRO
        ================================================= */}

        <Animated.View
          style={[
            {
              overflow: "hidden",
            },
            introAnimatedStyle,
          ]}
        >
          <View
            style={{
              paddingHorizontal: 21,
              paddingTop: 17,
              paddingBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#D8B86A",
                    fontSize: scale(17),
                    fontWeight: "800",
                    letterSpacing: 2.1,
                  }}
                >
                  SEARCH DEEPER
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: 7,
                    color: "#F0E8D8",
                    fontSize: scale(12),
                    fontWeight: "500",
                  }}
                >
                  Results for "{query}"
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClose}
                style={{
                  marginLeft: 15,
                  width: 39,
                  height: 39,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  backgroundColor: "#15130F",
                  borderWidth: 1,
                  borderColor: "rgba(218,184,105,0.20)",
                }}
              >
                <Ionicons
                  name="close"
                  size={21}
                  color="#D8B86A"
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                marginTop: 12,
                fontSize: scale(11),
                lineHeight: 17,
                color: "rgba(255,255,255,0.42)",
              }}
            >
              Explore the Itri community, arenas and stages.
            </Text>
          </View>
        </Animated.View>

        {/* PINNED CATEGORY SELECTOR */}

        {renderCategorySelector()}

        {/* RESULTS SUMMARY */}

        <View
          style={{
            paddingHorizontal: 22,
            paddingBottom: 13,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255,255,255,0.045)",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "rgba(218,184,105,0.75)",
              fontSize: scale(9),
              fontWeight: "800",
              letterSpacing: 1.8,
            }}
          >
            {searchType.toUpperCase()}
          </Text>

          {!loading && results.length > 0 && (
            <Text
              style={{
                fontSize: scale(10),
                fontWeight: "600",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {results.length}
              {hasMore ? "+" : ""} results
            </Text>
          )}
        </View>

        {/* LOADING */}

        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              size="small"
              color="#D8B86A"
            />

            <Text
              style={{
                marginTop: 14,
                fontSize: scale(11),
                fontWeight: "500",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              Searching...
            </Text>
          </View>
        ) : (
          /* RESULTS */

          <AnimatedFlatList
            ref={listRef}
            data={results}
            renderItem={renderResult}
            keyExtractor={(item, index) =>
              `${item?.resultType || searchType}-${item?._id || index}`
            }
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 45,
              flexGrow: results.length === 0 ? 1 : 0,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={false}
          />
        )}
      </View>
    </View>
  );
}
