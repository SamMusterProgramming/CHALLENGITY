import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

export const  useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider =({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user,setUser] =useState(null)
    const [trendingChallenges,setTrendingChallenges] = useState([])
    const [isLoading ,setIsLoading] = useState(true)
    const [userPublicChallenges,setUserPublicChallenges] = useState([])
    const [userPrivateChallenges,setUserPrivateChallenges] = useState([])
    const [ publicParticipateChallenges,setPublicParticipateChallenges] = useState(null)
    const [ privateParticipateChallenges,setPrivateParticipateChallenges] = useState(null)

    const [isViewed ,setIsViewed] = useState(true)
    const [notifications ,setNotifications] = useState([])
    const [followings,setFollowings] = useState ([])
    const [userFriendData,setUserFriendData] = useState(null)
    const [follow , setFollow ] = useState(null)
    const [favouriteList , setFavouriteList] = useState(null)
    const [smallScreen , setSmallScreen] = useState (false)
    const [userTalents, setUserTalents] = useState ([])
    const [topTalents, setTopTalents] = useState ([])

   const [userTalentPerformances , setUserTalentPerformances] = useState([])
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const [globalRefresh, setGlobalRefresh] = useState(false);
   const [menuPanelBgColor, setMenuPanelBgColor] = useState("#2f3e42");
   const [boxBgColor,setBoxBgcolor] = useState("##0e121a") //("#d4d4d4")//("#d1d8eb")//useState("#f0f1f7")
   const [contestantBgColor,setContestantBgColor] = useState("#35383d")//("#1f1f21")
//    const [topTalents, setTopTalents] = useState([])


    useEffect(() => {
          
    }, [])
    
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
            topTalents, setTopTalents
            }
            } >
            {children}
        </GlobalContext.Provider>
    )
}