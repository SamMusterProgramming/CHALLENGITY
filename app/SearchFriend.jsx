import { View, Text, TextInput, Image, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator, Platform} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { icons, images } from '../constants'
import { router } from 'expo-router'
import { searchUsers } from '../apiCalls'
import { useGlobalContext } from '../context/GlobalProvider'

import DisplayUser from '../components/profile/DisplayUser'
import { SafeAreaView } from 'react-native-safe-area-context'




// import UserDisplayer from '../components/profile/userDisplayer'

export default function SearchFriend() {

  const {user} = useGlobalContext()
  const [searchText ,setSearchText] = useState("")
  const [placeHold ,setPlaceHold] = useState("Search for People")
  const [searchData , setSearchData] = useState({users:[]})
  const [isFetching , setIsFetching] = useState(false)
  const {width,heigh} = useWindowDimensions()


  const renderHeader = useMemo(() => ( 
    <View
    className =" w-[100%] h-[15vh] flex-col bg-[#0d61de] mb-2 justify-start rounded-tl-[50px] rounded-tr-[50px] items-center">
          <View
          // bg-[#e6eaf0]
                  className="w-[100%] h-[50%]  rounded-tl-[50px] rounded-tr-[50px] flex-row bg-[#0d61de] justify-between items-center  ">
                     
                      <TouchableOpacity
                          onPress={()=> router.back()}
                          // style={{height:heigh * 0.07}}
                          className= "w-[15%] h-[100%]  bg-[#11161d] rounded-tl-[50px] flex-row justify-center items-center ">
                          <Image
                              source={icons.back1} 
                              resizeMethod='contain'
                              style={{width:width/12 ,height:width/12}}
                              className=""
                              />
                      </TouchableOpacity>

                     <View
                      className= "w-[70%] h-[100%]  bg-[#11161d]  flex-row justify-center items-center " >
                              <TouchableOpacity
                                 onPress={()=>{router.navigate("profile")}}
                                 className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                  <Image
                                     source={{uri:user.profile_img}} 
                                     resizeMethod='contain'
                                     style={{width:width/11 ,height:width/11}}
                                     className ="rounded-full"
                                  />
                                  <Text
                                  style={{fontSize:9}}
                                  className="text-gray-600 font-bold">
                                    Profile
                                  </Text>
                              </TouchableOpacity> 

                              <TouchableOpacity
                                 onPress={()=>{router.navigate("CoverNewChallenge")}}
                                 className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                  <Image
                                     source={icons.newChallenge} 
                                     resizeMethod='contain'
                                     style={{width:width/11 ,height:width/11}}
                                     className ="rounded-full"
                                  />
                                  <Text
                                  style={{fontSize:9}}
                                  className="text-gray-700 font-bold">
                                    New Challenge
                                  </Text>
                              </TouchableOpacity>   

                              <TouchableOpacity
                                 onPress={()=>{router.navigate("timeline")}}
                                 className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                  <Image
                                     source={icons.home} 
                                     resizeMethod='contain'
                                     style={{width:width/11 ,height:width/11}}
                                     className ="rounded-full"
                                  />
                                  <Text
                                  style={{fontSize:9}}
                                  className="text-gray-700 font-bold">
                                    Home
                                  </Text>
                              </TouchableOpacity>   
                     </View>
                    
                      <TouchableOpacity
                           
                          className= "w-[15%] h-[100%]  bg-[#1d242e] rounded-tr-[50px] flex-row justify-center items-center ">
                          <Image
                          source={icons.next} 
                          resizeMethod='fill'
                          className="w-9 h-9 "
                          />
                      </TouchableOpacity>          
          </View>

          <View
                  className="w-[100%] h-[50%]   flex-row justify-center items-center  ">
                  <View 
                  style={{  height:width/9 }}  
                  className=" w-[95%] h-[30%] px-4 border-gray-200 border-2  bg-white rounded-lg
                  flex-row justify-center items-center">
                      <TextInput
                          style={{fontSize:width/30}}
                          className=" text-gray-600 w-[100%]  bg- h-[100%] px-3 rounded-lg
                          font-bold "
                          placeholder={placeHold}
                          placeholderTextColor="#7b7b8b"
                          value={searchText !== "" ? searchText: placeHold}
                          keyboardType= "default"
                          onFocus={() => placeHold === "Search for People" && setPlaceHold("")}
                          onChangeText={(text)=> setSearchText(text)}
                        />
                      <TouchableOpacity onPress={()=> {}}>
                              <Image 
                              className ="w-8 h-8 "
                              resizeMode='contain'
                              source={icons.search} />
                      </TouchableOpacity>                
                  </View >
          </View>      
   </View>
  ),[placeHold ,setPlaceHold ,searchText,setSearchText,width,heigh])
  

  const renderItem = ({ item, index }) => {  
    return  <DisplayUser key={index}  userData={item} />
  };

  const renderFooter= () => {  
    return isFetching ?
            <View
            className="w-[100%] min-h-[100%]   flex-col justify-center items-center">
                     <ActivityIndicator size="large" color="white" />
            </View>
  
   : searchText !== "" && searchData.users.length == 0 ? 
           ( <View
                 className="w-[100%] h-[100%]   flex-col justify-center items-center">
                 <Image 
                 className="w-40 h-40"
                 source={images.empty}
                 />
             </View>
            )
           : 
            (
              <View
                className="w-[100%] min-h-[0] bg- ">
              </View>
            ) 

};

  useEffect(() => {
     searchText !== "" && setIsFetching(true)
     searchText !== "" ? searchUsers(user._id , searchText , setSearchData,setIsFetching) : setSearchData({users:[]})
     return () =>{
      setSearchData({users:[]})
     }
  }, [searchText])

//   useEffect(() => {
//    console.log(searchData)
//  }, [searchData])
  
  return (
    <SafeAreaView
      className="flex-1 bg-primary">
      <View
      className="flex-1 flex-col justify-start items-center">
             
             <View
              style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
              className=" w-[100%] h-[17%] flex-col bg-[#b7c6f6]  mb-2 justify-center rounded-tl-[50px] rounded-tr-[50px] items-center">
                    <View
                            style={{borderTopRightRadius:0}}
                            className="w-[100%] h-[40%]  rounded-tl-[50px] px-2 rounded-tr-[50px] flex-row justify-between items-center  ">
                              
                                <TouchableOpacity
                                    onPress={()=> router.back()}
                                    // style={{height:heigh * 0.07}}
                                    className= "w-[15%] h-[100%]  bg-w rounded-tl-[50px] flex-row justify-center items-center ">
                                    <Image
                                        source={icons.back1} 
                                        resizeMethod='contain'
                                        style={{width:width/13 ,height:width/13}}
                                        className=""
                                        />
                                </TouchableOpacity>

                              <View
                                className= "w-[70%] h-[100%]  bg-[#4d57a4] rounded-xl flex-row justify-center items-center " >
                                        <TouchableOpacity
                                          onPress={()=>{router.navigate("profile")}}
                                          className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                            <Image
                                              source={{uri:user.profile_img}} 
                                              resizeMethod='contain'
                                              style={{width:width/12 ,height:width/12}}
                                              className ="rounded-full"
                                            />
                                            <Text
                                            style={{fontSize:8}}
                                            className="text-gray-100 font-bold">
                                              Profile
                                            </Text>
                                        </TouchableOpacity> 

                                        <TouchableOpacity
                                          onPress={()=>{router.navigate("CoverNewChallenge")}}
                                          className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                            <Image
                                              source={icons.newChallenge} 
                                              resizeMethod='contain'
                                              style={{width:width/12 ,height:width/12}}
                                              className ="rounded-full"
                                            />
                                            <Text
                                            style={{fontSize:8}}
                                            className="text-gray-100 font-bold">
                                              New Challenge
                                            </Text>
                                        </TouchableOpacity>   

                                        <TouchableOpacity
                                          onPress={()=>{router.navigate("timeline")}}
                                          className= "w-[33%] h-[100%]  gap-1 flex-col justify-center items-center ">
                                            <Image
                                              source={icons.home} 
                                              resizeMethod='contain'
                                              style={{width:width/12 ,height:width/12}}
                                              className ="rounded-full"
                                            />
                                            <Text
                                            style={{fontSize:8}}
                                            className="text-gray-100 font-bold">
                                              Home
                                            </Text>
                                        </TouchableOpacity>   
                              </View>
                              
                                <TouchableOpacity
                                    
                                    className= "w-[15%] h-[100%]  bg-wh rounded-tr-[50px] flex-row justify-center items-center ">
                                    <Image
                                    source={icons.next} 
                                    resizeMethod='fill'
                                    className="w-9 h-9 "
                                    />
                                </TouchableOpacity>          
                    </View>

                    <View
                            className="w-[100%] h-[50%] px-2  flex-row justify-center items-center  ">
                            <View 
                            style={{  height:width/9 }}  
                            className=" w-[100%] h-[30%] px-4 border-gray-200 border-2  bg-white rounded-lg
                            flex-row justify-center items-center">
                                <TextInput
                                    style={{fontSize:width/35}}
                                    className=" text-gray-600 w-[100%]  bg- h-[100%] px-3 rounded-lg
                                     "
                                    placeholder={placeHold}
                                    placeholderTextColor="#7b7b8b"
                                    value={searchText !== "" ? searchText: placeHold}
                                    keyboardType= "default"
                                    onFocus={() => placeHold === "Search for People" && setPlaceHold("")}
                                    onChangeText={(text)=> setSearchText(text)}
                                  />
                                <TouchableOpacity onPress={()=> {}}>
                                        <Image 
                                        className ="w-8 h-8 "
                                        resizeMode='contain'
                                        source={icons.search} />
                                </TouchableOpacity>                
                            </View >
                    </View>      
           </View>
           <View
           className="w-[100%] h-[76%] flex-col justify-start items-center ">  
                  
                  {  
                     isFetching ?
                            <View
                            className="w-[100%] h-[100%]   flex-col justify-center items-center">
                                    <ActivityIndicator size="large" color="white" />
                            </View>
                  
                     : searchText !== "" && searchData.users.length == 0 ? 
                          ( <View
                                className="w-[100%] h-[100%]   flex-col justify-center items-center">
                                <Image 
                                className="w-40 h-40"
                                source={images.empty}
                                />
                            </View>
                            )
                    : 
                            (
                              <FlatList 
                              data={searchData.users.length !==0 && searchData.users}
                              keyExtractor={(item)=> item._id}
                              renderItem={ renderItem }
                              // ListHeaderComponent={renderHeader}
                              ListFooterComponent={renderFooter}
                              pagingEnabled={false}
                             />       
                            ) 
                  }      
           </View>           
           <View
             className="w-[100%] h-[7%] bg-[#a8b9d4] flex-row justify-center items-center">
                 <Text
                   className="text-gray-700 font-bold "
                   style={{fontSize:12}}>
                       Search for friend
                 </Text>
           </View>
      </View>     
    </SafeAreaView>
  
  )
}