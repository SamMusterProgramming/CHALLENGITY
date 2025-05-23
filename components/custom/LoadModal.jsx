import React, { useEffect, useState } from 'react';
import { View,  ActivityIndicator, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';








export default function LoadModel({visible,setVisible}) {
 useEffect(() => {
//    setTimeout(() => {
//     visible && setVisible(false)
//    }, 5000);
 }, [visible])
 
  return (
    <SafeAreaView
       className=" "  >

      <Modal 
       visible={visible} 
       transparent={true}
    //    animationType="fade"
       animationIn={"none"}
       animationOut={"none"}
       backdropOpacity={0.0}
       useNativeDriverForBackdrop={true}
       hideModalContentWhileAnimating={true}
       animationType="slide"
       useNativeDriver={true}
       >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text    className="text-orange-900 text-sm font-black ">we will notify you when your challenge is available</Text>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>
     </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'lightblue',
    padding: 27,
    borderRadius: 10,
    alignItems: 'center',
  },
    loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});