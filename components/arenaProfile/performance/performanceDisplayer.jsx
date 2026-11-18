
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { useGlobalContext } from "../../../context/GlobalProvider";
// import { useLoading } from "../../../context/loadingContext";
// import { deleteArenaPost, isUserFiredPost, toggleArenaPostFire, toggleArenaPostSpotlight } from "../../../apiCalls/arenas";
// import RisingStarIcon from "../../svgIcons/RisingStarIcon";

// const COLORS = {
//   background: "#111214",
//   surface: "#17181B",
//   surfaceElevated: "#202125",
//   gold: "#E8BC63",
//   goldBright: "#F4CF7A",
//   text: "#FFFFFF",
//   textSecondary: "#B9BBC1",
//   textMuted: "#777B83",
//   border: "rgba(255,255,255,0.075)",
//   goldBorder: "rgba(232,188,99,0.19)",
//   danger: "#F06A6A",
// };

// const formatCount = (value = 0) => {
//   const number = Number(value) || 0;

//   if (number >= 1000000) {
//     return `${(number / 1000000).toFixed(1)}M`;
//   }

//   if (number >= 1000) {
//     return `${(number / 1000).toFixed(1)}K`;
//   }

//   return `${number}`;
// };

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: 12,
//     marginTop: 18,
//     marginBottom: 12,
//     borderRadius: 17,
//     backgroundColor: COLORS.surface,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     overflow: "visible",
//   },

//   imageFrame: {
//     width: "100%",
//     overflow: "hidden",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     backgroundColor: "#202125",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//   },

//   imagePlaceholder: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#1A1B1F",
//   },

//   topGradient: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "48%",
//   },

//   bottomGradient: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "65%",
//   },

//   spotlightBadge: {
//     position: "absolute",
//     top: 12,
//     left: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 9,
//     paddingTop: 7,
//     paddingBottom: 6,
//     borderRadius: 10,
//     backgroundColor: "rgba(12,12,13,0.76)",
//     borderWidth: 1,
//     borderColor: "rgba(232,188,99,0.27)",
//   },

//   metricsRow: {
//     position: "absolute",
//     left: 14,
//     right: 14,
//     bottom: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   metric: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 19,
//   },

//   metricText: {
//     marginLeft: 5,
//     color: COLORS.text,
//     fontWeight: "700",
//     fontVariant: ["tabular-nums"],
//   },

//   footer: {
//     paddingHorizontal: 14,
//     paddingTop: 14,
//     paddingBottom: 15,
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//     backgroundColor: COLORS.surface,
//   },

//   footerTop: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   titleContainer: {
//     flex: 1,
//     minWidth: 0,
//     paddingRight: 12,
//   },

//   caption: {
//     color: "#F1F1F2",
//     fontWeight: "700",
//     letterSpacing: 0.05,
//   },

//   performerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     minWidth: 0,
//   },

//   avatar: {
//     width: 25,
//     height: 25,
//     borderRadius: 9,
//     overflow: "hidden",
//     backgroundColor: "#292A2E",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.10)",
//   },

//   avatarImage: {
//     width: "100%",
//     height: "100%",
//   },

//   performerName: {
//     flexShrink: 1,
//     marginLeft: 7,
//     color: "#E7E7E9",
//     fontWeight: "600",
//   },

//   separator: {
//     width: 3,
//     height: 3,
//     borderRadius: 2,
//     marginHorizontal: 7,
//     backgroundColor: "#65666C",
//   },

//   metadata: {
//     flexShrink: 1,
//     color: COLORS.textMuted,
//     fontWeight: "500",
//   },

//   menuButton: {
//     width: 34,
//     height: 34,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(255,255,255,0.045)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.085)",
//   },

//   menu: {
//     position: "absolute",
//     zIndex: 100,
//     elevation: 18,
//     right: 10,
//     bottom: 76,
//     width: 218,
//     paddingVertical: 5,
//     borderRadius: 15,
//     overflow: "hidden",
//     backgroundColor: "#1B1C20",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.10)",
//     shadowColor: "#000000",
//     shadowOpacity: 0.45,
//     shadowRadius: 18,
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//   },

//   menuItem: {
//     minHeight: 45,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 14,
//     paddingVertical: 11,
//   },

//   menuIconContainer: {
//     width: 30,
//     height: 30,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(232,188,99,0.085)",
//   },

//   menuLabel: {
//     flex: 1,
//     marginLeft: 10,
//     color: "#F0F0F2",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   menuDivider: {
//     height: 1,
//     marginVertical: 5,
//     backgroundColor: "rgba(255,255,255,0.075)",
//   },
// });

// export default function PerformanceDisplayer({
//   item,
//   arena,
//   setPostToDeleteId,
//   setSelectedPost,
//   onPress,
//   showMenuPostId,
//   setShowMenuPostId,
//   onRefresh,
//   isMe,
// }) {
//   const {
//     user,
//     setSelectedArena,
//     setUserArenas,
//     setOpenArenaAlertModal,
//     setArenaActionModal,
//     scale,
//     getPerformanceThumbnailHeight,
//   } = useGlobalContext();

//   const { showLoading, hideLoading } = useLoading();

//   const [hasFired, setHasFired] = useState(false);
//   const [isReady, setIsReady] = useState(item?.temp || false);

//   const isLocalSpotlight = !!item?.localSpotlight?.spotlight;
//   const isRegionalSpotlight = !!item?.regionalSpotlight?.spotlight;
//   const isGlobalSpotlight = !!item?.globalSpotlight?.spotlight;

//   const isSpotlight =
//     isLocalSpotlight ||
//     isRegionalSpotlight ||
//     isGlobalSpotlight;

//   const spotlightTypes = [
//     isLocalSpotlight && "LOCAL",
//     isRegionalSpotlight && "REGIONAL",
//     isGlobalSpotlight && "GLOBAL",
//   ].filter(Boolean);

//   const spotlightLabel = spotlightTypes.length
//     ? spotlightTypes.join(" • ")
//     : "PROGRESSIVE";

//   const fires = item?.fireCount ?? item?.fireCounth ?? 0;
//   const comments = item?.commentCount ?? item?.ccommentCount ?? 0;
//   const views = item?.viewCount ?? item?.views ?? 0;
//   const shares = item?.shareCount ?? item?.shares ?? 0;

//   const duration =
//     item?.duration ||
//     item?.videoDuration ||
//     item?.media?.duration ||
//     null;

//   const thumbnail =
//     item?.media?.thumbnail?.cdnUrl ||
//     item?.media?.thumbnail?.url;

//   const showMenu = showMenuPostId === item?._id;

//   const caption =
//     item?.caption ||
//     item?.title ||
//     item?.performanceName ||
//     "Performance";

//   const performerName =
//     item?.userName ||
//     item?.username ||
//     item?.ownerName ||
//     arena?.arenaName ||
//     "Arena performer";

//   useEffect(() => {
//     if (item?.temp || !item?._id || !user?._id) return;

//     let mounted = true;

//     const checkFire = async () => {
//       try {
//         const result = await isUserFiredPost({
//           postId: item._id,
//           userId: user._id,
//         });

//         if (mounted) {
//           setHasFired(
//             typeof result === "boolean"
//               ? result
//               : !!result?.active
//           );
//           setIsReady(true);
//         }
//       } catch (error) {
//         console.log("Failed to check performance fire:", error);

//         if (mounted) {
//           setIsReady(true);
//         }
//       }
//     };

//     checkFire();

//     return () => {
//       mounted = false;
//     };
//   }, [item?._id, item?.temp, user?._id]);

//   const toggleFire = async () => {
//     if (item?.temp || !user?._id) return;

//     try {
//       const data = await toggleArenaPostFire({
//         postId: item._id,
//         userId: user._id,
//       });

//       setHasFired(!!data?.active);
//       onRefresh?.();
//     } catch (error) {
//       console.log("Failed to toggle performance fire:", error);
//     }
//   };

//   const toggleSpotlight = async () => {
//     try {
//       await toggleArenaPostSpotlight(item._id);
//       setShowMenuPostId(null);
//       onRefresh?.();
//     } catch (error) {
//       console.log("Failed to toggle spotlight:", error);
//     }
//   };

//   const openPerformance = () => {
//     setShowMenuPostId(null);
//     setSelectedPost?.(item);
//     onPress?.(item);
//   };

//   const openDeleteConfirmation = () => {
//     setShowMenuPostId(null);
//     setPostToDeleteId(item._id);
//     setArenaActionModal("delete_performance");
//     setOpenArenaAlertModal(true);
//   };

//   const deletePost = async () => {
//     try {
//       showLoading("Deleting performance...");

//       await deleteArenaPost(
//         item._id,
//         setSelectedArena,
//         setUserArenas
//       );
//     } catch (error) {
//       console.log("Failed to delete performance:", error);
//     } finally {
//       hideLoading();
//     }
//   };

//   const closeMenu = () => {
//     setShowMenuPostId(null);
//   };

//   const renderMenuItem = ({
//     icon,
//     label,
//     onPress: onItemPress,
//     danger = false,
//   }) => (
//     <TouchableOpacity
//       key={label}
//       activeOpacity={0.72}
//       onPress={onItemPress}
//       style={styles.menuItem}
//     >
//       <View
//         style={[
//           styles.menuIconContainer,
//           danger && {
//             backgroundColor: "rgba(240,106,106,0.09)",
//           },
//         ]}
//       >
//         <MaterialCommunityIcons
//           name={icon}
//           size={17}
//           color={danger ? COLORS.danger : COLORS.gold}
//         />
//       </View>

//       <Text
//         style={[
//           styles.menuLabel,
//           danger && { color: COLORS.danger },
//         ]}
//       >
//         {label}
//       </Text>

//       {!danger && (
//         <MaterialCommunityIcons
//           name="chevron-right"
//           size={16}
//           color="#666970"
//         />
//       )}
//     </TouchableOpacity>
//   );

//   if (!isReady && !item?.temp) return null;

//   return (
//     <View style={styles.card}
//     >
//       {/* Performance thumbnail */}
//       <TouchableOpacity
//         activeOpacity={0.96}
//         onPress={openPerformance}
//         className = ""
//       >
//         <View
//           style={[
//             styles.imageFrame,
//             { height: getPerformanceThumbnailHeight() },
//           ]}
//         >
//           {thumbnail ? (
//             <Image
//               source={{ uri: thumbnail }}
//               resizeMode="cover"
//               style={styles.image}
//             />
//           ) : (
//             <View style={styles.imagePlaceholder}>
//               <MaterialCommunityIcons
//                 name="video-outline"
//                 size={42}
//                 color="#62636A"
//               />
//               <Text
//                 style={{
//                   color: "#85868C",
//                   fontSize: 11,
//                   fontWeight: "600",
//                   marginTop: 7,
//                 }}
//               >
//                 Performance preview
//               </Text>
//             </View>
//           )}

//           <LinearGradient
//             pointerEvents="none"
//             colors={[
//               "rgba(0,0,0,0.42)",
//               "rgba(0,0,0,0.12)",
//               "transparent",
//             ]}
//             locations={[0, 0.55, 1]}
//             style={styles.topGradient}
//           />

//           <LinearGradient
//             pointerEvents="none"
//             colors={[
//               "transparent",
//               "rgba(0,0,0,0.25)",
//               "rgba(0,0,0,0.78)",
//               "rgba(0,0,0,0.90)",
//             ]}
//             locations={[0, 0.38, 0.72, 1]}
//             style={styles.bottomGradient}
//           />

//           {/* Spotlight indicator */}
//           {isSpotlight && (
//             <View style={styles.spotlightBadge}>
//               <RisingStarIcon size={scale(28)} />

//               <Text
//                 style={{
//                   marginTop: 2,
//                   color: COLORS.goldBright,
//                   fontSize: scale(7.5),
//                   fontWeight: "800",
//                   letterSpacing: 1,
//                 }}
//               >
//                 SPOTLIGHT
//               </Text>
//             </View>
//           )}

//           {/* Performance metrics */}
//           <View style={styles.metricsRow}>
//             <View style={styles.metric}>
//               <MaterialCommunityIcons
//                 name="eye-outline"
//                 size={scale(17)}
//                 color="#FFFFFF"
//               />

//               <Text
//                 style={[
//                   styles.metricText,
//                   { fontSize: scale(10) },
//                 ]}
//               >
//                 {formatCount(views)}
//               </Text>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.75}
//               onPress={toggleFire}
//               style={styles.metric}
//             >
//               <MaterialCommunityIcons
//                 name="fire"
//                 size={scale(18)}
//                 color={hasFired ? COLORS.goldBright : "#FFFFFF"}
//               />

//               <Text
//                 style={[
//                   styles.metricText,
//                   {
//                     fontSize: scale(10),
//                     color: hasFired ? COLORS.goldBright : "#FFFFFF",
//                   },
//                 ]}
//               >
//                 {formatCount(fires)}
//               </Text>
//             </TouchableOpacity>

//             <View style={[styles.metric, { marginRight: 0 }]}>
//               <MaterialCommunityIcons
//                 name="comment-outline"
//                 size={scale(16)}
//                 color="#FFFFFF"
//               />

//               <Text
//                 style={[
//                   styles.metricText,
//                   { fontSize: scale(10) },
//                 ]}
//               >
//                 {formatCount(comments)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>

//       {/* Performance details */}
//       <View style={styles.footer}>
//         <View style={styles.footerTop}>
//           <View style={styles.titleContainer}>
//             <Text
//               numberOfLines={2}
//               ellipsizeMode="tail"
//               style={[
//                 styles.caption,
//                 {
//                   fontSize: scale(12.5),
//                   lineHeight: scale(18),
//                 },
//               ]}
//             >
//               {caption}
//             </Text>

//             <View style={styles.performerRow}>
//               <View style={styles.avatar}>
//                 {item?.profileImage ? (
//                   <Image
//                     source={{ uri: item.profileImage }}
//                     style={styles.avatarImage}
//                   />
//                 ) : (
//                   <MaterialCommunityIcons
//                     name="stadium"
//                     size={scale(15)}
//                     color="#D5D5D8"
//                   />
//                 )}
//               </View>

//               <Text
//                 numberOfLines={1}
//                 style={[
//                   styles.performerName,
//                   { fontSize: scale(10.5) },
//                 ]}
//               >
//                 {performerName}
//               </Text>

//               <View style={styles.separator} />

//               <Text
//                 numberOfLines={1}
//                 style={[
//                   styles.metadata,
//                   { fontSize: scale(9.5) },
//                 ]}
//               >
//                 #{arena?.talentType || "Performance"}
//               </Text>

//               <View style={styles.separator} />

//               <Text
//                 numberOfLines={1}
//                 style={[
//                   styles.metadata,
//                   { fontSize: scale(9.5) },
//                 ]}
//               >
//                 #{arena?.region || "Performance"}
//               </Text>
//             </View>
//           </View>

//           {isMe && (
//             <TouchableOpacity
//               activeOpacity={0.75}
//               onPress={() =>
//                 setShowMenuPostId(showMenu ? null : item._id)
//               }
//               style={styles.menuButton}
//             >
//               <MaterialCommunityIcons
//                 name="dots-horizontal"
//                 size={scale(20)}
//                 color="#D0D0D4"
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Owner action menu */}
//       {showMenu && !item?.temp && (
//         <View style={styles.menu}>
//           {renderMenuItem({
//             icon: "play-circle-outline",
//             label: "View Performance",
//             onPress: openPerformance,
//           })}

//           {renderMenuItem({
//             icon: isSpotlight ? "star-outline" : "star",
//             label: isSpotlight
//               ? "Keep in Arena"
//               : "Feature in Spotlight",
//             onPress: toggleSpotlight,
//           })}

//           {renderMenuItem({
//             icon: "share-variant-outline",
//             label: "Share Performance",
//             onPress: closeMenu,
//           })}

//           {renderMenuItem({
//             icon: "chart-line",
//             label: "Performance Stats",
//             onPress: closeMenu,
//           })}

//           <View style={styles.menuDivider} />

//           {renderMenuItem({
//             icon: "delete-outline",
//             label: "Delete Performance",
//             onPress: openDeleteConfirmation,
//             danger: true,
//           })}
//         </View>
//       )}
//     </View>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { useLoading } from "../../../context/loadingContext";
import {
  deleteArenaPost,
  isUserFiredPost,
  toggleArenaPostFire,
  toggleArenaPostSpotlight,
} from "../../../apiCalls/arenas";
import RisingStarIcon from "../../svgIcons/RisingStarIcon";

const COLORS = {
  surface: "#17181B",
  gold: "#E8BC63",
  goldBright: "#F4CF7A",
  danger: "#F06A6A",
};

const formatCount = (value = 0) => {
  const number = Number(value) || 0;

  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;

  return `${number}`;
};

export default function PerformanceDisplayer({
  item,
  arena,
  setPostToDeleteId,
  setSelectedPost,
  onPress,
  showMenuPostId,
  setShowMenuPostId,
  onRefresh,
  isMe,
}) {
  const {
    user,
    setSelectedArena,
    setUserArenas,
    setOpenArenaAlertModal,
    setArenaActionModal,
    scale,
    spacing,
    getPerformanceThumbnailHeight,
  } = useGlobalContext();

  const { showLoading, hideLoading } = useLoading();

  const [hasFired, setHasFired] = useState(false);
  const [isReady, setIsReady] = useState(item?.temp || false);

  const isLocalSpotlight = !!item?.localSpotlight?.spotlight;
  const isRegionalSpotlight = !!item?.regionalSpotlight?.spotlight;
  const isGlobalSpotlight = !!item?.globalSpotlight?.spotlight;

  const isSpotlight =
    isLocalSpotlight ||
    isRegionalSpotlight ||
    isGlobalSpotlight;

  const spotlightTypes = [
    isLocalSpotlight && "LOCAL",
    isRegionalSpotlight && "REGIONAL",
    isGlobalSpotlight && "GLOBAL",
  ].filter(Boolean);

  const spotlightLabel = spotlightTypes.length
    ? spotlightTypes.join(" • ")
    : "PROGRESSIVE";

  const fires = item?.fireCount ?? item?.fireCounth ?? 0;
  const comments = item?.commentCount ?? item?.ccommentCount ?? 0;
  const views = item?.viewCount ?? item?.views ?? 0;

  const thumbnail =
    item?.media?.thumbnail?.cdnUrl ||
    item?.media?.thumbnail?.url;

  const showMenu = showMenuPostId === item?._id;

  const caption =
    item?.caption ||
    item?.title ||
    item?.performanceName ||
    "Performance";

  const performerName =
    item?.userName ||
    item?.username ||
    item?.ownerName ||
    arena?.arenaName ||
    "Arena performer";

  useEffect(() => {
    if (item?.temp || !item?._id || !user?._id) return;

    let mounted = true;

    const checkFire = async () => {
      try {
        const result = await isUserFiredPost({
          postId: item._id,
          userId: user._id,
        });

        if (mounted) {
          setHasFired(
            typeof result === "boolean"
              ? result
              : !!result?.active
          );
          setIsReady(true);
        }
      } catch (error) {
        console.log("Failed to check performance fire:", error);

        if (mounted) {
          setIsReady(true);
        }
      }
    };

    checkFire();

    return () => {
      mounted = false;
    };
  }, [item?._id, item?.temp, user?._id]);

  const toggleFire = async () => {
    if (item?.temp || !user?._id) return;

    try {
      const data = await toggleArenaPostFire({
        postId: item._id,
        userId: user._id,
      });

      setHasFired(!!data?.active);
      onRefresh?.();
    } catch (error) {
      console.log("Failed to toggle performance fire:", error);
    }
  };

  const toggleSpotlight = async () => {
    try {
      await toggleArenaPostSpotlight(item._id);
      setShowMenuPostId(null);
      onRefresh?.();
    } catch (error) {
      console.log("Failed to toggle spotlight:", error);
    }
  };

  const openPerformance = () => {
    setShowMenuPostId(null);
    setSelectedPost?.(item);
    onPress?.(item);
  };

  const openDeleteConfirmation = () => {
    setShowMenuPostId(null);
    setPostToDeleteId(item._id);
    setArenaActionModal("delete_performance");
    setOpenArenaAlertModal(true);
  };

  const deletePost = async () => {
    try {
      showLoading("Deleting performance...");

      await deleteArenaPost(
        item._id,
        setSelectedArena,
        setUserArenas
      );
    } catch (error) {
      console.log("Failed to delete performance:", error);
    } finally {
      hideLoading();
    }
  };

  const closeMenu = () => {
    setShowMenuPostId(null);
  };

  const renderMenuItem = ({
    icon,
    label,
    onPress: onItemPress,
    danger = false,
  }) => (
    <TouchableOpacity
      key={label}
      activeOpacity={0.72}
      onPress={onItemPress}
      className="min-h-[45px] flex-row items-center px-[14px] py-[11px]"
    >
      <View
        className="h-[30px] w-[30px] items-center justify-center rounded-[10px]"
        style={{
          backgroundColor: danger
            ? "rgba(240,106,106,0.09)"
            : "rgba(232,188,99,0.085)",
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={17}
          color={danger ? COLORS.danger : COLORS.gold}
        />
      </View>

      <Text
        className="ml-[10px] flex-1 text-xs font-semibold"
        style={{
          color: danger ? COLORS.danger : "#F0F0F2",
        }}
      >
        {label}
      </Text>

      {!danger && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          color="#666970"
        />
      )}
    </TouchableOpacity>
  );

  if (!isReady && !item?.temp) return null;

  return (
    <View
      className="mx- 3 mb-3 mt- [18px] overflow-visible "
      style={{
        marginTop: spacing(20),
        marginHorizontal : spacing(20)
      }}
    >
      {/* Performance thumbnail */}
      <TouchableOpacity
        activeOpacity={0.96}
        onPress={openPerformance}
        style = {{
          backgroundColor: COLORS.surface,
          borderColor: "rgba(255,255,255,0.075)",
        }}
        className = "rounded-[17px] border"
      >
        <View
          className="w-full overflow-hidden rounded-t-[16px]"
          style={{
            height: getPerformanceThumbnailHeight(),
            backgroundColor: "#202125",
          }}
        >
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              className="h-full w-full"
            />
          ) : (
            <View className="flex-1 items-center justify-center bg-[#1A1B1F]">
              <MaterialCommunityIcons
                name="video-outline"
                size={42}
                color="#62636A"
              />

              <Text className="mt-[7px] text-[11px] font-semibold text-[#85868C]">
                Performance preview
              </Text>
            </View>
          )}

          {/* Top gradient */}
          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.42)",
              "rgba(0,0,0,0.12)",
              "transparent",
            ]}
            locations={[0, 0.55, 1]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "48%",
            }}
          />

          {/* Bottom gradient */}
          <LinearGradient
            pointerEvents="none"
            colors={[
              "transparent",
              "rgba(0,0,0,0.25)",
              "rgba(0,0,0,0.78)",
              "rgba(0,0,0,0.90)",
            ]}
            locations={[0, 0.38, 0.72, 1]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "65%",
            }}
          />

          {/* Spotlight badge */}
          {isSpotlight && (
            <View
              className="absolute left-3 top-3 items-center justify-center rounded-[10px] border px-[9px] pb-[6px] pt-[7px]"
              style={{
                backgroundColor: "rgba(12,12,13,0.76)",
                borderColor: "rgba(232,188,99,0.27)",
              }}
            >
              <RisingStarIcon size={scale(28)} />

              <Text
                className="mt-[2px] font-extrabold tracking-[1px]"
                style={{
                  color: COLORS.goldBright,
                  fontSize: scale(7.5),
                }}
              >
                SPOTLIGHT
              </Text>
            </View>
          )}

          {/* Performance metrics */}
          <View className="absolute bottom-3 left-[14px] right-[14px] flex-row items-center">
            {/* Views */}
            <View className="mr-[19px] flex-row items-center">
              <MaterialCommunityIcons
                name="eye-outline"
                size={scale(17)}
                color="#FFFFFF"
              />

              <Text
                className="ml-[5px] font-bold text-white"
                style={{
                  fontSize: scale(10),
                  fontVariant: ["tabular-nums"],
                }}
              >
                {formatCount(views)}
              </Text>
            </View>

            {/* Fires */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={toggleFire}
              className="mr-[19px] flex-row items-center"
            >
              <MaterialCommunityIcons
                name="fire"
                size={scale(18)}
                color={hasFired ? COLORS.goldBright : "#FFFFFF"}
              />

              <Text
                className="ml-[5px] font-bold"
                style={{
                  fontSize: scale(10),
                  color: hasFired ? COLORS.goldBright : "#FFFFFF",
                  fontVariant: ["tabular-nums"],
                }}
              >
                {formatCount(fires)}
              </Text>
            </TouchableOpacity>

            {/* Comments */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="comment-outline"
                size={scale(16)}
                color="#FFFFFF"
              />

              <Text
                className="ml-[5px] font-bold text-white"
                style={{
                  fontSize: scale(10),
                  fontVariant: ["tabular-nums"],
                }}
              >
                {formatCount(comments)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Performance details */}
      <View className="rounded-b-[16px] px-[14px] pb-[15px] pt-[14px]">
        <View className="flex-row items-center">
          <View className="min-w-0 flex-1 pr-3">
            {/* Caption */}
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="font-bold text-[#F1F1F2]"
              style={{
                fontSize: scale(12.5),
                lineHeight: scale(18),
                letterSpacing: 0.05,
              }}
            >
              {caption}
            </Text>

            {/* Performer information */}
            <View className="mt-[10px] min-w-0 flex-row items-center">
              <View className="h-[25px] w-[25px] items-center justify-center overflow-hidden rounded-[9px] border border-white/10 bg-[#292A2E]">
                {item?.profileImage ? (
                  <Image
                    source={{ uri: item.profileImage }}
                    className="h-full w-full"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="stadium"
                    size={scale(15)}
                    color="#D5D5D8"
                  />
                )}
              </View>

              <Text
                numberOfLines={1}
                className="ml-[7px] flex-shrink font-semibold text-[#E7E7E9]"
                style={{ fontSize: scale(10.5) }}
              >
                {performerName}
              </Text>

              <View className="mx-[7px] h-[3px] w-[3px] rounded-full bg-[#65666C]" />

              <Text
                numberOfLines={1}
                className="flex-shrink font-medium text-[#777B83]"
                style={{ fontSize: scale(9.5) }}
              >
                #{arena?.talentType || "Performance"}
              </Text>

              <View className="mx-[7px] h-[3px] w-[3px] rounded-full bg-[#65666C]" />

              <Text
                numberOfLines={1}
                className="flex-shrink font-medium text-[#777B83]"
                style={{ fontSize: scale(9.5) }}
              >
                #{arena?.region || "Performance"}
              </Text>
            </View>
          </View>

          {/* Owner menu button */}
          {isMe && (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() =>
                setShowMenuPostId(showMenu ? null : item._id)
              }
              className="h-[34px] w-[34px] items-center justify-center rounded-xl border"
              style={{
                backgroundColor: "rgba(255,255,255,0.045)",
                borderColor: "rgba(255,255,255,0.085)",
              }}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={scale(20)}
                color="#D0D0D4"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Owner action menu */}
      {showMenu && !item?.temp && (
        <View
          className="absolute right-[10px] bottom-[76px] z-[100] w-[218px] overflow-hidden rounded-[15px] border py-[5px]"
          style={{
            elevation: 18,
            backgroundColor: "#1B1C20",
            borderColor: "rgba(255,255,255,0.10)",
            shadowColor: "#000000",
            shadowOpacity: 0.45,
            shadowRadius: 18,
            shadowOffset: {
              width: 0,
              height: 8,
            },
          }}
        >
          {renderMenuItem({
            icon: "play-circle-outline",
            label: "View Performance",
            onPress: openPerformance,
          })}

          {renderMenuItem({
            icon: isSpotlight ? "star-outline" : "star",
            label: isSpotlight
              ? "Keep in Arena"
              : "Feature in Spotlight",
            onPress: toggleSpotlight,
          })}

          {renderMenuItem({
            icon: "share-variant-outline",
            label: "Share Performance",
            onPress: closeMenu,
          })}

          {renderMenuItem({
            icon: "chart-line",
            label: "Performance Stats",
            onPress: closeMenu,
          })}

          <View
            className="my-[5px] h-px"
            style={{
              backgroundColor: "rgba(255,255,255,0.075)",
            }}
          />

          {renderMenuItem({
            icon: "delete-outline",
            label: "Delete Performance",
            onPress: openDeleteConfirmation,
            danger: true,
          })}
        </View>
      )}
    </View>
  );
}
