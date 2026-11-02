// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   useWindowDimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import {  MaterialCommunityIcons } from "@expo/vector-icons";
// import { useGlobalContext } from "../../../context/GlobalProvider";
// // import {
// //   deleteArenaPost,
// //   isUserFiredPost,
// //   toggleArenaPostFire,
// //   toggleArenaPostSpotlight,
// // } from "../../../apiCalls";
// import { useLoading } from "../../../context/loadingContext";
// import SpotlightIcon from "../../custom/spotlightIcon";
// import RisingStarIcon from "../../svgIcons/RisingStarIcon";
// import { deleteArenaPost, isUserFiredPost, toggleArenaPostFire, toggleArenaPostSpotlight } from "../../../apiCalls/arenas";


// const formatCount = (value = 0) => {
//   const number = Number(value) || 0;
//   if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
//   if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
//   return `${number}`;
// };

// export default function Displayer({
//   item,
//   arena,
//   setPostToDeleteId,
//   setSelectedPost,
//   onPress,
//   showMenuPostId,
//   setShowMenuPostId,
//   onRefresh,
//   isMe
// }) {
//   const { width } = useWindowDimensions();
//   const {
//     user,
//     setSelectedArena,
//     setUserArenas,
//     setOpenArenaAlertModal,
//     setArenaActionModal,
//     scale , getPerformanceThumbnailHeight
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
//         if (mounted) setIsReady(true);
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
//       console.log("Failed to toggle fire:", error);
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

//   if (!isReady && !item?.temp) return null;

//   return (
//     <View
//       style={{
//         marginHorizontal: 12,
//         marginBottom: 10,
//         // borderRadius: 7,
//         overflow: "hidden",
       
//       }}
//       className = "mt-2 px- 2 rounded -2xl"
//     >
//       <TouchableOpacity
//         activeOpacity={0.96}
//         onPress={openPerformance}
//       >
//         <View
//           style={{
//             width: "100%",
//             height: getPerformanceThumbnailHeight(),
//             // backgroundColor: "#111315",
//             // position: "relative",
//           }}
//         >
//           {thumbnail ? (
//             <Image
//               source={{ uri: thumbnail }}
//               resizeMode="cover"
//               style={{
//                 width: "100%",
//                 height: "100%",
//               }}
//               className ="rounded-t-xl"
//             />
//           ) : (
//             <View
//               style={{
//                 flex: 1,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 name="video-outline"
//                 size={40}
//                 color="#45494D"
//               />
//             </View>
//           )}

//           <LinearGradient
//             pointerEvents="none"
//             colors={[
//               "rgba(0,0,0,0.55)",
//               "rgba(0,0,0,0.28)",
//               "rgba(0,0,0,0.16)",
//               "transparent",
//             ]}
//             locations={[0, 0.38, 0.62, 1]}
//             style={{
//               position: "absolute",
//               left: 0,
//               right: 0,
//               top: 0,
//               height: "58%",
//             }}
//           />

//           <LinearGradient
//             pointerEvents="none"
//             colors={[
//               "transparent",
//               "rgba(0,0,0,0.05)",
//               "rgba(0,0,0,0.28)",
//               "rgba(0,0,0,0.86)",
//             ]}
//             locations={[0, 0.38, 0.62, 1]}
//             style={{
//               position: "absolute",
//               left: 0,
//               right: 0,
//               bottom: 0,
//               height: "58%",
//             }}
//           />

//           {/* <View
//             style={{
//               position: "absolute",
//               top: 5,
//               left: 5,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingHorizontal: 9,
//                 paddingVertical: 6,
//                 borderRadius: 999,
//               }}
//             >
//               {isSpotlight && (
//                 <RisingStarIcon size={scale(40)} />
//               ) }
            

//             </View>
//           </View> */}
//             {isSpotlight && (
//             <View
//               style={{
//                 position: "absolute",
//                 top: 7,
//                 left: 5,
//                 flexDirection: "col",
//                 alignItems: "center",
//                 paddingHorizontal: 9,
//                 paddingVertical: 6,
//                 // borderRadius: 999,
//               }}
//               className = "bg-black/40 p-1 rounded-md"  >
            
//               <RisingStarIcon size={scale(30)} />
              
//               <Text
//                   style={{
//                     color: "#E8B95A",
//                     fontSize: scale(7),
//                     fontWeight: "600",
//                     // marginTop :5
//                   }}
//                 >
//                   SPOTLIGHT
//               </Text>
            
//             </View>
//             ) }
         

//             <View
//               style={{
//                 position: "absolute",
//                 left: 13,
//                 right: 13,
//                 bottom: 5,
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}   >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginRight: 26,
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="eye-outline"
//                   size={scale(18)}
//                   color="#FFFFFF"
//                 />
//                 <Text
//                   style={{
//                     marginLeft: 4,
//                     color: "#FFFFFF",
//                     fontSize: scale(10),
//                     fontWeight: "800",
//                   }}
//                 >
//                   {formatCount(views)}
//                 </Text>
//               </View>

//               <TouchableOpacity
//                 activeOpacity={0.75}
//                 onPress={toggleFire}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginRight: 26,
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name={hasFired ? "fire" : "fire"}
//                   size={scale(18)}
//                   color={hasFired ? "#EAB308" : "#FFFFFF"}
//                 />
//                 <Text
//                   style={{
//                     marginLeft: 4,
//                     color: hasFired ? "#EAB308" : "#FFFFFF",
//                     fontSize: scale(10),
//                     fontWeight: "800",
//                   }}
//                 >
//                   {formatCount(fires)}
//                 </Text>
//               </TouchableOpacity>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginRight: 16,
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="comment-outline"
//                   size={scale(16)}
//                   color="#FFFFFF"
//                 />
//                 <Text
//                   style={{
//                     marginLeft: 4,
//                     color: "#FFFFFF",
//                     fontSize: scale(10),
//                     fontWeight: "800",
//                   }}
//                 >
//                   {formatCount(comments)}
//                 </Text>
//               </View>

              
//             </View>

//         </View>
//       </TouchableOpacity>


//       <View
//         className = "rounde d-xl  bg-[#141415] p-4 bo rder-b-[1px] bo rder-l-[1px] bor der-r-[1px] bor der-[gold]/20"
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               paddingRight: 10,
//             }}
//           >
//             <Text
//               numberOfLines={2}
//               ellipsizeMode="tail"
//               style={{
//                 fontSize: scale(12),
//                 lineHeight: 18,
//                 fontWeight: "600",
//                 color : "#c0c0c0"
//                 // letterSpacing: -0.15,
//               }}
//               className = "te xt-gray-400 fon t-montse rratSemi"
//             >
//               {caption}
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginTop: 6,
//               }}
//             >
//               <View
//                 style={{
//                   width: 21,
//                   height: 21,
//                   borderRadius: 11,
//                   overflow: "hidden",
//                   backgroundColor: "#191C1F",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}  >
//                 {item?.profileImage ? (
//                   <Image
//                     source={{ uri: item.profileImage }}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                     }}
//                   />
//                 ) : (
//                   <MaterialCommunityIcons
//                     name="stadium"
//                     size={scale(15)}
//                     color="#fff"
//                   />
//                 )}
//               </View>

//               <Text
//                 numberOfLines={1}
//                 style={{
//                   flexShrink: 1,
//                   marginLeft: 6,
//                   color: "#fff",
//                   fontSize: scale(13),
//                   fontWeight: "700",
//                 }}
//               >
//                 {performerName}
//               </Text>

//               <View
//                 style={{
//                   width: 3,
//                   height: 3,
//                   borderRadius: 2,
//                   marginHorizontal: 6,
//                   backgroundColor: "#555A60",
//                 }}
//               />

//               <Text
//                 numberOfLines={1}
//                 style={{
//                   flexShrink: 1,
//                   color: "#c0c0c0",
//                   fontSize: scale(13) ,
//                   fontWeight: "600",
//                 }}
//               >
//                 #{arena?.talentType || "Performance"}
//               </Text>
//               <View
//                 style={{
//                   width: 3,
//                   height: 3,
//                   borderRadius: 2,
//                   marginHorizontal: 6,
//                   backgroundColor: "#555A60",
//                 }}
//               />
//               <Text
//                 numberOfLines={1}
//                 style={{
//                   flexShrink: 1,
//                   color: "#c0c0c0",
//                   fontSize: scale(13) ,
//                   fontWeight: "600",
//                 }}
//               >
//                 #{arena?.region || "Performance"}
//               </Text>
//             </View>
//           </View>
//           {isMe && (
//           <TouchableOpacity
//               activeOpacity={0.75}
//               onPress={() =>
//                 setShowMenuPostId(
//                   showMenu ? null : item._id
//                 )
//               }
//               style={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: 16,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "rgba(255,255,255,0.045)",
//                 borderWidth: 1,
//                 borderColor: "rgba(255,255,255,0.07)",
//               }}
//             >
//               <MaterialCommunityIcons
//                 name="dots-vertical"
//                 size={scale(18)}
//                 color="#B4B8BC"
//               />
//           </TouchableOpacity>
//           )}
//         </View>
//       </View>
  
//       {showMenu && !item?.temp && (
//         <View
//           style={{
//             position: "absolute",
//             right: 11,
//             bottom: 78,
//             width: 210,
//             borderRadius: 14,
//             overflow: "hidden",
//             backgroundColor: "#111417",
//             borderWidth: 1,
//             borderColor: "rgba(255,255,255,0.10)",
//             zIndex: 100,
//             elevation: 18,
//             shadowColor: "#000",
//             shadowOpacity: 0.55,
//             shadowRadius: 18,
//             shadowOffset: {
//               width: 0,
//               height: 9,
//             },
//           }}
//         >
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={openPerformance}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//             }}
//           >
//             <MaterialCommunityIcons
//               name="play-circle-outline"
//               size={18}
//               color="#EAB308"
//             />
//             <Text
//               style={{
//                 marginLeft: 10,
//                 color: "#FFFFFF",
//                 fontSize: 12,
//                 fontWeight: "600",
//               }}
//             >
//               View Performance
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={toggleSpotlight}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//             }}
//           >
//             <MaterialCommunityIcons
//               name={isSpotlight ? "star-outline" : "star"}
//               size={18}
//               color="#EAB308"
//             />
//             <Text
//               style={{
//                 marginLeft: 10,
//                 color: "#FFFFFF",
//                 fontSize: 12,
//                 fontWeight: "600",
//               }}
//             >
//               {isSpotlight
//                 ? "Keep in Arena"
//                 : "Feature in Spotlight"}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => setShowMenuPostId(null)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//             }}
//           >
//             <MaterialCommunityIcons
//               name="share-variant-outline"
//               size={18}
//               color="#EAB308"
//             />
//             <Text
//               style={{
//                 marginLeft: 10,
//                 color: "#FFFFFF",
//                 fontSize: 12,
//                 fontWeight: "600",
//               }}
//             >
//               Share Performance
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => setShowMenuPostId(null)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//             }}
//           >
//             <MaterialCommunityIcons
//               name="chart-line"
//               size={18}
//               color="#EAB308"
//             />
//             <Text
//               style={{
//                 marginLeft: 10,
//                 color: "#FFFFFF",
//                 fontSize: 12,
//                 fontWeight: "600",
//               }}
//             >
//               Performance Stats
//             </Text>
//           </TouchableOpacity>

//           <View
//             style={{
//               height: 1,
//               backgroundColor: "rgba(255,255,255,0.07)",
//             }}
//           />

//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={openDeleteConfirmation}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//             }}
//           >
//             <MaterialCommunityIcons
//               name="delete-outline"
//               size={18}
//               color="#EF4444"
//             />
//             <Text
//               style={{
//                 marginLeft: 10,
//                 color: "#EF4444",
//                 fontSize: 12,
//                 fontWeight: "600",
//               }}
//             >
//               Delete Performance
//             </Text>
//           </TouchableOpacity>
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
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../context/GlobalProvider";
import { useLoading } from "../../../context/loadingContext";
import { deleteArenaPost, isUserFiredPost, toggleArenaPostFire, toggleArenaPostSpotlight } from "../../../apiCalls/arenas";
import RisingStarIcon from "../../svgIcons/RisingStarIcon";

const COLORS = {
  background: "#111214",
  surface: "#17181B",
  surfaceElevated: "#202125",
  gold: "#E8BC63",
  goldBright: "#F4CF7A",
  text: "#FFFFFF",
  textSecondary: "#B9BBC1",
  textMuted: "#777B83",
  border: "rgba(255,255,255,0.075)",
  goldBorder: "rgba(232,188,99,0.19)",
  danger: "#F06A6A",
};

const formatCount = (value = 0) => {
  const number = Number(value) || 0;

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return `${number}`;
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "visible",
  },

  imageFrame: {
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#202125",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1B1F",
  },

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "48%",
  },

  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
  },

  spotlightBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 6,
    borderRadius: 10,
    backgroundColor: "rgba(12,12,13,0.76)",
    borderWidth: 1,
    borderColor: "rgba(232,188,99,0.27)",
  },

  metricsRow: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  metric: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 19,
  },

  metricText: {
    marginLeft: 5,
    color: COLORS.text,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },

  footer: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: COLORS.surface,
  },

  footerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    minWidth: 0,
    paddingRight: 12,
  },

  caption: {
    color: "#F1F1F2",
    fontWeight: "700",
    letterSpacing: 0.05,
  },

  performerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    minWidth: 0,
  },

  avatar: {
    width: 25,
    height: 25,
    borderRadius: 9,
    overflow: "hidden",
    backgroundColor: "#292A2E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  performerName: {
    flexShrink: 1,
    marginLeft: 7,
    color: "#E7E7E9",
    fontWeight: "600",
  },

  separator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    marginHorizontal: 7,
    backgroundColor: "#65666C",
  },

  metadata: {
    flexShrink: 1,
    color: COLORS.textMuted,
    fontWeight: "500",
  },

  menuButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.045)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.085)",
  },

  menu: {
    position: "absolute",
    zIndex: 100,
    elevation: 18,
    right: 10,
    bottom: 76,
    width: 218,
    paddingVertical: 5,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#1B1C20",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    shadowColor: "#000000",
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  menuItem: {
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 11,
  },

  menuIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(232,188,99,0.085)",
  },

  menuLabel: {
    flex: 1,
    marginLeft: 10,
    color: "#F0F0F2",
    fontSize: 12,
    fontWeight: "600",
  },

  menuDivider: {
    height: 1,
    marginVertical: 5,
    backgroundColor: "rgba(255,255,255,0.075)",
  },
});

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
  const shares = item?.shareCount ?? item?.shares ?? 0;

  const duration =
    item?.duration ||
    item?.videoDuration ||
    item?.media?.duration ||
    null;

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
      style={styles.menuItem}
    >
      <View
        style={[
          styles.menuIconContainer,
          danger && {
            backgroundColor: "rgba(240,106,106,0.09)",
          },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={17}
          color={danger ? COLORS.danger : COLORS.gold}
        />
      </View>

      <Text
        style={[
          styles.menuLabel,
          danger && { color: COLORS.danger },
        ]}
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
    <View style={styles.card}>
      {/* Performance thumbnail */}
      <TouchableOpacity
        activeOpacity={0.96}
        onPress={openPerformance}
      >
        <View
          style={[
            styles.imageFrame,
            { height: getPerformanceThumbnailHeight() },
          ]}
        >
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons
                name="video-outline"
                size={42}
                color="#62636A"
              />
              <Text
                style={{
                  color: "#85868C",
                  fontSize: 11,
                  fontWeight: "600",
                  marginTop: 7,
                }}
              >
                Performance preview
              </Text>
            </View>
          )}

          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.42)",
              "rgba(0,0,0,0.12)",
              "transparent",
            ]}
            locations={[0, 0.55, 1]}
            style={styles.topGradient}
          />

          <LinearGradient
            pointerEvents="none"
            colors={[
              "transparent",
              "rgba(0,0,0,0.25)",
              "rgba(0,0,0,0.78)",
              "rgba(0,0,0,0.90)",
            ]}
            locations={[0, 0.38, 0.72, 1]}
            style={styles.bottomGradient}
          />

          {/* Spotlight indicator */}
          {isSpotlight && (
            <View style={styles.spotlightBadge}>
              <RisingStarIcon size={scale(28)} />

              <Text
                style={{
                  marginTop: 2,
                  color: COLORS.goldBright,
                  fontSize: scale(7.5),
                  fontWeight: "800",
                  letterSpacing: 1,
                }}
              >
                SPOTLIGHT
              </Text>
            </View>
          )}

          {/* Performance metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <MaterialCommunityIcons
                name="eye-outline"
                size={scale(17)}
                color="#FFFFFF"
              />

              <Text
                style={[
                  styles.metricText,
                  { fontSize: scale(10) },
                ]}
              >
                {formatCount(views)}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={toggleFire}
              style={styles.metric}
            >
              <MaterialCommunityIcons
                name="fire"
                size={scale(18)}
                color={hasFired ? COLORS.goldBright : "#FFFFFF"}
              />

              <Text
                style={[
                  styles.metricText,
                  {
                    fontSize: scale(10),
                    color: hasFired ? COLORS.goldBright : "#FFFFFF",
                  },
                ]}
              >
                {formatCount(fires)}
              </Text>
            </TouchableOpacity>

            <View style={[styles.metric, { marginRight: 0 }]}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={scale(16)}
                color="#FFFFFF"
              />

              <Text
                style={[
                  styles.metricText,
                  { fontSize: scale(10) },
                ]}
              >
                {formatCount(comments)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Performance details */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <View style={styles.titleContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[
                styles.caption,
                {
                  fontSize: scale(12.5),
                  lineHeight: scale(18),
                },
              ]}
            >
              {caption}
            </Text>

            <View style={styles.performerRow}>
              <View style={styles.avatar}>
                {item?.profileImage ? (
                  <Image
                    source={{ uri: item.profileImage }}
                    style={styles.avatarImage}
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
                style={[
                  styles.performerName,
                  { fontSize: scale(10.5) },
                ]}
              >
                {performerName}
              </Text>

              <View style={styles.separator} />

              <Text
                numberOfLines={1}
                style={[
                  styles.metadata,
                  { fontSize: scale(9.5) },
                ]}
              >
                #{arena?.talentType || "Performance"}
              </Text>

              <View style={styles.separator} />

              <Text
                numberOfLines={1}
                style={[
                  styles.metadata,
                  { fontSize: scale(9.5) },
                ]}
              >
                #{arena?.region || "Performance"}
              </Text>
            </View>
          </View>

          {isMe && (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() =>
                setShowMenuPostId(showMenu ? null : item._id)
              }
              style={styles.menuButton}
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
        <View style={styles.menu}>
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

          <View style={styles.menuDivider} />

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