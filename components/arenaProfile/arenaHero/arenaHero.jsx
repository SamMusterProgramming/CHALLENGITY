import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { memo, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import TalentIcon from "../../custom/TalentIcon";
import CountryFlag from "../../common/CountryFlag";

const GOLD = "#E6C66A";
const GOLD_DARK = "#B8943D";
const BACKGROUND = "#080909";
const SURFACE = "#141515";
const MUTED = "#929598";
const BORDER = "rgba(230,198,106,0.15)";

const formatCount = (value = 0) => {
    const n = Number(value) || 0;
  
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  
    return String(n);
  };

export const ArenaHero = memo(function ArenaHero({
    arena,
    isMe,
    scale,
    uploadPerformanceLoading,
    setArenaActionModal,
    setOpenArenaAlertModal,
    onPressFollow,
    onPressStar,
    onPressOwner,
  }) {
    const [coverFailed, setCoverFailed] = useState(false);
    const [logoFailed, setLogoFailed] = useState(false);
  
    useEffect(() => {
      setCoverFailed(false);
      setLogoFailed(false);
    }, [arena?._id, arena?.profileImage]);
  
    const followerCount =
      arena?.followerCount ??
      arena?.followersCount ??
      arena?.followers?.length ??
      0;
  
    const starCount =
      arena?.starCount ??
      arena?.starsCount ??
      arena?.stars?.length ??
      0;
  
    const performanceCount = arena?.posts?.length ?? 0;
  
    return (
      <View style={{ backgroundColor: BACKGROUND }}>
        {/* Cinematic cover */}
        <View style={{ height: scale(280), position: "relative" }}>
          {!coverFailed && arena?.profileImage ? (
            <Image
              source={{ uri: arena.coverImage?.publicUrl }}
              onError={() => setCoverFailed(true)}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#171713",
              }}
            >
              <MaterialCommunityIcons
                name="stadium"
                size={72}
                color="#65552F"
              />
            </View>
          )}
  
          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.34)",
              "rgba(0,0,0,0.04)",
              BACKGROUND,
            ]}
            locations={[0, 0.43, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
  
          {/* <View
            pointerEvents="none"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: GOLD_DARK,
              opacity: 0.75,
            }}
          /> */}
  
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 20,
              right: 20,
              transform: [{ translateY: 38 }],
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                width: 94,
                height: 94,
                borderRadius: 26,
                padding: 3,
                backgroundColor: "#181713",
                borderWidth: 1,
                borderColor: GOLD_DARK,
                overflow: "hidden",
              }}
            >
              {!logoFailed && arena?.profileImage ? (
                <Image
                  source={{ uri: arena.profileImage.publicUrl }}
                  onError={() => setLogoFailed(true)}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 22,
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    borderRadius: 22,
                    backgroundColor: "#222019",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="shield-star-outline"
                    size={42}
                    color={GOLD}
                  />
                </View>
              )}
            </View>
  
            <View style={{ flex: 1 }} />
  
            {isMe && (
              <View
                style={{
                  backgroundColor: "rgba(230,198,106,0.12)",
                  borderWidth: 1,
                  borderColor: BORDER,
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  marginBottom: 0,
                }}
              >
                <Text
                  style={{
                    color: GOLD,
                    fontSize: scale(10),
                    fontWeight: "800",
                    letterSpacing: 1.2,
                  }}
                >
                  YOUR ARENA
                </Text>
              </View>
            )}
          </View>
        </View>
  
        {/* Arena identity */}
        <View style={{ paddingTop: scale(51), paddingHorizontal: 20 }}>
          <Text
            style={{
              color: "#F5F3ED",
              fontSize: scale(22),
              lineHeight: scale(33),
              fontWeight: "900",
              letterSpacing: -0.6,
            }}
          >
            {arena?.arenaName || "Arena"}
          </Text>
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: scale(9),
            }}   >

            <TalentIcon talent={arena.talentType} color={"gold"} size={scale(19)} />

            <Text
              style={{
                paddingTop : scale(5),
                marginLeft: scale(9),
                color: "#D1C7AA",
                fontSize: scale(11),
                fontWeight: "600",
              }}
              className = "uppercase"
            >
              {arena?.talentType || "Sports arena"}
            </Text>
  
            {!!arena?.region && (
              <>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "#68645A",
                    marginHorizontal: scale(19),
                  }}
                />
  
                <CountryFlag code={arena.region} size={scale(18)} />
                <Text
                  style={{
                    paddingTop : scale(5),
                    marginLeft: scale(9),
                    color: MUTED,
                    fontSize: scale(12),
                  }}
                >
                  {arena.region}
                </Text>
              </>
            )}
          </View>
  
          {!!arena?.biography && (
            <Text
              style={{
                color: "#FFF",
                fontSize: scale(13),
                lineHeight: scale(20),
                marginTop: scale(29),
              }}
            >
              {arena.biography}
            </Text>
          )}
          {!!arena?.description && (
            <Text
              style={{
                color: "#A6A7A4",
                fontSize: scale(11),
                lineHeight: scale(20),
                marginTop: scale(4),
              }}
            >
              {arena.description}
            </Text>
          )}
  
          {/* Social actions */}
          {!isMe && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 22,
                gap: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressFollow}
                style={{
                  flex: 1,
                  minHeight: 46,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: arena?.isFollower
                    ? "#27251E"
                    : GOLD,
                  borderWidth: 1,
                  borderColor: GOLD_DARK,
                }}
              >
                <MaterialCommunityIcons
                  name={arena?.isFollower ? "account-check" : "account-plus"}
                  size={19}
                  color={arena?.isFollower ? GOLD : "#17130A"}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: scale(13),
                    fontWeight: "800",
                    color: arena?.isFollower ? GOLD : "#17130A",
                  }}
                >
                  {arena?.isFollower ? "Following" : "Follow arena"}
                </Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressStar}
                style={{
                  width: 54,
                  height: 46,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: BORDER,
                  backgroundColor: "#191918",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={arena?.isStarred ? "star" : "star-outline"}
                  size={22}
                  color={GOLD}
                />
              </TouchableOpacity>
            </View>
          )}
  
          {!isMe && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressOwner?.(arena?.owner_id)}
              style={{
                marginTop: 17,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-start",
                paddingVertical: 8,
              }}
            >
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={18}
                color={GOLD}
              />
              <Text
                style={{
                  marginLeft: 7,
                  color: GOLD,
                  fontSize: scale(12),
                  fontWeight: "700",
                }}
              >
                View owner profile
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color={GOLD}
              />
            </TouchableOpacity>
          )}
  
          {/* Statistics */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: scale(18),
            //   marginBottom: 23,
              gap: 9,
            }}
          >
            {[
              {
                label: "PERFORMANCES",
                value: performanceCount,
                icon: "play-box-multiple-outline",
              },
              {
                label: "FOLLOWERS",
                value: followerCount,
                icon: "account-group-outline",
              },
              {
                label: "STARS",
                value: starCount,
                icon: "star-outline",
              },
            ].map((stat) => (
                <View
                key={stat.label}
                style={{
                  flex: 1,
                  minHeight: 82,
                  paddingVertical: 12,
                  paddingHorizontal: 11,
                  backgroundColor: SURFACE,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: BORDER,
                  justifyContent: "center",
                }}
              >
                {/* Label on top */}
                <Text
                  numberOfLines={1}
                  style={{
                    color: MUTED,
                    fontSize: scale(9),
                    letterSpacing: 0.2,
                    fontWeight: "500",
                    textTransform: "uppercase",
                    marginBottom: 11,
                  }}
                >
                  {stat.label}
                </Text>
              
                {/* Icon and number in one row */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(232, 185, 90, 0.10)",
                      borderWidth: 1,
                      borderColor: "rgba(232, 185, 90, 0.14)",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={stat.icon}
                      size={16}
                      color={GOLD}
                    />
                  </View>
              
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    style={{
                      flexShrink: 1,
                      color: "#F7F3E8",
                      fontSize: scale(15),
                      fontWeight: "700",
                      letterSpacing: -0.3,
                      fontVariant: ["tabular-nums"],
                    }}
                  >
                    {formatCount(stat.value)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {isMe && (
            <TouchableOpacity
                    activeOpacity={0.86}
                    disabled={uploadPerformanceLoading}
                    onPress={() => {
                        setArenaActionModal("create_performance");
                        setOpenArenaAlertModal(true);
                    }}
                    style={{
                        borderRadius: 12,
                        backgroundColor: uploadPerformanceLoading
                        ? "#9A7620"
                        : "#E9B908",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginVertical: scale(12)
                    }}
                    className="w-[100%] self-center py-4 p x-8"
                    >
                    {uploadPerformanceLoading ? (
                        <>
                        <ActivityIndicator
                            size="small"
                            color="#111"
                        />
                    
                        <Text
                            style={{
                            marginLeft: 8,
                            color: "#111",
                            fontSize: 13,
                            fontWeight: "900",
                            letterSpacing: 0.2,
                            }}
                        >
                            UPLOADING...
                        </Text>
                        </>
                    ) : (
                        <>
                        <Ionicons
                            name="add"
                            size={scale(15)}
                            color="#111"
                        />
                    
                        <Text
                            style={{
                            marginLeft: 7,
                            color: "#111",
                            fontSize: scale(12),
                            fontWeight: "900",
                            letterSpacing: 1.1,
                            }}
                        >
                            Add Performance
                        </Text>
                        </>
                    )}
                </TouchableOpacity>
                )}

        </View>
      </View>
    );
  });