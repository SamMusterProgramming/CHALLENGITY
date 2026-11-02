import React from "react";
import {
  useProfileSpace,
} from "../../context/ProfileSpaceContext";
import Arenas from "./arena/arenas";
import Stages from "./stage/stages";
import Spotlights from "./spotlight/spotlights";
import Performances from "./performance/performances";
import LegacyOverview from "./LegacyOverview";
import { useGlobalContext } from "../../../../../context/GlobalProvider";
import { Text, useWindowDimensions, View } from "react-native";
import LegacyBuilder from "./LegacyBuilder";


export default function LegacyContent() {
  const {
    activeSpace,
    activeLegacyTab,
  } = useProfileSpace();

  const {
    userArenas,
    userFollowedArenas,
    userTalents,
    favouriteStages,
    setSelectedArena,
    setUserArenas,
    spacing,
    scale,
    user,
  } = useGlobalContext();


  
  const isSpotlight = (post) =>
    post?.globalSpotlight?.spotlight === true ||
    post?.regionalSpotlight?.spotlight === true ||
    post?.localSpotlight?.spotlight === true;

  const allPerformances = userArenas.flatMap((arena) =>
    Array.isArray(arena.posts)
      ? arena.posts
      : []
  );

  const spotlights = userArenas.flatMap((arena) =>
    Array.isArray(arena.posts)
      ? arena.posts.filter(isSpotlight)
      : []
  );

  const { width } = useWindowDimensions();

  if (activeSpace !== "legacy") {
    return null;
  }

  return (
    <View
    style={{
      width: "100%",
      paddingHorizontal: spacing(10),
      // paddingTop: spacing(20),
      // paddingBottom: spacing(16),
      marginTop : - 2.5,
      marginBottom: spacing(46),

    }}
    // className = "items-center justify-center "
    className= "border-x-[rgba(232,185,90,0.38)] self-center items-center border-[rgba(232,185,90,0.38)] rounded-b-3xl rounded-tr-3xl border-[1px]"  >

    {/* <View
      className = "absolute right-0 h-[1px] w-[60%] bg-[rgba(232,185,90,0.38)] "
      /> */}

  <LegacyBuilder
    // userArenas={userArenas}
    // userFollowedArenas={userFollowedArenas}
    // userTalents={userTalents}
    // favouriteStages={favouriteStages}
    // onCreateArena={() => setOpenCreateArena(true)}
    // onFindStage = {null}
  />

     {/* ARENA SECTION  */}
    {(userArenas.length > 0 || userFollowedArenas.length > 0) && (
    <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(26),
        paddingBottom: spacing(32),
        width,
      }}
      className="justify-center self-center w- full items-center"
       >

        <View
          className="items-center justify-center"
          style={{
            gap : spacing(2)
          }}  >

            <View
              className="flex-row items-center justify-center"
              style={{
                gap: spacing(8),
                marginBottom: spacing(6),
              }}   >

              <View
                style={{
                  // width: scale(18),
                  height: scale(1),
                  backgroundColor: "rgba(232,185,90,0.35)",
                }}
                className = "flex-1"
              />

                <Text
                  style={{
                    fontSize: scale(20),
                    fontWeight: "900",
                    letterSpacing: scale(2.2),
                    color: "#F5F5F5",
                    textAlign: "center",
                    textShadowColor: "rgba(232,185,90,0.14)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: scale(8),
                  }}  >
                   ARENAS
                </Text>

              <View
                style={{
                  // width: scale(18),
                  height: scale(1),
                  backgroundColor: "rgba(232,185,90,0.35)",
                }}
                className = "flex-1"
              />
            </View>

            {/* <Text
              style={{
                fontSize: scale(20),
                fontWeight: "900",
                letterSpacing: scale(2.2),
                color: "#F5F5F5",
                textAlign: "center",
                textShadowColor: "rgba(232,185,90,0.14)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: scale(8),
              }}
            >
              THE ARENA
            </Text> */}
            <Text
                style={{
                  fontSize: scale(9),
                  fontWeight: "700",
                  letterSpacing: scale(0.8),
                  color: "#E8B95A",
                }}
              >
                     TALENT SPACE
              </Text>

            {/* <Text
              style={{
                marginTop: spacing(3),
                fontSize: scale(8),
                fontWeight: "600",
                letterSpacing: scale(1.2),
                color: "rgba(255,255,255,0.60)",
                textAlign: "center",
              }}
            >
                YOUR TALENT SPACE
            </Text> */}
        </View>

        <Arenas data = {userArenas} title ={"My Arenas"} />
        <Arenas data = {userFollowedArenas} title ={"My Followings"} />
    </View>
     )} 

    {/* STAGE SECTION */}
    {( userTalents.length > 0  || favouriteStages.length > 0) && (
    <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(16),
        paddingBottom: spacing(24),
        width,
      }}
      className="justify-center  items-center"   >
          
        <View
        className="items-center justify-center"
        style={{
          gap : spacing(2)
           }}  >
          <View
            className="flex-row items-center justify-center"
            style={{
              gap: spacing(8),
              marginBottom: spacing(6),
              }}   >
              <View
                style={{
                  // width: scale(18),
                  height: scale(1),
                  backgroundColor: "rgba(232,185,90,0.35)",
                }}
                className = "flex-1"
              />

              <Text
                style={{
                  fontSize: scale(20),
                  fontWeight: "900",
                  letterSpacing: scale(2.2),
                  color: "#F5F5F5",
                  textAlign: "center",
                  textShadowColor: "rgba(232,185,90,0.14)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: scale(8),
                }}
              >
                STAGES
              </Text>

              <View
                style={{
                  height: scale(1),
                  backgroundColor: "rgba(232,185,90,0.35)",
                }}
                className = "flex-1"
              />
          </View>

          <Text
              style={{
                fontSize: scale(9),
                fontWeight: "700",
                letterSpacing: scale(0.8),
                color: "#E8B95A",
              }} >
               COMPETITION SPACE
          </Text>

        </View>
        <Stages data = {userTalents} title = "My Stages" />
        <Stages data = {favouriteStages || []}  title = "My Favourites"/>
    </View>
    )}

      {/* PERFORMANCE SECTION */}
     {( allPerformances.length > 0  || spotlights.length > 0) && (
      <View
      // className="w-full"
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(16),
        paddingBottom: spacing(24),
        width,
      }}
      className="justify-center  items-center"   >
          
        <View
        className="items-center justify-center"
        style={{
          gap : spacing(2)
        }}  >
          <View
            className="flex-row items-center justify-center"
            style={{
              gap: spacing(8),
              marginBottom: spacing(6),
            }} >

            <View
              style={{
                // width: scale(18),
                height: scale(1),
                backgroundColor: "rgba(232,185,90,0.35)",
              }}
              className = "flex-1"
            />

            <Text
              style={{
                fontSize: scale(20),
                fontWeight: "900",
                letterSpacing: scale(2.2),
                color: "#F5F5F5",
                textAlign: "center",
                textShadowColor: "rgba(232,185,90,0.14)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: scale(8),
                }}  >

              SPOTLIGHTS
            </Text>

            <View
              style={{
                // width: scale(18),
                height: scale(1),
                backgroundColor: "rgba(232,185,90,0.35)",
              }}
              className = "flex-1"
            />
          </View>

          <Text
            style={{
              fontSize: scale(9),
              fontWeight: "700",
              letterSpacing: scale(0.8),
              color: "#E8B95A",
            }} >
            YOUR SPOTLIGHT
          </Text>

        </View>
        <Performances data = {allPerformances || []} title = "My Performances" />
        <Performances data = {spotlights || []}  title = "My Spotlights"/>
    </View>
     )}

    </View>
  )
}