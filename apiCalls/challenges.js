import axios from "axios";
import { api, BASE_URL } from "./config";

export const getChallengeById = async(id,setChallenge,setIsExpired)=>{
   try {
    await axios.get(BASE_URL+ `/challenges/find/${id}`)
    .then(res =>
       {
        if(res.data === "post expired") setIsExpired(true)
          else {
         setChallenge(res.data)
        }
      } )
   } catch (error) {
      console.log(error)
   }
}


// *********************************** new Challenge /top challenger *************************

export const getUserAllChallenges = async( user_id , setChallenges)=>{
 
  try {
      await axios.get( BASE_URL + `/challenges/all/${user_id}`)
      .then(res => {
          setChallenges(res.data) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}

export const getUserChallengeInvites = async( user_id , setChallenges)=>{
 
  try {
      await axios.get( BASE_URL + `/challenges/invites/${user_id}`)
      .then(res => {
          setChallenges(res.data) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}

export const getUserPublicChallenges = async( user_id , setChallenges)=>{
 
    try {
        await axios.get( BASE_URL + `/challenges/original/public/${user_id}`)
        .then(res => {
            setChallenges([...res.data]) 
        }
         )
    } catch (error) {
        console.log(error)
    }
  }

export const getUserPrivateChallenges = async( user_id , setChallenges)=>{
 
    try {
        await axios.get( BASE_URL + `/challenges/original/private/${user_id}`)
        .then(res => {
            setChallenges([...res.data]) 
        }
         )
    } catch (error) {
        console.log(error)
    }
  }

export const getUserPublicParticipateChallenges = async( user_id , setChallenges)=>{
     try {
         await axios.get( BASE_URL + `/challenges/participate/public/${user_id}`)
         .then(res => {
             setChallenges(res.data) 
         }
          )
     } catch (error) {
         console.log(error)
     }
   }

export const getUserPrivateParticipateChallenges = async( user_id , setChallenges)=>{
    try {
        await axios.get( BASE_URL + `/challenges/participate/private/${user_id}`)
        .then(res => {
            setChallenges(res.data) 
        }
         )
    } catch (error) {
        console.log(error)
    }
  }  

  //top challenges

export const getTopChallenges = async( user_id , setChallenges)=>{
  
     try {
         await axios.get( BASE_URL + `/challenges/top/${user_id}`)
         .then(res => {
             setChallenges(res.data) 
         }
          )
     } catch (error) {
         console.log(error)
     }
   }

export const quitChallenge = async(challenge_id, user_id)=> {
    try {
       await axios.patch(BASE_URL + `/challenges/quit/${challenge_id}`,{user_id:user_id})
    } catch (error) {
       console.log(error)
    }
}

export const deleteChallenge = async(challenge_id, user_id)=> {
    try {
      return await axios.patch(BASE_URL + `/challenges/quit/${challenge_id}`,{user_id:user_id})
    } catch (error) {
       console.log(error)
    }
}

export const getUserActivities = async( user_id , setData)=>{
  try {

    Promise.all([axios.get( BASE_URL + `/challenges/user/${user_id}`), axios.get( BASE_URL + `/talents/user/${user_id}`)]) 
    .then(res =>  {
      const data = []
      if(res[0].data.length > 0) {
           res[0].data.forEach(element => {
                data.push({...element , dataType:"challenge" })
           });
       } 
      if(res[1].data.length > 0) {
          res[1].data.forEach(element => {
             data.push({...element , dataType:"talent" })
          });  
      } 
      data.sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt) )
      data.forEach(e => console.log(e.updatedAt))
      setData(data)
      } )

      // await axios.get( BASE_URL + `/challenges/user/${user_id}`)
      // .then(res => {
      //   const data = []
      //   if(res.data.length > 0) {
      //        res.data.forEach(element => {
      //             data.push({...element , dataType:"challenge" })
      //        });
      //    } 
      //     setChallenges(data) 
      // }
      //  )
  } catch (error) {
      console.log(error)
  }
}  

// *********************************** viewers *************************

export const getPostViewers = async( post_id , setViewers)=>{
 
  try {
      await axios.get( BASE_URL + `/challenges/viewer/${post_id}`)
      .then(res => {
          if(!res.data){
            setViewers("no") 
          }else
          setViewers({...res.data}) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}

export const addViewer = async( post_id , rawBody, setViewersList)=>{
 
  try {
      await axios.post( BASE_URL + `/challenges/viewer/${post_id}`,rawBody)
      .then(res => {
          setViewersList({...res.data}) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}  


// *********************************** favourites *************************


// export const addToFavourite = async(user_id ,body, setData,setIsExpired)=>{
 
//   try {
//       await axios.post( BASE_URL + `/challenges/favourite/${user_id}`,body)
//       .then(res => {
//          if(res.data === "challenge expired") return setIsExpired(true)
//           setData(res.data) 
//       }
//        )
//   } catch (error) {
//       console.log(error)
//   }
// }  

// export const removeFromFavourite = async(user_id ,body, setChallenges,setIsExpired)=>{
 
//   try {
//       await axios.patch( BASE_URL + `/challenges/favourite/${user_id}`,body)
//       .then(res => {
//           if(res.data === "challenge expired") return setIsExpired(true)
//           setChallenges(res.data) 
//       }
//        )
//   } catch (error) {
//       console.log(error)
//   }
// }

export const addChallengeToFavourite = async(user_id ,body, setData,setIsExpired)=>{
 
  try {
      await axios.post( BASE_URL + `/challenges/favourite/${user_id}`,body)
      .then(res => {
         if(res.data === "challenge expired") return setIsExpired(true)
          setData(res.data) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}

export const removeChallengeFromFavourite = async(user_id ,body, setData,setIsExpired)=>{
 
  try {
      await axios.patch( BASE_URL + `/challenges/favourite/${user_id}`,body)
      .then(res => {
          if(res.data === "challenge expired") return setIsExpired(true)
          setData(res.data) 
      } )
  } catch (error) {
      console.log(error)
  }
}

export const getFavouriteList = async(user_id ,setChallenges)=>{
 
  try {
      await axios.get( BASE_URL + `/challenges/favourite/${user_id}`)
      .then(res => { 
          setChallenges(res.data) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}

export const updateChallengeMode = async(challenge_id , body ,setChallenges)=>{
 
  try {
      await axios.patch( BASE_URL + `/challenges/mode/${challenge_id}`,body)
      .then(res => { 
          setChallenges(res.data) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}

export const updateThumbNail = async(challenge_id , body ,setThumb)=>{
 
  try {
      await axios.patch( BASE_URL + `/challenges/update/${challenge_id}`,body)
      .then(res => { 
        console.log(res.data)
          setThumb(res.data.thumbNail_URL) 
      }
       )
  } catch (error) {
      console.log(error)
  }
}  



   // *********************************** likes and votes postdata challenge *************************

export const getChallengePostData = async(post_id ,body, setPostData  , setIsExpired) =>{
    try { 
    await axios.post( BASE_URL + `/challenges/post/${post_id}`,body )
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

export const likeChallengePost = async(post_id , body, setPostData , setIsLoading , setIsExpired) =>{
    try { 
    await axios.post( BASE_URL + `/challenges/likes/${post_id}`,body )
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

export const voteChallengePost = async(post_id , body, setPostData ,setIsExpired) =>{
  try { 
  await axios.post( BASE_URL + `/challenges/votes/${post_id}`, body )
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

export const flagChallengePost = async(post_id , body, setPostData ,setIsExpired) =>{
  try { 
  await axios.post( BASE_URL + `/challenges/flags/${post_id}`, body )
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

export const getCommentsByPost = async(post_id,setComments) =>{
  try {
    await api.get( `/challenges/posts/${post_id}` )
    .then(res =>  { 
         setComments(res.data)
      } )
  } catch (error) {
    console.log(error)
  }
 }

export const addCommentsByPost = async(post_id,body,setComments) =>{
  try {
    await api.post( `/challenges/posts/${post_id}`,body)
    .then(res =>  { 
         setComments({...res.data})
      } )
  } catch (error) {
    console.log(error)
  }
 }

export const deleteCommentsById = async(post_id,body,setComments) =>{
  try {
    await api.patch( `/challenges/posts/comment/${post_id}`,body )
    .then(res =>  {
         setComments(res.data)
      } )
  } catch (error) {
    console.log(error)
  }
 }


 // *********************************** Talents *************************


 // *********************************** create Talent *************************
