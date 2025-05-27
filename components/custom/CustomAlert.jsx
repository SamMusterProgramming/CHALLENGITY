import React, { useEffect, useRef, useState } from 'react';
import {  Animated,  Platform, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
// import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';





export default function CustomAlert({text,action,isModalVisible, setIsModalVisible,okFriendRequest,addToFavourite,
               unfriendFriendRequest ,cancelFriendRequest,removeFromFavourite, sendFriendRequest,removeChallenge,
               joinChallenge ,resignChallenge}) {
    
    const { wid, height } = useWindowDimensions();
    const [isLoaded , setIsLoaded] = useState(false)
    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }).start();
      const showModal = async () => {
        // await NavigationBar.setVisibilityAsync("hidden");
        // await NavigationBar.setPositionAsync("absolute");
        // await NavigationBar.setBackgroundColorAsync("transparent");
        // await NavigationBar.setVisibilityAsync('sticky-immersive');
       
      };
      // showModal()
    }, [isModalVisible]);

    useEffect(() => {
      if(Platform.OS == "android"){
      NavigationBar.setPositionAsync("absolute");
      // NavigationBar.setBackgroundColorAsync("#00000000");
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
            className=" flex-col justify-center items-center "  >
            
                <Modal 
             
                  useNativeDriverForBackdrop={true}
                  transparent={true}
                  onBackdropPress={()=>{setIsModalVisible(false)}}
                  visible={isModalVisible}  animationType="slide" onRequestClose={closeModal}>
                   
                  <View 
                    style={styles.modalOverlay} >
                    <Animated.View 
                      className=" border-4 border-blue-400  "
                      style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>

                      <View
                        className="h-[80px] w-full flex-col justify-center text-center items-center">
                              <Text style={styles.modalText}
                                  className="font-bold" >{text}
                              </Text>
                      </View>
                       

                      <View
                      className="flex-1  flex-row justify-center gap-5 items-center">
        
                               <TouchableOpacity 
                                  onPress={()=>{setIsModalVisible(false)}} 
                                  className="w-[100px] h-[35px] bg-red-700 rounded-lg flex-row justify-center items-center">
                                    <Text
                                    className="text-white font-black"
                                     style={{fontSize:11}}
                                     >
                                       { action!=="OK" ?"Cancel" :"ok" }
                                     </Text>
                               </TouchableOpacity>
                               {action !=="OK" && (

                               <TouchableOpacity 
                                  onPress={action=="FR"?sendFriendRequest : action =="CR"?cancelFriendRequest:
                                  action =="AC"?okFriendRequest:action =="FA"?addToFavourite:action =="RF"?
                                  removeFromFavourite:action =="JN"?joinChallenge:action =="DT"?removeChallenge:
                                  action =="RS"?resignChallenge:action =="UN"?unfriendFriendRequest:{}}
                                  className="w-[100px] h-[35px] bg-blue-700 rounded-lg flex-row justify-center items-center">
                                    <Text
                                    className="text-white font-black"
                                     style={{fontSize:11}}
                                     >Confirm</Text>
                               </TouchableOpacity>
                                      )}  
                                
                      </View>
                    
                    </Animated.View>
                  </View>
                </Modal>
                <StatusBar    backgroundColor={"red"}/>
            </View>

         )}
            </>
    
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      bottom: -10,
      left: 0,
      right: 0,
      backgroundColor: "#202836",
      padding: 30,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      alignItems: 'center',
    
    },
    modalText: {
      fontSize: 10,
      marginBottom: 20,
      color:"#cbd0d1"
    },
    closeButton: {
      backgroundColor: 'tomato',
      padding: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 10,
    },
  });
  