import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { countries, regionIcons } from "../../../utilities/TypeData";
import { getRegionName } from "../../../helper";
import FeaturedCard from "../cards/FeaturedCard";
import CarouselIndicator from "../indicator/carouselIndicator";
import DiamandSeperator from "../../custom/diamandSeperator";

export default function FeaturedCarousel({
  height,
  type = "global",
}) {
  const { width } = Dimensions.get("window");

  const {
    user,
    globalSpotlightPerformances,
    scale,
    regionalSpotlightPerformances,
    localSpotlightPerformances,
    spacing,
  } = useGlobalContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [arenaPosts, setArenaPosts] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTalent, setSelectedTalent] = useState("ALL TALENT");

  const flatListRef = useRef(null);

  const CARD_WIDTH = width - spacing(16);

  const performances =
    type === "global"
      ? globalSpotlightPerformances
      : type === "regional"
      ? regionalSpotlightPerformances
      : type === "local"
      ? localSpotlightPerformances
      : [];

  const regionStatus = () => {
    switch (type) {
      case "local":
        return {
          name: countries.find((c) => c.code == user.country).name,
          flag: countries.find((c) => c.code == user.country).flag,
        };

      case "regional":
        return {
          name: getRegionName(user.country),
          flag: regionIcons[getRegionName(user.country)],
        };

      case "global":
        return {
          name: "Global",
          flag: regionIcons["Global"],
        };

      default:
        return {};
    }
  };

  const regionInfos = regionStatus();

  const displayData = useMemo(() => {
    if (selectedTalent === "ALL TALENT") {
      return performances.slice(0, 5);
    }

    return performances
      .filter((p) => p.arena.talentType === selectedTalent)
      .slice(0, 5);
  }, [performances, selectedTalent]);

  const totalPages = displayData.length;

  const title =
    type === "global"
      ? "Global Spotlights"
      : type === "regional"
      ? "Regional Spotlights"
      : "Local spotlights";

  const subTitle =
    type === "global"
      ? "Performances across the globe"
      : type === "regional"
      ? "Performances from your region"
      : "Performances near you";

  useEffect(() => {
    if (!selectedProfile) return;

    router.push({
      pathname: "/ProfileScreen",
      params: {
        userProfile: JSON.stringify(selectedProfile),
        arena_id: null,
      },
    });
  }, [selectedProfile]);

  useEffect(() => {
    if (!selectedPost) return;

    const posts = [];

    performances.forEach((a) => {
      const post = {
        ...a,
        arena_id: a.arena._id,
        arenaName: a.arena.arenaName,
        talentType: a.arena.talentType,
        region: a.arena.region,
        profileImage: a.owner.profileImage,
        owner_id: a.owner._id,
      };

      posts.push(post);
    });

    const updatedPosts = [
      posts.find(
        (p) => p._id.toString() === selectedPost._id.toString()
      ),
      ...posts.filter(
        (p) => p._id.toString() !== selectedPost._id.toString()
      ),
    ].filter(Boolean);

    setArenaPosts(updatedPosts);
  }, [selectedPost, performances]);

  useEffect(() => {
    if (!arenaPosts.length) return;

    router.push({
      pathname: "/arenaPerformancePlayer",
      params: {
        selectedPostId: arenaPosts[0]._id,
        type,
        arenaPosts: JSON.stringify(arenaPosts),
        arena: JSON.stringify(null),
      },
    });
  }, [arenaPosts]);

  useEffect(() => {
    setCurrentIndex(0);

    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [displayData]);

  const goToPage = (direction) => {
    if (totalPages <= 1) return;

    const nextIndex = Math.max(
      0,
      Math.min(currentIndex + direction, totalPages - 1)
    );

    if (nextIndex === currentIndex) return;

    flatListRef.current?.scrollToOffset({
      offset: nextIndex * width,
      animated: true,
    });

    setCurrentIndex(nextIndex);
  };

  if (!performances?.length) {
    return null;
  }

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginBottom: spacing(50),
      }}
    >


      <View
        className="items-center text-center justify-center"
        style={{
          width: "95%",
          marginBottom: spacing(34),
          gap: spacing(4),
        }}
      >

        
        <View
          className="flex-row items-center  justify-center"
          style={{
            gap: spacing(12),
            marginBottom: spacing(4),
          }}  >
              <View
                style={{
                  // width: scale(18),
                  height: scale(2),
                  backgroundColor: "rgba(232,185,90,0.35)",
                }}
                className = "flex-1"
              />

              <Text
                className = "uppercase fl ex-1"
                style={{
                  fontSize: scale(16),
                  fontWeight: "900",
                  letterSpacing: scale(0.6),
                  color: "#E8B95A",
                }}
              >
                {title}
              </Text>

              <View
                style={{
                  // width: scale(18),
                  height: scale(1),
                  backgroundColor: "rgba(232,185,90,0.35)",
                }}
                className = "flex-1"
              />
        </View>

        <Text
          className = "uppercase flex -1"
          style={{
            marginTop: spacing(5),
            fontSize: scale(10),
            fontWeight: "600",
            letterSpacing: scale(0.2),
            color: "rgba(255,255,255,0.80)",
            textAlign: "center",
          }}   >
          {subTitle}
        </Text>
      </View>

      

      {/* CAROUSEL */}
      <View
        style={{
          width,
          alignItems: "center",
          justifyContent: "center",
        }}
        className="flex-1 bg-black"
      >
        <FlatList
          ref={flatListRef}
          style={{ width }}
          horizontal
          data={displayData}
          keyExtractor={(item) => item._id.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / width
            );

            setCurrentIndex(
              Math.max(0, Math.min(index, totalPages - 1))
            );
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeaturedCard
                entry={item}
                width={CARD_WIDTH}
                height={width / 1.5}
                setSelectedPost={setSelectedPost}
              />
            </View>
          )}
        />

       
      </View>

       {/* BOTTOM PAGE INDICATOR */}
       {totalPages > 1 && (
          <View
            style={{
              width: "95%",
              flexDirection: "row",
              // alignItems: "end",
              justifyContent: "space-between",
              marginTop: spacing(28),
              // gap: spacing(14),
              // height: scale(64)
            }}
            className = " bg-[#1b1a1a]  py-3 px-3 rounded-xl items-end bo rder bor der-white"
          >
            {/* PREVIOUS */}
            <Pressable
              onPress={() => goToPage(-1)}
              disabled={currentIndex === 0}
              hitSlop={8}
              style={{
                // width: scale(40),
                // height: scale(38),
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                  currentIndex === 0
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                  currentIndex === 0
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={scale(21)}
                color={
                  currentIndex === 0
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
                  {String(currentIndex + 1)}
                </Text>
                {"  /  "}
                {String(totalPages)}
              </Text>
            </View>

            {/* NEXT */}
            <Pressable
              onPress={() => goToPage(1)}
              disabled={currentIndex === totalPages - 1}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                  currentIndex === totalPages - 1
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                  currentIndex === totalPages - 1
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-forward"
                size={scale(21)}
                color={
                  currentIndex === totalPages - 1
                    ? "rgba(255,255,255,0.22)"
                    : "#E8B95A"
                }
              />
            </Pressable>
          </View>
        )}


    </View>
  );
}