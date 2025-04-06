import React, { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getInition } from '../../helper';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';

export default function DisplayMode({modeData,selectedMode,setSelectedMode,setIsModeVisible,isOwner}) {

    const {isViewed ,setIsViewed, user
    } = useGlobalContext()

    const renderItem = ({ item ,index}) => (
        <View className="flex-1 flex-row w-[100%] h-[100%] mb-1 justify-center items-center">
              <TouchableOpacity 
              key={index} 
              onPress={() => {
                  setSelectedMode(item.value);
                  setTimeout(() => {
                    setIsModeVisible(false)
                  }, 1000);
            
                } }
              className="px-2 py-2  mb-1 w-[90%] h-[30px] bg-white rounded-lg flex-row justify-start gap-3 items-center"
              >
                  <Text
                    style={{fontSize:10}}
                   className=" text-sm text-green  font-bold">
                       {item.value}
                  </Text>
                  <Image 
                  className="w-[20px] h-[20px] ml-auto rounded-full"
                  source={selectedMode == item.value? icons.check :""}
                  resizeMethod='contain'
                  /> 
              </TouchableOpacity>
       </View>
      );

  return (
    // <View className ="w-[130px]  min-h-[140px] max-h-[200px] rounded-lg
    //         absolute bg-gray-400  left-28 bottom-16">
       <>
       {
        isOwner? (
          <View className ="w-[130px]  min-h-[140px] max-h-[200px] rounded-lg
          absolute bg-gray-400  left-28 bottom-16">
                <FlatList
                data={modeData}
                renderItem={ renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                  <View 
                    className="w-[100%] px-2 py-2 min-h-[30px] bg-gray-300 max-h-[200px] mb-2 rounded-t-lg" >
                      <Text 
                          style={{fontSize:7}}
                          className="text-black font-black">
                          {selectedMode == "Open"? "Open mode : everyone can see , vote,comment the challenge ":
                          selectedMode == "Restricted"?"Restricted mode : Only Friends can see the challenge":
                          "Strict Mode:Only invited friends can see  the challenge"}
                      </Text> 
                  </View>
                }
                />
          </View>  
             ) : (
              <View       
                className ="w-[135px]  h-[55px] px-2 py-2 rounded-lg
                absolute bg-gray-100  left-28 bottom-16">
                    <Text 
                        style={{fontSize:8 , color:selectedMode == "Open"?"green":selectedMode == "Restricted"?"violet":"red" }}
                        className="text-green-400 font-black">
                        {selectedMode == "Open"? "Open mode :" :
                        selectedMode == "Restricted"?"Restricted mode :":
                        "Strict Mode:"}
                      <Text
                        style={{fontSize:8  }}
                        className="text-black font-bold"
                      >
                       {selectedMode == "Open"? "\neveryone can see , vote,comment the challenge" :
                        selectedMode == "Restricted"?" \nOnly Friends can see , vote and comment the challenge":
                        "\nOnly invited friends can see , vote and comment the challenge"}
                      </Text>
                    </Text> 
              </View>
        )
       }
   
       
   </>

    // </View>
  )
}