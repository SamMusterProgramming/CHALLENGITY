import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated, Button, StyleSheet, Image, useWindowDimensions, TouchableOpacity, FlatList, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { icons } from '../../../constants';
import Modal from 'react-native-modal';
import { addCommentContestant, getPostData } from '../../../apiCalls';
import WelcomeComment from '../../comments/WelcomeComment';
import Comment from '../../comments/Comment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const CommentModal = ({user , h, displayComment , setDisplayComment , selectedContestant , top}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; 
  const { width, height } = useWindowDimensions();
  const [postData , setPostData] = useState(null)
  const [newComment, setNewComment] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const flatListRef = useRef()


  useEffect(() => {
    getPostData(selectedContestant._id,setPostData)
  }, [])

  //**************************** flatlist items here */

  const renderComment = ( {item,index}) => { 
    return <Comment key={index} data={item} setCommentData={setPostData} post_user_id={selectedContestant.user_id}
     post_id={selectedContestant._id} setPostData={setPostData} />
   }
 
  const addComment = () => {
    if(newComment ==="") return ;
    let rawBody = {
        post_id:selectedContestant._id,
        user_id : selectedContestant.user_id,
        commenter_id: user._id,
        profile_img:user.profile_img,
        name:user.name,
        comment:newComment
     }
     setNewComment("")
    //  commentData && flatListRef.current?.scrollToIndex({ index:commentData.content.length-1, animated: true });
     addCommentContestant(selectedContestant._id,rawBody,setPostData)
     //  getCommentsByPost(post._id,setCommentData)
    //  handleRefresh()
};


//***************************** refresh the flatlist */

 const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getPostData(selectedContestant._id,setPostData)
    setTimeout(() => {
      scrollToLastItem()
      setRefreshing(false)
    }, 200);
    
},[])
const scrollToLastItem = () =>{
  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, 0);
};

const getItemLayout = (data, index) => ({
    length: 60, // Approximate height of each item
    offset: 100 * index,
    index,
  });
//**************************** animation */

  useEffect(() => {
    if (displayComment){
    scaleAnim.setValue(0);
    Animated.timing(scaleAnim, {
        toValue: 1, // Animate to full scale (1)
        duration: 1000, // Animation duration (in milliseconds)
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }
  }, [displayComment]);

  return (
    <View
    // style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
    className=" flex-1    bg-[#060606]"
    style={{ 
      flexDirection :"col",
      // backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      shadowpacity: 0,
      // height: h,
      shadowRadius: 4,
      elevation: 5,
    }}
     >
    {displayComment && postData && (
        <Modal
        style={{margin:0}}
        animationType="none" 
        transparent={true}
        isVisible={displayComment}
        onBackdropPress={()=>{setDisplayComment(false)}}
        onRequestClose={() =>setDisplayComment(false)}     
        >
        <Animated.View
        className="rounded-t-xl mt -auto gap-1 py- 1 px- 1 rounded-b-xl bg-[#d8dbe3]"
          style={
            {  
              position:"absolute",
              bottom : 0 ,
              height : h,
              minWidth :"100%",
              justifyContent: 'start',
              alignItems: 'center',
              // backgroundColor:'#06132b',
              transform: [{ scale: scaleAnim }],
            }
        }
        >
          
            <View 
            // style={{backgroundColor:'rgba(0,0 , 0, 1)'}}
                     className="flex-row bg-[#2b2c2d] justify-between w-full py-2 h -[50px]  rounded-t-xl order-pink-300 borde-2 g-white mb-1 px-2 items-center">
                      <View  className="flex-row justify-start items-end gap-2" >
                            <Text
                             className=" text-xs font-black text-white"
                              >
                              {postData.votes.length}
                            </Text>
                            {/* <Ionicons name='heart' color="red" side={15}/> */}
                            <Text 
                              className="text-xs  font-black text-red-500"
                               >
                              Votes
                            </Text>
                      </View>
                      <TouchableOpacity
                        onPress={()=>{setDisplayComment(false)}}>
                         <AntDesign name="closecircle" size={30} color="white" /> 
                      </TouchableOpacity>
                      <View  className="flex-row justify-start  items-end gap-1" >
                            <Text
                             className="text-xs text-gray-100 font-black" >
                              {postData.likes.length}
                            </Text>
                            <Image
                            className="w-6 h-6"
                             source={icons.like}
                             />
                            {/* <Text 
                              className="text-xs text-white font-black">
                              likes
                            </Text> */}
                      </View>           
            </View>

            {postData.comments.length == 0 && 
            ( <WelcomeComment/> )}

            <View
            style={{backgroundColor:""}}
            className="flex-1 w-full px-2 h- [80%]">
                  <FlatList
                    ref={flatListRef}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    // pagingEnabled
                    scrollEventThrottle={16}
                    // onEndReached={handleRefresh}
                    // onEndReached={({item,index})=>{setDisplayComments(false)}}
                    data={postData.comments}
                    renderItem={renderComment}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={
                        ( <>
                        </> )
                    }
                    onRefresh={handleRefresh}
                    getItemLayout={getItemLayout}
                    refreshing={refreshing}
                    extraData={refreshing}

                    />
          </View>

           <View

                className="bg-white w-[98%] min- h-[45px]  px-1  rounded-lg flex-row  border-gray-200 border-2  justify-center items-center "
                >
              <TextInput  
              // style={styles.input}
              className="px-2 text-gray-900 font-base pt-4 flex-row justify-start items-center  w-[82%] min-h-[100%] "
              placeholderTextColor={"black"}
              placeholder="Add a comment..."
              returnKeyType="send"
              multiline={true}
              removeClippedSubviews={false}
              value={newComment}
              keyboardType='email-address'
              // keyboardType= "default"
              onChangeText={text => setNewComment(text)}
              onSubmitEditing={() => {
               addComment()
              }}
              />
              <TouchableOpacity
               onPress={addComment} 
               className=" w-[18%] h-[92%] flex-row justify-center rounded-lg items-center bg-blue-500 ">
                  <Text>
                      send
                  </Text>
              </TouchableOpacity>
        
           </View>
           <View
               style={{height:30}}
               className="w-[100%] h-[1%] flex-row bg- white borde-2   justify-center items-center rounde d-xl" >
                    <Text
                             className="text-md text-gray-700 font-black" >
                              
                    </Text>
           </View>

        </Animated.View>
      </Modal>
    )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // margin:0,
    // display:"flex",
    flexDirection :"col",
    // backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },

  modalContent: {
    // flex: 1, 
    // position: "absolute",
    // marginTop :"auto",
    height : "85%",
    minWidth :"100%",
    justifyContent: 'start',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0 , 0 , 0.8)',
    // 'rgba(0, 0, 0, 0.8)', 
    // zIndex:1
  },
});

export default CommentModal;