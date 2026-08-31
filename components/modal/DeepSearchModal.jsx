import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { deepSearch } from "../../apiCalls";
import StageCard from "../stage/StageCard";
import ArenaJourneyCard from "../myJourney/ArenaJourneyCard";
import UserProfileCard from "../profile/card/userProfileCard";

const { width, height } = Dimensions.get("window");

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

  useEffect(() => {
    if (visible) {
      setSearchType("people");
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
      const newResults =
        response?.results || [];
      if (replace) {
        setResults(newResults);
      } else {
        setResults(prev => [
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
  const handleFilterChange = (
    type
  ) => {
    if (type === searchType) {
      return;
    }
    setSearchType(type);
    setResults([]);
    setPage(1);
    setHasMore(true);
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
      icon: "people-outline",
    },
    {
      id: "arenas",
      label: "Arenas",
      icon: "flame-outline",
    },
    {
      id: "stages",
      label: "Stages",
      icon: "trophy-outline",
    },
  ];
// load more

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

 // rendering 
 const renderResult = ({ item }) => {
    if (!item) {
      return null;
    }
    if (item.resultType === "user") {
      return (
        <View className="mb-3">

          <UserProfileCard
              entry={item}
              width={width * 0.95}
              height={width/2.2}
          />

        </View>
      );
    }

    if (item.resultType === "arena") {
      return (
        <View className="mb-3">

          <ArenaJourneyCard
            entry={item}
            width={width * 0.95}
            height={width/1.3}
          />

        </View>
      );
    }

    if (item.resultType === "stage") {
      return (
        <View className="mb-3">

          <StageCard
             entry={item}
             width={width * 0.95}
             height={width/1.3}
          />
        </View>
      );
    }
    return null;
  };


  const renderEmpty = () => {
    if (loading) {
      return null;
    }
    return (
      <View className="flex-1 items-center justify-center px-8">
        <View className="
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white/[0.06]
          bg-white/[0.03]
        ">
          <Ionicons
            name="search-outline"
            size={24}
            color="rgba(255,255,255,0.25)"
          />
        </View>

        <Text className="
          mt-4
          text-[15px]
          font-semibold
          text-white/70
        ">
          Nothing found
        </Text>

        <Text className="
          mt-2
          text-center
          text-[11px]
          leading-[17px]
          text-white/30
        ">
          No {searchType} matched "{query}"
        </Text>

      </View>
    );
  };

  const renderFooter = () => {

    if (!loadingMore) {
      return <View className="h-8" />;
    }

    return (
      <View className="items-center py-6">

        <ActivityIndicator
          size="small"
          color="#EAB308"
        />

        <Text className="
          mt-2
          text-[10px]
          font-medium
          text-white/30
        ">
          Loading more...
        </Text>

      </View>
    );
  };


  return (
    <View
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10000,
      }}
      className="bg-black/60"
    >

      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />


      {/* =====================================================
          SHEET
      ===================================================== */}

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: height * 0.94,
        }}
        className="
          overflow-hidden
          rounded-t-[28px]
          border-t
          border-white/[0.08]
          bg-[#090909]
        "
      >

        {/* ===================================================
            HANDLE
        =================================================== */}

        <View className="items-center pt-3">

          <View className="
            h-[4px]
            w-[42px]
            rounded-full
            bg-white/[0.18]
          " />

        </View>


        {/* ===================================================
            HEADER
        =================================================== */}

        <View className="
          px-5
          pt-5
        ">

          <View className="
            flex-row
            items-center
            justify-between
          ">

            <View className="flex-1">

              <Text className="
                text-[20px]
                font-black
                uppercase
                tracking-[0.5px]
                text-yellow-500
              ">
                SEARCH DEEPER
              </Text>

              <Text
              style ={{
                fontSize :width/30
              }}
               className=" mt-1 text-[12px] text-white/90 "
              numberOfLines={1}
              >
                Results for "{query}"
              </Text>

            </View>


            {/* CLOSE */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClose}
              className="  ml-4  p-1   items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]   "
            >

              <Ionicons
                name="close"
                size={35}
                color="rgba(255,255,255,0.7)"
              />

            </TouchableOpacity>

          </View>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <Text className=" mt-4 text-[11px] leading-[17px]  text-white/35  ">
            Search across people, arenas and stages .
          </Text>


          {/* =================================================
              FILTER PILLS
          ================================================= */}

          <View className="
            mt-5
            flex-row
            items-center
          ">

            {/* PEOPLE */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                handleFilterChange("people")
              }
              className={`
                mr-2
                h-[38px]
                flex-1
                flex-row
                items-center
                justify-center
                rounded-full
                border
                ${
                  searchType === "people"
                    ? "border-yellow-500/40 bg-yellow-500/[0.12]"
                    : "border-white/[0.27] bg-white/[0.03]"
                }
              `}
            >

              <MaterialCommunityIcons
                name="account-group-outline"
                size={15}
                color={
                  searchType === "people"
                    ? "#EAB308"
                    : "rgba(255,255,255,0.4)"
                }
              />

              <Text
                className={`
                  ml-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.8px]
                  ${
                    searchType === "people"
                      ? "text-yellow-500"
                      : "text-white/45"
                  }
                `}
              >
                People
              </Text>

            </TouchableOpacity>


            {/* ARENAS */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                handleFilterChange("arenas")
              }
              className={`
                mr-2
                h-[38px]
                flex-1
                flex-row
                items-center
                justify-center
                rounded-full
                border
                ${
                  searchType === "arenas"
                    ? "border-yellow-500/40 bg-yellow-500/[0.12]"
                    : "border-white/[0.27] bg-white/[0.03]"
                }
              `}
            >

              <MaterialCommunityIcons
                name="stadium-outline"
                size={15}
                color={
                  searchType === "arenas"
                    ? "#EAB308"
                    : "rgba(255,255,255,0.4)"
                }
              />

              <Text
                className={`
                  ml-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.8px]
                  ${
                    searchType === "arenas"
                      ? "text-yellow-500"
                      : "text-white/45"
                  }
                `}
              >
                Arenas
              </Text>

            </TouchableOpacity>


            {/* STAGES */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                handleFilterChange("stages")
              }
              className={`
                h-[38px]
                flex-1
                flex-row
                items-center
                justify-center
                rounded-full
                border
                ${
                  searchType === "stages"
                    ? "border-yellow-500/40 bg-yellow-500/[0.12]"
                    : "border-white/[0.27] bg-white/[0.03]"
                }
              `}
            >

              <MaterialCommunityIcons
                name="trophy-outline"
                size={15}
                color={
                  searchType === "stages"
                    ? "#EAB308"
                    : "rgba(255,255,255,0.4)"
                }
              />

              <Text
                className={`
                  ml-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.8px]
                  ${
                    searchType === "stages"
                      ? "text-yellow-500"
                      : "text-white/45"
                  }
                `}
              >
                Stages
              </Text>

            </TouchableOpacity>

          </View>

        </View>


        {/* ===================================================
            RESULTS HEADER
        =================================================== */}

        <View className="
          px-5
          pb-3
          pt-6
        ">

          <View className="
            flex-row
            items-center
            justify-between
          ">

            <Text className="
              text-[10px]
              font-bold
              uppercase
              tracking-[1.2px]
              text-white/30
            ">
              {searchType}
            </Text>

            {!loading && results.length > 0 && (
              <Text className="
                text-[10px]
                font-medium
                text-white/25
              ">
                {results.length}
                {hasMore ? "+" : ""} results
              </Text>
            )}

          </View>

        </View>


        {/* ===================================================
            LOADING
        =================================================== */}

        {loading ? (

          <View className="
            flex-1
            items-center
            justify-center
          ">

            <ActivityIndicator
              size="small"
              color="#EAB308"
            />

            <Text className="
              mt-3
              text-[11px]
              text-white/30
            ">
              Searching...
            </Text>

          </View>

        ) : (

          /* =================================================
             RESULTS FLATLIST
          ================================================= */

          <FlatList
            data={results}
            renderItem={renderResult}
            keyExtractor={(item, index) =>
              `${item?.resultType || searchType}-${item?._id || index}`
            }
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 40,
              flexGrow: results.length === 0 ? 1 : 0,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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