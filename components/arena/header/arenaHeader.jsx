

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import { useGlobalContext } from "../../../context/GlobalProvider";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ArenaRefreshButton from "../custom/arenaRefreshButton";
import ArenaHumburgerMenu from "../custom/arenaHumburgerMenu";

import { LinearGradient } from "expo-linear-gradient";
import { countries, stageIcons } from "../../../utilities/TypeData";
import CountryFlag from "../../common/CountryFlag";
import { router } from "expo-router";

export default function ArenaHeader({
  arena,
  setSelectedArena,
  setOpenEditArenaModal,
  setShowArenaSelector,
  setShownMenuPostId,
  onRefresh,
  refresh,
}) {
  const { width, height } = useWindowDimensions();

  const {
    uploadPerformanceLoading,
    setArenaActionModal,
    setOpenArenaAlertModal,
    scale
  } = useGlobalContext();

  const [showArenaMenu, setShowArenaMenu] = useState(false);

  if (!arena) return null;

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
        width
      }}
    >
      {/* =========================================================
          COVER
      ========================================================= */}

      <View
        style={{
          height: height * 0.22,
          width: "100%",
          backgroundColor: "#080B0D",
        }}
        className = "rounded-t-xl"
      >
        <Image
          source={{ uri: coverImage }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
          className = "rounded-t-3xl"
        />

        {/* Dark cinematic gradient */}

        <LinearGradient
          colors={[
            "rgba(0,0,0,0.02)",
            "rgba(0,0,0,0.04)",
            "rgba(3,6,7,0.20)",
            "rgba(3,6,7,0.58)",
            "rgba(3,6,7,0.78)",
            // "rgba(3,6,7,0.98)",
          ]}
          locations={[0, 0.28, 0.52, 0.78, 1]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />

        {/* =====================================================
            TOP CONTROLS
        ===================================================== */}

        <View
          style={{
            position: "absolute",
            // width,
            bottom: 0,
            // left: 300,
            right: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:10
          }} 
           >
          {/* <ArenaRefreshButton
            onRefresh={onRefresh}
            refresh={refresh}
          /> */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowArenaSelector?.(true)}
            style={{
              height: 38,
              paddingHorizontal: 13,
              borderRadius: 25,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.035)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <Text
              style={{
                color: "#F0F0F1",
                fontSize:scale(12),
                fontWeight: "800",
              }}
            >
              My Arenas
            </Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={scale(18)}
              color="#D6D6D8"
              style={{
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <ArenaHumburgerMenu
            setShowArenaMenu={setShowArenaMenu}
            showArenaMenu={showArenaMenu}
            size={scale(20)}
          />
        </View>

        {/* =====================================================
            PROFILE IMAGE
        ===================================================== */}

        <View
          style={{
            position: "absolute",
            left: 20,
            bottom: -1,
            width: scale(72),
            height: scale(72),
            borderRadius: 48,
            padding: 3,
            backgroundColor: "#05080A",
            borderWidth: 1.5,
            borderColor: "#D9B83F",
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 45,
              overflow: "hidden",
              backgroundColor: "#101416",
            }}
          >
            <Image
              source={{ uri: profileImage }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>

          {/* Verification badge */}

          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 1,
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
      </View>

      {/* =========================================================
          ARENA CONTENT
      ========================================================= */}

      <View
        style={{
          paddingHorizontal: 8,
          paddingBottom: 16,
        }}
      >
        {/* =====================================================
            NAME + MY ARENAS
        ===================================================== */}

        <View
          style={{
            marginTop: 20,
            // minHeight: height/10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Arena name */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              // onPress?.(entry)
              router.push({
                pathname:
                  "/arenaProfile",
                params: {
                  arena_id:
                    arena._id,
                },
              })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                // fontFamily:"italic",
                color: "#F5F5F5",
                fontSize: scale(16),
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
              <Ionicons
                name="checkmark"
                size={scale(10)}
                color="#111"
              />
            </View>
          </TouchableOpacity>

        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 1,
          }}
          className ="gap-2 mt- 4" >

          <InfoPill
            text={arena.talentType}
            flag = {stageIcons[arena.talentType]}
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

        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        {!!(arena.description || arena.biography) && (
          <View
            style={{
              // marginTop: 10,
            }}
          >
            {/* <Text
              numberOfLines={3}
              style={{
                color: "#C7C9CB",
                fontSize: 14,
                lineHeight: 21,
                fontWeight: "500",
                letterSpacing: -0.05,
              }}
            >
              {arena.description || arena.biography} ...
            </Text> */}

            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#E7BE3D",
                  fontSize: 13,
                  fontWeight: "800",
                }}
              >
                More
              </Text>

              <MaterialCommunityIcons
                name="chevron-down"
                size={17}
                color="#E7BE3D"
                style={{
                  marginLeft: 2,
                }}
              />
            </TouchableOpacity> */}
          </View>
        )}

         {/*  STATS */}
         <View
          style={{
            // marginBottom: 25,
            marginTop: 25,
            borderRadius: 9,
            // backgroundColor: "rgba(255,255,255,0.05)",
            flexDirection: "row",
            alignItems: "center",
          }}
          className = "py-3 px-6 justify-between bg-gold/10" >

          <StatItem
            icon="star-four-points-outline"
            value={formatCount(starsCount)}
            label="Stars"
            textSize={scale(11)}
            iconSize={scale(16)}
            color = "#fff"
          />

          {/* <StatDivider /> */}

          <StatItem
            icon="account-multiple-outline"
            value={formatCount(followersCount)}
            label="Followers"
            textSize={scale(11)}
            iconSize={scale(16)}
            color = "#FFF"
          />

          {/* <StatDivider /> */}

          <StatItem
            icon="play-outline"
            value={formatCount(performancesCount)}
            label="Posts"
            textSize={scale(11)}
            iconSize={scale(18)}
            color = "#FFF"
          />

          {/* <StatDivider /> */}

        </View>

          <TouchableOpacity
            activeOpacity={0.88}
            disabled={uploadPerformanceLoading}
            onPress={createPerformance}
            style={{
              marginTop: 30,
              marginBottom: 20,
              // height: 46,
              borderRadius: 12,
              backgroundColor: uploadPerformanceLoading
                ? "#9A7620"
                : "#E9B934",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
          
            }}
            className = "py-4"
          >
            {uploadPerformanceLoading ? (
              <>
                <ActivityIndicator
                  size="medium"
                  color="#111"
                />

                <Text
                  style={{
                    marginLeft: 12,
                    color: "#111",
                    fontSize: scale(14),
                    fontWeight: "900",
                    letterSpacing: 0.9,
                  }}
                >
                  UPLOADING...
                </Text>
              </>
            ) : (
              <>
                <Ionicons
                  name="add"
                  size={scale(20)}
                  color="#111"
                />

                <Text
                  style={{
                    marginLeft: 7,
                    color: "#111",
                    fontSize: scale(14),
                    fontWeight: "900",
                    letterSpacing: 0.9,
                  }}
                >
                  Add Performance
                </Text>
              </>
            )}
        </TouchableOpacity>

        {/* =====================================================
            PERFORMANCES HEADER
            ===================================================== */}

        {/* <View
          style={{
            marginTop: 21,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#F2F2F3",
              fontSize: width/25,
              fontWeight: "900",
              letterSpacing: -0.2,
            }}
          >
            Performances
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#E7BE3D",
                fontSize: width/34,
                fontWeight: "600",
              }}
            >
              Play All
            </Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={width/20}
              color="#E7BE3D"
            />
          </TouchableOpacity>
        </View> */}


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
      <View
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
      </View>
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
            fontSize: textSize + 2 ,
            fontWeight: "600",
            letterSpacing: -0.2,
          }}
        >
          {value} 
        </Text>
      </View>

      <Text
        style={{
          marginTop: 4,
          color: "#85878A",
          fontSize: textSize-1,
          fontWeight: "600",
          letterSpacing : 1.3
        }}
      >
        {label}
      </Text>
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
        height: 56,
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