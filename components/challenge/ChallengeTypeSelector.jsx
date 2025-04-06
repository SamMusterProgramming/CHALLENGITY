import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import SelectDropdown from 'react-native-select-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../constants';


export default function ChallengeTypeSelector({data, selected ,  setSelected , bgColor , title}) {
   
   const [displayList ,setDisplayList] = useState(false)
   const [icon,setIcon] = useState(icons.publi)
   
   const renderItem =({item,index})=> {
       return ( <TouchableOpacity
                    onPress={()=> {setSelected(item.value)}}
                    onPressOut={()=>{setDisplayList(!displayList)}}  
                    style={{backgroundColor: selected == item.value ? "#dbd8d0" :"white"}}
                    className= "w-[100%] h-[30px]  mb-1  bg-gray-900 px-2 flex-row justify-center items-center ">
                    <Text
                      style={{fontSize:9}}
                      className="text-black font-black">
                      {item.value}
                    </Text>
                    <Image
                     className="w-5 h-5 ml-auto"
                     source = {getIcon(item.value)}
                     resizeMethod='contain'
                    />
                </TouchableOpacity> 
        )
   }

   useEffect(() => {
    switch(selected) {

      case "Public":
        setIcon(icons.publi)
       break;
       case "Private":
        setIcon(icons.priv)
       break;
    
      case "Open":
        setIcon(icons.open)
       break;
      case "Restricted":
        setIcon(icons.restricted)
       break;
       case "Strict":
        setIcon(icons.strict)
       break;
 
      case "Adventure":
         setIcon(icons.adventure)
        break;
      case "Dance":
        setIcon( icons.dance )
        break;
      case "Eating":
        setIcon( icons.eating )
         break;
      case "Fitness":
        setIcon( icons.fitness )
         break;
      case "Magic":
        setIcon( icons.magic )
          break;
      case "Music":
        setIcon( icons.music )
           break;
      case "Science":
        setIcon(icons.science)
           break;
      case "Sport":
           setIcon(icons.sport)
           break;
      case "Game":
            setIcon(icons.game)
            break;
      case "Diet":
            setIcon(icons.diet)
            break;
      default:
        setIcon("gray")
    }
  }, [selected])

  const getIcon = (type) => {
    switch(type) {
      case "Public":
        return icons.publi
       break;
      case "Private":
        return icons.priv
       break;

       case "Open":
        return icons.open
       break;
      case "Restricted":
        return icons.restricted
       break;
       case "Strict":
        return icons.strict
       break;

      case "Adventure":
         return icons.adventure
        break;
      case "Dance":
         return icons.dance 
        break;
      case "Eating":
          return icons.eating 
         break;
      case "Fitness":
          return  icons.fitness 
         break;
      case "Magic":
        return icons.magic 
          break;
      case "Music":
        return icons.music 
           break;
      case "Science":
          return icons.science
           break;
      case "Sport":
           return icons.sport
           break;
      case "Game":
          return icons.game
          break;
      case "Diet":
          return icons.diet
          break;
      default:
        setIcon("gray")
    }
  }
  
  return (
     <View className= "w-[100%] h-[100%] flex-col  justify-center items-center" >
         <TouchableOpacity
           onPress={()=> {setDisplayList(!displayList)}}
           style={{backgroundColor:"#dbd8d0"}}
           className= "w-[100%] h-[100%]  rounded-md px-2 flex-row justify-center items-center ">
           <Text
           style={{fontSize:9}}
            className="text-gray-700 font-black">
              {selected}
           </Text>
           <Image
              className="w-5 h-5 ml-auto"
              source = {icon}
              resizeMethod='contain'
            />
        </TouchableOpacity>

        <View
        style={{zIndex:10}}
        className= "w-[100%] absolute top-10  rounded-md flex-row bg-gray-300" >
          {/* {displayList &&   ( */}    
           <FlatList  
            data={data}
            keyExtractor={(item)=> item.id}
            renderItem = {displayList &&  renderItem}
            //  ListHeaderComponent={
            //  {}
            //  }
            />
          {/* ) */}
          {/* } */}
        </View>
       


     </View>
  //   <SelectDropdown
  //       data={data}
  //       onSelect={
  //       (selectedItem, index) => {
  //        setSelected(selectedItem);
  //       }
  //       }
  //       renderButton={(selectedItem, isOpened) => {
  //       return (
           
  //         <View 
  //         className="w-[120px] h-[35px] flex-row justify-between items-center rounded-lg "
  //         style={{backgroundColor:bgColor ,   paddingHorizontal: 15 }}>
  //           <Text style={styles.dropdownButtonTxtStyle}>
  //               {(selectedItem && selectedItem || data[0])}
  //           </Text>
  //           <Image  
  //           className ="w-4 h-4"
  //           source={icons.down_arrow}/>
  //         </View>
          
  //       );
  //       }}
  //       renderItem={(item, index, isSelected) => {
  //       return (
  //           <View  style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'lightblue'})}}>
  //              {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
  //              {/* <Ionicons name="home" style={styles.dropdownItemIconStyle}   /> */}
  //              <Text key={index} style={styles.dropdownItemTxtStyle}>{item}</Text>
  //           </View>
  //       );
  //       }}
  //       showsVerticalScrollIndicator={false}
  //       dropdownStyle={styles.dropdownMenuStyle}
  // />

  )
}
