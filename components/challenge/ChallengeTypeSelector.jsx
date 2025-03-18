import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../constants';


export default function ChallengeTypeSelector({data,setSelected,bgColor}) {
  return (

    <SelectDropdown
        data={data}
        onSelect={
        (selectedItem, index) => {
         setSelected(selectedItem);
        }
        }
        renderButton={(selectedItem, isOpened) => {
        return (
           
          <View 
          className="w-[120px] h-[35px] flex-row justify-between items-center rounded-lg "
          style={{backgroundColor:bgColor ,   paddingHorizontal: 15 }}>
            <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem || data[0])}
            </Text>
            <Image  
            className ="w-4 h-4"
            source={icons.down_arrow}/>
          </View>
          
        );
        }}
        renderItem={(item, index, isSelected) => {
        return (
            <View  style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'lightblue'})}}>
               {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
               {/* <Ionicons name="home" style={styles.dropdownItemIconStyle}   /> */}
               <Text key={index} style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
        );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
  />

  )
}



const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '30%',
      height: 40,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'between',
      alignItems: 'center',
      paddingHorizontal: 15,
      opacity:100
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 11,
      fontWeight: '900',
      color: 'white'
      // fontWeight:'bold'
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: 'lightblue',
      opacity:70,
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 12,
      fontWeight: '600',
      color: 'black',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });