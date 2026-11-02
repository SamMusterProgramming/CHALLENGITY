import axios from "axios";
import { api, BASE_URL } from "./config";

export const createTalentRoom = async(body, setTalentRoom ,user_id , setUserContestantStatus, setUserParticipation ,setEdition, setIsLoading) =>{
  try {
    await api.post( `/talents/creates/`,body )
    .then(res =>  {
         setTalentRoom({...res.data})
         let edition = res.data.editions.find(e => e.status === "open")
         edition.nextUpdate = Date(edition.createdAt)
         switch (edition.round) {
          case 1:
            edition.title = "Elimination-Round 1"
            break;
          case 2:
              edition.title  = "Elimination-Round 2"
              break;
         case 3:    
              edition.title  = "Elimination-Round 3"
              break;
          case 4:
            edition.title  = "Eighth-finals"
            break;
          case 5:
              edition.title = "Quarter Final"
              break;
         case 6:
              edition.title  = "Semi Final"
              break;
         case 7:
                edition.title  = "Grand Final "
              break;
         case 8:
                edition.title  = "Winner"
              break;
          default:
            break;
         }
         setEdition(res.data.editions.find(e => e.status === "open"))
         if(res.data.contestants.length > 0) {
          const userParticipation = res.data.contestants.find((contestant)=> contestant.user_id === user_id) 
          userParticipation ? setUserContestantStatus("P") : setUserContestantStatus("NP")
          if(userParticipation){
          const rank = res.data.contestants.findIndex(contestant => contestant._id === userParticipation._id)
          userParticipation["rank"] = rank + 1
          setUserParticipation({userParticipation})
          }
        }else {
          setUserParticipation(null)
         setUserContestantStatus("NP")
        }
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const GetTalentRoomById = async(talentRoom_id, setTalentRoom ) =>{
  try {
    await api.get(`/talents/room/${talentRoom_id}` )
    .then(res =>  {
         setTalentRoom(res.data)
      } )
      .finally(()=>{
        // setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const GetTalentRoomsByName = async(queryParams,setTalentRooms ,  setIsLoading) =>{
  try {
    await api.get( `/talents/rooms`,{
      params: queryParams
  } )
    .then(res =>  {
         setTalentRooms(res.data)
       
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const getUserTalent = async(user_id , setUserTalents ) =>{
  try {
    await api.get( `/talents/user/talent/${user_id}` )
    .then(res =>  {
        setUserTalents(res.data)  
      })
      .finally(()=>{
        // setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const getUserTalentPerformances = async(user_id ,setUserTalentPerformances ) =>{
  try {
    await axios.get( BASE_URL + `/talents/user/performance/${user_id}` )
    .then(res =>  {
      setUserTalentPerformances(res.data)  
      })
      .finally(()=>{
        // setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const deleteContestantStage = async(talentRoom_id,body, setTalentRoom ,setUserParticipation, setIsLoading) =>{
  try {
    setIsLoading(true)
    await api.patch(`/talents/delete/contestant/stage/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
         setUserParticipation(res.data.contestants.find(c => c.user_id == body.user_id))
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const deleteContestantQueue = async(talentRoom_id,body, setTalentRoom ,setUserParticipation, setIsLoading) =>{
  try {
    setIsLoading(true)
    await api.patch( BASE_URL + `/talents/delete/contestant/queue/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
         setUserParticipation(res.data.contestants.find(c => c.user_id == body.user_id))
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const deleteContestantElimination = async(talentRoom_id,body, setTalentRoom ,setUserParticipation, setIsLoading) =>{
  try {
    setIsLoading(true)
    await api.patch( BASE_URL + `/talents/delete/contestant/Elimination/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
         setUserParticipation(res.data.contestants.find(c => c.user_id == body.user_id))
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const deletePerformanceStage = async(talentRoom_id,body, setTalentRoom ,setUserParticipation , setIsLoading) =>{
  try {
    setIsLoading(true)
    await api.patch( BASE_URL + `/talents/delete/performance/stage/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
         setUserParticipation(res.data.contestants.find(c => c.user_id == body.user_id))
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const deletePerformanceQueue = async(talentRoom_id,body, setTalentRoom ,setUserParticipation , setIsLoading) =>{
  try {
    setIsLoading(true)
    await api.patch( BASE_URL + `/talents/delete/performance/queue/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
         setUserParticipation(res.data.contestants.find(c => c.user_id == body.user_id))
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const backInQueue = async(talentRoom_id, body, setTalentRoom ,setUserParticipation , setIsLoading) =>{
  try {
    setIsLoading(true)
    await api.patch( BASE_URL + `/talents/back/queue/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
         setUserParticipation(res.data.contestants.find(c => c.user_id == body.user_id))
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const eliminationTalentRoom = async(talentRoom_id, setTalentRoom , setIsLoading) =>{
  try {
    setIsLoading(true)
    await axios.patch( BASE_URL + `/talents/elimination/${talentRoom_id}`)
    .then(res =>  {
         setTalentRoom(res.data)
       
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const addContestantToQue = async(talentRoom_id,body, setTalentRoom , setIsLoading) =>{
  try {
    setIsLoading(true)
    await axios.patch( BASE_URL + `/talents/queue/${talentRoom_id}`,body)
    .then(res =>  {
         setTalentRoom(res.data)
       
      } )
      .finally(()=>{
        setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const getTopTalents = async(user_id, setTalentRooms) =>{
  try {
    await axios.get( BASE_URL + `/talents/top/${user_id}` )
    .then(res =>  {
         setTalentRooms(res.data)
      } )
      .finally(()=>{
        // setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const likeTalentPost = async(post_id , body, setPostData , setIsLoading , setIsExpired) =>{
    try { 
    await api.post( `/talents/likes/${post_id}`,body )
    .then(res =>  {
         if(res.data === "expired") {
          return setIsExpired(true)
         } else
         setPostData(res.data)
      } )
      .finally(()=>{
        // setIsLoading(false)
      })
  } catch (error) {
    console.log(error)
  }
 }

export const voteTalentPost = async(post_id , body, setPostData ,setVoted , setIsExpired) =>{
  try { 
  await api.post( `/talents/votes/${post_id}`, body )
  .then(res =>  {
      if(res.data === "expired") {
       setIsExpired(true)
       setVoted(false)
       return ; 
      } else{
        setVoted(true)
        setPostData(res.data)
      }
    } )
    .finally(()=>{
      // setIsLoading(false)
    })
} catch (error) {
  console.log(error)
}
}

export const flagTalentPost = async(post_id , body, setPostData ,setIsExpired) =>{
  try { 
  await api.post( `/talents/flags/${post_id}`, body )
  .then(res =>  {
      if(res.data === "expired") {
      return setIsExpired(true)
      } else
       setPostData(res.data)
    } )
    .finally(()=>{
      // setIsLoading(false)
    })
} catch (error) {
  console.log(error)
}
}

export const getPostData = async(post_id , setPostData  , setIsExpired) =>{
  try { 
  await api.get(`/talents/post/${post_id}` )
  .then(res =>  {
    if(res.data === "expired") {
        setIsExpired(true)
     } else setPostData(res.data)
    } )
    .finally(()=>{
      // setIsLoading(false)
    })
} catch (error) {
  console.log(error)
}
}

//***************post comments, add , edit , delete */

export const addCommentContestant = async(post_id,body,setPostData) =>{
  try {
    await api.post( `/talents/post/comment/${post_id}`,body)
    .then(res =>  { 
         setPostData({...res.data})
      } )
  } catch (error) {
    console.log(error)
  }
 }

export const deleteTalentCommentsById = async(post_id,body,setPostData) =>{
  try {

    await api.patch(`/talents/post/comment/${post_id}`,body )
    .then(res =>  {
      setPostData({...res.data})
      } )
  } catch (error) {
    console.log(error)
  }
 }

    // *********************************** general challenge , talent  *************************
