import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileModal = ({ visible, onClose, handleSave, user , userInfo , setUserInfo }) => {
//   const [name, setName] = useState(user?.name || "");
//   const [city, setCity] = useState(user?.city || "");
//   const [country, setCountry] = useState(user?.country || "");

//   const handleSave = () => {
//     onSave({ name, city, country });
//     onClose();
//   };

return (
  <Modal transparent visible={visible} animationType="fade">
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,.88)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
      }}
    >
      <MotiView
        from={{
          opacity: 0,
          scale: 0.96,
          translateY: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateY: 0,
        }}
        transition={{
          type: "timing",
          duration: 260,
        }}
        style={{
          width: "100%",
          maxWidth: 410,
          backgroundColor: "rgba(17,18,20,.98)",
          borderRadius: 28,
          borderWidth: 1,
          borderColor: "rgba(234,179,8,.16)",
          overflow: "hidden",

          shadowColor: "#000",
          shadowOpacity: .45,
          shadowRadius: 35,
          elevation: 25,
        }}
      >
        {/* Header */}

        <View
          style={{
            paddingTop: 28,
            paddingHorizontal: 24,
            paddingBottom: 18,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255,255,255,.06)",
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            Edit Profile
          </Text>

          <Text
            style={{
              marginTop: 6,
              color: "#8D939B",
              fontSize: 13,
            }}
          >
            Keep your profile information up to date.
          </Text>
        </View>

        {/* BODY */}

        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 24,
            gap: 18,
          }}
        >
          {/* Name */}

          <View
            style={{
              backgroundColor: "#17181B",
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.06)",
              height: 58,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <MaterialCommunityIcons
              name="account-outline"
              size={20}
              color="#eab308"
            />

            <TextInput
              value={userInfo.name}
              onChangeText={(e) =>
                setUserInfo({ ...userInfo, name: e })
              }
              placeholder="Full Name"
              placeholderTextColor="#70757C"
              style={{
                flex: 1,
                marginLeft: 14,
                color: "white",
                fontSize: 15,
              }}
            />
          </View>

          {/* City */}

          <View
            style={{
              backgroundColor: "#17181B",
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.06)",
              height: 58,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={20}
              color="#eab308"
            />

            <TextInput
              value={userInfo.city}
              onChangeText={(e) =>
                setUserInfo({ ...userInfo, city: e })
              }
              placeholder="City"
              placeholderTextColor="#70757C"
              style={{
                flex: 1,
                marginLeft: 14,
                color: "white",
                fontSize: 15,
              }}
            />
          </View>

          {/* State */}

          <View
            style={{
              backgroundColor: "#17181B",
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.06)",
              height: 58,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <MaterialCommunityIcons
              name="map-outline"
              size={20}
              color="#eab308"
            />

            <TextInput
              value={userInfo.state}
              onChangeText={(e) =>
                setUserInfo({ ...userInfo, state: e })
              }
              placeholder="State"
              placeholderTextColor="#70757C"
              style={{
                flex: 1,
                marginLeft: 14,
                color: "white",
                fontSize: 15,
              }}
            />
          </View>

          {/* Country */}

          <View
            style={{
              backgroundColor: "#17181B",
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.06)",
              height: 58,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <MaterialCommunityIcons
              name="earth"
              size={20}
              color="#eab308"
            />

            <TextInput
              value={userInfo.country}
              onChangeText={(e) =>
                setUserInfo({ ...userInfo, country: e })
              }
              placeholder="Country"
              placeholderTextColor="#70757C"
              style={{
                flex: 1,
                marginLeft: 14,
                color: "white",
                fontSize: 15,
              }}
            />
          </View>
        </View>

        {/* Footer */}

        <View
          style={{
            padding: 24,
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleSave();
              onClose();
            }}
            activeOpacity={0.85}
            style={{
              height: 52,
              backgroundColor: "#eab308",
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#111214",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Save Changes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={{
              height: 50,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#17181B",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.06)",
            }}
          >
            <Text
              style={{
                color: "#A0A4AB",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  </Modal>
);
};

export default EditProfileModal;