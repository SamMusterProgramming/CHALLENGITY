import React from "react";
import {
  useProfileSpace,
} from "../../context/ProfileSpaceContext";
import Friends from "./friend/friends";
import Requests from "./request/requests";
import CircleOverview from "./circleOverview";
import Follows from "./follow/follows";
import { Text, useWindowDimensions, View } from "react-native";
import { useGlobalContext } from "../../../../../context/GlobalProvider";
import CircleBuilder from "./circleBuilder";



export default function CircleContent() {
  const {
    activeSpace,
    activeCircleTab,
  } = useProfileSpace();

  const {
    userFriends,
    userFollowers,
    userFollowings,
    userFriendRequestsReceived ,
    spacing,
    scale,
    user,
  } = useGlobalContext();

  const { width } = useWindowDimensions();


  if (activeSpace !== "circle") {
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
  className= "bord er-x-[rgba(232,185,90,0.38)] self-center items-center bor der-[rgba(232,185,90,0.38)] rounded-b-3xl rounded-tr-3xl border-[1px]"  >

    <CircleBuilder  />

    {(userFriends.users.length > 0 || userFollowers.users.length > 0 || userFollowings.users.length > 0 ) && (
    <View
      style={{
        paddingHorizontal: spacing(18),
        // paddingTop: spacing(26),
        paddingBottom: spacing(32),
        width,
      }}
      className="justify-center w- full items-center"
       >


      <View
        className="items-start justify-start"
        style={{
          // width: "100%",
          // marginBottom: spacing(10),
          gap: spacing(2),
        }}  >

        <View
          className="flex-row items-center justify-center"
          style={{
            gap: spacing(8),
            // marginBottom: spacing(12),
          }}
        >
      
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
            PEOPLE
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

         <Friends data = {userFriends.users} title ="My Friends" textHeader = {`INNER CIRCLE`} 
         description1={'Stay connected with the people who share your journey. Discover their latest milestones and celebrate the moments that make every connection meaningful.'}/>
        
         <Friends data = {userFollowers.users} title ="My Followers" textHeader ={`JOURNEY FOLLOWERS`}
         description1={`the people keeping up with your performances, following your competitive milestones, and watching your talent evolve.`} />
        
         <Friends data = {userFollowings.users} title ="My Followings" textHeader = {`FOLLOWING JOURNEYS`}
         description1={`Keep track of the talent you follow, discover their latest performances, and follow their achievements, competition milestones, and growth along the way.`}/>
    </View>
    )}


    {userFriendRequestsReceived?.users.length > 0 && (
    <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(26),
        paddingBottom: spacing(12),
        width,
      }}
      className="justify-center w- full items-center"
       >

      <View
        className="items-center justify-center"
        style={{
          // width: "100%",
          // marginBottom: spacing(10),
          gap: spacing(2),
        }}  >

        <View
          className="flex-row items-center justify-center"
          style={{
            gap: spacing(8),
            marginBottom: spacing(6),
          }}
        >
          <View
            style={{
              // width: scale(18),
              height: scale(1),
              backgroundColor: "rgba(232,185,90,0.55)",
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
            REQUESTS
          </Text>

          <View
            style={{
              // width: scale(18),
              height: scale(1),
              backgroundColor: "rgba(232,185,90,0.55)",
            }}
            className = "flex-1"
          />
        </View>

        <Text
            style={{
              fontSize: scale(9),
              fontWeight: "800",
              letterSpacing: scale(0.8),
              color: "#E8B95A",
            }}
          >
            REQUESTS
        </Text>

  
      </View>
         <Requests data = {userFriendRequestsReceived?.users || [] } title ="Received Requests"/>
         {/* <Friends data = {userFollowings} title ="My Followers"/> */}
    </View>
    )}
    {/* <Requests /> */}
    {/* <CircleOverview /> */}
    </View>
  )
}
