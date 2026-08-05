import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { getArenaByProfile, getFollowData, getUserFriendsData, toggleFollowerArena, toggleStarArena } from '../apiCalls';
import PerformanceCard from '../components/viewArenas/performance/performanceCard';
import ProfileHeader from '../components/viewArenas/header/profileHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileTabs from '../components/profile/custom/profileTabs';
import DisplayViewArena from '../components/viewArenas/displayArena/displayViewArena';
import Friend from '../components/profile/friends/Friend';
import FollowArenaButton from '../components/viewArenas/custom/followArenaButton';
import { countries } from '../utilities/TypeData';
import { icons } from '../constants';
import EmptyPostArena from '../components/profile/arena/emptyPostArena';
import EmptyPerformanceCard from '../components/viewArenas/performance/emptyPerformanceCard';
import LoadingModal from '../components/modal/loadingModal';

const chunkArray = (arr = [], size = 6) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

export default function ProfileScreen() {
  const { userProfile, arena_id } = useLocalSearchParams();
  const { user ,globalArenaRefresh, setGlobalArenaRefresh  } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const {width , height} = useWindowDimensions()
  const profile = userProfile ? JSON.parse(userProfile) : null;
  const [arenas, setArenas] = useState([]);
  const [selectedArena, setSelectedArena] = useState(null);
  // const [totalPerformances, setTotalPerformancesa] = useState(0);
  const [friendData, setFriendData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");
  const [selectedTab, setSelectedTab] = useState("arenas");
  const [ready ,setReady] = useState (false)
  const CARD_WIDTH = (width - 30) / 2;


  useEffect(() => {
    const loadProfileMaterial  = async() => {
          await  Promise.all([
                            getUserFriendsData(profile._id, setFriendData),
                            getFollowData(profile._id, setFollowData),
                            getArenaByProfile(
                            profile._id,
                            { requesterId: user._id },
                            (arena) => setSelectedArena(arena),
                            (list) => setArenas(list),
                            arena_id
                            ) ])
          setReady(true)
     }
    if (!profile?._id) return;
    loadProfileMaterial()
  }, []);

  useEffect(() => {
    const loadProfileMaterial  = async() => {
          await  Promise.all([
                            getUserFriendsData(profile._id, setFriendData),
                            getFollowData(profile._id, setFollowData),
                            getArenaByProfile(
                            profile._id,
                            { requesterId: user._id },
                             setSelectedArena,
                             setArenas,
                            arena_id
                            ) ])
          setGlobalArenaRefresh(false)
     }
    if (!globalArenaRefresh) return;
          loadProfileMaterial()
  }, [globalArenaRefresh]);

// ---------------- DATA ----------------
const getActiveData = () => {
  if (activeTab === "friends") return friendData?.friends || [];
  if (activeTab === "followers") return followData?.followers || [];
  return followData?.followings || [];
};

const pagedData = chunkArray(getActiveData(), 20);
  const sections = [
    { type: "header" },
    // { type: "stats" },
    // { type: "requests", data: friendRequestReceived },
    { type: "tabs" },
    { type: "friends", data: pagedData },
    { type: "arenas", data: []},
    { type: "performances", data: []},
  ];

  const statData = [
    
    {
      icon: "stadium",
      label: "Arenas",
      value: arenas.length,
    },
    {
      icon: "account-group",
      label: "Friends",
      value: friendData?.friends?.length,
    },
    {
      icon: "heart",
      label: "Followers",
      value: followData?.followers?.length,
    },
    {
      icon: "account-plus",
      label: "Following",
      value: followData?.followings?.length,
    }
  
  ];

  // actions 
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
      userName : user.name
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
      userName: user.name
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
        item = {item}
        index={index}
        CARD_WIDTH={CARD_WIDTH}
        playPerformance = {playPerformance}
        performanceCount={performances.length}

      />
  };

  // variables
  const isStarred = selectedArena?.isStarred || false;
  const isFollowed = selectedArena?.isFollower || false;
  const country =
  countries.find(
  c=>c.code === selectedArena?.region 
  ) || "US";

  if (!ready) {
    return <LoadingModal visible={true} text ="loading up the profile" />
    //  <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor:"#000" , 
     paddingTop: insets.top
      }}>

           <View 
           style ={{
            marginTop : insets.top
           }}
           className="pl-2 py- 2 absolute z-50 top-2 16 left-0 rig ht-0 w- full flex-row justify-between items-center bg -black/50 border-white /5">
              {/* <Text 
                style ={{
                  color :"#eab308",
                  fontSize: width / 28,
                  fontWeight : "800"
                }}
                className="text-white">
                   Profile
              </Text> */}
              <TouchableOpacity 
              className ="p-1 px- 4 b g-white bg-black/50 rounded-full justify-center items-center"
              onPress={() =>{
                  router.back()
                }}  >
                <MaterialCommunityIcons
                    name="chevron-left"
                    size={30}
                    color="#fff"
                />
              </TouchableOpacity>
          </View>

          {/* MAIN LIST */}
          <FlatList
          data={sections}
          keyExtractor={(item, i) => item.type + i}
        //   extraData={refreshing}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => {
            switch (item.type) {
  
              case "header":
                return (
                  <ProfileHeader user = {profile}  statData = {statData}  />
                );
            
              case "tabs":
                return (
                  <ProfileTabs selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} setActiveTab={setActiveTab} 
                  // setOpenArenaAlertModal ={setOpenArenaAlertModal}  setArenaActionModal ={setArenaActionModal}
                   />
                );
  
              case "friends":
                if(selectedTab === "arenas" || selectedTab === "stages") return ; 
                return (
                    <View
                    className="b g-primary items-center justify-center"
                    style={{
                      width,
                      // height: width * 2 / 3 + 0,
                    //   flexDirection: "row",
                    //   flexWrap: "col",
                    //   justifyContent: "center",
                    //   padding: 12,
                    }}
                  >
                 {pagedData.length > 0 && (
                 <FlatList
                 horizontal
                 pagingEnabled
                 data={pagedData}
                 keyExtractor={(_, index) => index.toString()}
                 showsHorizontalScrollIndicator={false}
                 snapToInterval={width}
                 decelerationRate="fast"
                 nestedScrollEnabled
                 renderItem={({ item }) => (
                   <View
                     style={{
                       width,
                       paddingHorizontal: 18,
                       paddingTop: 18,
                       flexDirection: "row",
                       flexWrap: "wrap",
                       justifyContent: "flex-start",

                      //  alignContent: "space-between",
                     }}
                   >
                     {item.map((friend, index) => (
                       <Friend
                         key={friend._id}
                         friend={friend}
                         index={index}
                         w={width}
                         isMe ={false}
                       />
                     ))}
                   </View>
                 )}
               />
                  )}
                  {pagedData.length == 0 && (
                    <>
                    <Image
                      className="w-12 h-12"
                      source={icons.search}
                     /> 
                     <Text className="text-gray-400 text-xs">Empty List</Text>
                    </>
                  )}
                  </View>
                );
                case "arenas":
                  if(selectedTab !== "arenas") return ; 
                   return (
                     <DisplayViewArena userArenas={arenas} onPressArena={()=>{}} selectedArena={selectedArena}
                      setSelectedArena = {setSelectedArena} toggleStar = {toggleStar} toggleFollower = {toggleFollower}/>
                   )

                case "performances":
                  if(!selectedArena || selectedTab !== "arenas" ) return ; 

                  if(selectedArena.posts.length == 0) 
                    return (
                    <>
                  
                    <EmptyPerformanceCard width ={width} />
                    </>
                  )

                  return (
                    <>
                   
                    <FlatList
                    data={selectedArena.posts}
                    keyExtractor={(item) => item._id}
                    extraData={selectedArena}
                    numColumns={2}
                    renderItem={renderPerformance}
                    contentContainerStyle={{
                      // paddingHorizontal: 16,
                      paddingBottom: 40,
                      marginTop: 80,
                    }}
                    columnWrapperStyle={{
                      justifyContent: "center",
                      marginBottom: 8,
                      gap :8
                    }}
                  />
                   <View
                        className ="flex-row w-full justify-start items-center gap-2">
                              <FollowArenaButton width={width} onPress = {toggleFollower} isFollowed={selectedArena.isFollower} />
                  </View>
                  </>
                  )

            }
          }}
        />

      
    </View>
  )
}