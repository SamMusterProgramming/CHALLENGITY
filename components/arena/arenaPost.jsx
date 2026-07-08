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
import PostFooter from "./footer/postFooter";
import ArenaPostHeader from "./header/arenaPostHeader";
import { isLoaded } from "expo-font";

const MenuButton = ({
    icon,
    label,
    onPress,
    danger,
  }) => {

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          flexDirection: "row",
          alignItems: "center",
  
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={
            danger
              ? "#EF4444"
              : "#eab308"
          }
        />
  
        <Text
          style={{
            marginLeft: 12,
  
            color:
              danger
                ? "#EF4444"
                : "#FFFFFF",
  
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
};

export default function ArenaPost({
                                    item,
                                    setPostToDeleteId,
                                    arena,
                                    onPress,
                                    showMenuPostId , 
                                    setShowMenuPostId,
                                    onRefresh,
                                    setSelectedPost
                                  }) {
  const { width , height } = useWindowDimensions();
  const fires = item?.fireCounth || 0;
  const comments = item?.commentCount || 0;
  const { selectedArena , setSelectedArena , user , setUserArenas ,
          setOpenArenaAlertModal,setArenaActionModal} = useGlobalContext()
  const { showLoading, hideLoading } = useLoading();
  const showMenu = showMenuPostId === item._id;
  const [hasFired , setHasFired] = useState(false)
//   let hasFired = item.isFired
const [isLoaded , setIsLoaded] = useState(false)

  const deletePost = async()=>{
     showLoading('deleting the post ...')
     await deleteArenaPost( item._id, setSelectedArena , setUserArenas)
     hideLoading()
  }
  const toggleSpotlight = async() => {
    // showLoading('deleting the post ...')
    await toggleArenaPostSpotlight(item._id)
    item.spotlight = !item.spotlight;
    onRefresh()
    // hideLoading()
  }

  const toggleFire = async() => {
    // showLoading('deleting the post ...')
    const data = await toggleArenaPostFire( {postId:item._id ,userId:user._id })
    const fired = data.active
    // console.log(data)
    // setUserArenas(data.arenas)
    // setSelectedArena(data.arenas.find( a => a._id.toString() === arena._id.toString() ))
    setHasFired(fired)
    onRefresh()
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

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setSelectedPost(item)}
      style={{
        marginHorizontal: 14,
        marginBottom: 18,
        backgroundColor:  "#0E0E10",
        borderRadius: 5,
        overflow: "hidden",
        borderWidth: 1,
        borderColor:
          "rgba(234,179,8,0.12)",
      }}
    >
      <ArenaPostHeader  
        item ={item}
        width = {width}
        setShowMenuPostId = {setShowMenuPostId}
        showMenuPostId = {showMenuPostId} />
 
      {/* THUMBNAIL */}

      <View
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
      </View>

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

      <PostFooter
            width ={width}
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
      
      { showMenu && (
        <View
        style={{
        position: "absolute",
        top: 62,
        right: 16,
        width: 220,
        backgroundColor: "#0F0F10",
        borderRadius: 18,
        borderWidth: 1,
        borderColor:"rgba(234,179,8,0.15)",
        overflow: "hidden",
        zIndex: 999,
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 12,
        }}
        >
            <MenuButton
            icon="play-circle-outline"
            label="View Performance"
            onPress={() => {
                setShowMenuPostId(null);
                onPress?.(item)
            }}
            />
            <MenuButton
            icon= {!item.spotlight ? "star" :"star-outline"}
            label={item.spotlight ? "Keep in Arena" : "Feature in Spotlight"}
            onPress={() => {
                setShowMenuPostId(null);
                toggleSpotlight();
            }}
            />
            <MenuButton
            icon="share-variant-outline"
            label="Share Performance"
            onPress={() => {
                setShowMenuPostId(null);
                sharePost();
            }}
            />
            <MenuButton
            icon="chart-line"
            label="Performance Stats"
            onPress={() => {
                setShowMenuPostId(null);
                openAnalytics();
            }}
            />
            <MenuButton
            icon="delete-outline"
            danger
            label="Delete Performance"
            onPress={() => {
                setShowMenuPostId(null);
                // deletePost();
                setArenaActionModal("delete_performance")
                setOpenArenaAlertModal(true)
                setPostToDeleteId(item._id)
            }}
            />
        </View>
        )}

    </TouchableOpacity>
  );
}