import axios from "axios";
import { api, BASE_URL } from "./config";

export const getNotificationByUser = async(receiver_id ,setNotification) =>{
    try {
      await api.get( `/users/notifications/${receiver_id}` )
      .then(res =>  { 
        setNotification(res.data);
        } )
    } catch (error) {
      console.log(error)
    }
   }

export const updateNotificationByUser = async(_id , setNotification) =>{
    try {
      await api.patch( `/users/notifications/${_id}` )
      .then(res =>  { 
        setNotification(res.data);
        } )
    } catch (error) {
      console.log(error)
    }
   }

export const markNotificationRead = async(_id) =>{
    try {
      await api.patch( `/users/notifications/${_id}` )
      .then(res =>  { 
        return res.data
        } )
    } catch (error) {
      console.log(error)
    }
   }

export const deleteUserNotification = async(_id,setNot) =>{
    try {
      await api.delete( `/users/notifications/${_id}` )
      .then(res =>  { 
           setNot(res.data)
        } )
    } catch (error) {
      console.log(error)
    }
   }
   
// *********************************** comments , postdata , likes votes *************************
