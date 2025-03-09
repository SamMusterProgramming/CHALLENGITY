import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../constants';


export default function ChallengeTypeSelector({data,setSelected}) {
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
           
          <View style={styles.dropdownButtonStyle}>
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
      width: '45%',
      height: 40,
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'between',
      alignItems: 'center',
      paddingHorizontal: 12,
      opacity:60
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 12,
      fontWeight: '800',
      color: 'black',
      fontWeight:'bold'
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
      fontSize: 14,
      fontWeight: '600',
      color: 'black',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });