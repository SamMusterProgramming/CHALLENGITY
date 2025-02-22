import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

export const  useGlobalContext = ()=> useContext(GlobalContext);

export const GlobalProvider =({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user,setUser] =useState(null)
    const [trendingChallenges,setTrendingChallenges] = useState([])
    const [isLoading ,setIsLoading] = useState(true)
    const [userChallenges,setUserChallenges] = useState([])
    const [ participateChallenges,setParticipateChallenges] = useState(null)

    useEffect(() => {
          
    }, [])
    
    return (
        <GlobalContext.Provider
            value= { {
            isLoading
            ,setIsLoading
            ,user,setUser,
            isLoggedIn,
            setIsLoggedIn,
            trendingChallenges,
            setTrendingChallenges,
            userChallenges,setUserChallenges,
            participateChallenges,setParticipateChallenges
              }
            } >
            {children}
        </GlobalContext.Provider>
    )
}