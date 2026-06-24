
// import React, {
//     useRef,
//     useState,
//     useEffect,
//     useMemo,
//   } from "react";
  
// import {
// View,
// Text,
// FlatList,
// TouchableOpacity,
// Image,
// useWindowDimensions,
// } from "react-native";
  
// import {
// useLocalSearchParams,
// router,
// } from "expo-router";

// import {
// useSafeAreaInsets,
// } from "react-native-safe-area-context";

// import {
// MaterialCommunityIcons,
// Ionicons,
// } from "@expo/vector-icons";

// import {
// VideoView,
// useVideoPlayer,
// } from "expo-video";

// export default function ArenaPerformancePlayer() {

//     const { width, height } = useWindowDimensions();
//     const insets = useSafeAreaInsets();
//     const flatListRef = useRef(null);
//     const {
//         arenaPosts,
//         selectedPostId,
//     } = useLocalSearchParams();
//     const posts = useMemo(() => {
//         try {
//         return JSON.parse(
//             arenaPosts
//         );
//         } catch {
//         return [];
//     }
//     }, []);
//     const initialIndex =
//         useMemo(() => {
//         const index =
//             posts.findIndex(
//             post =>
//                 post._id ===
//                 selectedPostId
//             );
//         return index >= 0
//             ? index
//             : 0;
//     }, [posts]);
//     const [currentIndex,
//         setCurrentIndex] =
//         useState(initialIndex);
//     const [paused,
//         setPaused] =
//         useState(false);
//     const currentPost =
//         posts[currentIndex];

//     const player =
//         useVideoPlayer(
//         currentPost?.media
//             ?.video?.cdnUrl,
//         player => {
//             player.loop = true;
//         }
//         );

//     useEffect(() => {
//         if (
//             !player ||
//             !currentPost?.media
//                 ?.video?.cdnUrl
//             ) return;
//             player.replaceAsync(
//             currentPost.media
//                 .video.cdnUrl
//         );
//         if (!paused) {
//         player.play();
//         }
//     }, [currentIndex]);

//     useEffect(() => {
//         if (
//             flatListRef.current &&
//             initialIndex >= 0
//             ) {
//         setTimeout(() => {
//             flatListRef.current
//             ?.scrollToIndex({
//                 index:
//                 initialIndex,
//                 animated:
//                 false,
//             });
//         }, 100);
//         }
//     }, []);

//     const togglePlay = () => {
//         if (!player) return;
//         console.log("I am here")
//         if (paused) {
//             player.play();
//         } else {
//             player.pause();
//         }
//         setPaused(
//             prev => !prev
//         );
//     };

//     const onViewableItemsChanged = useRef(({
//                                             viewableItems,
//                                         }) => {
//             if ( viewableItems.length > 0 ) {
//                 const index =
//                     viewableItems[0]
//                     ?.index;
//             if (index !== undefined ) {
//                 setPaused(
//                 false
//                 );
//                 setCurrentIndex(
//                 index
//                 );
//             }
//             }
//         }
//         ).current;

//     const viewabilityConfig =
//         useRef({
//         itemVisiblePercentThreshold:
//             80,
//         }).current;

//     return (
//         <View
//         style={{
//             flex: 1,
//             backgroundColor:
//             "#000", }}  >

//         {/* SINGLE VIDEO PLAYER */}
   
//         <TouchableOpacity
//             activeOpacity={1}
//             onPress={togglePlay}
//             style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             zIndex:1
//             }} >
//             <VideoView
//             player={player}
//             nativeControls ={false}
//             contentFit="cover"
//             onPress={togglePlay}
//             allowsPictureInPicture={
//                 false
//             }
//             style={{
//                 width: "100%",
//                 height: "100%",
//             }}
//             />
//         </TouchableOpacity>
        
//         {/* PAGING LAYER */}

//         <FlatList
//             ref={flatListRef}
//             data={posts}
//             pagingEnabled
//             snapToInterval={
//             height
//             }
//             decelerationRate="fast"
//             keyExtractor={item =>
//             item._id
//             }
//             renderItem={() => (
//             <View
//                 style={{
//                 width,
//                 height,
//                 opacity: paused ? 1 : 0,
//                 }}
//             />
//             )}
//             showsVerticalScrollIndicator={
//             false
//             }
//             removeClippedSubviews
//             initialNumToRender={2}
//             maxToRenderPerBatch={2}
//             windowSize={3}
//             onViewableItemsChanged={
//             onViewableItemsChanged
//             }
//             viewabilityConfig={
//             viewabilityConfig
//             }
//         />

//         {/* PAUSE OVERLAY */}

//         {paused &&
//             currentPost && (
//             <>
//                 <Image
//                 source={{
//                     uri:
//                     currentPost
//                         .media
//                         ?.thumbnail
//                         ?.cdnUrl,
//                 }}
//                 resizeMode="cover"
//                 style={{
//                     position:
//                     "absolute",
//                     width:
//                     "100%",
//                     height:
//                     "100%",
//                 }}
//                 />

//                 <View
//                 style={{
//                     position:
//                     "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     backgroundColor:
//                     "rgba(0,0,0,0.45)",
//                     justifyContent:
//                     "center",
//                     alignItems:
//                     "center",
//                 }}
//                 >
//                 <Ionicons
//                     name="play-circle"
//                     size={90}
//                     color="#eab308"
//                 />
//                 </View>
//             </>
//             )}

//         {/* BACK */}

//         <TouchableOpacity
//             onPress={() =>
//             router.back()
//             }
//             style={{
//             position:
//                 "absolute",
//             top:
//                 insets.top +
//                 12,
//             left: 14,
//             width: 42,
//             height: 42,
//             borderRadius:
//                 999,
//             backgroundColor:
//                 "rgba(0,0,0,0.45)",
//             justifyContent:
//                 "center",
//             alignItems:
//                 "center",
//             }}
//         >
//             <Ionicons
//             name="arrow-back"
//             size={22}
//             color="white"
//             />
//         </TouchableOpacity>

//         {/* SPOTLIGHT */}

//         {currentPost
//             ?.spotLight && (
//             <View
//             style={{
//                 position:
//                 "absolute",
//                 top:
//                 insets.top +
//                 12,
//                 right: 14,
//                 backgroundColor:
//                 "rgba(234,179,8,0.15)",
//                 borderWidth:
//                 1,
//                 borderColor:
//                 "#eab308",
//                 borderRadius:
//                 999,
//                 paddingHorizontal:
//                 12,
//                 paddingVertical:
//                 6,
//             }}
//             >
//             <Text
//                 style={{
//                 color:
//                     "#eab308",
//                 fontWeight:
//                     "700",
//                 }}
//             >
//                 ⭐ Spotlight
//             </Text>
//             </View>
//         )}

//         {/* RIGHT ACTIONS */}

//         <View
//             style={{
//             position:
//                 "absolute",
//             right: 14,
//             bottom: 160,
//             alignItems:
//                 "center",
//             }}
//         >

//             <TouchableOpacity
//             style={{
//                 marginBottom:
//                 20,
//                 alignItems:
//                 "center",
//             }}
//             >
//             <Ionicons
//                 name="heart"
//                 size={28}
//                 color="white"
//             />

//             <Text
//                 style={{
//                 color:
//                     "white",
//                 marginTop:
//                     4,
//                 }}
//             >
//                 {
//                 currentPost
//                     ?.likes
//                     ?.length
//                 }
//             </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//             style={{
//                 marginBottom:
//                 20,
//                 alignItems:
//                 "center",
//             }}
//             >
//             <Ionicons
//                 name="chatbubble"
//                 size={26}
//                 color="white"
//             />

//             <Text
//                 style={{
//                 color:
//                     "white",
//                 marginTop:
//                     4,
//                 }}
//             >
//                 {
//                 currentPost
//                     ?.comments
//                     ?.length
//                 }
//             </Text>
//             </TouchableOpacity>

//             <TouchableOpacity>
//             <MaterialCommunityIcons
//                 name="share"
//                 size={26}
//                 color="white"
//             />
//             </TouchableOpacity>

//         </View>

//         {/* CAPTION */}

//         <View
//             style={{
//             position:
//                 "absolute",
//             left: 16,
//             right: 80,
//             bottom: 40,
//             }}
//         >

//             <Text
//             style={{
//                 color:
//                 "#fff",
//                 fontSize:
//                 17,
//                 fontWeight:
//                 "700",
//             }}
//             >
//             Performance
//             </Text>

//             <Text
//             numberOfLines={
//                 paused
//                 ? 8
//                 : 3
//             }
//             style={{
//                 color:
//                 "#D1D5DB",
//                 marginTop:
//                 8,
//                 fontSize:
//                 14,
//                 lineHeight:
//                 20,
//             }}
//             >
//             {
//                 currentPost
//                 ?.caption
//             }
//             </Text>

//         </View>

//         </View>
//     );
//     }
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
    const flatListRef =useRef(null);
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
  
    const [
      currentIndex,
      setCurrentIndex,
    ] = useState(
      initialIndex
    );
  
    useEffect(() => {
  
      if (
        flatListRef.current &&
        initialIndex >= 0
      ) {
  
        requestAnimationFrame(
          () => {
  
            flatListRef.current?.
            scrollToIndex({
              index:
                initialIndex,
              animated:
                false,
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
  
          const visibleItem =
            viewableItems[0];
  
          if (
            visibleItem?.index !==
            undefined
          ) {
  
            setCurrentIndex(
              visibleItem.index
            );
  
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