import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';

// const getIconComponent = (iconPack) => {
//   switch (iconPack) {
//     case 'FontAwesome5': return FontAwesome5;
//     case 'MaterialIcons': return MaterialIcons;
//     case 'Entypo': return Entypo;
//     default: return FontAwesome5;
//   }
// };

const TalentRoomHeader = ({ selectedTalent }) => {


//   const Icon = getIconComponent(talent.iconPack);

  return (
    <View
    //  style={styles.headerContainer}
     className ="min-w-full elevation-xl flex-row h-[10%] gap- justify-center items-center p- g-[#2f2f70] -8"
     >
        <View 
        // style={styles.iconWrapper}
        className ="rounded-l-xl w-[20%] h-[100%] flex-row justify-center bg-[#2f2d2d] items-center p-"
        >
            <Image
                    className ="w-14 h-14  "
                    resizeMethod='cover'
                     />
        </View>
      <View 
        // style={styles.iconWrapper}
        className ="rounde-l-full w-[20%] h-[100%] flex-row justify-center bg-black items-center p-"
        >
        {/* <Icon name={talent.icon} size={30} color="#fff" /> */}
        <Image
                    className ="w-10 h-10  "
                    resizeMethod='cover'
                    source={selectedTalent.icon} />
      </View>
      <View 
      className= "w-[50%] flex-col bg-[#2b2b33] h-[100%] p-4 gap-1 justify-end rounded-r-xl items-center "
    //   style={styles.textWrapper}
      >
        <Text 
        style={styles.title}
        >{selectedTalent.name} Talent Room</Text>
        <Text style={styles.region}>🌍 Region Selection </Text>
      </View>
    </View>
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