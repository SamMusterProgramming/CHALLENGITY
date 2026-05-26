import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration,
  ActivityIndicator,
} from "react-native";

import Modal from "react-native-modal";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { MotiView } from "moti";

export default function CreateAccountModal({
  setIsVisible,
  isEmailExist,
  setIsEmailExist,
  form,
  setForm,
  name,
  SetName,
  onPress,
  width,
  height,
}) {
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);
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
    <Modal
      isVisible={true}
      onBackdropPress={() => setIsVisible(false)}
      backdropOpacity={0.82}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
      style={{
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="w-full items-center justify-center"
      >
        <MotiView
          from={{
            opacity: 0,
            translateY: 40,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            scale: 1,
          }}
          transition={{
            type: "timing",
            duration: 500,
          }}
          style={{
            width: "92%",
            backgroundColor: "#111214",
            borderRadius: 26,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.06)",
            shadowColor: "#000",
            shadowOpacity: 0.45,
            shadowRadius: 30,
            elevation: 18,
          }}
        >
  
          {/* HEADER */}
          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 24,
              paddingBottom: 18,
            }}
          >
            <View className="flex-row items-start justify-between">
  
              <View className="flex-1 pr-4">
  
                <Text
                  style={{
                    fontSize: width / 22,
                    color: "white",
                    fontWeight: "800",
                    letterSpacing: 0.3,
                  }}
                >
                  Create Account
                </Text>
  
                <Text
                  style={{
                    fontSize: width / 34,
                    color: "#8B8B92",
                    marginTop: 6,
                    lineHeight: 20,
                  }}
                >
                  Join the global stage and start showcasing your talent.
                </Text>
  
              </View>
  
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsVisible(false)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.08)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={18}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
  
            </View>
          </View>
  
          {/* FORM */}
          <View
            style={{
              paddingHorizontal: 22,
              gap: 12,
            }}
          >
  
            {/* FIRST NAME */}
            <View
              style={{
                height: height/20,
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
  
            {/* LAST NAME */}
            <View
              style={{
                height: height/20,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isLastnameValid ? "rgba(255,255,255,0.46)" : "rgba(255,55,5,0.46)",
                paddingHorizontal: 16,
                justifyContent: "center",
                marginBottom : 12
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
                    Last Name
              </Text>
              <TextInput
                value={name.lastname}
                onChangeText={(e) =>
                  SetName({
                    ...name,
                    lastname: e,
                  })
                }
                placeholder="Last Name"
                placeholderTextColor="#6B7280"
                style={{
                  color: "white",
                  fontSize: width / 30,
                  fontWeight: "500",
                }}
              />
            </View>
  
            {/* EMAIL */}
            <View
              style={{
                height: height/20,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isEmailInvalid && !isEmailExist ? "rgba(255,255,255,0.46)" : "rgba(255,85,5,0.46)",
                paddingHorizontal: 16,
                justifyContent: "center",
                marginBottom : 12
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
                    Email Address
              </Text>
              <TextInput
                value={form.email}
                onChangeText={(e) =>
                  setForm({
                    ...form,
                    email: e,
                  })
                }
                placeholder="Email Address"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  color: "white",
                  fontSize: width / 30,
                  fontWeight: "500",
                }}
              />
            </View>
  
            {/* PASSWORD */}
            <View
              style={{
                height: height/20,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor: !isPasswordInvalid  ? "rgba(255,255,255,0.46)" : "rgba(255,55,5,0.46)",
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                marginBottom : 12
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
                    Password
              </Text>
              <TextInput
                value={form.password}
                onChangeText={(e) =>
                  setForm({
                    ...form,
                    password: e,
                  })
                }
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPassword}
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: width / 30,
                  fontWeight: "500",
                }}
              />
  
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >
                <MaterialCommunityIcons
                  name={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={19}
                  color="#8B8B92"
                />
              </TouchableOpacity>
            </View>
  
            {/* CONFIRM PASSWORD */}
            <View
              style={{
                height: height/20,
                borderRadius: 5,
                backgroundColor: "#050505",
                borderWidth: 1,
                borderColor:  !isPasswordUnmatch ? "rgba(255,255,255,0.46)" : "rgba(255,55,5,0.46)",
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                marginBottom : 12
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
                    Confirmation
              </Text>
              <TextInput
                value={form.confirmPassword}
                onChangeText={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e,
                  })
                }
                placeholder="Confirm Password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showConfirmPassword}
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: width / 30,
                  fontWeight: "500",
                }}
              />
  
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                <MaterialCommunityIcons
                  name={
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={19}
                  color="#8B8B92"
                />
              </TouchableOpacity>
            </View>
  
          </View>
  
          {/* ERROR */}
          <View
            style={{
              height: 58,
            //   justifyContent: "center",
              paddingHorizontal: 24,
            //   marginTop: 10,
            }}
            className="w-[100%] justify-start items-center flex-row"
          >
            {(isEmailWrong ||
              isEmailInvalid ||
              isPasswordInvalid ||
              isPasswordWrong ||
              isFirstnameValid ||
             isLastnameValid || isPasswordUnmatch || isEmailExist) && (
              <Text
                style={{
                  color: "#9CA3AF",
                  fontSize: width / 36,
                  textAlign: "center",
                }}
              >
                {message}
              </Text>
            )}
          </View>

        
  
          {/* BUTTON */}
          <View
            style={{
              paddingHorizontal: 22,
              paddingBottom: 22,
              paddingTop: 8,
            }}
          >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleValidation}
                style={{
                  height: height/19,
                  borderRadius: 10,
                  backgroundColor: "#D4AF37",
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#D4AF37",
                  shadowOpacity: 0.18,
                  shadowRadius: 14,
                  elevation: 8,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#111"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: width / 33,
                      color: "#111",
                      fontWeight: "800",
                      letterSpacing: 1,
                    }}
                  >
                    SIGN UP
                  </Text>
                )}
              </TouchableOpacity>
          </View>
  
        </MotiView>
      </KeyboardAvoidingView>
    </Modal>
  );
}