import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SelectFriends({data,height,width ,setIsFriendListVisible ,setSelectedFriends , selectedFriends}) {

    const [displayData,setDisplayData] = useState(data.slice(0,10))
    const [index,setIndex] = useState(1)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState(data.length > 10 ? true:false)


    useEffect(() => {
        // setTimeout(() => {
        //   setIsFriendListVisible(false)
        // }, 15000);
      }, [])
      
    const handleNext = ()=> {
       const d = data.slice(index * 10 , (index+1)*10)
       setDisplayData([...d])
      //  if(index >= 1) setMoreLeft(true)
      //  if(data.length < (index+1)*10) setMoreRight(false) 
       setIndex(prev => prev+1 )
    }
     
    const handleBack = ()=> {
      const d = data.slice((index-2) * 10 , (index-1) * 10)
      setDisplayData([...d])
      // if(index >= 1) setMoreLeft(true)
      // if(data.length < (index+1)*10) setMoreRight(false) 
      setIndex(prev => prev-1 )
   }
    
   useEffect(() => {
    (index -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
    (data.length < (index)*10)? setMoreRight(false) :setMoreRight(true)
  }, [index])

    return (

    <View 
    style={{top:Platform.OS == "ios"?50:0}}
    className="w-full h-[35%] absolute  flex-col justify-start items-center rounded-3xl border-4 border-blue-400 bg-[#74a0e7]">
     
     <TouchableOpacity
                    className="absolute top-0 left-0  justify-center items-center  w-12 h-12    rounded-full"
                    onPressIn={()=>{setIsFriendListVisible(false)}}
                    >
                        <Image   
                        source={icons.x}
                        className=" w-10 h-10 bg-white rounded-full"
                        />
     </TouchableOpacity>
     <View 
      className= " w-[95%] h-[20%] flex-row  justify-center items-center  ">
           <Text
             style={{fontSize:width/35}}
             className= "text-gray-800 font-black" >
                  Invite friends to challenge you 
           </Text>
     </View>
      <View 
        // style={{left:(width * 0.05/2) ,top:height * 0.9/2}}
        className= " w-[95%] h-[60%] flex-row flex-wrap justify-center items-center  gap-2 py-2  bg-gray-700 rounded-lg border-4 border-blue-600">
        
           
           {displayData.map((element,index)=>
            {
                   return  (
                      <TouchableOpacity
                       key={index}
                   
                       style={{backgroundColor: selectedFriends.find(friend => friend.sender_id == element.sender_id) && "black"
                        ,width:width/6, height:width/6
                       }}
                       onPress={()=> {
                        if(selectedFriends.find(friend => friend.sender_id == element.sender_id) )
                             {
                                 const fds = selectedFriends.filter(friend => friend.sender_id !== element.sender_id) 
                                 setSelectedFriends(fds)
                             }
                        else {
                          if(selectedFriends.length<10){
                            let dfs = selectedFriends
                            dfs.push(element)
                            setSelectedFriends([...dfs])
                          }
                        }     
                              
                       }}
                    //    onPressIn={()=>{setSelectedType(element.value)}}
                       className="w-[60px] h-[40%] flex-col px-2 py-2 rounded-lg justify-center gap-1 items-center">
                         
                          <Image
                          source={{uri:element.profile_img}}
                          resizeMethod='contain'
                          style={{width:width/11, height:width/11}}
                          className=" rounded-full" />
                           <View
                                  className=" flex-row justify-center items-center">
                  
                                  <Text 
                                      style={{fontSize:9}}
                                      className="text-white font-black"> 
                                      {element.name.slice(0,8)}
                                  </Text>
  
                          </View>
                      </TouchableOpacity>
                      
                    )
            })
           }
      </View>

      <View 
      className= " w-[95%] h-[20%] flex-row px-4 justify-between items-center  ">
          
          {/* {moreLeft && ( */}
              <TouchableOpacity
                className=" justify-center items-center   "
                onPressIn={handleBack}
                >
                    <Image   
                    source={moreLeft?icons.leftArrow:""}
                    className=" w-8 h-8 rounded-full"
                    />
              </TouchableOpacity>
          {/* )} */}
          {moreRight && (
              <TouchableOpacity
              className=" justify-center items-center   "
              onPressIn={handleNext}
              >
                  <Image   
                  source={icons.rightArrow}
                  className=" w-8 h-8 rounded-full"
                  />
             </TouchableOpacity>
          )}
            
     </View>

    </View>

    )
}