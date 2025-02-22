import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown';

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
            {/* {selectedItem && (
                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
            )} */}
            <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem || data[0])}
            </Text>
            {/* <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} /> */}
            </View>
        );
        }}
        renderItem={(item, index, isSelected) => {
        return (
            <View  style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'lightblue'})}}>
            {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
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
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      opacity:80
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
      backgroundColor: 'lightgray',
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