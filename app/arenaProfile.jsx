import { View, FlatList, useWindowDimensions, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  createArenaByUser,
  deleteArenaByUser,
  deleteArenaPost,
  getArenaById,
  getArenaByUser,
  getUserById,
  toggleFollowerArena,
  toggleStarArena,
  updateArenaByUser,
} from '../apiCalls';
import { useGlobalContext } from '../context/GlobalProvider';
// import ArenaSelector from '../arena/ArenaSelector';
// import ArenaPost from '../arena/arenaPost';
import { router, useLocalSearchParams } from 'expo-router';
import { useLoading } from '../context/loadingContext';
import { getCompletedUploads, isUploadQueueBusy, removeUploadJob, subscribeToUploadQueue, UPLOAD_TYPE } from '../services/uploads';
import Header from '../components/arenaProfile/header/header';
import ArenaAlertModal from '../components/arena/modals/AlertArenaModal';
import Displayer from '../components/arenaProfile/performance/displayer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function ArenaPage() {

  const {
    user,
    arenaActionModal,
    uploadPerformanceLoading,
    setUploadPerformanceLoading,
    openArenaAlertModal,
    setOpenArenaAlertModal,
    globalArenaRefresh,
    setGlobalArenaRefresh,
    setUserArenas,
    scale
  } = useGlobalContext();

  const { showLoading, hideLoading } = useLoading();


  const [arenaPosts, setArenaPosts] = useState([]);
  const [showMenuPostId, setShowMenuPostId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [postToDeleteId, setPostToDeleteId] = useState(null);
  const [playerPosts, setPlayerPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const[selectedArena , setSelectedArena] = useState(null)
  const [isMe , setIsMe] = useState(false)
  const { arena_id } =  useLocalSearchParams(); 
  const {width , height} = useWindowDimensions()
  const [headerBlack, setHeaderBlack] = useState(false);
  const THRESHOLD = height/12;
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [profile , setProfile] = useState(null)


  const handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y >= THRESHOLD && !headerBlack) {
      setHeaderBlack(true);
    } else if (y < THRESHOLD && headerBlack) {
      setHeaderBlack(false);
    }
  }

  useEffect(() => {
    const loadArena = async() =>{
      const data =  await getArenaById(user._id , arena_id)
      setSelectedArena(data)
      setIsMe(data.owner_id === user._id)
    }
    loadArena()
  }, [])


  useEffect(() => {
    const getData = async () => {
      if (!selectedArena) return;
      setArenaPosts(selectedArena.posts);
    };
    getData();
  }, [selectedArena]);


  useEffect(() => {
    if (!selectedPost || !selectedArena) return;
    const posts = selectedArena.posts;
    let refactoredPosts = [];
    posts.map((p) => {
      const post = {
        ...p,
        arenaName: selectedArena.arenaName,
        talentType: selectedArena.talentType,
        region: selectedArena.region,
        profileImage: selectedArena.profileImage,
      };
      refactoredPosts.push(post);
    });
    const updatedPosts = [
      refactoredPosts.find(
        (p) => p._id.toString() === selectedPost._id.toString()
      ),
      ...refactoredPosts.filter(
        (p) => p._id.toString() !== selectedPost._id.toString()
      ),
    ];
    setPlayerPosts(updatedPosts);
  }, [selectedPost]);



  useEffect(() => {
    if (!selectedPost) return;
    router.push({
      pathname: "/arenaPerformancePlayer",
      params: {
        selectedPostId: selectedPost._id,
        arenaPosts: JSON.stringify(playerPosts),
        arena: JSON.stringify([]),
      },
    });
  }, [playerPosts]);

  const onRefresh = async () => {
    showLoading("Refreshing ...");

    try {
      setRefreshing(true);
      await getArenaByUser(
        user._id,
        setSelectedArena,
        setUserArenas,
        selectedArena._id
      );
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      hideLoading();
    }
  };

  useEffect(() => {
    if (!globalArenaRefresh) return;
    onRefresh();
    setGlobalArenaRefresh(false);
  }, [globalArenaRefresh]);

 
    //actions   
    const toggleFollower = async () => {
        if (!selectedArena) return;
        const response = await toggleFollowerArena({
        arenaId: selectedArena._id,
        userId: user._id,
        userName: user.name,
        });
        const updated = {
        ...response,
        isStarred: selectedArena.isStarred,
        }
        setSelectedArena({
        ...updated,
        isStarred: selectedArena.isStarred,
        });
     
    };

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
      };

    const loadProfile = async(owner_id)=> {
        if(!owner_id) return ;
      await getUserById(owner_id , setProfile)
    }

    useEffect(() => {
      if(!profile) return ;
      router.push({
          pathname: "/ProfileScreen",
          params: {
            userProfile: JSON.stringify(
              profile
            ),
            arena_id : selectedArena._id
          },
      });
    }, [profile])

    //action for alert modal 

    const handleDeleteArena = async() => {
        const data = await deleteArenaByUser(selectedArena._id , {userId:user._id})
        setUserArenas(data.arenas)
        setSelectedArena(data.selectedArena)
      }
      
    const createPerformance = ()=>{
              router.push({
              pathname: "/CreatePerformance",
              params: {
                  arena_id: selectedArena._id,
              },
              });
      }
      
    const deletePost = async()=>{
          showLoading('deleting the post ...')
          await deleteArenaPost( postToDeleteId, setSelectedArena , setUserArenas)
          hideLoading()
       }

    const confirmAction =  {
    delete_arena : handleDeleteArena,
    delete_arena_deny : () => {} ,
    create_performance : createPerformance,
    delete_performance : deletePost
    }

    const alertContent =  {
        delete_arena : {
            title : "Delete Arena",
            text: "Deleting this arena will permanently remove all performances, followers, stars and statistics. This action cannot be undone."
        },
        delete_arena_deny : {
            title : " Delete Arena ",
            text : " can't delete this Arena , need to delete all performances first ",
        },
        create_arena : {
            title : "Create Arena" ,
            text : "are you sure you want to create New Arena"
        },
        create_performance : {
            title : "Add Performance" ,
            text : "are you sure you want to add a  performance"
        },
        delete_performance : {
            title : "Delete Post" ,
            text : "are you sure you want to delete this performance"
        },
    }
     
    const alertType =  {
        delete_arena : "confirm" ,
        delete_arena_deny : "infos",
        create_arena : "confirm",
        create_performance : "confirm",
        delete_performance : "confirm"
    }


// upload refresh

useEffect(() => {
    const unsubscribe = subscribeToUploadQueue(
      ({ event, job, busy, result, error }) => {
  
        if (busy) {
          setUploadPerformanceLoading(true);
        }
  
        if (
          event === "job_completed"
        ) {
          const performanceResult =
            result ?? job?.result;
  
          if (
            job?.type ===
            UPLOAD_TYPE.PERFORMANCE
          ) {
            setUploadPerformanceLoading(false);
            if (performanceResult) {
              setSelectedArena(
                performanceResult.selectedArena
              );
  
              setUserArenas(
                performanceResult.arenas
              );
            }
            setGlobalArenaRefresh(true);
          }
          return;
        }
  
        if (
          event === "job_failed" &&
          job?.type ===
            UPLOAD_TYPE.PERFORMANCE
        ) {
          console.error(
            "❌ Performance upload failed:",
            error ?? job?.error
          );
  
          setUploadPerformanceLoading(false);
          return;
        }
  
        if (
          event === "job_cancelled" &&
          job?.type === UPLOAD_TYPE.PERFORMANCE
        ) {
          setUploadPerformanceLoading(false);
        }
      }
    );
  
    return () => unsubscribe();
  }, []);
  
  /*
  |--------------------------------------------------------------------------
  | Check queue when Arena mounts
  |--------------------------------------------------------------------------
  */
  
  useEffect(() => {
    const checkUploadQueue = async () => {
      try {
        const busy =
          await isUploadQueueBusy();
  
        setUploadPerformanceLoading(
          busy
        );
      } catch (error) {
        console.error(
          "❌ Failed to check upload queue:",
          error
        );
      }
    };
  
    checkUploadQueue();
  }, []);
  
 
  useEffect(() => {
    const recoverCompletedUploads =
      async () => {
        try {
          const completedUploads = await getCompletedUploads();
          for (
            const job of completedUploads
          ) {

            if (
              job.type !==
              UPLOAD_TYPE.PERFORMANCE
            ) {
              continue;
            }
  
            const result =
              job.result;
  
            if (!result) {
              continue;
            }
  
            
            setSelectedArena(
              result.selectedArena
            );
            setUserArenas(
              result.arenas
            );
            setUploadPerformanceLoading(
              false
            );
            setGlobalArenaRefresh(
              true
            );
            /*
            |--------------------------------------------------------------------------
            | Remove the completed job after Arena has consumed its result.
            |--------------------------------------------------------------------------
            */
            await removeUploadJob(
              job.id
            );
          }
        } catch (error) {
          console.error(
            "❌ Failed to recover completed upload:",
            error
          );
        }
      };
  
    recoverCompletedUploads();
  }, []);


  if (!selectedArena) {
    return null
  }

  return (
    <View className="flex-1 bg-black">

      {/* HEADER */}
      <Animated.View
          style={{
            backgroundColor: headerBlack
            ? "rgba(0,0,0,1)"
            : "rgba(0,0,0,0)",
          }}
          className="  py-1 px-4 z-10 absolute top-[0%] left-0 right-0   bor der-b bo rder-white/5"> 
            <View
            style = {{
              marginTop : insets.top + 10
            }}
            className = "flex-row  justify-between items-center" >
              <TouchableOpacity 
              className ="p- 1 ml-1 b g-black/60 rounded-full justify-center items-center"
              onPress={() => router.back()}>
                <MaterialCommunityIcons
                    name="chevron-left"
                    size={scale(35)}
                    color="#eab308"
                />
              </TouchableOpacity>

              <Text 
                style ={{
                  color :"#fff",
                  fontSize: scale(18),
                  fontWeight : "800"
                }}
                className="text-white">
                {headerBlack ? selectedArena.arenaName : ""}  
              </Text>      

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={ () => {
                    setHamburgerMenu(!hamburgerMenu)
                }}
                style={{
                    borderRadius: 26,
                    // backgroundColor: "rgba(0,0,0,.55)",
                    // borderWidth: 1,
                    // borderColor: "rgba(234,179,8,.58)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className = "p- 2 mr- 1 rounded-full bg -black"  >
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={scale(25)}
                        color="#f4d44d"
                    />
              </TouchableOpacity>
            </View>
      </Animated.View>


      <FlatList
        data={arenaPosts}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          handleScroll(e);
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        ListHeaderComponent={
          <Header
            arena={selectedArena}
            setSelectedArena={setSelectedArena}
            setShowArenaSelector={null}
            setShownMenuPostId={setShowMenuPostId}
            setOpenEditArenaModal={null}
            onRefresh={onRefresh}
            refresh={refreshing}
            isMe ={isMe}
            onPressFollow = {toggleFollower}
            onPressStar = {toggleStar}
            onPressOwner = {loadProfile}
          />
        }
        renderItem={({ item }) => (
          <Displayer
            item={item}
            setPostToDeleteId={setPostToDeleteId}
            arena={selectedArena}
            setSelectedPost={setSelectedPost}
            onRefresh={onRefresh}
            showMenuPostId={showMenuPostId}
            setShowMenuPostId={setShowMenuPostId}
          />
        )}
        ListFooterComponent={() => (
          <View className="min-h-8 w-full" />
        )}
        // onScroll={onScroll}
        scrollEventThrottle={16}
      />

     
      {openArenaAlertModal && (
        <ArenaAlertModal
          isVisible={openArenaAlertModal}
          setIsVisible={setOpenArenaAlertModal}
          title={alertContent[arenaActionModal].title}
          message={alertContent[arenaActionModal].text}
          type={alertType[arenaActionModal]}
          onConfirm={confirmAction[arenaActionModal]}
        />
      )}

      {/* <ArenaSelector
        userArenas={userArenas}
        selectedArena={selectedArena}
        setSelectedArena={setSelectedArena}
        setVisible={setShowArenaSelector}
        visible={showArenaSelector}
        onCreateArena={() => setSelectedArena(null)}
      /> */}
    </View>
  );
}