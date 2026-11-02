import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";
import CountryFlag from "../../../../../../common/CountryFlag";
import { router } from "expo-router";





const FriendCard = ({
    friend,
    width,
    height,
    scale,
  }) => {
    const profileImage =
      friend?.profileImage?.publicUrl ||
      friend?.profileImage ||
      null;
  
    const name =
      friend?.name ||
      friend?.fullname ||
      friend?.username ||
      "Unknown";
  
    const username = friend?.username
      ? `@${friend.username}`
      : null;
  
    const talent =
      friend?.talent &&
      friend.talent !== "add your profession"
        ? friend.talent
        : "Creator";
  
    const region =
      friend?.region ||
      friend?.state ||
      "Charlotte";
  
    const country =
      friend?.country?.toLowerCase() ||
      "US";
  
    const myBio =
      friend?.tellus ||
      "Creating, representing my region, and pushing my talent forward.";
  
    return (
      <Pressable
      onPress={() => {
          router.replace({
          pathname: "/ProfileScreen",
          params: {
            profile_id : friend._id,
            arena_id : null
          },
      });
      }}
        className="overflow-hidden"
        style={{
          width,
          height,
          borderRadius: scale(5),
        }}
      >
        <LinearGradient
          colors={[
            "rgba(34,37,41,0.96)",
            "rgba(16,18,21,0.98)",
            "rgba(27,30,34,0.96)",
          ]}
          locations={[0, 0.5, 1]}
          style={{
            flex: 1,
            padding: scale(9),
            borderRadius: scale(8),
            borderWidth: 1,
            borderColor:
              "rgba(255,255,255,0.055)",
          }}
        >
          {/* TOP SECTION */}
  
          <View className="flex-row items-center">
            {/* PROFILE IMAGE */}
  
            <View
              className="items-center justify-center overflow-hidden"
              style={{
                width: scale(38),
                height: scale(38),
                borderRadius: scale(21),
                backgroundColor:
                  "rgba(232,185,90,0.075)",
                borderWidth: 1,
                borderColor:
                  "rgba(232,185,90,0.16)",
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
                  color="rgba(232,185,90,0.68)"
                />
              )}
            </View>
  
            {/* NAME + TALENT */}
  
            <View
              className="justify-center"
              style={{
                flex: 1,
                minWidth: 0,
                marginLeft: scale(8),
              }}
            >
              <Text
                numberOfLines={1}
                className="font-semibold"
                style={{
                  color: "#F1F1F1",
                  fontSize: scale(10.5),
                  letterSpacing: 0.15,
                }}
              >
                {name}
              </Text>
  
              <Text
                numberOfLines={1}
                style={{
                  marginTop: scale(2),
                  color: "rgba(232,185,90,0.78)",
                  fontSize: scale(8.5),
                  fontWeight: "500",
                }}
              >
                {talent}
              </Text>
            </View>
          </View>
  
          {/* REGION */}
  
          <View
            className="flex-row items-center"
            style={{
              marginTop: scale(7),
            }}
          >
            <View
              className="items-center justify-center"
              style={{
                width: scale(21),
                height: scale(18),
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
                color: "rgba(255,255,255,0.42)",
                fontSize: scale(9),
                fontWeight: "500",
              }}
            >
              {region}
            </Text>
  
            <Text
              style={{
                marginHorizontal: scale(4),
                color: "rgba(255,255,255,0.22)",
                fontSize: scale(7),
              }}
            >
              •
            </Text>
  
            <Text
              numberOfLines={1}
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: scale(9),
                textTransform: "uppercase",
              }}
            >
              {country}
            </Text>
          </View>
  
          {/* BIO */}
  
          {/* <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: scale(5),
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                color: "rgba(255,255,255,0.42)",
                fontSize: scale(7.5),
                lineHeight: scale(10),
              }}
            >
              {myBio}
            </Text>
          </View> */}
  
          {/* REPRESENTATION ACCENT */}
  
          {/* <View
            className="flex-row items-center"
            style={{
              marginTop: scale(5),
            }}
          >
            <View
              style={{
                width: scale(16),
                height: 1,
                backgroundColor:
                  "rgba(232,185,90,0.42)",
              }}
            />
  
            <Text
              style={{
                marginLeft: scale(5),
                color: "rgba(232,185,90,0.48)",
                fontSize: scale(6.5),
                letterSpacing: 0.7,
                fontWeight: "600",
              }}
            >
              REPRESENT
            </Text>
          </View> */}
        </LinearGradient>
      </Pressable>
    );
  };
  
  export default FriendCard;