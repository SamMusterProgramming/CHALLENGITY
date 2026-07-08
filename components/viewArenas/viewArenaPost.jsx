import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { deleteArenaPost, isUserFiredPost, toggleArenaPostFire, toggleArenaPostSpotlight } from "../../apiCalls";
import { useLoading } from "../../context/loadingContext";
import ViewArenaPostFooter from "./footer/ViewArenaPostFooter";
import ViewArenaPostHeader from "./header/ViewArenaPostHeader";



export default function ViewArenaPost({
                                    item,
                                    arena,
                                    onPress,
                                    profile,
                                    setSelectedArena,
                                    setArenas , 
                                    setSelectedPost
                                  }) {
  const { width , height } = useWindowDimensions();
  const fires = item?.firesCount || 0;
  const comments = item?.commentCount || 0;
  const { user } = useGlobalContext()
  const { showLoading, hideLoading } = useLoading();
  const [hasFired , setHasFired] = useState(false)
  //   let hasFired = item.isFired
  const [isLoaded , setIsLoaded] = useState(false)
  
  
   
  const toggleFire = async() => {
    // showLoading('deleting the post ...')
    const data = await toggleArenaPostFire({postId:item._id ,userId:user._id})
    const fired = data.active
    const updatedPost = data.post
    setSelectedArena(prev => ({
      ...prev,
      posts: prev.posts.map(post =>
        post._id.toString() === updatedPost._id.toString()
          ? updatedPost
          : post
      ),
    }));
    const updatedArena = {...arena , posts: arena.posts.map(post =>
         post._id.toString() === updatedPost._id.toString()
        ? updatedPost
        : post
    ),}
    setArenas(prev =>
      prev.map(a =>
        a._id.toString() === arena._id.toString()
          ? updatedArena
          : a
      )
    );
   
    setHasFired(fired)
    // onRefresh()
  }
  
  useEffect(() => {
    const checkFire = async() =>{
        const fired = await  isUserFiredPost({postId:item._id , userId:user._id})
        setHasFired(fired)
        setIsLoaded(true)
    }
    checkFire()
  }, [])
  
  if(!isLoaded) return null

  // const toggleFire = async() => {
  //   showLoading('deleting the post ...')
  //   await toggleArenaPostFire(item._id, {userId: user._id })
  //   if (hasFired) {
  //       item.fires = item.fires.filter(
  //         fireId => fireId.toString() !==  user._id.toString()
  //       );
  //       item.fireCount =  item.fireCount - 1
  //     } else {
  //       item.fires.push( user._id);
  //       item.fireCount =  item.fireCount + 1
  //     }
  //     hasFired = !hasFired;
  //     hideLoading()
  // }

  return (
    <View
      activeOpacity={0.95}
      // onPress={() => onPress?.(item)}
      style={{
        marginHorizontal: 14,
        marginBottom: 18,
        borderRadius: 9,
        overflow: "hidden",
        borderWidth: 1,
        borderColor:
          "rgba(234,179,8,0.12)",
      }}
      className ="bg-[#161617]"
    >
       <ViewArenaPostHeader  
        item ={item}
        width = {width}
        arena ={arena}
         />
     
      {/* THUMBNAIL */}

      <TouchableOpacity
        onPress={() => setSelectedPost(item)}
        style={{
          height: width * 0.85,
          position: "relative",
        }}
      >
        <Image
          resizeMode="cover"
          source={{
            uri:
              item?.media?.thumbnail
                ?.cdnUrl,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:
              "rgba(0,0,0,0.18)",
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >
          <View
            style={{
              width: width/11,
              height: width/11,
              borderRadius: 999,
              backgroundColor:  "rgba(234,179,8,0.7)",
              justifyContent: "center",
              alignItems:
                "center",
            }}
          >
            <MaterialCommunityIcons
              name="play"
              size={32}
              color="#000"
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* DESCRIPTION */}

      {/* {!!item.caption && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 14,
          }}
        >
          <Text
            style={{
              color: "#fff",
              lineHeight: 22,
              fontSize:width / 34,
              fontWeight: "600",
            }}
          >
            {item.caption}
          </Text>
        </View>
      )} */}

      {/* FOOTER */}

      <ViewArenaPostFooter
            width =  {width}
            views =  {item.viewCount}
            fires =  {item.fireCount}
            comments =  {item.ccommentCount}
            shares = {item.shareCount}
            hasFired = {hasFired}
            toggleFire ={toggleFire}
            onComments = {() => {}}
            onShare = {() => {}}
            onReport = {() => {}}
      />

      {/* <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 16,
        }}  >
            <TouchableOpacity
            activeOpacity={0.8}
            style={{
                flexDirection: "row",
                // alignItems: "center",
                marginRight: 20,
            }}
            onPress={toggleFire}
            className = "px-4 gap-2 items-center"
            >
                <Text
                style={{
                    fontSize: width/18,
                    color: hasFired ? "#eab308" : "#6b7280",
                    fontWeight: "900",
                    }} >
                    {hasFired ? "✦" : "✧"}
                </Text>

                <Text
                    style={{
                    color: "#FFF",
                    marginLeft: 6,
                    fontWeight: "600",
                    fontSize: width/35,
                    }}  >
                    {fires}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            activeOpacity={0.8}
            style={{
                flexDirection: "row",
                // alignItems: "center",
                marginRight: 20,
            }}
            className = "px-4 gap-2 items-center"
            // onPress={openComments}
            >
            <MaterialIcons
                name="chat-bubble"
                size={ width/22}
                color="#eab308"
                />

            <Text
                style={{
                color: "#FFF",
                marginLeft: 6,
                fontWeight: "700",
                fontSize: width/35,
                }}
            >
                {comments}
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
            activeOpacity={0.8}
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
            className = "px-4 gap-2"
            // onPress={sharePost}
            >
            <MaterialCommunityIcons
                name="share"
                size={width/17}
                color="#eab308"
            />

            <Text
                style={{
                color: "#FFF",
                marginLeft: 6,
                fontWeight: "700",
                }}
            >
                10
            </Text>
            </TouchableOpacity>


        <Text
            style={{
            color: "#fff",
            fontSize: width / 36,
            fontWeight: "500",
            }}  >
            {new Date(
            item.createdAt
            ).toLocaleDateString()}
        </Text>
    </View> */}
     

    </View>
  );
}