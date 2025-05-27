import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { icons } from '../../constants';

export default function SelectMode({data,height,width ,setIsModeVisible , selectedAudience ,setSelectedAudience}) {
  
  useEffect(() => {
        // setTimeout(() => {
        //   setIsModeVisible(false)
        // }, 5000);
      }, [])
    const getIcon = (type) => {
        switch(type) {
          case "Public":
            return icons.publi
           break;
          case "Private":
            return icons.priv
           break;
    
           case "Open":
            return icons.open
           break;
          case "Restricted":
            return icons.restricted
           break;
           case "Strict":
            return icons.strict
           break;
    
          case "Adventure":
             return icons.adventure
            break;
          case "Dance":
             return icons.dance 
            break;
          case "Eating":
              return icons.eating 
             break;
          case "Fitness":
              return  icons.fitness 
             break;
          case "Magic":
            return icons.magic 
              break;
          case "Music":
            return icons.music 
               break;
          case "Science":
              return icons.science
               break;
          case "Sport":
               return icons.sport
               break;
          case "Game":
              return icons.game
              break;
          case "Diet":
              return icons.diet
              break;
          default:
            return true;
            // setIcon("gray")
        }
      }

  return (

  <View className="w-full min-h-[85%] absolute bottom-0 flex-col justify-start items-center rounded-t-xl bg-black ">

    <TouchableOpacity
                    className="absolute top-0  justify-center items-center  w-12 h-12 border-2   rounded-full"
                    onPressIn={()=>{setIsModeVisible(false)}}
                    >
                        <Image   
                        source={icons.x}
                        className=" w-12 h-12 bg-white rounded-full"
                        resizeMethod='contain'
                        />
    </TouchableOpacity>
    <View 
      style={{left:(width * 0.1/2) ,top:height * 0.45/2}}
      className= "absolute w-[90%] h-[18%] flex-row flex-wrap justify-between items-center p-4 gap-4  bg-gray-800 rounded-lg border-2 border-white">
          
         {data.map((element,index)=>
          {
                 return  (
                    <TouchableOpacity
                     key={index}
                     style={{backgroundColor: selectedAudience == element.value && "black"
                      // ,width:width/4,height:height/4
                     }}
                     onPress={()=>setIsModeVisible(false)}
                     onPressIn={()=>{setSelectedAudience(element.value)}}
                     className="w-[25%] h-[100%] flex-col justify-center rounded-lg px-2 py-2 gap-2 items-center">
                       
                        <Image
                        source={getIcon(element.value)}
                        resizeMethod='contain'
                        style={{width:width/10, height:width/10}}
                        className="w-[85%] h-[65%]" />
                         <View
                                className="w-[100%] h-[25%] flex-row justify-center items-center">
                                <Text 
                                    style={{fontSize:10}}
                                    className="text-white font-black"> 
                                    {element.value}
                                </Text>
                        </View>
                    </TouchableOpacity>
                    
                  )
          })
         }
    </View>

    <View 
    style={{left:(width * 0.4/2) ,bottom:height * 0.25/2}}
    className="absolute w-[60%] h-[15%] px-2   flex-row justify-center gap-2 items-center">
                                    <View  className=" w-[100%] flex-col justify-start px-2 py-2 items-start   bg-white
                                                rounded-lg   ">
                                            <Text
                                               className="text-gray-500 font-bold text-"
                                               style={{fontSize:9}}>
                                               Note * : {selectedAudience} {''} Mode
                                            
                                            </Text>      
                                            <Text className="text-primary font-bold text-xs"
                                                            style={{fontSize:8}}>
                                                    {selectedAudience === "Open"?"Everyone can see , like and vote in your challenge"
                                                    :selectedAudience === "Restricted"?"Only your friends can , like and vote in see your challenge "
                                                    :"only Invited friends to your challenge can see, like and vote in  your challenge"}
                                                
                                            </Text>                       
                                    </View>   
                                  
     </View>
                  

  </View>
  )
}