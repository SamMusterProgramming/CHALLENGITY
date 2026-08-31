import { View, Text, useWindowDimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { getArenaByProfile, getFollowData, getuserFollowers, getuserFollowings, getUserFriendsData, getUserTalent, toggleFollowerArena, toggleStarArena } from '../apiCalls';
import PerformanceCard from '../components/viewArenas/performance/performanceCard';
import ProfileHeader from '../components/viewArenas/header/profileHeader';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileTabs from '../components/profile/custom/profileTabs';
import DisplayViewArena from '../components/viewArenas/displayArena/displayViewArena';
import Friend from '../components/profile/friends/Friend';
import FollowArenaButton from '../components/viewArenas/custom/followArenaButton';
import { countries } from '../utilities/TypeData';
import { icons } from '../constants';
import EmptyPostArena from '../components/profile/arena/emptyPostArena';
import EmptyPerformanceCard from '../components/viewArenas/performance/emptyPerformanceCard';
import LoadingModal from '../components/modal/loadingModal';
import StageCaroussel from '../components/profile/stage/stageCaroussel';

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
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");
  const [selectedTab, setSelectedTab] = useState("arenas");
  const [ready ,setReady] = useState (false)
  const CARD_WIDTH = (width - 30) / 2;
  const [profileStages , setProfileStages] = useState([])
  const [peopleMenuOpen, setPeopleMenuOpen] = useState(false);
  const peopleListRef = useRef(null);
  const [selectedPeople, setSelectedPeople] = useState("friends");
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    const loadProfileMaterial  = async() => {
          await  Promise.all([
                            getUserFriendsData(profile._id, setFriendData),
                            getuserFollowers(profile._id, setFollowers),
                            getuserFollowings(profile._id, setFollowings),
                            getArenaByProfile(
                            profile._id,
                            { requesterId: user._id },
                            (arena) => setSelectedArena(arena),
                            (list) => setArenas(list),
                            arena_id
                            ),
                            getUserTalent(profile._id,setProfileStages)
                           ])
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
  if(activeTab !== "people") return [] ;
  if (selectedPeople === "friends") return friendData?.friends || [];
  if (selectedPeople === "followers") return followers || [];
  return followings || [];
};

const pagedData = chunkArray(getActiveData(), 12);

  const sections = [
    { type: "header" },
    // { type: "stats" },
    // { type: "requests", data: friendRequestReceived },
    { type: "tabs" },
    { type: "friends", data: pagedData },
    { type: "arenas", data: []},
    { type: "performances", data: []},
    { type: "stages", data: []},
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
      value: followers?.length,
    },
    {
      icon: "account-plus",
      label: "Following",
      value: followings?.length,
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


  const peopleTabs = [
    {
      id: "friends",
      label: "Friends",
      icon: "people-outline",
    },
    {
      id: "followers",
      label: "Followers",
      icon: "person-add-outline",
    },
    {
      id: "followings",
      label: "Following",
      icon: "person-outline",
    },
  ];

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedPeople, activeTab]);
  
  useEffect(() => {
    setCurrentPage(0);
    peopleListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [selectedPeople]);

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
  
              // case "friends":
              //   if(selectedTab === "arenas" || selectedTab === "stages") return ; 
              //   return (
              //       <View
              //       className="b g-primary items-center justify-center"
              //       style={{
              //         width,
              //       }}
              //     >
              //    {pagedData.length > 0 && (
              //    <FlatList
              //    horizontal
              //    pagingEnabled
              //    data={pagedData}
              //    keyExtractor={(_, index) => index.toString()}
              //    showsHorizontalScrollIndicator={false}
              //    snapToInterval={width}
              //    decelerationRate="fast"
              //    nestedScrollEnabled
              //    renderItem={({ item }) => (
              //      <View
              //        style={{
              //          width,
              //          paddingHorizontal: 18,
              //          paddingTop: 18,
              //          flexDirection: "row",
              //          flexWrap: "wrap",
              //          justifyContent: "flex-start",

              //         //  alignContent: "space-between",
              //        }}
              //      >
              //        {item.map((friend, index) => (
              //          <Friend
              //            key={friend._id}
              //            friend={friend}
              //            index={index}
              //            w={width}
              //            isMe ={false}
              //          />
              //        ))}
              //      </View>
              //    )}
              //  />
              //     )}
              //     {pagedData.length == 0 && (
              //       <>
              //       <Image
              //         className="w-12 h-12"
              //         source={icons.search}
              //        /> 
              //        <Text className="text-gray-400 text-xs">Empty List</Text>
              //       </>
              //     )}
              //     </View>
              //   );

              case "friends":
                if(selectedTab === "arenas" || selectedTab === "stages") return ; 
                return (
                  <View
                  className="w-full self-center mt-4 rounded-[5px] p- 2  items-center  justify-center"
                  >   
                      <View
                        style={{
                          width: width * 0.95,
                          height: (width / 6.9) * 5.9,
                          // backgroundColor: "rgba(255,255,255,0.10)",
                          borderRadius: 10,
                          overflow: "hidden",
                        }}
                        className ="border border-gold/40"
                      >
                        {pagedData.length > 0 && (
                          <FlatList
                            horizontal
                            pagingEnabled
                            data={pagedData}
                            ref={peopleListRef}
                            keyExtractor={(_, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"
                            nestedScrollEnabled
                            onMomentumScrollEnd={(event) => {
                              const pageWidth = width * 0.95;
                              const page = Math.round(
                                event.nativeEvent.contentOffset.x / pageWidth
                              );
                              setCurrentPage(page);
                            }}
                            renderItem={({ item }) => (
                              <View
                                style={{
                                  width: width * 0.95,
                                  height: width / 6.9 * 5.9,
                                  paddingHorizontal: 8,
                                  paddingVertical: 10,
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  alignContent: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.map((friend, index) => (
                                  <View
                                    key={friend._id}
                                    style={{
                                      width: "25%",
                                      height: "33.333%",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Friend
                                      friend={friend}
                                      index={index}
                                      w={width}
                                      isMe={true}
                                    />
                                  </View>
                                ))}
                              </View>
                            )}
                          />
                        )}

                        {pagedData.length === 0 && (
                          <View
                          style={{
                            width: width * 0.95,
                            height: width / 6.9 * 5.9,
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "center",
                          }} >
                            <Image
                              className="h-12 w-12"
                              source={icons.search}
                            />
                            <Text className="text-lg text-gray-400">
                              Empty List
                            </Text>
                          </View>
                        )}
                      </View>

                      <View
                      className = "flex-row w-full justify-center gap- 2 pr-4 mt-2 ">

                          <View
                            style={{
                              position: "relative",
                              zIndex: 100,
                            }}
                            className = "flex-1"
                          >
                   
                            {peopleMenuOpen && (
                              <View
                                style={{
                                  position: "absolute",
                                  bottom: 48,
                                  left: 0,
                                  right: "40%",
                                  backgroundColor: "#111111",
                                  borderWidth: 1,
                                  borderColor: "rgba(234,179,8,0.18)",
                                  borderRadius: 14,
                                  paddingVertical: 6,
                                  shadowColor: "#000",
                                  shadowOffset: {
                                    width: 0,
                                    height: -5,
                                  },
                                  shadowOpacity: 0.35,
                                  shadowRadius: 12,
                                  elevation: 12,
                                  zIndex: 200,
                                }}
                              >
                                {peopleTabs.map((tab, index) => {
                                  const selected =
                                    selectedPeople === tab.id;

                                  return (
                                    <TouchableOpacity
                                      key={tab.id}
                                      activeOpacity={0.8}
                                      onPress={() => {
                                        setCurrentPage(0);
                                        setSelectedPeople(tab.id);
                                        setPeopleMenuOpen(false);
                                      }}
                                      style={{
                                        minHeight: 44,
                                        paddingHorizontal: 14,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: selected
                                          ? "rgba(234,179,8,0.08)"
                                          : "transparent",
                                        borderRadius: 9,
                                        marginHorizontal: 5,
                                        marginVertical: 2,
                                      }}
                                    >
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* ICON */}
                                        <Ionicons
                                          name={
                                            tab.id === "friends"
                                              ? "people-outline"
                                              : tab.id === "followers"
                                              ? "person-add-outline"
                                              : "person-outline"
                                          }
                                          size={17}
                                          color={
                                            selected
                                              ? "#EAB308"
                                              : "rgba(255,255,255,0.45)"
                                          }
                                        />

                                        <Text
                                          style={{
                                            marginLeft: 10,
                                            fontSize: width / 34,
                                            fontWeight: "800",
                                            letterSpacing: 0.7,

                                            color: selected
                                              ? "#EAB308"
                                              : "rgba(255,255,255,0.65)",
                                          }}
                                        >
                                          {tab.label.toUpperCase()}
                                        </Text>
                                      </View>

                                      {/* CHECK */}
                                      {selected && (
                                        <Ionicons
                                          name="checkmark"
                                          size={18}
                                          color="#EAB308"
                                        />
                                      )}
                                    </TouchableOpacity>
                                  );
                                })}

                                {/* =================================================
                                    ARROW INDICATOR
                                ================================================= */}

                                <View
                                  style={{
                                    position: "absolute",
                                    bottom: -7,
                                    right: 30,
                                    width: 14,
                                    height: 14,
                                    backgroundColor: "#111111",
                                    borderRightWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: "rgba(234,179,8,0.18)",
                                    transform: [
                                      {
                                        rotate: "45deg",
                                      },
                                    ],
                                  }}
                                />
                              </View>
                            )}

                            {/* =====================================================
                                SELECTED BUTTON
                            ===================================================== */}

                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() =>
                                setPeopleMenuOpen((prev) => !prev)
                              }
                              style={{
                                height: 42,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 14,
                                // backgroundColor: peopleMenuOpen
                                //   ? "rgba(234,179,8,0.10)"
                                //   : "#111111",
                                // borderWidth: 1,
                                // borderColor: peopleMenuOpen
                                //   ? "rgba(234,179,8,0.30)"
                                //   : "rgba(255,255,255,0.08)",
                                borderRadius: 12,
                              }}
                              className = "w-[50%]  "
                            >
                              {/* LEFT */}
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "end",
                                  // flex:1
                                }}  >

                                <Ionicons
                                  name={
                                    selectedPeople === "friends"
                                      ? "people-outline"
                                      : selectedPeople === "followers"
                                      ? "person-add-outline"
                                      : "person-outline"
                                  }
                                  size={15}
                                  color="#EAB308"
                                />

                                <Text
                                  style={{
                                    marginLeft: 8,
                                    fontSize: width / 32,
                                    fontWeight: "800",
                                    letterSpacing: 0.8,
                                    color: "rgba(255,255,255,0.55)",
                                  }}
                                  className = "mt-"
                                >
                                  {peopleTabs
                                    .find(
                                      (tab) =>
                                        tab.id === selectedPeople
                                    )
                                    ?.label?.toUpperCase() || "PEOPLE"}
                                </Text>

                              </View>

                              {/* RIGHT ARROW */}
                              <Ionicons
                                name={
                                  peopleMenuOpen
                                    ? "chevron-down"
                                    : "chevron-up"
                                }
                                size={22}
                                color={
                                  peopleMenuOpen
                                    ? "#EAB308"
                                    : "rgba(255,255,255,0.55)"
                                }
                                className = "mt-2"
                              />
                            </TouchableOpacity>
                          </View>



                          {pagedData.length > 1 && (
                          <View className=" gap-2 flex-row items-center justify-center mt- 4  pb -2">
                            {pagedData.map((_, index) => {
                              const isActive = index === currentPage;
                              return (
                                <View
                                  key={index}
                                  className={` rounded-full ${
                                    isActive
                                      ? "h-[8px] w-[18px] bg-yellow-500"
                                      : "h-[8px] w-[18px] bg-white/30"
                                  }`}
                                />
                              );
                            })}
                          </View>
                      )}
                      </View>
                      {/* {pagedData.length > 1 && (
                          <View className=" gap-2 flex-row items-center justify-center mt-4  pb-2">
                            {pagedData.map((_, index) => {
                              const isActive = index === currentPage;
                              return (
                                <View
                                  key={index}
                                  className={` gap -4 rounded-full ${
                                    isActive
                                      ? "h-[10px] w-[10px] bg-yellow-500"
                                      : "h-[10px] w-[10px] bg-white/30"
                                  }`}
                                />
                              );
                            })}
                          </View>
                      )} */}

                  </View>
                );
                case "arenas":
                  if(selectedTab !== "arenas") return ; 
                   return (
                     <DisplayViewArena userArenas={arenas} onPressArena={()=>{}} selectedArena={selectedArena}
                      setSelectedArena = {setSelectedArena} toggleStar = {toggleStar} toggleFollower = {toggleFollower}/>
                   )

                case "stages":
                if(selectedTab !== "stages" ) return ; 
                return  <StageCaroussel stages = {profileStages} user={profile} onPress={() => { router.back() }} />
            }
          }}
        />
    </View>
  )
}