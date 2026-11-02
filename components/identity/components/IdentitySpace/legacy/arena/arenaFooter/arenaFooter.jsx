import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function ArenaFooter({scale, spacing , onPress , activeArenaTab}) {
 
  const getFooterInfos = () => {
    switch (activeArenaTab) {
        case "myArenas":
            return {
               title: "CREATE ARENA",
               description : `Your arena is your personal talent space. Showcase your performances, earn the spotlight, and reach a wider audience.` ,
               note : `  Each arena represents a distinct talent space
                    within your legacy.`
               }
            break;
        case "myFollowings":
            return {
                title: "DISCOVER ARENAS",
                description : `Follow your favorite arenas to discover standout performances, track their journey, and never miss a moment of talent.` ,
                note : `  Each arena represents a distinct talent space
                     within your legacy.`
                }
            break;
        case "myFriends":
        
            break;
        default:
            return null
            break;
    }
  }

  const footerData = getFooterInfos()

  return (
    <View>
        <Pressable
        onPress={onPress}
        android_ripple={{
            color: "rgba(8,9,11,0.12)",
            borderless: false,
        }}
        className="flex-row items-center w- full justify-center"
        style={{
            height: spacing(48),
            marginTop: spacing(8),
            borderRadius: scale(14),
            borderWidth: scale(1),
            }}  >
             <LinearGradient
                colors={[
                  "#FFF1A5",
                  "#F4C542",
                  "#DDA21C",
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderRadius : scale(14)
                }}
              />
              {/* <Text
                style={{
                color: "#08090B",
                fontSize: scale(23),
                lineHeight: spacing(26),
                fontWeight: "400",
                marginRight: spacing(9),
                marginTop: scale(-2),
                }}
                 >
                +
              </Text> */}

              <Text
                style={{
                color: "#08090B",
                fontSize: scale(10),
                lineHeight: spacing(15),
                fontWeight: "900",
                letterSpacing: scale(1.15),
                }}
                >
                {footerData?.title}
              </Text>
        </Pressable>
        <View
            style={{
            marginTop: spacing(15),
            paddingHorizontal: spacing(3),
            }}  >
            <View
            className="flex-row items-start"
            style={{
                marginBottom: spacing(9),
            }}
            >
                <View className="flex-1">
                    <Text
                    style={{
                        color: "rgba(255,255,255,0.84)",
                        fontSize: scale(10),
                        lineHeight: spacing(18),
                        fontWeight: "700",
                        // letterSpacing: scale(0.15),
                    }}  >
                      {footerData?.description}
                    </Text>

                    <Text
                    style={{
                        marginTop: spacing(4),
                        color: "rgba(255,255,255,0.34)",
                        fontSize: scale(9),
                        lineHeight: spacing(13),
                        fontWeight: "500",
                    }}
                    >
                    Each arena represents a distinct talent space
                    within your legacy.
                    </Text>
                </View>
            </View>
        </View>
    </View> 
  )
}