import axios from "axios";
import { api, BASE_URL } from "./config";
import { stageOrderMap } from "../utilities/TypeData";

export const toggleFavouriteStage = async(user_id ,body, setData,setIsExpired)=>{
 
  try {
      await api.post( BASE_URL + `/talents/favourite/${user_id}`,body)
      .then(res => {
         if(res.data === "talent expired") return setIsExpired(true)
          setData(res.data) 
      }
       )
  } catch (error) {
      console.log(error)
  }
} 

// export const removeTalentRoomFromFavourite = async(user_id ,body, setData,setIsExpired)=>{
 
//   try {
//       await api.patch( BASE_URL + `/talents/favourite/${user_id}`,body)
//       .then(res => {
//           if(res.data === "talent expired") return setIsExpired(true)
//           setData(res.data) 
//       } )
//   } catch (error) {
//       console.log(error)
//   }
// }  

// ***********************************like Talent posts *************************

export const getHotStages = async(user_id , setData ) =>{
      try { 
        // setIsFetching(true)
      await 
      api.get(`/talents/hotStages/${user_id}`)
      .then(res =>  {
        const data = []
        if(res.data.length > 0) {
            res.data.forEach(element => {
               data.push({...element  })
            });
        } 
        // data.sort((a, b) => 
        //   new Date(b.updatedAt) - new Date(a.updatedAt) )
        setData(data)

        } ).finally(() =>{
          // setIsFetching(false)
        })
    } catch (error) {
      console.log(error)
    }
    }

export const getTrendingStages = async(userCountryCode , setData ) =>{
      try { 
        // setIsFetching(true)
      await 
      api.get(`/talents/trendingStages/${userCountryCode}`)
      .then(res =>  {
        const data = []
        if(res.data.length > 0) {
            res.data.forEach(element => {
               data.push({...element  })
            });
        } 
        // data.sort((a, b) => 
        //   new Date(b.updatedAt) - new Date(a.updatedAt) )
        setData(data)

        } ).finally(() =>{
          // setIsFetching(false)
        })
    } catch (error) {
      console.log(error)
    }
    }
     
     
    // export const getFavouriteStageList = async( user_id ,  setFavourites) =>{
    //   try { 
    //   await api.get( BASE_URL + `/talents/favourites/${user_id}`)
    //   .then(res =>  {
    //        setFavourites(res.data)
    //     } )
    //     .finally(()=>{
    //       // setIsLoading(false)
    //     })
    // } catch (error) {
    //   console.log(error)
    // }
    // }

export const getFavouriteStages = async( user_id ,  setFavourites) =>{
      try { 
      await api.get( BASE_URL + `/talents/favouriteStages/${user_id}`)
      .then(res =>  {
           setFavourites(res.data)
        } )
        .finally(()=>{
          // setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
    }

export const getStageById = async( stage_id ,  setStage) =>{
      try { 
      await api.get( BASE_URL + `/talents/stage/${stage_id}`)
      .then(res =>  {
           setStage(res.data)
        } )
        .finally(()=>{
          // setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
    }

export const getFavouriteChallenges = async( user_id , data  , setFavourites) =>{
      try { 
      await axios.post( BASE_URL + `/challenges/favourites/${user_id}` , data)
      .then(res =>  {
           setFavourites(res.data)
        } )
        .finally(()=>{
          // setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
    }

export const getAllTalentStages = async( setTalentStages) =>{
      try {
        await api.get( `/talents/stages` )
        .then(res =>  {
          // console.log(res.data)
          setTalentStages(res.data)  
          })
          .finally(()=>{
            // setIsLoading(false)
          })
      } catch (error) {
        console.log(error)
      }
     }

export const getRegionTalentStages = async(region , setTalentStages) =>{
      try {
        await api.get(`/talents/stages/region/${region}` )
        .then(res =>  {
          const stages = res.data ; 
          const sortedStages = stages.sort((a, b) => {
            return (
              (stageOrderMap[a.name] || Number.MAX_SAFE_INTEGER) -
              (stageOrderMap[b.name] || Number.MAX_SAFE_INTEGER)
            );
          });
          setTalentStages([...sortedStages])  
          })
          .finally(()=>{
            // setIsLoading(false)
          })
      } catch (error) {
        console.log(error)
      }
     }

export const getStageByNameAndRegion = async(body ) =>{
      try {
        return await api.post(`/talents/findStage` ,body )
        .then(res =>  {
             return res.data 
          })
          .finally(()=>{
            // setIsLoading(false)
          })
      } catch (error) {
        console.log(error)
      }
     }


     //****************geo location , ip , user location */

export const canAttendStage = async (room_id , gpsLocation ) => {
      try {
           const response = await api.post(
          `/talents/geoAccess/${room_id}`,
          {
            gpsCountryCode: gpsLocation?.countryCode,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Join stage error:", error.response?.data);
        throw error;
      }
    };

    //****************** Arena creation , posts *************/
