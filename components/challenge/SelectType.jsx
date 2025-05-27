import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { icons } from '../../constants';

export default function SelectType({data,height,width ,setIsSelectorVisible ,setSelectedType , selectedType}) {

    useEffect(() => {
      // setTimeout(() => {
      //   setIsSelectorVisible(false)
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
  <View
  className="w-full min-h-[85%] absolute bottom-0 flex-col justify-start items-center rounded-t-xl bg-black ">
     <TouchableOpacity
                    className="absolute top-[0]  justify-center items-center  w-12 h-12 border-2   rounded-full"
                    onPressIn={()=>{setIsSelectorVisible(false)}}
                    >
                        <Image   
                        source={icons.x}
                        className=" w-10 h-10 bg-white rounded-full"
                        resizeMethod='contain'
                        />
    </TouchableOpacity>
    <View 
      className= " w-[95%] h-[30%] flex-row  justify-center items-center p-4 gap-4 ">
           <Text
             className= "text-gray-200 font-black" >
                  Select Challenge Type Bellow
           </Text>
    </View>

    <View 
      // style={{left:(width * 0.05/2) ,top:height * 0.75/2 - height*0.1}}
      className= " w-[95%]  flex-row flex-wrap justify-center items-center p-4 gap-4  bg-gray-800 rounded-lg border-4 border-blue-500">
         
         
         {data.map((element,index)=>
          {
                 return  (
                    <TouchableOpacity
                     key={index}
                     style={{backgroundColor: selectedType == element.value && "black",width:width/6, height:width/6}}
                     onPress={()=>setIsSelectorVisible(false)}
                     onPressIn={()=>{setSelectedType(element.value)}}
                    //  style={{}}
                     className=" flex-col px-2 py-2 rounded-lg justify-center gap-2 items-center">
                       
                        <Image
                        source={getIcon(element.value)}
                        resizeMethod='cover'
                        // style={{width:width/6, height:width/6}}
                        className="w-[75%] h-[80%]" />
                         <View
                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                
                                <Text 
                                    style={{fontSize:9}}
                                    className="text-white font-black"> 
                                    {element.value}
                                </Text>

                        </View>
                    </TouchableOpacity>

                   
                    
                  )
          })
         }
         
    </View>
  </View>
  )
}