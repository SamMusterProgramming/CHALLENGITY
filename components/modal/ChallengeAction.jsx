// import React, { useEffect, useRef, useState } from 'react';
// import {  Animated,  Platform, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
// import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';

// import * as NavigationBar from 'expo-navigation-bar';
// import Modal from 'react-native-modal';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { MotiView } from 'moti';





// export default function ChallengeAction({text,action,isModalVisible, setIsModalVisible, setParticipationType,
//     removeChallenge, addFavourite,removeFromFavourite, handleTalentParticipation , handleTalentResignition,
//     joinChallenge ,resignChallenge , handleVotePost , handleFlagPost, handleQueue}) {
    
//     const { wid, height } = useWindowDimensions();
//     const [isLoaded , setIsLoaded] = useState(false)
//     const [textArray , setTextArray] = useState(null)
//     const insets = useSafeAreaInsets();


//     const slideAnim = useRef(new Animated.Value(height)).current;

    

//     useEffect(() => {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 10,
//         useNativeDriver: true,
//       }).start();
     
//     }, [isModalVisible]);

//     useEffect(() => {
     
//       setIsLoaded(true)
//      }, []);

//     const closeModal = async() => {
//       Animated.timing(slideAnim, {
//         toValue: height,
//         duration: 10,
//         useNativeDriver: true,
//       }).start(() => setIsModalVisible(false));

//     };
  
//     return (
//        <>
//          {isLoaded && (
//           <View
//            style={styles.container}
//             className=" flex-1  flex-col justify-center items-center "  >
            
//                 <Modal 
//                   style={{margin:0}}
//                   useNativeDriverForBackdrop={true}
//                   backdropOpacity={0.9}
//                   onBackdropPress={()=>{setIsModalVisible(false)}}
//                   visible={isModalVisible}  animationType="slide" onRequestClose={closeModal}>
                   
                
//                     <Animated.View 
//                       className="m-0 "
//                       style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>

//                       <View
//                               style={{    
//                                 backgroundColor: 'rgba(173, 216, 230, 0.5)'                       
//                                }}
//                               className=" w-[95%] flex-col px-4 py-4 mt-10 justify-start rounded-t-lg g-[#f8fbfb] items-center">
//                               { action !== "help" ? (
                              
//                                 <View
//                                 style={{    
//                                   backgroundColor: 'rgba(0,0,0, 0.7)'                       
//                                 }}
//                                 className=" w- [70%]  flex-col px-4 py-4 mt- 10 justify-start rounded-lg g-[#f8fbfb] items-center">
//                                   <Text  style={styles.modalText}
//                                   className="font-bold text-center text-lg" >
                                 
//                                     {text}
//                                   </Text>
//                                 </View>
//                               ) : (
//                                 <ScrollView
//                                 className="w- full max-h -[45%]  bg-[#1a1515] border-2 borde-white ">
//                                   <View
//                                     className="mb-6 w-full flex-col gap-2 items-center text-center"
//                                    >
//                                     <View className="w-[98%] g-white/10 p-5 rounded-xl  text-start flex-col justify-start items-start order-white/20 mb-2">
//                                       <Text
//                                        className="text-md font-semibold text-start text-white mb-1">🔥 Rounds 1 to 3: Elimination Phase</Text> 
//                                       <Text
//                                        style={{fontSize : height/77}}
//                                        className="text-sm mb-4  text-gray-200">
//                                          A total of <Text className="text-yellow-400  font-bold">22 contestants</Text> compete.
//                                          At the end of each round, the 8 lowest-ranked contestants are eliminated.
//                                          They are immediately replaced by 8 new contestants from the queue list.
//                                          This keeps the competition fresh and gives everyone a shot!
//                                       </Text>
                            
//                                       <Text className="text-md font-semibold text-white mb-1">🧨 Round 4: 1/8 Final</Text>
//                                       <Text 
//                                       style={{fontSize : height/75}}
//                                       className="text-sm mb-4 text-gray-200">
//                                        Only the <Text className="text-yellow-400 font-bold">top 16 contestantss</Text> remain.
//                                        The battle intensifies as they fight for a spot in the quarter-finals.
//                                        No new contestants can join beyond this point — only the best remain.
//                                       </Text>
                            
//                                       <Text className="text-md text-start font-semibold text-white mb-1">⚔️ Round 5: Quarter-Final</Text>
//                                       <Text 
//                                       style={{fontSize : height/75}}
//                                       className="text-sm mb-4 text-gray-200">
//                                       <Text className="text-yellow-400 font-bold">only 8 contestants</Text> advance.
//                                            This round is all about precision, passion, and performance.
//                                       </Text>
                            
//                                       <Text className="text-md font-semibold text-white mb-1">🔥 Round 6: Semi-Final & Final</Text>
//                                       <Text 
//                                         style={{fontSize : height/75}}
//                                         className="text-sm text-cen text-gray-200">
//                                         <Text className="text-yellow-400 font-bold">4 semi-finalists</Text>  compete head-to-head.
//                                         <Text className="text-yellow-400 font-bold">2 finalists </Text>
//                                         emerge to face off in the ultimate showdown.
//                                         One will be crowned the Got Talent Champion 🏆!
//                                         </Text>
//                                       </View>
                                    
//                                   </View>
//                                 </ScrollView>
//                               )}   
                               
//                       </View>
                       
//                       <View
//                        style={{    
//                         backgroundColor: 'rgba(173, 216, 230, 0.5)'                       
//                        }}
//                       className=" w-[95%]  flex-row rounded-b-lg justify-center px-4 pb-4 b g-white  gap-10 items-center">
        
//                                <TouchableOpacity 
//                                   onPress={()=>{ 
//                                     setIsModalVisible(false)
//                                    }} 
//                                   className="w- [70px] p-3 h- [70px] bg-white rounded-lg flex-row justify-center items-center">
//                                     <Text
//                                     className="text-black font-black"
//                                      style={{fontSize:12}}
//                                      >
//                                        { action!=="OK" && action !== "help" ?"Cancel" :"Ok" }
//                                      </Text>
//                                </TouchableOpacity>
//                                {action !=="OK" && action !== "help" &&  (
//                                <TouchableOpacity 
//                                   onPress={
//                                   action == "JN"?joinChallenge:action =="DT"?removeChallenge:
//                                   action =="RS"?resignChallenge:action =="FA"? addFavourite : action == "RF" ? removeFromFavourite :
//                                   action == "NP"? handleTalentParticipation: action == "P" ? handleTalentResignition :
//                                   action =="VT"? handleVotePost: action=="FL"? handleFlagPost: action= "Q" ?handleQueue: ()=> {}}
//                                   className="w-[70px] py-4 h- [70px] ml-auto bg-blue-700 rounded-lg flex-row justify-center items-center">
//                                     <Text
//                                     className="text-white font-black"
//                                      style={{fontSize:10}}
//                                      >Confirm</Text>
//                                </TouchableOpacity>
//                                       )}  
                                
//                       </View>
                    
//                     </Animated.View>
//                 </Modal>
//                 <StatusBar    backgroundColor={"transparent"}/>
//             </View>

//          )}
//             </>
    
//     );
//   };
  
//   const styles = StyleSheet.create({
   
//     container: {
//       flex: 1,
//       display : "flex" ,
//       justifyContent: 'center' ,
//       alignItems: 'center' ,
//     },

//     button: {
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//     },

//     buttonText: {
//       fontSize: 16,
//     },

//     modalOverlay: {
//       flex: 1,
 
//     },

//     modalContainer: {
//       flex : 1,
//       backgroundColor: 'rgba(0, 0, 0 , 0.7)',
//       padding: 25,
//       borderTopLeftRadius: 10,
//       borderRadius: 10,
//       justifyContent:"center",
//       alignItems: 'center',
//       width:"100%",
//       margin:0
//     },

//     modalText: {
//       fontSize: 11,
//       color:"white"
//     },

//     closeButton: {
//       backgroundColor: 'tomato',
//       padding: 5,
//       borderRadius: 5,
//     },

//     closeButtonText: {
//       color: 'white',
//       fontSize: 10,
//     },

//   });
  
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Modal from "react-native-modal";

export default function ChallengeAction({
  text,
  action,
  isModalVisible,
  setIsModalVisible,
  joinChallenge,
  removeChallenge,
  addFavourite,
  removeFromFavourite,
  handleTalentParticipation,
  handleTalentResignition,
  handleVotePost,
  handleFlagPost,
  handleQueue
}) {

  const closeModal = () => setIsModalVisible(false);

  const confirmAction = () => {
    const actions = {
      JN: joinChallenge,
      DT: removeChallenge,
      RS: handleTalentResignition,
      FA: addFavourite,
      RF: removeFromFavourite,
      NP: handleTalentParticipation,
      P: handleTalentResignition,
      VT: handleVotePost,
      FL: handleFlagPost,
      Q: handleQueue
    };

    actions[action]?.();
    closeModal();
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.85}
        useNativeDriver
        hideModalContentWhileAnimating
        statusBarTranslucent
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
      >

        <View className="w-[88%] bg-[#111111] border border-yellow-400/30 rounded-2xl p-4">

          {/* CONTENT */}
          {action !== "help" ? (
            <View className="bg-black/60 rounded-xl px-4 py-3">
              <Text className="text-gray-200 text-[13px] text-center">
                {text}
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="max-h-[300px]"
            >
              <View className="gap-3">

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    🔥 Rounds 1 – 3
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    <Text className="text-yellow-400 font-semibold">22 contestants</Text> compete.
                    The <Text className="text-yellow-400 font-semibold">8 lowest ranked</Text> are eliminated each round.
                  </Text>
                </View>

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    🧨 Round 4
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    The <Text className="text-yellow-400 font-semibold">top 16</Text> advance to knockout stage.
                  </Text>
                </View>

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    ⚔️ Quarter Final
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    Only <Text className="text-yellow-400 font-semibold">8 contestants</Text> remain.
                  </Text>
                </View>

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    🏆 Final
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    <Text className="text-yellow-400 font-semibold">4 semi finalists</Text> compete.
                    The final <Text className="text-yellow-400 font-semibold">2 battle for the crown</Text>.
                  </Text>
                </View>

              </View>
            </ScrollView>
          )}

          {/* BUTTONS */}
          <View className="flex-row gap-3 mt-4">

            <TouchableOpacity
              onPress={closeModal}
              className="flex-1 bg-zinc-800 rounded-xl py-2 items-center"
            >
              <Text className="text-yellow-400 text-[12px] font-semibold">
                {action !== "OK" && action !== "help" ? "Cancel" : "Ok"}
              </Text>
            </TouchableOpacity>

            {action !== "OK" && action !== "help" && (
              <TouchableOpacity
                onPress={confirmAction}
                className="flex-1 bg-yellow-400 rounded-xl py-2 items-center"
              >
                <Text className="text-black text-[12px] font-semibold">
                  Confirm
                </Text>
              </TouchableOpacity>
            )}

          </View>

        </View>

      </Modal>

      <StatusBar translucent backgroundColor="transparent" />
    </>
  );
}