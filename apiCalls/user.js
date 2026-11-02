import axios from "axios";
import { api, BASE_URL } from "./config";

export const getUserById = async(user_id,setUserProfile) =>{
    try {
        await api.get(`/users/user/${user_id}`)
        .then(res => 
          { 
            // res.data.profile_img = "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68"
            setUserProfile({...res.data})
          } )
    } catch (error) {
        console.log(error)
    }
}

export const updateUserInfo = async(user_id,rawBody)=> {
  try {
    return  await api.patch(`/users/user/${user_id}`,rawBody)
 

  } catch (error) {
     console.error(error)
  }
}

export const searchUsers = async(user_id,searchQuery,setData , setIsFetching)=>{
  try {
    await axios.get(BASE_URL +`/users/find/search?name=${searchQuery}`)
    .then(res => { 
               const users =  res.data.users.filter(user=> user._id !== user_id) 
               setData({users:users})
               
        })
  } catch (error) {
     console.log(error)     
  }
 finally {
  setTimeout(() => {
    setIsFetching(false);
  }, 1000);

  }
}

export const deletePushToken = async(user_id)=> {
  try {
     await api.patch(`/users/pushexpotoken/delete/${user_id}`)
  } catch (error) {
     console.error(error)
  }
}

// *********************************** getChallenge by id *************************



export const getuserFollowers = async(user_id ,setFollowers)=>{
      try {
        await api.get(`/users/followers/${user_id}`)
        .then(res =>  
          setFollowers(res.data) 
       )
      } catch (error) {
        console.log(error)
      }
    }

export const getuserFollowings = async(user_id ,setFollowings)=>{
      try {
        await api.get(`/users/followings/${user_id}`)
        .then(res =>  
          setFollowings(res.data) 
       )
      } catch (error) {
        console.log(error)
      }
    }

export const isfollowing = async(user_id , follower_id, setIsFollowing)=>{
      try {
        await api.post(`/users/followers/${user_id}` ,{follower_id:follower_id} )
        .then(res =>  { 
          setIsFollowing({isfollowing:res.data.isfollowing})
      } )
      } catch (error) {
        console.log(error)
      }
     }


     // followings

export const addFollowing = async(senderId , receiverId , setFollow) =>{
      try {
        await api.post(  `/users/followings/add/`,{}, {
          params: {
            senderId,
            receiverId,
          },
        } )
        .then(res =>  { 
          setFollow(res.data);
          } )
      } catch (error) {
        console.log(error)
      }
     }



export const unFollowings = async(senderId , receiverId, setFollow)=>{
      try {
        await api.patch(  `/users/unfollowing/`,{}, {
          params: {
            senderId,
            receiverId,
          },
        }  )
        .then(res =>  { 
          setFollow(res.data)
      } )
      } catch (error) {
        console.log(error)
      }
  }

  export const removeFollower = async(senderId , receiverId, setFollow)=>{
    try {
      await api.post( `/users/removeFollower/`,{}, {
        params: {
          senderId,
          receiverId,
        },
      }  )
      .then(res =>  { 
        setFollow(res.data)
    } )
    } catch (error) {
      console.log(error)
    }
}

export const getFollowshipStatus = async (
  user_id,
  profile_id
) => {
  try {
    const response = await api.get(
      "/users/followship/status/",
      {
        params: {
          user_id,
          profile_id,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "getFriendshipStatus error:",
      error
    );

    throw error;
  }
};


  //*********************** Friends request , adding , postdata  */

export const getFriendshipStatus = async (
    user_id,
    profile_id
  ) => {
    try {
      const response = await api.get(
        "/users/friendship/status/",
        {
          params: {
            user_id,
            profile_id,
          },
        }
      );
  
      return response.data;
  
    } catch (error) {
      console.error(
        "getFriendshipStatus error:",
        error
      );
  
      throw error;
    }
  };

export const friendRequest = async(senderId , receiverId, setFriendRequest , setExist) =>{
    try {
      await api.post(`/users/friends/request/`,{},
        {
          params: {
            senderId,
            receiverId,
          },
        } )
      .then(res =>  { 
        if(res.data == "exist"){
            setExist(true)
        }else
        setFriendRequest(res.data);
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

export const unfriendRequest = async(senderId , receiverId , setFriendRequest) =>{
    try {
      await api.post( `/users/friends/unfriend/`,{},
        {
          params: {
            senderId,
            receiverId,
          },
        })

      .then(res =>  { 
        setFriendRequest({...res.data});
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

export const removeFriendRequest = async(senderId ,receiverId ,setFriendRequest)=>{
    try {
      await api.post(`/users/friends/cancel/`,{},
        {
          params: {
            senderId,
            receiverId,
          },
        })
      .then(res =>  {  
        setFriendRequest(res.data);
        } )
    } catch (error) {
      console.log(error)
    }
   }

export const getUserFriends = async(receiver_id , setFriendRequest) =>{
    try {
      await api.get(  `/users/friends/list/${receiver_id}` )
      .then(res =>  { 
        setFriendRequest({...res.data}) 
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

export const getUserFriendRequestReceived = async(receiver_id , setFriendRequest) =>{
    try {
      await api.get(  `/users/friendRequests/received/${receiver_id}` )
      .then(res =>  { 
        setFriendRequest(res.data) 
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

export const denyFriendRequest = async(senderId ,receiverId,setFriendRequest)=>{
    try {
      await api.post(  `/users/friends/deny/`,{},
        {
          params: {
            senderId,
            receiverId,
          },
        } )
      .then(res =>  { 
        setFriendRequest(res.data);
        } )
     
    } catch (error) {
      console.log(error)
    }
   }

export const acceptFriendRequest = async(senderId ,receiverId, setFriends , setFriendRequests )=>{
    try {
      await api.post( `/users/friends/accept/`, 
        {},
        {
          params: {
            senderId,
            receiverId,
            // notificationId
          },
        }
       )
      .then( res =>  {  
        setFriendRequests(res.data.requests);
        setFriends (res.data.friends)
        } )
     
    } catch (error) {
      console.log(error)
    }
   }
    
   //******************************** notifications */
