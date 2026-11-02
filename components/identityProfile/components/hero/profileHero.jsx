import React from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useGlobalContext } from "../../../../context/GlobalProvider";
import ProfileInfos from "./profileInfos";
import FriendButton from "../../../custom/FriendButton";
import FollowButton from "../../../custom/FollowButton";

export default function ProfileHero({
  user,
  height = 620,
}) {
  const { spacing } = useGlobalContext();
  const coverImage =
    user?.coverImage?.cdnUrl ||
    user?.coverImage?.publicUrl;

  return (
    <View
      className=" w-full overfl ow-hidden bg-[#08090B]"
      style={{
        height,
      }}
    >
      {/* ===================================================== */}
      {/* COVER                                                 */}
      {/* ===================================================== */}

      {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          resizeMode="cover"
          className="absolute  h-full w-full"
        />
      ) : (
        <View className="absolute inset-0 bg-[#111317]" />
      )}

      {/* ===================================================== */}
      {/* GLOBAL CINEMATIC DARKENING                            */}
      {/* ===================================================== */}

      <LinearGradient
        colors={[
          "rgba(0,0,0,0.72)",
          "rgba(0,0,0,0.18)",
          "rgba(0,0,0,0.10)",
          "rgba(0,0,0,0.30)",
          "rgba(0,0,0,0.55)",
        ]}
        locations={[
          0,
          0.22,
          0.42,
          0.72,
          1,
        ]}
        // pointerEvents="none"
        className="absolute inset-0"
      />

      {/* ===================================================== */}
      {/* TOP CINEMATIC DEPTH                                   */}
      {/* ===================================================== */}

      <LinearGradient
        colors={[
          "rgba(0,0,0,0.92)",
          "rgba(0,0,0,0.55)",
          "rgba(0,0,0,0.16)",
          "transparent",
        ]}
        locations={[
          0,
          0.28,
          0.55,
          1,
        ]}
        pointerEvents="none"
        className="absolute left-0 right-0 top-0"
        style={{
          height: spacing(190),
        }}
      />

      {/* ===================================================== */}
      {/* BOTTOM CONTINUOUS BLACK FADE                         */}
      {/* ===================================================== */}

      <LinearGradient
        colors={[
          "transparent",
          "rgba(8,9,11,0.015)",
          "rgba(8,9,11,0.035)",
          "rgba(8,9,11,0.08)",
          "rgba(8,9,11,0.16)",
          "rgba(8,9,11,0.58)",
          "rgba(8,9,11,0.75)",
          "rgba(8,9,11,0.84)",
          "rgba(8,9,11,0.92)",
          "rgba(0,0,0,0.94)",
          "#08090B",
        ]}
        locations={[
          0,
          0.10,
          0.20,
          0.32,
          0.44,
          0.57,
          0.69,
          0.80,
          0.89,
          0.96,
          1,
        ]}
        pointerEvents="none"
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: spacing(200),
        }}
      />

      {/* ===================================================== */}
      {/* IDENTITY CONTENT                                      */}
      {/* ===================================================== */}

      <View
        className="absolute bottom-0 left-0 right-0"
        style={{
          paddingHorizontal: spacing(22),
        //   paddingBottom: spacing(26),
        }}
      >
        <ProfileInfos user={user} />
       
      </View>
    </View>
  );
}