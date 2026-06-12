import { View, Text, useWindowDimensions, TouchableOpacity, Vibration, Image, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormField from '../custom/FormField'
import { useGlobalContext } from '../../context/GlobalProvider';
import { ActivityIndicator } from 'react-native-web';
import { authRegister } from '../../apiCalls';
import { icons } from '../../constants';

export default function Register({setAuthType}) {
    const {user,setUse } = useGlobalContext()
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
  const [name , SetName] = useState ({
    firstname:"",
    lastname:""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,  setShowConfirmPassword ] = useState(false);
  const [message, setMessage] = useState("")
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); 
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); 
  const [isPasswordUnmatch, setIsPasswordUnmatch] = useState(false); 
  const [isEmailWrong, setIsEmailWrong] = useState(false); 
  const [isEmailInvalid, setIsEmailInvalid] = useState(false); 
  const [isFirstnameValid, setIsFirstnameValid] = useState(false); 
  const [isLastnameValid, setIsLastnameValid] = useState(false); 
  const [isLoading , setIsLoading] = useState(false)


  const handleValidation = () => {
    if (!validateFirstName(name.firstname)) {
        Vibration.vibrate();
        setIsFirstnameValid(true)
        return;
      }

    if (!validateLastName(name.lastname)) {
        Vibration.vibrate();
        setIsLastnameValid(true)
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
    setIsLoading(true)
    onPress()
    setTimeout(() => {
      setIsVisible(false)
      setIsLoading(false)
    }, 1000);
  }
  
  function validateFirstName(firstname) {
    const re = /^[a-zA-Z\s'-]+$/;
    if (firstname === "" ) return false
    return re.test(firstname);
  }

  function validateLastName(lastname) {
    const re = /^[a-zA-Z\s'-]+$/;
    if (lastname === "") return false
    return  re.test(lastname);
  }

  function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email);
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
    if (isFirstnameValid) {
        setMessage("Invalid Name m ... ")
        setTimeout(() => setIsFirstnameValid(false), 2000);
    }
    
    if (isLastnameValid) {
        setMessage("Invalid Name m ... ")
        setTimeout(() => setIsLastnameValid(false), 2000);
    }

    if (isEmailInvalid) {
        setMessage("Invalid Email, must contain @ , com ... ")
        setTimeout(() => setIsEmailInvalid(false), 2000);
    }

    // if (isEmailWrong) {
    //     setTimeout(() => {
    //     setMessage("")
    //     setIsEmailWrong(false)
    //     }, 2000);
    // }

    if (isPasswordInvalid) {
        setTimeout(() => {
        setMessage("Invalid Password, must contain special character,...")
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
      // setMessage("")  
    }  , 10000);
    }

  }, [isEmailInvalid, isEmailWrong, isPasswordInvalid, isPasswordWrong , isFirstnameValid , isLastnameValid , isPasswordUnmatch , isEmailExist])

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
    style={{ flex: 1, backgroundColor: "#050505" }}
    // behavior={Platform.OS === "ios" ? "padding" : undefined}
     >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* HEADER SPACE */}
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.applogo}
              resizeMode="contain"
              style={{
                width: width * 0.92,
                height: height / 7,
              }}
            />

            <Text
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: width / 28,
                textAlign: "center",
                width: "82%",
                lineHeight: width / 16,
                // marginTop: height / 120,
              }}
            >
              Your Journey From Local Talent to Global Recognition
            </Text>
          </View>

          {/* CENTER LOGIN SECTION */}
          <View
            style={{
              width: "100%",
              paddingHorizontal: width / 24,
              justifyContent: "center",
            }}
          >
            {/* TITLE */}
            <View
              style={{
                marginBottom: height / 30,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: width / 20,
                  fontWeight: "900",
                  textAlign: "center",
                }}
              >
                Welcome back
              </Text>

              <Text
                style={{
                  marginTop: height / 140,
                  color: "rgba(255,255,255,0.45)",
                  fontSize: width / 28,
                  textAlign: "center",
                }}
              >
                Sign in to start your journey
              </Text>
            </View>
             {/* FIRST NAME */}
             <View
              style={{
                height: height/16,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isFirstnameValid ? "rgba(255,255,255,0.46)" : "rgba(255,55,5,0.46)",
                paddingHorizontal: 16,
                justifyContent: "center",
                marginBottom :12,
              }}
            >
              <Text
                    style={{
                    color: "#fff",
                    fontSize: width / 40,
                    // fontWeight: "900",
                    textAlign: "center",
                    backgroundColor: "#17181B",
                    }}
                    className="absolute top-[-10] pl-2 pr-4 bg-[#050505] tracking-wide font-montserrat  left-0" >
                    First Name
              </Text>
              <TextInput
                value={name.firstname}
                onChangeText={(e) =>
                  SetName({
                    ...name,
                    firstname:e,
                  })
                }
                placeholder="First Name"
                placeholderTextColor="#6B7280"
                style={{
                  color: "white",
                  fontSize: width / 30,
                //   fontWeight: "500",
                }}
                className=""
              />
            </View>

            {/* EMAIL */}
            <View
              style={{
                height: height / 16,
                borderRadius: width / 80,
                justifyContent: "center",
                paddingHorizontal: width / 26,
                borderWidth: 1,
                borderColor: colorTheme,
                marginBottom: height / 45,
              }}
            >
              <Text
                style={{
                  color: colorTheme,
                  fontSize: width / 34,
                }}
                className="absolute top-[-12] pl-2 pr-4 bg-[#050505] tracking-wider font-semibold left-0"
              >
                Email
              </Text>

              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={form.email}
                onChangeText={(e) => setForm({ ...form, email: e })}
                style={{
                  color: "#fff",
                  fontSize: width / 28,
                }}
              />
            </View>

            {/* PASSWORD */}
            <View
              style={{
                height: height / 16,
                borderRadius: width / 80,
                justifyContent: "center",
                paddingHorizontal: width / 26,
                borderWidth: 1,
                borderColor: colorTheme,
                backgroundColor: "#050505",
                marginBottom: height / 45,
              }}
            >
              <Text
                style={{
                  color: colorTheme,
                  fontSize: width / 34,
                }}
                className="absolute top-[-12] pl-2 pr-4 bg-[#050505] tracking-wider font-semibold left-0"
              >
                Password
              </Text>

              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.35)"
                secureTextEntry
                value={form.password}
                onChangeText={(e) => setForm({ ...form, password: e })}
                style={{
                  color: "#fff",
                  fontSize: width / 28,
                }}
              />
            </View>

            {/* LOGIN */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleLogin}
              style={{
                height: height / 16,
                borderRadius: width / 60,
                backgroundColor: colorTheme,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: height / 45,
              }}
            >
              <Text
                style={{
                  color: "#0A0A0A",
                  fontSize: width / 28,
                  fontWeight: "800",
                  letterSpacing: 0.6,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>

            <GoogleButton onPress={handleGoogleLogin} />
          </View>

          {/* FOOTER SPACE */}
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: height / 40,
            }}
          >
              <View
              className = "flex-1 justify-center gap-4 items-center" >
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
              <View
                  style={{
                    flexDirection: "col",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                  className ="mt-auto"
                >
                  <Pressable
                      onPress= {() => {setOpenCreateAcctModal(true)}} // {handleSignUp}
                      android_ripple={{
                      color: "rgba(255,255,255,0.08)",
                      borderless: false,
                    }}
                    style={{
                      paddingVertical: 10,
                      // paddingHorizontal: 14,
                      borderRadius: 14,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width / 32,
                        // color: "#E5E7EB",
                        fontWeight: "600",
                        letterSpacing: 0.4,
                      }}
                      className = "text-white"
                    >
                    don't have an account ? {' '}
                      <Text
                        style={{
                          fontSize: width / 32,
                          color: colorTheme,
                          fontWeight: "600",
                          letterSpacing: 0.4,
                        }}
                        // className = "text-[#7ea1e8]"
                      >
                        Sign up 
                      </Text>
                    </Text>
                    
                  </Pressable>
                  <Pressable
                    onPress={handleAnonymousLogin}
                    android_ripple={{
                      color: "rgba(212,175,55,0.08)",
                      borderless: false,
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderRadius: 14,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width / 36,
                        color: "#D4AF37",
                        fontWeight: "700",
                        letterSpacing: 0.5,
                      }}
                    >
                      Continue as Guest
                    </Text>
                  </Pressable>

              </View>
            </View>

          {openCreateAcctModal && (
            <CreateAccountModal
              setIsVisible={setOpenCreateAcctModal}
              setIsEmailExist={setIsEmailExist}
              isEmailExist={isEmailExist}
              form={form}
              setForm={setForm}
              name={name}
              SetName={SetName}
              onPress={handleSignUp}
              width={width}
              height={height}
            />
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  </View>
);
}