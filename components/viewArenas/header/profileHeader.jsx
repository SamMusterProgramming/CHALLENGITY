import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { countries } from "../../../utilities/TypeData";
import { router } from "expo-router";
import FriendButton from "../../custom/FriendButton";
import FollowButton from "../../custom/FollowButton";

export default function ProfileHeader({
  profile,
  user,
  width = 360,
  arenaCount,
  totalStat,
  onFollow,
  onFriend,
}) {
  const isMe = profile?._id === user?._id;

  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingTop: 30,
        paddingBottom: 14,
        backgroundColor:"#000",

      }}
    >
      {/* TOP IDENTITY ROW */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        //   paddingHorizontal: 18,
        }}className ="justify-end"
      >
        {/* AVATAR */}
        <Image
          source={{
            uri:
              profile?.profileImage?.publicUrl ||
              "https://via.placeholder.com/100",
          }}
          style={{
            width: width/6.5,
            height: width/6.5,
            borderRadius: 50,
            // borderWidth: 2,
            // borderColor: "#eab308",
            backgroundColor: "#111",
          }}
        />

        {/* INFO */}
        <View style={{height: width/6, flex: 1, marginLeft: 12 }} 
        className ="justify-end"
        >
          {/* NAME + VERIFIED */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: width/25,
                fontWeight: "800",
              }}
            >
              {profile?.name || "Unknown Creator"}
            </Text>

            <MaterialCommunityIcons
              name="check-decagram"
              size={16}
              color="#eab308"
              style={{ marginLeft: 6 }}
            />
          </View>

          {/* ROLE */}
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: width/30,
              marginTop: 6,
            }}
            className ="mt-auto"
          >
            Talent Creator • stage
          </Text>

          {/* REGION */}
          <Text
            style={{
              color: "#eab308",
              fontSize: width/30,
              marginTop: 4,
              fontWeight: "600",
            }}
          >
            {countries.find(c => c.code === user.country)?.name} • Active Performer
          </Text>
        </View>

        {/* OPTIONS */}
        {/* <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(234,179,8,0.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={18}
            color="#eab308"
          />
        </TouchableOpacity> */}
         <TouchableOpacity
            onPress={() => router.back()}
            style={{
            position: "absolute",
            top: "0%",
            right: 12,
            zIndex: 999,
            padding: 10,
            borderRadius: 999,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderWidth: 1,
            borderColor: "rgba(234,179,8,0.3)",
            }} >
              <MaterialCommunityIcons name="close" size={30} color="#eab308" />
         </TouchableOpacity>
      </View>

      {/* BIO */}
      {/* <Text
        style={{
          marginTop: 10,
          color: "rgba(255,255,255,0.7)",
          fontSize: width/32,
          lineHeight: 18,
        }}
        numberOfLines={2}
      >
        {profile?.biography ||
          "Passionate talent creator building arenas of performance and competition."}
      </Text> */}

     

      {/* ACTIONS */}
      {!isMe && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
            // gap: 10,
          }}
          className = "justify-between"
        >
          {/* FRIEND */}
          <FriendButton userProfile={profile} />
          {/* <TouchableOpacity
            onPress={onFriend}
            style={{
              flex: 1,
              height: 38,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: "rgba(234,179,8,0.35)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#eab308", fontWeight: "700" }}>
              Add Friend
            </Text>
          </TouchableOpacity> */}

          {/* FOLLOW */}
          <FollowButton userProfile={profile} />
          {/* <TouchableOpacity
            onPress={onFollow}
            style={{
              flex: 1,
              height: 38,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: "rgba(234,179,8,0.35)",
            //   backgroundColor: "#eab308",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>
              Follow
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
       {/* STATS ROW */}
       <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <Stat label="Arenas" value={arenaCount || 3} />
        <Stat label="Performances" value={totalStat.totalPerformances || 0} />
        <Stat label="Followers" value={totalStat.totalFollowers || 0} />
        <Stat label="Friends" value={profile?.friendCount || 86} />
      </View>
    </View>
  );
}

/* STAT COMPONENT */
function Stat({ label, value }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: "#fff",
          fontSize:20,
          fontWeight: "800",
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 11,
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </View>
  );
}