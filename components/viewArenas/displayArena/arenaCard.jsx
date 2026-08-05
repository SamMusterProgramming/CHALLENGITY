import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { countries, stageIcons } from "../../../utilities/TypeData";
import { router } from "expo-router";
import { getPostsArena, getUserById } from "../../../apiCalls";


export default function ArenaCard({
  arena,
  width,
  height,
  loadUProfile,
  playPerformance,
  setSelectedArena , 
  setSelectedPost
  }) {

  // const [profile , setProfile] = useState(null)
  // const [arenaPosts , setArenaPosts] = useState([])
  const thumbnail =
    arena?.posts?.[0]?.media?.thumbnail.cdnUrl ||
    arena?.coverImage?.publicUrl;
  const region = countries.find(  c => c.code === arena.region );

  // const loadUProfile = async()=>{
  //     await getUserById(arena.owner_id ,setProfile)
  // }

  // const playPerformance = async() => {
  //   await getPostsArena(arena._id , setArenaPosts)
  // }

  // useEffect(() => {
  //   if(!profile) return ;
  //   router.push({
  //       pathname: "/ViewProfile",
  //       params: {
  //         userProfile: JSON.stringify(
  //           profile
  //         ),
  //         arena_id : arena._id
  //       },
  //   });
  // }, [profile])
  
  // useEffect(() => {
  //   if(!arenaPosts.length) return ; 
  //   router.push({
  //     pathname:
  //       "/arenaPerformancePlayer",
  //     params: {
  //       selectedPostId:
  //       arenaPosts[0]._id,
  //       arenaPosts:
  //         JSON.stringify(
  //           arenaPosts
  //         ),
  //       arena : JSON.stringify(
  //         arena
  //       )
  //     },
  //   });
 
  // }, [arenaPosts])
  

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress = { () => setSelectedPost(arena.posts[0]) }
      style={{
        width,
        height: height ,
        borderRadius: 18,
        overflow:"hidden",
        backgroundColor:"#111",
        borderWidth:1,
        borderColor:
          "rgba(234,179,8,0.18)",
      }}
      className ="justify-center items-center"
    >
      {/* THUMBNAIL */}
      <Image
        source={{
          uri: thumbnail
        }}
        style={{
          width:"100%",
          height:"100%",
        }}
        resizeMode="cover"
      />
      {/* PLAY BUTTON */}
      <View
              style={{
                position: "absolute",
                width: width/11,
                height: width/11,
                borderRadius: 999,
                backgroundColor:  "rgba(255,255,255,0.8)",
                justifyContent: "center",
                alignItems: "center",
              }} >
              <MaterialCommunityIcons
                name="play"
                size={20}
                color = "black"
              />
      </View>
      {/* INFO OVERLAY */}
      <TouchableOpacity
          onPress = {() => {
            setSelectedArena(arena)
            // loadUProfile
          }}
        style={{
          position:"absolute",
          left:5,
          right:5,
          bottom:5,
          backgroundColor:
            "rgba(0,0,0,0.55)",
          borderRadius :18
        }}
        className = "p-3"  >
        <View
          style={{
            flexDirection:"row",
            alignItems:"center",
          }} >
          {/* PROFILE IMAGE */}
          <Image
            source={{
              uri:
              arena?.profileImage?.publicUrl
            }}
            style={{
              width:width/9,
              height:width/9,
              borderRadius:999,
              borderWidth:2,
              borderColor:"#eab308",
              backgroundColor:"#111",
            }}
          />
          <View
            style={{
              marginLeft:14,
              flex:1,
            }} 
            className = ""
             >
            {/* NAME */}
            <Text
              numberOfLines={1}
              style={{
                color:"#fff",
                fontSize:width/32,
                fontWeight:"900",
              }}
            >
              {arena.arenaName}
            </Text>

            {/* TYPE */}
           <View
           style ={{
            marginTop:8,
           }}
           className ="flex-row justify-start items-center">
              <Text
              style={{
          
                color:"#eab308",
                fontSize:width/34,
                fontWeight:"700",
              }}  >

              {arena.talentType}
              {" "}
              {stageIcons[arena.talentType]}

              {"  •  "}

              <Text
                style={{
                  color:
                  "rgba(255,255,255,0.65)",
                  fontSize:width/34,
                }}
              >
                {region?.flag}
                {" "}
                {region?.name} {'    '}
              </Text>

            </Text>
            <Text
                style={{
                  color:"#eab308",
                  fontWeight:"800",
                  fontSize:width/34,
                  marginLeft : "auto",
                  marginBottom :4
                }}  >
                ⭐  {''}
             </Text>
             <Text
                style={{
                  color:"#eab308",
                  fontWeight:"800",
                  fontSize:width/34,
                  marginRight : 10
                }}  >
                 {arena.stars?.length || 0} {'     '}
             </Text>
             <MaterialCommunityIcons
                name="video-outline"
                size={23}
                color="#fff"
              />
             <Text
              style={{
              color:
              "rgba(255,255,255,0.85)",
              marginLeft:8,
              fontSize:width/34,
              fontWeight:"700",
               }}  >
                 {arena.posts?.length || 0}
             </Text>
           </View>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}