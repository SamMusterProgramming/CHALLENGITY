import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useGlobalContext } from '../../../context/GlobalProvider'
import SpotlightIcon from '../../custom/spotlightIcon'
import NonSpotlightIcon from '../../custom/nonSpotlightIcon'

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
      width : index === performanceCount  -1 && index % 2 == 0 ? CARD_WIDTH * 2 : CARD_WIDTH ,
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

      <View className="absolute top-2 left-2 flex-row items-center gap-1 rounded-full bg -black/70  p- 1">
        {isSpotLight ? (
            <SpotlightIcon size ={12} />
          ):(
            <NonSpotlightIcon size ={12} />
          )}
      </View>
      

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
              width: CARD_WIDTH/7,
              height: CARD_WIDTH/7,
              borderRadius: 999,
              backgroundColor:  "rgba(255,255,255,0.8)",
              justifyContent: "center",
              alignItems:
                "center",
            }}
          >
            <MaterialCommunityIcons
              name="play"
              size={20}
              color="#000"
            />
          </View>
    </View>

    <View
        style={{
            position: "absolute",
            bottom: 2,
            // left: 2,
            // right: 2,
            width : "98%",
            padding : 10
        }}
        className = " rounded-lg flex-row justify-between items-center bg-[#000]/40"
         > 
            <View
                style={{
                }}
                className ="flex-row gap-1 items-center" >
                <MaterialCommunityIcons
                    name="eye"
                    size={CARD_WIDTH/13}
                    color="#eab308"
                />
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: CARD_WIDTH/20 }}>
                     {item.viewCount || 0}
                </Text>
            </View>
            
            <View
                style={{
                }}  className ="flex-row gap-1 items-center"  >
                <MaterialCommunityIcons
                    name="fire"
                    size={CARD_WIDTH/12}
                    color="#eab308"
                />
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: CARD_WIDTH/20 }}>
                    {item.fireCount || 0}
                </Text>
            </View>

            <View
                style={{
                }}  className ="flex-row gap-1 items-center"  >
                <MaterialCommunityIcons
                    name="message"
                    size={CARD_WIDTH/16}
                    color="#eab308"
                />
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: CARD_WIDTH/20 }}>
                    {item.commentCount || 0}
                </Text>
            </View>
    </View>
     {/* {canEdit && (
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={ () => {
        setArenaActionModal("delete_performance")
        setOpenArenaAlertModal(true)
        setPostToDeleteId(item._id)
      }}
      style={{
        position :"absolute" , 
        right: 5,
        top: 5,
        borderRadius: 22,
        backgroundColor: "rgba(17,18,20,.96)",
        borderWidth: 1,
        borderColor: "rgba(255,70,70,.18)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
      }}
      className = "p-2 rounded-full bg-black"
    >
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={21}
        color="#ef4444"
      />
    </TouchableOpacity>
    )} */}
  </TouchableOpacity>
  )
}