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
    const [favouriteChallenge , setFavouriteChallenge] = useState(null)
    const [smallScreen , setSmallScreen] = useState (false)


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
            favouriteChallenge , setFavouriteChallenge,
            smallScreen , setSmallScreen
            }
            } >
            {children}
        </GlobalContext.Provider>
    )
}