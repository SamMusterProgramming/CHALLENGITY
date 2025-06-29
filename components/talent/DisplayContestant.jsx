

import { Animated, View, Button, Image, Text, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '../../constants';
import Countdown from '../custom/CountDown';
import { Ionicons } from '@expo/vector-icons';
import { getPostData } from '../../apiCalls';

export default function DisplayContestant({show , height, width ,top ,bottom,left ,right,selectedContestant 
    , setIsContestantVisible
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const [isVisible, setIsVisible] = useState(false);
  const [postData , setPostData] = useState(null)
  
  useEffect(() => {
    show && getPostData(selectedContestant._id,setPostData)
  }, [show])

  const fadeIn = () => {
    setIsVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1, // Target opacity 1
      duration: 3000, // Animation duration in milliseconds
      useNativeDriver: true, // Use native driver for performance
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Target opacity 0
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsVisible(false)); // Hide component after fade out
  };

  useEffect(() => {
    if(show){
        setIsVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 1, // Target opacity 1
          duration: 1000, // Animation duration in milliseconds
          useNativeDriver: true, // Use native driver for performance
        }).start();

        setTimeout(() => {
        Animated.timing(fadeAnim, {
                    toValue: 0, 
                    duration: 1000,
                    useNativeDriver: true,
                  }).start(
                    () => setIsContestantVisible(false)
                ); 
               
        }, 2000);
    } 
    // else  {
    //     Animated.timing(fadeAnim, {
    //         toValue: 0, // Target opacity 0
    //         duration: 1000,
    //         useNativeDriver: true,
    //       }).start(() => setIsVisible(false)); // Hide component after fade out
    // }
   
  }, [show])
  
  return (
     <>
       {show && selectedContestant && postData && ( 
        <>
           <View
          
                className = "absolute flex-row justify-center items-center g-white"
                style={{
                    height : height,
                    width : width  ,   
                    // top: top && top,
                justifyContent: 'center', 
                alignItems: 'center', 
                }}>
                     <Image
                                    source={{uri:selectedContestant.
                                        thumbNail_URL}}
                                    className ="w-[100%] h-[100%] rounde-full"
                                    resizeMethod='contain'
                                    />
           
            <Animated.View
                className = "absolute w-[100px] h-[100px] borde-4 justify-center items-center borde-white "
                style={{ opacity: fadeAnim , 
                                // top: top && top,
                                // bottom:bottom && bottom ,
                                height : width  * 0.8,
                                width : width  * 0.8   
                }}
                >
                {/* Your component content here */}
                <View 
                className = "g-white rounded-lg flex-col justify-center  items-center "
                style={{ width: "100%", height: "100%" }} >
                      <View
                         style={{ width: width * 0.8,height :width * 0.8 }}
                         className = "w-[100%]  h-[100%] py- flex-row flex-wrap g-[#12aaf1] rounded-3xl  bg-blue-500  justify-center items-center">
                            
                            <View 
                            className = "w-[50%] h-[50%] py-4 pl-8 gap-4 rounded-br-full rounded-tl-3xl  bg-[#f0e9e9] flex-col justify-start items-start g-[#0c0c0c] ">
                                    <Image
                                    source={icons.vote}
                                    className ="w-16 h-16 rounded-full"
                                    resizeMethod='fill'
                                        />
                                    <Text 
                                            style ={{fontSize:16}}
                                            className="text-xl font-bold pl-4 text-black"> 
                                            {postData.votes.length} 
                                    </Text>
                            </View>
                            <View 
                             className = "w-[50%] h-[50%] py-4 pl-8 gap-4 rounded-bl-full rounded-tr-3xl  bg-[#f0e9e9] flex-col justify-start pr-8 items-end g-[#0c0c0c] ">
                                      <Image
                                            source={icons.like}
                                            className ="w-16 h-16 rounded-full"
                                            resizeMethod='fill'
                                          />
                                        <Text 
                                            style ={{fontSize:14}}
                                            className="text-xl font-bold pr-6  text-black"> 
                                             {postData.likes.length} 
                                        </Text>
                            </View>
                            <View 
                              className = "w-[50%] h-[50%] py-4 pl-8 gap-4 rounded-tr-full rounded-bl-3xl  bg-[#f0e9e9]  flex-col justify-end items-start g-[#0c0c0c] ">
                                        <Text 
                                            style ={{fontSize:14}}
                                            className="text-blacklack text-sm pl- font-bold">
                                                        {/* {props.comment_count} */}
                                            {postData.comments.length}
                                        </Text>
                                        <Ionicons name="chatbubble" size={32} color="orange"/>

                            </View>

                             <View 
                              className = "w-[50%] h-[50%] py-4 pr-8 gap-4 rounded-tl-full  rounded-br-3xl  bg-[#f0e9e9]  flex-col justify-end items-end g-[#0c0c0c] ">
                                        <Text 
                                            style ={{fontSize:14}}
                                            className="text-black mr-4 text-sm pl- font-bold">
                                                        {/* {props.comment_count} */}
                                             {selectedContestant.rank}
                                        </Text>
                                        <Image
                                            source={icons.rank}
                                            className ="w-12 h-12  rounded-full"
                                            resizeMethod='fill'
                                          />
                             </View>

                            <View
                                 className = " absolute w-[100%]  h-[70%] p-2 flex-col g-[#12aaf1] rounded-t-full  justify-center items-center">
                                     <Image
                                         style ={{height : width * 0.8 /3 ,
                                                          width :width * 0.8 /3 }}
                                         source={{uri:selectedContestant.profile_img}}
                                         className ="w-[100px] h-[100px] rounded-full"
                                         resizeMethod='fill'
                                                            />
                            </View>
                     </View>

                   
                        
                </View>
                <Countdown />
            </Animated.View>
     </View>
        </>
     )} 
   </>
  );
}

