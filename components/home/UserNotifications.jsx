import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import DisplayNotification from '../notification/DisplayNotification';
import { getNotificationByUser } from '../../apiCalls';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { icons } from '../../constants';

export default function UserNotifications({user}) {
    const {setNotifications , notifications} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [postData , setPostData] = useState(null)
    const [newComment, setNewComment] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoaded , setIsLoaded] = useState(false)
    const flatListRef = useRef()
  
     //**************************** flatlist items here */

  const renderNotification = ( {item,index}) => { 
    return <DisplayNotification key={index} notification={item} setNotifications={setNotifications}   user ={user} />
   }
  const handleRefresh = () => {
    setRefreshing(true)
    getNotificationByUser(user._id , setNotifications)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
   }

   const RenderHeader =  memo(({user}) => {
    return(
      <View className="bg-black border-b-2 border-white w-[100%] flex-col  py-2  mt- 1  roun ed-xl">
            <View className="b g-white w-[100%] px-1 flex-col ">
              <View className="mb- 2 gap-2 flex-row justify-start items-end">
                <Text 
                style={{fontSize:18}}
                className="text -2xl bord er-2 bord er-b-[#1a9bd6] font-black text-[#07a8e3]">Notifications</Text>
                <MaterialCommunityIcons name="bell-ring" size={28} color = "#07a8e3"  style ={{marginBottom :4}} />
              </View>
              <Text 
               style={{fontSize:9}}
               className="tex t-sm font-bold text-gray-200">Explore notifications below</Text>

            </View>
  
            <View className="bg- white w-[100%] flex-row justify-center items-center py-1 gap-2 ">
                     
            </View>
      </View>
    )
  })
  return (
    <View
    className = "w-[100%] h-[100%] py-1 b g-[#fcf5f5]" >

            <FlatList
                     ref={flatListRef}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ 
                             alignItems :"start" ,
                             justifyContent:"start",
                            }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<RenderHeader user = {user}  />}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    extraData={refreshing}

                    />
    </View>
  )
}