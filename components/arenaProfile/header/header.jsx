
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  Animated,
  Pressable,
} from "react-native";

import { useGlobalContext } from "../../../context/GlobalProvider";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";


import { LinearGradient } from "expo-linear-gradient";
import { countries, stageIcons } from "../../../utilities/TypeData";
import CountryFlag from "../../common/CountryFlag";
import { router } from "expo-router";


export default function Header({
  arena,
  setSelectedArena,
  setOpenEditArenaModal,
  setShowArenaSelector,
  setShownMenuPostId,
  isMe,
  onPressFollow,
  onPressStar,
  onPressOwner,
}) {
  const { width, height } = useWindowDimensions();

  const {
    uploadPerformanceLoading,
    setArenaActionModal,
    setOpenArenaAlertModal,
    scale,
    sharing , openShare ,
    arenaActionModal
  } = useGlobalContext();

  const [showArenaMenu, setShowArenaMenu] = useState(false);
  const [showOwner, setShowOwner] = useState(false);
  const ownerAnimation = useRef(new Animated.Value(0)).current;

  if (!arena) return null;

  const toggleOwner = () => {
    const nextValue = !showOwner;
    setShowOwner(nextValue);
  
    Animated.timing(ownerAnimation, {
      toValue: nextValue ? 1 : 0,
      duration: 280,
      useNativeDriver: false,
    }).start();
  };

  const followersCount = arena?.followerCount || 0;
  const performancesCount =
    arena?.performanceCount ??
    arena?.postCount ??
    arena?.posts?.length ??
    0;
  const starsCount = arena?.starCount || 0;

  const coverImage =
    arena?.coverImage?.publicUrl ||
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81";

  const profileImage =
    arena?.profileImage?.publicUrl ||
    "https://i.pravatar.cc/300";

  const createPerformance = () => {
    setShownMenuPostId?.(null);

    setArenaActionModal("create_performance");
    setOpenArenaAlertModal(true);
  };

  return (
    <View
      style={{
        backgroundColor: "#05080A",
        width,
        flex:1
      }}   >

      <View
        style={{
          height: height * 0.3,
          width: "100%",
          backgroundColor: "#080B0D",
        }}
        className = "rounded-t-xl "  >
        <Image
          source={{ uri: coverImage }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
          className = "rounded-t-3xl "
        />

        <LinearGradient
        colors={[
            "#05080A",
            "rgba(3,6,7,0.68)",
            "rgba(3,6,7,0.20)",
            "rgba(0,0,0,0.04)",
            "rgba(0,0,0,0.02)",
        ]}
        locations={[0, 0.22, 0.48, 0.72, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }}
        />

        {/* <LinearGradient
          colors={[
            "rgba(0,0,0,0.12)",
            "rgba(0,0,0,0.24)",
            "rgba(3,6,7,0.30)",
            "rgba(3,6,7,0.58)",
            "rgba(3,6,7,0.88)",
          ]}
          locations={[0, 0.28, 0.52, 0.78, 1]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        /> */}


        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:10
          }} 
           >
       
        </View>

        
      </View>

      {/* =========================================================
          ARENA CONTENT
      ========================================================= */}

      <View
        style={{
          paddingHorizontal: 8,
          paddingBottom: 16,
        }}
        className = "mt-[-50px] bg-black justify-center items-center rounded-[60px]"
      >   

          {/* share */}
          <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => openShare({
                          category:"arena",
                          type: "shared_arena",
                          _id:arena._id,
                          name:arena.arenaName,
                          region:arena.region,
                          talent:arena.talentType,
                          ownerId:arena.owner_id
                      })}
                      disabled={sharing}
                      style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          // height: 46,
                          paddingHorizontal: 18,
                          borderRadius: 12,
                          borderWidth: 1,
                      }}
                      className="flex-1 absolute top-2 right-8 b g-[#1c1c1d] py-4 self-center justify-center"

                      >

                      {sharing ? (

                          <ActivityIndicator
                          size="small"
                          color="#fff"
                          />

                      ) : (

                          <MaterialCommunityIcons
                          name="share"
                          size={scale(30)}
                          color="#fff"
                          />

                      )}

           </TouchableOpacity>


           <View
              style={{
                marginTop :-scale(72)/2,
                width: scale(102),
                height: scale(102),
                padding: 6,
                backgroundColor: "#000",
              }}
              className ="rounded-full"
            >
          
                <Image
                  source={{ uri: profileImage }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  className ="rounded-full"
                />
            

              {/* Verification badge */}

              <View
                style={{
                  position: "absolute",
                  right: 6,
                  bottom: 10,
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E4B936",
                  borderWidth: 2,
                  borderColor: "#05080A",
                }}
              >
                <Ionicons
                  name="checkmark"
                  size={13}
                  color="#111"
                />
              </View>
          </View>
        
          <View
            style={{
              marginTop: 10,
              // minHeight: height/10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowArenaSelector?.(true)}
              style={{
                // flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  // fontFamily:"italic",
                  color: "#F5F5F5",
                  fontSize: scale(18),
                  fontWeight: "700",
                  letterSpacing: 0.55,
                  flexShrink: 0.5,
                }}
              >
                {arena.arenaName}
              </Text>

              {/* Verification */}

              <View
                style={{
                  marginLeft: 7,
                  padding : 2,
                  borderRadius: 9,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E7BC35",
                }}
              >
                <MaterialCommunityIcons
                  name="stadium"
                  size={scale(14)}
                  color="#111"
                />
              </View>
            </TouchableOpacity>
          </View>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
            className ="gap-2  " >

            <InfoPill
              text={arena.talentType}
              flag = {null}
              size={scale(12)}
            />
            <View
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 2,
                    marginHorizontal: 6,
                    backgroundColor: "#aaa",
                  }}
            />
            <InfoCountry
              countryCode={arena.region}
              text={countries.find(c => c.code == arena.region ).name }
              size= {scale(12)}
            />
          </View>

     
         {/* stats and more */}

          <View
            style={{
              marginTop: 15,
              width: "90%",
              alignSelf: "center",
            }}
          >
            {/* Stats */}
            <View
              className="px-6 justify-evenly gap-4"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <StatItem
                icon="star-four-points"
                value={formatCount(starsCount)}
                label=""
                textSize={scale(15)}
                iconSize={scale(22)}
                color="#fff"
              />

              <StatItem
                icon="account-multiple"
                value={formatCount(followersCount)}
                label=""
                textSize={scale(15)}
                iconSize={scale(22)}
                color="#fff"
              />

              <StatItem
                icon="play"
                value={formatCount(performancesCount)}
                label=""
                textSize={scale(15)}
                iconSize={scale(24)}
                color="#fff"
              />
            </View>

            {/* More / Less */}
            <Pressable
              onPress={toggleOwner}
              style={{
                alignSelf: "center",
                marginTop: 8,
                paddingHorizontal: 14,
                paddingVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: scale(12),
                  fontWeight: "600",
                }}
              >
                {showOwner ? "Show less" : "More"}
              </Text>

              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: ownerAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "180deg"],
                      }),
                    },
                  ],
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={scale(16)}
                  color="rgba(255,255,255,0.65)"
                />
              </Animated.View>
            </Pressable>

            {/* Expandable Owner Section */}
            <Animated.View
              style={{
                maxHeight: ownerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 180],
                }),
                opacity: ownerAnimation,
                overflow: "hidden",
              }}
              className = "w-full"
            >
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 4,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.0)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                {/* Owner Header */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() =>{
                    onPressOwner(arena.owner_id)
                  }}
                >
                  {arena?.owner?.profileImage ? (
                    <Image
                      source={{ uri: arena.owner.profileImage.publicUrl }}
                      style={{
                        width: scale(42),
                        height: scale(42),
                        borderRadius: scale(21),
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: scale(42),
                        height: scale(42),
                        borderRadius: scale(21),
                        backgroundColor: "rgba(255,255,255,0.08)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="account"
                        size={scale(22)}
                        color="rgba(255,255,255,0.55)"
                      />
                    </View>
                  )}

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 11,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#fff",
                          fontSize: scale(14),
                          fontWeight: "700",
                          flexShrink: 1,
                        }}
                      >
                        {arena?.owner?.fullname ||
                          arena?.owner?.username ||
                          "Arena Owner"}
                      </Text>

                      {arena?.owner?.verified && (
                        <MaterialCommunityIcons
                          name="check-decagram"
                          size={scale(15)}
                          color="#fff"
                          style={{ marginLeft: 5 }}
                        />
                      )}
                    </View>

                    {arena?.owner?.username && (
                      <Text
                        numberOfLines={1}
                        style={{
                          marginTop: 2,
                          color: "rgba(255,255,255,0.48)",
                          fontSize: scale(11),
                        }}
                      >
                        @{arena.owner.username}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                {/* Arena Information */}
                {(arena?.arenaName || arena?.talentType || arena?.region) && (
                  <View
                    style={{
                      marginTop: 10,
                      paddingTop: 9,
                      borderTopWidth: 1,
                      borderTopColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "rgba(255,255,255,0.82)",
                        fontSize: scale(12),
                        fontWeight: "600",
                      }}
                    >
                      {arena?.arenaName}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={{
                        marginTop: 3,
                        color: "rgba(255,255,255,0.45)",
                        fontSize: scale(11),
                      }}
                    >
                      {[arena?.talentType, arena?.region]
                        .filter(Boolean)
                        .join(" • ")}
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          </View>
         
          {/* action buttons */}
          <View
              style={{
                  alignSelf : "center"
              }} className = "justify-between  px-1 mb-2  6 gap-3 mt-6 items-center flex-row "  >
                  {!isMe && (
                  <>
                  <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={onPressFollow}
                      style={{
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor:
                          "rgba(234,179,8,0.35)",
                      }} className = "flex-1 justify-center py-4"   >

                      <MaterialCommunityIcons
                          name={
                              arena.isFollower
                                  ? "heart"
                                  : "heart-outline"
                          }
                          color={
                              arena.isFollower
                                  ? "#EAB308"
                                  : "#EAB308"
                          }
                          size={scale(17)}
                      />

                      <Text
                          style={{
                              marginLeft: 8,
                              fontSize : scale(12),
                              color:
                                  arena.isFollower
                                      ? "#fff"
                                      : "#FFF",

                              fontWeight: "700",
                          }}
                      >
                          {arena.isFollower
                              ? "Following"
                              : "Follow"}
                      </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={onPressStar}
                          style={{
                              // width: 46,
                              // height: 46,
                              borderRadius: 12,
                              // backgroundColor:  "rgba(255,255,255,.09)",
                              borderWidth: 1,
                              borderColor:
                              "rgba(234,179,8,0.35)",
                              // justifyContent: "center",
                              alignItems: "center",
                              flexDirection : "row"
                          }}
                          className = "flex-1 justify-center py-4" 
                      >

                          <MaterialCommunityIcons
                              name={
                                  arena.isStarred
                                      ? "star-four-points"
                                      : "star-four-points-outline"
                              }
                              color="#EAB308"
                              size={scale(17)}
                          />
                          <Text
                          style={{
                              marginLeft: 8,
                              fontSize : scale(12),
                              color:
                                  arena.isStarred
                                      ? "#fff"
                                      : "#FFF",

                              fontWeight: "700",
                              }}   >
                              {arena.isStarred
                                  ? "Starred"
                                  : "Star"}
                          </Text>
                  </TouchableOpacity>
                  </>
                  )}

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
                      }}
                      className="w-[100%] self-center py-4 px-8"
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

     

      {/* =========================================================
          ARENA OPTIONS MENU
      ========================================================= */}

      {showArenaMenu && (
        <ArenaMenu
          arena={arena}
          setShowArenaMenu={setShowArenaMenu}
          setOpenEditArenaModal={setOpenEditArenaModal}
          setArenaActionModal={setArenaActionModal}
          setOpenArenaAlertModal={setOpenArenaAlertModal}
        />
      )}
    </View>
  );
}

/* ===============================================================
   INFO PILL
================================================================ */

function InfoPill({
  icon,
  text,
  flag = false,
  size = 12
}) {
  if (!text) return null;

  return (
    <View
      style={{
        // height: 31,
        // paddingHorizontal: 10,
        // marginRight: 7,
        // borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.025)",
        // marginTop :10
      }}
      className = "px- 3 py-2 gap-2 border- [0.5px] border -white/30 roun ded-full "
    >
      {/* <View
      className ="p-1 bg-white/80 rounded-full">
        <Text
            style={{
            color: "#D7D7D9",
            fontSize: size-6,
            fontWeight: "400",
            }}    
            >
            {flag}  
        </Text>
      </View> */}
      <Text
        style={{
          color: "#aaa",
          fontSize: size,
          fontWeight: "500",
        }} 
        className = ""
         >
        # {text}
      </Text>
     
    </View>
  );
}

function InfoCountry({
    countryCode,
    text,
    size = 12
  }) {
    if (!text) return null;
  
    return (
      <View
        style={{
          // height: 31,
          // paddingHorizontal: 10,
          // marginRight: 7,
          // borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.025)",
        //   marginTop :10
        }}
        className = "px- 3 py-2 gap-2 bor der-[0.5px] bor der-white/30 rounded-full "
      >
       
       <CountryFlag code={countryCode} size={size+4} />
        <Text
          style={{
            color: "#aaa",
            fontSize: size,
            fontWeight: "500",
          }} 
          className = ""
           >
          {text}
        </Text>
       
      </View>
    );
  }
  

/* ===============================================================
   STAT ITEM
================================================================ */

function StatItem({
  icon,
  value,
  label,
  textSize,
  iconSize,
  color
}) {
  return (
    <View
      style={{
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        className ="gap-1"
      >
        <MaterialCommunityIcons
          name={icon}
          size={iconSize}
          color= {color}
        />

        <Text
          style={{
            color: "#F1F1F2",
            fontSize: textSize,
            fontWeight: "800",
            letterSpacing: -0.2,
          }}
        >
          {value} 
        </Text>
      </View>

      {/* <Text
        style={{
          marginTop: 4,
          color: "#85878A",
          fontSize: textSize-3,
          fontWeight: "600",
        }}
      >
        {label}
      </Text> */}
    </View>
  );
}

/* ===============================================================
   STAT DIVIDER
================================================================ */

function StatDivider() {
  return (
    <View
      style={{
        width: 2,
        height: 50,
        backgroundColor: "rgba(255,255,255,0.20)",
      }}
      className = "fle x-1"
    />
  );
}

/* ===============================================================
   ARENA MENU
================================================================ */

function ArenaMenu({
  arena,
  setShowArenaMenu,
  setOpenEditArenaModal,
  setArenaActionModal,
  setOpenArenaAlertModal,
}) {
  return (
    <View
      style={{
        position: "absolute",

        top: 66,
        right: 16,

        width: 205,

        borderRadius: 17,

        overflow: "hidden",

        backgroundColor: "#0B1012",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.13)",

        zIndex: 100,

        elevation: 20,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      }}
    >
      <MenuItem
        icon="pencil-outline"
        label="Edit arena"
        onPress={() => {
          setShowArenaMenu(false);
          setOpenEditArenaModal(true);
        }}
      />

      <MenuDivider />

      <MenuItem
        icon="share-variant-outline"
        label="Share arena"
        onPress={() => {
          setShowArenaMenu(false);
          setOpenArenaAlertModal(true);
        }}
      />

      <MenuDivider />

      <MenuItem
        icon="trash-can-outline"
        label="Delete arena"
        destructive
        onPress={() => {
          if ((arena?.posts?.length || 0) > 0) {
            setArenaActionModal("delete_arena_deny");
          } else {
            setArenaActionModal("delete_arena");
          }

          setOpenArenaAlertModal(true);
          setShowArenaMenu(false);
        }}
      />
    </View>
  );
}

/* ===============================================================
   MENU ITEM
================================================================ */

function MenuItem({
  icon,
  label,
  onPress,
  destructive = false,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        minHeight: 53,

        paddingHorizontal: 14,

        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,

          borderRadius: 10,

          alignItems: "center",
          justifyContent: "center",

          backgroundColor: destructive
            ? "rgba(239,68,68,0.07)"
            : "rgba(255,255,255,0.045)",
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={17}
          color={destructive ? "#EF6464" : "#DDB83F"}
        />
      </View>

      <Text
        style={{
          marginLeft: 11,

          color: destructive
            ? "#EF6464"
            : "#ECECEE",

          fontSize: 13,

          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ===============================================================
   MENU DIVIDER
================================================================ */

function MenuDivider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "rgba(255,255,255,0.06)",
      }}
    />
  );
}

/* ===============================================================
   NUMBER FORMATTER
================================================================ */

function formatCount(value) {
  const number = Number(value) || 0;

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toString();
}