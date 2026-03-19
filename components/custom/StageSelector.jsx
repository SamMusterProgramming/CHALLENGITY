// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   Animated,
//   Pressable,
//   Dimensions,
//   FlatList,
//   Image
// } from "react-native";

// import UserTalentEntry from "../talent/UserTalentEntry";
// import { icons } from "../../constants";
// import { getTalentStageByName } from "../../apiCalls";
// import { getStageLogo } from "../../helper";

// const { width } = Dimensions.get("window");

// const STAGE_ITEM_WIDTH = 100; 
// const REGION_ITEM_WIDTH = 100; 
// const MAIN_ITEM_WIDTH = width * 0.78;
// const MAIN_ITEM_MARGIN = 8;
// const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
// const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;

// const talentStages = [
//     { id: '1', name: 'Music', icon: icons.music, iconPack: 'FontAwesome5',color:"#dee2e3" },
//     { id: '2', name: 'Dancing', icon: icons.dance, iconPack: 'Entypo' ,color:"#bdc2c4" },
//     { id: '3', name: 'Fitness', icon: icons.fitness, iconPack: 'MaterialIcons',color:"#eb34cc" },
//     { id: '4', name: 'Magic', icon: icons.magic, iconPack: 'FontAwesome5', color:"#6709e3"},
//     { id: '5', name: 'Food', icon: icons.eating, iconPack: 'FontAwesome5' , color:"#c26e08" },
//     { id: '6', name: 'Adventure', icon: icons.adventure, iconPack: 'MaterialIcons', color:"#08c227" },
//     { id: '7', name: 'Sport', icon: icons.sport, iconPack: 'FontAwesome5' , color:"#babfba"},
//     { id: '8', name: 'Instrument', icon: icons.instrument, iconPack: 'FontAwesome5', color:"#a83707" },
//     { id: '9', name: 'Gaming', icon: icons.game, iconPack: 'FontAwesome5', color:"#0774ab" },
//     { id: '10', name: 'Art', icon: icons.art, iconPack: 'FontAwesome5' , color:"#ab3807"},
//     { id: '11', name: 'Tech', icon: icons.tech, iconPack: 'FontAwesome5' , color:"#99970c"},
//     { id: '12', name: 'Comedy', icon: icons.comedy, iconPack: 'MaterialIcons', color:"#8a0303" },
  
//   ];
// const regions = [ 
//     { id: '1', name: 'africa', icon: icons.africa },
//     { id: '2', name: 'asia', icon: icons.asia },
//     { id: '3', name: 'europa', icon: icons.europe},
//     { id: '4', name: 'america', icon: icons.america},
// ];


// export default function StageSelector({ user }) {


//   const [selectedStage, setSelectedStage] = useState(talentStages[0]);
//   const [selectedRegion, setSelectedRegion] = useState(regions[0]);
//   const [stageData, setStageData] = useState(null);

//   const mainScrollX = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     getTalentStageByName(selectedStage.name , setStageData)
//   }, [selectedStage])
  

//   const renderStageItem = ({ item }) => {
//     const active = selectedStage.id === item.id;
//     return (
//       <Pressable
//         onPress={() => setSelectedStage(item)}
//         className={`mx-2 p-2 rounded-xl ${
//           active ? "bg-blue-400/40" : "bg-zinc-800/40"
//         }`}
//       >
//         <Image
//         style={{ 
//              width:width/15 , 
//              height:width/15
//              }}
//         source={getStageLogo(item.name)}
//         resizeMethod="cover"
//          />
       
//       </Pressable>
//     );
//   };


//   const renderMainItem = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * MAIN_SNAP_INTERVAL,
//       index * MAIN_SNAP_INTERVAL,
//       (index + 1) * MAIN_SNAP_INTERVAL
//     ];

//     const scale = mainScrollX.interpolate({
//       inputRange,
//       outputRange: [0.85, 1, 0.85],
//       extrapolate: "clamp"
//     });

//     const opacity = mainScrollX.interpolate({
//       inputRange,
//       outputRange: [0.7, 1, 0.7],
//       extrapolate: "clamp"
//     });

//     return (
//       <Animated.View
//         style={{
//           width: MAIN_ITEM_WIDTH,
//           marginHorizontal: MAIN_ITEM_MARGIN,
//           transform: [{ scale }],
//           opacity,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <UserTalentEntry
//           userTalent={item}
//           user={user}
//           userProfile={user}
//           activity={true}
//           width={MAIN_ITEM_WIDTH}
//         />
//       </Animated.View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-black py-4">


//       <FlatList
//         horizontal
//         data={talentStages}
//         renderItem={renderStageItem}
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//       />

   
//       <Animated.FlatList
//         horizontal
//         data={stageData && stageData}
//         renderItem={renderMainItem}
//         keyExtractor={(item) => item._id}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={MAIN_SNAP_INTERVAL}
//         decelerationRate="fast"
//         bounces={false}
//         contentContainerStyle={{
//           paddingHorizontal: SIDE_SPACING,
//           marginVertical: 24
//         }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//       />

      
//     </View>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { generateChallengeTalentGuinessData, getAllTalentStages } from "../../apiCalls";
import StageDisplayer from "../talent/stageDisplayer";

const { width } = Dimensions.get("window");

/* ---------------- SELECTOR CONFIG ---------------- */

const ICON_SIZE = 70;
const ICON_MARGIN = 18;

const ITEM_WIDTH = ICON_SIZE + ICON_MARGIN * 2;
const SNAP_INTERVAL = ITEM_WIDTH;

/* ---------------- MAIN CAROUSEL ---------------- */

const MAIN_ITEM_WIDTH = width * 0.88;
const MAIN_ITEM_MARGIN = 2;
const MAIN_SNAP_INTERVAL = MAIN_ITEM_WIDTH + MAIN_ITEM_MARGIN * 2;
const SIDE_SPACING = (width - MAIN_ITEM_WIDTH) / 2;

/* ---------------- STAGES ---------------- */

const talentStages = [
  { id: "20", name: "Global Stages" },
  { id: "0", name: "Trending Stages" },
  { id: "1", name: "Hot Stages" },
  { id: "14", name: "Singing" },
  { id: "2", name: "Dancing" },
  { id: "3", name: "Fitness" },
  { id: "4", name: "Magic" },
  { id: "5", name: "Food" },
  { id: "6", name: "Adventure" },
  { id: "7", name: "Sport" },
  { id: "8", name: "Melody" },
  { id: "9", name: "Gaming" },
  { id: "10", name: "Art" },
  { id: "11", name: "Tech" },
  { id: "12", name: "Comedy" },
];

const stageIcons = {
  "Global Stages" : "🌍",
  "Trending Stages": "📈",
  "Hot Stages": "🔥",
  "Singing": "🎤",
  Dancing: "💃",
  Fitness: "🏋️",
  Magic: "🪄",
  Food: "🍔",
  Adventure: "🏕️",
  Sport: "⚽",
  Melody: "🎸",
  Gaming: "🎮",
  Art: "🎨",
  Tech: "🧠",
  Comedy: "🎭",
};

const continentIcons = {
    Africa: "🌍",      // Globe showing Africa/Europe
    Americas: "🌎",    // Globe showing Americas
    Asia: "🌏",        // Globe showing Asia/Oceania
    Europe: "🌍",      // Reuse Africa/Europe globe for Europe
  };

/* ---------------- COMPONENT ---------------- */

export default function StageSelector({ user }) {
  const [selectedStage, setSelectedStage] = useState(talentStages[2]);
  const [allStages, setAllStages] = useState([]);
  const [stageData, setStageData] = useState([]);
  const [hotStages, setHotStages] = useState([]);
  const [selection, setSelection] = useState(null)

  const topScrollX = useRef(new Animated.Value(0)).current;
  const mainScrollX = useRef(new Animated.Value(0)).current;

  const topFlatListRef = useRef(null);
  const mainFlatListRef = useRef(null);

  /* ------------ FETCH STAGES ------------ */

  useEffect(() => {
    getAllTalentStages(setAllStages);
  }, []);


  useEffect(() => {
      topFlatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      generateChallengeTalentGuinessData(user._id, setHotStages);
  }, []);

  useEffect(() => {
   setStageData(hotStages)
}, [hotStages]);

  /* ------------ FILTER DATA ------------ */

  useEffect(() => {
    if(selectedStage.name == "Hot Stages") { 
        setStageData(hotStages);    }
    else{
    const filtered = allStages.filter(
      (stage) =>
        stage.name?.toLowerCase() === selectedStage.name.toLowerCase()
    );
    setStageData(filtered);
 }
  }, [selectedStage, allStages]);

  useEffect(() => {
    if (topFlatListRef.current) {
      topFlatListRef.current.scrollToOffset({
        offset: 2 * SNAP_INTERVAL, // 3rd item = index 2
        animated: true,           // false = instant, true = scroll animation
      });
    }
  }, []);

  /* ------------ RESET MAIN LIST ------------ */

  useEffect(() => {
    mainFlatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [stageData]);

  /* ------------ STAGE SELECTION ------------ */

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);

    if (talentStages[index]) {
      setSelectedStage(talentStages[index]);
    }
  };

  /* ------------ STAGE ICON ITEM ------------ */

  const renderStageItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL,
    ];

    const scale = topScrollX.interpolate({
      inputRange,
      outputRange: [0.75, 1.15, 0.75],
      extrapolate: "clamp",
    });

    const opacity = topScrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          width: ITEM_WIDTH,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale }],
          opacity,
        }}
      >
        <Pressable
          onPress={() =>
            topFlatListRef.current?.scrollToOffset({
              offset: index * SNAP_INTERVAL,
              animated: true,
            })
          }
          style={{ alignItems: "center" }}
        >
          <Text style={{ fontSize: width / 20 }}>
            {stageIcons[item.name]}
          </Text>

          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: width / 50,
              marginTop: 2,
            }}
            >
            {item.name}
          </Text>
        </Pressable>
      </Animated.View>
    );
  };

  /* ------------ MAIN STAGE CARD ------------ */

  const renderMainItem = ({ item, index }) => {
    // setSelection({
    //         stageName : item.name ,
    //         stageRegion : item.region
    //       })
    const inputRange = [
      (index - 1) * MAIN_SNAP_INTERVAL,
      index * MAIN_SNAP_INTERVAL,
      (index + 1) * MAIN_SNAP_INTERVAL,
    ];

    const scale = mainScrollX.interpolate({
      inputRange,
      outputRange: [0.95, 1, 0.95],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          width: MAIN_ITEM_WIDTH,
          marginHorizontal: MAIN_ITEM_MARGIN,
          transform: [{ scale }],
        }}
      >
        <StageDisplayer
          userTalent={item}
          user={user}
          userProfile={user}
          activity={true}
          width={MAIN_ITEM_WIDTH}
        />
      </Animated.View>
    );
  };

  /* ------------ RENDER ------------ */

  return (
    <View style={{ flex: 1 , backgroundColor: "black" }}>

      {/* ---------- STAGE SELECTOR ---------- */}

      <View
      className= "mt- 3 mb- 4"
       style={{ height: 70, justifyContent: "center" }}>

        <LinearGradient
          pointerEvents="none"
          colors={["rgba(80,120,255,0.35)", "transparent"]}
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: 120,
            height: 30,
            borderRadius: 40,
          }}
        />

        <Animated.FlatList
          ref={topFlatListRef}
          horizontal
          data={talentStages}
          renderItem={renderStageItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: (width - ITEM_WIDTH) / 2,
            alignItems: "center",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: topScrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
         />
      </View>

      {/* ---------- MAIN CONTENT ---------- */}
    <View
    className="flex-1 items-center justify-center">
        <View
        style ={{  height: (width + width / 2.5 + width * 0.1) * 0.95
        }}
        className ="flex- 1 h- [100%] bg -[#353434] items-center justify-center b g-[#9f9b9b]">
                {/* <LinearGradient
                pointerEvents="none"
                colors={["rgba(250,250,255,0.35)", "transparent"]}
                style={{
                    position: "absolute",
                    top: 0,
                    alignSelf: "center",
                    width: "100%",
                    height: 380,
                    borderRadius: 0,
                }}
                />
                <LinearGradient
                pointerEvents="none"
                colors={[ "transparent" ,"rgba(250,250,255,0.35)"]}
                style={{
                    position: "absolute",
                    bottom: 0,
                    alignSelf: "center",
                    width: "100%",
                    height: 380,
                    borderRadius: 0,
                }}
                /> */}
            <Animated.FlatList
                ref={mainFlatListRef}
                horizontal
                data={stageData}
                renderItem={renderMainItem}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                snapToInterval={MAIN_SNAP_INTERVAL}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{
                paddingHorizontal: SIDE_SPACING,
                marginVertical: 20,
                }}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: mainScrollX } } }],
                { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />
            
            </View>
            <View
            className=" w-[100%] flex-1 p- 4 px-2 justify-start items-center ">
                <Text  className ="text-gray-400"
                        style={{
                            fontWeight: "500",
                            fontSize: width / 38,
                            textAlign: "center",
                        }}
                        >
                    Explore stages. Discover talent. Watch, vote, and compete.
                </Text>
            </View>
        </View>

    
    {/* <View
    className=" w-[100%] p-4 px-2 justify-center items-center ">
        <Text  className ="text-gray-400"
                style={{
                  
                    fontWeight: "500",
                    fontSize: width / 38,
                    textAlign: "center",
                }}
                >
             Explore stages. Discover talent. Watch, vote, and compete.
        </Text>
    </View> */}
   

    </View>
  );
}