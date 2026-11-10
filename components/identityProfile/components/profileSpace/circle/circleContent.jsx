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



export default function CircleContent({
  friends , followers , followings , profile
}) {
  const {
    activeSpace,
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
      // marginBottom: spacing(26),
    }}
    // className = "items-center justify-center "
    className= "bord er-x-[rgba(232,185,90,0.38)] self-center items-center bor der-[rgba(232,185,90,0.38)] rounded-b-3xl rounded-tr-3xl border-[1px]"  >

    {(friends.users?.length > 0 || followers.users?.length > 0 || followings.users.length > 0) && (
      <View
      style={{
        paddingHorizontal: spacing(18),
        paddingTop: spacing(36),
        // paddingBottom: spacing(32),
        width,
      }}
      className="justify-center w- full items-center"
      >

      <View
        className="items-start justify-center"
        style={{
          // width: "100%",
          // marginBottom: spacing(10),
          gap: spacing(2),
        }}  >

        <View
          className="flex-row items-center justify-center"
          style={{
            gap: spacing(8),
            marginBottom: spacing(12),
          }}  >

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
                CIRCLE SPACE
            </Text>
        </View>
      </View>

         <Friends data = {friends.users} title = {`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s Friends`}/>
         <Friends data = {followers.users} title ={`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s  Followers`}/>
         <Friends data = {followings.users} title ={`${profile.name?.trim().split(/\s+/)[0] ?? ""}'s Followings`}/>
    </View>
  )}

{/* 
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
          }} >
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
            }}
          >
             FELLOWS
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
              fontWeight: "700",
              letterSpacing: scale(0.8),
              color: "#E8B95A",
            }}
          >
          YOUR CONNECTION
        </Text>
      </View>

      <Friends data = {followers.users} title ="My Followers"/>
      <Friends data = {followings.users} title ="My Followers"/>

    </View> */}

    {/* <CircleOverview /> */}
    </View>
  )
}
