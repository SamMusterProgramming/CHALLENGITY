import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { addCommentContestant, getPostData } from "../../../apiCalls";
import Comment from "../../comments/Comment";

const INPUT_HEIGHT = 50;

export default function CommentSheet({ modalRef, selectedContestant, user }) {

  const [postData, setPostData] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const listRef = useRef(null);
  const snapPoints = useMemo(() => ["70%"], []);

  useEffect(() => {
    if (selectedContestant?._id) {
      getPostData(selectedContestant._id, setPostData);
    }
  }, [selectedContestant]);

  const handleRefresh = useCallback(() => {
    if (!selectedContestant?._id) return;

    setRefreshing(true);
    getPostData(selectedContestant._id, setPostData);

    setTimeout(() => {
      setRefreshing(false);
    }, 200);

  }, [selectedContestant]);

  const addComment = () => {

    if (!newComment.trim()) return;

    const rawBody = {
      post_id: selectedContestant._id,
      user_id: selectedContestant.user_id,
      commenter_id: user._id,
      profile_img: user.profile_img,
      name: user.name,
      comment: newComment,
    };

    setNewComment("");

    addCommentContestant(
      selectedContestant._id,
      rawBody,
      setPostData
    );

    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const renderComment = ({ item }) => (
    <Comment
      data={item}
      setCommentData={setPostData}
      post_user_id={selectedContestant.user_id}
      post_id={selectedContestant._id}
      user={user}
      setPostData={setPostData}
    />
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      backgroundStyle={{ backgroundColor: "rgba(15,15,15,0.9)" }}
      handleIndicatorStyle={{ backgroundColor: "#71717a", width: 40 }}
      enableDynamicSizing={false}
    >

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <View style={{ flex: 1, paddingHorizontal: 16 }}>

          {/* HEADER */}
          <Text
            style={{
              color: "white",
              fontSize: 18,
              paddingVertical: 12
            }}
          >
            Comments
          </Text>

          {/* COMMENT LIST */}
          <BottomSheetFlatList
            ref={listRef}
            data={postData?.comments || []}
            keyExtractor={(item) => item._id}
            renderItem={renderComment}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            onRefresh={handleRefresh}
            refreshing={refreshing}
            // contentContainerStyle={{ paddingBottom: 10 }}
          />

          {/* INPUT BAR */}
          <View
            style={{
              height: INPUT_HEIGHT,
              flexDirection: "row",
              borderTopWidth: 1,
              borderColor: "#27272a",
              alignItems: "center",
              paddingHorizontal: 8,
              backgroundColor: "rgba(24,24,27,0.95)",
              marginBottom :35
            }}
          >

            <TextInput
              placeholder="Add comment..."
              placeholderTextColor="#666"
              multiline
              style={{
                flex: 1,
                backgroundColor: "#18181b",
                color: "white",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
              }}
              value={newComment}
              onChangeText={setNewComment}
              onSubmitEditing={addComment}
            />

            <TouchableOpacity
              onPress={addComment}
              style={{ marginLeft:  12 }}
            >
              <Text style={{ color: "#facc15", fontWeight: "bold" }}>
                Post
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </KeyboardAvoidingView>

    </BottomSheetModal>
  );
}

