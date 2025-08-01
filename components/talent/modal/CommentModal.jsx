import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated, Button, StyleSheet, Image, useWindowDimensions, TouchableOpacity, FlatList, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { icons } from '../../../constants';
import Modal from 'react-native-modal';
import { addCommentContestant, getPostData } from '../../../apiCalls';
import WelcomeComment from '../../comments/WelcomeComment';
import Comment from '../../comments/Comment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CommentModal = ({user , displayComment , setDisplayComment , selectedContestant}) => {
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
        duration: 500, // Animation duration (in milliseconds)
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }
  }, [displayComment]);

  return (
    <View
    // style={{ paddingTop:Platform.OS == "ios" ? insets.top : insets.top}}
    //      className=" flex- 1 w-full h-full   bg-[#060606]"
    style={styles.container}
     >
    {displayComment && postData && (
        <Modal
        style={{margin:0}}
        animationType="none" // No built-in animation for custom animation
        transparent={true}
        isVisible={displayComment}
        onBackdropPress={()=>{setDisplayComment(false)}}
        onRequestClose={() =>setDisplayComment(false)}     
        >
        <Animated.View
        className="rounded-t-lg mt-auto bg-white"
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },
            // {minWidth:width}
          ]}
        >
          
            <View 
            style={{backgroundColor:'rgba(0,0 , 0, 0.8)'}}
                     className="flex-row bg-black justify-between w-full  h-[50px]  rounded-t-lg order-pink-300 borde-2 g-white mb-2 px-2 items-center">
                      <View  className="flex-row justify-start items-center gap-2" >
                            <Text
                             className=" text-xs font-black text-white"
                              >
                              {postData.votes.length}
                            </Text>
                            {/* <Ionicons name='heart' color="red" side={15}/> */}
                            <Text 
                              className="text-xs  font-black text-white"
                               >
                              VOTES
                            </Text>
                      </View>
                     <TouchableOpacity
                        onPress={()=>{setDisplayComment(false)}}>
                        <Image  
                         className="w-10 h-10"
                         source={icons.x}/>
                     </TouchableOpacity>
                     <View  className="flex-row justify-start items-center gap-1" >
                            <Text
                             className="text-xs  font-bold"
                              >
                              {postData.likes.length}
                            </Text>
                            <Image
                            className="w-7 h-7"
                             source={icons.like}
                             />
                            <Text 
                              className="text-xs text-white font-black"
                               >
                              LIKES
                            </Text>
                      </View>           
            </View>

            {postData.comments.length == 0 && 
            ( <WelcomeComment/> )}

            <View
            style={{backgroundColor:"white"}}
            className="flex-1 w-full h- [80%]">
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

                className="w-[95%] min- h-[50px] px-2 flex-row  border-gray-600 border-2 border-b-2  border-l- 4  border-r- 4 mt-1 mb- justify-start items-center rounded-lg"
                >
              <TextInput  
              // style={styles.input}
              className="px-2 text-gray-700 bg-gray-100 w-[100%] min-h-[95%] border-r-2 border-gray"
              placeholderTextColor={"white"}
              placeholder="Add a comment..."
              returnKeyType="send"
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
               className="absolute right-0 w-[18%] h-[95%] flex-row justify-center rounded-lg mr- items-center bg-blue-200 ">
                  <Text>
                      send
                  </Text>
              </TouchableOpacity>
        
           </View>
           <View
                className="w-[98%] h-[5%] flex-row bg-white borde-2 mt- mb-1 justify-center items-center rounded-xl"
                >
                    <Text>
                      Comment
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