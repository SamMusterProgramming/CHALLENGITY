import Modal from "react-native-modal";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ArenaAlertModal({
  isVisible,
  setIsVisible,
  title = "Arena Alert",
  message = "",
  type = "info",
  onConfirm = () => {},
}) {

  const insets = useSafeAreaInsets();

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.88}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver
      hideModalContentWhileAnimating
      onBackdropPress={() =>
        setIsVisible(false)
      }
    >
      <View
        style={{
          backgroundColor: "#090909",
          borderRadius: 24,
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.25)",
          overflow: "hidden",
        }}
      >
        {/* GOLD TOP BAR */}

        {/* <View
          style={{
            height: 3,
            backgroundColor: "#eab308",
          }}
        /> */}

        {/* CONTENT */}

        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 24,
            alignItems: "center",
          }}
        >
          {/* ICON */}

          <View
            style={{
              width: 82,
              height: 82,
              borderRadius: 41,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(234,179,8,0.08)",
              borderWidth: 1,
              borderColor:  "rgba(234,179,8,0.30)",
            }}
          >
            <MaterialCommunityIcons
              name={
                type === "confirm"
                  ? "alert-circle-outline"
                  : "information-outline"
              }
              size={38}
              color="#eab308"
            />
          </View>

          {/* TITLE */}

          <Text
            style={{
              color: "#FFF",
              fontSize: 22,
              fontWeight: "800",
              marginTop: 18,
            }}
          >
            {title}
          </Text>

          {/* MESSAGE */}

          <Text
            style={{
              color: "#A1A1AA",
              textAlign: "center",
              marginTop: 12,
              lineHeight: 24,
              fontSize: 15,
            }}
          >
            {message}
          </Text>

          {/* BUTTONS */}

          {type === "confirm" ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: 28,
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={() =>{
                  setIsVisible(false)
                  onConfirm();
                }
                }
                style={{
                  flex: 1,
                  height: 52,
                  borderRadius: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#121212",
                  borderWidth: 1,
                  borderColor:  "rgba(255,255,255,0.08)",
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  onConfirm();
                }}
                style={{
                  flex: 1,
                  height: 52,
                  borderRadius: 14,
                  justifyContent: "center",
                  alignItems:"center",
                  backgroundColor: "#eab308",
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontWeight: "800",
                  }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                setIsVisible(false)
              }
              style={{
                marginTop: 28,
                width: "100%",
                height: 52,
                borderRadius: 14,
                justifyContent: "center",
                alignItems:  "center",
                backgroundColor: "#eab308",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "800",
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}