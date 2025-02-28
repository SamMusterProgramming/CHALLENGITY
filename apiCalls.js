
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'



 const baseURL_DEVOLOPMENT = "http://localhost:8000"
 const baseURL_PRODUCTION = process.env.EXPO_PUBLIC_SERVER_URL


   


 
export const BASE_URL =  baseURL_DEVOLOPMENT

export const setLoadingBarAxios =(loadingRef) => {
  axios.interceptors.request.use(async(config) => {
    loadingRef.current.continuousStart();
   
  }, (error) => {
    loadingRef.current.complete();

  });
  
  axios.interceptors.response.use((response) => {
    loadingRef.current.complete();

  }, (error) => {
    loadingRef.current.complete();

  });
}

axios.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('jwt_token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};
const removeToken = async (token) => {
  try {
    await AsyncStorage.removeItem('jwt_token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};



// *********************************** AUTHENTIFICATION *************************

export const isAuthenticated = async(setUser)=>{

  try {
    await axios.get(BASE_URL +'/users/isAuthenticated')
    .then(res => { 
      console.log(res.data)
      setUser(res.data)
              //  if (res.data.auth) {
              //    storeToken(res.data.token)
              //    setUser({...res.data.user,isNewUser:false});
              //  }
              //  else setMessage(res.data.error)  
        })
  } catch (error) {
     console.log(error)     
  }
 
}
export const authLogin = async(credentiels,setUser,setMessage)=>{

    try {
      await axios.post(BASE_URL +'/users/login',credentiels)
      .then(res => { 
        console.log(res.data)
                 if (res.data.auth) {
                   storeToken(res.data.token)
                   setUser({...res.data.user,isNewUser:false});
                 }
                 else setMessage(res.data.error)  
          })
    } catch (error) {
       console.log(error)     
    }
   
}

export const authRegister= async(credentiels,setUser)=>{
   
  await axios.post( BASE_URL +'/users/',credentiels)
	.then(res => {
		if(res.status == 200 ) {
      setUser({...res.data ,isNewUser:true})
     }
		})
}

export const getUserById = async(user_id,setUserProfile) =>{
    try {
        await axios.get(BASE_URL+`/users/user/${user_id}`)
        .then(res => 
          { 
            setUserProfile({...res.data})
          } )
    } catch (error) {
        console.log(error)
    }

}

export const updateUser = async(user_id,rawBody,setUser,user)=> {
  try {
     await axios.patch(BASE_URL + `/users/user/${user_id}`,rawBody)
     .then(res =>{
      setUser( {...user,profile_img:res.data.profile_img,cover_img:res.data.cover_img} )
    } )
  } catch (error) {
     console.error(error)
  }
}
// *********************************** getChallenge by id *************************


export const getChallengeById = async(id,setChallenge,setIsExpired)=>{
   try {
    await axios.get(BASE_URL+ `/challenges/find/${id}`)
    .then(res =>
       {
        if(res.data === "post expired") setIsExpired(true)
          else setChallenge(res.data)
      } )
   } catch (error) {
      console.log(error)
   }
}


// *********************************** new Challenge /top challenger *************************

export const getUserChallenges = async( user_id , setChallenges)=>{
 
    try {
        await axios.get( BASE_URL + `/challenges/original/${user_id}`)
        .then(res => {
            setChallenges(res.data) 
        }
         )
    } catch (error) {
        console.log(error)
    }
  }  

  export const getUserParticipateChallenges = async( user_id , setChallenges)=>{
     try {
         await axios.get( BASE_URL + `/challenges/participate/${user_id}`)
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


   // *********************************** likes and votes data *************************

     
    export const loadLikeVoteData= async(ids,setLikesVotesData,likesVotesData,setIsExpired)=> {

    try {
      await axios.get( BASE_URL + '/challenges/load/like/', {
        params:{
            ids: ids.join(',')
        }
     } )
      .then(res => {
        //  console.log(res.data)
         if(res.data === "post expired") setIsExpired(true)
         else setLikesVotesData({...likesVotesData,isLiked:res.data.isLiked,like_count:res.data.like_count,
        isVoted:res.data.isVoted,vote_count:res.data.vote_count}) 
    })
    } catch (error) {
      console.log(error)
    }
  }

  export const liked = async(ids,setLikesVotesData,likesVotesData, setIsExpired)=>{
    try {
        await axios.get( BASE_URL + `/challenges/challenge/like/`, {
          params:{
              ids: ids.join(',')
          }
       } )
        .then(res => { if(res.data === "post expired") setIsExpired(true)
          else
          setLikesVotesData({...likesVotesData,isLiked:res.data.isLiked,like_count:res.data.like_count})
        } )
      } catch (error) {
        console.log(error)
      }
  }

  export const voted = async(ids,setLikesVotesData,likesVotesData,setIsExpired)=>{
    try {
        await axios.get( BASE_URL + `/challenges/challenge/vote/`, {
          params:{
              ids: ids.join(',')
          }
       } )
        .then(res =>  { if(res.data === "post expired") setIsExpired(true)
          else
          setLikesVotesData({...likesVotesData,isVoted:res.data.isVoted,vote_count:res.data.vote_count})} )
      } catch (error) {
        console.log(error)
      }
  }

  // *********************************** follower and following *************************


    export const getFollowData = async(user_id ,setFollower)=>{
      try {
        await axios.get( BASE_URL + `/users/follow/data/${user_id}`)
        .then(res =>  { const data = res.data
          setFollower( {...data} ) 
      } )
      } catch (error) {
        console.log(error)
      }
     }


    export const isfollowing = async(user_id , follower_id, setIsFollowing)=>{
      try {
        await axios.post( BASE_URL + `/users/followers/${user_id}` ,{follower_id:follower_id} )
        .then(res =>  { 
          setIsFollowing({isfollowing:res.data.isfollowing})
      } )
      } catch (error) {
        console.log(error)
      }
     }


     // followings 

    export const addFollowing = async(user_id , rawBody , setFollow) =>{
      try {
        await axios.post( BASE_URL + `/users/followings/add/${user_id}`, rawBody )
        .then(res =>  { 
          setFollow([...res.data]);
          } )
       
      } catch (error) {
        console.log(error)
      }
     }
 

    export const getFollowings = async(user_id , setFollowings)=>{
      try {
        await axios.get( BASE_URL + `/users/followings/${user_id}` )
        .then(res =>  { 
          setFollowings(res.data)
      } )
      } catch (error) {
        console.log(error)
      }
     }

     export const unFollowings = async(user_id ,rawBody, setFollow)=>{
      try {
        await axios.patch( BASE_URL + `/users/unfollowing/${user_id}`,rawBody )
        .then(res =>  { 
          setFollow([...res.data])
      } )
      } catch (error) {
        console.log(error)
      }
     }

  //*********************** Friends request , adding */
   
  export const friendRequest = async(receiver_id , rawBody , setFriendRequest) =>{
    try {
      await axios.post( BASE_URL + `/users/friends/request/${receiver_id}`, rawBody )
      .then(res =>  { 
        setFriendRequest({...res.data});
        } )
     
    } catch (error) {
      console.log(error)
    }
   }
   export const unfriendRequest = async(receiver_id , rawBody , setFriendRequest) =>{
    try {
      await axios.post( BASE_URL + `/users/friends/unfriend/${receiver_id}`, rawBody )
      .then(res =>  { 
        setFriendRequest({...res.data});
        } )
     
    } catch (error) {
      console.log(error)
    }
   }
   export const removeFriendRequest = async(receiver_id,rawBody,setFriendRequest)=>{
    try {
      await axios.post( BASE_URL + `/users/friends/cancel/${receiver_id}`, rawBody )
      .then(res =>  {  
        setFriendRequest({...res.data});
        } )
    } catch (error) {
      console.log(error)
    }
   }
   export const getUserFriendsData = async(receiver_id , setFriendRequest) =>{
    try {
      await axios.get( BASE_URL + `/users/friends/list/${receiver_id}` )
      .then(res =>  { 
        setFriendRequest({...res.data}) 
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

   export const denyFriendRequest = async(receiver_id,rawBody,setFriendRequest)=>{
    try {
      await axios.post( BASE_URL + `/users/friends/deny/${receiver_id}`, rawBody )
      .then(res =>  { 
        setFriendRequest({...res.data});
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

   export const acceptFriendRequest = async(receiver_id,rawBody,setFriendRequest)=>{
    try {
      await axios.post( BASE_URL + `/users/friends/accept/${receiver_id}`, rawBody )
      .then(res =>  {  
        setFriendRequest({...res.data});
        } )
     
    } catch (error) {
      console.log(error)
    }
   }
    
   //******************************** notifications */


   export const getNotificationByUser = async(receiver_id ,setNotification) =>{
    try {
      await axios.get( BASE_URL + `/users/notifications/${receiver_id}` )
      .then(res =>  { 
        setNotification(res.data);
        } )
    } catch (error) {
      console.log(error)
    }
   }
   
  export const updateNotificationByUser = async(_id , setNotification) =>{
    try {
      await axios.patch( BASE_URL + `/users/notifications/${_id}` )
      .then(res =>  { 
        setNotification(res.data);
        } )
    } catch (error) {
      console.log(error)
    }
   }
 

   export const deleteUserNotification = async(_id,setNot) =>{
    try {
      await axios.delete( BASE_URL + `/users/notifications/${_id}` )
      .then(res =>  { 
           setNot(res.data)
        } )
    } catch (error) {
      console.log(error)
    }
   }
   
  // export const getNotificationById = async()