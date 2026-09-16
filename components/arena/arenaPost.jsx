
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  deleteArenaPost,
  isUserFiredPost,
  toggleArenaPostFire,
  toggleArenaPostSpotlight,
} from "../../apiCalls";
import { useLoading } from "../../context/loadingContext";
import SpotlightIcon from "../custom/spotlightIcon";
import NonSpotlightIcon from "../custom/nonSpotlightIcon";

const formatCount = (value = 0) => {
  const number = Number(value) || 0;
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return `${number}`;
};

export default function ArenaPost({
  item,
  arena,
  setPostToDeleteId,
  setSelectedPost,
  onPress,
  showMenuPostId,
  setShowMenuPostId,
  onRefresh,
}) {
  const { width } = useWindowDimensions();
  const {
    user,
    setSelectedArena,
    setUserArenas,
    setOpenArenaAlertModal,
    setArenaActionModal,
    scale,
    getPerformanceThumbnailHeight
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
        if (mounted) setIsReady(true);
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
      console.log("Failed to toggle fire:", error);
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

  if (!isReady && !item?.temp) return null;

  return (
    <View
      style={{
        marginHorizontal: 8,
        marginBottom: 10,
        // borderRadius: 7,
        overflow: "hidden",
     
      }}
      className = "mt-2 border- b-[1px] borde r-l-[1px] bor der-r-[1px] bor der-[white]/20 rounded- 2xl"
    >
      <TouchableOpacity
        activeOpacity={0.96}
        onPress={openPerformance}  >
        <View
          style={{
            width: "100%",
            height: getPerformanceThumbnailHeight(),
          }}  >
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
              className ="rounded-t-xl"
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="video-outline"
                size={40}
                color="#45494D"
              />
            </View>
          )}

          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.35)",
              "rgba(0,0,0,0.28)",
              "rgba(0,0,0,0.16)",
              "transparent",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "58%",
            }}
          />

          <LinearGradient
            pointerEvents="none"
            colors={[
              "transparent",
              "rgba(0,0,0,0.05)",
              "rgba(0,0,0,0.38)",
              "rgba(0,0,0,0.86)",
            ]}
            locations={[0, 0.38, 0.62, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "58%",
            }}
          />

          <View
            style={{
              position: "absolute",
              top: 5,
              left: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 9,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              {isSpotlight && (
                <SpotlightIcon size={scale(13)} />
              ) }
            

            </View>
          </View>

          {/* {duration && !item?.temp && (
            <View
              style={{
                position: "absolute",
                right: 11,
                top: 11,
                paddingHorizontal: 7,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: "rgba(0,0,0,0.62)",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "800",
                }}
              >
                {duration}
              </Text>
            </View>
          )} */}

            <View
              style={{
                position: "absolute",
                left: 13,
                right: 13,
                bottom: 11,
                flexDirection: "row",
                alignItems: "center",
              }}   >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 26,
                }}
              >
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={scale(18)}
                  color="#FFFFFF"
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: scale(10),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(views)}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={toggleFire}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 26,
                }}
              >
                <MaterialCommunityIcons
                  name={hasFired ? "fire" : "fire"}
                  size={scale(18)}
                  color={hasFired ? "#EAB308" : "#FFFFFF"}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: hasFired ? "#EAB308" : "#FFFFFF",
                    fontSize: scale(10),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(fires)}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={scale(16)}
                  color="#FFFFFF"
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: "#FFFFFF",
                    fontSize: scale(10),
                    fontWeight: "800",
                  }}
                >
                  {formatCount(comments)}
                </Text>
              </View>

            </View>

        </View>
      </TouchableOpacity>

      <View
        className = "rounded-b-xl mt -1 p-4  border-b-[1px] border-l-[1px] border-r-[1px] border-[gold]/20"
        >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              paddingRight: 10,
            }}
          >
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                color: "#fff",
                fontSize: scale(11),
                lineHeight: 18,
                fontWeight: "700",
                // letterSpacing: -0.15,
              }}
              className = " font-montserratSemi"
            >
              {caption}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View
                style={{
                  width: 21,
                  height: 21,
                  borderRadius: 11,
                  overflow: "hidden",
                  backgroundColor: "#191C1F",
                  alignItems: "center",
                  justifyContent: "center",
                }}  >
                {item?.profileImage ? (
                  <Image
                    source={{ uri: item.profileImage }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="stadium"
                    size={scale(12)}
                    color="#aaa"
                  />
                )}
              </View>

              <Text
                numberOfLines={1}
                style={{
                  flexShrink: 1,
                  marginLeft: 6,
                  color: "#aaa",
                  fontSize: scale(11),
                  fontWeight: "600",
                }}
              >
                {performerName}
              </Text>

              <View
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: 2,
                  marginHorizontal: 6,
                  backgroundColor: "#555A60",
                }}
              />

              <Text
                numberOfLines={1}
                style={{
                  flexShrink: 1,
                  color: "#AAA",
                  fontSize: scale(11) ,
                  fontWeight: "600",
                }}
              >
                #{arena?.talentType || "Performance"}
              </Text>
              <View
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: 2,
                  marginHorizontal: 6,
                  backgroundColor: "#555A60",
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  flexShrink: 1,
                  color: "#AAA",
                  fontSize: scale(11) ,
                  fontWeight: "600",
                }}
              >
                #{arena?.region || "Performance"}
              </Text>
            </View>
          </View>

          {!item?.temp && (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() =>
                setShowMenuPostId(
                  showMenu ? null : item._id
                )
              }
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.045)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={scale(18)}
                color="#B4B8BC"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showMenu && !item?.temp && (
        <View
          style={{
            position: "absolute",
            right: 11,
            bottom: 48,
            width: 210,
            borderRadius: 14,
            overflow: "hidden",
            backgroundColor: "#111417",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.10)",
            zIndex: 100,
            elevation: 18,
            shadowColor: "#000",
            shadowOpacity: 0.55,
            shadowRadius: 18,
            shadowOffset: {
              width: 0,
              height: 9,
            },
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openPerformance}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <MaterialCommunityIcons
              name="play-circle-outline"
              size={18}
              color="#EAB308"
            />
            <Text
              style={{
                marginLeft: 10,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              View Performance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSpotlight}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <MaterialCommunityIcons
              name={isSpotlight ? "star-outline" : "star"}
              size={18}
              color="#EAB308"
            />
            <Text
              style={{
                marginLeft: 10,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {isSpotlight
                ? "Keep in Arena"
                : "Feature in Spotlight"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowMenuPostId(null)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <MaterialCommunityIcons
              name="share-variant-outline"
              size={18}
              color="#EAB308"
            />
            <Text
              style={{
                marginLeft: 10,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Share Performance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowMenuPostId(null)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <MaterialCommunityIcons
              name="chart-line"
              size={18}
              color="#EAB308"
            />
            <Text
              style={{
                marginLeft: 10,
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Performance Stats
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.07)",
            }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openDeleteConfirmation}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={18}
              color="#EF4444"
            />
            <Text
              style={{
                marginLeft: 10,
                color: "#EF4444",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Delete Performance
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}