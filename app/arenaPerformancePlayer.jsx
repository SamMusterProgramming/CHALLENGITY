
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
  
  import ArenaVideoItem from "../components/viewArenas/ArenaVideoItem";
import { useGlobalContext } from "../context/GlobalProvider";
import { getGlobalSpotlightPerformances, getLocalSpotlightPerformances, getRegionalSpotlightPerformances } from "../apiCalls";
  
  export default function ArenaPerformancePlayer() {
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const {user , setGlobalArenaRefresh ,globalSpotlightPage, setGlobalSpotlightPage ,
      gobalSpotlightPerformances,setGlobalSpotlightPerformances
    } = useGlobalContext()
    const flatListRef = useRef(null);
    const {arenaPosts,selectedPostId ,type ,arena} = useLocalSearchParams();
    const [posts , setPosts] = useState([])
    const [loadingMoreSpotlight, setLoadingMoreSpotlight] = useState(false);
    const [hasMoreSpotlight, setHasMoreSpotlight] = useState(true);
    

    useEffect(() => {
      const posts =
          JSON.parse(
              arenaPosts
            );
      setPosts(posts)
      return () =>{
        setGlobalSpotlightPage(2)
      }
    }, [])
      
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
        itemVisiblePercentThreshold: 80,
        minimumViewTime: 150,
      }).current;

    const loadMoreSpotlightPerformances = async () => {
        // Prevent duplicate requests
        if (loadingMoreSpotlight || !hasMoreSpotlight) {
            return;
        }
        setLoadingMoreSpotlight(true);
        try {
            const nextPage = globalSpotlightPage + 1;
            let res = null
            switch (type) {
              case "global":
                    res = await getGlobalSpotlightPerformances(globalSpotlightPage);
                    break;
              case "regional":
                  res = await getRegionalSpotlightPerformances(globalSpotlightPage);
                  break;
              case "local":
                  res = await getLocalSpotlightPerformances(globalSpotlightPage);
                  break;
              default:
                break;
            }
            const performances = res?.data.performances || []
            // No more cached pages
            if (!performances || performances.length === 0) {
                setHasMoreSpotlight(false);
            } else {
                setGlobalSpotlightPage(prev => prev + 1);
                let pts = []
                performances.map((a) => {
                    let post = a
                    post = {...post,  arena_id : a.arena._id ,
                                      arenaName :a.arena.arenaName ,
                                      talentType : a.arena.talentType ,
                                      region : a.arena.region ,
                                      profileImage : a.owner.profileImage ,
                                      owner_id : a.owner._id
                            }
                       pts.push(post)
                 })
                 setPosts(prev => [...prev, ...pts]);
            }
        
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingMoreSpotlight(false);
        }
    };


    const renderItem = useCallback(
      ({ item, index }) => (
          <ArenaVideoItem
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
      [currentIndex, width, screenHeight, selectedArena, user, posts.length]
    );

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
          removeClippedSubviews ={true}
          windowSize={2}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
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
          renderItem={renderItem}
          onEndReached={loadMoreSpotlightPerformances}
          onEndReachedThreshold={0.7}
        />
  
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
          style={{
            position: "absolute",
            top: insets.top + 5,
            left: 5,
            // width: 42,
            // height: 42,
            borderRadius: 999,
            backgroundColor: "rgba(0,0,0,0.75)",
            justifyContent: "center",
            alignItems: "center",
          }}
          className ="p-3"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
  
      </View>
    );
  }