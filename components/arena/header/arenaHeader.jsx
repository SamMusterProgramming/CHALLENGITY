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


export default function ArenaHeader({ arena ,setSelectedArena ,setOpenEditArenaModal, setShownMenuPostId , onRefresh , refresh}) {
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
        backgroundColor: "#050505",
        paddingBottom: 24,
      }} >
      {/* COVER */}
      <View
        style={{
          height: height * 0.24,
          width: "100%",
          overflow: "hidden",
        }} >
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
        />
        <ArenaHumburgerMenu setShowArenaMenu = {setShowArenaMenu} showArenaMenu={showArenaMenu} size={width/10}  />

        {/* DARK OVERLAY */}
        <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        />
       
      </View>

      {/* PROFILE IMAGE */}
      <View
        style={{
          alignItems: "center",
          marginTop: -55,
        }}
      >
        <ArenaRefreshButton onRefresh={onRefresh} refresh ={refresh} size = {width/10}/>

        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 999,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: "#eab308",
            backgroundColor: "#111",
          }}
        >
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
      </View>

      {/* ARENA INFO */}
      <View
        style={{
          paddingHorizontal: 22,
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: height/39,//width / 16,
            fontWeight: "800",
            letterSpacing: 0.6,
            textAlign: "center",
          }}
        >
          {arena.arenaName}
        </Text>

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
                ? "#a16207"
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