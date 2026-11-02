import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";


import { router, useFocusEffect } from "expo-router";
import StageCard from "../discovery/cards/StageCard";
import ArenaCard from "../discovery/cards/ArenaCard";
import Header from "../discovery/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getRegionTalentStages, getStageByNameAndRegion } from "../../apiCalls/stages";
import { getLocalArenas } from "../../apiCalls/arenas";
import { getUserTalent } from "../../apiCalls/talents";

export const homeState = {
  scrollY: 0,
};

export default function DiscoveryPage({ onScroll }) {
  const {
    user,
    setUserTalents,
    hotStages,
    setHotStages,
    globalSelectedRegion,
    regionStages,
    setRegionStages,
    hotStageScrolledIndex,
    globalRefresh,
    setGlobalRefresh,
    spacing, scale
  } = useGlobalContext();

  const flatListRef = useRef(null);
  const scrollY = useRef(homeState.scrollY || 0);

  const [loadingStages, setLoadingStages] = useState(false);
  const [selectedTab, setSelectedTab] = useState("stages");
  const [arenas, setArenas] = useState([]);
  const [isFocused, setIsFocused] = useState(true);

  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  // ============================================================
  // REFRESH GLOBAL DATA
  // ============================================================

  useEffect(() => {
    if (!globalRefresh) return;

    const fetchData = async () => {
      try {
        await Promise.all([
          getRegionTalentStages(
            globalSelectedRegion,
            setRegionStages
          ),
          getUserTalent(
            user._id,
            setUserTalents
          ),
        ]);

        const updatedStage = hotStages[hotStageScrolledIndex];

        if (updatedStage) {
          const stage = await getStageByNameAndRegion({
            name: updatedStage.name,
            region: updatedStage.region,
          });

          setHotStages((prev) =>
            prev.map((s) =>
              s._id === stage._id
                ? { ...s, ...stage }
                : s
            )
          );
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        setTimeout(() => {
          setGlobalRefresh(false);
        }, 100);
      }
    };

    fetchData();
  }, [globalRefresh]);

  // ============================================================
  // LOAD REGION DATA
  // ============================================================

  useEffect(() => {
    if (!globalSelectedRegion) return;

    const stagesAlreadyLoaded =
      selectedTab === "stages" &&
      globalSelectedRegion === regionStages[0]?.region;

    const arenasAlreadyLoaded =
      selectedTab === "arenas" &&
      globalSelectedRegion === arenas[0]?.region;

    if (stagesAlreadyLoaded || arenasAlreadyLoaded) {
      return;
    }

    const loadData = async () => {
      try {
        setLoadingStages(true);

        await Promise.all([
          getRegionTalentStages(
            globalSelectedRegion,
            setRegionStages
          ),
          getLocalArenas(
            globalSelectedRegion,
            { userId: user._id },
            setArenas
          ),
        ]);
      } catch (error) {
        console.error("Error loading explore data:", error);
      } finally {
        setLoadingStages(false);
      }
    };

    loadData();
  }, [
    globalSelectedRegion,
    globalRefresh,
    selectedTab,
  ]);

  // ============================================================
  // ARENA NAVIGATION
  // ============================================================

  const openArena = (entry) => {
    router.push({
      pathname: "/arenaDisplayer",
      params: {
        arena_id: entry._id,
      },
    });
  };

  // ============================================================
  // FOCUS / SCROLL RESTORATION
  // ============================================================

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: homeState.scrollY || 0,
          animated: false,
        });
      }, 80);

      return () => {
        setIsFocused(false);
        clearTimeout(timeout);
      };
    }, [])
  );

  // ============================================================
  // CURRENT DATASET
  // ============================================================

  const currentData =
    selectedTab === "stages"
      ? regionStages
      : arenas;

  const isEmpty = currentData.length === 0;

  // ============================================================
  // RENDER ITEM
  // ============================================================

  const renderItem = ({ item }) => {
    if (selectedTab === "stages") {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <StageCard
            entry={item}
            width={width * 0.95}
            // height={width / 1.1}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <ArenaCard
          entry={item}
          width={width * 0.95}
        />
      </View>
    );
  };

  // ============================================================
  // FOCUS GUARD
  // ============================================================

  if (!isFocused) {
    return null;
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <View
      style={{
        paddingTop: insets.top,
        // paddingHorizontal : spacing(16)
      }}
      className="flex-1 w- full justify-center items-center bg-black"
    >
      {/* HEADER */}

      <View
        style={{
          // width: "100%",
          marginTop : spacing(16)
        }}
        className="justify-center w-[95%] items-center"
      >
        <Header
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </View>

      {/* CONTENT */}

      <View
        style={{
          width: "100%",
        }}
        className="flex-1 w-full items-center justify-center"
      >
        {loadingStages ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size="small"
              color="#EAB308"
            />

            <Text
              style={{
                marginTop: 12,
                color: "rgba(255,255,255,0.65)",
                fontSize: width / 34,
              }}
            >
              Loading{" "}
              {selectedTab === "stages"
                ? "stages"
                : "arenas"}
              ...
            </Text>
          </View>
        ) : isEmpty ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: 12,
                color: "rgba(255,255,255,0.65)",
                fontSize: width / 30,
              }}
            >
              {selectedTab === "stages"
                ? "No Stage Found"
                : "No Arena Found"}
            </Text>
          </View>
        ) : (
          <FlatList
            key={selectedTab}
            ref={flatListRef}
            data={currentData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  paddingVertical: spacing(16),
                  width: "90%",
                }}
              />
            )}
            contentContainerStyle={{
              paddingBottom: height * 0.075,
            }}
          />
        )}
      </View>
    </View>
  );
}