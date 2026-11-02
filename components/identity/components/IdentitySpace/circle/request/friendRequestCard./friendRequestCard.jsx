import {
    Image,
    Pressable,
    Text,
    View,
  } from "react-native";
  import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
  import { LinearGradient } from "expo-linear-gradient";
  import CountryFlag from "../../../../../../common/CountryFlag";
  
  const FriendRequestCard = ({
    user,
    width,
    height,
    scale,
    onAccept,
    onDeny,
    loading = false,
  }) => {

   
    const profileImage =
      user?.profileImage?.publicUrl ||
      user?.profileImage.cdnUrl ||
      null;
  
    const name =
      user?.name ||
      user?.fullname ||
      user?.username ||
      "Unknown";
  
    const username = user?.username
      ? `@${user.username}`
      : null;
  
    const talent =
      user?.talent &&
      user.talent !== "add your profession"
        ? user.talent
        : "Creator";
  
    const region =
      user?.region ||
      user?.state ||
      "Charlotte";
  
    const country =
      user?.country?.toLowerCase() ||
      "us";
  
    return (
      <View
        style={{
          width,
          height,
          borderRadius: scale(8),
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={[
            "rgba(34,37,41,0.98)",
            "rgba(13,15,18,0.99)",
            "rgba(25,28,32,0.98)",
          ]}
          locations={[0, 0.52, 1]}
          style={{
            flex: 1,
            padding: scale(9),
            borderRadius: scale(8),
            borderWidth: 1,
            borderColor:
              "rgba(255,255,255,0.065)",
          }}
        >
          {/* ------------------------------------------ */}
          {/* PROFILE */}
          {/* ------------------------------------------ */}
  
          <Pressable
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* PROFILE IMAGE */}
  
            <View
              style={{
                width: scale(40),
                height: scale(40),
                borderRadius: scale(22),
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor:
                  "rgba(232,185,90,0.07)",
                borderWidth: 1,
                borderColor:
                  "rgba(232,185,90,0.18)",
              }}
            >
              {profileImage ? (
                <Image
                  source={{
                    uri: profileImage,
                  }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <Ionicons
                  name="person"
                  size={scale(20)}
                  color="rgba(232,185,90,0.65)"
                />
              )}
            </View>
  
            {/* NAME */}
  
            <View
              style={{
                flex: 1,
                minWidth: 0,
                marginLeft: scale(8),
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "#F1F1F1",
                  fontSize: scale(10.5),
                  fontWeight: "700",
                  letterSpacing: 0.15,
                }}
              >
                {name}
              </Text>
  
              {username && (
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: scale(1.5),
                    color:
                      "rgba(255,255,255,0.38)",
                    fontSize: scale(8),
                    fontWeight: "500",
                  }}
                >
                  {username}
                </Text>
              )}
  
              <Text
                numberOfLines={1}
                style={{
                  marginTop: scale(2),
                  color:
                    "rgba(232,185,90,0.75)",
                  fontSize: scale(8.2),
                  fontWeight: "500",
                }}
              >
                {talent}
              </Text>
            </View>
  
            {/* REQUEST INDICATOR */}
  
            <View
              style={{
                width: scale(24),
                height: scale(24),
                borderRadius: scale(12),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  "rgba(232,185,90,0.075)",
                borderWidth: 1,
                borderColor:
                  "rgba(232,185,90,0.16)",
              }}
            >
              <MaterialCommunityIcons
                name="account-plus-outline"
                size={scale(13)}
                color="rgba(232,185,90,0.78)"
              />
            </View>
          </Pressable>
  
          {/* ------------------------------------------ */}
          {/* REGION */}
          {/* ------------------------------------------ */}
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: scale(7),
            }}
          >
            <View
              style={{
                width: scale(21),
                height: scale(18),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CountryFlag
                size={scale(15)}
                code={country}
              />
            </View>
  
            <Text
              numberOfLines={1}
              style={{
                marginLeft: scale(4),
                color:
                  "rgba(255,255,255,0.42)",
                fontSize: scale(8.5),
                fontWeight: "500",
              }}
            >
              {region}
            </Text>
  
            <Text
              style={{
                marginHorizontal: scale(4),
                color:
                  "rgba(255,255,255,0.20)",
                fontSize: scale(7),
              }}
            >
              •
            </Text>
  
            <Text
              style={{
                color:
                  "rgba(255,255,255,0.72)",
                fontSize: scale(8.5),
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {country}
            </Text>
          </View>
  
          {/* ------------------------------------------ */}
          {/* REQUEST MESSAGE */}
          {/* ------------------------------------------ */}
  
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingVertical: scale(5),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: scale(4),
                  height: scale(4),
                  borderRadius: scale(2),
                  backgroundColor: "#E8B95A",
                  marginRight: scale(6),
                }}
              />
  
              <Text
                style={{
                  color:
                    "rgba(255,255,255,0.38)",
                  fontSize: scale(7.5),
                  letterSpacing: 0.25,
                }}
              >
                WANTS TO CONNECT
              </Text>
            </View>
          </View>
  
          {/* ------------------------------------------ */}
          {/* ACTIONS */}
          {/* ------------------------------------------ */}
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(6),
            }}
          >
            {/* DECLINE */}
  
            <Pressable
              // disabled={loading}
              onPress={() =>
                onDeny?.(user)
              }
              style={{
                flex: 0.42,
                height: scale(27),
                borderRadius: scale(6),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor:
                  "rgba(255,255,255,0.035)",
                borderWidth: 1,
                borderColor:
                  "rgba(255,255,255,0.09)",
                opacity: loading ? 0.5 : 1,
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={scale(13)}
                color="rgba(255,255,255,0.52)"
              />
  
              <Text
                style={{
                  marginLeft: scale(4),
                  color:
                    "rgba(255,255,255,0.58)",
                  fontSize: scale(8),
                  fontWeight: "600",
                }}
              >
                Decline
              </Text>
            </Pressable>
  
            {/* ACCEPT */}
  
            <Pressable
              // disabled={loading}
              onPress={() =>{
                onAccept?.(user)
              }
              }
              style={{
                flex: 0.58,
                height: scale(27),
                borderRadius: scale(6),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor:
                  "rgba(232,185,90,0.16)",
                borderWidth: 1,
                borderColor:
                  "rgba(232,185,90,0.38)",
                opacity: loading ? 0.5 : 1,
              }}
            >
              <MaterialCommunityIcons
                name="check"
                size={scale(13)}
                color="#E8B95A"
              />
  
              <Text
                style={{
                  marginLeft: scale(4),
                  color: "#E8B95A",
                  fontSize: scale(8),
                  fontWeight: "700",
                  letterSpacing: 0.15,
                }}
              >
                Accept
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>
    );
  };
  
  export default FriendRequestCard;