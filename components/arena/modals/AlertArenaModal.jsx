// import Modal from "react-native-modal";
// import { View, Text, TouchableOpacity } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function ArenaAlertModal({
//   isVisible,
//   setIsVisible,
//   title = "Arena Alert",
//   message = "",
//   type = "info",
//   onConfirm = () => {},
// }) {

//   const insets = useSafeAreaInsets();

//   return (
//     <Modal
//       isVisible={isVisible}
//       backdropOpacity={0.88}
//       animationIn="zoomIn"
//       animationOut="zoomOut"
//       useNativeDriver
//       hideModalContentWhileAnimating
//       onBackdropPress={() =>
//         setIsVisible(false)
//       }
//     >
//       <View
//         style={{
//           backgroundColor: "#090909",
//           borderRadius: 24,
//           borderWidth: 1,
//           borderColor: "rgba(234,179,8,0.25)",
//           overflow: "hidden",
//         }}
//       >
//         {/* GOLD TOP BAR */}

//         {/* <View
//           style={{
//             height: 3,
//             backgroundColor: "#eab308",
//           }}
//         /> */}

//         {/* CONTENT */}

//         <View
//           style={{
//             paddingHorizontal: 24,
//             paddingTop: 28,
//             paddingBottom: 24,
//             alignItems: "center",
//           }}
//         >
//           {/* ICON */}

//           <View
//             style={{
//               width: 82,
//               height: 82,
//               borderRadius: 41,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(234,179,8,0.08)",
//               borderWidth: 1,
//               borderColor:  "rgba(234,179,8,0.30)",
//             }}
//           >
//             <MaterialCommunityIcons
//               name={
//                 type === "confirm"
//                   ? "alert-circle-outline"
//                   : "information-outline"
//               }
//               size={38}
//               color="#eab308"
//             />
//           </View>

//           {/* TITLE */}

//           <Text
//             style={{
//               color: "#FFF",
//               fontSize: 22,
//               fontWeight: "800",
//               marginTop: 18,
//             }}
//           >
//             {title}
//           </Text>

//           {/* MESSAGE */}

//           <Text
//             style={{
//               color: "#A1A1AA",
//               textAlign: "center",
//               marginTop: 12,
//               lineHeight: 24,
//               fontSize: 15,
//             }}
//           >
//             {message}
//           </Text>

//           {/* BUTTONS */}

//           {type === "confirm" ? (
//             <View
//               style={{
//                 flexDirection: "row",
//                 marginTop: 28,
//                 gap: 12,
//               }}
//             >
//               <TouchableOpacity
//                 onPress={() =>{
//                   setIsVisible(false)
//                   // onConfirm();
//                 }
//                 }
//                 style={{
//                   flex: 1,
//                   height: 52,
//                   borderRadius: 14,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   backgroundColor: "#121212",
//                   borderWidth: 1,
//                   borderColor:  "rgba(255,255,255,0.08)",
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#FFF",
//                     fontWeight: "700",
//                   }}
//                 >
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   setIsVisible(false);
//                   onConfirm();
//                 }}
//                 style={{
//                   flex: 1,
//                   height: 52,
//                   borderRadius: 14,
//                   justifyContent: "center",
//                   alignItems:"center",
//                   backgroundColor: "#eab308",
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#000",
//                     fontWeight: "800",
//                   }}
//                 >
//                   Confirm
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity
//               onPress={() =>
//                 setIsVisible(false)
//               }
//               style={{
//                 marginTop: 28,
//                 width: "100%",
//                 height: 52,
//                 borderRadius: 14,
//                 justifyContent: "center",
//                 alignItems:  "center",
//                 backgroundColor: "#eab308",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#000",
//                   fontWeight: "800",
//                 }}
//               >
//                 OK
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </Modal>
//   );
// }



import Modal from "react-native-modal";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";

export default function ArenaAlertModal({
  isVisible,
  setIsVisible,
  title = "Arena Alert",
  message = "",
  type = "info",
  onConfirm = () => {},
}) {
  const insets = useSafeAreaInsets();
  const { width , height} =  useWindowDimensions();


  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.82}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={220}
      animationOutTiming={180}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackdropPress={() =>
        setIsVisible(false)
      }
    >
      <View
        style={{
          width: "100%",
          maxWidth: 390,
          alignSelf: "center",
          borderRadius: 10,
          backgroundColor: "rgba(13,13,15,0.97)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.29)",
        
        }}
      >
        {/* <View
          style={{
            height: 2,
            backgroundColor:
              type === "confirm"
                ? "rgba(234,179,8,0.65)"
                : "rgba(234,179,8,0.35)",
          }}
        /> */}

        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                // width: 46,
                // height: 46,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor:
                //   type === "confirm"
                //     ? "rgba(234,179,8,0.08)"
                //     : "rgba(255,255,255,0.045)",
                borderWidth: 1,
                borderColor:
                  type === "confirm"
                    ? "rgba(234,179,8,0.24)"
                    : "rgba(255,255,255,0.08)",
              }}
            >
              {/* <MaterialCommunityIcons
                name={
                  type === "confirm"
                    ? "alert-circle-outline"
                    : "information-outline"
                }
                size={23}
                color={
                  type === "confirm"
                    ? "#E8C85C"
                    : "#D8D8D8"
                }
              /> */}
              <Image 
                source = {images.logo}
                style ={{
                  height :30,
                  width : 30
                }}
                // resizeMethod="cover"
                resizeMode="cover"
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 12,
                paddingRight: 30,
              }}
              className = "justify-center items-center text-center"

            >
              <Text
                style={{
                  color: "#F4F4F4",
                  fontSize: 18,
                  fontWeight: "800",
                  letterSpacing: -0.2,
                }}
              >
                {title}
              </Text>
              <View
              className="text-center fl ex-1">
                <Text
                  numberOfLines={3}
                  style={{
                    marginTop: 7,
                    color: "#B8B8B8",
                    fontSize: 13,
                    lineHeight: 20,
                    textAlign :"center"
                  }}
                >
                  {message}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setIsVisible(false)
              }
              style={{
                // position: "absolute",
                // top: 0,
                // right: 0,
                width: 32,
                height: 32,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  "rgba(255,255,255,0.045)",
                borderWidth: 1,
                borderColor:
                  "rgba(255,255,255,0.07)",
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={26}
                color="#A8A8A8"
              />
            </TouchableOpacity>
          </View>

          {type === "confirm" ? (
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                marginTop: 40,
              }}
              className ="px-4"
            >
              <TouchableOpacity
                activeOpacity={0.82}
                onPress={() => {
                  setIsVisible(false);
                  // onConfirm();
                }}
                style={{
                  flex: 1,
                  // height: 46,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    "rgba(255,255,255,0.045)",
                  borderWidth: 1,
                  borderColor:
                    "rgba(255,255,255,0.09)",
                }}
                className ="py-4"

              >
                <Text
                  style={{
                    color: "#D8D8D8",
                    fontSize: width/27,
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flex: 1,
                  padding: 1,
                  borderRadius: 8,
                  backgroundColor:
                    "rgba(234,179,8,0.42)",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.82}
                  onPress={() => {
                    setIsVisible(false);
                    onConfirm();
                  }}
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#121212",
                    borderWidth: 1,
                    borderColor:
                      "rgba(234,179,8,0.16)",
                  }}
                >
                  <Text
                    style={{
                      color: "#EFD36A",
                      fontSize: width/27,
                      fontWeight: "800",
                      letterSpacing: 0.2,
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                marginTop: 40,
                padding: 1,
                borderRadius: 8,
                // backgroundColor:
                //   "rgba(234,179,8,0.34)",
              }}
              className = "px-4"
            >
              <TouchableOpacity
                activeOpacity={0.82}
                onPress={() =>
                  setIsVisible(false)
                }
                style={{
                  // height: 46,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#111111",
                  borderWidth: 1,
                  borderColor:
                    "rgba(234,179,8,0.24)",
                }}
                className ="py-4 "
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: width/27,
                    fontWeight: "800",
                    letterSpacing: 0.2,
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}