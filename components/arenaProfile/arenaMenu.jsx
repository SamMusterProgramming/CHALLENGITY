import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";



export function ArenaMenu({
    arena,
    setShowArenaMenu,
    setOpenEditArenaModal,
    setArenaActionModal,
    setOpenArenaAlertModal,
  }) {
    return (
      <View
        style={{
          position: "absolute",
          top: 66,
          right: 16,
          width: 205,
          borderRadius: 17,
          overflow: "hidden",
          backgroundColor: "#0B1012",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.13)",
          zIndex: 100,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 20,
        }}
      >
        <MenuItem
          icon="pencil-outline"
          label="Edit arena"
          onPress={() => {
            setShowArenaMenu(false);
            setOpenEditArenaModal(true);
          }}
        />
  
        <MenuDivider />
  
        <MenuItem
          icon="share-variant-outline"
          label="Share arena"
          onPress={() => {
            setShowArenaMenu(false);
            setOpenArenaAlertModal(true);
          }}
        />
  
        <MenuDivider />
  
        <MenuItem
          icon="trash-can-outline"
          label="Delete arena"
          destructive
          onPress={() => {
            if ((arena?.posts?.length || 0) > 0) {
              setArenaActionModal("delete_arena_deny");
            } else {
              setArenaActionModal("delete_arena");
            }
  
            setOpenArenaAlertModal(true);
            setShowArenaMenu(false);
          }}
        />
      </View>
    );
  }
  

  function MenuItem({
    icon,
    label,
    onPress,
    destructive = false,
  }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          minHeight: 53,
  
          paddingHorizontal: 14,
  
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: destructive
              ? "rgba(239,68,68,0.07)"
              : "rgba(255,255,255,0.045)",
          }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={17}
            color={destructive ? "#EF6464" : "#DDB83F"}
          />
        </View>
  
        <Text
          style={{
            marginLeft: 11,
  
            color: destructive
              ? "#EF6464"
              : "#ECECEE",
  
            fontSize: 13,
  
            fontWeight: "700",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  function MenuDivider() {
    return (
      <View
        style={{
          height: 1,
  
          backgroundColor: "rgba(255,255,255,0.06)",
        }}
      />
    );
  }
  