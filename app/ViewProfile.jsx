
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useGlobalContext } from "../context/GlobalProvider";
import { getArenaByProfile, toggleFollowerArena, toggleStarArena } from "../apiCalls";
import { ViewArenaHeader } from "../components/viewArenas/viewArenaHeader";
import FriendButton from "../components/custom/FriendButton";
import FollowButton from "../components/custom/FollowButton";
import ProfileHeader from "../components/viewArenas/header/profileHeader";
import PerformanceCard from "../components/viewArenas/performance/performanceCard";


export default function ViewProfile() {
  const { userProfile, arena_id } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const {width , height} = useWindowDimensions()
  const profile = userProfile ? JSON.parse(userProfile) : null;
  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);
  // const [totalPerformances, setTotalPerformancesa] = useState(0);

  const CARD_WIDTH = (width - 30) / 2;


  useEffect(() => {
    if (!profile?._id) return;
    getArenaByProfile(
      profile._id,
      { requesterId: user._id },
      (arena) => setSelectedArena(arena),
      (list) => setArenas(list),
      arena_id
    );
  }, []);

  const totalStat = useMemo(() => {
    let totalP = 0
    let totalF = 0
    arenas.map( a => {
       totalP = totalP + a.postCount
       totalF = totalF + a.followerCount
    })
    return {
      totalPerformances : totalP ,
      totalFollowers : totalF
    }; 
  }, [arenas]);

  const performances = useMemo(() => {
    return selectedArena?.posts || [];
  }, [selectedArena]);

  const toggleStar = async () => {
    if (!selectedArena) return;

    const response = await toggleStarArena({
      arenaId: selectedArena._id,
      userId: user._id,
    });
    const updated = {
      ...response,
      isFollower: selectedArena.isFollower,
    }
    setSelectedArena({
      ...updated,
      isFollower: selectedArena.isFollower,
    });
    setArenas(prev =>
      prev.map(a =>
        a._id.toString() === updated._id.toString()
          ? updated
          : a
      )
    );
  };

  const toggleFollower = async () => {
    if (!selectedArena) return;
    const response = await toggleFollowerArena({
      arenaId: selectedArena._id,
      userId: user._id,
    });
    const updated = {
      ...response,
      isStarred: selectedArena.isStarred,
    }
    setSelectedArena({
      ...updated,
      isStarred: selectedArena.isStarred,
    });
    setArenas(prev =>
      prev.map(a =>
        a._id.toString() === updated._id.toString()
          ? updated
          : a
      )
    );
  };

  const playPerformance = (item) => {
    let posts = []
    performances.map( p => {
      let post = {...p, arenaName :selectedArena.arenaName ,
        talentType : selectedArena.talentType ,
        region : selectedArena.region ,
        profileImage : selectedArena.profileImage
      }  
      posts.push(post)    
    })
    const updatedPosts = [
        posts.find(p => p._id.toString() === item._id.toString()),
        ...posts.filter(p => p._id.toString() !== item._id.toString()),
      ];
    router.push({
      pathname: "/arenaPerformancePlayer",
      params: {
        selectedPostId: item._id,
        arenaPosts: JSON.stringify(updatedPosts),
        arena: JSON.stringify(selectedArena),
      },
    });
  }

  const renderPerformance = ( {item , index } ) => {
    return  <PerformanceCard 
        item={item}
        index={index}
        CARD_WIDTH={CARD_WIDTH}
        playPerformance = {playPerformance}
        performanceCount={performances.length}
      />
  };

  if (!selectedArena) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor:"#111214" , paddingTop: insets.top }}>

      <FlatList
        data={performances}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={renderPerformance}
        contentContainerStyle={{
          // paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          marginBottom: 8,
          gap :8
        }}
        ListHeaderComponent={
          <>
            <ProfileHeader
              profile={profile}
              user={user}
              width={width}
              arenaCount = {arenas.length}
              totalStat = {totalStat}
              onFollow={() => {}}
              onFriend={() => {}}
            />

            <ViewArenaHeader
              arenas={arenas}
              selectedArena={selectedArena}
              setSelectedArena={setSelectedArena}
              toggleStar={toggleStar}
              toggleFollower={toggleFollower}
            />
          </>
        }
      />
    </View>
  );
}