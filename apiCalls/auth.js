import axios from "axios";
import { api, BASE_URL, saveToken } from "./config";

export const isAuthenticated = async(setUser)=>{
  try {
    await axios.get(BASE_URL +'/users/isAuthenticated')
    .then(res => { 
      setUser(res.data)
        })
  } catch (error) {
     console.log(error)     
  }
 
}

export const authLogin = async(credentiels,setUser,setMessage,setIsFetching)=>{

    try {
      
      await axios.post(BASE_URL +'/users/login',credentiels)
      .then(res => { 
                 if (res.data.auth) {
                   setIsFetching(true)
                   saveToken(res.data.token)
                   setUser({...res.data.user,isNewUser:false});
                 }
                 else {
                  setIsFetching(false)
                  setMessage(res.data.error) }
          })
    } catch (error) {
       console.log(error)     
    }
  //  finally {
  //   setIsFetching(false);
  //   }
}

export const authRegister = async(credentiels,setUser,setMessage,setIsFetching)=>{
  try {
    await axios.post( BASE_URL +'/users/',credentiels)
    .then(res => {
      console.log(res.data)
      if(res.data.auth) {
        saveToken(res.data.token)
        setUser({...res.data.user,isNewUser:true});
       }
       else setMessage(res.data.error)
      })
  } catch (error) {
    console.log(error)  
  } 
  finally {
    setIsFetching(false);
    }
 
}
