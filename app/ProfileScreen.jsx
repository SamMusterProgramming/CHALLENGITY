import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { getArenaByProfile, getFollowData, getUserFriendsData } from '../apiCalls';
import PerformanceCard from '../components/viewArenas/performance/performanceCard';

const chunkArray = (arr = [], size = 6) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

export default function ProfileScreen() {
  const { userProfile, arena_id } = useLocalSearchParams();
  const { user } = useGlobalContext();
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
     }
    if (!profile?._id) return;
    loadProfileMaterial()
  }, []);

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
    // { type: "tabs" },
    // { type: "friends", data: pagedData },
    // { type: "arenas", data: []},
    // { type: "performances", data: []},
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
    <View style={{ flex: 1, backgroundColor:"#000" , paddingTop: insets.top }}>
          {/* MAIN LIST */}
          <FlatList
          data={sections}
          keyExtractor={(item, i) => item.type + i}
        //   extraData={refreshing}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => {
  
            switch (item.type) {
  
              case "header":
                return (
                  <ProfileHeader user = {user}  statData = {statData}  />
                );
            
              case "requests":
                 return ( 
                    <>
                     {friendRequestReceived?.length > 0 && (
                        <View
                        style={{
                            width: "100%",
                            marginTop: 24,
                        }}   >
                        <FlatList
                            horizontal
                            data={friendRequestReceived}
                            keyExtractor={(item) => item._id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                            }}
                            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        width: width * 0.70,
                                        // minHeight: 108,
                                        borderRadius: 18,
                                        backgroundColor: "#111214",
                                        borderWidth: 1,
                                        borderColor: "rgba(234,179,8,.15)",
                                        padding: 14,
                                    }}  >
                                    {/* Top */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}  >
                                        <Image
                                            source={{ uri: item.presentation.image }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 28,
                                                borderWidth: 2,
                                                borderColor: "#eab308",
                                            }}
                                        />
                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: 12,
                                            }}
                                            className = "flex-col justify-start  "
                                          >
                                            <View>
                                              <Text
                                                  numberOfLines={1}
                                                  style={{
                                                      color: "#FFF",
                                                      fontSize: width / 32,
                                                      fontWeight: "700",
                                                  }}  >
                                                  {item.metadata.sender_name}
                                              </Text>
                                            </View>
                                            <View>
                                              <Text
                                                  numberOfLines={2}
                                                  style={{
                                                      marginTop: 4,
                                                      color: "rgba(255,255,255,.65)",
                                                      fontSize: width / 36,
                                                      lineHeight: 18,
                                                  }}  >
                                                  {item.presentation.text}
                                              </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Actions */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            marginTop: 14,
                                            width :"100%"
                                        }}
                                        className = "px-2 gap-2"
                                    >
                                        {!item.isRead &&
                                            item.type !== "friends" && (
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    onPress={() => acceptFRequest(item)}
                                                    style={{
                                                        width : "50%" ,
                                                        paddingHorizontal: 18,
                                                        borderRadius: 5,
                                                        backgroundColor: "#eab308",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginRight: 10,
                                                    }}
                                                    className = "py-2"
                                                >
                                                    <Text
                                                        style={{
                                                            color: "#111214",
                                                            fontWeight: "700",
                                                            fontSize: width / 38,
                                                        }}
                                                    >
                                                        Accept
                                                    </Text>
                                                </TouchableOpacity>
                                            )}

                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                if (item.type === "friend request")
                                                    denyFriendRequest(item);
                                                else deleteNotification(item);
                                            }}
                                            style={{
                                                width : "50%" ,
                                                paddingHorizontal: 18,
                                                borderRadius: 5,
                                                backgroundColor: "rgba(255,255,255,.04)",
                                                borderWidth: 1,
                                                borderColor: "rgba(255,255,255,.08)",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "#FFF",
                                                    fontWeight: "700",
                                                    fontSize: width / 38,
                                                }}
                                            >
                                                {item.type === "friends"
                                                    ? "Delete"
                                                    : "Decline"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                         )} 
                    </> )
  
              case "tabs":
                return (
                  <ProfileTabs selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} setActiveTab={setActiveTab} 
                  setOpenArenaAlertModal ={setOpenArenaAlertModal}  setArenaActionModal ={setArenaActionModal} />
                );
  
              case "friends":
                if(selectedTab === "arenas" || selectedTab === "stages") return ; 
                return (
                    <View
                    className="b g-primary items-center justify-center"
                    style={{
                      width,
                      height: width * 2 / 3 + 0,
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
                     <ArenaDisplayer userArenas={userArenas} onPressArena={()=>{}} selectedArena={selectedArena}
                      setSelectedArena = {setSelectedArena} setOpenEditArenaModal = {setOpenEditArenaModal}/>
                   )

                case "performances":
                  if(!selectedArena || selectedTab !== "arenas" ) return ; 
                  
                  if(!selectedArena.posts) 
                    return (
                    <>
                      <WelcomeToCreateArena  setOpenArenaAlertModal={setOpenArenaAlertModal} setArenaActionModal={setArenaActionModal}
                      />
                    </>
                  )

                  if(selectedArena.posts.length == 0) 
                    return (
                    <>
                    <TouchableOpacity
                          activeOpacity={0.85}
                          // onPress={onUploadPerformance}
                    
                          onPress={() => {
                            setArenaActionModal("create_performance")
                            setOpenArenaAlertModal(true)
                          }}
                          style={{
                            marginHorizontal: 12,
                            marginTop: 20,
                            marginBottom: 30,
                            // height: 62,
                            borderRadius: 12,
                            backgroundColor:
                              "#eab308",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className = "py-4"   >
                        

                        {uploadPerformanceLoading ? (
                          <View
                          style={{
                              flexDirection: "row",
                              alignItems: "center",
                          }}
                          >
                          <ActivityIndicator
                              size="small"
                              color="#000"
                          />
                          <Text
                              style={{
                              color: "#000",
                              fontWeight: "800",
                              marginLeft: 10,
                              // letterSpacing: 1,
                              fontSize: width / 32,
                              }}
                          >
                              UPLOADING...
                          </Text>
                          </View>
                          ) : (
                          <Text
                          style={{
                            color: "#000",
                            fontWeight: "800",
                            fontSize: width / 32,
                          }}
                        >
                          Add Performance
                        </Text>
                      )}
                    </TouchableOpacity>
                    <EmptyPostArena width ={width} />
                    </>
                  )

                  return (
                    <>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setArenaActionModal("create_performance")
                        setOpenArenaAlertModal(true)
                      }}
                      style={{
                        marginHorizontal: 12,
                        marginTop: 20,
                        marginBottom: 30,
                        // height: 62,
                        borderRadius: 12,
                        backgroundColor:
                          "#eab308",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className = "py-4"   >
                      {uploadPerformanceLoading ? (
                          <View
                          style={{
                              flexDirection: "row",
                              alignItems: "center",
                          }}
                          >
                          <ActivityIndicator
                              size="small"
                              color="#000"
                          />

                          <Text
                              style={{
                              color: "#000",
                              fontWeight: "800",
                              marginLeft: 10,
                              // letterSpacing: 1,
                              fontSize: width / 32,
                              }}
                          >
                              UPLOADING...
                          </Text>
                          </View>
                          ) : (
                          <Text
                          style={{
                            color: "#000",
                            fontWeight: "800",
                            fontSize: width / 32,
                          }}
                        >
                          Add Performance
                        </Text>
                      )}
                    </TouchableOpacity>
                    
                    <FlatList
                    data={selectedArena.posts}
                    keyExtractor={(item) => item._id}
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
                  </>
                  )

            }
          }}
        />
    </View>
  )
}