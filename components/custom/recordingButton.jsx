import React, {
    useEffect,
    useRef,
  } from "react";
  
  import {
    TouchableOpacity,
    Text,
    View,
    Animated,
    Easing,
    useWindowDimensions,
  } from "react-native";
  
  import {
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  
  export default function RecordingButton({
    onPress,
    recording = true,
  }) {
  
    const { width } =
      useWindowDimensions();
  
    const pulseAnim =
      useRef(new Animated.Value(1))
        .current;
  
    const glowAnim =
      useRef(new Animated.Value(0.4))
        .current;
  
    useEffect(() => {
  
      if (!recording) return;
  
      Animated.loop(
        Animated.parallel([
  
          Animated.sequence([
            Animated.timing(
              pulseAnim,
              {
                toValue: 1.12,
                duration: 700,
                easing: Easing.linear,
                useNativeDriver: true,
              }
            ),
  
            Animated.timing(
              pulseAnim,
              {
                toValue: 1,
                duration: 700,
                easing: Easing.linear,
                useNativeDriver: true,
              }
            ),
          ]),
  
          Animated.sequence([
            Animated.timing(
              glowAnim,
              {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
              }
            ),
  
            Animated.timing(
              glowAnim,
              {
                toValue: 0.35,
                duration: 700,
                useNativeDriver: true,
              }
            ),
          ]),
  
        ])
  
      ).start();
  
    }, []);
  
    return (
  
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        style={{
          alignSelf: "center",
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                scale: pulseAnim,
              },
            ],
            shadowColor: "#D4AF37",
            shadowOpacity: glowAnim,
            shadowRadius: 24,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 12,
          }}
        >
          <View
            style={{
              width: width * 0.15,
              height: width * 0.15,
              borderRadius: 999,
              backgroundColor: "#0A0A0A",
              borderWidth: 1,
              borderColor: "red",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
  
            {/* GOLD INNER GLOW */}
            <Animated.View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 999,
                backgroundColor:
                  "rgba(212,175,55,0.12)",
                opacity: glowAnim,
              }}
            />
            {/* RECORD ICON */}
            <View
              style={{
                width: width * 0.105,
                height: width * 0.105,
                borderRadius: 999,
                // backgroundColor: "#D4AF37",
                borderWidth: 1,
                borderColor: "red",
                justifyContent: "center",
                alignItems: "center",
                // padding:4
              }}
            >
  
              <MaterialCommunityIcons
                name="video-wireless"
                size={20}
                color="#D4AF37"
              />
  
            </View>
  
          </View>
  
        </Animated.View>
  
        {/* LABEL */}
        <Text
          style={{
            marginTop: 16,
            textAlign: "center",
            color: "#D4AF37",
            fontSize: width / 49,
            fontWeight: "800",
            // letterSpacing: 1,
          }}
        >
          RECORDING
        </Text>
  
      </TouchableOpacity>
    );
  }