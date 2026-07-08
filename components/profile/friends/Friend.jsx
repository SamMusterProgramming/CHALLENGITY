// import { View, Text, Image, Pressable } from "react-native";
// import React from "react";
// import { router } from "expo-router";
// import { MotiView } from "moti";

// export default function Friend({ friend, w, index }) {

//   return (
//     <MotiView
//       from={{ opacity: 0, translateY: 30 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{
//         delay: index * 60,
//         type: "timing",
//         duration: 400,
//       }}
//       style={{
//         width: "31%", // 3 columns clean
//         marginBottom: 18,
//       }}
//     >
//       <Pressable
//         onPress={() =>
//           router.push({
//             pathname: "/ViewProfile",
//             params: { user_id: friend.user_id },
//           })
//         }
//         style={({ pressed }) => ({
//           transform: [{ scale: pressed ? 0.96 : 1 }],
//           opacity: pressed ? 0.85 : 1,
//         })}
//       >
//         <View
//           style={{
//             borderRadius: 14,
//             backgroundColor: "rgba(255,255,255,0.04)",
//             paddingVertical: 14,
//             alignItems: "center",
//             borderWidth: 1,
//             borderColor: "rgba(255,255,255,0.05)",
//           }}
//         >
//           {/* IMAGE */}
//           <Image
//             source={{ uri: friend.profileImage?.publicUrl}}
//             style={{
//               width: w / 6,
//               height: w / 6,
//               borderRadius: 12,
//               marginBottom: 10,
//             }}
//           />

//           {/* NAME */}
//           <Text
//             numberOfLines={1}
//             style={{
//               color: "#E5E7EB",
//               fontSize: w / 40,
//               letterSpacing: 0.8,
//             }}
//             className="font-bebas"
//           >
//             {friend.name}
//           </Text>
//         </View>
//       </Pressable>
//     </MotiView>
//   );
// }

import React from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function Friend({ friend, w, index }) {

  const avatar = w / 5.9;
  const ITEM_WIDTH = (w - 36) / 4
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: .92,
        translateY: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateY: 0,
      }}
      transition={{
        delay: index * 35,
        duration: 350,
        type: "timing",
      }}
      style={{
        width: ITEM_WIDTH,
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/ViewProfile",
            params: {
              user_id: friend.user_id,
            },
          })
        }
        style={({ pressed }) => ({
          alignItems: "center",
          opacity: pressed ? .8 : 1,
          transform: [
            {
              scale: pressed ? .96 : 1,
            },
          ],
        })}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            source={{
              uri: friend.profileImage?.publicUrl,
            }}
            style={{
              width: avatar,
              height: avatar,
              borderRadius: avatar / 2,
              borderWidth: 2,
              borderColor: "rgba(234,179,8,.22)",
              backgroundColor: "#18191C",
            }}
          />

          {friend.verified && (
            <View
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 18,
                height: 18,
                borderRadius: 20,
                backgroundColor: "#111214",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="check-decagram"
                size={14}
                color="#eab308"
              />
            </View>
          )}
        </View>

        <Text
          numberOfLines={1}
          style={{
            color: "#F3F4F6",

            marginTop: 8,

            fontSize: 11,

            fontWeight: "600",

            width: avatar + 12,

            textAlign: "center",
          }}
        >
          {friend.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 2,

            color: "#7B8088",

            fontSize: 10,

            textAlign: "center",

            width: avatar + 10,
          }}
        >
          {friend.talent || friend.city || ""}
        </Text>
      </Pressable>
    </MotiView>
  );
}