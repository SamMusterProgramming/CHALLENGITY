import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { deleteArenaPost, toggleArenaPostFire, toggleArenaPostSpotlight } from "../../apiCalls";
import { useLoading } from "../../context/loadingContext";



export default function ViewArenaPost({
                                    item,
                                    arena,
                                    onPress,
                                    profile
                                  }) {
  const { width , height } = useWindowDimensions();
  const fires = item?.fires?.length || 0;
  const comments = item?.comments?.length || 0;
  const { selectedArena , setSelectedArena , user } = useGlobalContext()
  const { showLoading, hideLoading } = useLoading();

  let hasFired = item.fires.some(
    fireId => fireId.toString() ===  user._id.toString()
  );

  const toggleFire = async() => {
    showLoading('deleting the post ...')
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
  }

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
      {/* TOP BAR */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent:
            "space-between",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <View>
          <Text
            style={{
              color: "#eab308",
              fontWeight: "800",
              fontSize: width / 29,
              
            }}
          >
            {arena?.arenaName}
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              marginTop: 4,
              fontSize: width / 36,
              fontWeight: "600",

            }}
          >
            {arena?.talentType}
            {" • "}
            {arena?.region}
          </Text>
        </View>

        <View
            // style={{
            //     alignSelf: "justify-start",
            // }}
            // className = "justify-start items-start"
            >
            <View
                style={{
                flexDirection: "row",
                alignItems: "center",
                }} >
                <Text
                style={{
                    color: "#eab308",
                    marginRight: 5,
                    fontWeight: "800",
                    fontSize: width / 29,
                    // letterSpacing: 1,
                }}
                >
                {item.spotlight
                    ? "Spotlight"
                    : "Arena only"}
                </Text>
                <MaterialCommunityIcons
                name={
                    item.spotlight
                    ? "star"
                    : "star-outline"
                }
                size={18}
                color="#eab308"
                style ={{
                    marginBottom : 2
                }}
                />
            </View>

            <Text
                style={{
                color: "#fff",
                fontSize: width/36,
                marginTop: 4,
                fontWeight: "600",
                }}
            >
                {item.spotlight
                ? "Global Reach"
                : "Arena Reach"}
            </Text>
        </View>
                    
      
      </View>

      {/* THUMBNAIL */}

      <TouchableOpacity
        onPress={() => onPress?.(item)}
        style={{
          height: width * 0.75,
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

      {!!item.caption && (
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
      )}

      {/* FOOTER */}

      <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 16,
        }}
        >
      
            {/* FIRE */}

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

            {/* COMMENTS */}

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

            {/* SHARE */}

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
        {/* </View> */}

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
    </View>
     

    </View>
  );
}