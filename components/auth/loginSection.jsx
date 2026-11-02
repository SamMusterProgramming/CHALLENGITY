
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import ErrorMessage from "../custom/errorMessage";
import { useGlobalContext } from "../../context/GlobalProvider";
import GoogleIcon from "../svgIcons/others/googleIcon";

export default function LoginSection({
  form,
  setForm,
  showPassword,
  setShowPassword,
  handleLogin,
  handleAnonymousLogin,
  handleGoogleLogin,
  error,
  messageColor,
  width,
  height,
  verification,
  sendVerification,
  setSelectedSection,
}) {
  const {scale,spacing} = useGlobalContext()
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing(22),
        }}
      >

        {/* ================================================= */}
        {/* ITRI BRAND */}
        {/* ================================================= */}

        <View
          style={{
            alignItems: "center",
            marginTop: spacing(62),
          }}
        >

          {/* SMALL GOLD STAR */}
          <Ionicons
            name="sparkles"
            size={scale(25)}
            color="#F4C542"
            style={{
              marginBottom: spacing(18),
            }}
          />

          {/* ITRI */}
          <Text
            style={{
              color: "#F4C542",

              fontSize: scale(38),
              fontWeight: "400",
              // This is important to reproduce
              // the spaced-out cinematic logo.
              letterSpacing: 9,
              lineHeight: spacing(52),
            }}
          >
            ITRI
          </Text>

          {/* SUBTITLE */}
          <Text
            style={{
              color: "#F4C542",
              fontSize: scale(12),
              fontWeight: "400",
              letterSpacing: spacing(2),
              marginTop: spacing(18),
              opacity: 0.95,
            }}
          >
            YOUR STAGE. YOUR JOURNEY.
          </Text>

        </View>


        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <View
          style={{
            // In the reference there is a substantial
            // empty cinematic area between the logo
            // and the first input.
            marginTop: spacing(62) ,//height * 0.105,
          }}
        >

          {/* ================= EMAIL ================= */}

          <View
            style={{
              height: spacing(52),
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 17,
              backgroundColor: "rgba(3,3,3,0.72)",
              borderWidth: 1,
              borderColor: "rgba(244,197,66,0.82)",
              borderRadius: 16,
              // paddingVertical:spacing(12)
            }}
          >
            <Ionicons
              name="mail-outline"
              size={scale(18)}
              color="#F4C542"
            />

            <TextInput
              value={form.email}
              onChangeText={(email) =>
                setForm({
                  ...form,
                  email,
                })
              }
              placeholder="Email address"
              placeholderTextColor="#858585"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                marginLeft: 15,
                color: "#FFFFFF",
                fontSize: scale(12),
                fontWeight: "400",
              }}
            />
          </View>


          {/* ================= PASSWORD ================= */}

          <View
            style={{
              height:spacing(52),
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 17,
              marginTop: spacing(16),
              backgroundColor: "rgba(3,3,3,0.72)",
              borderWidth: 1,
              borderColor: "rgba(244,197,66,0.82)",
              borderRadius: 16,
              // paddingVertical:spacing(12)
            }}
          >
            <Ionicons
              name="lock-closed-outline"
              size={scale(18)}
              color="#F4C542"
            />

            <TextInput
              value={form.password}
              onChangeText={(password) =>
                setForm({
                  ...form,
                  password,
                })
              }
              placeholder="Password"
              placeholderTextColor="#858585"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                marginLeft: 15,
                color: "#FFFFFF",
                fontSize: scale(12),
                fontWeight: "400",
              }}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(!showPassword)
              }
              hitSlop={{
                top: 12,
                bottom: 12,
                left: 12,
                right: 12,
              }}
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-outline"
                    : "eye-off-outline"
                }
                size={scale(18)}
                color="#AAAAAA"
              />
            </TouchableOpacity>
          </View>


          {/* ================================================= */}
          {/* SIGN IN */}
          {/* ================================================= */}

          <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleLogin}
              style={{
                height: spacing(52),
                marginTop: spacing(16),
                borderRadius: 18,
                overflow: "hidden",
                shadowColor: "#F4C542",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.28,
                shadowRadius: 8,
              }}
              className = "justify-center items-center"
            >
              <LinearGradient
                colors={[
                  "#FFF1A5",
                  "#F4C542",
                  "#DDA21C",
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <Text
                style={{
                  color: "#080808",
                  fontSize: scale(14),
                  fontWeight: "600",
                  letterSpacing: 2.5,
                  textAlign: "center",
                }}
              >
                SIGN IN
              </Text>
          </TouchableOpacity>


          {/* ================================================= */}
          {/* OR */}
          {/* ================================================= */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: spacing(22),
            }}
          >

            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor:
                  "rgba(244,197,66,0.65)",
              }}
            />

            <Text
              style={{
                color: "#E2C354",
                marginHorizontal: 16,
                fontSize: scale(12),
                fontWeight: "400",
                letterSpacing: 1.5,
              }}
            >
              OR
            </Text>

            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor:
                  "rgba(244,197,66,0.65)",
              }}
            />

          </View>


          {/* ================================================= */}
          {/* CONTINUE WITH GOOGLE */}
          {/* ================================================= */}

          <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleGoogleLogin}
              style={{
                width: "100%",
                height: spacing(54),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: "#F3F1EB",

                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.95)",
                borderRadius: 18,

                shadowColor: "#F4C542",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.16,
                shadowRadius: 12,

                elevation: 5,
              }}
            >
              <GoogleIcon size={scale(17)} />

              <Text
                style={{
                  marginLeft: 13,
                  color: "#171717",
                  fontSize: scale(14),
                  fontWeight: "600",
                  letterSpacing: 0.25,
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>


          {/* ================================================= */}
          {/* FORGOT / GUEST */}
          {/* ================================================= */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: spacing(10),
            }}
          >

            <TouchableOpacity
              style={{
                paddingVertical: spacing(16),
              }}
            >
              <Text
                style={{
                  color: "#F4C542",
                  fontSize: scale(12),
                  fontWeight: "400",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={handleAnonymousLogin}
              style={{
                paddingVertical: spacing(16),
              }}
            >
              <Text
                style={{
                  color: "#A3A3A3",
                  fontSize: scale(12),
                  fontWeight: "400",
                }}
              >
                Continue as Guest
              </Text>
            </TouchableOpacity>

          </View>

        </View>


        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        <View
          style={{
            minHeight: 38,
            alignItems: "center",
            justifyContent: "center",
            flex:1
          }}
        >

          <ErrorMessage
            message={error}
            color={messageColor}
            size={scale(12)}
          />

          {verification && (
            <TouchableOpacity
              onPress={sendVerification}
            >
              <Text
                style={{
                  color: "#D4AF37",
                  fontSize: scale(12),
                  fontWeight: "600",
                  marginTop: 3,
                }}
              >
                Resend verification email
              </Text>
            </TouchableOpacity>
          )}

        </View>


        {/* ================================================= */}
        {/* CREATE ACCOUNT */}
        {/* ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            setSelectedSection("register")
          }
          style={{
            marginTop: "auto",
            marginBottom: 12,
            minHeight: 64,
            flexDirection: "row",
            alignItems: "end",
            padding: scale(8),
            backgroundColor:
              "rgba(8,8,8,0.78)",
            borderWidth: 1,
            borderColor:
              "rgba(244,197,66,0.25)",
            borderRadius: 16,
          }}
        >

          <View
            style={{
              borderRadius: 11,
              padding :spacing(8) ,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                "rgba(244,197,66,0.09)",
            }}

          >
            <Ionicons
              name="sparkles-outline"
              size={scale(20)}
              color="#F4C542"
            />
          </View>


          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
            className = "justify-end flex-1"
          >

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: scale(12),
                fontWeight: "600",
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                color: "#858585",
                fontSize: scale(10),
                marginTop: scale(4),
              }}
            >
              Start Your Journey
            </Text>

          </View>

          <View
            style={{
              // flex: 1,
              // marginLeft: 12,
            }}
            className = "justify-center items-center flex- 1"
          >
            <Ionicons
              name="chevron-forward"
              size={35}
              color="#F4C542"
            />
          </View>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}