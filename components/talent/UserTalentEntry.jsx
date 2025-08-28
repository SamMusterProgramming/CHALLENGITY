import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native'
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

  return (
   
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
        className="bg-[#090908] w-[98.7%] p-1 min-h -[32.7%] flex-col mb-1 justify-start items-center rounded-md ">
           
             <View
              className="w-[100%] h- [40%] b g-white flex-row p- 1 justify-between items-center rounded-xl ">
                      <View
                      className="w- [25%] h- [100%] p-1 gap- 1 flex-col justify-start items-center">
                           <Image
                            className="w-7 h-7"
                            source={getIcon(userTalent.name)}
                            resizeMode='cover'/>
                            <Text
                            style={{fontSize:8}}
                            className="text-center text-sm font-black text-white">
                                {userTalent.name}
                            </Text>
                      </View>
                      <View
                      className="w- [50%] h- [100%] gap- 1 flex-col justify-between items-center">
                            <Text
                            style={{fontSize:6}}
                            className="text-center text-sm font-black text-yellow-400">
                                {userPost.status}
                            </Text>
                            <Text
                            style={{fontSize:9}}
                            className="text-center text-sm font-black mt-auto text-white">
                                {userTalent.name} Contest
                            </Text>
                            {/* <Text
                            style={{fontSize:11}}
                            className="text-center text-sm font-black mt-auto text-yellow-400">
                                {userTalent.contestants.length}
                            </Text>
                            <Text
                            style={{fontSize:8}}
                            className="text-center text-sm font-black text-white">
                                Contestants
                            </Text> */}
                      </View>
                      <View
                      className="w- [25%] h- [100%] p-1 gap- 1 flex-col justify-start items-center">
                           <Image
                            className="w-7 h-7"
                            source={getIcon(userTalent.region)}
                            resizeMode='cover'/>
                            <Text
                            style={{fontSize:8}}
                            className="text-center text-sm font-black text-white">
                                {userTalent.region}
                            </Text>
                      </View>
                     
              </View>

              <View
              className=" w-[100%] flex-1 bg-[#040404] flex-row px-1 py-1 justify-between items-center rounded-lg">
                   
                      <View
                      className="w-[30%] h-[100%] b g-[#2f2828] flex-coltext-center justify-center ga4 items-center ">  
                       
                        {userPost.status == "YOU ARE ON STAGE" &&  (
                            <>
                                <View
                                    className="flex -1 bg-[#181717] flex-row text-center justify-center gap-4 items-center ">  
                                    <View
                                    className="flex-row w- [40%] h -[100%] py- 1 gap-1 justify-center items-center">
                                            <Text
                                                style={{fontSize:7}}
                                                className="text-center text-sm font-black text-white">
                                                {rank < 4 ? "TOP ":"Rank"}
                                            </Text>
                                            <Text
                                                style={{fontSize:8}}
                                                className="text-center border-b- 2 border-white text-sm font-black text-yellow-400">
                                                {rank}
                                            </Text>
                                    </View>
                                    <View
                                    className=" flex-row  gap-1 justify-center items-center">
                                            <Text
                                            style={{fontSize:8}}
                                                className="text-center text-sm">
                                                    💙 
                                            </Text>
                                            <Text
                                                style={{fontSize:8}}
                                                className="text-center text-sm font-black text-white">
                                                    {userParticipation.votes}
                                            </Text>
                                            <Text
                                                style={{fontSize:8}}
                                                className="text-center text-sm font-black text-white">
                                                    votes
                                            </Text>
                                    </View>
                                </View>
                           </>
                        )} 
                        
                                <View
                                className="w-[100%] flex-1 p-1 justify-center items-center rounded-md">
                                <Image
                                    className="w-[100%] h-[100%] rounded-lg"
                                    source={{uri:userPost && userPost.thumbNail_URL}}
                                    resizeMode='cover'/>
                                        <Image
                                        className="absolute w-4 h-4 rounded-xl"
                                        source={icons.play}
                                        resizeMode='cover'/>
                                </View>

                                <View
                                    className="flex-row w- [40%] h -[100%]  1 gap-1 justify-center items-center">
                                            
                                            <Text
                                                style={{fontSize:8}}
                                                className="text-center border-b- 2 border-white text-sm font-black text-yellow-400">
                                                your Talent
                                            </Text>
                                </View>

                      </View>

                      <View
                       className="w-[68%] h-[100%] b g-[#1d2436] flex-coltext-center justify-center gap -4 items-center "> 
                                 <View
                                  className="flex-row justify-center items-center gap-2 ">
                                          <Text
                                                style={{fontSize:8}}
                                                className="text-center text-sm font-black  text-yellow-400">
                                                    Stage
                                            </Text>
                                          
                                 </View>
                                 <ScrollView 
                                    style={{}}
                                    className ="w-[100%] flex-1 bg-[#302d2d] rounded-xl b g-[#222d37]"
                                    horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View
                                        className="max-w-[100%] max-h-[100%] rounded-xl p- 1 flex-col justify-start gap -1 items-center">
                                            <View
                                            className="w-[100%] min-h-[100%] flex-row flex-wrap justify-start gap- 2 items-center"> 
                                                {userTalent.contestants.map((p,index) =>{
                                                return(
                                                <View 
                                                key={index}
                                                className="w- [20%] p-1 min-h- [30%] flex-row justify-center items-center">
                                                    <Image
                                                        className="w-[40px] h-[30px] rounded-lg"
                                                        source={{uri:p.thumbNail_URL || "https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"}}
                                                        resizeMethod='contain' />
                                                        <Image
                                                        className="absolute w-3 h-3 rounded-full"
                                                        source={icons.play}
                                                        resizeMethod='cover' />
                                                </View>)
                                                })}
                                            </View> 
                                        </View>
                                 </ScrollView>
                                 <View
                                 className="flex-row justify-center items-center gap-2 ">
                                          <Text
                                                style={{fontSize:8}}
                                                className="text-center text-sm font-black  text-yellow-400">
                                                    {userTalent.contestants.length}
                                            </Text>
                                            <Text
                                                style={{fontSize:8}}
                                                className="text-center text-sm font-black text-white">
                                                    Contestants
                                            </Text>
                                 </View>
                       </View>
                      
              </View>
           
        </TouchableOpacity>
          
    // </View>
  )
}