import { View, Text, TextInput, StyleSheet, Button, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { addCommentsByPost, getCommentsByPost } from '../../apiCalls';
import { icons } from '../../constants';
import Comment from './Comment';
import { Ionicons } from '@expo/vector-icons';
import WelcomeComment from './WelcomeComment';


export default function CommentDisplayer({user,post,setDisplayComments,vote_count,like_count,isVisible,style,setCommentCount,commentCount}) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [commentData, setCommentData] = useState(null);
    const flatListRef = useRef()
  
    const renderComment = ( {item,index}) => { 
       return <Comment key={index} data={item} setCommentData={setCommentData} post_user_id={post.user_id} post_id={post._id} />
      }
    

    
    
    const addComment = () => {
        if(newComment ==="") return ;
        let rawBody = {
            post_id:post._id,
            user_id : post.user_id,
            commenter_id: user._id,
            profile_img:user.profile_img,
            name:user.name,
            comment:newComment
         }
         setNewComment("")
        //  commentData && flatListRef.current?.scrollToIndex({ index:commentData.content.length-1, animated: true });
         addCommentsByPost(post._id,rawBody,setComments)
         //  getCommentsByPost(post._id,setCommentData)
        //  handleRefresh()
    };

  
  useEffect(() => {
      setDisplayComments(isVisible)
   }, [isVisible])
     
  useEffect(() => {
    getCommentsByPost(post._id,setCommentData)
    return ()=>{
      setCommentData(null)
    }
    }, [])
   
  useEffect(() => {
      scrollToLastItem()
      setCommentCount(commentData && commentData !== "empty" && commentData.content.length || 0)
  }, [commentData])

  useEffect(() => {
    getCommentsByPost(post._id,setCommentData)
    handleRefresh()
}, [comments])

   const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getCommentsByPost(post._id,setCommentData)
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
  return (


    <View 
        style={style}
        className="absolute  w-[99%] min-h-[60%] bottom-10 flex-col justify-center items-center rounded-2xl border-4 border-gray-400
         bg-green-50">    
              <View 
                     className="flex-row justify-between w-full h-14 rounded-lg border-pink-300 border-2 bg-blue-200 mb-1 px-2 items-center">
                      <View  className="flex-row justify-start items-center gap-1" >
                            <Text
                             className="text-xs  font-bold"
                              >
                              {vote_count}
                            </Text>
                            <Ionicons name='heart' color="red" side={15}/>
                            <Text 
                              className="text-xs  font-black"
                               >
                              VOTES
                            </Text>
                      </View>
                     <TouchableOpacity
                        onPress={()=>{setDisplayComments(false)}}>
                        <Image  
                         className="w-8 h-8"
                         source={icons.x}/>
                     </TouchableOpacity>
                     <View  className="flex-row justify-start items-center gap-1" >
                            <Text
                             className="text-xs  font-bold"
                              >
                              {like_count}
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
            {!commentData && 
            ( <WelcomeComment/> )}
            
            { commentData && commentData=="empty" &&
            ( <WelcomeComment   /> ) }

            <FlatList
            ref={flatListRef}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            // pagingEnabled
            scrollEventThrottle={16}
            // onEndReached={handleRefresh}
            // onEndReached={({item,index})=>{setDisplayComments(false)}}
            data={commentData && commentData.content}
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
       
            
   </View>
  

  )
}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    commentContainer: {
      marginBottom: 10,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
    },
    commentText: {
      fontSize: 16,
    },
    input: {
      height: 40,
      width:'80%',
    //   borderColor: '#ccc',
      borderWidth: 0,
      marginBottom: 0,
    //   paddingHorizontal: 10,
    //   borderRadius: 5,
    },
  });