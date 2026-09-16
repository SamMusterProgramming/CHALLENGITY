import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from '../../../context/GlobalProvider'
import SpotlightIcon from '../../custom/spotlightIcon'
import NonSpotlightIcon from '../../custom/nonSpotlightIcon'
import { LinearGradient } from 'expo-linear-gradient'

export default function PerformanceCard({item ,
    index ,
    canEdit = false,
    CARD_WIDTH ,
    performanceCount ,
    playPerformance,
    setPostToDeleteId = null,
    height = 300,
    }) {

    const {setArenaActionModal,
           openArenaAlertModal, 
           setOpenArenaAlertModal} = useGlobalContext()

    const isLocalSpotlight = item?.localSpotlight?.spotlight;
    const isRegionalSpotlight = item?.regionalSpotlight?.spotlight;
    const isGlobalSpotlight = item?.globalSpotlight?.spotlight;
    const isSpotLight = isLocalSpotlight  || isRegionalSpotlight ||  isGlobalSpotlight 
   
  return (
    <TouchableOpacity
    style={{
      height : height,
      width : index === performanceCount  -1 && index % 2 == 0 ? CARD_WIDTH * 2 + 15 : CARD_WIDTH ,
      // aspectRatio: 1,
      // margin: 12,
      borderRadius: 5,
      backgroundColor: "#111",
      overflow: "hidden",
    }}
    onPress={
       () => playPerformance(item)
    }
    className = "items-center"
  >
    <Image
      source={{ uri: item?.media?.thumbnail?.cdnUrl }}
      style={{ width: "100%", height: "100%" }}
      resizeMethod = "cover"
    />
   

      <LinearGradient
            pointerEvents="none"
            colors={[
              
              "rgba(0,0,0,0.85)",
              "rgba(0,0,0,0.28)",
              "rgba(0,0,0,0.16)",
              "transparent",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "58%",
            }}
          />
     
      <LinearGradient
            pointerEvents="none"
            colors={[
              "transparent",
              "rgba(0,0,0,0.05)",
              "rgba(0,0,0,0.28)",
              "rgba(0,0,0,0.86)",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "58%",
            }}
          />
      
      {isSpotLight && (
      <View className="absolute top-2 left-2 flex-row items-center gap-1 rounded-full bg -black/70  p- 1">
            <SpotlightIcon size ={10} />
      </View>
    )}

    <View
        style={{
            position: "absolute",
            bottom: 2,
            // left: 2,
            // right: 2,
            width : "98%",
            padding : 10
        }}
        className = " rounded-lg flex-row justif y-between gap-6 items-center b g-[#000]/40"
         > 
            <View
                style={{
                }}
                className ="flex-row gap-1 items-center" >
                <MaterialCommunityIcons
                    name="eye-outline"
                    size={CARD_WIDTH/11}
                    color="#fff"
                />
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: CARD_WIDTH/20 }}>
                     {item.viewCount || 0}
                </Text>
            </View>
            
            <View
                style={{
                }}  className ="flex-row gap-1 items-center"  >
                <MaterialCommunityIcons
                    name="fire"
                    size={CARD_WIDTH/11}
                    color="#fff"
                />
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: CARD_WIDTH/20 }}>
                    {item.fireCount || 0}
                </Text>
            </View>

            <View
                style={{
                }}  className ="flex-row gap-1 items-center"  >
                <MaterialCommunityIcons
                    name="message-outline"
                    size={CARD_WIDTH/14}
                    color="#fff"
                />
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: CARD_WIDTH/20 }}>
                    {item.commentCount || 0}
                </Text>
            </View>
    </View>

  </TouchableOpacity>
  )
}