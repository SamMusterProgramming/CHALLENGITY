
import React,{
    useEffect,
    useMemo,
    useRef,
    useState,
    useCallback,
    }from"react";
    
    import{
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    Modal,
    Pressable,
    TextInput,
    }from"react-native";
    
    import{
    BottomSheetModal,
    BottomSheetFlatList,
    }from"@gorhom/bottom-sheet";
    
    import{
    useSafeAreaInsets,
    }from"react-native-safe-area-context";
    
    import{
    MaterialCommunityIcons,
    }from"@expo/vector-icons";
    
    import ArenaComment from"../comment/arenaComment";
    
    import{
    deleteArenaPostComment,
    }from"../../../apiCalls";
import { useGlobalContext } from "../../../context/GlobalProvider";
    
    export default function ArenaCommentDrawer({
    visible,
    onClose,
    post,
    comments=[],
    setComments,
    onAddComment,
    onDeleteComment,
    onLikeComment,
    user,
    data=[],
    setCommentData,
    }){
    const { globalArenaRefresh ,  setGlobalArenaRefresh} = useGlobalContext()
    const{width,height}= Dimensions.get("window");
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef(null);
    const flatListRef=useRef(null);
    const snapPoints=useMemo(()=>[
    "82%",
    ],[]);
    const[showFeedbackModal,setShowFeedbackModal]=useState(false);
    const[commentText,setCommentText]=useState("");
    const[postData,setPostData]=useState(null);
    useEffect(()=>{
    if(!bottomSheetRef.current)return;
    if(visible){
        bottomSheetRef.current.present();
        }
    else{
        bottomSheetRef.current.dismiss();
        setShowFeedbackModal(false);
        Keyboard.dismiss();
        }
    },[visible]);
    
    const handleSheetChanges=useCallback((index)=>{
        if(index===-1){
        setShowFeedbackModal(false);
        onClose?.();
        }
    },[onClose]);
    
    const closeSheet=useCallback(()=>{
        Keyboard.dismiss();
        setShowFeedbackModal(false);
        bottomSheetRef.current?.close();
    },[]);
    
    const submitComment=useCallback(()=>{
        const text=commentText.trim();
        if(!text)return;
        onAddComment(text);
        setCommentText("");
        Keyboard.dismiss();
        setShowFeedbackModal(false);
        // setGlobalArenaRefresh(true)
    },[commentText,onAddComment]);

    const deleteComment=useCallback(async(body)=>{
        const response=await deleteArenaPostComment({
        ...body,
        userId:user._id,
        });
        setCommentData(response);
        // setGlobalArenaRefresh(true)
    },[user,setCommentData]);
    
    const openFeedbackModal=useCallback(()=>{
      setShowFeedbackModal(true);
    },[]);
    
    const closeFeedbackModal=useCallback(()=>{
        Keyboard.dismiss();
        setShowFeedbackModal(false);
    },[]);
    
    const renderComment=useCallback(({item})=>(
        <ArenaComment
        comment={item}
        post_id={post._id}
        setCommentData={setCommentData}
        post_user_id={post.owner_id}
        setPostData={setPostData}
        user={user}
        deleteComment={deleteComment}
        />
    ),[
    post, user,  deleteComment,setCommentData, ]);
    
return(
<>
    <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        enableDynamicSizing={false}
        keyboardBehavior="none"
        android_keyboardInputMode="adjustNothing"
        backgroundStyle={{
        backgroundColor:"#070707",
        }}
        >
    
        <View
            style={{
              flex:1,
            }}
        >
        
            {/* HEADER */}
            <View
            style={{
            paddingHorizontal:20,
            paddingTop:14,
            paddingBottom:18,
            borderBottomWidth:1,
            borderBottomColor:"rgba(255,255,255,0.06)",
            }}
            >
              <View
                style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                }}
                >
                <View>
                    <Text
                        style={{
                        color:"#fff",
                        fontWeight:"800",
                        fontSize:width/22,
                        }}
                         >
                     Viewer Feedback
                    </Text>
                    <Text
                        style={{
                        marginTop:4,
                        color:"#7C7C85",
                        fontSize:width/34,
                        }}
                        >
                         {data.length} community responses
                    </Text>
                </View>
        
                <TouchableOpacity
                onPress={closeSheet}
                style={{
                height:38,
                width:38,
                borderRadius:19,
                backgroundColor:"#111114",
                justifyContent:"center",
                alignItems:"center",
                }}
                >
                    <MaterialCommunityIcons
                    name="close"
                    size={30}
                    color="#B3B3B3"
                    />
                </TouchableOpacity>
        
              </View>
            </View>
        
            {/* PERFORMANCE CARD */}
            <View
            style={{
            marginHorizontal:16,
            marginTop:0,
            // backgroundColor:"#111114",
            borderRadius:18,
            overflow:"hidden",
            // borderWidth:1,
            // borderColor:"rgba(255,255,255,0.05)",
            }}
            >
        
              {/* <View
                style={{
                paddingHorizontal:16,
                paddingTop:14,
                paddingBottom:10,
                }}
              >
                <Text
                style={{
                color:"#eab308",
                fontWeight:"700",
                letterSpacing:1,
                fontSize:width/34,
                }}
                >
                PERFORMANCE
                </Text>
              </View> */}
        
              {/* <Image
                source={{
                uri:post?.media?.thumbnail?.cdnUrl,
                }}
                resizeMode="cover"
                style={{
                width:"50%",
                height:180,
                backgroundColor:"#1A1A1A",
                }}
              /> */}
        
              <View
                style={{
                paddingVertical:10,
                }}
                 >
                {/* <Text
                    numberOfLines={3}
                    style={{
                    color:"#fff",
                    fontSize:width/28,
                    lineHeight:24,
                    }}
                   >
                {post?.caption || "No description provided."}
                </Text> */}
        
                <View
                    style={{
                    // marginTop:16,
                    flexDirection:"row",
                    justifyContent:"space-between",
                    }}
                >
                    <View
                    style={{
                    flexDirection:"row",
                    alignItems:"center",
                    }}
                    >
                            <MaterialCommunityIcons
                            name="eye"
                            size={20}
                            color="#eab308"
                            />
                            <Text
                            style={{
                            marginLeft:6,
                            color:"#fff",
                            fontWeight:"700",
                            }}
                            >
                            {post?.fireCount || 0}
                            </Text>
                            
                            <Text
                            style={{
                            marginLeft:6,
                            color:"#7C7C85",
                            }}
                            >
                            Views
                            </Text>
                    </View>

                    <View
                    style={{
                    flexDirection:"row",
                    alignItems:"center",
                    }}
                    >
                         <Text
                            style={{
                                fontSize: width/20,
                                color: "#eab308" ,
                                fontWeight: "900",
                                }} >
                                ✦
                          </Text>
                            <Text
                            style={{
                            marginLeft:6,
                            color:"#fff",
                            fontWeight:"700",
                            }}
                            >
                            {post?.fireCount || 0}
                            </Text>
                            
                            <Text
                            style={{
                            marginLeft:6,
                            color:"#7C7C85",
                            }}
                            >
                            Fires
                            </Text>
                    </View>
        
                    <View
                        style={{
                        flexDirection:"row",
                        alignItems:"center",
                        }}
                    >
                        <MaterialCommunityIcons
                        name="comment-processing-outline"
                        size={20}
                        color="#eab308"
                        />
                        <Text
                        style={{
                        marginLeft:6,
                        color:"#fff",
                        fontWeight:"700",
                        }}
                        >
                        {data?.length ?? post?.commentCount ?? 0}
                        </Text>
                        
                        <Text
                        style={{
                        marginLeft:6,
                        color:"#7C7C85",
                        }}
                        >
                        Feedback
                        </Text>
                    </View>
                </View>
        
              </View>
            </View>
        
            {/* FEEDBACK TITLE */} 
            {/* <View
            style={{
            marginTop:24,
            paddingHorizontal:20,
            }}
            >
                <Text
                style={{
                color:"#fff",
                fontWeight:"800",
                fontSize:width/22,
                }}
                >
                Viewer Feedback
                </Text>
                <Text
                style={{
                marginTop:4,
                color:"#7C7C85",
                fontSize:width/34,
                }}
                >
                {data.length} community responses
                </Text>
            </View> */}
        
            {/* COMMENTS */}
        
            <BottomSheetFlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item)=>item._id}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={{
                marginTop:10,
                flex:1,
                }}
                contentContainerStyle={{
                paddingBottom:30,
                }}
                renderItem={renderComment}
            />
        
            {/* CTA */}
        
            <View
            style={{
            paddingHorizontal:18,
            paddingVertical:16,
            borderTopWidth:1,
            paddingBottom : 23,
            borderTopColor:"rgba(255,255,255,0.06)",
            }}
            >
               <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=>setShowFeedbackModal(true)}
                    style={{
                    height:56,
                    borderRadius:18,
                    backgroundColor:"rgba(255,255,255,0.05)",
                    borderWidth:1,
                    borderColor:"rgba(255,255,255,0.08)",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center",
                    }}
                    >

                    <View
                    style={{
                    width:34,
                    height:34,
                    borderRadius:17,
                    backgroundColor:"rgba(234,179,8,0.16)",
                    justifyContent:"center",
                    alignItems:"center",
                    marginRight:12,
                    }}
                    >
                        <MaterialCommunityIcons
                        name="message-text-outline"
                        size={18}
                        color="#eab308"
                        />
                    </View>

                    <Text
                    style={{
                    color:"#FFFFFF",
                    fontWeight:"700",
                    fontSize:width/28,
                    }}
                    >
                    Share Your Feedback
                    </Text>

                </TouchableOpacity>
            </View>
        </View>
        
    </BottomSheetModal>
        
    {/* Feedback Modal comes in Part 3 */}
    <Modal
        visible={showFeedbackModal}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={()=>{
        Keyboard.dismiss();
        setShowFeedbackModal(false);
        }}
     >

        <Pressable
            onPress={()=>{
            Keyboard.dismiss();
            setShowFeedbackModal(false);
            }}
            style={{
            flex:1,
            backgroundColor:"rgba(0,0,0,0.78)",
            justifyContent:"center",
            alignItems:"center",
            }}
        >

            <Pressable
                onPress={()=>{}}
                style={{
                width:"90%",
                backgroundColor:"#111114",
                borderRadius:22,
                paddingHorizontal:22,
                paddingTop:22,
                paddingBottom:20,
                borderWidth:1,
                borderColor:"rgba(255,255,255,0.06)",
                }}
            >

                <Text
                    style={{
                    color:"#fff",
                    fontWeight:"800",
                    fontSize:width/18,
                }}
                >
                Share Your Feedback
                </Text>

                <Text
                    style={{
                    marginTop:8,
                    color:"#8B8B94",
                    fontSize:width/32,
                    lineHeight:22,
                }}
                >
                  Tell the performer what stood out. Encourage them, highlight strengths, or offer respectful suggestions for improvement.
                </Text>
                <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder="Write your feedback..."
                    placeholderTextColor="#6B7280"
                    multiline
                    textAlignVertical="top"
                    autoFocus
                    style={{
                    marginTop:22,
                    minHeight:150,
                    maxHeight:220,
                    backgroundColor:"#070707",
                    borderRadius:16,
                    padding:16,
                    color:"#fff",
                    fontSize:width/28,
                    borderWidth:1,
                    borderColor:"rgba(255,255,255,0.06)",
                    }}
                />
                <View
                    style={{
                    marginTop:24,
                    flexDirection:"row",
                    justifyContent:"space-between",
                    }}
                   >
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={()=>{
                        Keyboard.dismiss();
                        setShowFeedbackModal(false);
                        }}
                        style={{
                        flex:1,
                        height:50,
                        borderRadius:14,
                        borderWidth:1,
                        borderColor:"rgba(255,255,255,0.08)",
                        justifyContent:"center",
                        alignItems:"center",
                        marginRight:8,
                        }}
                    >

                    <Text
                        style={{
                        color:"#B3B3B3",
                        fontWeight:"700",
                        }}
                    >
                    Cancel
                    </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={submitComment}
                        style={{
                        flex:1,
                        height:50,
                        borderRadius:14,
                        backgroundColor:"#eab308",
                        justifyContent:"center",
                        alignItems:"center",
                        marginLeft:8,
                        }}
                    >
                        <Text
                            style={{
                            color:"#000",
                            fontWeight:"800",
                            }}
                        >
                        Send Feedback
                        </Text>
                    </TouchableOpacity>

                </View>
            </Pressable>
        </Pressable>
    </Modal>
        
</>
);
 }