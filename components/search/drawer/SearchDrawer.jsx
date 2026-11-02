
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
import { getSearchSuggestions } from "../../../apiCalls";
import ArenaJourneyCard from "../../myJourney/card/ArenaJourneyCard";
import UserProfileCard from "../../profile/card/userProfileCard";
import { useGlobalContext } from "../../../context/GlobalProvider";
import DeepSearchModal from "../modal/DeepSearchModal";
import StageCard from "../../discovery/cards/StageCard";


const SearchFooter = ({ onPress }) => {
    return (
      <View className="border-t border-white/[0.06] bg-[#090909] px-4 pb-6 pt-3">
  
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          className=" flex-row items-center border border-yellow-500/25  bg-yellow-500/[0.07]  px-4 py-3 rounded-[5px] "
        >
  
          <View
            className=" h-9 w-9  items-center justify-center rounded-xl bg-yellow-500/[0.10] "
          >
            <Ionicons
              name="search"
              size={18}
              color="#EAB308"
            />
          </View>
  
          <View className="ml-3 flex-1">
  
            <Text className="text-[13px] font-bold text-white">
              Search deeper
            </Text>
  
            <Text className="mt-[2px] text-[10px] text-white/40">
              Explore all people, arenas and stages
            </Text>
  
          </View>
  
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#EAB308"
          />
  
        </TouchableOpacity>
  
      </View>
    );
  };

const { width , height} = Dimensions.get("window");

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
const { scale , spacing } = useGlobalContext();

useEffect(() => {
if (visible) {
    translateX.value = withSpring(0, {
    damping: 18,
    stiffness: 160,
    overshootClamping: true,
    });
} else {
    translateX.value = withTiming(
    drawerWidth,
    {
        duration: 220,
    }
    );
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

// api calls 
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
      {/* =================================================
          BACKDROP
      ================================================= */}

      <TouchableOpacity
        activeOpacity={1}
        onPress={closeDrawer}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor:
            "rgba(0,0,0,0.58)",
        }}
      />

      {/* =================================================
          DRAWER
      ================================================= */}

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
              borderTopLeftRadius: 28,
              borderBottomLeftRadius: 28,
              borderLeftWidth: 1,
              borderLeftColor:
                "rgba(255,255,255,0.06)",
              overflow: "hidden",
            },
          ]}
        >
          <View className="flex-1 bg-[#090909]">

            {/* =================================================
                HEADER
            ================================================= */}

            <View className="px-3 pt-3 pb-2">

              {/* TOP */}
              <View className="mb-2 5 flex-row items-center justify-between">

                <View
                   className = "fl ex-1 px- 2"
                   >
                    <Text
                       style={{
                        color: "#eab308",
                        fontSize: scale(16),
                        fontWeight: "500",
                      }}
                      className = "tracking-wide"
                    >
                        SEARCH
                    </Text>
                    <Text
                        style={{
                        color:
                            "rgba(255,255,255,0.45)",
                        fontSize: scale(9),
                        marginTop: 4,
                        }} >
                        Find people, arenas & stages
                    </Text>
                </View>  

                <TouchableOpacity 
                className ="py-2  b g-white justify-center items-center"
                onPress={closeDrawer}>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={scale(45)}
                        color="#eab308"
                    />
                </TouchableOpacity>

              </View>

              {/* =================================================
                  SEARCH INPUT
              ================================================= */}

              <View
                className={`h-[54px] flex-row items-center rounded-[10px] border mb- 4 px-4 ${
                  focused
                    ? "border-[#EAB308]/20 b g-[#14120A]"
                    : "border-white/[0.07] b g-[#111111]"
                }`}
              >

                <Ionicons
                  name="search-outline"
                  size={21}
                  color="#EAB308"
                />

                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search Itri "
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="search"
                  onFocus={() =>
                    setFocused(true)
                  }

                  onBlur={() =>
                    setFocused(false)
                  }

                  className="ml-3 flex-1 text-[15px] font-medium text-white"
                />

                {query.length > 0 && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      setQuery("")
                    }
                    className="ml-2 h-7 w-7 items-center justify-center rounded-full bg-white/[0.07]"  >
                    <Ionicons
                      name="close"
                      size={scale(18)}
                      color="rgba(255,255,255,0.55)"
                    />
                  </TouchableOpacity>
                )}

              </View>

            </View>

            {/* =================================================
                CONTENT — WE WILL BUILD THIS NEXT
            ================================================= */}

            <View className="flex-1 px- 5 pt- 7">

              {query.length === 0 ? (
                <View>
                  {/* <Text className="mb-4 text-[11px] font-bold uppercase tracking-[1.2px] text-white/30">
                    Explore
                  </Text> */}
{/* 
                  <View className="rounded-2xl border border-white/[0.06] bg-[#101010] p-4">

                    <View className="flex-row items-center">
                      <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#EAB308]/[0.08]">
                        <Ionicons
                          name="search-outline"
                          size={19}
                          color="#EAB308"
                        />
                      </View>

                      <View className="ml-3 flex-1">
                        <Text className="text-[14px] font-semibold text-white">
                          Discover Itri
                        </Text>

                        <Text className="mt-1 text-[11px] text-white/40">
                          Search people, arenas and competitions
                        </Text>
                      </View>
                    </View>

                  </View> */}
                </View>
              ) : (
                <View
                className ="w-full flex-1">

                  <View 
                   style = {{
                    paddingHorizontal : spacing(10),
                    paddingVertical : spacing(16)
                  }}
                  className=" flex-row items-center justify-between">
                    <Text 
                     style = {{
                      fontSize :  scale(10),
                   
                    }}
                    className="text-[11px] fon t-bold uppercase trac king-[1.2px] text-white/80">
                    Suggestions
                    </Text>
                    {searching && (
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={18}
                        color="rgba(255,255,255,0.3)"
                    />
                    )}
                 </View>

                  <FlatList
                        data={suggestionData}
                        keyExtractor={(item) =>
                            `${item.resultType}-${item._id}`
                        }
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle ={{
                            // rowGap:20
                        }}
                        renderItem={({ item }) => {
                            switch (item.resultType) {
                            case "user":
                                return (
                                <View
                                className = "mb-8">
                                    <UserProfileCard
                                        entry={item}
                                        width={width * 0.95}
                                        height={width/2}
                                    />
                                </View>
                                );
                              break;
                            case "arena":
                                return (
                                  <View
                                  className = "mb-8">
                                    <ArenaJourneyCard
                                    entry={item}
                                    width={width * 0.95}
                                    height={width/1.1}
                                    />
                                  </View>
                                );

                            case "stage":
                                return (
                                 <View
                                 className = "mb-8">
                                    <StageCard
                                        entry={item}
                                        width={width * 0.95}
                                        height={width/1.1}
                                    />
                                 </View>
                                );
                               break;
                            default:
                                return null;
                            }
                        }}
                      
                        ListEmptyComponent={
                            !searching ? (
                            <View 
                            style = {{
                              height : height /1.8
                            }}
                            className="items-center justify-center  flex- 1 py-10">
                                <Ionicons
                                name="search-outline"
                                size={scale(45)}
                                color="rgba(255,255,255,0.2)"
                                />
                                <Text 
                                style = {{
                                  fontSize :  scale(14)
                                }}
                                className="mt-3 text-[12px] text-white/30">
                                No suggestions found
                                </Text>
                            </View>
                            ) : null
                        }
                    />
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