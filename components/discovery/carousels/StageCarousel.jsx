import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/GlobalProvider";
import LoadingActivity from "../../modal/loadingActivity";
import { getRegionName } from "../../../helper";
import StageCard from "../cards/StageCard";
import CarouselIndicator from "../indicator/carouselIndicator";
import DiamandSeperator from "../../custom/diamandSeperator";

export default function StageCarousel({
  type = "local",
}) {
  const {
    isLoading,
    globalRefresh,
    userCountryCode,
    trendingStages,
    hotStages,
    spacing,
    colorTheme,
    scale,
  } = useGlobalContext();

  const mainScrollX = useRef(new Animated.Value(0)).current;
  const mainFlatListRef = useRef(null);
  const [currentStage, setCurrentStage] = useState(0);

  const { width, height } = Dimensions.get("window");
  const CARD_WIDTH = width - spacing(16);

  const stages =
    type === "global"
      ? hotStages
      : type === "regional"
      ? trendingStages
      : type === "local"
      ? trendingStages
      : [];

  const displayStages = stages.slice(0, 5);
  const totalPages = displayStages.length;

  const title =
    type === "global"
      ? "Hot Stages"
      : type === "regional"
      ? " Regional Stages "
      : "Trending Stages";

  const subTitle =
    type === "global"
      ? " Discover where talent is making waves right now"
      : type === "regional"
      ? "Stages from your region"
      : `Explore stages near you and across ${getRegionName(
          userCountryCode
        )}`;

  useEffect(() => {
    setCurrentStage(0);

    mainFlatListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [type, stages]);

  const goToPage = (direction) => {
    if (totalPages <= 1) return;

    const nextIndex = Math.max(
      0,
      Math.min(currentStage + direction, totalPages - 1)
    );

    if (nextIndex === currentStage) return;

    mainFlatListRef.current?.scrollToOffset({
      offset: nextIndex * width,
      animated: true,
    });

    setCurrentStage(nextIndex);
  };

  const renderMainItem = ({ item }) => {
    return (
      <View
        style={{
          width,
        }}
      >
        <StageCard
          entry={item}
          width={CARD_WIDTH}
          height={width / 1.2}
        />
      </View>
    );
  };

  if (globalRefresh || !stages?.length) return null;

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginBottom: spacing(50),
      }}
    >


      <View
        className="items-center justify-center"
        style={{
          width: "95%",
          marginBottom: spacing(34),
          gap: spacing(4),
        }}
      >
        <View
          className="flex-row items-center justify-center"
          style={{
            gap: spacing(12),
            marginBottom: spacing(4),
          }}
        >
          <View
            style={{
              // width: scale(18),
              height: scale(1),
              backgroundColor: "rgba(232,185,90,0.35)",
            }}
            className = "flex-1"
          />

          <Text
            className = "uppercase"
            style={{
              fontSize: scale(16),
              fontWeight: "800",
              letterSpacing: scale(0.8),
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
          className="uppercase"
          style={{
            marginTop: spacing(5),
            fontSize: scale(9),
            fontWeight: "600",
            letterSpacing: scale(0.2),
            color: "rgba(255,255,255,0.80)",
            textAlign: "center",
          }}
        >
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
          ref={mainFlatListRef}
          horizontal
          data={displayStages}
          extraData={globalRefresh}
          renderItem={renderMainItem}
          keyExtractor={(item) => item._id.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate="fast"
          removeClippedSubviews
          bounces={false}
          scrollEventThrottle={16}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={5}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / width
            );

            setCurrentStage(
              Math.max(0, Math.min(index, totalPages - 1))
            );
          }}
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
              disabled={currentStage === 0}
              hitSlop={8}
              style={{
                // width: scale(40),
                // height: scale(38),
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                  currentStage === 0
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                  currentStage === 0
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={scale(21)}
                color={
                  currentStage === 0
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
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: scale(8),
                  marginBottom: spacing(5),
                  // marginTop: scale(32)
                }} >
                {displayData.map((item, index) => (
                  <View
                    key={item._id.toString()}
                    style={{
                      width:
                        index === currentStage
                          ? scale(8)
                          : scale(8),
                      height: scale(10),
                      borderRadius: scale(3),
                      backgroundColor:
                        index === currentStage
                          ? "#E8B95A"
                          : "rgba(255,255,255,0.22)",
                    }}
                  />
                ))}
              </View> */}

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
                  {String(currentStage + 1)}
                </Text>
                {"  /  "}
                {String(totalPages)}
              </Text>
            </View>

            {/* NEXT */}
            <Pressable
              onPress={() => goToPage(1)}
              disabled={currentStage === totalPages - 1}
              hitSlop={8}
              style={{
                padding : scale(2) ,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor:
                  currentStage === totalPages - 1
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(232,185,90,0.09)",
                borderWidth: scale(0.7),
                borderColor:
                  currentStage === totalPages - 1
                    ? "rgba(255,255,255,0.26)"
                    : "rgba(232,185,90,0.22)",
              }}
            >
              <Ionicons
                name="chevron-forward"
                size={scale(21)}
                color={
                  currentStage === totalPages - 1
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