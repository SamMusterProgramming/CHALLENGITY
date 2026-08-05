import { View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CreateArenaModal from '../modal/createArenaModal'
import { createArenaByUser, deleteArenaByUser, deleteArenaPost, getArenaByUser, getPostsArena, updateArenaByUser } from '../../apiCalls'
import { useGlobalContext } from '../../context/GlobalProvider'
import ArenaHeader from '../arena/header/arenaHeader'
import ArenaSelector from '../arena/ArenaSelector'
import WelcomeToArena from '../arena/welcomeToArena'
import ArenaPost from '../arena/arenaPost'
import { router } from 'expo-router'
import { useLoading } from '../../context/loadingContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ArenaAlertModal from '../arena/modals/AlertArenaModal'
import EditArenaModal from '../arena/modals/editArenaModal'

export default function Arena({user , onScroll}) {
const {userArenas , setUserArenas , selectedArena, setSelectedArena , arenaActionModal,tempPerformance, setTempPerformance,
     uploadPerformanceLoading ,openArenaAlertModal, setOpenArenaAlertModal, globalArenaRefresh ,setGlobalArenaRefresh } = useGlobalContext()
const { showLoading, hideLoading } = useLoading();
const [openModal , setOpenModal] = useState(false)
const [openEditArenaModal , setOpenEditArenaModal] = useState(false)
const [arenaPosts , setArenaPosts] = useState([])
const [showMenuPostId , setShowMenuPostId] = useState(null)
const [showSelector, setShowSelector] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [action, setAction] = useState("");
const [postToDeleteId, setPostToDeleteId] = useState(null);
const [playerPosts, setPlayerPosts] = useState([]);
const [selectedPost, setSelectedPost] = useState(null);
const {width ,height} = useWindowDimensions()
const [showArenaSelector, setShowArenaSelector] = useState(false);


// const [textAlert, setTextAlert] = useState("");

const lastOffset = useRef(0);

const createArena = async(d) => {
  const data =   await createArenaByUser(user._id,d)
  if(data.message) return ; 
  setUserArenas(data.arenas);
  setSelectedArena(data.selectedArena)
 }

// useEffect(() => {
//  if(!userArenas.length) return ; 
//    setSelectedArena(userArenas?.[0])
// }, [userArenas])

useEffect(() => {
    const getData = async() =>{
        if(!selectedArena) return ;
        // await getPostsArena(selectedArena._id ,setArenaPosts)
        setArenaPosts(selectedArena.posts)
    }
    getData()
}, [selectedArena])


useEffect(() => {
    if (!selectedPost || !selectedArena) return;
    const posts = selectedArena.posts
    let refactoredPosts = []
    posts.map((p) => {
        let post = {...p, arenaName :selectedArena.arenaName ,
        talentType : selectedArena.talentType ,
        region : selectedArena.region ,
        profileImage : selectedArena.profileImage
      }      
      refactoredPosts.push(post)
    } )
    
    const updatedPosts = [
        refactoredPosts.find(p => p._id.toString() === selectedPost._id.toString()),
        ...refactoredPosts.filter(p => p._id.toString() !== selectedPost._id.toString()),
      ];
    setPlayerPosts(updatedPosts)
  }, [selectedPost]);

 
useEffect(() => {
      if (!selectedPost) return;
      router.push({
        pathname:
          "/arenaPerformancePlayer",
        params: {
          selectedPostId:
            selectedPost._id,
          arenaPosts:
            JSON.stringify(
              playerPosts
            ),
          arena : JSON.stringify(
            []
          )
        },
      });
}, [playerPosts])


useEffect(() => {
   if(!uploadPerformanceLoading || !tempPerformance) return;
   console.log(tempPerformance);
   setArenaPosts(prev => [tempPerformance, ...prev]);
   setTempPerformance(null)
}, [tempPerformance])


const onRefresh = async () => {
    showLoading("Refreshing ...")
    try {
      setRefreshing(true);
      // call your backend here
      await getArenaByUser(user._id ,setSelectedArena, setUserArenas , selectedArena._id);
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

// handle actions below 
const updateArena = async(body) => {
    const data = await updateArenaByUser(selectedArena._id , {...body,userId:user._id})
    setSelectedArena(data.selectedArena)
    setUserArenas(data.arenas)
    setTimeout(() => {
        hideLoading()
    }, 1000);
}

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
   create_arena : () => {
                         setTimeout(() => {
                            setOpenModal(true)
                         }, 300);
                        },
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

if (userArenas.length === 0 ) return (
    <>
    <WelcomeToArena
        onScroll={onScroll}
        onCreateArena={() =>
        setOpenModal(true)
        }
    />
    <CreateArenaModal user={user} isVisible={openModal} setIsVisible={setOpenModal} onCreateArena = {createArena} />
    </>
)

return (
    <View
    className = "flex-1 bg-black ">
       
        <FlatList
            data={arenaPosts}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator = {false}
            showsVerticalScrollIndicator ={false}
            ListHeaderComponent={
                <ArenaHeader arena={selectedArena} setSelectedArena = {setSelectedArena} setShowArenaSelector = {setShowArenaSelector}
                setShownMenuPostId = {setShowMenuPostId} setOpenEditArenaModal={setOpenEditArenaModal}
                onRefresh={onRefresh} refresh = {refreshing} />
            }
            renderItem={({ item }) => (
                <ArenaPost
                  item={item}
                  setPostToDeleteId={setPostToDeleteId}
                  arena={selectedArena}
                  setSelectedPost = {setSelectedPost}
                  onRefresh={onRefresh}
                //   onPress={(post) => {
                //     router.push({
                //         pathname:
                //           "/arenaPerformancePlayer",
                //         params: {
                //           selectedPostId: post._id,
                //           arenaPosts: JSON.stringify(arenaPosts),
                //           arena : JSON.stringify(
                //             selectedArena
                //           )
                //         },
                //       });
                //   }}
                  showMenuPostId={showMenuPostId}
                  setShowMenuPostId={setShowMenuPostId}
              
                //   refreshing={refreshing}
                //   onRefresh={onRefresh}
                />
              )}
            ListFooterComponent={()=>{
                return (
                    <View
                      className = "min-h-8 w-full"
                    />
                )
            }}
            onScroll={onScroll}
            scrollEventThrottle={16}
        />
       {openEditArenaModal && (
         <EditArenaModal
         isVisible={openEditArenaModal}
         setIsVisible={
           setOpenEditArenaModal
         }
         arena={selectedArena}
         width={width}
         height={height}
         onSave={updateArena}
       />
       )}
       {openModal && (
       <CreateArenaModal 
             user={user} 
             isVisible={openModal} 
             setIsVisible={setOpenModal} 
             onCreateArena={createArena} />
        )}
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
        <ArenaSelector
          userArenas={userArenas}
          selectedArena={selectedArena}
          setSelectedArena={setSelectedArena}
          setVisible ={setShowArenaSelector}
          visible = {showArenaSelector}
          onCreateArena={() =>
              setOpenModal(true)
          }
          />
    </View>
  )
}