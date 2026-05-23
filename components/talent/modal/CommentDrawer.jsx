

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Keyboard,
  TextInput,
  Animated,
} from "react-native";

import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import {
  addCommentContestant,
  getPostData,
} from "../../../apiCalls";

import Comment from "../../comments/Comment";

export default function CommentSheet({
  modalRef,
  selectedContestant,
  user,
}) {

  const [postData, setPostData] = useState(null);
  const [draftComment, setDraftComment] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const keyboardAnim = useRef(new Animated.Value(0)).current;
  const listRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const snapPoints = useMemo(() => ["35%", "85%"], []);

  useEffect(() => {
    if (selectedContestant?._id) {
      getPostData(
        selectedContestant._id,
        setPostData
      );
    }
  }, [selectedContestant]);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios"
        ? "keyboardWillShow"
        : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios"
        ? "keyboardWillHide"
        : "keyboardDidHide";
    const showSub = Keyboard.addListener(
      showEvent,
      (e) => {
        Animated.timing(
          keyboardAnim,
          {
            toValue: e.endCoordinates.height,
            duration: Platform.OS === "ios" ? 250 : 180,
            useNativeDriver: true,
          }
        ).start();
      }
    );
  
    const hideSub = Keyboard.addListener(
      hideEvent,
      () => {
        Animated.timing(
          keyboardAnim,
          {
            toValue: 0,
            duration: Platform.OS === "ios" ? 250 : 180,
            useNativeDriver: true,
          }
        ).start();
      }
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleRefresh = useCallback(() => {
    if (!selectedContestant?._id) return;
    setRefreshing(true);
    getPostData(
      selectedContestant._id,
      setPostData
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, [selectedContestant]);

  const addComment = () => {
    if (!draftComment.trim()) return;
    
    const rawBody = {
      post_id: selectedContestant._id,
      user_id: selectedContestant.user_id,
      commenter_id: user._id,
      profile_img: user.profileImage.publicUrl,
      name: user.name,
      comment: draftComment,
    };
    setDraftComment("");
    addCommentContestant(
      selectedContestant._id,
      rawBody,
      setPostData
    );
    setTimeout(() => {
      Keyboard.dismiss();
      listRef.current?.scrollToEnd({
        animated: true,
      });
    }, 300);
  };

  const renderComment = 
  // useCallback(
    ({ item }) => (
      <Comment
        data={item}
        setCommentData={setPostData}
        post_user_id={selectedContestant.user_id}
        post_id={selectedContestant._id}
        user={user}
        setPostData={setPostData}
      />
    )
  //   [postData]
  // );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.55}
        pressBehavior="close"
      />
    ),
    []
  );

  return (

    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDismissOnClose
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      backgroundStyle={{
        backgroundColor: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
      handleIndicatorStyle={{
        backgroundColor: "gray",
        width: 33,
        height: 4,
      }}
    >

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >

        {/* HEADER */}
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 12,
            paddingHorizontal: 14,
            borderBottomWidth: 1,
            borderBottomColor: "#ececec",
          }}
        >

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#111",
            }}
          >
            Comments
          </Text>

        </View>

        {/* COMMENTS */}
        <BottomSheetFlatList
          ref={listRef}
          data={postData?.comments || []}
          keyExtractor={(item) => item._id}
          renderItem={renderComment}
          style={{
            flex: 1,
          }}
          keyboardShouldPersistTaps="always"
          onRefresh={handleRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
            // paddingBottom: 10,
          }}
        />

        {/* INPUT */}
        <Animated.View
            style={{
              transform: [
                {
                  translateY: Animated.multiply(
                    keyboardAnim,
                    -1
                  ),
                },
              ],
             
              paddingHorizontal: 5,
              paddingTop: 10,
              // paddingBottom: Platform.OS === "ios" ? 30 : 20,
              borderTopWidth: 1,
              borderTopColor: "#ececec",
              backgroundColor: "#fff",
            }}
          >

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              backgroundColor: "#f3f4f6",
              borderRadius: 14,
              paddingLeft: 12,
              paddingRight: 6,
              paddingVertical: 6,
            }}
          >
            <TextInput
              placeholder="Write a comment..."
              placeholderTextColor="#71717a"
              multiline
              submitBehavior="newline"
              value={draftComment}
              onChangeText={(e) => setDraftComment(e)}
              autoCorrect={false}
              autoComplete="off"  
              autoCapitalize="none"
              spellCheck={false}
              keyboardType="default"
              underlineColorAndroid="transparent"
              importantForAutofill="no"
              style={{
                flex: 1,
                height: 40,
                // maxHeight: 100,
                color: "#111",
                fontSize: 15,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 10,
                // textAlignVertical: "top",
              }}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress = { addComment }
              style={{
                height: 36,
                paddingHorizontal: 16,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  draftComment.trim().length > 0
                    ? "#facc15"
                    : "#e4e4e7",
              }}
            >
              <Text
                style={{
                  color:
                    draftComment.trim().length > 0
                      ? "#111"
                      : "#71717a",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
          <View className = "w-full bg-white min-h-4" />
        </Animated.View>
        
      </View>

    </BottomSheetModal>
  );
}



// import React, { useEffect, useState, useRef, useCallback } from "react";

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Platform,
//   KeyboardAvoidingView,
//   TextInput,
//   FlatList,
//   Keyboard,
//   Dimensions,
// } from "react-native";

// import {
//   addCommentContestant,
//   getPostData,
// } from "../../../apiCalls";

// import Comment from "../../comments/Comment";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// export default function CommentSheet({
//   selectedContestant,
//   user,
//   visible,
//   onClose,
// }) {
//   const [postData, setPostData] = useState(null);
//   const [draftComment, setDraftComment] = useState("");
//   const [refreshing, setRefreshing] = useState(false);

//   const listRef = useRef(null);

//   const SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;

//   useEffect(() => {
//     if (selectedContestant?._id) {
//       getPostData(selectedContestant._id, setPostData);
//     }
//   }, [selectedContestant]);

//   const handleRefresh = useCallback(() => {
//     if (!selectedContestant?._id) return;
//     setRefreshing(true);

//     getPostData(selectedContestant._id, setPostData);

//     setTimeout(() => setRefreshing(false), 200);
//   }, [selectedContestant]);

//   const addComment = () => {
//     if (!draftComment.trim()) return;

//     Keyboard.dismiss();

//     const rawBody = {
//       post_id: selectedContestant._id,
//       user_id: selectedContestant.user_id,
//       commenter_id: user._id,
//       profile_img: user.profileImage.publicUrl,
//       name: user.name,
//       comment: draftComment,
//     };

//     setDraftComment("");

//     addCommentContestant(
//       selectedContestant._id,
//       rawBody,
//       setPostData
//     );

//     setTimeout(() => {
//       listRef.current?.scrollToEnd({ animated: true });
//     }, 250);
//   };

//   const renderComment = ({ item }) => (
//     <Comment
//       data={item}
//       setCommentData={setPostData}
//       post_user_id={selectedContestant.user_id}
//       post_id={selectedContestant._id}
//       user={user}
//       setPostData={setPostData}
//     />
//   );

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent
//       onRequestClose={onClose}
//     >
//       {/* ✅ FULL BACKDROP (click outside closes) */}
//       <TouchableOpacity
//         activeOpacity={1}
//         onPress={onClose}
//         className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"
//       />

//       <KeyboardAvoidingView
//         className="flex-1 justify-end"
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         {/* ✅ EXACT 70% HEIGHT SHEET */}
//         <View
//           style={{ height: SHEET_HEIGHT }}
//           className="bg-white rounded-t-3xl overflow-hidden"
//         >

//           {/* HEADER */}
//           <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
//             <Text className="text-lg font-bold text-black">
//               Comments
//             </Text>

//             <TouchableOpacity onPress={onClose}>
//               <Text className="text-base font-semibold text-black">
//                 Close
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* COMMENTS */}
//           <FlatList
//             ref={listRef}
//             data={postData?.comments || []}
//             keyExtractor={(item) => item._id}
//             renderItem={renderComment}
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//             keyboardShouldPersistTaps="handled"
//             contentContainerClassName="px-3 py-2 pb-6"
//           />

//           {/* INPUT */}
//           <View className="flex-row items-end px-3 py-2 border-t border-gray-200 bg-white">

//             <TextInput
//               placeholder="Write a comment..."
//               placeholderTextColor="#71717a"
//               value={draftComment}
//               onChangeText={setDraftComment}
//               multiline
//               className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-black text-[15px] max-h-[100px]"
//             />

//             <TouchableOpacity
//               onPress={addComment}
//               className={`ml-2 h-9 px-4 rounded-lg items-center justify-center ${
//                 draftComment.trim().length > 0
//                   ? "bg-yellow-400"
//                   : "bg-gray-200"
//               }`}
//             >
//               <Text className="font-bold text-black text-sm">
//                 Post
//               </Text>
//             </TouchableOpacity>

//           </View>

//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }