import React, { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getInition } from '../../helper';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router, useFocusEffect } from 'expo-router';
import { icons } from '../../constants';




export default function DisplayChallengers({friendList,user, setIsListVisible}) {

 const {isViewed ,setIsViewed
      } = useGlobalContext()

const [hoveredIndex, setHoveredIndex] = useState(null);



const renderItem = ({ item ,index}) => (
  <View className="flex-1 flex-row w-[100%] h-[100%] mb-1 justify-center items-center">
        <TouchableOpacity 
        key={index} 
        onPress={() => {
            if(user._id === item.user_id){
              router.push('/profile')
            }
            else{
             if(isViewed) 
              {  console.log("i am here routttterrrrr")
                 setIsViewed(false) 
                router.push({ pathname: '/ViewProfile', params: {user_id:item.user_id} })
              }
              else router.replace({ pathname: '/ViewProfile', params: {user_id:item.user_id} })
            }
          } }
        className="px-2 py-2  mb-1 w-[90%] h-[30px] bg-white rounded-lg flex-row justify-start gap-3 items-center"
        >
            <Image 
            className="w-[20px] h-[20px] rounded-full"
            source={{uri:item.profile_img}}
            resizeMethod='contain'
            />
            <View className="flex-col justify-center w-[45%] gap-0 items-start h-[30px] ">
                    <Text
                    style={{fontSize:7}}
                    className="font-black text-xs text-black">
                        {user.name== item.name ? item.name + ' -You': item.name }
                    </Text>
                    <Text
                        style={{fontSize:8}}
                        className=" text-xs text-blue-600 font-bold">
                        {getInition(item.name)}Challenger
                    </Text>
            </View>
            {/* <Image
                className="w-6 h-6   ml-auto"
                source={icons.rank1}
            /> */}
            <Text
              style={{fontSize:10}}
             className=" text-sm text-green ml-auto font-bold">
                 Ranked #
            </Text>
            <Text
                        // style={{fontSize:8}}
                        className=" text-1xl text-blue-600 ml-auto font-bold">
                        {index+1}
            </Text>
        
        </TouchableOpacity>
 </View>
);


useFocusEffect(
    useCallback(() => {
    //   setIsVisible(true);

      return () => {
        setIsListVisible(false);
      };
    }, [])
  );
  return (
    <View className ="w-[230px]  max-h-[450px]  rounded-lg  absolute bg-gray-400  right-1 bottom-16">
    
    
        <FlatList
          data={friendList}
          renderItem={renderItem}
          keyExtractor={(item) => item.user_id}
          extraData={hoveredIndex}
          ListHeaderComponent={
            <View className="flex-1 flex-row w-[100%] h-[30px] mb-2 justify-center rounded-tl-lg rounded-tr-lg rounded-bl-3xl rounded-br-3xl bg-blue-950 items-center">
                <Text className="text-white text-xs font-black"
                 style={{fontSize:8}}>
                   {friendList.length} PARTICIPANTS IN the CHALLENGE
                </Text>
            </View>
          }
        ListFooterComponent={
            <View className="flex-1 flex-col w-[100%] h-[40px]  justify-center rounded-tl-3xl rounded-tr-3xl bg-blue-800 items-center">
                <Text className="text-blue-100 text-xs font-black"
                      style={{fontSize:9}}>
                     { friendList[0].name + "  " }
                     <Text  className="text-white text-xs font-black"
                            style={{fontSize:8}}
                     >
                         is leading the challenge
                     </Text>
                </Text>
                <Text className="text-blue-100 text-xs font-bold"
                  style={{fontSize:8}}>
                      Watch the Challenge and cast your vote
                     <Text>
                         
                     </Text>
                </Text>
            </View>
        }
        />
   

  </View>
  )
}


const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    hoveredItem: {
      backgroundColor: 'lightblue',
    },
  });
  