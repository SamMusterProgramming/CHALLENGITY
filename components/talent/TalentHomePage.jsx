import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';
import TalentRoom from './TalentRoom';
import { MotiView } from 'moti';
import BlinkingHeader from '../custom/BlinkingHeader';
import ShuffleLetters from '../custom/ShuffleLetters';
import Icon from '@expo/vector-icons/Ionicons'

const talentRooms = [
  { id: '1', name: 'Music', icon: icons.music, iconPack: 'FontAwesome5',color:"#dee2e3" },
  { id: '2', name: 'Dancing', icon: icons.dance, iconPack: 'Entypo' ,color:"#bdc2c4" },
  { id: '3', name: 'Fitness', icon: icons.fitness, iconPack: 'MaterialIcons',color:"#eb34cc" },
  { id: '4', name: 'Magic', icon: icons.magic, iconPack: 'FontAwesome5', color:"#6709e3"},
  { id: '5', name: 'Food', icon: icons.eating, iconPack: 'FontAwesome5' , color:"#c26e08" },
  { id: '6', name: 'Adventure', icon: icons.adventure, iconPack: 'MaterialIcons', color:"#08c227" },
  { id: '7', name: 'Sport', icon: icons.sport, iconPack: 'FontAwesome5' , color:"#babfba"},
  { id: '8', name: 'Instrument', icon: icons.instrument, iconPack: 'FontAwesome5', color:"#a83707" },
  { id: '9', name: 'Gaming', icon: icons.game, iconPack: 'FontAwesome5', color:"#0774ab" },
  { id: '10', name: 'Art', icon: icons.art, iconPack: 'FontAwesome5' , color:"#ab3807"},
  { id: '11', name: 'Tech', icon: icons.tech, iconPack: 'FontAwesome5' , color:"#99970c"},
  { id: '12', name: 'Comedy', icon: icons.comedy, iconPack: 'MaterialIcons', color:"#8a0303" },

];
const regions = ['Europe', 'Asia', 'Africa', 'America'];

const getIconComponent = (iconPack) => {
  switch (iconPack) {
    case 'FontAwesome5': return FontAwesome5;
    case 'MaterialIcons': return MaterialIcons;
    case 'Entypo': return Entypo;
    default: return FontAwesome5;
  }
};

const TalentHomePage = ({ setSelectedPage }) => {

  const[selectedTalent, setSelectedTalent] = useState(null)

  const renderItem = ({ item }) => {
    const IconComponent = getIconComponent(item.iconPack);
    return (
    <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 100 * item.id , type: 'timing', duration: 600  }}
        className ="bg-[#43718d] justify-center items-center" 
        style={[styles.card,
            {
              // backgroundColor:"#f0f0fa"
            }
             ]}>
      <TouchableOpacity 
      onPress ={()=> setSelectedTalent({name:item.name , icon:item.icon})}

        className="w-[100%] justify-center items-center "
        >
        <Image
             className="w-10 h-10"
             source={item.icon}
             esizeMethod='cover' />
       
      </TouchableOpacity>
      <Text style={styles.label}>{item.name}</Text>
     </MotiView>
    );
  };

  return (
    <View
    className="flex-1 borde-t-2 borde-blue-100 ">
    {!selectedTalent ?  (
        <>
           
            <View
            className="flex-row w-full -[5%] border-l-[10px] borde-r-[10px] borde-b-[10px] order-[#272d31] justify-center g-[#bdc2c4] items-center pt-5 py- px-4">
                <TouchableOpacity
                onPress={() => setSelectedPage(null)}
                className=" p- g-white flex-col justify-center items-center" >     
                </TouchableOpacity>
                {/* <Text style={styles.header}></Text>  */}
                <ShuffleLetters textSize={14} text = "Talent Rooms" />
                <TouchableOpacity
                 onPress={() => setSelectedPage(null)}
                 className=" absolute top-4 left-0 p- g-white flex-col justify-end items-center" >
                    <Icon name="arrow-back" size={35} color="#fff" />
                </TouchableOpacity>   
            </View>

            <View 
                className = "g-[#e1d6d6] flex-1 -full -[93%] flex-row flex-wrap gap-2 py-3 mt-2 justify-center items-center borde-l-[10px] borde-r-[10px] borde-[#272d31]"
     
                >
                  {talentRooms.map((item,index )=>{
                          return(
                          <MotiView
                              key={index}
                              from={{ opacity: 0, translateY: 40 }}
                              animate={{ opacity: 1, translateY: 0 }}
                              transition={{ delay: 100 * item.id , type: 'timing', duration: 600  }}
                              // style={{backgroundColor:item.color}}
                              className ="bg-[#dee2e3]  w-[30%]  h-[24%]  rounded-lg justify-center items-center" 
                              >
                                    <TouchableOpacity 
                                      onPress ={()=> setSelectedTalent({name:item.name , icon:item.icon})}
                              
                                      className="w-[100%] h-[100%]  justify-center items-center "
                                      >

                                         <View
                                          className="w-[93%] h-[93%] z-10 p-4 bg-black justify-center items-center " >
                                              <Image
                                              className="w-[70%] h-[70%] rounded-lg g-black"
                                              source={item.icon}
                                              esizeMethod='cover' />
                                         </View>
                                          
                                    
                                    </TouchableOpacity>
                                    <Text style={styles.label}>{item.name}</Text>
                        </MotiView>)
                  })}
           
            </View>
          
        </>
    ) : (
      
       <TalentRoom selectedTalent = {selectedTalent} setSelectedTalent= {setSelectedTalent} />
    )}

   
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    flexDirection : "row",
    justifyContent:"center",
    alignItems :"center",
  },
  header: {
    fontSize: 15,
    fontWeight: '800',
    // marginBottom: 12,
    marginTop:0,
    color: 'white',
  },
  list: {
    justifyContent: 'center',
    // alignItems :"center",
    // flex:1
  },
  card: {
    // backgroundColor: "black",
    //  '#f3f1f9',
    padding: 28,
    margin: 6,
    borderRadius: 5,
    alignItems: 'center',
    width: "30%",
    // elevation: 2,
  },


  label: {
    position:"absolute",
    paddingVertical:4,
    left:  0,
    bottom: 0,
    width:65,
    // marginTop: 8,
    fontSize: 10,
    fontWeight: '900',
    color:  "white",
    textAlign: 'center',
    backgroundColor:"black",
    borderTopRightRadius : 5,
    elevation: 10,

  },
});

export default TalentHomePage;