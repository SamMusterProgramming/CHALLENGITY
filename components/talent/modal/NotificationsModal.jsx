import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated, Button, StyleSheet, Image, useWindowDimensions, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { icons } from '../../../constants';
import Modal from 'react-native-modal';
import { addCommentContestant, getNotificationByUser, getPostData } from '../../../apiCalls';
import WelcomeComment from '../../comments/WelcomeComment';
import Comment from '../../comments/Comment';
import DisplayNotification from '../../notification/DisplayNotification';
import { useGlobalContext } from '../../../context/GlobalProvider';

const NotificationsModal = ({user,displayNotificationsModal , setDisplayNotificationsModal  }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; 
  const {setNotifications , notifications} = useGlobalContext()
  const { width, height } = useWindowDimensions();
  const [postData , setPostData] = useState(null)
  const [newComment, setNewComment] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoaded , setIsLoaded] = useState(false)
  const flatListRef = useRef()


  useEffect(() => {
    setTimeout(() => {
        setIsLoaded(true)
    }, 1500);
  }, [])

  //**************************** flatlist items here */

  const renderNotification = ( {item,index}) => { 
    // return <Comment key={index} data={item} setCommentData={setPostData} post_user_id={selectedContestant.user_id} post_id={selectedContestant._id} />
    return <DisplayNotification key={index} notification={item} setNotifications={setNotifications} setDisplayNotificationsModal={setDisplayNotificationsModal}  user ={user} />
   }
 



//***************************** refresh the flatlist */

 const handleRefresh = () => {
     setRefreshing(true)
     getNotificationByUser(user._id , setNotifications)
     setTimeout(() => {
       setRefreshing(false)
     }, 1000);
}



//**************************** animation */

  useEffect(() => {
    if (displayNotificationsModal){
    scaleAnim.setValue(0);
    Animated.timing(scaleAnim, {
        toValue: 1, // Animate to full scale (1)
        duration: 200, // Animation duration (in milliseconds)
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }
  }, [displayNotificationsModal]);

  return (
    <View style={styles.container}>
    {displayNotificationsModal && notifications && (
        <Modal
        style={{margin:0}}
        animationType="none" // No built-in animation for custom animation
        transparent={true}
        isVisible={displayNotificationsModal}
        onBackdropPress={()=>{setDisplayNotificationsModal(false)}}
        onRequestClose={() =>setDisplayNotificationsModal(false)}     
        >
        <Animated.View
        className="rounded-t justify-center  bg-[#e2dada] items-center"
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },

          ]}
        >
          {isLoaded ? (
            <>
            <View 
            style={{
              backgroundColor:'rgba(255,255, 255 , 1)'
            }}
                     className="flex-row  justify-between w-full h-[7%]  rounded-t-lg order-pink-300 borde-2 g-white mb-2 px-2 items-center">
                      <View  className="flex-row justify-start items-center gap-2" >
                            <Text
                             className=" text-xs font-black text-black"
                              >
                              {notifications.length}
                            </Text>
                   
                            <Text 
                              className="text-xs  font-black text-black"
                               >
                             All Notifications
                            </Text>
                      </View>
                     <TouchableOpacity
                        onPress={()=>{setDisplayNotificationsModal(false)}}>
                        <Image  
                         className="w-10 h-10"
                         source={icons.notification}/>
                     </TouchableOpacity>
                     <View  className="flex-row justify-start items-center gap-1" >
                            <Text
                             className="text-xs  font-bold"
                              >
                              {notifications.filter(not=>not.isRead == false).length}
                            </Text>
                          
                            <Text 
                              className="text-xs text-black font-black"
                               >
                              New Notifications
                            </Text>
                      </View>           
            </View>

          
            <View 
            style={{
              //  backgroundColor:'rgba(0,0 , 0 , 0.8)'
              }}
                className="w-full - h-[83%] bg-[#e2dada] flex-col justify-start items-start">
                <FlatList
                    ref={flatListRef}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    // pagingEnabled
                    // scrollEventThrottle={16}
                    // onEndReached={handleRefresh}
                    // onEndReached={({item,index})=>{setDisplayComments(false)}}
                    data={notifications}
                    numColumns={2}
                    renderItem={renderNotification}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ 
                    
                             alignItems :"start" ,
                             justifyContent:"start",
                            //  padding:5,
                            
                            }}
                    ListHeaderComponent={
                        ( <>
                        
                    
                        </> )
                    }
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                    extraData={refreshing}

                    />
            </View>
            
            <View 
               style={{
                 backgroundColor:'rgba(255,255, 255 , 1)'
                }}
                className="flex-row  justify-center py-4 w-full h-[10%]  rounded-t-lg order-pink-300 borde-2 g-white mb-2 px-2 items-start">
                          <Text 
                              className="text-xl text-black font-black"
                               >
                              Notifications
                            </Text>
                    </View>
           
            </>
          ) : (
             <View
             className="flex-1 justify-center items-center">
              <Image  
                         className="w-32 h-32"
                         source={icons.notification}/>
             </View>
          )}
        </Animated.View>
      </Modal>
    )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin:0,
    // display:"flex",
    // flexDirection :"col",
    // backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // flex: 1, 
    // position: "absolute",
    marginTop :"auto",
    height : "80%",
    minWidth :"100%",
    justifyContent: 'start',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // 'rgba(0, 0, 0, 0.8)', 
    // zIndex:1
  },
});

export default NotificationsModal;