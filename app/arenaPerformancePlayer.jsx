
import React, {
    useMemo,
    useRef,
    useState,
    useEffect,
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
  
  import ArenaVideoItem from "../components/viewArenas/ArenaVideoItem";
import { useGlobalContext } from "../context/GlobalProvider";
  
  export default function ArenaPerformancePlayer() {
    const { width, height } =useWindowDimensions();
    const insets = useSafeAreaInsets();
    const {user , setGlobalArenaRefresh} = useGlobalContext()
    const flatListRef = useRef(null);
    const {arenaPosts,selectedPostId ,arena} = useLocalSearchParams();

    const posts =
      useMemo(() => {
        try {
          return JSON.parse(
            arenaPosts
          );
        } catch {
          return [];
        }
      }, [arenaPosts]);

    const selectedArena = 
     useMemo(() => {
        try {
          return JSON.parse(
            arena
          );
        } catch {
          return [];
        }
    }, [arena]);

    const initialIndex = useMemo(() => {
        const index =
          posts.findIndex(
            item =>
              item._id ===
              selectedPostId
          );
        return index >= 0
          ? index
          : 0;
      }, [
        posts,
        selectedPostId,
      ]);
    const [ currentIndex, setCurrentIndex, ] = useState(initialIndex);
  
    useEffect(() => {
      if (
        flatListRef.current &&
        initialIndex >= 0
      ) {
        requestAnimationFrame(
          () => {
            flatListRef.current?.
            scrollToIndex({
              index : initialIndex,
              animated : false,
            });
          }
        );
      }
    }, []);
  
    const onViewableItemsChanged =
      useRef(
        ({
          viewableItems,
        }) => {
          if (
            !viewableItems ||
            viewableItems.length === 0
          ) {
            return;
          }
          const visibleItem = viewableItems[0];
          if ( visibleItem?.index !== undefined ) {
            setCurrentIndex( visibleItem.index );
          }
        }
      ).current;

    const viewabilityConfig =
      useRef({
        itemVisiblePercentThreshold:
          80,
        minimumViewTime:
          150,
      }).current;

    const topPadding = Platform.OS == "ios" ? insets.top : 30;
    const bottomPadding = Platform.OS == "ios" ? insets.bottom : 30
    const screenHeight = height - topPadding - bottomPadding


    return (
      <View
        style={{
        //   flex: 1,
          width : width ,
          height: height,
          backgroundColor:"#000",
          paddingTop : topPadding,
          paddingBottom : bottomPadding
        }}
        className ="justify-center items-center"
      >
        <FlatList
          ref={flatListRef}
          data={posts}
          pagingEnabled
          snapToInterval={screenHeight}
          decelerationRate="fast"
          disableIntervalMomentum
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          removeClippedSubviews
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={3}
          getItemLayout={(_, index) => ({
            length: screenHeight ,
            offset: (screenHeight) * index,
            index,
          })}
          initialScrollIndex={
            initialIndex
          }
          onViewableItemsChanged={
            onViewableItemsChanged
          }
          viewabilityConfig={
            viewabilityConfig
          }
          renderItem={({
            item,
            index,
          }) => (
            <ArenaVideoItem
              item={item}
              index={index}
              currentIndex={
                currentIndex
              }
              width={width}
              height={screenHeight}
              selectedArena ={selectedArena}
              user  = {user}
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
          )}
        />
  
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
          style={{
            position: "absolute",
            top: insets.top + 5,
            left: 5,
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
  
      </View>
    );
  }