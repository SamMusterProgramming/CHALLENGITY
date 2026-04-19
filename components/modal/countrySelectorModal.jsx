import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { countries } from "../../utilities/TypeData";
import { Ionicons } from "@expo/vector-icons";

export default function CountrySelectorModal({
  visible,
  onClose,
  onSelect,
}) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item.code);
        onClose();
      }}
      className="flex-1 m-2 p-2 rounded-sm bg-[#111] border border-white/10 items-center justify-center"
    >
      <Text className="text-lg">{item.flag}</Text>
      <Text
        numberOfLines={1}
        className="text-gray-300 text-xs mt-1 font-bebas tracking-wider text-center"
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      {/* 🎬 Cinematic Background */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/80 justify-center items-center"
      >
        {/* ✨ Modal Container */}
        <Pressable
          onPress={() => {}}
          className="w-[95%] max-h-[75%] rounded-2xl overflow-hidden border border-yellow-500/20"
        >
          {/* 🔥 Subtle Gold Glow */}
          <LinearGradient
            colors={["rgba(255,215,0,0.2)", "transparent"]}
            style={{ height: 30, width: "100%", position: "absolute", top: 0 }}
          />

          <View className="bg-[#0b0b0f] p-1">

            {/* 🎬 Header */}
            {/* <Text className="text-white text-lg font-extrabold tracking-widest text-center mb-3">
              SELECT REGION
            </Text> */}

            {/* 🌍 Countries Grid */}
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              numColumns={5}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />

          </View>
        </Pressable>

      <TouchableOpacity
            onPress={() => onClose()}
            className="absolute bg-slate-100 rounded-full  bottom-[30] p-1">
                <Ionicons name="close"  size={30}  color={"while"} />
      </TouchableOpacity>   
      </Pressable>
    
    </Modal>
  );
}
