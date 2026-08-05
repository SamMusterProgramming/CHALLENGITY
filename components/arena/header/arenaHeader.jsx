import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ArenaRefreshButton from "../custom/arenaRefreshButton";
import ArenaHumburgerMenu from "../custom/arenaHumburgerMenu";
import { LinearGradient } from "expo-linear-gradient";


export default function ArenaHeader({ arena ,setSelectedArena ,setOpenEditArenaModal,
  setShowArenaSelector, setShownMenuPostId , onRefresh , refresh}) {
  const { width, height } = useWindowDimensions();
  const {uploadPerformanceLoading , setUploadPerformanceLoading , arenaModalAction, setArenaActionModal
  ,setOpenArenaAlertModal} = useGlobalContext()
  const [showArenaMenu, setShowArenaMenu] = useState(false);
  if (!arena) return null;
  const followersCount = arena?.followerCount || 0;
  const postsCount = arena?.postCount || 0;
  const starsCount = arena?.starCount || 0;

  return (
    <View
      style={{
        backgroundColor: "#000", // "#050505",
        paddingBottom: 24,
      }}
      className ="item s-center" >
      {/* COVER */}
      <View
        style={{
          height: height * 0.25,
          width: "100%",
          overflow: "hidden",
        }} 
        className = "items-center  [#191109]"
        >
        <Image
          source={{
            uri:
              arena?.coverImage?.publicUrl ||
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
          className ="rounded-t-xl  p- 2 bg-black"
        />
        <ArenaHumburgerMenu setShowArenaMenu = {setShowArenaMenu} showArenaMenu={showArenaMenu} size={width/10}  />
        <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,.05)",
              "rgba(0,0,0,.65)",
              "rgba(0,0,0,1)",
              "#000",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right:0,
              bottom: -5,
              height: height / 9,
            }}
          />
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 999,
            overflow: "hidden",
            // borderWidth: 3,
            // borderColor: "#eab308",
            backgroundColor: "#111",
          }} 
          className = "absolute bottom-0 left-5" >
          <Image
            source={{
              uri:
                arena?.profileImage?.publicUrl ||
                "https://i.pravatar.cc/300",
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        {/* DARK OVERLAY */}
        {/* <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        /> */}
       
      </View>

      {/* PROFILE IMAGE */}
      

      {/* ARENA INFO */}
      <View className = "px-4 w-[100%] mi n-h -24">
      <TouchableOpacity
      onPress={() => setShowArenaSelector(true)}
      className = "flex-row items-start p-4 mt-6 fle x-1 justify-between bg-gold/10 rounded-3xl">
        <MaterialCommunityIcons
                name="chevron-down"
                size={44}
                color="#eab308"
              />
        <View
          style={{
            paddingHorizontal: 22,
            alignItems: "center",
            marginTop: 14,
            // flex:1
          }} >
          <View
          className ="flex-row gap-4" >
            <Text
              style={{
                color: "#fff",
                fontSize: height/45,//width / 16,
                fontWeight: "800",
                letterSpacing: 0.6,
                textAlign: "center",
              }}
            >
              {arena.arenaName}
            </Text>
          </View>

          <Text
            style={{
              color: "#eab308",
              marginTop: 4,
              fontWeight: "700",
              fontSize: height/62,
            }}
          >
            {arena.region} • {arena.talentType}
          </Text>

          {arena.biography && (
            <Text
              style={{
                color: "#B5B5B5",
                marginTop: 12,
                textAlign: "center",
                lineHeight: 22,
                fontSize: width / 28,
              }}
            >
              {arena.biography}
            </Text>
          )}
        </View>
        <MaterialCommunityIcons
                name="chevron-down"
                size={44}
                color="#eab308"
              />
      </TouchableOpacity>
      </View>

      {/* STATS */}
      <View
        style={{
          marginTop: 24,
          marginHorizontal: 14,
          backgroundColor: "#111214",
          borderRadius: 9,
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.12)",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}>
        <StatItem value={postsCount} label="Posts" />
        <StatItem value={followersCount} label="Followers" />
        <StatItem value={starsCount} label="stars" />
      </View>

      {/* DESCRIPTION */}
      {!!arena.description && (
        <View
            style={{
            marginTop: 18,
            marginHorizontal: 16,
            paddingVertical : 16 ,
            borderRadius: 10,
            backgroundColor: "#111214",
            borderWidth: 1,
            borderColor:"rgba(234,179,8,0.10)",
            overflow: "hidden",
            }}
        >
            {/* HEADER */}
            <View
            style={{
                paddingHorizontal: 16,
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,255,255,0.05)",
            }}
            >
            <Text
                style={{
                color: "#eab308",
                fontWeight: "800",
                letterSpacing: 1,
                fontSize:
                    height / 69,
                }}
            >
                DESCRIPTION
            </Text>
            </View>

            {/* CONTENT */}

            <Text
            style={{
                color: "#D1D5DB",
                lineHeight: 22,
                paddingHorizontal: 16,
                fontSize:  height / 62,
            }}
            >
            {arena.description}
            </Text>

        </View>
        )}

      {/* SPOTLIGHT CARD */}
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 14,
          borderRadius: 8,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.18)",
          backgroundColor: "#111214",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: 250,
            backgroundColor: "rgba(234,179,8,0.08)",
            top: -120,
            right: -60,
          }}
        />

        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              color: "#eab308",
              fontWeight: "800",
              fontSize: height / 52,
              letterSpacing: 1,
            }}
          >
            ✨ SPOTLIGHT
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              marginTop: 12,
              fontSize: height / 52,
              fontWeight: "700",
            }}
          >
            Share your talent with the world
          </Text>

          <Text
            style={{
              color: "#A1A1AA",
              marginTop: 8,
              lineHeight: 20,
            }}
          >
            Publish a performance, showcase your progress, and let your
            followers engage with your journey.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            disabled={uploadPerformanceLoading}
            onPress={() => {
                setShownMenuPostId(null)
                setArenaActionModal("create_performance")
                setOpenArenaAlertModal(true)
            }}
            style={{
                marginTop: 18,
                borderRadius: 9,
                backgroundColor: uploadPerformanceLoading
                ? "#eab308"
                : "#eab308",
                justifyContent: "center",
                alignItems: "center",
            }}
            className="py-4"
            >
            {uploadPerformanceLoading ? (
                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
                >
                <ActivityIndicator
                    size="small"
                    color="#000"
                />

                <Text
                    style={{
                    color: "#000",
                    fontWeight: "800",
                    marginLeft: 10,
                    letterSpacing: 1,
                    fontSize: height / 72,
                    }}
                >
                    UPLOADING...
                </Text>
                </View>
            ) : (
                <Text
                style={{
                    color: "#000",
                    fontWeight: "800",
                    letterSpacing: 1,
                    fontSize: height / 72,
                }}
                >
                ADD PERFORMANCE
                </Text>
            )}
            </TouchableOpacity>
        </View>
      </View>

      {showArenaMenu && (
        <View
            style={{
            position: "absolute",
            top: 70,
            right: 18,
            width: 190,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "rgba(12,12,12,0.76)",
            borderWidth: 1,
            borderColor: "rgba(234,179,8,0.15)",
            zIndex:50
            }}  >

            {/* EDIT */}

            <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
                setShowArenaMenu(false);
                setOpenEditArenaModal(true)
                // router.push({
                // pathname:
                //     "/EditArena",
                // params: {
                //     arena:
                //     JSON.stringify(
                //         arena
                //     ),
                // },
                // });
            }}
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
            }}
            >
            <MaterialCommunityIcons
                name="pencil-outline"
                size={20}
                color="#eab308"
            />

            <Text
                style={{
                color: "#fff",
                marginLeft: 12,
                fontWeight: "600",
                }}
            >
                Edit Arena
            </Text>
            </TouchableOpacity>

            <View
            style={{
                height: 1,
                backgroundColor:
                "rgba(255,255,255,0.05)",
            }}
            />
            {/* SHARE */}
            <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
                setShowArenaMenu(false);
                setOpenArenaAlertModal(true)
            }}
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
            }}
            >
            <MaterialCommunityIcons
                name="share-variant"
                size={20}
                color="#eab308"
            />
            <Text
                style={{
                color: "#fff",
                marginLeft: 12,
                fontWeight: "600",
                }}
            >
                Share Arena
            </Text>
            </TouchableOpacity>
            <View
            style={{
                height: 1,
                backgroundColor:
                "rgba(255,255,255,0.05)",
            }}
            />
            {/* DELETE */}
            <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => { 
                if(arena.posts.length > 0) setArenaActionModal("delete_arena_deny")
                else setArenaActionModal("delete_arena")
                 setOpenArenaAlertModal(true)
                 setShowArenaMenu(false);
                 }}
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
            }}
            >
            <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                color="#EF4444"
            />
            <Text
                style={{
                color: "#EF4444",
                marginLeft: 12,
                fontWeight: "700",
                }}
            >
                Delete Arena
            </Text>
            </TouchableOpacity>
        </View>
        )}


    </View>
  );
}

function StatItem({ value, label }) {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: "800",
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          color: "#9CA3AF",
          marginTop: 4,
          fontSize: 12,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}