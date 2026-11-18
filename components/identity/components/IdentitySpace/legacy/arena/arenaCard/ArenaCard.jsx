import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import {
  useGlobalContext,
} from "../../../../../../../context/GlobalProvider";

import ArenaPortalIcon
  from "../../../../../../svgIcons/ArenaPortalIcon";

import CountryFlag
  from "../../../../../../common/CountryFlag";

import TalentIcon
  from "../../../../../../custom/TalentIcon";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import PerformanceIcon from "../../../../../../svgIcons/others/PerformanceIcon";
import FollowersIcon from "../../../../../../svgIcons/others/followersIcon";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "../../../../../../../utilities/TypeData";
import { formatCount, talentAvatar } from "../../../../../../../helper";
import TalentIconSelector from "../../../../../../common/talentIconSelector";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ANIMATION_CONFIG = {
  duration: 280,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export default function ArenaCard({
  arena,
  isLast = false,
  onOpenArena,
  width
}) {
  const {
    spacing,
    scale,
  } = useGlobalContext();

  const [expanded, setExpanded] = useState(true);

  const name =
    arena?.name ||
    arena?.arenaName ||
    "Unnamed Arena";

  const biography =
    arena?.biography ||
    arena?.bio ||
    arena?.description ||
    "A space created for talent";

  const talent =
    arena?.talentType ||
    arena?.profession ||
    "Talent";

  const country =
    arena?.country ||
    arena?.region ||
    "DZ";

  const score = arena?.score ?? 0;

  const posts = Array.isArray(arena?.posts)
    ? arena.posts
    : [];

  const performances =
    arena?.postCount ??
    arena?.performanceCount ??
    posts.length;

  const followers = arena?.followerCount ?? 0;

  const stars =  arena.starCount ?? 0; 

  const visiblePosts = posts.slice(0, 2);
  const remainingPosts = Math.max(posts.length - 2, 0);

  const toggleExpanded = useCallback(() => {
    LayoutAnimation.configureNext(ANIMATION_CONFIG);
    setExpanded((previous) => !previous);
  }, []);

  const handleOpenArena = useCallback(() => {
    onOpenArena?.(arena);
  }, [arena, onOpenArena]);

  const getThumbnail = (post) =>
    post?.media?.thumbnail?.cdnUrl || post?.media?.thumbnail?.publicUrl || null;

  return (
    <Pressable
      onPress={() => router.push({
        pathname:
          "/arenaProfile",
        params: {
          arena_id:
            arena._id,
        },
      })}
      style={{
        // paddingHorizontal: spacing(16),
        height: spacing(430),
        width :  width * 0.99,
        borderRadius : scale(7)
      }}
      className="justify-start  items-center  "
     >
      

      <View
          style={{
            paddingBottom: spacing(6),
          }}
          className = "w-full p-2 flex-1 rounded-t-3xl bg-black border-l-2 border-r-2 border-t-2 border-[#252424] justify-center items-center "  >

          {/* {visiblePosts.length > 0 ? (
            <View
              className="flex-row flex-1"
              style={{
                gap: spacing(6),
                // paddingVertical: spacing(6),

              }}  >
              {visiblePosts.map((post, index) => {
                const thumbnail = getThumbnail(post);
                const isLastVisible = index === 1;
                const showMore =
                  isLastVisible && remainingPosts > 0;
                return (
                  <Pressable
                    key={
                      post?._id ||
                      post?.id ||
                      `performance-${index}`
                    }
                    onPress={() => router.push({
                        pathname:
                          "/arenaProfile",
                        params: {
                          arena_id:
                            arena._id,
                        },
                      })}
                    android_ripple={{
                      color: "rgba(232,185,90,0.12)",
                    }}
                    style={{
                      flex: visiblePosts.length === 1 ? 1 : 1,
                    //   height: spacing(200),
                      borderRadius: scale(5),
                      overflow: "hidden",
                      // backgroundColor: "rgba(0,0,0,0.68)",
                      width
                    }}
                    className = "flex-1"
                  >
                    {thumbnail ? (
                      <Image
                        source={{ uri: thumbnail }}
                        resizeMode="cover"
                        style={{
                          height : "86%"
                        }}
                        className="h- full w-full rounded-xl"
                      />
                    ) : (
                      <View
                        className="flex-1 items-center justify-center"
                        style={{
                          backgroundColor: "#151515",
                        }}
                      >
                        <ArenaPortalIcon
                          size={scale(25)}
                          color="rgba(232,185,90,0.35)"
                        />
                      </View>
                    )}
                   
                    {!showMore && (
                      <View
                          className="absolute inset-0 items-center justify-center"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.18)",
                          }}
                        />
                    )}


                    {showMore && (
                      <View
                        className="absolute inset-0 items-center justify-center"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.28)",
                        }}
                      >
                        <Text
                          style={{
                            color: "#F4C542",
                            fontSize: scale(17),
                            lineHeight: spacing(22),
                            fontWeight: "900",
                            letterSpacing: scale(0.3),
                          }}
                        >
                          + {remainingPosts}
                        </Text>

                        <Text
                          style={{
                            marginTop: spacing(1),
                            color: "rgba(255,255,255,0.8)",
                            fontSize: scale(7),
                            fontWeight: "800",
                            letterSpacing: scale(1),
                          }}
                        >
                          MORE
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
            ) : (
            <Pressable
              className="items-center w-full h-full  justify-start"
              onPress={() => router.push({
                pathname:
                  "/arenaProfile",
                params: {
                  arena_id:
                    arena._id,
                },
              })}
              style={{
                // flex:1,
                borderRadius: scale(10),
                borderWidth: scale(1),
                // borderColor: "rgba(255,255,255,0.06)",
                // backgroundColor: "rgba(255,255,255,0.09)",
              }}
             
            >
              <Image
                   source={{ uri: arena.coverImage.publicUrl }}
                  resizeMode="cover"
                  style={{
                    height : "86%"
                  }}
                  className="opacity-50  w-full rounded-xl"
               />
      
            </Pressable>
          )}

            <View
                className="bg-[gold]/60  items-center rounded-full absolute bot tom-0  justify-center"
                style={{
                  bottom :spacing(20) ,
                  padding : spacing(2),
                  zIndex :1002,
                }}  >
                <Image
                source={{ uri: arena.profileImage?.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(90),
                  height: scale(90),
                }}
                className ="rounded-full" />
            </View> */}
            <View
                  className="flex-row flex-1"
                  style={{
                    gap: spacing(6),
                    // paddingVertical: spacing(6),

                  }}  >
                    <Image
                        source={{ uri:  talentAvatar[arena.talentType.toLowerCase()]?.publicUrl}}
                        resizeMode="cover"
                        style={{
                          height : "100%"
                        }}
                        className="h- full w-full  rounded-xl"
                        />  
            </View>

            <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(0,0,0,0.04)",
              "rgba(0,0,0,0.34)",
              "#000",
            ]}
            locations={[0, 0.73, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />


      </View>


      <View
          className="flex-col rounded-b-3xl border-x-2 border-b-2 border-[#252424]  items-start justify-start w-full"
          style={{
              height : scale(165),
              paddingHorizontal : spacing(24)
          }}  >

            <View
                  style={{
                    // position: "absolute",
                    // bottom: -40,
                    // left: scale(15),
                    // right: scale(15),
                    // transform: [{ translateY: 38 }],
                    flexDirection: "row",
                    marginTop: - spacing(36),
                  //   alignItems: "flex- end",
                  }}
                >
                  <View
                    style={{
                      width: scale(90),
                      height: scale(90),
                      borderRadius: 26,
                      padding: 3,
                      backgroundColor: "#181713",
                      borderWidth: 1,
                      borderColor: "#B8943D",
                      overflow: "hidden",
                    }}
                  >
                    { arena?.profileImage ? (
                      <Image
                        source={{ uri: arena.profileImage.publicUrl }}
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
                          fontSize: scale(16),
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
                              <TalentIconSelector code={arena.talentType} size={scale(27)} />
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: scale(9),
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
                          className = "flex-col gap-4 ml-3 items-center">
                              
                              <CountryFlag code={arena.region} size={scale(21)} />
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: scale(9),
                                  fontWeight: "600",
                                  letterSpacing : 2.8
                                }}
                              >
                                {arena.region || "US"}
                              </Text>
                          </View>
                      </View>


                  </View>

                </View>
               
               <View
               style = {{
                // marginTop: "auto",
                flex:1,
                marginBottom : spacing(16),
               }}
               className = "justify-end"
               >
                  <Text
                      numberOfLines={1}
                      style={{
                        color: "#fff",
                        fontSize: scale(11),
                        lineHeight: scale(22),
                      }}
                    >
                      {arena.biography.trim() ||
                        "Your biography will appear here. Introduce yourself and give visitors a sense of your arena."}
                  </Text>

                  <View
                  style = {{
                    marginTop : spacing(8),
                  }}
                    className = "  min-w -[90%] w-full rounded-xl border- [1px] sel f-start py-2  flex-row justify-start   "
                      >
                    {[
                      {
                        label: "PERFORMANCES",
                        value: arena.postCount,
                        icon: "play-box-multiple-outline",
                      },
                      {
                        label: "FOLLOWERS",
                        value: followers,
                        icon: "account-group-outline",
                      },
                      {
                        label: "STARS",
                        value: stars,
                        icon: "star",
                      },
                    ].map((stat,index) => (
                      <View 
                       className = " flex-row flex-1 justify-start  between"
                       key={stat.label}>
                        <View
                        // key={stat.label}
                        className="flex-row flex-1 items-center gap-2 justify-between">
                      

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <View
                            style={{
                              // width: 29,
                              // height: 29,
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
                              size={17}
                              color={"white"}
                            />
                          </View>
                      
                          <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            minimumFontScale={0.8}
                            style={{
                              flexShrink: 1,
                              color: "white",
                              fontSize: scale(11),
                              fontWeight: "700",
                              letterSpacing: -0.3,
                              fontVariant: ["tabular-nums"],
                            }}
                          >
                            {formatCount(stat.value)}
                          </Text>
                        </View>
                      </View>
                      { index !==2 && (
                        <View
                        className = "h-[90%] w-[1px] mr-[30%] bg-gray-400 self-center rounded-full"
                        />
                      )}
                      </View>
                    ))}
                  </View>



               </View>
               
        </View>


       {!isLast && (
        <View
          style={{
            position: "absolute",
            left: spacing(7),
            right: spacing(7),
            bottom: 0,
            height: scale(1),
            backgroundColor: "rgba(255,255,255,0.045)",
          }}
        />
       )}

    </Pressable>
  );
}