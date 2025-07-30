
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { MotiView, ScrollView } from 'moti';
import ShuffleLetters from '../custom/ShuffleLetters';
import BlinkingHeader from '../custom/BlinkingHeader';
import { icons } from '../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';



export default function TalentRoomIntroduction({ talentRoom,edition,selectedIcon , selectedTalent ,region, regionIcon ,setStart}) {
 
  const {width,height} = useWindowDimensions()
  const insets = useSafeAreaInsets();
  const [selectedEdition, setSelectedEdition] = useState(null)
  const [previousEditions , setPreviousEditions] = useState(talentRoom.editions.filter(e => e.status == "closed").slice(0,6))
  const [currentEdition, setCurrentEdition] = useState(talentRoom.editions.find(e => e.status =="open"))
 
  // const handleDisplayEdition =  (edition.id) => {
  //     router.replace({ pathname: '/DisplayEdition',params: { 
  //         talentRoom_id : talentRoom._id,
  //         edition_id : edition_id ,
  //       } }) 
  // }

  return (
  <View
  style={{
    // height:height ,
    flex:1,
    paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
    paddingBottom : insets.bottom
  }}
   className=" absolute top- w-full h-full py-2  g-white flex-col justify-between gap- g-white items-center px-2">
    <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, type: 'timing', duration: 600 }}
        className="mb- gap-4" >
          {/* <Text
            style={{fontSize : height/45}}
            className="text-white text-4xl font-bold text-center">
            🌟 
          </Text> */}
          <Text 
            style={{fontSize : height/65}}
            className="text-white text-4xl font-bold text-center">
              Welcome to Got Talent Contest Room
          </Text>
    </MotiView>

    <MotiView
      from={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 500, type: 'timing', duration: 600 }}
      className="flex-row  justify-between border-b-2 border-white items-center g-white gap-8 mb-0">
            <View
              className="flex-col gap-2 items-center text-center"
            >
              <Image 
                                  className="w-14 h-14 opacity-100"
                                  source={selectedIcon}/>
              <ShuffleLetters text={selectedTalent} textSize={14} />
            
            </View>

            <View
           
              className="-10 flex-col gap-2 items-center text-center"
            >
              <Image 
                                  className="w-14 h-14 opacity-100"
                                  source={regionIcon}/>
              <ShuffleLetters text={region} textSize={14}/>
            </View>
    </MotiView>

    {!selectedEdition && (
      <>
              <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1000, type: 'timing', duration: 800 }}
              className="flex- 1 w-full h-[50%] mt-auto mb-10 px-2  flex-col justify-start items-center gap-">
                     <Text
                      style={{fontSize : height/75}}
                      className="text-gray-300 font-black text-center text-lg">
                          Explore previous editions
                     </Text>
                     <View
                          className="flex-1 rounded-xl bg- [#043456] py-4">
                            <ScrollView
                              className="mt- max-w-[100%] max-h-[100%] p- border- border-  bg -[#043456]">
                                <View
                                  className="min-w-[100%] min-h-[100%] gap-2 flex-row p- py- flex-wrap justify-center items-center g-white">
                                      {previousEditions.map((edition,index) =>{
                                        return (
                                                <TouchableOpacity
                                                  key={index}
                                                  onPress={() => {
                                                    router.navigate({ pathname: '/DisplayEdition',params: { 
                                                        talentRoom_id : talentRoom._id,
                                                        edition_id : edition._id ,
                                                      } }) 
                                                }}
                                                  className="w-[48%]  h-[31%] gap-2 py-4 6  flex-col justify-start bg-[#2c0649] items-center rounded-xl borde-2 border- [#ffffff]">
                                                      <View
                                                      className="w-[100%] flex-col justify-start items-center gap-2">
                                                              <View
                                                                  className="w-[100%] px-2 flex-row justify-between items-start">
                                                                    <Image
                                                                          source={selectedIcon}
                                                                          className="w-7 h-7 rounded-full"
                                                                          resizeMode='cover' />
                                                                    <View
                                                                    className="flex-col justify-start gap-2 items-center">
                                                                          <Text
                                                                          style ={{fontSize:10}}
                                                                          className="text-yellow-400 font-bold text-xs">
                                                                                Winner
                                                                          </Text>
                                                                          <Image
                                                                                source={{uri:edition.winner.profile_img}}
                                                                                className="w-8 h-8 rounded-full"
                                                                                resizeMode='cover' />
                                                                    </View>
                                                                   
                                                                    <Image
                                                                          source={regionIcon}
                                                                          className="w-7 h-7 rounded-full"
                                                                          resizeMode='cover' />
                                                              </View>
                                                              <View
                                                              className=" w-[100%] ml-au gap-1 flex-col justify-start items-center">
                                                                      {/* <Text
                                                                      style ={{fontSize:8}}
                                                                      className="text-yellow-400 font-bold text-xs">
                                                                            Winner
                                                                      </Text> */}
                                                                      <Text
                                                                      style ={{fontSize:8}}
                                                                      className="text-white font-black text-xs">
                                                                          {edition.winner.name.slice(0,10)}
                                                                      </Text>
                                                              </View>
                                                      </View>
                                                      <View
                                                      className="absolute bottom-0 left-0 p-2 w -[100%] bg-black">
                                                            <Text
                                                                style ={{fontSize:9}}
                                                                className="text-white text-end font-bold text-xs">
                                                                          {edition.createdAt.slice(0,10)}
                                                            </Text>
                                                      </View>

                                                </TouchableOpacity>)
                                      })}
                                </View>

                            </ScrollView>
                          </View>

                     {/* <View
                        className="min-w-[100%] min-h-[15%]  flex- 1 flex-col justify-start items-center g-white ">
                          <TouchableOpacity
                           onPress={() => {setSelectedEdition(currentEdition)}}
                           class=" min-w-[50%] min-h-[100%] flex-col justify-center items-center bg-white" >
                            <Text
                             style ={{fontSize:9}}
                             className="text-white  font-bold text-xs">
                                 Current Edition
                            </Text>
                          </TouchableOpacity>
                     </View> */}

              </MotiView>

              <View
                  className="w-[100%] h-[18%] mt-aut mb-8  gap-4 flex- 1 flex-col justify-between items-center g-white ">
                          <Text
                             style ={{fontSize:12}}
                             className="text-white  font-black text-xs">
                                 Current Edition
                          </Text>
                          <TouchableOpacity
                           onPress={() => {setSelectedEdition(currentEdition)}}
                           className=" w-[50%] flex- 1 py-4 flex-col justify-start items-center px-2 rounded-xl bg-[#1f252a]" >
                               <View
                               className="w-[100%] min- h- [50%] flex-row justify-between items-start">
                                    <Image
                                        source={selectedIcon}
                                        className="w-8 h-8 rounded-full"
                                        resizeMode='cover' />
                                    <View
                                    className="w-[40%] h- [100%] flex-col justify-between items-center">
                                             <ShuffleLetters text={selectedTalent + ` Talent`} textSize={11}  />
                                             <Text
                                                style ={{fontSize:10}}
                                                className="text-white font-bold text-xs">
                                                  {talentRoom.contestants.length} 
                                            </Text>
                                    </View>
                                    <Image
                                        source={regionIcon}
                                        className="w-8 h-8 rounded-full"
                                        resizeMode='cover' />
                               </View>

                               <View
                               className="w-[100%] min- h- [50%] flex-row justify-between items-end">
                                   
                                    <View
                                    className="w-[100%] h- [100%] py-2 flex-col justify-center gap-2  items-center">
                                             {/* <ShuffleLetters text="Contestants" textSize={11}  /> */}
                                             <Text
                                                style ={{fontSize:10}}
                                                className="text-white font-bold text-xs">
                                                  Contestants
                                            </Text>
                                            <Text
                                                style ={{fontSize:10}}
                                                className="text-yellow-400 font-black text-xs">
                                                   {edition.title}
                                            </Text>
                                    </View>
                                   
                               </View>
                             
                          </TouchableOpacity>
              </View>

              <TouchableOpacity
              onPress={()=> router.back() }
              style={{top:insets.top}}
              className ="absolute top-2 left-4"
              >
                  <Image 
                          source={icons.back}
                          className ="w-7 h-7 "
                          resizeMode='cover'
                        />
              </TouchableOpacity>
        </>
    )}

  {selectedEdition && (
    <>
    <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1000, type: 'timing', duration: 800 }}
        className="mb- px-2">
        <Text
         style={{fontSize : height/75}}
        className="text-gray-300 text-center text-lg">
          Get ready to discover rising stars from around the world.
          Cheer them on, vote, and be part of the journey,  
          where talent battles unfold in 6 thrilling rounds!
        </Text>
        <Text
        style={{fontSize:13}}
          className="text-gray-300 font-black text-center mt-2 text-lg">
            Here's how the competition works:
        </Text>
    </MotiView>
  
    <ScrollView
    className="w-full max-h-[45%] bg-[#1a1515] border-2 borde-white ">
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1200, type: 'timing', duration: 600 }}
        className="mb-6 w-full flex-col gap-2 items-center text-center"
       >
        <View className="w-[98%] g-white/10 p-5 rounded-xl  text-start flex-col justify-start items-center order-white/20 mb-2">
          <Text className="text-md font-semibold text-start text-white mb-1">🔥 Rounds 1 to 3: Elimination Phase</Text> 
          <Text
           style={{fontSize : height/75}}
           className="text-sm mb-4  text-gray-200">
             A total of <Text className="text-yellow-400  font-bold">22 contestants</Text> compete.
             At the end of each round, the 8 lowest-ranked contestants are eliminated.
             They are immediately replaced by 8 new contestants from the queue list.
             This keeps the competition fresh and gives everyone a shot!
          </Text>

          <Text className="text-md font-semibold text-white mb-1">🧨 Round 4: 1/8 Final</Text>
          <Text 
          style={{fontSize : height/75}}
          className="text-sm mb-4 text-gray-200">
           Only the <Text className="text-yellow-400 font-bold">top 16 contestantss</Text> remain.
           The battle intensifies as they fight for a spot in the quarter-finals.
           No new contestants can join beyond this point — only the best remain.
          </Text>

          <Text className="text-md text-start font-semibold text-white mb-1">⚔️ Round 5: Quarter-Final</Text>
          <Text 
          style={{fontSize : height/75}}
          className="text-sm mb-4 text-gray-200">
          <Text className="text-yellow-400 font-bold">only 8 contestants</Text> advance.
               This round is all about precision, passion, and performance.
          </Text>

          <Text className="text-md font-semibold text-white mb-1">🔥 Round 6: Semi-Final & Final</Text>
          <Text 
            style={{fontSize : height/75}}
            className="text-sm text-cen text-gray-200">
            <Text className="text-yellow-400 font-bold">4 semi-finalists</Text>  compete head-to-head.
            <Text className="text-yellow-400 font-bold">2 finalists </Text>
            emerge to face off in the ultimate showdown.
            One will be crowned the Got Talent Champion 🏆!
            </Text>
          </View>
        
      </MotiView>
    </ScrollView>

      <MotiView
        from={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1800, type: 'spring' }}
        className="mb-6 -auto gap-10  flex-col justify-center items-center">
        <View className=" g-white/10 px-6  py-1 rounde-2xl border-b-2 border-white borde-white/20 ">
         <ShuffleLetters textSize={18} text = {edition.title} />
        </View>
        <TouchableOpacity
          className="bg-[#fff] px-6 py-3 rounded-lg"
          onPress={() => setStart(true)} >
          <Text className="text-gray text-sm font-semibold">
            Enter the Talent Room 🚪
          </Text>
        </TouchableOpacity>
      </MotiView>
     
     <TouchableOpacity
     style={{top:insets.top}}
     onPress={()=> {setSelectedEdition(null)}}
     className ="absolute top-2 left-4"
     >
         <Image 
                 source={icons.back}
                 className ="w-7 h-7 "
                 resizeMode='cover'
              />
     </TouchableOpacity>
     
   </>
  )}

  </View>
  );
}