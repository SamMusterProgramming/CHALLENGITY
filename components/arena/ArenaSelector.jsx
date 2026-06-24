import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function ArenaSelector({
  userArenas,
  selectedArena,
  setSelectedArena,
  onCreateArena,
}) {
  const { width, height } = useWindowDimensions();
  const {openArenaAlertModal, setOpenArenaAlertModal , setArenaActionModal} = useGlobalContext()
  const [visible, setVisible] = useState(false);

  const renderArena = ({ item }) => {
    const active =
      item._id === selectedArena?._id;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setSelectedArena(item);
          setVisible(false);
        }}
        style={{
          marginHorizontal: 18,
          marginBottom: 12,
          borderRadius: 18,
          padding: 16,
          backgroundColor: active
            ? "#1A1404"
            : "#111214",
          borderWidth: 1,
          borderColor: active
            ? "#eab308"
            : "rgba(255,255,255,0.05)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: width / 26,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {item.arenaName}
          </Text>

          {active && (
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#eab308"
            />
          )}
        </View>

        <Text
          style={{
            color: "#eab308",
            marginTop: 5,
            fontSize: width / 34,
          }}
        >
          {item.region} • {item.talentType}
        </Text>

        {!!item.biography && (
          <Text
            numberOfLines={2}
            style={{
              color: "#9CA3AF",
              marginTop: 8,
              fontSize: width / 34,
            }}
          >
            {item.biography}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* SELECTOR BAR */}

      <View
        style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   zIndex: 999,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor:
            "rgba(5,5,5,0.96)",
          borderBottomWidth: 1,
          borderBottomColor:
            "rgba(234,179,8,0.08)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {/* SELECTOR */}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              setVisible(true)
            }
            style={{
              width: width * 0.98,
              height: 52,
              borderRadius: 999,
              backgroundColor:
                "#111214",
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.18)",
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                "space-between",
              paddingHorizontal: 18,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#eab308",
                  fontSize: 16,
                }}
              >
                🎭
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  fontWeight: "700",
                  fontSize:
                    width / 28,
                }}
              >
                {selectedArena?.arenaName ||
                  "Select Arena"}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#eab308"
            />
          </TouchableOpacity>

          {/* ADD BUTTON */}

          {/* <TouchableOpacity
            activeOpacity={0.9}
            // onPress ={onCreateArena}
            onPress ={() => {
                setOpenArenaAlertModal(true)
                setArenaActionModal("create_arena")
            }}

            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              backgroundColor:
                "#111214",
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.18)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color="#eab308"
            />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* BOTTOM SHEET */}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Pressable
          onPress={() =>
            setVisible(false)
          }
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor:
              "rgba(0,0,0,0.75)",
          }}
        >
          <Pressable
            style={{
              backgroundColor:
                "#0B0B0D",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingTop: 22,
              paddingBottom: 40,
              maxHeight:
                height * 0.72,
            }}
          >
            <View
              style={{
                width: 50,
                height: 5,
                borderRadius: 999,
                backgroundColor:
                  "#3A3A3A",
                alignSelf: "center",
                marginBottom: 20,
              }}
            />

            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: width / 18,
                paddingHorizontal: 20,
                marginBottom: 14,
              }}
            >
              Select Arena
            </Text>

            <FlatList
              data={userArenas}
              keyExtractor={item =>
                item._id
              }
              renderItem={renderArena}
              showsVerticalScrollIndicator={
                false
              }
              ListFooterComponent={
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress ={() => {
                    setOpenArenaAlertModal(true)
                    setArenaActionModal("create_arena")
                    setVisible(false)
                  }}
                  style={{
                    marginHorizontal: 18,
                    marginTop: 8,
                    marginBottom: 25,
                    borderRadius: 20,
                    paddingVertical: 18,
                    backgroundColor:
                      "#151109",
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor:
                      "rgba(234,179,8,0.35)",
                    alignItems: "center",
                    justifyContent:
                      "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={28}
                    color="#eab308"
                  />

                  <Text
                    style={{
                      color: "#eab308",
                      marginTop: 8,
                      fontWeight: "700",
                      fontSize:
                        width / 28,
                    }}
                  >
                    Create New Arena
                  </Text>

                  <Text
                    style={{
                      color: "#9CA3AF",
                      marginTop: 4,
                      fontSize:
                        width / 34,
                    }}
                  >
                    Showcase another talent
                  </Text>
                </TouchableOpacity>
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}