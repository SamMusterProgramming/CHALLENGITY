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


export default function LegacyContent({
  profile, arenas , friends, stages, followers, followings
}) {
   
  const {
    activeSpace,
    activeLegacyTab,
  } = useProfileSpace();

  const {
    spacing,
    scale,
    user,
  } = useGlobalContext();

  const isSpotlight = (post) =>
    post?.globalSpotlight?.spotlight === true ||
    post?.regionalSpotlight?.spotlight === true ||
    post?.localSpotlight?.spotlight === true;

  const allPerformances = arenas.flatMap((arena) =>
    Array.isArray(arena.posts)
      ? arena.posts
      : [] 
  );

  const spotlights = arenas.flatMap((arena) =>
    Array.isArray(arena.posts)
      ? arena.posts.filter(isSpotlight)
      : []
  );

  const { width } = useWindowDimensions();

  if (activeSpace !== "legacy") {
    return null;
  }
  // switch (activeLegacyTab) {
  //   case "arenas":
  //     return <Arenas />;

  //   case "stages":
  //     return <Stages />;

  //   case "spotlights":
  //     return <Spotlights />;

  //   case "performances":
  //       return <Performances />;
  //   default:
  //     return null;
  // }
  return (
    <>

     {/* ARENA SECTION  */}
     <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(26),
        paddingBottom: spacing(24),
        width,
      }}
      className="justify-center w- full items-center"
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

        </View>

        <Arenas data = {arenas} title ={`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s Arenas`} />
        {/* <Arenas data = {userFollowedArenas} title ={"My Followings"} /> */}
    </View>


    {/* STAGE SECTION */}
    {stages.length > 0 && (
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

        <Stages profile={profile} data = {stages} title = "Stages" />
        {/* <Stages data = {FavouriteStages || []}  title = "My Favourites"/> */}
    </View>
    )}


    {(allPerformances .length > 0 || spotlights.lenght > 0) && (
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
        <Performances data = {allPerformances || []} title = {`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s Performances`} />
        <Performances data = {spotlights || []}  title = {`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s  Spotlights`}/>
    </View>
    )}

    {/* <Performances /> */}
    {/* <LegacyOverview /> */}
    </>
  )
}