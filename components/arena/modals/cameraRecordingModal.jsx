import React, {
    useRef,
    useState,
  } from "react";
  import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    useWindowDimensions,
    ActivityIndicator,
  } from "react-native";
  import {
    CameraView,
  } from "expo-camera";
  import {
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import {
    useSafeAreaInsets,
  } from "react-native-safe-area-context";
  export default function CameraRecordingModal({
    visible,
    setVisible,
    setVideoUrl,
  }) {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const cameraRef = useRef(null);
    const [recording, setRecording] =
      useState(false);
    const [cameraType, setCameraType] =
      useState("back");
    const [loading, setLoading] =
      useState(false);
    const startRecording =
      async () => {
        try {
          if (!cameraRef.current)
            return;
          setRecording(true);
          const video =
            await cameraRef.current
              .recordAsync({
                quality: "1080p",
              });
          if (video?.uri) {
            setVideoUrl(video.uri);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setRecording(false);
          setVisible(false);
        }
      };
    const stopRecording =
      async () => {
        try {
          cameraRef.current
            ?.stopRecording();
        } catch (error) {
          console.log(error);
        }
      };
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
  
        <View
          style={{
            flex: 1,
            backgroundColor:
              "#000",
          }}
        >
  
          {/* CAMERA */}
  
          <CameraView
            ref={cameraRef}
            mode="video"
            facing={cameraType}
            style={{
              flex: 1,
            }}
          />
  
          {/* TOP BAR */}
  
          <View
            style={{
              position: "absolute",
              top:
                insets.top + 12,
  
              left: 20,
              right: 20,
  
              flexDirection:
                "row",
  
              justifyContent:
                "space-between",
  
              alignItems:
                "center",
            }}
          >
  
            {/* CLOSE */}
  
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
  
                if (recording) {
                  stopRecording();
                }
  
                setVisible(false);
              }}
              style={{
                width: 46,
                height: 46,
  
                borderRadius: 23,
  
                backgroundColor:
                  "rgba(0,0,0,0.5)",
  
                justifyContent:
                  "center",
  
                alignItems:
                  "center",
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={26}
                color="#fff"
              />
            </TouchableOpacity>
  
            {/* SWITCH CAMERA */}
  
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                setCameraType(
                  prev =>
                    prev === "back"
                      ? "front"
                      : "back"
                )
              }
              style={{
                width: 46,
                height: 46,
  
                borderRadius: 23,
  
                backgroundColor:
                  "rgba(0,0,0,0.5)",
  
                justifyContent:
                  "center",
  
                alignItems:
                  "center",
              }}
            >
              <MaterialCommunityIcons
                name="camera-flip"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
  
          </View>
  
          {/* RECORD BUTTON */}
  
          <View
            style={{
              position: "absolute",
              bottom:
                insets.bottom + 40,
  
              left: 0,
              right: 0,
  
              alignItems:
                "center",
            }}
          >
  
            {!recording ? (
  
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={
                  startRecording
                }
                style={{
                  width: 90,
                  height: 90,
  
                  borderRadius: 45,
  
                  borderWidth: 5,
  
                  borderColor:
                    "#fff",
  
                  justifyContent:
                    "center",
  
                  alignItems:
                    "center",
                }}
              >
                <View
                  style={{
                    width: 66,
                    height: 66,
  
                    borderRadius: 33,
  
                    backgroundColor:
                      "#ef4444",
                  }}
                />
              </TouchableOpacity>
  
            ) : (
  
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={
                  stopRecording
                }
                style={{
                  width: 90,
                  height: 90,
  
                  borderRadius: 45,
  
                  borderWidth: 5,
  
                  borderColor:
                    "#fff",
  
                  justifyContent:
                    "center",
  
                  alignItems:
                    "center",
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
  
                    borderRadius: 8,
  
                    backgroundColor:
                      "#ef4444",
                  }}
                />
              </TouchableOpacity>
  
            )}
  
            <Text
              style={{
                color: "#fff",
                marginTop: 14,
                fontWeight: "700",
                fontSize:
                  width / 26,
              }}
            >
              {
                recording
                  ? "Recording..."
                  : "Tap to Record"
              }
            </Text>
  
          </View>
  
          {loading && (
            <View
              style={{
                position:
                  "absolute",
                inset: 0,
  
                backgroundColor:
                  "rgba(0,0,0,0.5)",
  
                justifyContent:
                  "center",
  
                alignItems:
                  "center",
              }}
            >
              <ActivityIndicator
                size="large"
                color="#eab308"
              />
            </View>
          )}
  
        </View>
  
      </Modal>
    );
  }