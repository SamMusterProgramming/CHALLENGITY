import React, { useEffect, useRef, useState } from 'react';
import {  Animated,  Platform, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';





export default function ChallengeAction({text,action,isModalVisible, setIsModalVisible,
    removeChallenge, addToFavourite,removeFromFavourite, handleTalentParticipation , handleTalentResignition,
    joinChallenge ,resignChallenge , handleVotePost , handleFlagPost, handleQueue}) {
    
    const { wid, height } = useWindowDimensions();
    const [isLoaded , setIsLoaded] = useState(false)
    const [textArray , setTextArray] = useState(null)
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
      const showModal = async () => {
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setPositionAsync("absolute");
        await NavigationBar.setBackgroundColorAsync("transparent");
        await NavigationBar.setVisibilityAsync('sticky-immersive'); 
      };
      showModal()
    }, [isModalVisible]);

    useEffect(() => {
      if(Platform.OS == "android"){
      NavigationBar.setPositionAsync("absolute");
      NavigationBar.setVisibilityAsync('sticky-immersive');
      }
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
            className=" flex- justify-center items-center "  >
            
                <Modal 
             
                  useNativeDriverForBackdrop={true}
                  transparent={true}
                  backdropOpacity={0.9}
                  onBackdropPress={()=>{setIsModalVisible(false)}}
                  visible={isModalVisible}  animationType="slide" onRequestClose={closeModal}>
                   
                  <View 
                    style={styles.modalOverlay} >
                    <Animated.View 
                      className=" borde-2 borde-[#292727] "
                      style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>

                      <View
                        style={{      backgroundColor: 'rgba(0, 10, 50, 0.9)'                        }}
                        className=" w-[90%] flex-col px-4 py-6 justify-start rounded-lg g-[#f8fbfb] items-center">
                             {/* {textArray && textArray.textData.map((text,index)=> {
                                return  (
                                    <Text key={index} style={styles.modalText}
                                       className="font-bold" > {text}
                                    </Text>
                                )
                             })} */}
                               <Text  style={styles.modalText}
                                       className="font-bold text-center text-lg" > {text}
                                </Text>
                              
                      </View>
                       

                      <View
                      className=" w-[90%]  flex-row justify-center gap-6 mt-5 items-center">
        
                               <TouchableOpacity 
                                  onPress={()=>{setIsModalVisible(false)}} 
                                  className="w-[80px] h-[35px] bg-red-700 rounded-lg flex-row justify-center items-center">
                                    <Text
                                    className="text-white font-black"
                                     style={{fontSize:10}}
                                     >
                                       { action!=="OK" ?"Cancel" :"Ok" }
                                     </Text>
                               </TouchableOpacity>
                               {action !=="OK" && (
                               <TouchableOpacity 
                                  onPress={
                                  action == "JN"?joinChallenge:action =="DT"?removeChallenge:
                                  action =="RS"?resignChallenge:action =="FA"? addToFavourite : action == "RF" ? removeFromFavourite :
                                  action == "NP"? handleTalentParticipation: action == "P" ? handleTalentResignition :
                                  action =="VT"? handleVotePost: action=="FL"? handleFlagPost: action= "Q" ?handleQueue: ()=> {}}
                                  className="w-[80px] h-[35px] bg-blue-700 rounded-lg flex-row justify-center items-center">
                                    <Text
                                    className="text-white font-black"
                                     style={{fontSize:10}}
                                     >Confirm</Text>
                               </TouchableOpacity>
                                      )}  
                                
                      </View>
                    
                    </Animated.View>
                  </View>
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
      display:"flex",
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
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
      // justifyContent: 'flex-end',
      // backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
    modalContainer: {
      position: 'absolute',
      bottom: "40%",
      left: "10%",
      right: 0,
      backgroundColor: 'rgb(255, 255, 255)',
      padding: 25,
      borderTopLeftRadius: 10,
      borderRadius: 10,
      justifyContent:"center",
      alignItems: 'center',
      width:"80%"
    },
    modalText: {
      fontSize: 11,
    //   marginBottom: 20,
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
  