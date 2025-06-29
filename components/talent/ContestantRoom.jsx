import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import { MotiView } from 'moti';
import { icons } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { getPostData } from '../../apiCalls';
// import Checkbox from 'expo-checkbox'; 

const ContestantRoom = ({regionIcon , selectedIcon ,user , userContestantStatus ,userParticipation , confirmAction , setShow, setSelectedContestant}) => {

  const [agreed, setAgreed] = useState(false);
  const [showList, setShowList] = useState(false);
  const [postData , setPostData] = useState(null)

  useEffect(() => {
    userParticipation && getPostData(userParticipation._id,setPostData)
  }, [])


  const contestantSpotsAvailable = true; // This could come from API

  const contestants = [
    {
      id: '1',
      name: 'Luca Romano',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      country: 'Italy',
      city: 'Naples',
      flag: '🇮🇹',
    },
    {
      id: '2',
      name: 'Aisha Karim',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      country: 'Morocco',
      city: 'Casablanca',
      flag: '🇲🇦',
    },
  ];

  return (
  
    <View className="flex-1 g-white flex-col justify-start gap-4 px-6 pt-3">
            <MotiView
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 300, type: 'timing', duration: 600 }}
                className="mb- gap-4"
             >
                <Text className="text-center text-3xl font-bold text-white mb-">
                     🌟
                </Text>
               <View
                className = "flex-row justify-center items-end gap-2">
                    <Image
                    className ="w-14 h-14 "
                    resizeMethod='contain'
                    source={selectedIcon} />
                    <Text className="text-center text-xl font-bold text-white mb-">
                       Contestant Room
                    </Text>
                    <Image
                    className ="w-14 h-14 "
                    resizeMethod='contain'
                    source={regionIcon} />
               </View>
               
                {/* Description */}
                <Text className="text-center text-base px-6 text-gray-300 mb-">
                    Watch contestants perform, vote for your favorite, and if there's an open spot, join the contest yourself!
                </Text>
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateY: 40 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 600, type: 'timing', duration: 600 }}
              className="flex1 flex-col justify-center items-center gap-2 mb">
                      <TouchableOpacity
                                    className="-[60%] -[90%] flex-col justify-center items-center">
                                      <Image 
                                        className="w-[60px] h-[60px] rounded-full"
                                        resizeMethod='cover'
                                        source={{uri:user.profile_img}}/>
                      </TouchableOpacity>
                     <View
                                  className = "-[100%] -[90%]  gap- flex-col text-center mb-4 justify-center rounded-t-lg g-white items-center ">
                                        <View
                                         className = "-[100%] -[50%]  gap- flex-row mb- justify-center g-white items-center ">
                                                       <Text 
                                                        style ={{fontSize:12}}
                                                            className="text-xl font-black mb- text-white"> 
                                                            {user.name}
                                                       </Text>
                                        </View>
                                        <View
                                         className = "-[90%] -[50%] px-  gap- flex-row  rounded-t-lg justify-center g-red-600 items-center ">
                                             
                                                   <Text 
                                                        style ={{fontSize:12}}
                                                        className="text-gray-300 font-bold -auto text-base"> 
                                                        {userContestantStatus == "P" ?"You are a Contestant " : "you are not a contestant, Join Below" }
                                                  </Text>
                                        </View>                                       
                     </View>
                     <TouchableOpacity
                                    style ={{backgroundColor : userContestantStatus == "NP" ? "green": "red"}}
                                    onPress={confirmAction}
                                    className="w-[50%] -[70%] px-4 py-2 flex-row g-green-600 rounded-lg justify-center items-center">
                                       <Text 
                                          style ={{fontSize:12}}
                                          className="text-xl font-black mb- text-gray-200"> 
                                            {userContestantStatus === "NP" ? "Join" : "Resign"}  
                                       </Text>
                     </TouchableOpacity>
                              
                
            </MotiView> 

          {userParticipation && postData && (
             <MotiView
             from={{ opacity: 0, translateY: 40 }}
             animate={{ opacity: 1, translateY: 0 }}
             transition={{ delay: 800, type: 'timing', duration: 600 }}
             className=" w-[full] flex-col px-6 justify-center g-white items-center gap- mb-">
                     <TouchableOpacity
                      onPress={()=> {
                        setShow(true)
                        setSelectedContestant(userParticipation)
                     }}
                                   className="w-[50%] h-[120px] bg-[#2a2626] p- rounded-l-md flex-col justify-center items-center">
                                     <Image 
                                       className="w-[95%] h-[115px] rounded-md"
                                       resizeMethod='contain'
                                       source={{uri:userParticipation.thumbNail_URL}}/>

                                    <View 
                                        className={
                                                "w-full h-full flex-col absolute top- justify-center items-center"
                                        }>
                                        <Image 
                                        className="w-14 h-14 opacity-100"
                                        source={icons.play}/>
                                    </View>
                     </TouchableOpacity>
                    <View
                                 className = "w-[100%] h-[40px] px-  gap- flex-row text-center mb- justify-evenly g-[#2a2626] items-center ">
                                       <View
                                        className = "-[100%] -[50%]  gap-2 py- flex-row mb- justify-center g-white items-end ">
                                                     <Image
                                                            source={icons.vote}
                                                            className ="w-8 h-8 rounded-full"
                                                            resizeMethod='fill'
                                                        />
                                                     <Text 
                                                            style ={{fontSize:10}}
                                                            className="text-xl font-bold pt-4  text-white"> 
                                                             {postData.votes.length}
                                                     </Text>
                                       </View>
                                       <View
                                        className = "-[100%] -[50%]  gap-2 flex-row mb- justify-center g-white items-end ">
                                                     <Image
                                                            source={icons.like}
                                                            className ="w-8 h-8 rounded-full"
                                                            resizeMethod='fill'
                                                        />
                                                     <Text 
                                                            style ={{fontSize:10}}
                                                            className="text-xl font-bold pt-4 text-white"> 
                                                              {postData.likes.length}
                                                     </Text>
                                       </View>     
                                       <View
                                         className = "-[100%] -[50%]  gap-2 flex-row mb- justify-center g-white items-end ">
                                                    <Ionicons name="chatbubble" size={20} color="orange"/>
                                                    <Text 
                                                    style ={{fontSize:10}}
                                                    className="text-white pt-4 text-sm font-bold">
                                                        {postData.comments.length}
                                                    </Text>
                                        </View>   
                                        <View
                                        className = "-[100%] -[50%]  gap-2 flex-row mb- justify-center g-white items-end ">
                                                     <Image
                                                            source={icons.rank}
                                                            className ="w-8 h-8 rounded-full"
                                                            resizeMethod='fill'
                                                        />
                                                     <Text 
                                                            style ={{fontSize:10}}
                                                            className="text-xl font-bold pt-4 text-white"> 
                                                              {userParticipation.rank}                 
                                                     </Text>
                                       </View>                             
                    </View>
                   
               
           </MotiView> 
          )}
           

              
              

     
    </View>
  );
}
export default ContestantRoom;