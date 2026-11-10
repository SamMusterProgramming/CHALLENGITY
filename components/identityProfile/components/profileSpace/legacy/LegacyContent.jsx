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
    <View
    style={{
      width: "100%",
      paddingHorizontal: spacing(10),
      // marginBottom: spacing(26),
    }}
    // className = "items-center justify-center "
    className= "bor der-x-[rgba(232,185,90,0.38)] self-center items-center b order -[rgba(232,185,90,0.38)] rounded-b-3xl rounded-tr-3xl border-[1px]"  >




     {/* ARENA SECTION  */}
     {(arenas.length > 0 ) && (
      <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(36),
        paddingBottom: spacing(32),
        width,
      }}
      className="justify-center self-center w- full items-center"
     >
        <View
          className="items-start justify-center"
          style={{
            gap : spacing(2)
          }}  >

            <View
              className="flex-row text-start w-full items-center justify-start"
              style={{
                gap: spacing(8),
                marginBottom: spacing(12),
              }}   >

                <Text
                  style={{
                    fontSize: scale(18),
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

            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              }} >
              <View
                style={{
                  width: scale(18),
                  height: 1,
                  backgroundColor: "#E8B95A",
                  marginRight: spacing(8),
                }}
              />

              <Text
                style={{
                  color: "#E8B95A",
                  fontSize: scale(9),
                  fontWeight: "900",
                  letterSpacing: scale(2),
                }}
              >
                TALENT SPACE
              </Text>
            </View>

        </View>

        <Arenas data = {arenas} title ={`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s Arenas`} />
        {/* <Arenas data = {userFollowedArenas} title ={"My Followings"} /> */}
    </View>
    )}


    {/* STAGE SECTION */}
    {stages.length > 0 && (
    <View
    style={{
      paddingHorizontal: spacing(18),
      // paddingTop: spacing(36),
      paddingBottom: spacing(32),
      width,
    }}
    className="justify-center self-center w- full items-center"
     >
          
        <View
        className="items-start justify-center"
        style={{
          gap : spacing(2)
           }}  >
          <View
              className="flex-row text-start w-full items-center justify-start"
              style={{
                gap: spacing(8),
                marginBottom: spacing(12),
              }}   >
             

              <Text
                style={{
                  fontSize: scale(18),
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              }} >
              <View
                style={{
                  width: scale(18),
                  height: 1,
                  backgroundColor: "#E8B95A",
                  marginRight: spacing(8),
                }}
              />

              <Text
                style={{
                  color: "#E8B95A",
                  fontSize: scale(9),
                  fontWeight: "900",
                  letterSpacing: scale(2),
                }}
              >
                 COMPETITION SPACE
              </Text>
            </View>

        </View>

        <Stages profile={profile} data = {stages} title = "Stages" />
        {/* <Stages data = {FavouriteStages || []}  title = "My Favourites"/> */}
    </View>
    )}


    {(allPerformances .length > 0 || spotlights.lenght > 0) && (
    <View
      style={{
        paddingHorizontal: spacing(18),
        // paddingTop: spacing(36),
        // paddingBottom: spacing(32),
        width,
      }}
      className="justify-center  items-center"   >
          
        <View
        className="items-start justify-center"
        style={{
          gap : spacing(2)
        }}  >
          <View
            className="flex-row items-center justify-center"
            style={{
              gap: spacing(8),
              marginBottom: spacing(12),
            }} >

            <Text
              style={{
                fontSize: scale(18),
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
          
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              }} >
              <View
                style={{
                  width: scale(18),
                  height: 1,
                  backgroundColor: "#E8B95A",
                  marginRight: spacing(8),
                }}
              />

              <Text
                style={{
                  color: "#E8B95A",
                  fontSize: scale(9),
                  fontWeight: "900",
                  letterSpacing: scale(2),
                }}
              >
                 PERFORMANCE SPACE
              </Text>
            </View>

        </View>
        <Performances data = {allPerformances || []} title = {`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s Performances`} />
        <Performances data = {spotlights || []}  title = {`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s  Spotlights`}/>
    </View>
    )}

    {/* <Performances /> */}
    {/* <LegacyOverview /> */}
    </View>
  )
}