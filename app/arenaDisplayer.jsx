import { View, Text, useWindowDimensions, Platform, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArenaInfoPanel from '../components/arenaDisplayer/arenaInfosPanel';
import { router, useLocalSearchParams } from 'expo-router';
import PerformanceCard from '../components/viewArenas/performance/performanceCard';
import { deleteArenaPost, getArenaById, getArenaByUser, getUserById, toggleFollowerArena, toggleStarArena } from '../apiCalls';
import { useGlobalContext } from '../context/GlobalProvider';
import ArenaAlertModal from '../components/arena/modals/AlertArenaModal';
import { useLoading } from '../context/loadingContext';
import EmptyPerformanceCard from '../components/viewArenas/performance/emptyPerformanceCard';

export default function arenaDisplayer() {
    const {width , height} = useWindowDimensions()
    const {user ,showProfile, setShowProfile , openArenaAlertModal, setUserArenas,setGlobalArenaRefresh,userFollowedArenas ,
           setOpenArenaAlertModal,arenaActionModal, setArenaActionModal ,globalArenaRefresh} = useGlobalContext()
           
    const insets = useSafeAreaInsets();
    const { arena_id } =  useLocalSearchParams(); 
    const [arenaPosts , setArenaPosts] = useState([])
    const[selectedArena , setSelectedArena] = useState(null)
    const CARD_WIDTH = (width - 30) / 2;
    const [profile , setProfile] = useState(null)
    const [isMe , setIsMe] = useState(false)
    const [postToDeleteId, setPostToDeleteId] = useState(null)
    const [refreshing, setRefreshing] = useState(false);
    const { showLoading, hideLoading } = useLoading();


    const loadProfile = async(owner_id)=> {
        if(!owner_id) return ;
      await getUserById(owner_id , setProfile)
    }
    
    useEffect(() => {
      if(!profile) return ; 
      if(isMe) {
        router.back()
        setShowProfile(true)
        return 
      };
        router.push({
          pathname: "/ProfileScreen",
          params: {
            userProfile: JSON.stringify(
            profile
            ),
          },
        })
    }, [profile])

    useEffect(() => {
      const loadArena = async() =>{
        const data =  await getArenaById(user._id , arena_id)
        setSelectedArena(data)
        setIsMe(data.owner_id === user._id)
      }
      loadArena()
    }, [])

    const PERFORMANCE_HEIGHT = selectedArena?.postCount == 1 ? height * 0.65 :
    selectedArena?.postCount <= 4 ? height * 0.64 / 2 :
    height * 0.65 / 2.5

    useEffect(() => {
        if(!selectedArena) return ; 
        const getData = async() =>{
            if(!selectedArena) return ;
            // await getPostsArena(selectedArena._id ,setArenaPosts)
            setArenaPosts(selectedArena.posts)
        }
        getData()
    }, [selectedArena])

    const playPerformance = (item) => {
        let posts = []
        arenaPosts.map( p => {
          let post = {...p, 
            arenaName :selectedArena.arenaName ,
            talentType : selectedArena.talentType ,
            region : selectedArena.region ,
            profileImage : selectedArena.profileImage,
            owner_id : selectedArena.owner._id
          }  
          posts.push(post)    
        })
        const updatedPosts = [
            posts.find(p => p._id.toString() === item._id.toString()),
            ...posts.filter(p => p._id.toString() !== item._id.toString()),
          ];
        
        let extraPosts = []
        userFollowedArenas.map((a) =>{
           if(a._id == arena_id) return;
           a.posts.map(p =>{
            let post = {...p, 
                arenaName :a.arenaName ,
                talentType : a.talentType ,
                region : a.region ,
                profileImage : a.profileImage,
                owner_id : a.owner._id
              }  
            extraPosts.push(post)
           })
        })
        
        updatedPosts.push(...extraPosts)

        router.push({
          pathname: "/arenaPerformancePlayer",
          params: {
            selectedPostId: item._id,
            arenaPosts: JSON.stringify(updatedPosts),
            arena: JSON.stringify(selectedArena),
          },
        });
    }

    //actions   
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

    const renderPerformance = ( {item , index } ) => {
        return  <PerformanceCard 
            item = {item}
            index={index}
            CARD_WIDTH={CARD_WIDTH}
            height={PERFORMANCE_HEIGHT}
            playPerformance = {playPerformance}
            performanceCount={arenaPosts.length}
            canEdit = {isMe}
            setPostToDeleteId ={setPostToDeleteId}

          />
      };

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

    // refreshing data 
    const onRefresh = async () => {
        showLoading("Refreshing ...")
        try {
        setRefreshing(true);
        // await getArenaByUser(user._id ,setSelectedArena, setUserArenas , selectedArena._id);
        const data =  await getArenaById(user._id , arena_id)
        setSelectedArena(data)
        } catch (error) {
        console.log(error);
        } finally {
        setRefreshing(false);
        hideLoading()
        }
    };

    useEffect(() => {
        if(!globalArenaRefresh) return ; 
        onRefresh()
        setGlobalArenaRefresh(false)
    }, [globalArenaRefresh])

    if(!selectedArena) return null ;

    return (
        <View
        style={{ 
            paddingTop:Platform.OS == "ios" ? insets.top : insets.top ,
            paddingBottom : Platform.OS == "ios" ? insets.bottom   : 20
         }}
        className=" flex-1  min-w-[100vw] min-h-full flex-col justify-center items-center  bg-[#0d0d0d]" >
            <View
            style ={{
                height : height * 0.66,
                width,
                // paddingHorizontal :24
            }}
            className = "bor der-t-2 bo rder-l-2 bord er-r-2 flex -1  round ed-t-3xl bo rder-[#e3dfd4]/40">
               {arenaPosts.length == 0 ? (
                        <EmptyPerformanceCard width={width} />
               ):(
                <FlatList
                    data={arenaPosts}
                    keyExtractor={(item) => item._id}
                    // extraData={selectedArena}
                    extraData={refreshing}
                    numColumns={2}
                    renderItem={renderPerformance}
                    contentContainerStyle={{
                    //   paddingHorizontal: 16,
                    //   paddingBottom: 40,
                      marginTop: 10,
                    }}
                    columnWrapperStyle={{
                      justifyContent: "center",
                      marginBottom: 8,
                      gap :8
                    }}
                    showsVerticalScrollIndicator = {false}
                  />
                )}
            </View>

            <View
            style ={{
                width
            }}
            className = "bg-black w-full flex-1">
                <ArenaInfoPanel
                    arena ={selectedArena}
                    isMe = {isMe}
                    onPressFollow = {toggleFollower}
                    onPressStar = {toggleStar}
                    onPressOwner = {loadProfile}
                />
            </View>

            {openArenaAlertModal && (
            <ArenaAlertModal
                isVisible={openArenaAlertModal}
                setIsVisible={setOpenArenaAlertModal}
                title = {alertContent[arenaActionModal].title}
                message = {alertContent[arenaActionModal].text}
                type = {alertType[arenaActionModal]}
                onConfirm = {confirmAction[arenaActionModal]}
                />
            )}

        </View>
  )
}