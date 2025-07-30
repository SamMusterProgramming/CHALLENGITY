import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';
import { MotiView } from 'moti';
import ShuffleLetters from '../custom/ShuffleLetters';



const TalentRoomHeader = ({ selectedTalent }) => {


  return (
    <MotiView
    from={{ opacity: 0, translateY: 40 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ delay: 300, type: 'timing', duration: 600 }}
    className ="min-w-full elevation-xl  h-[15%] gap- flex-col justify-evenly borde-t-2 order-blue-400 items-center gap- px-6 pt-1 p- g-[#2f2f70] -8"
     >
       
        <Image
                    className ="w-10 h-10 "
                    resizeMethod='contain'
                    source={selectedTalent.icon} />
        <View
                className = "flex-row justify-center items-end gap- border-b-4 border-white">
                    <ShuffleLetters textSize={14} text={selectedTalent.name + ' Talent'}/>    
        </View>


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