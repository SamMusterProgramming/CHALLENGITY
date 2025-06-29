import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { icons } from '../../constants';
import TalentRoom from './TalentRoom';
import { MotiView } from 'moti';

const talentRooms = [
  { id: '1', name: 'Music', icon: icons.music, iconPack: 'FontAwesome5',color:"#34cfeb" },
  { id: '2', name: 'Dancing', icon: icons.dance, iconPack: 'Entypo' ,color:"#3a34eb" },
  { id: '3', name: 'Fitness', icon: icons.fitness, iconPack: 'MaterialIcons',color:"#eb34cc" },
  { id: '4', name: 'Magic', icon: icons.magic, iconPack: 'FontAwesome5', color:"#6709e3"},
  { id: '5', name: 'Food', icon: icons.eating, iconPack: 'FontAwesome5' , color:"#c26e08" },
  { id: '6', name: 'Adventure', icon: icons.adventure, iconPack: 'MaterialIcons', color:"#08c227" },
  { id: '7', name: 'Sport', icon: icons.sport, iconPack: 'FontAwesome5' , color:"#babfba"},
  { id: '8', name: 'Basket', icon: 'basketball-ball', iconPack: 'FontAwesome5', color:"#a83707" },
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
        className ="bg-[#04273f]" 
        style={[styles.card,
            {
              // backgroundColor:"#f0f0fa"
            }
             ]}>
      <TouchableOpacity 
      onPress ={()=> setSelectedTalent({name:item.name , icon:item.icon})}
    //   style={[styles.card,
    //    {backgroundColor:"#f0f0fa"}
    //     ]} 
        className="w-[100%]  "
        >
        <Image
             className="w-14 h-14"
             source={item.icon}
             esizeMethod='cover' />
       
      </TouchableOpacity>
      <Text style={styles.label}>{item.name}</Text>
     </MotiView>
    );
  };

  return (
    <>
    {!selectedTalent ?  (
        <>
            {/* <View
            className="flex-row w-full justify-between bg-[#0e0e0e] items-end pt-0 px-5">
                <TouchableOpacity
                onPress={() => setSelectedPage(null)}
                className="" >
                    <Image
                    className ="w-7 h-7 "
                    source={icons.back1} />
                </TouchableOpacity>
                <Text style={styles.header}>🎭 Explore Talent Rooms</Text>
                <TouchableOpacity
                className="" >
                
                </TouchableOpacity>
            </View> */}
        
            <View 
            className = "g-[#030303]  border-l-[10px] border-r-[10px] border-[#052d40]"
            style={styles.container}>
            {/* <Text style={styles.header}>🎭 Explore Talent Rooms</Text> */}
            <FlatList
                data={talentRooms}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.list}
            />
            </View>
            <View
            className="flex-row w-full  border-l-[2px] border-r-[10px] border-b-[4px] border-[#052d40] justify-between bg-[#052d40] items-center pt-0 py- px-5">
                <TouchableOpacity
                onPress={() => setSelectedPage(null)}
                className=" p-2 g-white flex-col justify-center items-center" >
                    <Image
                    className ="w-8 h-8 rounded-full "
                    source={icons.back1} />
                </TouchableOpacity>
                <Text style={styles.header}>🎭 Explore Talent Rooms</Text>
                <TouchableOpacity
                className="" >
                
                </TouchableOpacity>
            </View>
        </>
    ) : (
       <TalentRoom selectedTalent = {selectedTalent} setSelectedTalent= {setSelectedTalent} />
    )}

   
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    // marginTop: 10,
    // display : "flex",
    flexDirection : "row",
    justifyContent:"center",
    alignItems :"center",
  },
  header: {
    fontSize: 12,
    fontWeight: '600',
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
    padding: 30,
    margin: 6,
    borderRadius: 5,
    alignItems: 'center',
    width: "30%",
    // elevation: 2,
  },


  label: {
    position:"absolute",
    paddingVertical:5,
    left: 0,
    bottom: 0,
    width:65,
    // marginTop: 8,
    fontSize: 9,
    fontWeight: '900',
    color:  "white",
    textAlign: 'center',
    backgroundColor:"black",
    borderTopRightRadius : 5,
    elevation: 10,

  },
});

export default TalentHomePage;