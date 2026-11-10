import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Image, Animated } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

import ProfileHeader from '../components/viewArenas/header/profileHeader';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileTabs from '../components/profile/custom/profileTabs';
import DisplayViewArena from '../components/viewArenas/displayArena/displayViewArena';
import Friend from '../components/profile/friends/Friend';
import { countries } from '../utilities/TypeData';
import { icons } from '../constants';

import LoadingModal from '../components/modal/loadingModal';
import StageCaroussel from '../components/profile/stage/stageCaroussel';
import { getUserById, getuserFollowers, getuserFollowings, getUserFriends } from '../apiCalls/user';
import { getArenaByProfile, toggleFollowerArena, toggleStarArena } from '../apiCalls/arenas';
import { getUserTalent } from '../apiCalls/talents';
import ProfileTopBar from '../components/identityProfile/components/hero/profileTopBar';
import ProfileHero from '../components/identityProfile/components/hero/profileHero';
import ActionButtons from '../components/identityProfile/components/actionButtons/actionButtons';
import ProfileGlobalStats from '../components/identityProfile/components/stats/globalStats';
import ProfileSpace from '../components/identityProfile/components/profileSpace/profileSpace';
import { ProfileSpaceProvider } from '../components/identityProfile/components/context/ProfileSpaceContext';
import LegacyContent from '../components/identityProfile/components/profileSpace/legacy/LegacyContent';
import CircleContent from '../components/identityProfile/components/profileSpace/circle/circleContent';




export default function ProfileScreen() {
  const { profile_id , arena_id } = useLocalSearchParams();
  const { user ,globalArenaRefresh, setGlobalArenaRefresh , scale , spacing } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const {width , height} = useWindowDimensions()
  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);
  // const [totalPerformances, setTotalPerformancesa] = useState(0);
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [stages , setStages] = useState([])
  const [ready ,setReady] = useState (false)
  const[profile , setProfile] = useState()
  const HERO_HEIGHT = scale(350); 
 


  const scrollY = useRef(
    new Animated.Value(0)
  ).current;


  useEffect(() => {
    const loadProfileMaterial  = async() => {
          await  Promise.all([
                            getUserById(profile_id , setProfile),
                            getUserFriends(profile_id, setFriends),
                            getuserFollowers(profile_id, setFollowers),
                            getuserFollowings(profile_id, setFollowings),
                            getArenaByProfile(
                            profile_id,
                            { requesterId: user._id },
                            setSelectedArena,
                            setArenas,
                            arena_id
                            ),
                            getUserTalent(profile_id,setStages)
                           ])
          setReady(true)
     }
    if (!profile_id) return;
    loadProfileMaterial()
  }, []);

     

  // useEffect(() => {
  //   const loadProfileMaterial  = async() => {
  //         await  Promise.all([
  //                           getUserFriends(profile._id, setFriends),
  //                           getFollowData(profile._id, setFollowData),
  //                           getArenaByProfile(
  //                           profile._id,
  //                           { requesterId: user._id },
  //                            setSelectedArena,
  //                            setArenas,
  //                           arena_id
  //                           ) ])
  //         setGlobalArenaRefresh(false)
  //    }
  //   if (!globalArenaRefresh) return;
  //         loadProfileMaterial()
  // }, [globalArenaRefresh]);

// ---------------- DATA ----------------



  const sections = useMemo(
    () => [
      {
        id: "hero",
        type: "hero",
      },
      {
        id: "actionButtons",
        type: "actionButtons",
      },
      {
        id: "globalStats",
        type: "globalStats",
      },
      {
        id: "profileSpace",
        type: "profileSpace",
      },
      //legacy
      {
        id: "legacyOverView",
        type: "legacyOverView",
      },
      
      {
        id: "legacyTabs",
        type: "legacyTabs",
      },
      {
        id: "legacyContent",
        type: "legacyContent",
      },
      //circle
      {
        id: "circleOverView",
        type: "circleOverView",
      },
      {
        id: "circleTabs",
        type: "circleTabs",
      },
      
      {
        id: "circleContent",
        type: "circleContent",
      },
    ],
    []
  );

  const handleScroll = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: scrollY,
            },
          },
        },
      ],
      {
        useNativeDriver: true,
      
      }
    ),
    [scrollY]
  );
  
  const renderItem = 
  useCallback(
    ({ item }) => {
      switch (item.type) {
        case "hero":
          return (
            <ProfileHero
              user={profile}
              height={HERO_HEIGHT}
            />
          );

          case "actionButtons":
            return (
              <View
              style = {{
                    paddingHorizontal: spacing(12),
                    paddingTop: spacing(26),
                    gap :20
                  }}
                  className = "flex-row">
                  <ActionButtons
                    user={profile}
                  />
              </View>
            );

        case "globalStats":
          return (
            <ProfileGlobalStats 
               friendCount = {user.friendCount}
               followerCount = {user.followerCount}
               followingCount = {user.followingCount}
               arenaCount = {user.arenaCount}
             />
          );
        
        case "profileSpace":
          return (
            <ProfileSpace />
          );

        case "legacyContent":
          return <LegacyContent
          arenas = {arenas} friends={friends}  stages ={stages} profile = {profile} />;
        

        case "circleContent":
          return <CircleContent
          friends = {friends}  followers={followers}  followings = {followings}  profile = {profile} />;
          
        default:
          return null;
      }
    }
    ,
    [
      profile,
      arenas,
      stages,
      friends,
      followers,
      followings
    ]
  );

  if (!ready || !profile) {
    return <LoadingModal visible={true} text ="loading up the profile" />
  }

  return (
    <ProfileSpaceProvider>
    <View
    style = {{
      paddingBottom : insets.bottom
    }}
     className="flex-1 w-full bg-[#08090B]">

      {/* ====================================================== */}
      {/* IDENTITY CONTENT                                      */}
      {/* ====================================================== */}

      <Animated.FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{
          paddingBottom: spacing(60),
        }}
        nestedScrollEnabled = {true}
        removeClippedSubviews={false}
      />

      {/* ====================================================== */}
      {/* FLOATING TOP NAVIGATION                               */}
      {/* ====================================================== */}

      <ProfileTopBar
        user={profile}
        scrollY={scrollY}
        topInset={insets.top}
        onClose={()=> {
          router.back()
        }}
        onPress={() => setSettingsVisible(true)}
      />

      {/* <SettingsDrawer
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      /> */}

    </View>
    </ProfileSpaceProvider>
  );
}