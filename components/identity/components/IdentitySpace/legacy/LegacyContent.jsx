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
      marginBottom: spacing(26),
    }}
    // className = "items-center justify-center "
    className= "bor der-x-[rgba(232,185,90,0.38)] self-center items-center b order -[rgba(232,185,90,0.38)] rounded-b-3xl rounded-tr-3xl border-[1px]"  >


    <LegacyBuilder  />

    {/* ARENA SECTION  */}
    {(userArenas.length > 0 || userFollowedArenas.length > 0) && (
    <View
      style={{
        paddingHorizontal: spacing(12),
        // paddingTop: spacing(16),
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

        </View>

        <Arenas data = {userArenas} title = {"My Arenas"} textHeader = {"TALENT SPACE"}
         description1 = {`Your personal space for every arena you create. Each arena holds its own `} 
         description2 = {`, track your progress and follow your journey, and see how your talent evolves over time.`} />
         
         
        <Arenas data = {userFollowedArenas} title ={"My Followings"} textHeader = {"FOLLOWING ARENAS"}
         description1 = {`Stay connected to the arenas that inspire you. Explore the spaces you follow, discover new `} 
         description2 = {`, and keep up with the latest talent, milestones, and updates.`}/>
    </View>
     )} 

    {/* STAGE SECTION */}
    {( userTalents.length > 0  || favouriteStages.length > 0) && (
    <View
      style={{
        paddingHorizontal: spacing(12),
        // paddingTop: spacing(16),
        paddingBottom: spacing(32),
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

        </View>

        <Stages data = {userTalents} title = "My Stages" textHeader = {"COMPETITION SPACE"} 
        description1={`Your journey on every stage, all in one place. Revisit the competitions you've been part of, relive your `} 
        description2={` , track your rankings, and see how far you've progressed.`}/>
        
        <Stages data = {favouriteStages || []}  title = "My Favourites"  textHeader = {"FAVOURITE COMPETITIONS"} 
        description1={`Revisit your favourite stages, relive unforgettable moments, and stay connected to the talent you love. Discover new `} 
        description2={` , support your favourites, and make your voice count with every vote.`}/>
    </View>
    )}

      {/* PERFORMANCE SECTION */}
     {( allPerformances.length > 0  || spotlights.length > 0) && (
      <View
      // className="w-full"
      style={{
        paddingHorizontal: spacing(12),
        // paddingTop: spacing(16),
        paddingBottom: spacing(32),
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
        </View>

        <Performances data = {allPerformances || []} title = "My Performances" textHeader = {"PERFORMANCE HUB"} 
        description1={` Every performance, all in one place. Revisit your moments across all arenas, track your progress, and see how your talent evolves with every `} 
        description2={``}/>

        <Performances data = {spotlights || []}  title = "My Spotlights" textHeader={`SPOTLIGHT ACHIEVEMENTS`}
        description1={`Your talent is reaching new heights. Discover the `}
        description2={` earning the spotlight, celebrate and connect with the growing audience following your journey.`}/>
    </View>
     )}

    </View>
  )
}