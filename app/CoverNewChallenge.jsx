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
import MakeSelectionChallengeModal from '../components/modal/MakeSelectionChallengeModel';
import { getInition } from '../helper';

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
    const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false)
    const [selectionType, setSelectionType] = useState(false)
    const [data, setData] = useState([])




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
              <View className=" h-full flex-col justify-start gap- border-l-2 border-r-2 border-[#f6f8f9] items-center">
                         
                          <View
                            className = "min-w-[100%] h-[5%] gap- rounded-tl-x rounded-tr-x flex-row justify-start items-center px-1 bg-[white]">
                                
                                <TouchableOpacity
                                    className="w-[8%] h-[100%] justify-center g-[#eb0a0a] px-1 py-1 rounded-xl items-center opacity  "
                                    onPressIn={()=> router.back()}
                                    >
                                      <Image   
                                      source={icons.x}
                                      className=" w-10 h-10 rounded-full"
                                      />
                              </TouchableOpacity>
                              <View
                              className = "w-[35%] h-[80%] rounded-xl flex-row justify-center items-center px- g-[#fffefd]">
                                      <View className = "px-2 py-1 w-[100%] flex-row justify-center gap-2 items-center">
                                            <Image 
                                              className={ "rounded-full w-7 h-7"}
                                              source={ {uri:user.profile_img} }
                                              resizeMode='cover'
                                              />
                                              <View className="justify-center py-1  items-start h-[80%] flex-col ">
                                                            
                                                            <Text className="font-pmedium  text-sm text-black">
                                                                <Text 
                                                                style={{fontSize:width<= 330? 7:7}}
                                                                className="font-black text-sm text-black">
                                                                    {user.name.length > 13 ?user.name.slice(0,13)+"..." : user.name}
                                                                </Text> 
                                                            </Text>
                                                            <Text 
                                                                style={{fontSize:width<= 330? 8:7}}
                                                                className=" text-sm text-blue-400 font-black">
                                                                {getInition(user.name)}Challenger
                                                            </Text>
                                              </View>
                                      </View>
                                  
                              </View>
                              <View
                              className = "w-[55%] h-[100%] flex-row justify-center items-center px- g-[#de8124]">
                                  
                                  <Text 
                                        style={{fontSize:16}}
                                        className=" text-sm text-blue-900 mt-1 font-black">
                                            NEW CHALLENGE
                                    </Text>
                                  
                              </View>
              
                          </View>


                          <View
                          // style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
                          className =" w-[100%] h-[7vh] flex-col g-[#0b2c4d] mb-8 justify-evenly rounde-tl-[50px] borde-4 border-white rouned-tr-[50px] items-center">
                                 
                                 {/* <View
                                          style={Platform.OS == "android" && {borderTopRightRadius:5,borderTopLeftRadius:5}}
                                          className="w-[100%] h-[40%]  rounded-tl-[50px] rounded-tr-[50px] flex-row  justify-between items-end  ">
                                            
                                             
                                  </View> */}

                                  <View
                                          className="w-[100%] h-[50%]   flex-row justify-center items-center  ">
                                          <View 
                                          style={{  height:width/9 }}  
                                          className=" w-[95%] h-[30%] px-4 border-gray-200 border-2  bg-white rounded-lg
                                          flex-row justify-center items-center">
                                              <TextInput
                                                  style={{fontSize:width/30}}
                                                  className=" text-gray-600 w-[100%] text-center font-bold bg- h-[100%] px-3 rounded-lg
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
                         

      

                        <View className="w-[100%] h-[13%] px-2  g-[#071b2c]  flex-row justify-center gap-2 items-center">
                                 <TouchableOpacity
                                 onPress={() =>{
                                  setIsSelectionModalVisible(true)
                                  setSelectionType("type")
                                  setData([...challengeType])
                                  // setIsSelectorVisible(true)
                                 }
                                 }
                                  className="w-[30%] h-[100%] flex-col rounded-xl border-b-2 border-t-2 border-l-4 border-r-4 border-white justify-center gap-1 items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                            <Text 
                                                style={{fontSize:9}}
                                                className="text-gray-500 text-sm font-bold">
                                                Select Type
                                            </Text>
                                          

                                    </View>
                                     
                                     <Image
                                     source={getIcon(selectedType)}
                                     resizeMethod='contain'
                                     style={{width:width/10, height:width/10}}
                                     className="w-[75%] h-[50%]" />
                                      <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                         
                                            <Text 
                                              style={{fontSize:9}}
                                              className="text-white font-black"> 
                                                {selectedType}
                                            </Text>

                                    </View>
                                 </TouchableOpacity>

                                 <TouchableOpacity
                                  onPress={()=>
                                    // setIsPrivacySelectorVisible(true)
                                    {
                                      setIsSelectionModalVisible(true)
                                      setSelectionType("privacy")
                                      setData([...privacyData])
                                      // setIsSelectorVisible(true)
                                    }
                                     
                                  }
                                  className="w-[30%] h-[100%] flex-col justify-center py-2 rounded-xl border-b-2 border-t-2 border-l-4 border-r-4 border-white gap-2 items-center">
                                     <View
                                            className="w-[100%] h-[20%] flex-row justify-center items-center">
                                            <Text 
                                                style={{fontSize:9}}
                                                className="text-gray-500 text-sm font-bold">
                                                Select Privacy
                                            </Text>
                                    </View>          
                                     <Image
                                     source={getIcon(selectedPrivacy)}
                                     resizeMethod='contain'
                                     style={{width:width/10, height:width/10}}
                                     className="w-[75%] h-[50%]" />
                                     <Text 
                                        style={{fontSize:9}}
                                        className="text-white font-black"> 
                                        {selectedPrivacy}
                                     </Text>
                                 </TouchableOpacity>

                                 {selectedPrivacy == "Private" && (

                                 <TouchableOpacity
                                        onPress={()=>
                                          // setIsModeVisible(true)
                                          {
                                            setIsSelectionModalVisible(true)
                                            setSelectionType("audience")
                                            setData([...Audience])
                                            // setIsSelectorVisible(true)
                                          }
                                        }
                                        className="w-[33%] h-[100%] py-2 rounded-xl border-t-2 border-b-2 border-l-4 border-r-4 border-white  flex-col justify-center gap-2 items-center">
                                        <View
                                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text 
                                                  style={{fontSize:9}}
                                                  className="text-gray-500 text-sm font-bold">
                                                    Select Audience
                                                </Text>
                                        </View>          
                                        <Image
                                        source={getIcon(selectedAudience)}
                                        resizeMethod='contain'
                                        style={{width:width/10, height:width/10}}
                                        className="w-[95%] h-[70%]" />
                                        <Text 
                                            style={{fontSize:9}}
                                            className="text-white font-black"> 
                                            {selectedAudience}
                                        </Text>
                                 </TouchableOpacity>
                                 )}
                        </View>

                       


                      {selectedPrivacy == "Private" && (
                        <>
                           
                  
                            <View className="w-[100%] h-[53%]  px-2 mt-4 flex-col justify-center gap-2 items-center">
                                    <TouchableOpacity
                                        onPress={()=>{
                                          // setIsFriendListVisible(!isFriendListVisible)
                                          setIsSelectionModalVisible(true)
                                          setSelectionType("invite")
                                          setData(friendList)
                                         }
                                        }
                                        className="w-[100%] h-[25%] flex-col justify-evenly  gap- items-center">
                                        <View
                                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text
                                                style={{fontSize:9}}
                                                className="text-gray-400 text-sm font-bold">
                                                    Invite Friends
                                                </Text>
                                        </View>
                                        
                                        <Image
                                        source={icons.invites}
                                        resizeMethod='contain'
                                        style={{width:width/10, height:width/10}}
                                        className="w-[95%] h-[70%]" />
                                        <View
                                                style={{fontSize:9}}
                                                className="w-[100%] h-[20%] flex-row justify-center items-center">
                                                <Text 
                                                style={{fontSize:10}}
                                                className="text-white font-black"> 
                                                    {selectedFriends.length}{' '}Invites
                                                </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View
                                        className="w-[100%] h-[75%]  borde-blue-300 borde-4 rounded-xl ">
                                       <ScrollView  className=" flex-1">
                                       <View
                                        className="min-w-[100%] min-h-[100%] flex-row flex-wrap px-2  py-2 gap-y-4  justify-center  items-center">
                                        {selectedFriends.map((friend,index) => {
                                             return (<View
                                                key={index}
                                                className="w-[23%] h-[30%] px- flex-col justify-center gap-2 items-center">
                                                        <Image
                                                        source={{uri:friend.profile_img}}
                                                        resizeMethod='contain'
                                                        style={{width:width/10, height:width/10}}
                                                        className="w-[40px] h-[40px] rounded-full" />
                                                        <Text 
                                                           style={{fontSize:8}}
                                                           className="text-gray-200 text-sm font-bold">
                                                            {friend.name.slice(0,12)}
                                                        </Text>
                                               </View>  )  
                                        })}
                                        </View>
                                      </ScrollView>     
                                    </View>
                            </View>

                  </>
                      )}



                            
                            <View className="w-[100%] h-[6%]  mt-auto  flex-row justify-center bg-[#f5f7fa] items-center">
                                 <TouchableOpacity
                                    onPress={handleContinue}
                                    className="w-[46%] h-[90%] flex-row mb-4 justify-center rounded-lg gap-2 items-end">
                                     <Text 
                                       style={{fontSize:18}}
                                       className="text-blue-800 text-sm mb-2 font-black">
                                                Next
                                     </Text>
                                     <Image
                                                        source={icons.forward}
                                                        resizeMethod='contain'
                                                        // style={{width:width/12, height:width/12}}
                                                        className="w-7 h-7 mb-1 rounded-full" />
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
          {isSelectionModalVisible && (  
                     <MakeSelectionChallengeModal isSelectionModalVisible={isSelectionModalVisible} selectionType ={selectionType} selectedType={selectedType}
                     setIsSelectionModalVisible={setIsSelectionModalVisible} text={text} data ={data} setSelectedType={setSelectedType} selectedPrivacy ={selectedPrivacy}
                     setSelectedPrivacy ={setSelectedPrivacy} selectedAudience ={selectedAudience} setSelectedAudience = {setSelectedAudience}  
                     selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends}
                       />
                 )}
          {isModalVisible && (
                    <CustomAlert text={text} action={action} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
               )}
   </SafeAreaView>
   
  )
}