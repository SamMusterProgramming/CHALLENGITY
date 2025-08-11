import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIcon } from '../../helper';

export default function UserTalentEntry({userTalent, user , userPost}) {
    const[ userParticipation , setUserParticipation ] = useState(userPost)
    const[ rank , setRank ] = useState(userTalent.contestants.findIndex(c => c.user_id === user._id) + 1)
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();


    // const getIcon = (name)=>{
    //     switch (name) {
    //        case "Music":
    //            return icons.music
    //            break;
    //        case "Magic":
    //            return icons.magic
    //            break;
    //        case "Asia":
    //            return icons.asia
    //            break;
    //        case "Africa":
    //            return icons.africa
    //            break;
    //         case "Europe":
    //              return icons.europe
    //              break;
    //        case "Fitness":
    //             return icons.fitness
    //             break;
    //        case "Art":
    //             return icons.art
    //             break;
    //         case "Food":
    //             return icons.eating
    //             break;
    //        default:
    //            break;
    //     }
    //  }

  return (
    // <View
    // style={{width:width/2.2 , height:(height* 0.7)/4}}
    // className=" b g-white flex-col justify-center p- 1 items-center rounded-xl ">
        <TouchableOpacity
        onPress={
            ()=> {   
                router.push({ pathname:'TalentContestRoom', params:{
                  region:userTalent.region,
                  selectedTalent:userTalent.name , 
                  selectedIcon: getIcon(userTalent.name),
                  regionIcon : getIcon(userTalent.region),
                  startIntroduction :"true",
                  showGo:"true",
                  location : "contest",
                  contestant_id : userParticipation.user_id
                } })
               }
        }
        style={{height: (height - (height * 0.3 + (width/7) + insets.top ) ) * 0.33 + 4 }}
        className="bg-[#090908] w-[32.7%] min-h -[32.7%] flex-col mb-1 justify-start items-center rounded-md ">
             <View
              className="w-[100%] h-[40%] b g-white flex-row p-1 justify-start items-center rounded-xl ">
                      <View
                      className="w-[25%] h-[100%] gap- 1 flex-col justify-start items-center">
                           <Image
                            className="w-5 h-5"
                            source={getIcon(userTalent.name)}
                            resizeMode='cover'/>
                            <Text
                            style={{fontSize:7}}
                            className="text-center text-sm font-black text-white">
                                {userTalent.name}
                            </Text>
                      </View>
                      <View
                      className="w-[50%] h-[100%] gap- 1 flex-col justify-between items-center">
                            <Text
                            style={{fontSize:8}}
                            className="text-center text-sm font-black text-yellow-400">
                                {userPost.status}
                            </Text>
                            <Text
                            style={{fontSize:11}}
                            className="text-center text-sm font-black mt-auto text-yellow-400">
                                {userTalent.contestants.length}
                            </Text>
                            <Text
                            style={{fontSize:8}}
                            className="text-center text-sm font-black text-white">
                                Contestants
                            </Text>
                      </View>
                      <View
                      className="w-[25%] h-[100%] gap- 1 flex-col justify-start items-center">
                           <Image
                            className="w-5 h-5"
                            source={getIcon(userTalent.region)}
                            resizeMode='cover'/>
                            <Text
                            style={{fontSize:7}}
                            className="text-center text-sm font-black text-white">
                                {userTalent.region}
                            </Text>
                      </View>
                     
              </View>

              <View
              className=" w-[100%] h-[60%] b g-white flex-col p-1 justify-start items-center rounded-xl ">
                      <View
                      className="w-[100%] h-[20%] flex-row text-center justify-between items-center ">  
                        {userPost.status == "stage" &&  (
                            <>
                           <View
                           className="flex-row w-[40%] h-[100%] py- 1  justify-evenly items-center">
                                  <Text
                                     style={{fontSize:8}}
                                     className="text-center text-sm font-black text-white">
                                      {rank <4 ? "TOP ":"Rank"}
                                  </Text>
                                  <Text
                                     style={{fontSize:9}}
                                     className="text-center border-b- 2 border-white text-sm font-black text-yellow-400">
                                       {rank}
                                  </Text>
                           </View>
                           <View
                           className="flex-1 flex-row w-[60%] justify-evenly items-center">
                                  <Text
                                  style={{fontSize:9}}
                                      className="text-center text-sm">
                                          💙 
                                  </Text>
                                  <Text
                                      style={{fontSize:9}}
                                      className="text-center text-sm font-black text-white">
                                          {userParticipation.votes}
                                   </Text>
                                  <Text
                                      style={{fontSize:9}}
                                      className="text-center text-sm font-black text-white">
                                          votes
                                  </Text>
                           </View>
                           </>
                        )} 
                      </View>
                      <View
                        className="w-[100%] h-[80%] p-1 justify-center items-center rounded-md">
                           <Image
                            className="w-[100%] h-[100%] rounded-lg"
                            source={{uri:userPost && userPost.thumbNail_URL}}
                            resizeMode='cover'/>
                                <Image
                                className="absolute w-4 h-4 rounded-xl"
                                source={icons.play}
                                resizeMode='cover'/>
                      </View>
                      
              </View>
           
        </TouchableOpacity>
          
    // </View>
  )
}