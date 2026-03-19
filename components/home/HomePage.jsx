// import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput, Dimensions, Pressable } from 'react-native'
// import React, { memo, useEffect, useRef, useState } from 'react'
// import { useGlobalContext } from '../../context/GlobalProvider'
// import { generateChallengeTalentGuinessData } from '../../apiCalls'
// import { router } from 'expo-router'
// import { icons } from '../../constants'
// import Post from '../post/Post'
// import StageCategorySelector from '../custom/StageCategorySelector'
// import { Animated } from 'react-native'
// import UserTalentEntry from '../talent/UserTalentEntry'

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = width * 0.6;
// const ITEM_SPACING = (width - ITEM_WIDTH) / 2;




// export default function HomePage({reset , setReset}) {
//   const {user, userTalents, setUserTalents, userTalentPerformances , setUserTalentPerformances , notifications} = useGlobalContext()
//   const [data , setData] = useState(null)
//   const [displayData, setDisplayData] = useState([]);
//   const [index, setIndex] = useState(2);
//   const [refresh, setRefresh] = useState(false);
//   const [description ,setDescription] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("hot");

//   const scrollX = useRef(new Animated.Value(0)).current;





//   useEffect(() => {
//     generateChallengeTalentGuinessData(user._id ,setData)
//   }, [])
  
//   useEffect(() => {
//     if(data){
//         setDisplayData(data.slice(0,index))
//     }
//   }, [data])


  

//   const handleRefresh = () => {
//     setRefresh(true)
   
//     getTopChallenges(user._id,setTrendingChallenges)
//     setTimeout(() => {
//       setRefresh(false);
//     }, 1000);
   
//   };

//   const loadMoreData = () => {
//     const newData = data.slice(index, index + 2);
//     setDisplayData([...displayData, ...newData]);
//     setIndex(index + 2);
//   };

//   const renderItem = ({ item, index }) => {
  
//     const inputRange = [
//       (index - 1) * ITEM_WIDTH,
//       index * ITEM_WIDTH,
//       (index + 1) * ITEM_WIDTH
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.8, 1, 0.8],
//       extrapolate: 'clamp'
//     });

//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.7, 1, 0.7],
//       extrapolate: 'clamp'
//     });

//     return (
//       <Animated.View
//       style={{
//         width: ITEM_WIDTH,
//         transform: [{ scale }],
//         opacity,
//         alignItems: 'center',
//         overflow: 'hidden'  
//       }}
//       >

//         <Pressable onPress={() => console.log('Stage selected:', item.title)}>
          
//           <UserTalentEntry  key={index} userTalent={item} user={user} userProfile={user} activity={true}/>
//         </Pressable>
     
//       </Animated.View>
//     );
//   };




  
//   return (
//     <>
//     <StageCategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />

//     {data ? (
       
//         <Animated.FlatList
//         data={data}
//         keyExtractor={(item) => item._id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={ITEM_WIDTH + 20}  
//         decelerationRate="fast"
//         bounces={false}
//         contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//         renderItem={renderItem}
//       />
//    ):(
//            <View 
//             className = "w-[100%] h-[100%] bg-black justify-center items-center">
//                <ActivityIndicator size="large" color="white"  />
//            </View>  
//    )}
//    </>
   
//   )
// }

// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, ActivityIndicator, Dimensions, Animated, Pressable } from "react-native";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import { generateChallengeTalentGuinessData } from "../../apiCalls";
// import StageCategorySelector from "../custom/StageCategorySelector";
// import UserTalentEntry from "../talent/UserTalentEntry";

// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = width * 0.6; // width of center card
// const ITEM_MARGIN = 10; // horizontal margin
// const ITEM_SPACING = (width - ITEM_WIDTH) / 2; // for centering first & last item

// export default function HomePage() {
//   const { user } = useGlobalContext();
//   const [data, setData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("hot");

//   const scrollX = useRef(new Animated.Value(0)).current;

//   // Fetch stage data
//   useEffect(() => {
//     generateChallengeTalentGuinessData(user._id, setData);
//   }, []);

//   if (!data || !data.length) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center">
//         <ActivityIndicator size="large" color="white" />
//       </View>
//     );
//   }

//   // Filter stages by category
//   const filteredData = data.filter(item => item.category === selectedCategory);

//   // Render each carousel item
//   const renderItem = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * (ITEM_WIDTH + ITEM_MARGIN * 2),
//       index * (ITEM_WIDTH + ITEM_MARGIN * 2),
//       (index + 1) * (ITEM_WIDTH + ITEM_MARGIN * 2)
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.8, 1, 0.8],
//       extrapolate: "clamp"
//     });

//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.7, 1, 0.7],
//       extrapolate: "clamp"
//     });

//     return (
//       <Animated.View
//         style={{
//           width: ITEM_WIDTH,
//           marginHorizontal: ITEM_MARGIN,
//           transform: [{ scale }],
//           opacity,
//           alignItems: "center",
//           overflow: "hidden"
//         }}
//       >
//         <Pressable onPress={() => console.log("Stage selected:", item.title)}>
//           <UserTalentEntry userTalent={item} user={user} userProfile={user} activity={true} />
//         </Pressable>
//       </Animated.View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-black">
//       {/* Category buttons */}
//       <StageCategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />

//       {/* Horizontal stage carousel */}
//       <Animated.FlatList
//         data={data}
//         keyExtractor={(item) => item._id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={ITEM_WIDTH + ITEM_MARGIN * 2}
//         decelerationRate="fast"
//         bounces={false}
//         contentContainerStyle={{ paddingHorizontal: ITEM_SPACING, alignItems: "center" }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  Dimensions,
  Animated,
  Pressable
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useGlobalContext } from "../../context/GlobalProvider";
import { generateChallengeTalentGuinessData } from "../../apiCalls";

import StageCategorySelector from "../custom/StageCategorySelector";
import UserTalentEntry from "../talent/UserTalentEntry";
import HotStageSelector from "../custom/HotStageSelector";
import StageSelector from "../custom/StageSelector";

const { width, height } = Dimensions.get("window");

/* ---------- Carousel Layout ---------- */

const ITEM_WIDTH = width * 0.88;
const ITEM_MARGIN = 8;

const SNAP_INTERVAL = ITEM_WIDTH + ITEM_MARGIN * 2;

const SIDE_SPACING = (width - ITEM_WIDTH) / 2 - ITEM_MARGIN;

/* ---------- Component ---------- */

export default function HomePage() {

  const { user } = useGlobalContext();

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("hot");

  const scrollX = useRef(new Animated.Value(0)).current;

  /* ---------- Fetch Data ---------- */

  useEffect(() => {

    if (user?._id) {
      generateChallengeTalentGuinessData(user._id, setData);
    }

  }, [user]);

  /* ---------- Loading ---------- */

  if (!data || data.length === 0) {

    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </View>
    );

  }

  /* ---------- Filter Stage Categories ---------- */

  const filteredData = data.filter(
    stage => stage.category === selectedCategory
  );

  /* ---------- Carousel Card ---------- */

  const renderItem = ({ item, index }) => {

    const inputRange = [
      (index - 1) * SNAP_INTERVAL,
      index * SNAP_INTERVAL,
      (index + 1) * SNAP_INTERVAL
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.88, 1.05, 0.88],
      extrapolate: "clamp"
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp"
    });

    return (

      <Animated.View
        style={{
          width: ITEM_WIDTH,
          marginHorizontal: ITEM_MARGIN,
          transform: [{ scale }],
          opacity,
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <Pressable
          style={{
            width: ITEM_WIDTH,
            borderRadius: 20,
            overflow: "hidden"
          }}
          onPress={() =>
            console.log("Stage Selected:", item.title)
          }
        >

          <UserTalentEntry
            userTalent={item}
            user={user}
            userProfile={user}
            activity={true}
            width={ITEM_WIDTH}
          />

        </Pressable>

      </Animated.View>

    );

  };

  /* ---------- UI ---------- */

  return (

    <View className="flex-1 bg-black">

     
{/* 
      <StageCategorySelector
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      /> */}
 

      {/* {selectedCategory == "hot" &&  (
               <HotStageSelector data={data  && data} />
      )} */}
      {/* {selectedCategory == "explore" &&  ( */}
               <StageSelector  user={user}/>
      {/* )} */}

      {/* <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: SIDE_SPACING
          }}

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}

          scrollEventThrottle={16}

        />

  

        <LinearGradient
        pointerEvents="none"
        colors={["rgba(255, 80, 80, 0.5)", "transparent"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0 ,
          right: 0,
          height: width/8
        }}
      />

     

        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(255, 80, 80, 0.5)"]}
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            height: width/8

          }}
        />
        <LinearGradient
            pointerEvents="none"
            colors={["rgba(255, 80, 80, 0.5)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 30,
              width: width/10

            }}
          />
          <LinearGradient
            pointerEvents="none"
            colors={["transparent", "rgba(255, 80, 80, 0.5)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 30,
              width: width/10
            }}
          />

      </View> */}

    </View>

  );

}