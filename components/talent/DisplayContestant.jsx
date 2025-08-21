

import { Animated, View, Button, Image, Text, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '../../constants';
import Countdown from '../custom/CountDown';
import { Ionicons } from '@expo/vector-icons';
import { getPostData } from '../../apiCalls';
import CountryFlag from 'react-native-country-flag';

export default function DisplayContestant({show , height, width ,top ,bottom,left ,right,selectedContestant 
   ,setIsExpired , setIsContestantVisible
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const [isVisible, setIsVisible] = useState(false);
  const [postData , setPostData] = useState(null)
  
  useEffect(() => {
    show && getPostData(selectedContestant._id,setPostData , setIsExpired)
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
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: true, 
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
          
                className = "absolute flex- 1 flex-row justify-center items-center g-white"
                style={{
                    height : height,
                    width : width  ,   
                    top: top && top,
                justifyContent: 'center', 
                alignItems: 'center', 
                }}>
                     <Image
                                    source={{uri:selectedContestant.
                                    thumbNail_URL}}
                                    className ="w-[100%] h-[100%] rounde-full"
                                    resizeMethod='cover'
                                    />
           
            <Animated.View
                className = "absolute w-[100px] h-[100px] borde-4 gap-1 flex-col justify-center items-center borde-white "
                style={{ opacity: fadeAnim , 
                                // top: top && top,
                                // bottom:bottom && bottom ,
                                height : width  * 0.8,
                                width : width  * 0.6   
                }}
                >
                
                <View
                     style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                     className = "w-[100%]  h-[16%] px-4 flex-row g-[#12aaf1] rounded-xl  g-blue-500  justify-between items-center">
                                     <Image
                                        source={{uri:selectedContestant.profile_img}}
                                        className ="w-9 h-9 rounded-full"
                                        resizeMethod='fill'
                                            />
                                     <Text 
                                         style ={{fontSize:12 ,
                                          fontStyle:"italic"
                                         }}
                                         className="text-xl font-black  text-white"> 
                                             {selectedContestant.name}
                                     </Text>
                </View>

                <View 
                      className = "g-white rounded-lg flex-col justify-center  items-center "
                      style={{ width: "100%", height: "60%" }} >
                      <View
                        //  style={{ width: width * 0.8,height :width * 0.8 }}
                         className = "w-[100%]  h-[100%] py- flex-row flex-wrap g-[#12aaf1] rounded-3xl  g-blue-500  justify-center items-center">

                            <View 
                             style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                            className = "w-[50%] h-[50%] py-4 pl-4 gap-2 rounded-br-full rounded-tl-3xl  bg-[#f0e9e9] flex-col justify-start items-start g-[#0c0c0c] ">
                                    {/* <Image
                                    source={icons.vote}
                                    className ="w-10 h-10 rounded-full"
                                    resizeMethod='fill'
                                        /> */}
                                    <Text 
                                         style ={{fontSize:13,
                                          color: "pink"
                                         }}
                                         className="text-xl font-bold  text-white"> 
                                             {"Votes"}
                                    </Text>
                                    <Text 
                                            style ={{fontSize:11}}
                                            className="text-xl font-bold pl-4 text-white"> 
                                            {postData.votes.length} 
                                    </Text>
                            </View>

                            <View 
                             style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                             className = "w-[50%] h-[50%] py-4 pl- gap-2 rounded-bl-full rounded-tr-3xl  g-[#f0e9e9] flex-col justify-start pr-4 items-end g-[#0c0c0c] ">
                                      <Image
                                            source={icons.like}
                                            className ="w-10 h-10 rounded-full"
                                            resizeMethod='fill'
                                          />
                                        <Text 
                                            style ={{fontSize:11}}
                                            className="text-xl font-bold pr-6  text-white"> 
                                             {postData.likes.length} 
                                        </Text>
                            </View>

                            <View 
                              style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                              className = "w-[50%] h-[50%] py-4 pl-4 gap-2 rounded-tr-full rounded-bl-3xl  g-[#f0e9e9]  flex-col justify-end items-start g-[#0c0c0c] ">
                                        <Text 
                                            style ={{fontSize:11}}
                                            className="text-white text-sm pl-2 font-bold">
                                                        {/* {props.comment_count} */}
                                            {postData.comments.length}
                                        </Text>
                                        <Ionicons name="chatbubble" size={26} color="orange"/>

                            </View>

                             <View 
                              style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                              className = "w-[50%] h-[50%] py-4 pr-8 gap-4 rounded-tl-full  rounded-br-3xl  g-[#f0e9e9]  flex-col justify-end items-end g-[#0c0c0c] ">
                                        <Text 
                                            style ={{fontSize:11}}
                                            className="text-white mr-2 text-sm pl- font-bold">
                                             {selectedContestant.rank}
                                        </Text>
                                        <Image
                                            source={icons.rank}
                                            className ="w-8 h-8  rounded-full"
                                            resizeMethod='fill'
                                          />
                             </View>
                            
                             <View
                               style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
                                className= "absolute z-0 bottom-0  opaci-50 flex-col px-4 justify-center items-center">
                                     <Text 
                                            style ={{fontSize:10}}
                                            className="text-xl font-black opacity-100  text-white"> 
                                               {selectedContestant.country || "US"}
                                    </Text>
                                  < CountryFlag
                                            isoCode={selectedContestant.country || "US"}
                                            size={30}
                                       
                                  />
                           </View>

                            <View
                                 className = " absolute w-[100%]  h-[70%] p-2 flex-col g-[#12aaf1] rounded-t-full  justify-center items-center">
                                     <Image
                                         style ={{height : width * 0.8 /4 ,
                                                          width :width * 0.8 /4 }}
                                         source={{uri:selectedContestant.profile_img}}
                                         className ="w-[100px] h-[100px] rounded-full"
                                         resizeMethod='fill'
                                                            />
                            </View>
                     </View>

                 </View>

                 <View
                     style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                     className = "w-[100%]  h-[16%] px-6 flex-row g-[#12aaf1] rounded-xl  g-blue-500  justify-between items-center">
                                     <Text 
                                         style ={{fontSize:13 ,
                                          fontStyle:"italic"
                                         }}
                                         className="text-xl font-black  text-white"> 
                                             Ranked
                                     </Text>

                                     <Text 
                                         style ={{fontSize:13 ,
                                          fontStyle:"italic"
                                         }}
                                         className="text-xl font-black  text-white"> 
                                          {selectedContestant.rank <4 ? "TOP" : "#"}  {selectedContestant.rank}
                                     </Text>
                 </View>

                <Countdown />
            </Animated.View>
     </View>
        </>
     )} 
   </>
  );
}

