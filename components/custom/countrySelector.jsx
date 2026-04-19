import React, {
    useRef,
    useState,
    useMemo,
    useCallback,
    memo,
    useEffect, // ✅ added
  } from "react";
  import {
    Text,
    Animated,
    Dimensions,
    Pressable,
  } from "react-native";
  import * as Haptics from "expo-haptics";
  import { countries } from "../../utilities/TypeData";
  import { View } from "react-native";
  
  const { width } = Dimensions.get("window");
  
  /* ----------- ITEM CONFIG ----------- */
  const ITEM_WIDTH = width * 0.3;
  const ITEM_SPACING = 2;
  const SNAP_INTERVAL = ITEM_WIDTH + ITEM_SPACING * 2;
  
  /* ----------- MEMOIZED ITEM COMPONENT ----------- */
  const CountryItem = memo(
    ({ item, index, scrollX, selectedIndex, onPress }) => {
      const inputRange = [
        (index - 1) * SNAP_INTERVAL,
        index * SNAP_INTERVAL,
        (index + 1) * SNAP_INTERVAL,
      ];
  
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [1, 1, 1],
        extrapolate: "clamp",
      });
  
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp",
      });
  
      return (
        <Animated.View
          style={{
            width: ITEM_WIDTH,
            marginHorizontal: ITEM_SPACING,
            transform: [{ scale }],
            opacity,
          }}
          className="items-center justify-center "
        >
          <Pressable
            onPress={onPress}
            className={`w-full flex-row items-center justify-center round ed-xl px-1 ${
              selectedIndex === index
                ? "bg-gold/20 border bo rder-gold"
                : "bg-neutral-800 border border-neutral-700"
            }`}
          >
            <Text
              style={{ fontSize: width / 16 }}
            >
              {item.flag}
            </Text>
  
            <Text
              style={{ fontSize: width / 39 }}
              numberOfLines={1}
              className="text-white flex-1 font-semibold text-center"
            >
              {item.name}
            </Text>
          </Pressable>
        </Animated.View>
      );
    }
  );
  
  CountryItem.displayName = "CountryItem";
  
  /* ----------- MAIN COMPONENT ----------- */
  export default function CountrySelector({
    data = countries,
    setSelectedCountryCode,
    initialIndex = 0,
    selectedCountryCode,
  }) {
    const flatListRef = useRef(null);
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
        flatListRef.current?.scrollToOffset({
          offset: index * SNAP_INTERVAL,
          animated: true,
        });
      }
    }, [selectedCountryCode]);
  
    /* Memoize data */
    const memoizedData = useMemo(() => data, [data]);
  
    /* Scroll to index */
    const scrollToIndex = useCallback((index) => {
      if (!flatListRef.current) return;
      flatListRef.current.scrollToOffset({
        offset: index * SNAP_INTERVAL,
        animated: true,
      });
    }, []);
  
    /* Handle snapping */
    const handleMomentumEnd = useCallback(
      (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        let index = Math.round(offsetX / SNAP_INTERVAL);
  
        index = Math.max(0, Math.min(index, memoizedData.length - 1));
  
        if (index !== selectedIndex) {
          setSelectedIndex(index);
          Haptics.selectionAsync().catch(() => {});
          setSelectedCountryCode(memoizedData[index].code);
        }
      },
      [memoizedData, setSelectedCountryCode, selectedIndex]
    );
  
    /* Stable renderItem */
    const renderItem = useCallback(
      ({ item, index }) => (
        <CountryItem
          item={item}
          index={index}
          scrollX={scrollX}
          selectedIndex={selectedIndex}
          onPress={() => scrollToIndex(index)}
        />
      ),
      [scrollX, selectedIndex, scrollToIndex]
    );
  
    return (
      <View className="flex-1 bord er-r-2 b order-white">
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          data={memoizedData}
          extraData={selectedIndex} 
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          bounces={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          onMomentumScrollEnd={handleMomentumEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          initialScrollIndex={safeInitialIndex}
          getItemLayout={(_, index) => ({
            length: SNAP_INTERVAL,
            offset: SNAP_INTERVAL * index,
            index,
          })}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          windowSize={5}
          updateCellsBatchingPeriod={50}
        />
      </View>
    );
  }