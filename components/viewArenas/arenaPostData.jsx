import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useLoading } from '../../context/loadingContext'
import { toggleArenaPostFire } from '../../apiCalls'

export default function ArenaPostData({item,width , onPress , commentCount ,
                        setOpenCommentDrawer , toggleFire , hasFired , fireCount}) {
    const {user , setGlobalArenaRefresh} = useGlobalContext()
  const { showLoading, hideLoading } = useLoading();

  const fires = fireCount || 0;


//   const toggleFire = async() => {
//     showLoading('Firing ...')
//     await toggleArenaPostFire({postId:item._id , userId: user._id })
//     if (hasFired) {
//         item.fires = item.fires.filter(
//           fireId => fireId.toString() !==  user._id.toString()
//         );
//       } else {
//         item.fires.push( user._id);
//       }
//       hasFired = !hasFired;  
//       hideLoading()
//       if(item.owner_id === user._id) setGlobalArenaRefresh(true)
//   }

  return (
        <View
        style={{
            position: "absolute",
            right: 10,
            bottom: 150,
            alignItems: "center",
            zIndex:50
        }}
        >
        
            {/* VIEWS */}
        <View
          style={{
            alignItems:"center",
            marginBottom: 32,
            }}
        >
            <MaterialCommunityIcons
            name="eye"
            size={28}
            color="#eab308"
            />
            <Text
             style={{
                color: "#FFF",
                fontWeight: "600",
                fontSize: width/35,
                marginTop:4,
                }}
            >
            {item.viewCount}
            </Text>
        </View>

        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                alignItems:"center",
                marginBottom: 32,
                }}
            onPress={toggleFire}
            >
                <Text
                style={{
                    fontSize: width/12,
                    color: hasFired ? "#eab308" : "#eab308",
                    fontWeight: "900",
                    }} >
                    {hasFired ? "✦" : "✧"}
                </Text>

                <Text
                    style={{
                    color: "#FFF",
                    fontWeight: "600",
                    fontSize: width/35,
                    marginTop:4,
                    }}  >
                    {fires}
                </Text>
       </TouchableOpacity>

        <TouchableOpacity
            style={{
            alignItems: "center",
            marginBottom:  32,
            }}
            onPress={onPress}
        >
            <Ionicons
            name="chatbubble"
            size={22}
            color="#eab308"
            />

            <Text
            style={{
                color: "#fff",
                marginTop: 8, 
                fontSize: width/35,
                fontWeight: "600",
            }}
            >
            {commentCount || 0}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <MaterialCommunityIcons
            name="share"
            size={28}
            color="#eab308"
            />
        </TouchableOpacity>
        </View>
  )
}