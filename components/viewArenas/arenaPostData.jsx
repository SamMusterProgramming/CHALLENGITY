import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useLoading } from '../../context/loadingContext'
import { toggleArenaPostFire } from '../../apiCalls'

export default function ArenaPostData({item,width}) {
    const {user , setGlobalArenaRefresh} = useGlobalContext()
  const { showLoading, hideLoading } = useLoading();

  const fires = item?.fires?.length || 0;
  let hasFired = item.fires.some(
    fireId => fireId.toString() ===  user._id.toString()
  );

  const toggleFire = async() => {
    showLoading('Firing ...')
    await toggleArenaPostFire(item._id, {userId: user._id })
    if (hasFired) {
        item.fires = item.fires.filter(
          fireId => fireId.toString() !==  user._id.toString()
        );
      } else {
        item.fires.push( user._id);
      }
      hasFired = !hasFired;  
      hideLoading()
      if(item.owner_id === user._id) setGlobalArenaRefresh(true)
  }

  return (
        <View
        style={{
            position: "absolute",
            right: 10,
            bottom: 250,
            alignItems: "center",
            zIndex:50
        }}
        >

        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                alignItems:"center",
                marginBottom: 22,
                }}
            onPress={toggleFire}
            >
                <Text
                style={{
                    fontSize: width/12,
                    color: hasFired ? "#eab308" : "#fff",
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
            marginBottom:  22,
            }}
        >
            <Ionicons
            name="chatbubble"
            size={22}
            color="#fff"
            />

            <Text
            style={{
                color: "#fff",
                marginTop: 8, 
                fontSize: width/35,
                fontWeight: "600",
            }}
            >
            {item?.comments?.length || 0}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <MaterialCommunityIcons
            name="share"
            size={28}
            color="#fff"
            />
        </TouchableOpacity>
        </View>
  )
}