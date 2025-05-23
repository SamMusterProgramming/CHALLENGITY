import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';





export default function CustomAlert({text,action,isModalVisible, setIsModalVisible,okFriendRequest,addToFavourite,
               unfriendFriendRequest ,cancelFriendRequest,removeFromFavourite, sendFriendRequest,removeChallenge,
               joinChallenge ,resignChallenge}) {
    
    const { wid, height } = useWindowDimensions();
    const originalNavigationBarColor = '#000000'; // Replace with your default color

    useEffect(() => {
      // isModalVisible && StatusBar.setHidden(true);
    }, [isModalVisible]);
  
    return (
        <SafeAreaView>
      
            <View 
              className="flex-1 w-full h-full flex-col justify-center items-center "  >
              
                <Modal 
                className=" flex-col justify-center flex-1 items-center"  
                transparent={true}
                backdropOpacity={0.0}
                // useNativeDriverForBackdrop={true}
                hideModalContentWhileAnimating={true}
                animationType="slide"
                useNativeDriver={true}
                navigationBarTranslucent={false}
                statusBarTranslucent={false}
                // className="h-[100%] w-[100%]"
                isVisible={isModalVisible}
                onBackdropPress={()=>{setIsModalVisible(false)}}
                     >
                    {/* <StatusBar backgroundColor="transparent" hidden={true} translucent={true}/> */}
                  <View
                     style={{left:(wid-300)/2 , width:300}}
                    className="flex-col items-center justify-center p-9 rounded-lg 
                    border-4 border-blue-600 bg-blue-200 w-[300px]
                          absolute      "
                    >
                    <Text style={styles.modalText}
                    className="font-bold" >{text}</Text>
                    <View
                       className="flex-row gap-5 items-center  justify-center ">
                            <Button
                             title={ action!=="OK" ?"Cancel" :"ok" }
                             onPress={()=>{setIsModalVisible(false)}} 
                             color="red" />


                          {action !=="OK" && (

                            <Button 
                            title="Confirm" 
                            style={{backgroundColor:"white"}}
                            onPress={action=="FR"?sendFriendRequest : action =="CR"?cancelFriendRequest:
                            action =="AC"?okFriendRequest:action =="FA"?addToFavourite:action =="RF"?
                            removeFromFavourite:action =="JN"?joinChallenge:action =="DT"?removeChallenge:
                            action =="RS"?resignChallenge:action =="UN"?unfriendFriendRequest:{}} />
                          )} 
                     
                    </View>
                   
                  </View>
                

             

                </Modal>
              </View>

       
       </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    flexDirection:"col",
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
     
      // position:"absolute",
      left:50,
      backgroundColor: 'lightblue',
      borderRadius:14,
      padding: 22,
      flexDirection:"column",
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    modalText: {
      fontSize: 12,
      marginBottom: 15,
      textAlign: 'center',
    }
  });
  