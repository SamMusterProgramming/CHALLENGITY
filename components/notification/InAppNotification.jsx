// // components/InAppNotification.jsx

// import {
//     useEffect,
//     useState,
//   } from "react";
  
//   import {
//     Pressable,
//     Text,
//     View,
//   } from "react-native";
// import { clearForegroundNotification, subscribeForegroundNotification } from "../../notifications/foregroundNotificationStore";
// import { routeNotification } from "../../notifications/notificationRouter";
  
// export default function InAppNotification() {
  
//     const [
//       notification,
//       setNotification,
//     ] = useState(null);
  
//     useEffect(() => {
//       console.log("about to show banner")
//       const unsubscribe =
//         subscribeForegroundNotification(
//           (notif) => {
//             setNotification(notif);
//           }
//         );
//       return unsubscribe;
//     }, []);
  
//     if (!notification)
//       return null;
  
//     return (
//       <Pressable
//         onPress={() => {
//           routeNotification(
//             notification.data
//           );
//           clearForegroundNotification();
//         }}
//         style={{
//           position: "absolute",
//           top: 60,
//           left: 20,
//           right: 20,
//           zIndex: 9999,
//           backgroundColor: "#111",
//           padding: 16,
//           borderRadius: 14,
//         }}
//       >
  
//         <Text
//           style={{
//             color: "white",
//             fontWeight: "bold",
//           }}
//         >
//           {notification?.title || "hello"}
//         </Text>
  
//         <Text
//           style={{
//             color: "white",
//             marginTop: 4,
//           }}
//         >
//           {notification?.body}
//         </Text>
  
//       </Pressable>
//     );
  
//   }

import {
    useEffect,
    useState,
  } from "react";
  
  import {
    Pressable,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  
  import {
    clearForegroundNotification,
    subscribeForegroundNotification,
  } from "../../notifications/foregroundNotificationStore";
  
  import {
    routeNotification,
  } from "../../notifications/notificationRouter";
  
  export default function InAppNotification() {
  
    const [
      notification,
      setNotification,
    ] = useState(null);
  
    useEffect(() => {
      const unsubscribe =
        subscribeForegroundNotification(
          (notif) => {
            setNotification(notif);
          }
        );
  
      return unsubscribe;
    }, []);
  
    if (!notification)
      return null;
  
    return (
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 65,
          left: 12,
          right: 12,
          zIndex: 99999,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            routeNotification(
              notification.data
            );
            clearForegroundNotification();
            setNotification(null);
          }}
          style={{
            width: "100%",
            backgroundColor:
              "rgba(255,255,255,0.96)",
            borderRadius: 22,
            paddingVertical: 12,
            paddingHorizontal: 14,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.18,
            shadowRadius: 20,
            elevation: 18,
            borderWidth: 1,
            borderColor:
              "rgba(255,255,255,0.9)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* ICON */}
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                backgroundColor:
                  "#FFF8DB",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                🔔
              </Text>
            </View>
  
            {/* CONTENT */}
            <View
              style={{
                flex: 1,
                marginLeft: 12,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "#111",
                  fontWeight: "800",
                  fontSize: 14,
                }}
              >
                {notification?.title ||
                  "New Activity"}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  color: "#555",
                  marginTop: 2,
                  fontSize: 13,
                  lineHeight: 18,
                }}
              >
                {notification?.body}
              </Text>
            </View>
  
            {/* CLOSE BUTTON */}
            <TouchableOpacity
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
              onPress={() => {
                clearForegroundNotification();
                setNotification(null);
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#888",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                ×
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* GOLD ACCENT BAR */}
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              borderTopLeftRadius: 22,
              borderBottomLeftRadius: 22,
              backgroundColor: "#FACC15",
            }}
          />
        </Pressable>
      </View>
    );
  }