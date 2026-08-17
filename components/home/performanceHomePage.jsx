// import { View,  useWindowDimensions, FlatList } from 'react-native'
// import React, {  useEffect, useState } from 'react'
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { getFavouriteStages, getRegionTalentStages, getTopTalents, getUserTalent} from '../../apiCalls';


// export default function PerformanceHomePage({onScroll}) {
//     const {user, userTalents, setUserTalents, userTalentPerformances ,globalRefresh ,setGlobalRefresh, globalSelectedRegion,
//           setRegionStages , setUserTalentPerformances , notifications, topTalents, userArenas,
//           setFavouriteStages ,setTopTalents
//     } = useGlobalContext()
//     const sections = [
//       { id: "Performances" },
//       // { id: "stageSelector" },
//     ];
//     const insets = useSafeAreaInsets();
//     const { width, height } = useWindowDimensions();
//     const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
//     const [section, setSection] = useState(1);
//     const [displayTalent, setDisplayTalent] = useState(userTalents)
//     const [refresh , setRefresh] = useState(false)
//     const [loaded , setLoaded] = useState(false)
//     const [displayData, setDisplayData] = useState(null);
//     const [index, setIndex] = useState(2);
//     const [data , setData] = useState(null)

//     const handleRefresh = () =>{
//       setRefresh(true)
//       getUserTalent( user._id , setUserTalents )
//       getTopTalents(user._id , setTopTalents)
//       setTimeout(() => {
//          setRefresh(false)
//       }, 1000);
//     }

//     useEffect(() => {
//       if (!globalRefresh) return;
//       console.log("refreshing ... ")
//       const fetchData = async () => {
//         try {
//           await Promise.all([
//             getUserTalent(user._id , setUserTalents),
//             getFavouriteStages(user._id, setFavouriteStages),
//             getRegionTalentStages(globalSelectedRegion,setRegionStages),
//           ]);
//         } catch (error) {
//           console.error("Error refreshing data:", error);
//         } finally {
//           setGlobalRefresh(false);
//         }
//       };
//       fetchData();
//     }, [globalRefresh])
    

//     return (

//      <View
//       className="flex-1 w-[100%] px-2 mb-4 bg-black">
      
         
//      </View>

//     )
//   }

import { View,  useWindowDimensions, FlatList } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getFavouriteStages, getRegionTalentStages, getTopTalents, getUserTalent} from '../../apiCalls';


export default function MyJourney({onScroll}) {
  const {
    user,
    userTalents,
    userTalentPerformances,
    userArenas,
    globalRefresh,
    setGlobalRefresh,
  } = useGlobalContext();

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [section, setSection] = useState("creations");
 
    const [displayNotificationsModal , setDisplayNotificationsModal] = useState(false)
    const [displayTalent, setDisplayTalent] = useState(userTalents)
    const [refresh , setRefresh] = useState(false)
    const [loaded , setLoaded] = useState(false)
    const [displayData, setDisplayData] = useState(null);
    const [index, setIndex] = useState(2);
    const [data , setData] = useState(null)
    

    return (

    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 8,
      }} >

    </View>

    )
  }