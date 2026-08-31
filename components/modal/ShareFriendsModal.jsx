import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ShareFriendsModal({
  visible,
  onClose,
  friends = [],
  onShare,
}) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [search, setSearch] = useState("");

  const filteredFriends = useMemo(() => {
    if (!search.trim()) {
      return friends;
    }

    const query = search.toLowerCase();

    return friends.filter((friend) =>
      friend.name?.toLowerCase().includes(query)
    );
  }, [friends, search]);

  const toggleFriend = (friend) => {
    setSelectedFriends((prev) => {
      if (prev.includes(friend._id)) {
        return prev.filter((id) => id !== friend._id);
      }
  
      return [...prev, friend._id];
    });
  }

  const isSelected = (friend) => {
    return selectedFriends.some(
      (item) => item._id === friend._id
    );
  };

  const handleShare = () => {
    if (!selectedFriends.length) return;
    onShare?.(selectedFriends);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.80)",
          paddingHorizontal: 14,
        }}
      >
        {/* BACKDROP */}

        {/* <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            inset: 0,
          }}
        /> */}

        {/* MODAL */}

        <View
          style={{
            width: "100%",
            maxWidth: 430,
            maxHeight: height * 0.78,
            alignSelf: "center",
            backgroundColor: "#090909",
            borderRadius: 22,
            // borderWidth: 1,
            // borderColor: "rgba(234,179,8,0.28)",
            overflow: "hidden",

            // shadowColor: "#EAB308",
            // shadowOffset: {
            //   width: 0,
            //   height: 0,
            // },
            // shadowOpacity: 0.18,
            // shadowRadius: 25,
            // elevation: 20,
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

          {/* HEADER */}

          <View
            style={{
              paddingHorizontal: 18,
              paddingTop: 20,
              paddingBottom: 14,
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
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(234,179,8,0.09)",
                  borderWidth: 1,
                  borderColor: "rgba(234,179,8,0.25)",
                }}
              >
                <Ionicons
                  name="people-outline"
                  size={21}
                  color="#EAB308"
                />
              </View>

              {/* TITLE */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    color: "#F4C542",
                    fontSize: width / 25,
                    fontWeight: "900",
                    letterSpacing: 1.2,
                  }}
                >
                  SHARE WITH FRIENDS
                </Text>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.40)",
                    fontSize: width / 37,
                    marginTop: 3,
                  }}
                >
                  Select people to receive this
                </Text>
              </View>

              {/* CLOSE */}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color="rgba(255,255,255,0.55)"
                />
              </TouchableOpacity>
            </View>

            {/* SEARCH */}

            <View
              style={{
                height: 44,
                marginTop: 15,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.035)",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 13,
              }}
            >
              <Ionicons
                name="search-outline"
                size={18}
                color="rgba(255,255,255,0.35)"
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search friends..."
                placeholderTextColor="rgba(255,255,255,0.30)"
                style={{
                  flex: 1,
                  marginLeft: 9,
                  color: "#FFF",
                  fontSize: 14,
                }}
              />
            </View>
          </View>

          {/* FRIEND LIST */}

          <FlatList
            data={filteredFriends}
            keyExtractor={(item) => item._id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingBottom: 10,
            }}
            renderItem={({ item }) => {
              const selected = selectedFriends.includes(item._id);
              return (
                <TouchableOpacity
                  activeOpacity={0.78}
                  onPress={() => toggleFriend(item)}
                  style={{
                    height: 62,
                    borderRadius: 13,
                    paddingHorizontal: 10,
                    marginBottom: 5,
                    flexDirection: "row",
                    alignItems: "center",

                    backgroundColor: selected
                      ? "rgba(234,179,8,0.075)"
                      : "transparent",

                    borderWidth: selected ? 1 : 0,
                    borderColor: "rgba(234,179,8,0.22)",
                  }}
                >
                  {/* AVATAR */}

                  <Image
                    source={{
                      uri: item.profileImage?.publicUrl,
                    }}
                    style={{
                      width: 43,
                      height: 43,
                      borderRadius: 22,
                      backgroundColor: "#171717",
                      borderWidth: 1,
                      borderColor: selected
                        ? "rgba(234,179,8,0.45)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  />

                  {/* NAME */}

                  <View
                    style={{
                      flex: 1,
                      marginLeft: 12,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: selected
                          ? "#F4C542"
                          : "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "700",
                      }}
                    >
                      {item.name}
                    </Text>

                    {!!item.talent && (
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 11,
                          marginTop: 2,
                        }}
                      >
                        {item.talent}
                      </Text>
                    )}
                  </View>

                  {/* CHECK */}

                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: selected
                        ? "#EAB308"
                        : "rgba(255,255,255,0.16)",
                      backgroundColor: selected
                        ? "#EAB308"
                        : "transparent",
                    }}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={15}
                        color="#050505"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 45,
                }}
              >
                <Ionicons
                  name="people-outline"
                  size={42}
                  color="rgba(234,179,8,0.25)"
                />

                <Text
                  style={{
                    marginTop: 12,
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  No friends found
                </Text>
              </View>
            }
          />

          {/* FOOTER */}

          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 10,
              paddingBottom: 15,
              borderTopWidth: 1,
              borderTopColor: "rgba(255,255,255,0.06)",
              backgroundColor: "#090909",
            }}
          >
            {/* SELECTED COUNT */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: selectedFriends.length
                    ? "#EAB308"
                    : "rgba(255,255,255,0.35)",
                  fontSize: 11,
                  fontWeight: "800",
                  letterSpacing: 1.1,
                }}
              >
                {selectedFriends.length}{" "}
                {selectedFriends.length === 1
                  ? "FRIEND"
                  : "FRIENDS"}{" "}
                SELECTED
              </Text>
            </View>

            {/* SHARE BUTTON */}

            <TouchableOpacity
              activeOpacity={0.85}
              disabled={!selectedFriends.length}
              onPress={handleShare}
              style={{
                height: 54,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",

                backgroundColor: selectedFriends.length
                  ? "#EAB308"
                  : "rgba(255,255,255,0.06)",

                borderWidth: 1,
                borderColor: selectedFriends.length
                  ? "#EAB308"
                  : "rgba(255,255,255,0.08)",
              }}
            >
              <Text
                style={{
                  color: selectedFriends.length
                    ? "#050505"
                    : "rgba(255,255,255,0.25)",
                  fontSize: 14,
                  fontWeight: "900",
                  letterSpacing: 1.5,
                }}
              >
                SHARE
              </Text>

              <Ionicons
                name="arrow-forward"
                size={19}
                color={
                  selectedFriends.length
                    ? "#050505"
                    : "rgba(255,255,255,0.20)"
                }
                style={{
                  marginLeft: 8,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}