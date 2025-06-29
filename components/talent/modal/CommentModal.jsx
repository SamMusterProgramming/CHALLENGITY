import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated, Button, StyleSheet, Image, useWindowDimensions, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { icons } from '../../../constants';
import Modal from 'react-native-modal';
import { addCommentContestant, getPostData } from '../../../apiCalls';
import WelcomeComment from '../../comments/WelcomeComment';
import Comment from '../../comments/Comment';

const CommentModal = ({user,displayComment , setDisplayComment , selectedContestant}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; 
  const { width, height } = useWindowDimensions();
  const [postData , setPostData] = useState(null)
  const [newComment, setNewComment] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef()


  useEffect(() => {
    getPostData(selectedContestant._id,setPostData)
  }, [])

  //**************************** flatlist items here */

  const renderComment = ( {item,index}) => { 
    return <Comment key={index} data={item} setCommentData={setPostData} post_user_id={selectedContestant.user_id} post_id={selectedContestant._id} />
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
    <View style={styles.container}>
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
        className="rounded-t-lg"
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },
            // {minWidth:width}
          ]}
        >
          
            <View 
                     className="flex-row justify-between w-full h-[8%] rounded-t-lg border-pink-300 border-2 bg-blue-200 mb-1 px-2 items-center">
                      <View  className="flex-row justify-start items-center gap-1" >
                            <Text
                             className="text-xs  font-bold"
                              >
                              {postData.votes.length}
                            </Text>
                            {/* <Ionicons name='heart' color="red" side={15}/> */}
                            <Text 
                              className="text-xs  font-black"
                               >
                              VOTES
                            </Text>
                      </View>
                     <TouchableOpacity
                        onPress={()=>{setDisplayComment(false)}}>
                        <Image  
                         className="w-8 h-8"
                         source={icons.x}/>
                     </TouchableOpacity>
                     <View  className="flex-row justify-start items-center gap-1" >
                            <Text
                             className="text-xs  font-bold"
                              >
                              {postData.likes.length}
                            </Text>
                            <Image
                            className="w-5 h-5"
                             source={icons.like}
                             />
                            <Text 
                              className="text-xs  font-black"
                               >
                              LIKES
                            </Text>
                      </View>           
            </View>

            {postData.comments.length == 0 && 
            ( <WelcomeComment/> )}

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


           <View
                className="w-[98%] h-[50px] flex-row border-gray-400  border-2 mt-1 mb-1 justify-start items-center rounded-xl"
                >
              <TextInput  style={styles.input}
              className="px-4"
              placeholder="Add a comment..."
              returnKeyType="send"
              removeClippedSubviews={false}
              value={newComment}
              // keyboardType='email-address'
              keyboardType= "default"
              onChangeText={text => setNewComment(text)}
              onSubmitEditing={() => {
               addComment()
              }}
              />
              <TouchableOpacity
               onPress={addComment} 
               className="ml-auto w-[18%] h-[85%] flex-row justify-center rounded-2xl mr-2 items-center bg-gray-300 ">
                  <Text>
                      send
                  </Text>
              </TouchableOpacity>
        
           </View>
           <View
                className="w-[98%] h-[10px] flex-row  borde-2 mt-3 mb-1 justify-start items-center rounded-xl"
                ></View>

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
    height : "60%",
    minWidth :"100%",
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: "white",
    // 'rgba(0, 0, 0, 0.8)', 
    // zIndex:1
  },
});

export default CommentModal;