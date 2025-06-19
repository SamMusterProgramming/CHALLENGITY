
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';
import { router } from 'expo-router';


const RegionSelector = ({  selectedTalent }) => {
    const [selectedRegion , setSelectedRegion] = useState(null)
    // const regions = ['Africa', 'Asia', 'Europe', 'America'];
   const regions = [ { 
     id: '1', name: 'Africa', icon: icons.africa, color:"#34cfeb" },
    { id: '2', name: 'Asia', icon: icons.asia , color:"#3a34eb" },
    { id: '3', name: 'Europe', icon: icons.europe , color:"#eb34cc" },
    { id: '4', name: 'America', icon: icons.america , color:"#6709e3"}
  ]
  
    return (
      <View 
      className="flex-1 bg-white"
      style={styles.regionGrid}>
        {regions.map((region) => (
          <TouchableOpacity
            key={region.id}
            className= "w-[45%] h-[48%] flex-row justify-start bg-[#fff] items-center"
            style={[
              styles.regionButton
            ]}
            onPress={() => {
                router.navigate({ pathname: '/TalentContestRoom',params: {
                    region:region.name,
                    selectedTalent:selectedTalent.name , 
                    selectedIcon: selectedTalent.icon,
                    regionIcon : region.icon
                    // invited_friends: JSON.stringify(selectedFriends)
                  } }) 
            }}
          >

             <View
             className ="w-[60%] h-[100%] flex-col justify-center gap-2 items-start p-2">
                     <Image
                    className ="w-10 h-10 "
                    resizeMethod='contain'
                    source={icons.contestant} />
                       <Text 
                        className="text-xs"> 5 Contestants</Text>
             </View>
             <View
             className ="w-[50%] h-[100%] flex-col justify-between  items-center  p-1">
                  <Image
                    className ="w-14 h-14 "
                    resizeMethod='contain'
                    source={selectedTalent.icon} />
                 <Image
                    className ="w-16 h-16 "
                    resizeMethod='contain'
                    source={region.icon} />
                  
             </View>
             <View
             className = "absolute bottom-0 left-0 p-4 rounded-tr-xl bg-black">
                   <Text
                      style={[
                      styles.regionText
                            ]}
                        >
                       {region.name}
                    </Text>
             </View>
           
          </TouchableOpacity>
        ))}
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    card: {
      backgroundColor: '#f0f0fa',
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
      padding: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    regionButton: {
      backgroundColor: '#e0dfff',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 10,
      margin: 6,
    },
    regionButtonSelected: {
      backgroundColor: '#4B0082',
    },
    regionText: {
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