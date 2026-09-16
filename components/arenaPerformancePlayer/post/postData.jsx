import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useLoading } from '../../../context/loadingContext'

export default function PostData({item,width , onPress , commentCount , arena = null, 
                                  toggleFire , hasFired , fireCount}) {
  const { openShare , scale} = useGlobalContext()
  const fires = fireCount || 0;


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
        <View
          style={{
            alignItems:"center",
            marginBottom: 32,
            }}  >
            <MaterialCommunityIcons
            name="eye"
            size={scale(24)}
            color="#fff"
            />
            <Text
             style={{
                color: "#FFF",
                fontWeight: "700",
                fontSize: scale(12),
                marginTop:4,
                }}   >
            {item.viewCount}
            </Text>
        </View>

        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                alignItems:"center",
                marginBottom: 32,
                }}
            onPress={toggleFire} >
            
                <MaterialCommunityIcons
                    name="fire"
                    size={scale(25)}
                    color= {hasFired ? "#eab308" : "#fff"}
                />

                <Text
                    style={{
                    color: "#FFF",
                    fontWeight: "700",
                    fontSize: scale(12),
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
            onPress={onPress}  >
            <Ionicons
            name="chatbubble"
            size={scale(18)}
            color="#fff"
            />

            <Text
            style={{
                color: "#fff",
                marginTop: 8, 
                fontSize: scale(12),
                fontWeight: "700",
            }}  >
            {commentCount || 0}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
             onPress={() => openShare({
                category:"arena",
                type: "shared_performance",
                _id:    item.arena?._id || arena._id,
                name:   item.arena?.arenaName,
                region: item.arena?.region,
                talent: item.arena?.talentType,
                ownerId: item.owner?._id || arena.owner_id,
                postId : item._id
              })}  >
            <MaterialCommunityIcons
            name="share"
            size={scale(25)}
            color="#fff"
            />
        </TouchableOpacity>
    </View>
  )
}