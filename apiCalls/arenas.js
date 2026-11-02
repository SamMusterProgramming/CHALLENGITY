import axios from "axios";
import { api, BASE_URL } from "./config";

export const createArenaByUser = async (user_id , data ) => {
      try {
           const response = await api.post(
          `/arenas/create/${user_id}`,  data);
        return response.data;
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const updateArenaByUser = async (arena_id , data ) => {
      try {
           const response = await api.post(
          `/arenas/update/${arena_id}`, data);
        return response.data;
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const deleteArenaByUser = async (arena_id , data ) => {
      try {
           const response = await api.post(
          `/arenas/delete/${arena_id}`,  data);
        return response.data;
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const getArenaByUser = async (user_id ,  setArenas  ) => {
      try {
           const response = await api.get(
          `/arenas/user/${user_id}`);
          //  if(response.data.length) setSelectedArena( !arena_id ? response.data[0] : response.data.find(a => a._id === arena_id))
            setArenas(response.data);
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const getArenaById = async (user_id ,arena_id ) => {
      try {
           const response = await api.get(
          `/arenas/arena?userId=${user_id}&arenaId=${arena_id}`);
           return response.data
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const getArenaByProfile = async (profile_id ,body, setSelectedArena , setArenas, arena_id  ) => {
      try {
           const response = await api.post(
          `/arenas/profile/${profile_id}`,body);
           if(response.data.length) setSelectedArena( !arena_id ? response.data[0] : response.data.find(a => a._id === arena_id))
           setArenas(response.data);
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const getLocalArenas = async (arena_id , body , setArenas ) => {
      try {
           const response = await api.get(
          `/arenas/local/arena/${arena_id}`,body);
          //  if(response.data.length) setSelectedArena(response.data[0])
           setArenas(response.data);
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const getUserSpotlights = async (userId , setSpotlights ) => {
      try {
           const response = await api.get(
          `/arenas/spotlights/${userId}`);
           setSpotlights(response.data);
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const addPerformanceToArena = async (arena_id , body) => {
      try {
           return  await api.post(`/arenas/post/addPost/${arena_id}`, body);
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
    };

export const getPostsArena = async (arena_id , setPosts ) => {
      try {
           const response = await api.get(`/arenas/posts/${arena_id}`);
          setPosts([...response.data]);
      } catch (error) {
        console.error("getting posts error:", error.response?.data);
        throw error;
      }
    };

export const  deleteArenaPost = async (post_id ,  setArena , setUserArenas) => {
      try {
           const response = await api.delete(`/arenas/post/${post_id}`);
          setArena(response.data.selectedArena);
          setUserArenas(response.data.arenas)
      } catch (error) {
        console.error("getting posts error:", error.response?.data);
        throw error;
      }
    };

export const toggleStarArena = async (
      body
    ) => {
      try {
        const response = await api.patch(
          `/arenas/arena/star/`,
          body
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

export const isUserStarredArena = async (
      body
    ) => {
      try {
        const response = await api.get(
          `/arenas/arena/isStarred/`,
          body
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

export const toggleFollowerArena = async (
      body
    ) => {
      try {
        const response = await api.patch(
          `/arenas/arena/follower/`,
          body
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

export const isUserFollowingArena = async (
      body
    ) => {
      try {
        const response = await api.get(
          `/arenas/arena/isFollowing/`,
          body
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

export const toggleArenaPostSpotlight = async(post_id)=>{
      try {
        const response = await api.patch(`/arenas/post/spotlight/${post_id}`);
        //  setArena(response.data);
      } catch (error) {
        console.error("getting posts error:", error.response?.data);
        throw error;
     }
    }

export const isUserFiredPost = async (
      body
    ) => {
      try {
        const response = await api.patch(
          `/arenas/post/isFired/`,
          body
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

export const toggleArenaPostFire = async( body )=>{
      try {
        const response = await api.patch(`/arenas/post/fire/`,body);
       return response.data
      } catch (error) {
        console.error("getting posts error:", error.response?.data);
        throw error;
      }
    }

export const registerView = async(post_id )=>{
      try {
        const response = await api.patch(`/arenas/post/view/${post_id}`);
      } catch (error) {
        console.error("getting posts error:", error.response?.data);
        throw error;
      }
    }

export const getArenaPostComments = async(postId) => {
      try {
           const response = await api.get(`/arenas/post/comment/${postId}`);
           return response.data
      } catch (error) {
        console.error("getting posts error:", error.response?.data);
        throw error;
      }
    };

export const addArenaPostComment = async (postId , body) => {
    try {
      const response =  await api.post(`/arenas/post/addComment/${postId}`, body);
      return response.data
    } catch (error) {
      console.error("creating arena error:", error.response?.data);
      throw error;
    }
    }

export const deleteArenaPostComment = async ( body) => {
      try {
        const response =  await api.patch(`/arenas/post/deleteComment/`, body);
        return response.data
      } catch (error) {
        console.error("creating arena error:", error.response?.data);
        throw error;
      }
      }

export const getGlobalSpotlightPerformances = async (page = 1 ) => {
        try {
            return  await api.get(
                `/arenas/global/spotlightPerformances?page=${page}`
            );
        } catch (error) {
            console.log(
                "Spotlight performances error:",
                error.response?.data || error.message
            );
            throw error;
        }
    };

export const getRegionalSpotlightPerformances = async (page = 1 , countryCode ="US" ) => {
      try {
        return await api.get(
          `/arenas/regional/spotlightPerformances?page=${page}&countryCode=${countryCode}`
        );
      } catch (error) {
          console.log(
              "Spotlight performances error:",
              error.response?.data || error.message
          );
          throw error;
      }
  };

export const getLocalSpotlightPerformances = async (page = 1 , countryCode ="US" ) => {
      try {
        return await api.get(
          `/arenas/local/spotlightPerformances?page=${page}&countryCode=${countryCode}`
        );
      } catch (error) {
        console.log(
            "Spotlight performances error:",
            error.response?.data || error.message
        );
        throw error;
     }
    };

export const getFollowedArenas = async (userId, page = 1 , setArenas) => {
      try {
        const response = await api.get(
          `/arenas/following?userId=${userId}&page=${page}`
        );
        setArenas(response.data);
      } catch (error) {
        throw error;
      }
    };

export const getRegionalArenas = async(region , setRegionalArenas) =>{
      try {
        await api.get(`/arens/region/${region}` )
        .then(res =>  {
          const arenas = res.data ; 
          setRegionalArenas([...arenas])  
          })
          .finally(()=>{
            // setIsLoading(false)
          })
      } catch (error) {
        console.log(error)
      }
     }
    

  // search
