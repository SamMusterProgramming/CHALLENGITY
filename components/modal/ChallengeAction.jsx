import React, { useEffect, useRef, useState } from 'react';
import {  Animated,  Platform, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import Modal from 'react-native-modal';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';





export default function ChallengeAction({text,action,isModalVisible, setIsModalVisible, setParticipationType,
    removeChallenge, addFavourite,removeFromFavourite, handleTalentParticipation , handleTalentResignition,
    joinChallenge ,resignChallenge , handleVotePost , handleFlagPost, handleQueue}) {
    
    const { wid, height } = useWindowDimensions();
    const [isLoaded , setIsLoaded] = useState(false)
    const [textArray , setTextArray] = useState(null)
    const insets = useSafeAreaInsets();


    const slideAnim = useRef(new Animated.Value(height)).current;

    
    // useEffect(() => {
    //     let index = 0
    //     let textData =[]
    //     while(index * 35 <= text.length) {
    //         const s = text.slice(index * 35 , (index + 1) * 35 )
    //         textData.push(s)
    //         index = index + 1
    //     }
    //     setTextArray({textData:textData})
    //   }, []);

    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
      // const showModal = async () => {
      //   await NavigationBar.setVisibilityAsync("hidden");
      //   await NavigationBar.setPositionAsync("absolute");
      //   await NavigationBar.setBackgroundColorAsync("transparent");
      //   await NavigationBar.setVisibilityAsync('sticky-immersive'); 
      // };
      // showModal()
    }, [isModalVisible]);

    useEffect(() => {
      // if(Platform.OS == "android"){
      // NavigationBar.setPositionAsync("absolute");
      // NavigationBar.setVisibilityAsync('sticky-immersive');
      // }
      setIsLoaded(true)
     }, []);

    const closeModal = async() => {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 10,
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));

    };
  
    return (
       <>
         {isLoaded && (
          <View
           style={styles.container}
          //  style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top  }}
            className=" flex-1  flex-col justify-center items-center "  >
            
                <Modal 
                  style={{margin:0}}
                  useNativeDriverForBackdrop={true}
                  // transparent = {false}
                  backdropOpacity={0.9}
                  onBackdropPress={()=>{setIsModalVisible(false)}}
                  visible={isModalVisible}  animationType="slide" onRequestClose={closeModal}>
                   
                  {/* <View 
                    style={styles.modalOverlay} 
                    > */}
                    <Animated.View 
                      className="m-0 "
                      style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>

                      <View
                              style={{    
                                backgroundColor: 'rgba(173, 216, 230, 0.5)'                       
                               }}
                              className=" w-[95%] flex-col px-4 py-4 mt-10 justify-start rounded-t-lg g-[#f8fbfb] items-center">
                              { action !== "help" ? (
                              
                                <View
                                style={{    
                                  backgroundColor: 'rgba(0,0,0, 0.7)'                       
                                }}
                                className=" w- [70%]  flex-col px-4 py-4 mt- 10 justify-start rounded-lg g-[#f8fbfb] items-center">
                                  <Text  style={styles.modalText}
                                  className="font-bold text-center text-lg" >
                                 
                                    {text}
                                  </Text>
                                </View>
                              ) : (
                                <ScrollView
                                className="w- full max-h -[45%]  bg-[#1a1515] border-2 borde-white ">
                                  <View
                                    className="mb-6 w-full flex-col gap-2 items-center text-center"
                                   >
                                    <View className="w-[98%] g-white/10 p-5 rounded-xl  text-start flex-col justify-start items-start order-white/20 mb-2">
                                      <Text
                                      //  style={{fontSize:12}}
                                       className="text-md font-semibold text-start text-white mb-1">🔥 Rounds 1 to 3: Elimination Phase</Text> 
                                      <Text
                                       style={{fontSize : height/77}}
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
                                    
                                  </View>
                                </ScrollView>
                              )}   
                               
                      </View>
                       
                      <View
                       style={{    
                        backgroundColor: 'rgba(173, 216, 230, 0.5)'                       
                       }}
                      className=" w-[95%]  flex-row rounded-b-lg justify-center px-4 pb-4 b g-white  gap-10 items-center">
        
                               <TouchableOpacity 
                                  onPress={()=>{ 
                                    // setParticipationType(null)
                                    setIsModalVisible(false)
                                   }} 
                                  className="w- [70px] p-3 h- [70px] bg-white rounded-lg flex-row justify-center items-center">
                                    <Text
                                    className="text-black font-black"
                                     style={{fontSize:12}}
                                     >
                                       { action!=="OK" && action !== "help" ?"Cancel" :"Ok" }
                                     </Text>
                               </TouchableOpacity>
                               {action !=="OK" && action !== "help" &&  (
                               <TouchableOpacity 
                                  onPress={
                                  action == "JN"?joinChallenge:action =="DT"?removeChallenge:
                                  action =="RS"?resignChallenge:action =="FA"? addFavourite : action == "RF" ? removeFromFavourite :
                                  action == "NP"? handleTalentParticipation: action == "P" ? handleTalentResignition :
                                  action =="VT"? handleVotePost: action=="FL"? handleFlagPost: action= "Q" ?handleQueue: ()=> {}}
                                  className="w-[70px] py-4 h- [70px] ml-auto bg-blue-700 rounded-lg flex-row justify-center items-center">
                                    <Text
                                    className="text-white font-black"
                                     style={{fontSize:10}}
                                     >Confirm</Text>
                               </TouchableOpacity>
                                      )}  
                                
                      </View>
                    
                    </Animated.View>
                  {/* </View> */}
                </Modal>
                <StatusBar    backgroundColor={"transparent"}/>
            </View>

         )}
            </>
    
    );
  };
  
  const styles = StyleSheet.create({
   
    container: {
      flex: 1,
      display : "flex" ,
      // backgroundColor : 'rgb(0 , 0 , 0 )' ,
      justifyContent: 'center' ,
      alignItems: 'center' ,
    },

    button: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
    },

    buttonText: {
      fontSize: 16,
    },

    modalOverlay: {
      flex: 1,
 
    },

    modalContainer: {
      flex : 1,
      backgroundColor: 'rgba(0, 0, 0 , 0.7)',
      padding: 25,
      borderTopLeftRadius: 10,
      borderRadius: 10,
      justifyContent:"center",
      alignItems: 'center',
      width:"100%",
      margin:0
    },

    modalText: {
      fontSize: 11,
      color:"white"
    },

    closeButton: {
      backgroundColor: 'tomato',
      padding: 5,
      borderRadius: 5,
    },

    closeButtonText: {
      color: 'white',
      fontSize: 10,
    },

  });
  