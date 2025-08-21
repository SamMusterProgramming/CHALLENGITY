
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { GetTalentRoomsByName } from '../../apiCalls';


const RegionSelector = ({  selectedTalent }) => {
    const [selectedRegion , setSelectedRegion] = useState(null)
    const [talentRegions , setTalentRegions] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    // const regions = ['Africa', 'Asia', 'Europe', 'America'];
   const regions = [ { 
     id: '1', name: 'Africa', icon: icons.africa, color:"white" },
    { id: '2', name: 'Asia', icon: icons.asia , color:"white" },
    { id: '3', name: 'Europe', icon: icons.europe , color:"white" },
    { id: '4', name: 'America', icon: icons.america , color:"white"}
  ]

  useEffect(() => {
    const queryParams = {
      name: selectedTalent.name,
    };
      GetTalentRoomsByName(queryParams, setTalentRegions,setIsLoading )
  }, [])


  
  
    return (
     
      <View 
      className="flex-1 rounded-xl py- borde-2 border-white bg-[#3b4348]"
      style={styles.regionGrid}>
       
        {! isLoading && regions.map((region) => (
          <MotiView
            key={region.id}
            from={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 100 * region.id , type: 'timing', duration: 600  }}
            style={[
              styles.regionButton
            ]}
            // style={{}}
            className="w-[49%] h-[49%] g-[#0b273c]"
              >
              <TouchableOpacity
                style={{backgroundColor:region.color}}
                className= "w-[100%] h-[100%] rounded-xl flex-row justify-center g-[#fff] items-center"
                // style={[
                //   styles.regionButton
                // ]}
                onPress={() => {
                    router.navigate({ pathname: '/TalentContestRoom',params: {
                        region:region.name,
                        selectedTalent:selectedTalent.name , 
                        selectedIcon: selectedTalent.icon,
                        regionIcon : region.icon,
                        startIntroduction :"false"
                        // invited_friends: JSON.stringify(selectedFriends)
                      } }) 
                }}
              >

                 <View
                   className="min-w-[95%] min-h-[95%] z- p- bg-black flex-row justify-start items-start " >
                        <View
                        className ="w-[50%] h-[70%] g-[#f6f4f1] g-[#192037] rounded-lg flex-col justify-start gap- items-center py-4 ">
                                <Image
                                className ="w-10 h-10 "
                                resizeMethod='contain'
                                source={icons.contestant} />
                                  <Text 
                                    className="text-xs text-white mt-auto font-black"> 
                                    {talentRegions.find(el=> el.region === region.name).contestants.length}
                                    
                                  </Text>
                                  <Text 
                                    style={{fontSize:11}}
                                    className=" text-white text-base  font-bold"> 
                                    {' '}CONT
                                  </Text>
                                  <Text 
                                    style={{fontSize:11}}
                                    className=" text-white text-base  font-bold"> 
                                    {' '}ESTANTS
                                  </Text>
                        </View>
                        <View
                        className ="w-[50%] h-[100%] flex-col justify-start  gap-2 items-center  p-2">
                              <Image
                                className ="w-12 h-12 "
                                resizeMethod='contain'
                                source={selectedTalent.icon} />
                                <Text 
                                    style={{fontSize:9}}
                                    className=" text-white   font-black"> 
                                    {selectedTalent.name.toString()}
                                  </Text>
                            <Image
                                className ="w-14 h-12 mt-auto "
                                resizeMethod='contain'
                                source={region.icon} />
                              
                        </View>
                    </View>
              
              </TouchableOpacity>
              <View
                className = "absolute bottom-0 left-0 p-4 rounded-tr-xl bg-[#3b4348]">
                      <Text
                          style={[
                          styles.regionText
                                ]}
                            >
                          {region.name}
                        </Text>
                </View>
            </MotiView>
        ))}
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    card: {
      // backgroundColor: '#f0f0fa',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      alignItems: 'center',
      elevation: 2,
    },
    label: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: '600',
      color: '#4B0082',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4B0082',
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    iconWrapper: {
      backgroundColor: '#9370DB',
      borderRadius: 30,
      padding: 12,
      marginRight: 16,
    },
    textWrapper: {
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
    },
    region: {
      fontSize: 16,
      color: '#e0dfff',
      marginTop: 2,
    },
    regionGrid: {
      padding: 5,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems:"center"
    },
    regionButton: {
      // backgroundColor: '#e0dfff',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      // margin: 6,
    },
    regionButtonSelected: {
      backgroundColor: '#4B0082',
    },
    regionText: {
      fontWeight:800,
      fontSize: 14,
      color: 'white',
    },
    regionTextSelected: {
      color: '#fff',
      fontWeight: '600',
    },
    selectionResult: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 20,
      color: '#333',
    },
  });

  export default RegionSelector ;