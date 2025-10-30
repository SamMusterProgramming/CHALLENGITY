import {  useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import { icons } from '../constants';



import { SafeAreaView } from 'react-native-safe-area-context';


export default function WatchList() {
    const {user,setUser,userPublicChallenges,setUserPublicChallenges,followings,setFollowings,follow ,setTrendingChallenges, setFollow,trendingChallenges,
        publicParticipateChallenges,setPublicParticipateChallenges,privateParticipateChallenges,setPrivateParticipateChallenges,userFriendData,
        setUserFriendData,userPrivateChallenges,setUserPrivateChallenges,setIsViewed,setNotifications ,favouriteChallenge , setFavouriteChallenge} = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [selectedPrivacy,setSelectedPrivacy] = useState("Public")
    const [boxDisplayChallenges,setBoxDisplayChallenges] = useState(
                                                 [...favouriteChallenge.favourites].reverse()
                                                            )
  
    // const [displayData , setDisplayData] = useState(userPublicChallenges)
    const [indexList , setIndexList] = useState(1)
    const [displayData , setDisplayData] = useState([...favouriteChallenge.favourites].reverse().slice(0,6))
    const [isLoaded ,setIsLoaded] = useState(false)
    const [moreLeft,setMoreLeft] = useState(false)
    const [moreRight,setMoreRight] = useState([...favouriteChallenge.favourites].reverse().length > 6 ? true:false)
    const [isChallengeSelected , setIsChallengeSelected] = useState(false)
    const [selectedChallenge , setSelectedChallenge] = useState(null)
    // const [color , setColor] = useState(selectedBox === "owner"? "#1418dc" : "#e10c1a")
    // const [selectColor , setSelectColor] = useState(selectedBox === "owner"? "white" : "white")
    const [friendsChallenges, setFriendsChallenges] = useState(null);
    const [refresh , Setrefresh] = useState(false)


    // useEffect(() => {
    //     setIsLoaded(true)
    //   }, [])



    const upload =   ()=> {
        const favChallenges = favouriteChallenge.favourites.reverse();
        let challenges = []
        favChallenges.forEach((ch)=> {
            const c = trendingChallenges.find(chall => chall._id === ch._id)
            if (c) challenges.push(c)
        })
        setBoxDisplayChallenges([...challenges])
        setDisplayData(challenges.slice(0,6))
        setMoreRight(challenges.length > 6 ? true:false)
        setIndexList(1)
      }
    

    const handleNext = ()=> {
        const newData = boxDisplayChallenges.slice( indexList * 6 , (indexList + 1)* 6);
        setDisplayData([ ...newData]);
        setIndexList(prev => prev + 1 )
     }
      
    const handleBack = ()=> {
    
       const newData = boxDisplayChallenges.slice((indexList - 2) * 6 , (indexList - 1 ) * 6);
        setDisplayData([...newData]);
       setIndexList(prev => prev - 1 )
    }
    
    useEffect(() => {
    
      (indexList -1 >= 1)? setMoreLeft(true):setMoreLeft(false);
      (boxDisplayChallenges.length < (indexList) * 6)? setMoreRight(false) :setMoreRight(true)
    
    }, [indexList])
    
    
    
    const getIcon = (type) => {
        switch(type) {
          case "Public":
            return icons.publi
           break;
          case "Private":
            return icons.priv
           break;
    
           case "Open":
            return icons.open
           break;
          case "Restricted":
            return icons.restricted
           break;
           case "Strict":
            return icons.strict
           break;
    
          case "Adventure":
             return icons.adventure
            break;
          case "Dance":
             return icons.dance 
            break;
          case "Eating":
              return icons.eating 
             break;
          case "Fitness":
              return  icons.fitness 
             break;
          case "Magic":
            return icons.magic 
              break;
          case "Music":
            return icons.music 
               break;
          case "Science":
              return icons.science
               break;
          case "Sport":
               return icons.sport
               break;
          case "Game":
              return icons.game
              break;
          case "Diet":
              return icons.diet
              break;
          default:
            // setIcon("gray")
            break;
        }
      }
      //****************************** you challenges ******************** */

      



useEffect(() => {
    setBoxDisplayChallenges([...favouriteChallenge.favourites].reverse())
    setDisplayData([...favouriteChallenge.favourites].reverse().slice(0,6))
    setMoreLeft(false)
    setMoreRight([...favouriteChallenge.favourites].reverse().length > 6 ? true:false)
   }, [favouriteChallenge])

  return (
   <>
    <SafeAreaView className="flex-1 min-w-full min-h-full bg-primary ">  
    
    </SafeAreaView>


   </>
  )
}