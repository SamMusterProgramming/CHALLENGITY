import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';
import { MotiView } from 'moti';

// const getIconComponent = (iconPack) => {
//   switch (iconPack) {
//     case 'FontAwesome5': return FontAwesome5;
//     case 'MaterialIcons': return MaterialIcons;
//     case 'Entypo': return Entypo;
//     default: return FontAwesome5;
//   }
// };

const TalentRoomHeader = ({ selectedTalent }) => {


  return (
    <MotiView
    from={{ opacity: 0, translateY: 40 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ delay: 300, type: 'timing', duration: 600 }}
    //  style={styles.headerContainer}
     className ="min-w-full elevation-xl  h-[20%] gap- flex-col justify-evenly items-center gap- px-6 pt-1 p- g-[#2f2f70] -8"
     >
        {/* <Text className="text-center text-3xl font-bold text-white mb-">
                     🌟
        </Text> */}
        
        <Image
                    className ="w-9 h-9 "
                    resizeMethod='contain'
                    source={selectedTalent.icon} />
        <View
                className = "flex-row justify-center items-end gap-2">
                    {/* <Image
                    className ="w-11 h-11 "
                    resizeMethod='contain'
                    source={selectedTalent.icon} /> */}
                    <Text className="text-center text-md font-bold text-white mb-">
                       {selectedTalent.name} Talent
                    </Text>
              
        </View>

       

       

        <View 
          className= " flex-row g-[#2b2b33]  p- gap-1 justify-end rounded-r-xl items-center "
          >
   
            <Text 
            className ="text-gray-300 font-bold text-sm "
            style={styles.regn}>Select Region from the list Bellow </Text>
        </View>
        {/* <View 
        className ="rounded-l-xl w-[25%] h-[100%] flex-row justify-center bg-[#2f2d2d] items-center p-"
        >
            <Image
                    className ="w-14 h-14  "
                    resizeMethod='cover'
                     />
        </View> */}
       

      
      {/* <View 
      className= "w-[50%] flex-col bg-[#2b2b33] h-[100%] p-4 gap-1 justify-end rounded-r-xl items-center "
      >
        <Text 
        style={styles.title}
        >{selectedTalent.name} Talent Room</Text>
        <Text style={styles.region}>🌍 Region Selection </Text>
      </View> */}


    </MotiView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    paddingVertical: 5,
    paddingHorizontal: 0,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // elevation: 5,
  },
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    // marginRight: 16,
  },
  textWrapper: {
    // flex: 1,
    // padding:10,
    margin:0,
    lineHeight: 18,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  region: {
    fontSize: 11,
    color: 'white',
    marginTop: 2,
  },
});

export default TalentRoomHeader;