import { createContext, useContext, useEffect, useState } from "react";
import ShareOptionsModal from "../components/modal/ShareOptionsModal";
import ShareFriendsModal from "../components/modal/ShareFriendsModal";
import { Share } from "react-native";
import { shareWithFriends } from "../apiCalls";
import { createShareMessage } from "../utilities/shareLinks";



const GlobalContext = createContext();

export const  useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider =({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user,setUser] =useState(null)
    const [trendingChallenges,setTrendingChallenges] = useState([])
    const [isLoading ,setIsLoading] = useState(false)
    const [userPublicChallenges,setUserPublicChallenges] = useState([])
    const [userPrivateChallenges,setUserPrivateChallenges] = useState([])
    const [ publicParticipateChallenges,setPublicParticipateChallenges] = useState(null)
    const [ privateParticipateChallenges,setPrivateParticipateChallenges] = useState(null)

    const [isViewed ,setIsViewed] = useState(true)
    const [notifications ,setNotifications] = useState([])
    const [followings,setFollowings] = useState ([])
    const [userFriendData,setUserFriendData] = useState(null)
    const [follow , setFollow ] = useState(null)
    const [userFollowers , setUserFollowers ] = useState([])
    const [userFollowings , setUserFollowings ] = useState([])

    const [favouriteList , setFavouriteList] = useState(null)
    const [smallScreen , setSmallScreen] = useState (false)
    const [userTalents, setUserTalents] = useState ([])
    const [topTalents, setTopTalents] = useState ([])

   const [userTalentPerformances , setUserTalentPerformances] = useState([])
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const [globalRefresh, setGlobalRefresh] = useState(false);
   const [menuPanelBgColor, setMenuPanelBgColor] = useState("#2f3e42");
   const [boxBgColor,setBoxBgcolor] = useState("#0e121a") //("#d4d4d4")//("#d1d8eb")//useState("#f0f1f7")
   const [contestantBgColor,setContestantBgColor] = useState("#35383d")//("#1f1f21")
   const [userProfileImg,setUserProfileImg] = useState(null)
   const [userCoverImg,setUserCoverImg] = useState(null)

   const [allStages, setAllStages] = useState([]);
   const [hotStages, setHotStages] = useState([]);
   const [trendingStages, setTrendingStages] = useState([]);

   const [favouriteStages, setFavouriteStages] = useState([]);
   const [gpsLocation , setGpsLocation] = useState(null)
   const [regionStages , setRegionStages] = useState(null)

   const [globalSelectedRegion , setGlobalSelectedRegion] = useState("DZ")
   const [globalSelectedStageName , setGlobalSelectedStageName] = useState("Singing")
   const [userCountryCode , setUserCountryCode] = useState("")
   const [hotStageScrolledIndex , setHotStageScrolledIndex] = useState(0)
   const [activeIndex, setActiveIndex] = useState(0);
   const [selectedArena, setSelectedArena] = useState(null);
   const [uploadPerformanceLoading , setUploadPerformanceLoading] = useState(null);
   const [localArenas , setLocalArenas] = useState([])
   const [userFollowedArenas , setUserFollowedArenas] = useState([])

   const [globalSpotlightPerformances, setGlobalSpotlightPerformances] = useState([]);
   const [regionalSpotlightPerformances, setRegionalSpotlightPerformances] = useState([])
   const [localSpotlightPerformances, setLocalSpotlightPerformances] = useState([])
   const [globalSpotlightPage, setGlobalSpotlightPage] = useState(1);
   const [form, setForm] = useState({
    name : "",
    email : "",
    username : "",
    password : "",
    confirm : "",
    profile_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2Favatar.jpg?alt=media&token=25ae4701-e132-4f15-a522-5b9332d2c0b2",
    cover_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"
  })
  const [userArenas, setUserArenas] = useState()
  const[globalArenaRefresh, setGlobalArenaRefresh] = useState(false)
  const [openArenaAlertModal, setOpenArenaAlertModal] = useState(false)
  const [arenaActionModal, setArenaActionModal] = useState("")
  const [tempPerformance, setTempPerformance] = useState(null)
  const [showProfile, setShowProfile]  = useState(false)
  const [openTalentPicker, setOpenTalentPicker]  = useState(false)
  const [opneShareModal, setOpenShareModal] = useState(false);
  const [opneShareFriendModal, setOpenShareFriendModal] = useState(false);
  const [shareContent, setShareContent] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);
  const [sharing, setSharing] = useState(false);

  const colorTheme = "#eab308"

  const openShare = ({
    category,
    type,
    _id,
    name,
    region,
    talent,
    ownerId,
    postId
  }) => {

    if (!_id) {
      console.warn("openShare: missing ID");
      return;
    }
    setShareTarget({
        type,
        _id,
        name,
        region,
        talent,
        ownerId,
        category,
        postId
    });
    setOpenShareModal(true);
  };


  const closeShare = () => {
    setOpenShareModal(false);
  };

  const openShareFriends = () => {
    setOpenShareModal(false);
    setOpenShareFriendModal(true);
  };

  const closeShareFriends = () => {
    setOpenShareFriendModal(false);
  };

  

  const handleShare = async () => {
    try {
      if (!shareTarget?._id) {
        console.warn("ShareButton: missing ID");
        return;
      }
  
      setSharing(true);
  
      const message = createShareMessage({
        type: shareTarget.type,
        name: shareTarget.name,
        id: shareTarget._id,
      });
  
      await Share.share({
        message,
      });
  
    } catch (error) {
      console.error(
        "Share error:",
        error
      );
    } finally {
      setSharing(false);
    }
  };

  const shareToFriends = async (selectedFriendIds) => {
    try {
      if (!shareTarget?._id) {
        console.warn("shareToFriends: missing share target");
        return;
      }
  
      if (!selectedFriendIds?.length) {
        console.warn("shareToFriends: no friends selected");
        return;
      }
      setSharing(true);
    //   console.log("SHARING:", {
    //     shareTarget,
    //     selectedFriendIds,
    //   });

      const response = await shareWithFriends({
        receiverIds:selectedFriendIds,
        sharedType: shareTarget.type,
        sharedId : shareTarget._id,
        sharedCategory: shareTarget.category,
        metadata: {
            _id: shareTarget._id,
            name: shareTarget.name,
            region: shareTarget.region,
            talent : shareTarget.talent,
            type : shareTarget.type,
            ownerId:shareTarget.ownerId,
            postId:shareTarget.postId
          },
      })

    
    } catch (error) {
      console.error(
        "SHARE WITH FRIENDS ERROR:",
        error
      );
    } finally {
      setSharing(false);
    }
  };

  return (
        <GlobalContext.Provider
            value= { 
                {
            isLoading
            ,setIsLoading
            ,user,setUser,
            isLoggedIn,
            setIsLoggedIn,
            trendingChallenges,
            setTrendingChallenges,
            userPublicChallenges,setUserPublicChallenges,
            userPrivateChallenges,setUserPrivateChallenges,
            publicParticipateChallenges,setPublicParticipateChallenges,
            privateParticipateChallenges,setPrivateParticipateChallenges,
            isViewed ,setIsViewed,
            notifications ,setNotifications,
            followings,setFollowings,
            userFriendData,setUserFriendData,
            follow , setFollow ,
            favouriteList , setFavouriteList,
            smallScreen , setSmallScreen,
            userTalents, setUserTalents,
            userTalentPerformances , setUserTalentPerformances ,
            isLoggingOut, setIsLoggingOut,
            globalRefresh, setGlobalRefresh,
            menuPanelBgColor, setMenuPanelBgColor,
            boxBgColor,setBoxBgcolor,
            contestantBgColor,setContestantBgColor ,
            topTalents, setTopTalents,
            userProfileImg,setUserProfileImg ,
            userCoverImg,setUserCoverImg,
            allStages, setAllStages,
            hotStages , setHotStages,
            favouriteStages, setFavouriteStages,
            gpsLocation , setGpsLocation ,
            regionStages , setRegionStages,
            globalSelectedStageName , setGlobalSelectedStageName ,
            globalSelectedRegion , setGlobalSelectedRegion ,
            userCountryCode , setUserCountryCode,
            hotStageScrolledIndex , setHotStageScrolledIndex,
            activeIndex, setActiveIndex ,
            colorTheme ,form, setForm ,
            trendingStages, setTrendingStages ,
            userArenas , setUserArenas,
            selectedArena, setSelectedArena,
            uploadPerformanceLoading , setUploadPerformanceLoading,
            localArenas, setLocalArenas ,
            globalArenaRefresh, setGlobalArenaRefresh ,
            openArenaAlertModal, setOpenArenaAlertModal,
            arenaActionModal, setArenaActionModal,
            globalSpotlightPerformances, setGlobalSpotlightPerformances,
            globalSpotlightPage, setGlobalSpotlightPage,
            regionalSpotlightPerformances, setRegionalSpotlightPerformances,
            localSpotlightPerformances, setLocalSpotlightPerformances,
            tempPerformance, setTempPerformance,
            userFollowedArenas , setUserFollowedArenas,
            showProfile, setShowProfile ,
            openTalentPicker, setOpenTalentPicker,
            userFollowers , setUserFollowers ,
            userFollowings , setUserFollowings ,
            opneShareModal, setOpenShareModal,
            opneShareFriendModal, setOpenShareFriendModal,
            shareContent, setShareContent,
            shareTarget, setShareTarget,
            sharing, setSharing,
            openShare ,closeShareFriends,closeShare,handleShare,openShareFriends,shareToFriends
            }
            } >
            {children}

            <ShareOptionsModal
                visible={opneShareModal}
                onClose={closeShare}
                onShareExternal={handleShare}
                onShareFriends={openShareFriends}
                />

                <ShareFriendsModal
                visible={opneShareFriendModal}
                onClose={closeShareFriends}
                friends={userFriendData?.friends || []}
                onShare={shareToFriends}
                />

        </GlobalContext.Provider>
    )
}