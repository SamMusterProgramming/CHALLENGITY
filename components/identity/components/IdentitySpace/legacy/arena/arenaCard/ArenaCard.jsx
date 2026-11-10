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
    <View
      style={{
        // paddingHorizontal: spacing(16),
        height: spacing(420),
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

          {visiblePosts.length > 0 ? (
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

                    {/* MORE OVERLAY */}

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
                {/* <ArenaPortalIcon size={scale(30)} /> */}
                <Image
                source={{ uri: arena.profileImage?.publicUrl }}
                resizeMode="cover"
                style={{
                  width: scale(90),
                  height: scale(90),
                }}
                className ="rounded-full" />
            </View>

            <Text
                className = "absolute bottom-4 right-4 uppercase"
                style={{
                // marginTop: spacing(3),
                  color: "#c0c0c0",
                  fontSize: scale(9),
                  fontWeight: "700",
                  // letterSpacing: scale(0.3),
                  
                }}  >
                        {countries.find(c=> c.code == country)?.name}
            </Text>
            <Text
                           className = "absolute bottom-4 left-4 uppercase"
                           style={{
                           // marginTop: spacing(3),
                             color: "#c0c0c0",
                             fontSize: scale(9),
                             fontWeight: "700",
                             // letterSpacing: scale(0.3),
                             
                           }}  >
                          {talent.toUpperCase()}
            </Text>
       
     </View>
   





      <View
          className="flex-row rounded-b-3xl border-x-2 border-b-2 border-[#252424]   justify-between w-full"
          style={{
              // marginTop: spacing(6),
              height : scale(125)
          }}  >

             <View 
             style = {{
              paddingVertical: spacing(8),
              paddingHorizontal: spacing(8),
             }}
             className = " justify-center absolute top-0 left-4 z-50 items-center  bg-[#202021] round ed-bl-[10px] rounded-full  gap -4" >
                      <TalentIcon talent={talent} size={scale(27)} color={"gold"}/>
            </View>


            {/* METRICS */}
             <View
             className = "flex-1 justify-start bg- [#202021] items-center">
                   
                <Pressable
                    android_ripple={{
                      color: "rgba(232,185,90,0.06)",
                    }}
                    style={{
         
                    }}
                    className = "justify-start b g-black  flex-1   items-center"
                  >
                    <View
                    style={{
                      // marginBottom: spacing(4),
                       paddingTop : scale(4)
                    }}
                     className=" bg-black bord er-x-2 min-w-full flex-1 bord er-[#252424] items-center ">
                       
                          <Text
                            numberOfLines={1}
                            style={{
                              color: "#F4F4F2",
                              fontSize: scale(15),
                              // lineHeight: spacing(16),
                              fontWeight: "800",
                              letterSpacing: scale(0.25),
                            }}  >
                            {name}
                          </Text>

                          <Text
                            numberOfLines={1}
                            style={{
                              marginTop: spacing(12),
                              color: "rgba(255,255,255,0.92)",
                              fontSize: scale(11),
                              lineHeight: spacing(12),
                              fontWeight: "500",
                            }}
                          >
                            {biography}
                          </Text>

                        
                    </View>

              

                  {/* Statistics */}
      
                   <View
                    className = "  min-w-[90%] rounded-xl mb-4 border-[1px] self-center py-3 px-4 b g-[gold]/5  bor der-[gold]/20 flex-row justify-between   "
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
                       className = " flex-row flex-1 justify-center  between"
                       key={stat.label}>
                        <View
                        // key={stat.label}
                        className="flex-row flex-1 items-center gap-2 justify-center">
                      
                        {/* Icon and number in one row */}
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
                              size={12}
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
                        className = "h-[90%] w-[1px] mx- 6 bg-gray-400 self-center rounded-full"
                        />
                      )}
                      </View>
                    ))}
                  </View>

                  </Pressable>
              </View>

              <View 
                style = {{
                  paddingVertical: spacing(8),
                  paddingHorizontal: spacing(8),
                  // height : scale(60),
                  // width : scale(60)
                  }}
                  className = "flex-row absolute top-0 right-4 justify-center items-center bg-[#202021]  rounded-full  gap -4" >
                        <CountryFlag
                            code={country}
                            size={scale(30)}
                        />
              </View>

            {/* < View
              className = "w-full absolute bottom-0 h-2 bg-[#202021]"
             /> */}
         
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

    </View>
  );
}