import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { memo, useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import TalentIcon from "../../custom/TalentIcon";
import CountryFlag from "../../common/CountryFlag";
import { useGlobalContext } from "../../../context/GlobalProvider";
import TalentIconSelector from "../../common/talentIconSelector";

const GOLD = "#E6C66A";
const GOLD_DARK = "#B8943D";
const BACKGROUND = "#080909";
const SURFACE = "#141515";
const MUTED = "#929598";
const BORDER = "rgba(230,198,106,0.45)";

const formatCount = (value = 0) => {
    const n = Number(value) || 0;
  
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  
    return String(n);
  };

export const ArenaHero = memo(function ArenaHero({
    arena,
    isMe,
    uploadPerformanceLoading,
    setArenaActionModal,
    setOpenArenaAlertModal,
    onPressFollow,
    onPressStar,
    onPressOwner,
  }) {

    const {sharing , openShare , scale , spacing } = useGlobalContext()
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
              bottom: -40,
              left: scale(15),
              right: scale(15),
              transform: [{ translateY: 38 }],
              flexDirection: "row",
            //   alignItems: "flex- end",
            }}
          >
            <View
              style={{
                width: scale(100),
                height: scale(100),
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
    
            {/* arena identity  */}
            <View
              style={{
                // borderRadius: 26,
                // padding: 3,
                overflow: "hidden",
                marginLeft : spacing(26)
              }}
              className = "items-start justify-between"
                  >

                <Text
                  style={{
                    color: "#F5F3ED",
                    fontSize: scale(20),
                    // lineHeight: scale(33),
                    fontWeight: "900",
                    letterSpacing: -0.6,
                  }}
                >
                  {arena?.arenaName || "Arena"}
                </Text>

                <View
                  style={{
                    paddingTop: 7,
                    // height: scale(80),
                  }}
                  className = "flex-row flex-1 items-end"
                  >
                    <View
                    className = "flex-col gap-3 items-center ">
                        <TalentIconSelector code={arena.talentType} size={scale(42)} />
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: scale(10),
                            fontWeight: "600",
                          }}
                        >
                          {arena.talentType.toUpperCase() || "Talent type"}
                        </Text>
                    </View>
                    <View
                    className="justify-center h-full items-center">
                      <View
                      className ="mx-6 h-2 w-2 bg-[#c0c0c0] rounded-full "
                        />
                    </View>
                    <View
                    className = "flex-col gap-3 ml-3 items-center">
                        
                        <CountryFlag code={arena.region} size={scale(37)} />
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: scale(10),
                            fontWeight: "600",
                          }}
                        >
                          {arena.region || "US"}
                        </Text>
                    </View>
                </View>


            </View>

          </View>


        </View>
  
        {/* Arena identity */}
        <View style={{ marginTop: scale(110), paddingHorizontal: 20 }}>

      

          <View style={{ marginBottom: spacing(16) , paddingRight:scale(24) }}>
                  {/* <Text
                    style={{
                      marginBottom: spacing(10),
                      color: "#A7A8B0",
                      fontSize: scale(11),
                      fontWeight: "600",
                      letterSpacing: 1.8,
                    }}
                  >
                   
                  </Text> */}

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: spacing(16),
                    }}  >

                    <Ionicons
                      name="sparkles-outline"
                      size={14}
                      color={GOLD}
                    />

                    <Text
                      style={{
                        marginLeft: 8,
                        color: "#A7A8B0",
                        fontSize: scale(10),
                        fontWeight: "600",
                        letterSpacing: 1.8,
                      }}  >
                       ABOUT
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        height: "38%",
                        backgroundColor: "rgba(255,1255,255,0.35)",
                        marginLeft: spacing(8),
                      }}
                    />

                  </View>

                  <Text
                    style={{
                      color: "#fff",
                      fontSize: scale(13),
                      lineHeight: scale(22),
                    }}
                  >
                    {arena.biography.trim() ||
                      "Your biography will appear here. Introduce yourself and give visitors a sense of your arena."}
                  </Text>
          </View>
          
          <Pressable
              onPress={() => onPressOwner?.(arena?.owner_id)}
              style={{
                flex: 1,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "rgba(232,185,90,0.25)",
                paddingHorizontal: scale(16),
                paddingVertical: scale(16),
                // justifyContent: "space-center",
              }}
              className = "justify-center "
            >
              <View 
              className = "flex-1"
              style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: arena.owner.profileImage.publicUrl }}
                  style={{
                    width: scale(35),
                    height: scale(35),
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: GOLD_DARK,
                  }}
                />

                <View style={{ 
                  // flex: 1,
                   marginLeft: scale(9) 
                   }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#F4F0E8",
                      fontSize: scale(12),
                      fontWeight: "700",
                    }}
                  >
                    {arena?.owner?.fullname || "Arena Creator"}
                  </Text>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing(7) }}>
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={scale(12)}
                      color={GOLD}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "#C5BBA9",
                        fontSize: scale(10),
                        marginLeft: 3,
                      }}
                    >
                     {arena?.owner?.city || arena?.region || "Location unavailable"}
                    </Text>
                  </View>
                </View>

                <View
                  className = "absolute right-4 top-4">
                      <MaterialCommunityIcons
                      name="arrow-up-right"
                      size={scale(25)}
                      color={GOLD}
                       />
                </View>

              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // borderTopWidth: 1,
                  // borderTopColor: "rgba(255,255,255,0.08)",
                  paddingTop: scale(14),
                }}
              >
                <Text
                  style={{
                    color: "#c0c0c0",
                    fontSize: scale(10),
                    fontWeight: "600",
                  }}
                >
                  Discover the arena creator
                </Text>

                
              </View>
          </Pressable> 
  
          <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: spacing(40),
                }}
              >
                <Ionicons
                  name="sparkles-outline"
                  size={14}
                  color={GOLD}
                />

                <Text
                  style={{
                    marginLeft: 8,
                    color: "#A7A8B0",
                    fontSize: scale(10),
                    fontWeight: "600",
                    letterSpacing: 1.8,
                  }}
                >
                  THE EXPERIENCE
                </Text>
                <View
                      style={{
                        flex: 1,
                        height: "38%",
                        backgroundColor: "rgba(255,1255,255,0.35)",
                        marginLeft: spacing(8),
                      }}
                    />
              </View>

              <Text
                style={{
                  color: "#fff",
                  fontSize: scale(12),
                  lineHeight: scale(21),
                  marginTop: spacing(16),
                }}
              >
                {arena.description.trim() ||
                  "Your arena description will appear here. Describe what makes your arena worth discovering."}
              </Text>
          </View>

          {/* {!!arena?.description && (
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
          )} */}
  
          {/* Social actions */}
          {!isMe && (
            <View
              style={{
                flexDirection: "row",
                paddingTop: spacing(12),
                marginBottom : spacing(4),
                gap: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressFollow}
                style={{
                  flex: 1,
                  minHeight: 46,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: arena?.isFollower
                    ? "#000000"
                    : GOLD,
                  borderWidth: 1,
                  borderColor: BORDER,
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
                  backgroundColor: "#00000",
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
  
          {/* {!isMe && (
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
          )} */}
  
          {/* Statistics */}
          <View
            style={{
              flexDirection: "row",
              marginTop: scale(16),
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
                  // borderColor: BORDER,
                  justifyContent: "center",
                }}
              >
                {/* Label on top */}
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#c0c0c0",
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
                        marginTop: scale(44)
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