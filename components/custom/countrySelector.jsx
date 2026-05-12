


import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image
} from "react-native";
import { countries } from "../../utilities/TypeData";

const { width ,height} = Dimensions.get("window");

const ITEM_SIZE = height / 20;
const SPACING = 32;
const SNAP = ITEM_SIZE + SPACING;
// Math.round(
//   ITEM_SIZE + SPACING
// );


//   const CountryItem = memo(
//     ({ item, index, scrollX, selectedIndex, onPress }) => {
//       const inputRange = [
//         (index - 1) * SNAP_INTERVAL,
//         index * SNAP_INTERVAL,
//         (index + 1) * SNAP_INTERVAL,
//       ];
  
//       const scale = scrollX.interpolate({
//         inputRange,
//         outputRange: [1, 1, 1],
//         extrapolate: "clamp",
//       });
  
//       const opacity = scrollX.interpolate({
//         inputRange,
//         outputRange: [0.5, 1, 0.5],
//         extrapolate: "clamp",
//       });
  
//       return (
//         <Animated.View
//           style={{
//             width: ITEM_WIDTH,
//             marginHorizontal: ITEM_SPACING,
//             transform: [{ scale }],
//             opacity,
//           }}
//           className="items-center justify-center "
//         >
//           <Pressable
//             onPress={onPress}
//             className={`w-full flex-row items-center justify-center round ed-xl px-1 ${
//               selectedIndex === index
//                 ? "bg-gold/20 border bo rder-gold"
//                 : "bg-neutral-800 border border-neutral-700"
//             }`}
//           >
//             <Text
//               style={{ fontSize: width / 16 }}
//             >
//               {item.flag}
//             </Text>
  
//             <Text
//               style={{ fontSize: width / 39 }}
//               numberOfLines={1}
//               className="text-white flex-1 font-semibold text-center"
//             >
//               {item.name}
//             </Text>
//           </Pressable>
//         </Animated.View>
//       );
//     }
//   );
  
//   CountryItem.displayName = "CountryItem";


export default function CountrySelector({
    data = countries,
    setSelectedCountryCode,
    initialIndex = 0,
    selectedCountryCode,
}) {

  const flatList = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
      const safeInitialIndex = countries.findIndex(
      (c) => c.code === selectedCountryCode
    );
  
    const [selectedIndex, setSelectedIndex] = useState(safeInitialIndex);
  
    /* ✅ FIX 1: sync external state → internal index */
    useEffect(() => {
      const index = countries.findIndex(
        (c) => c.code === selectedCountryCode
      );
  
      if (index !== -1 && index !== selectedIndex) {
        setSelectedIndex(index);
        flatList.current?.scrollToOffset({
          offset: index * SNAP,
          animated: true,
        });
      }
    }, [selectedCountryCode]);
  
    /* Memoize data */
    const memoizedData = useMemo(() => data, [data]);
  
    /* Scroll to index */
    // const scrollToIndex = useCallback((index) => {
    //   if (!flatList.current) return;
    //   flatList.current.scrollToOffset({
    //     offset: index * SNAP_INTERVAL,
    //     animated: true,
    //   });
    // }, []);
  
    /* Handle snapping */
    const handleMomentumEnd = useCallback(
      (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        let index = Math.round(offsetX / SNAP);
  
        index = Math.max(0, Math.min(index, memoizedData.length - 1));
  
        if (index !== selectedIndex) {
          setSelectedIndex(index);
        //   Haptics.selectionAsync().catch(() => {});
          setSelectedCountryCode(memoizedData[index].code);
        }
      },
      [memoizedData, setSelectedCountryCode, selectedIndex]
    );



  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * SNAP,
      index * SNAP,
      (index + 1) * SNAP,
    ];

    // cinematic transforms
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1.0, 0.60],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.60],
      extrapolate: "clamp",
    });

    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ["14deg", "0deg", "-14deg"],
      extrapolate: "clamp",
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [10, 0, 10],
      extrapolate: "clamp",
    });

    const blur = scrollX.interpolate({
      inputRange,
      outputRange: [12, 0, 12],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        className = "items-center  justify-center"
        style={{
          width: ITEM_SIZE,
          marginHorizontal: SPACING / 2,
          alignItems: "center",
          transform: [
            { translateY },
            { scale },
            { rotate },
          ],
          opacity,
        }}
      >
        {/* glow */}
        <Animated.View
          className = "items-center justify-center"
          style={{
            position: "absolute",
            width: ITEM_SIZE + 5,
            height: ITEM_SIZE + 5,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.12)",
            opacity: scale,
          }}
        />
                <Text
                style={{ fontSize: width / 14 }} >
                {item.flag}
                </Text>
    
      </Animated.View>
    );
  };



  return (
    <View
    //   pointerEvents={!show ? "none" : "auto"}
      style={{
        // width: "100%",
        height:height/15,
        alignItems: "center",
        // marginTop: 18,
        // top:0,
        
      }}
       className =" w-full py- 4 border bg -white/30 flex-col justify-between "
    >

      
      {/* selected contestant title */}
      <View
      className = "flex-1 justify-start  items-center">
          
            <Animated.FlatList
                    ref={flatList}
                    data={data}
                    horizontal
                    keyExtractor={(item) => item.code}
                    snapToInterval={SNAP}
                    decelerationRate="fast"
                    bounces={false}
                    overScrollMode="never"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal:
                        width / 2 -  SNAP / 2 ,
                        // alignItems: "center",
                    }}
                    renderItem={renderItem}
                    onMomentumScrollEnd={handleMomentumEnd}
                    onScroll={Animated.event(
                        [
                        {
                            nativeEvent: {
                            contentOffset: {
                                x: scrollX
                            }
                            }
                        }
                        ],
                        {
                        useNativeDriver: true,
                        }
                    )}
                    scrollEventThrottle={16}
                    initialScrollIndex={Math.max(
                        0,
                        data.findIndex(
                        c => c.code === selectedCountryCode
                        )
                    )}
                    getItemLayout={(data, index) => ({
                        length: SNAP,
                        offset: SNAP * index,
                        index,
                    })}
                    removeClippedSubviews={true}
                    initialNumToRender={7}
                    maxToRenderPerBatch={7}
                    windowSize={5}
                    />
      </View>

      <View
        className = " absolute left-[58%] top-[-10] border-b border-gold p-1 b g-[#363434] rounded-full items-center"
        style={{
          alignItems: "center",
        }} >
        <Text
        className = "font-bebas tracking-wide"
          style={{
            color: "white",
            fontSize: width/45,
            fontWeight: "900",
            letterSpacing: 0.7,
          }}
        >
          {countries.find(c=> c.code === selectedCountryCode).name}
        </Text>
      </View>

    </View>
  );
}