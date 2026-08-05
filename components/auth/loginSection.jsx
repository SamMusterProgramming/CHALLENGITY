import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import GoogleButton from '../custom/googleButton'
import ErrorMessage from '../custom/errorMessage'

export default function LoginSection({form , setForm ,showPassword ,setShowPassword ,sendVerification,
                                      handleLogin , handleAnonymousLogin ,handleGoogleLogin,
                                      error , messageColor , width , height , verification ,setSelectedSection
                                   }) {
  return (
    <View
    className=" px-6 pb -2 -mt-4 text-center justify-start flex-1 "
     >
    <View
      style ={{
        height: height/15,
      }}
      className=" flex-row items-center  bg-[#111111]  border border-[#44370c]  rounded-xl px-4  mt-8 "
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
      style ={{
        height: height/15,
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
          size={28}
          color="#777"
        />
      </TouchableOpacity>
    </View>
    {/* FORGOT PASSWORD */}
   
    {/* ENTER STAGE */}

    <TouchableOpacity
      activeOpacity={0.85}
      style ={{
        height: height/16,
      }}
      onPress={handleLogin}
      className = " mt-4 rounded-xl flex-row justify-center items-center te xt-center bg-[#ce9d19] w-full "
    >
        <Text
          className=" text-black  text-lg font-bold   text-center "
        >
          Log In
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
    <GoogleButton onPress={handleGoogleLogin} />

    <View
    className = "flex-row justify-between items-center w-full  mt-2 ">
        <TouchableOpacity
          className="w- [190px] py-4  "
          // onPress={forgotPassword} 
          >
          <Text
            className = " text-[#F4C542] text-lg  "
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleAnonymousLogin}
        // activeOpacity={0.7}
        className="w- [120px] items-center py-4" >
            <Text
              className=" text-gray-400  text-lg "
            >
              Continue as Guest
            </Text>
        </TouchableOpacity>
    </View>


    <View
          className = "flex-1 w-[100%] mb-6 justify-center  gap-4 bg-black  items-center" >
              
              <ErrorMessage
              message={error}
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
      onPress= {() => setSelectedSection("register")} 
      activeOpacity={0.85}
      className="  mt-auto bg-[#111]  border  border-[#2a2a2a] rounded-xl p-2  flex-row  items-center  "
    >
      <View
        className="  p-2 rounded-lg  bg-[#F4C542]/10  items-center  justify-center  "
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
          className="  text-white  font-bold  "  >
          Create Account
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