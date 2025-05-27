import { View, Text, TouchableOpacity, Image, useWindowDimensions, TextInput, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants';
import { router } from 'expo-router';
import SelectType from '../components/challenge/SelectType';
import { Audience, challengeType  , privacyData } from '../utilities/TypeData'
import SelectPrivacy from '../components/challenge/SelectPrivacy';
import SelectMode from '../components/challenge/SelectMode';
import { useGlobalContext } from '../context/GlobalProvider';
import SelectFriends from '../components/challenge/SelectFriends';
import CustomAlert from '../components/custom/CustomAlert';

export default function CoverNewChallenge() {

    const{user,setParticipateChallenges,setUserPublicChallenges,setUserPrivateChallenges,userFriendData} = useGlobalContext()

    const [selectedType,setSelectedType] = useState('Adventure')
    const [selectedPrivacy,setSelectedPrivacy] = useState('Public')
    const [selectedAudience, setSelectedAudience] = useState("Open");
    const [isSelectorVisible,setIsSelectorVisible] = useState(false)
    const [isPrivacySelectorVisible,setIsPrivacySelectorVisible] = useState(false)
    const [isModeVisible,setIsModeVisible] = useState(false)
    const [isFriendListVisible,setIsFriendListVisible] = useState(false)

    const [description ,setDescription] = useState("")
    const [currentPlaceholder, setCurrentPlaceholder] = useState("Add a description");
    const [friendList ,setFriendList] = useState(userFriendData.friends)
    const [selectedFriends ,setSelectedFriends] = useState([])
    const [selectAll,setSelectAll] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState("");
    const [text,setText] = useState("")


    const{width ,height} = useWindowDimensions()
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

      const handleContinue = ()=> {
         if(description == ""){
            setText("Add a Description to your challenge to continue")
            setIsModalVisible(true)
            setAction("OK")
            return true;
         }
         if(selectedPrivacy == "Private" && selectedFriends.length == 0){
            setText("Invite at least one friend to Continue ")
            setIsModalVisible(true)
            setAction("OK")
            return true;
         }
         router.replace({ pathname: '/RecordChallenge',params: {
            description:description,
            challengeType:selectedType , 
            challengePrivacy:selectedPrivacy  ,
            challengeMode : selectedAudience ,
            invited_friends: JSON.stringify(selectedFriends)
          } }) 
      }

      useEffect(() => {
        if(isSelectorVisible) {
            setIsFriendListVisible(false)
            setIsModeVisible(false)
            setIsPrivacySelectorVisible(false)
        }
      }, [isSelectorVisible])
      
      useEffect(() => {
        if(isPrivacySelectorVisible) {
            setIsFriendListVisible(false)
            setIsModeVisible(false)
            setIsSelectorVisible(false)
        }
      }, [isPrivacySelectorVisible])

      useEffect(() => {
        if(isFriendListVisible) {
            setIsSelectorVisible(false)
            setIsModeVisible(false)
            setIsPrivacySelectorVisible(false)
        }
      }, [isFriendListVisible])
      
      useEffect(() => {
        if(isModeVisible) {
            setIsFriendListVisible(false)
            setIsPrivacySelectorVisible(false)
            setIsSelectorVisible(false)
            setSelectedFriends([])
        }
      }, [isModeVisible])

      useEffect(() => {
       return() => {
        setSelectedFriends([])
        setDescription("")
       }
      }, [])

  return (
    
    <SafeAreaView className="flex-1 bg-primary" >
              <View className=" h-full flex-col justify-start gap-2 border-l-2 border-r-2 b-[#a9cdf0] items-center">

                          <View
                          style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
                          className =" w-[100%] h-[17%] flex-col bg-[#a9cdf0] mb-2 justify-evenly rounded-tl-[50px] rounded-tr-[50px] items-center">
                                  <View
                                          style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
                                          className="w-[100%] h-[40%]  rounded-tl-[50px] rounded-tr-[50px] flex-row  justify-between items-center  ">
                                            
                                              <TouchableOpacity
                                                  onPress={()=> router.back()}
                                                  // style={{height:heigh * 0.07}}
                                                  className= "w-[15%] h-[100%]  bg- rounded-tl-[50px] flex-row justify-center items-center ">
                                                  <Image
                                                      source={icons.back1} 
                                                      resizeMethod='contain'
                                                      style={{width:width/13 ,height:width/13}}
                                                      className=""
                                                      />
                                              </TouchableOpacity>

                                            <View
                                              className= "w-[70%] h-[100%]  bg-[#183755] rounded-xl flex-row justify-center items-center " >
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
                                                            style={{width:width/13 ,height:width/13}}
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
                                                            style={{width:width/13 ,height:width/13}}
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
                                                  
                                                  className= "w-[15%] h-[100%]  bg- rounded-tr-[50px] flex-row justify-center items-center ">
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
                                                  style={{fontSize:width/33}}
                                                  className=" text-gray-600 w-[100%] font-bold bg- h-[100%] px-3 rounded-lg
                                                       "
                                                  onChangeText={text => setDescription(text)}
                                                  placeholder={currentPlaceholder}
                                                      //  onFocus={()=>{setCurrentPlaceholder("")}}
                                                       onBlur={()=>{if(description === "" ) setCurrentPlaceholder("Add a description ")}}
                                                       placeholderTextColor='#242625'
                                                  value={description !== "" ? description: currentPlaceholder}
                                                  keyboardType= "default"
                                                  onFocus={() => currentPlaceholder === "Add a description" && setCurrentPlaceholder("")}
                                                  // onChangeText={(text)=> setSearchText(text)}
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
                         

      

                        <View className="w-[100%] h-[16%] px-2    flex-row justify-center gap-2 items-center">
                                 <TouchableOpacity
                                 onPress={()=>setIsSelectorVisible(true)}
                                  className="w-[33%] h-[90%] flex-col justify-center gap-2 items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                            <Text 
                                                style={{fontSize:11}}
                                                className="text-gray-200 text-sm font-bold">
                                                Select Type
                                            </Text>
                                          

                                    </View>
                                     
                                     <Image
                                     source={getIcon(selectedType)}
                                     resizeMethod='contain'
                                     style={{width:width/6, height:width/6}}
                                     className="w-[95%] h-[70%]" />
                                      <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                         
                                            <Text 
                                              style={{fontSize:11}}
                                              className="text-white font-black"> 
                                                {selectedType}
                                            </Text>

                                    </View>
                                 </TouchableOpacity>

                                 <TouchableOpacity
                                  onPress={()=>setIsPrivacySelectorVisible(true)}
                                  className="w-[33%] h-[90%] flex-col justify-center gap-2 items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                            <Text 
                                                style={{fontSize:11}}
                                                className="text-gray-200 text-sm font-bold">
                                                Select Privacy
                                            </Text>
                                    </View>          
                                     <Image
                                     source={getIcon(selectedPrivacy)}
                                     resizeMethod='contain'
                                     style={{width:width/6, height:width/6}}
                                     className="w-[95%] h-[70%]" />
                                     <Text 
                                        style={{fontSize:11}}
                                        className="text-white font-black"> 
                                        {selectedPrivacy}
                                     </Text>
                                 </TouchableOpacity>
                                 {selectedPrivacy == "Private" && (

                                 <TouchableOpacity
                                        onPress={()=>setIsModeVisible(true)}
                                        className="w-[33%] h-[90%] flex-col justify-center gap-2 items-center">
                                        <View
                                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text 
                                                  style={{fontSize:12}}
                                                  className="text-gray-200 text-sm font-bold">
                                                    Select Audience
                                                </Text>
                                        </View>          
                                        <Image
                                        source={getIcon(selectedAudience)}
                                        resizeMethod='contain'
                                        style={{width:width/6, height:width/6}}
                                        className="w-[95%] h-[70%]" />
                                        <Text 
                                            style={{fontSize:11}}
                                            className="text-white font-black"> 
                                            {selectedAudience}
                                        </Text>
                                 </TouchableOpacity>
                                 )}
                        </View>

                       


                      {selectedPrivacy == "Private" && (
                        <>
                           
                  
                            <View className="w-[100%] h-[53%]  px-2 mt-4 flex-row justify-center gap-2 items-center">
                                    <TouchableOpacity
                                        onPress={()=>setIsFriendListVisible(!isFriendListVisible)}
                                        className="w-[36%] h-[90%] flex-col justify-center gap-2 items-center">
                                        <View
                                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text className="text-gray-200 text-sm font-bold">
                                                    Invite Friends
                                                </Text>
                                        </View>
                                        
                                        <Image
                                        source={icons.invites}
                                        resizeMethod='contain'
                                        style={{width:width/6, height:width/6}}
                                        className="w-[95%] h-[70%]" />
                                        <View
                                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text className="text-white font-black"> 
                                                    {selectedFriends.length}{' '}Invites
                                                </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View
                                        className="w-[56%] h-[100%]  border-blue-300 border-4 rounded-xl ">
                                       <ScrollView  className=" flex-1">
                                       <View
                                        className="min-w-[100%] min-h-[100%] flex-row flex-wrap  py-2   justify-center  items-center">
                                        {selectedFriends.map((friend,index) => {
                                             return (<View
                                                key={index}
                                                className="w-[45%] h-[20%] flex-col justify-center items-center">
                                                        <Image
                                                        source={{uri:friend.profile_img}}
                                                        resizeMethod='contain'
                                                        style={{width:width/10, height:width/10}}
                                                        className="w-[40px] h-[40px] rounded-full" />
                                                        <Text 
                                                           style={{fontSize:9}}
                                                           className="text-gray-200 text-sm font-bold">
                                                            {friend.name.slice(0,8)}
                                                        </Text>
                                               </View>  )  
                                        })}
                                        </View>
                                      </ScrollView>     
                                    </View>
                            </View>

                  </>
                      )}



                            
                            <View className="w-[100%] h-[6%]  mt-auto  flex-row justify-center bg-[#a9cdf0] items-center">
                                 <TouchableOpacity
                                    onPress={handleContinue}
                                    className="w-[46%] h-[90%] flex-row mb-4 justify-center rounded-lg gap-2 items-end">
                                     <Text 
                                       style={{fontSize:20}}
                                       className="text-blue-400 text-sm font-black">
                                                Next
                                     </Text>
                                     <Image
                                                        source={icons.forward}
                                                        resizeMethod='contain'
                                                        // style={{width:width/12, height:width/12}}
                                                        className="w-7 h-7 rounded-full" />
                                 </TouchableOpacity>
                               
                        </View>

                     
              </View>

          {isSelectorVisible && (
            <SelectType height={height} width={width} data ={challengeType} selectedType={selectedType} setIsSelectorVisible={setIsSelectorVisible} setSelectedType={setSelectedType}/>
          )}
           {isFriendListVisible && (
            <SelectFriends height={height} width={width} data={friendList} selectedFriends={selectedFriends} setIsFriendListVisible={setIsFriendListVisible} setSelectedFriends={setSelectedFriends}/>
          )}
          {isPrivacySelectorVisible && (
            <SelectPrivacy height={height} width={width} data ={privacyData} selectedPrivacy={selectedPrivacy} setIsPrivacySelectorVisible={setIsPrivacySelectorVisible} setSelectedPrivacy={setSelectedPrivacy}/>
          )}
           {isModeVisible && (
            <SelectMode height={height} width={width} data ={Audience} selectedAudience={selectedAudience} setIsModeVisible={setIsModeVisible} setSelectedAudience={setSelectedAudience}/>
          )}

          {isModalVisible && (
                    <CustomAlert text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
               )}
   </SafeAreaView>
   
  )
}