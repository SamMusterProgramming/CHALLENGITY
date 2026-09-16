
import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import { useGlobalContext } from "../context/GlobalProvider";
import {
  getGlobalSpotlightPerformances,
  getLocalSpotlightPerformances,
  getRegionalSpotlightPerformances,
} from "../apiCalls";
import PerformancePost from "../components/arenaPerformancePlayer/performancePost";

export default function ArenaPerformancePlayer() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {
    user,
    globalSpotlightPage,
    setGlobalSpotlightPage,
    scale
  } = useGlobalContext();

  const flatListRef = useRef(null);

  const {
    arenaPosts,
    selectedPostId,
    type,
    arena,

  } = useLocalSearchParams();

  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMoreSpotlight, setLoadingMoreSpotlight] = useState(false);
  const [hasMoreSpotlight, setHasMoreSpotlight] = useState(true);

  const topPadding = Platform.OS === "ios" ? insets.top : 30;
  const bottomPadding = Platform.OS === "ios" ? insets.bottom : 30;
  const screenHeight = height - topPadding - bottomPadding;

  const selectedArena = useMemo(() => {
    try {
      return JSON.parse(Array.isArray(arena) ? arena[0] : arena);
    } catch {
      return [];
    }
  }, [arena]);

  const initialIndex = useMemo(() => {
    const index = posts.findIndex(
      item => item._id === selectedPostId
    );

    return index >= 0 ? index : 0;
  }, [posts, selectedPostId]);

  useEffect(() => {
    try {
      const parsedPosts = JSON.parse(
        Array.isArray(arenaPosts)
          ? arenaPosts[0]
          : arenaPosts
      );

      if (Array.isArray(parsedPosts)) {
        setPosts(parsedPosts);

        const index = parsedPosts.findIndex(
          item => item._id === selectedPostId
        );

        setCurrentIndex(index >= 0 ? index : 0);
      }
    } catch (error) {
      console.log("arenaPosts parse error:", error);
    }

    return () => {
      setGlobalSpotlightPage(2);
    };
  }, [arenaPosts, selectedPostId]);

  useEffect(() => {
    if (
      !posts.length ||
      !flatListRef.current ||
      initialIndex < 0 ||
      initialIndex >= posts.length
    ) {
      return;
    }

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    });
  }, [posts.length, initialIndex]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }) => {
      const index = viewableItems?.[0]?.index;

      if (index !== undefined) {
        setCurrentIndex(index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 150,
  }).current;

  const loadMoreSpotlightPerformances = async () => {
    if (loadingMoreSpotlight || !hasMoreSpotlight) {
      return;
    }

    setLoadingMoreSpotlight(true);

    try {
      let res = null;

      switch (type) {
        case "global":
          res = await getGlobalSpotlightPerformances(
            globalSpotlightPage
          );
          break;

        case "regional":
          res = await getRegionalSpotlightPerformances(
            globalSpotlightPage
          );
          break;

        case "local":
          res = await getLocalSpotlightPerformances(
            globalSpotlightPage
          );
          break;

        default:
          break;
      }

      const performances = res?.data?.performances || [];

      if (!performances.length) {
        setHasMoreSpotlight(false);
        return;
      }

      const newPosts = performances.map(item => ({
        ...item,
        arena_id: item.arena._id,
        arenaName: item.arena.arenaName,
        talentType: item.arena.talentType,
        region: item.arena.region,
        profileImage: item.owner.profileImage,
        owner_id: item.owner._id,
      }));

      setGlobalSpotlightPage(prev => prev + 1);
      setPosts(prev => [...prev, ...newPosts]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMoreSpotlight(false);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <PerformancePost
        item={item}
        index={index}
        currentIndex={currentIndex}
        width={width}
        height={screenHeight}
        selectedArena={selectedArena}
        user={user}
        onVideoEnd={() => {
          const nextIndex = index + 1;

          if (nextIndex < posts.length) {
            flatListRef.current?.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
        }}
      />
    ),
    [
      currentIndex,
      width,
      screenHeight,
      selectedArena,
      user,
      posts.length,
    ]
  );

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: "#000",
        paddingTop: topPadding,
        paddingBottom: bottomPadding,
      }}
      className="justify-center items-center"
    >
      <FlatList
        ref={flatListRef}
        data={posts}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate="fast"
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        removeClippedSubviews={true}
        windowSize={2}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        getItemLayout={(_, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        initialScrollIndex={initialIndex}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={renderItem}
        onEndReached={loadMoreSpotlightPerformances}
        onEndReachedThreshold={0.7}
      />

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: insets.top + 5,
          left: 5,
          borderRadius: 999,
          backgroundColor: "rgba(0,0,0,0.75)",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="p-2"
      >
        <Ionicons
          name="arrow-back"
          size={scale(18)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}