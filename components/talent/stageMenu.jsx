// import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
// import React from 'react'
// import { MotiView } from 'moti'
// import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
// import { router } from 'expo-router'
// import { countries, stageIcons } from '../../utilities/TypeData'

// export default function StageMenu({height , width , setParticipationType , isFavourite , stage , setStage,
//                                    handleRefresh, talentRoom ,globalRefresh ,edition ,isRefreshing 
// }) {
//   return (
//     <MotiView
//     from={{ opacity: 0, translateY: 40 }}
//     animate={{ opacity: 1, translateY: 0 }}
//     transition={{ delay: 400, type: 'timing', duration: 600 }}
//     style = {{
//       height: height ,
//       width : width ,
//       bottom : 0
//     }}
//     className ="absolute py- 2 flex-col  bor der bo rder-t-white  justify-start p -1  items-center" >
//   <View

//      className ="w-[100%] py-1 h- [100%] px-1 bg-[rgba(5,5,5,0.5)] gap-2 rounded-lg flex-row justify-center items-center">
          
        
//           <TouchableOpacity
//                                   onPress={() =>
//                                     {
//                                     !isFavourite ? setParticipationType("addFavourite") : setParticipationType("removeFavourite")
//                                     }}
                              
//                                   className = " p-2 rounded-full  flex-col justify-center items-center ">
//                                           {isFavourite ?
//                                           (
//                                             <MaterialCommunityIcons name="heart" size={20} color = "red"  />
//                                           ) : 
//                                           (
//                                             <MaterialCommunityIcons name="heart-outline" size={20} color = "red"  />
//                                           )}
                                        
                                    
//           </TouchableOpacity>

//           <TouchableOpacity
//                                     onPress={() =>
//                                               {
//                                                     setParticipationType("help")
//                                                 }}
                                                              
//                                                                     className = " p-2 mr-auto  rounded-full  flex-col justify-center items-center ">
//                                                                       <View
//                                                                       className = "p -1  rounde d-full ">
//                                                                           <MaterialCommunityIcons name="help" size={20} color = "white"  />
                                                                          
//                                                                       </View>
//           </TouchableOpacity> 

//           <TouchableOpacity
//                                     onPress={()=> { 
//                                         !stage && setStage(!stage)
//                                         // setPerformanceIndex(0)
//                                       }
//                                     }
//                                     className ="w- [100%] h- [60%] p- 2 b g-[#7a2038] rounded- xl  g-white  flex-row justify-center items-center">
//                                     <View
//                                       style={{backgroundColor:stage ? "#871f30" : "#313536"}}
//                                       className =" px-4 bg-[#6f6b6c] min-w-[20%] rounded -t-md flex-row justify-center items-center">
//                                           <Text    
//                                                 style ={{
//                                                   fontSize: stage ? width/50 : width/55,
//                                                   color: stage ? "white":"gray"
//                                                 }}
//                                                 className="text-xl font-black  text-gray-300"> 
//                                                   Stage
//                                           </Text>
//                                     </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//                                     onPress={()=> {

//                                         stage && setStage(!stage)
//                                       }
//                                     }
//                                     className ="w- [100%] h- [60%] p- 2 b g-[#7a2038] rounded- xl  g-white  flex-row justify-center items-center">
//                                     <View
//                                       style={{backgroundColor:stage ? "#313536" : "#871f30"}}
//                                       className =" px-4 bg-[#d7b6be] rounded  flex-row justify-center items-center">
//                                           <Text    
//                                                 style ={{
//                                                    fontSize: !stage ? width/50 : width/55,
//                                                     color: !stage ? "white":"gray"
//                                                 }}
//                                                 className="text-xl font-black  text-white"> 
//                                                   Performance
//                                           </Text>
//                                     </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//                       onPress={handleRefresh}
                
//                       className="p-2 ml-auto  rounded-tr-full flex-row g-green-600 -rota te-45   justify-center items-center">
//                           {isRefreshing ?(
//                                 <ActivityIndicator size={20} color="red" />
//                           ):(
//                             <AntDesign name="reload" size={20} color="white" /> 
//                           )}
//           </TouchableOpacity>

//           <TouchableOpacity
//                           onPress={() => !globalRefresh && router.back()}
//                           className="  flex-row  p-2  justify-center items-center">
//                                      <AntDesign name="close" size={20} color="white" /> 
//           </TouchableOpacity>
          

//   </View>

//   <View
//       style={{ backgroundColor: 'rgba(0,0, 0 , 0.7)' }}
//       className ="w-[100%] h- [100%] py-2 flex-1 rounded-lg flex-col  justify-center items-center">
             

//              <View
//             //  style={{ backgroundColor: 'rgba(0,0, 0 , 0.5)' }}
//              className = "w-[100%] mt- auto p- 1 border- b- 2 bord er-blue-300 rounded-lg flex-col b g-[#0d123c] shad ow-white justify-start items-center  gap- 1">
                      
//                         <View
//                         className = "w-[100%] pb -2  flex-row  rounded-xl text-center   g-[#065e7c] shadow-black justify-center items-center gap-1">
//                                 <Text 
//                                   style ={{fontSize:9}}
//                                   className="text-xl  font-black   text-yellow-500"> 
//                                     {talentRoom.name} -
//                                 </Text> 
//                                 <Text 
//                                   style ={{fontSize:10}}
//                                   className="text-xl  font-black   text-white"> 
//                                     Stage
//                                 </Text> 
//                                 <Text 
//                                   style ={{fontSize:9}}
//                                   className="text-xl  font-black   text-yellow-500"> 
//                                     - {talentRoom.region} 
//                                 </Text> 
//                         </View>
//                         <View
//                         className = "w-[100%] pb-2  flex-row  rounded-xl text-center   g-[#065e7c] shadow-black justify-center items-center gap-1">
//                                 <Text 
//                                   style ={{fontSize:9}}
//                                   className="text-xl  font-black   text-orange-500"> 
//                                     {edition.title} 
//                                 </Text> 
            
//                         </View>
                  
//              </View>

//             <View
//             className = "flex-col absolute top-4 left-[20]    justify-center items-center gap-2">
//                   <View className=" items-center justify-center">
                      
//                       <Text 
//                     style={{  width: width/6 , fontSize : width/17}}
//                     className="text-white text-center font-extrabold tracking-widest">
//                           {stageIcons[talentRoom.name]}
//                       </Text>
//                       <Text 
//                     style={{ width: width/6 , fontSize : width/42}}
//                     className="text-white text-center font-bebas tracking-widest">
//                           {talentRoom.name}
//                       </Text>
//                     </View>
//             </View>
//             <View
//             className = "flex-col absolute  top-4 right-[20]    justify-center items-center gap-2">
//                  <View className=" items-center justify-center">
//                     <Text 
//                     style={{  width: width/6 , fontSize : width/17}}
//                     className="text-white text-center font-extrabold tracking-widest">
//                         {countries.find( c => c.code === talentRoom.region).flag}
//                     </Text>
//                     <Text   
//                     style={{ width: width/6 , fontSize : width/42}}
//                     className="text-white text-center font-bebas tracking-widest">
//                         {countries.find( c => c.code === talentRoom.region).name}
//                     </Text>
//                   </View>                
//             </View>
//   </View>
// </MotiView>
//   )
// }

import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { countries, stageIcons } from '../../utilities/TypeData'

export default function StageMenu({
  height,
  width,
  setParticipationType,
  isFavourite,
  stage,
  setStage,
  handleRefresh,
  talentRoom,
  globalRefresh,
  edition,
  isRefreshing,
  setNewChallenge
}) {

  const region = countries.find(
    c => c.code === talentRoom.region
  )

  /* ---------------- RESPONSIVE SIZES ---------------- */

  const ICON_BOX = height * 0.25
  const ICON_SIZE = height * 0.15

  const TOGGLE_HEIGHT = height * 0.25

  const TITLE_SIZE = height * 0.11
  const SUB_SIZE = height * 0.075

  const LABEL_SIZE = height * 0.08
  const EMOJI_SIZE = height * 0.17

  return (

    <MotiView
      from={{
        opacity: 0,
        translateY: height * 0.3
      }}
      animate={{
        opacity: 1,
        translateY: 0
      }}
      transition={{
        type: "timing",
        duration: 450
      }}
      style={{
        height,
        width,
        position: "absolute",
        bottom: 0,
      }}
    >

      {/* MAIN CONTAINER */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(8,8,12,0.72)",
          borderTopWidth: 1,
          borderColor: "rgba(255,255,255,0.06)",
          paddingHorizontal: width * 0.03,
          paddingTop: height * 0.05,
          paddingBottom: height * 0.04,
        }}
        className="rounded-t-[28px] justify-between"
      >

        {/* ================= TOP ROW ================= */}

        <View className="flex-row items-center justify-between">

          {/* LEFT ACTIONS */}
          <View className="flex-row items-center gap-2">

            <TouchableOpacity
              onPress={() =>
                !isFavourite
                  ? setParticipationType("addFavourite")
                  : setParticipationType("removeFavourite")
              }
              style={{
                width: ICON_BOX,
                height: ICON_BOX,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              className="items-center justify-center"
            >
              <MaterialCommunityIcons
                name={
                  isFavourite
                    ? "heart"
                    : "heart-outline"
                }
                size={ICON_SIZE}
                color={
                  isFavourite
                    ? "#ff4d4d"
                    : "#a1a1aa"
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setParticipationType("help")
              }
              style={{
                width: ICON_BOX,
                height: ICON_BOX,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              className="items-center justify-center"
            >
              <MaterialCommunityIcons
                name="help"
                size={ICON_SIZE}
                color="#d4d4d8"
              />
            </TouchableOpacity>

          </View>

          {/* TOGGLE */}
          <View
            style={{
              height: TOGGLE_HEIGHT,
              backgroundColor:
                "rgba(255,255,255,0.05)",
              borderRadius: 999,
              padding: 3,
              width: width * 0.42,
            }}
            className="flex-row items-center"
          >

            {/* STAGE */}
            <TouchableOpacity
              onPress={() => {
                !stage && setStage(true)
                setNewChallenge(false)
              }}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 999,
                backgroundColor:
                  stage
                    ? "#D4AF37"
                    : "transparent",
              }}
              className="items-center justify-center"
            >
              <Text
                style={{
                  fontSize: LABEL_SIZE,
                  color: stage
                    ? "#000"
                    : "#9ca3af",
                }}
                className="font-bebas tracking-widest"
              >
                Stage
              </Text>
            </TouchableOpacity>

            {/* PERFORMANCE */}
            <TouchableOpacity
              onPress={() => {
                stage && setStage(false)
              }}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 999,
                backgroundColor:
                  !stage
                    ? "#D4AF37"
                    : "transparent",
              }}
              className="items-center justify-center"
            >
              <Text
                style={{
                  fontSize: LABEL_SIZE,
                  color: !stage
                    ? "#000"
                    : "#9ca3af",
                }}
                className="font-bebas tracking-widest"
              >
                Perform
              </Text>
            </TouchableOpacity>

          </View>

          {/* RIGHT ACTIONS */}
          <View className="flex-row items-center gap-2">

            <TouchableOpacity
              onPress={handleRefresh}
              style={{
                width: ICON_BOX,
                height: ICON_BOX,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              className="items-center justify-center"
            >
              {isRefreshing ? (
                <ActivityIndicator
                  size="small"
                  color="#D4AF37"
                />
              ) : (
                <AntDesign
                  name="reload1"
                  size={ICON_SIZE}
                  color="#d4d4d8"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                !globalRefresh && router.back()
              }
              style={{
                width: ICON_BOX,
                height: ICON_BOX,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              className="items-center justify-center"
            >
              <AntDesign
                name="close"
                size={ICON_SIZE}
                color="#d4d4d8"
              />
            </TouchableOpacity>

          </View>

        </View>

        {/* ================= INFO ROW ================= */}

        <View
          style={{
            marginTop: height * 0.04,
            paddingHorizontal: width * 0.02,
          }}
          className="flex-row flex-1 items-center justify-between"
        >

          {/* STAGE */}
          <View className="items-center w-[25%] justify-center">

            <Text
              style={{
                fontSize: EMOJI_SIZE
              }}
            >
              {stageIcons[talentRoom.name]}
            </Text>

            <Text
              style={{
                fontSize: LABEL_SIZE,
                marginTop: 2,
              }}
              className="text-gray-200 font-bebas tracking-widest"
            >
              {talentRoom.name}
            </Text>

          </View>

          {/* CENTER INFO */}
          <View className="items-center w-[50%] justify-center">

            <Text
              style={{
                fontSize: TITLE_SIZE,
              }}
              className="text-white font-bebas tracking-wider"
            >
              {talentRoom.name} STAGE
            </Text>

            <Text
              style={{
                fontSize: SUB_SIZE,
                marginTop: 1,
              }}
              className="text-yellow-500 font-semibold"
            >
              {edition.title}
            </Text>

          </View>

          {/* REGION */}
          <View className="items-center w-[25%] justify-center">

            <Text
              style={{
                fontSize: EMOJI_SIZE
              }}
            >
              {region?.flag}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: LABEL_SIZE,
                marginTop: 2,
                width:"100%"
              }}
              className="text-gray-200 font-bebas text-center tracking-widest"
            >
              {region?.name}
            </Text>

          </View>

        </View>

      </View>

    </MotiView>
  )
}