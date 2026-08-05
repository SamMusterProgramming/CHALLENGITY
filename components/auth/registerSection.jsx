import { View, Text, TouchableOpacity, TextInput, Vibration } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import GoogleButton from '../custom/googleButton'
import ErrorMessage from '../custom/errorMessage'
import { useGlobalContext } from '../../context/GlobalProvider'
import { useLoading } from '../../context/loadingContext'
import axios from 'axios'
import { BASE_URL } from '../../apiCalls'
import { signUp } from '../../services/userServices'
import { getFirebaseErrorMessage } from '../../utilities/firebaseEroors'

export default function RegisterSection({ width , height,  setSelectedSection }) {
const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
const [isPasswordUnmatch, setIsPasswordUnmatch] = useState(false); 
const [isEmailWrong, setIsEmailWrong] = useState(false); 
const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
const [isNameInvalid, setIsNameInvalid] = useState(false); 
const [isLoading , setIsLoading] = useState(false)
const [isEmailExist, setIsEmailExist] = useState(false);
const [message, setMessage] = useState("")
const {user,setUse , colorTheme ,form, setForm} = useGlobalContext()
const [showPassword ,setShowPassword ] = useState(false)
const { showLoading, hideLoading } = useLoading();
const [messageColor, setMessageColor] = useState("pink");
const [verification , setVerification] = useState(false)


const handleSignUp = async () => {
    try {
      // 1. Create user in Firebase
      const user = await signUp(form.email, form.password);
      // 2. Get Firebase ID token
      const token = await user.getIdToken();
      showLoading("signing up , please wait ...")
      setMessage("")
      const res = await axios.post(
        `${BASE_URL}/users/auth/signup`,
        {
          token,
          form,
        }
      );
      const data = await res.data;
      setMessage(data.message)
      setMessageColor(data.color)
      setTimeout(() => {
        setSelectedSection("login")
      }, 5000);
    } catch (e) {
      if(getFirebaseErrorMessage(e) === "Email is already in use") setIsEmailExist(true)
      else setIsEmailExist(false)
      setMessage(getFirebaseErrorMessage(e));
      setMessageColor("pink")
      setVerification(false)
    } finally {
       hideLoading()
    }
};

const handleValidation = () => {
    if (!validateName(form.name)) {
        Vibration.vibrate();
        setIsNameInvalid(true)
        return;
        }
    if (!validateEmail(form.email)) {
        Vibration.vibrate();
        setIsEmailInvalid(true)
        return;
    }

    if (!validatePassword(form.password)) {
        Vibration.vibrate();
        setIsPasswordInvalid(true)
        return;
    }

    if (!validateMatchPassword(form.password ,form.confirmPassword)) {
        Vibration.vibrate();
        setIsPasswordUnmatch(true)
        return;
    }
    handleSignUp()
}

function validateName(name) {
    const re =/^[A-Za-z]+(?:[ '-][A-Za-z]+)+(?:[ '-][A-Za-z]+)*$/;
    return re.test(name);
    }

function validateEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
return re.test(email.trim());
}

function validatePassword(password) {
const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
return re.test(password)
}

function validateMatchPassword(password , confirmPassword) {
return  (confirmPassword === password)
}
    
    // ---------- EFFECTS ----------
useEffect(() => {
if (isNameInvalid) {
    setMessage("Full name required (first and last name) ")
    setTimeout(() => {
              setIsNameInvalid(false)
              setMessage("")
              }, 2000);
}

if (isEmailInvalid) {
    setMessage("Please enter a valid email address. ")
    setTimeout(() => {
               setIsEmailInvalid(false)
               setMessage("")
            }, 2000);
}

if (isPasswordInvalid) {
    setTimeout(() => {
    setMessage("Password must contain 8+ characters, uppercase, lowercase, number and symbol.")
    setTimeout(() => setIsPasswordInvalid(false), 2000); 
    }, 2000);
}

if (isPasswordWrong) {
    setTimeout(() => {
    setMessage("")
    setIsPasswordWrong(false)
    }, 2000);
}

if (isPasswordUnmatch) {
    setMessage("confirm Password does not match ")
    setTimeout(() => setIsPasswordUnmatch(false), 2000);
}

if (isEmailExist) {
    setMessage("Email already exists , try to login  ")
    setTimeout(() => { 
    setIsEmailExist(false)
    }  , 10000);
    }

}, [isEmailInvalid, isEmailWrong, isPasswordInvalid, isPasswordWrong , isNameInvalid  , isPasswordUnmatch , isEmailExist])
    
useEffect(() => {
if (message == "user not found") {
    Vibration.vibrate();
    setIsEmailWrong(true)
}
if (message === "invalid password") {
    Vibration.vibrate();
    setIsPasswordWrong(true)
}
}, [message])

return (
    <View
    className=" px-6 pb- 2 -mt-24 text-center justify-start flex-1 bg-black"
  >
    <View
    
      style = {{
        height: height/15,
        borderColor: !isNameInvalid ? "#44370c" : "rgba(255,55,5,0.46)",
      }}
      className=" flex-row items-center  bg-[#111111]  border border-[#44370c]  rounded-xl px-4  mt-4 "
    >
      <Ionicons
        name="person-outline"
        size={width/15}
        color="#F4C542"
        />
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#777"
        value={form.name}
        onChangeText={e => setForm({...form ,name:e})}
        keyboardType="email-address"
        className=" flex-1  ml-4 text-white "
      />
    </View>

    <View
    style = {{
        height: height/15,
        borderColor: !isEmailInvalid || isEmailExist ? "#44370c" : "rgba(255,55,5,0.46)",
       }}
      className=" flex-row items-center  bg-[#111111]  border border-[#44370c]  rounded-xl px-4  mt-4 "
     >
      <Ionicons
        name="mail-outline"
        size={width/15}
        color="#F4C542"
        />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={form.email}
        onChangeText={e => setForm({...form ,email:e})}
        keyboardType="email-address"
        className=" flex-1  ml-4 text-white "
      />
    </View>
    {/* PASSWORD */}
    <View
    style = {{
        height: height/15,
        borderColor: !isPasswordInvalid  ? "#44370c" : "rgba(255,55,5,0.46)",
       }}
      className=" flex-row items-center bg-[#111111] border border-[#44370c] rounded-xl px-4  mt-4 "
    >
      <Ionicons
        name="lock-closed-outline"
        size={width/15}
        color="#F4C542"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        value={form.password}
        onChangeText={e => setForm({...form,password:e})}
        secureTextEntry={!showPassword}
        className=" flex-1 ml-4  text-white text-base  "
      />

      <TouchableOpacity
        onPress={() =>
          setShowPassword(!showPassword)
        }
      >
        <Ionicons
          name={
            showPassword
            ? "eye-outline"
            : "eye-off-outline"
          }
          size={26}
          color="#777"
        />
      </TouchableOpacity>
    </View>
    <View
    style ={{
        height: height/15,
        borderColor:  !isPasswordUnmatch ? "#44370c" : "rgba(255,55,5,0.46)",
    }}
      className=" flex-row items-center bg-[#111111] border border-[#44370c] rounded-xl px-4  mt-4 "
    >
      <Ionicons
        name="lock-closed-outline"
        size={width/15}
        color="#F4C542"
      />
      <TextInput
        placeholder="Confirmation"
        placeholderTextColor="#777"
        value={form.confirmPassword}
        onChangeText={e => setForm({...form,confirmPassword:e})}
        secureTextEntry={!showPassword}
        className=" flex-1 ml-4  text-white text-base  "
      />
    </View>
    {/* FORGOT PASSWORD */}
   
    {/* ENTER STAGE */}

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handleValidation}
      className="  mt-6 rounded-xl py-4 text-center bg-[#ce9d19] w-full overflow-hidden "
    >
        <Text
          className=" text-black  text-lg font-bold  mr-3  text-center "
        >
          Register
        </Text>
    </TouchableOpacity>
    {/* DIVIDER */}
    <View
      className=" flex-row items-center  my-4 "
    >
      <View className="  flex-1 h-[1px] bg-[#8d8585] " />
      <Text  className=" mx-4  text-gray-500" >
        OR
      </Text>
      <View
        className=" flex-1 h-[1px] bg-[#8d8585] "
      />
    </View>
    {/* GOOGLE */}
    {/* <GoogleButton onPress={handleGoogleLogin} /> */}

    <View
          className = "flex-1 w-[100%] mb-6 justify-center  gap-4 bg-black  items-center" >
              
              <ErrorMessage
              message={message}
              color={messageColor}
              width={width} />
        
              {verification && (
                <TouchableOpacity onPress={sendVerification}>
                  <Text
                    style={{
                      // marginTop: 10,
                      color: "#D4AF37",
                      fontWeight: "600",
                    }}
                  >
                    Resend verification email
                  </Text>
                </TouchableOpacity>
              )}
          </View>

    {/* CREATE ARENA */}
    <TouchableOpacity
      onPress={() =>  setSelectedSection("login")}
      activeOpacity={0.85}
      className="  mt-auto bg-[#111]  border  border-[#2a2a2a] rounded-xl p-2  flex-row  items-center  "
    >
      <View
        className="  p-2 rounded-2xl  bg-[#F4C542]/10  items-center  justify-center  "
      >
        <Ionicons
          name="sparkles-outline"
          size={25}
          color="#F4C542"
        />
      </View>

      <View className="flex-1 ml-4">
        <Text
          style = {{
            fontSize:width/27
          }}
          className="  text-white  tex t-lg  font-bold  "  >
          Login to you account
        </Text>
        <Text
          className=" text-gray-400 text-sm mt-1 ">
          Start Your Journey
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={25}
        color="#F4C542"
      />
    </TouchableOpacity>
    {/* GUEST */}
    
  </View>
  )
}