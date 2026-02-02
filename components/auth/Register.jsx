import { View, Text, useWindowDimensions, TouchableOpacity, Vibration, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormField from '../custom/FormField'
import { useGlobalContext } from '../../context/GlobalProvider';
import { ActivityIndicator } from 'react-native-web';
import { authRegister } from '../../apiCalls';
import { icons } from '../../constants';

export default function Register({setAuthType}) {
    const {user,setUser,userPublicChallenges, setUserPublicChallenges,setUserPrivateChallenges,setPublicParticipateChallenges,setFavouriteChallenge
        ,setPrivateParticipateChallenges,setFollow ,notifications ,setNotifications,followings,setFollowings,userFriendData,setUserFriendData,trendingChallenges,setTrendingChallenges
      } = useGlobalContext()
    const { width, height } = useWindowDimensions();
    const [form, setForm] = useState({
        firstname:"",
        lastname:"",
        email:"",
        username:"",
        password:"",
        confirm:"",
        profile_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2Favatar.jpg?alt=media&token=25ae4701-e132-4f15-a522-5b9332d2c0b2",
        cover_img:"https://firebasestorage.googleapis.com/v0/b/challengify-wgt.firebasestorage.app/o/avatar%2F67.jpg?alt=media&token=d32c765c-31bc-4f74-8925-de45b2640544"
      })
    const [message,setMessage] = useState("")
    const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
    const [isEmailWrong, setIsEmailWrong] = useState(false); 
    const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
    const [isFirstnameInvalid, setIsFirstnameInvalid] = useState(false); 
    const [isLastnameInvalid, setIsLastnameInvalid] = useState(false); 
    const [isFetching, setIsFetching] = useState(false);


    /************************************************************************ register here ************************/
  const handleRegistration = ()=> {
    if(!validateFirstname(form.firstname)) {
      Vibration.vibrate();
      setIsFirstnameInvalid(true)
      return true
     }
     if(!validateLastname(form.lastname)) {
      Vibration.vibrate();
      setIsLastnameInvalid(true)
      return true
     }
     if(!validateEmail(form.email)) {
      Vibration.vibrate();
      setIsEmailInvalid(true)
      return true
     }
     if(!validatePassword(form.password)) {
      Vibration.vibrate();
      setIsPasswordInvalid(true)
      return true
     }
     if(form.password !== form.confirm) {
      Vibration.vibrate();
      setIsPasswordWrong(true)
      return true;
     }
    //  setIsFetching(true)
     authRegister(form,setUser,setMessage,setIsFetching)
  }

  //**********************************************************************form validation ********************** */

function validateFirstname(firstname) {
    const re = /^[a-zA-Z\s'-]+$/i;
    return re.test(firstname);
  }
  function validateLastname(lastname) {
    const re = /^[a-zA-Z\s'-]+$/i;
    return re.test(lastname);
  }
  function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
  }
  function validatePassword(passwordRegex) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return re.test(passwordRegex)
  }
  
  
  useEffect(() => {
    if(isFirstnameInvalid) {
      setMessage("Invalid firstname must end with one or more letters  ")
      setTimeout(() => {
        setIsFirstnameInvalid(false)
      }, 2000);
    } 
    if(isLastnameInvalid) {
      setMessage("Invalid Lastname must end with one or more letters  ")
      setTimeout(() => {
        setIsLastnameInvalid(false)
      }, 2000);
    } 
    if(isEmailInvalid) {
      setMessage("Invalid Email, must contain @ , com ... ")
      setTimeout(() => {
        setIsEmailInvalid(false)
      }, 2000);
    } 
    if(isEmailWrong) {
      setTimeout(() => {
        setMessage("")
        setIsEmailWrong(false)
      }, 2000);
    } 
    if(isPasswordInvalid) {
      setTimeout(() => {
        setMessage("Invalid Password, must contain special character,...")
        setIsPasswordInvalid(false)
      }, 2000);
    }
    if(isPasswordWrong) {
      setMessage("password and confirm password don't match")
      setTimeout(() => {
        setIsPasswordWrong(false)
      }, 2000);
    }
  }, [isEmailInvalid, isEmailWrong , isPasswordInvalid , isPasswordWrong, isFirstnameInvalid,isLastnameInvalid])
  
  useEffect(() => {
    if(message == "email exist already") {
     Vibration.vibrate();
     setIsEmailWrong(true)
    }
  }, [message])

//   useEffect(() => {
//     if(user) {
//       setIsFetching(true)
//       getUserPublicChallenges(user._id,setUserPublicChallenges)
//       getUserPrivateChallenges(user._id,setUserPrivateChallenges)
//       getUserPublicParticipateChallenges(user._id ,setPublicParticipateChallenges)
//       getUserPrivateParticipateChallenges(user._id ,setPrivateParticipateChallenges)
//       getNotificationByUser(user._id , setNotifications)
//       getFollowings(user._id,setFollowings)  
//       getUserFriendsData(user._id,setUserFriendData)
//       getFollowData(user._id,setFollow)
//       getFavouriteChallenges(user._id,setFavouriteChallenge)
//       getTopChallenges(user._id,setTrendingChallenges)
//       setTimeout(() => {
//         router.replace('/timeline')
//         setIsFetching(false)
//       }, 1000);
//       setTimeout(() => {
//         console.log(user.isNewUser)
//         user.isNewUser && router.push('/SetUpProfile')
//       }, 1500);
      
//     }
//   }, [user])
  

  return (
    <View className="bg-black white w-[100%] min-h-[100px] flex-col flex-1 justify-start items-center round ed-xl">
       
       <View
              className ="g-[#f29756] w-full te xt-center px-2 py-4 m -[40px] gap-2 items-center px- flex-col">
                   
                   
                    <Text
                     className ="font-bold text-blue-300"
                     style={ {fontSize: 11,fontStyle: 'italic', marginTop : 0 ,marginBottom: 0,textAlign:"start"}}>
                        Unleash Talent. Share Challenges
                    </Text>
                    <Text
                     className ="font-bold text-blue-300"
                     style={ {fontSize: 11,fontStyle: 'italic', marginTop : 0 ,marginBottom: 10,textAlign:"start"}}>
                         Break Records.
                    </Text>
                    <Text 
                    className ="font-black"
                    style={{fontSize: 13,color: '#fff',lineHeight: 22,textAlign:"center"}}>
                        Step into the spotlight with <Text >Challengify</Text> — the ultimate stage where everyday legends rise!
                    </Text>

         </View>
         <Image                                                                  
            className="w-[98%] h-[20%] rounded-3xl"
            source={icons.challengify_logo}
            resizeMode='cover'
           />      

        
        <View
                  className="flex- 1  bg-[#000000] flex-col p-1 mt-[20] justify-center item-center">
                                    <Text 
                                        style={{fontSize:16,
                                                 color:'white'}}
                                        className="  font-bold text-sm text-white">
                                                REGISTER               
                                    </Text>  
         </View>

         <View className="w-[100%]  justify-start mt-auto py-2  gap-3 flex-col items-center">  
                <View className="  w-[90%] h-[5vh] flex-col -auto justify-center items-centert ">
                          {(isEmailWrong || isEmailInvalid || isPasswordInvalid 
                            || isPasswordWrong || isFirstnameInvalid || isLastnameInvalid)&& <Text className="text-gray-400 text-sm text-center ">{message}</Text>}
                </View>
                  <View className="justify-center items-center w-[90%] m t-4 flex-row gap- 4">
                     <Text className="text-sm text-gray-100 font-semibold">
                       Already have an account ? {' '}
                     </Text>
                     <TouchableOpacity 
                        onPress={()=>{
                          setAuthType('login')
                        }}
                        className=" text-center"
                           >
                          <Text className=" text-md text-blue-300 font-semibold">
                              Login
                          </Text>
                        </TouchableOpacity>
                 </View>
                <View
                 className="w-[98%] flex-row justify-between   items-center">
                        <FormField 
                        width="49%"
                        height= {height * 0.045}
                        invalid = {isFirstnameInvalid }
                        title="firstname" 
                        value={form.firstname}
                        placeholder="Firstname"
                        handleChangeText={(e)=> setForm({...form,firstname:e})}
                        keyboardType="email-address"
                        />
                         <FormField 
                        width="49%"
                        height= {height * 0.045}
                        invalid = {isLastnameInvalid}
                        title="lastname" 
                        value={form.lastname}
                        placeholder="Lastname"
                        handleChangeText={(e)=> setForm({...form,lastname:e})}
                        keyboardType="email-address"
                        />
                </View>
                 <FormField 
                 width="98%"
                 height= {height * 0.045}
                 invalid = {isEmailInvalid || isEmailWrong}
                 title="Email" 
                 value={form.email}
                 placeholder="email"
                 handleChangeText={(e)=> setForm({...form,email:e.toLowerCase(),username:e.toLowerCase()})}
                 keyboardType="email-address"
                 />
                 <FormField 
                 width="98%"
                 height= {height * 0.045}
                 invalid = {isPasswordInvalid || isPasswordWrong}
                 title="Password" 
                 value={form.password}
                 placeholder="Password"
                 handleChangeText={(e)=> setForm({...form,password:e})}
                 />
                  <FormField 
                 width="98%"
                 height= {height * 0.045}
                 invalid = {isPasswordWrong}
                 title="Confirm" 
                 value={form.confirm}
                 placeholder="Confirm"
                 handleChangeText={(e)=> setForm({...form,confirm:e})}
               />
                <TouchableOpacity onPress={handleRegistration}
                   style={{height : height * 0.045}}
                   className="bg-yellow-800 mt-0 rounded-xl w-[98%] h-[47px] mb-2 justify-center items-center">

                        {isFetching ? (
                               <View >
                                 <ActivityIndicator size="large" color="#030202" />
                               </View>
                        ):(
                               <Text className="text-white font-semibold text-lg">Register</Text>
                        )}
                 </TouchableOpacity>


                

                

                 {/* <View className="justify-start items-center w-[90%] -5 flex-row gap-4">
                     <Text className="text-sm text-gray-100 font-semibold">
                       Already have an account ?
                     </Text>
                     <Link className=" text-lg text-blue-400 font-semibold"
                     href="/login">
                       Login
                     </Link>
                 </View> */}
           </View>
 
    </View>
  )
}