import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ShareOptionsModal({
  visible,
  onClose,
  onShareExternal,
  onShareFriends,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* BACKDROP */}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.78)",
          paddingHorizontal: 18,
        }}
      >
        {/* OUTSIDE TAP */}

        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            inset: 0,
          }}
        />

        {/* MODAL */}

        <View
          style={{
            width: "100%",
            maxWidth: 430,
            borderRadius: 22,
            backgroundColor: "#090909",
            // borderWidth: 1,
            // borderColor: "rgba(234,179,8,0.28)",
            overflow: "hidden",

            shadowColor: "#EAB308",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.18,
            shadowRadius: 25,
            elevation: 20,
          }}
        >
          {/* TOP ACCENT */}

          {/* <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "#EAB308",
              opacity: 0.65,
            }}
          /> */}

          {/* CLOSE */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={{
              position: "absolute",
              right: 14,
              top: 14,
              width: 36,
              height: 36,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.04)",
              zIndex: 10,
            }}
          >
            <Ionicons
              name="close"
              size={20}
              color="rgba(255,255,255,0.55)"
            />
          </TouchableOpacity>

          {/* HEADER */}

          <View
            style={{
              alignItems: "center",
              paddingTop: 28,
              paddingHorizontal: 25,
              paddingBottom: 22,
            }}
          >
            {/* SHARE ICON */}

            <View
              style={{
                width: 58,
                height: 58,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(234,179,8,0.09)",
                borderWidth: 1,
                borderColor: "rgba(234,179,8,0.30)",
                marginBottom: 15,
              }}
            >
              <Ionicons
                name="share-social-outline"
                size={27}
                color="#EAB308"
              />
            </View>

            <Text
              style={{
                color: "#F4C542",
                fontSize: width / 20,
                fontWeight: "900",
                letterSpacing: 2.5,
                textTransform: "uppercase",
              }}
            >
              Share
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.42)",
                fontSize: width / 34,
                marginTop: 7,
                textAlign: "center",
                lineHeight: 17,
              }}
            >
              Choose how you want to share this
            </Text>
          </View>

          {/* OPTIONS */}

          <View
            style={{
              paddingHorizontal: 15,
              paddingBottom: 18,
            }}
          >
            {/* EXTERNAL SHARE */}

            <TouchableOpacity
              activeOpacity={0.82}
              onPress={onShareExternal}
              style={{
                minHeight: 82,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.10)",
                backgroundColor: "rgba(255,255,255,0.035)",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                marginBottom: 10,
              }}
            >
              {/* ICON */}

              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.055)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <Ionicons
                  name="share-outline"
                  size={22}
                  color="#EAB308"
                />
              </View>

              {/* TEXT */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 14,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: width / 28,
                    fontWeight: "800",
                    letterSpacing: 0.4,
                  }}
                >
                  Share outside Itri
                </Text>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.40)",
                    fontSize: width / 36,
                    marginTop: 4,
                  }}
                >
                  Messages, WhatsApp, AirDrop and more
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="rgba(255,255,255,0.35)"
              />
            </TouchableOpacity>

            {/* ITRI FRIENDS */}

            <TouchableOpacity
              activeOpacity={0.82}
              onPress={onShareFriends}
              style={{
                minHeight: 82,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "rgba(234,179,8,0.30)",
                backgroundColor: "rgba(234,179,8,0.065)",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
              }}
            >
              {/* ICON */}

              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(234,179,8,0.11)",
                  borderWidth: 1,
                  borderColor: "rgba(234,179,8,0.22)",
                }}
              >
                <MaterialCommunityIcons
                  name="account-multiple-outline"
                  size={23}
                  color="#EAB308"
                />
              </View>

              {/* TEXT */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 14,
                }}
              >
                <Text
                  style={{
                    color: "#F4C542",
                    fontSize: width / 28,
                    fontWeight: "800",
                    letterSpacing: 0.4,
                  }}
                >
                  Share with Itri friends
                </Text>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.42)",
                    fontSize: width / 36,
                    marginTop: 4,
                  }}
                >
                  Send directly to people you follow
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#EAB308"
              />
            </TouchableOpacity>
          </View>

          {/* FOOTER */}

          {/* <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "rgba(234,179,8,0.12)",
            }}
          /> */}
        </View>
      </View>
    </Modal>
  );
}