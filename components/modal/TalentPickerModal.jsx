import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { stageIcons } from "../../utilities/TypeData";

const { width, height } = Dimensions.get("window");

const TALENTS = [
  {
    id: "dancing",
    label: "Dancing",
    icon: stageIcons["Dancing"],
  },
  {
    id: "singing",
    label: "Singing",
    icon: stageIcons["Singing"],
  },
  {
    id: "art",
    label: "Art",
    icon: stageIcons["Art"],
  },
  {
    id: "instrument",
    label: "Instrument",
    icon: "musical-notes-outline",
  },
  {
    id: "comedy",
    label: "Comedy",
    icon: "happy-outline",
  },
  {
    id: "magic",
    label: "Magic",
    icon: "sparkles-outline",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: "fitness-outline",
  },
  {
    id: "sport",
    label: "Sport",
    icon: "trophy-outline",
  },
];

const TalentPickerModal = ({
  visible,
  onClose,
  selectedTalent,
  onSelectTalent,
  onSelectAll,
}) => {

const handleTalentPress = (talent) => {
        const value =
          typeof talent === "string"
            ? talent
            : talent.label;
      
        onSelectTalent?.(value);
};


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* BACKDROP */}

      <View className="flex-1 items-center justify-center bg-black/75 px-5">
        {/* Tap outside to close */}

        <Pressable
          onPress={onClose}
          className="absolute inset-0"
        />

        {/* MODAL */}

        <View
          className="relative w-full max-w-[430px] overflow-hidden border border-yellow-500/40 bg-[#080808]"
          style={{
            borderRadius: 18,
            shadowColor: "#EAB308",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.22,
            shadowRadius: 24,
            elevation: 20,
          }}
        >
          {/* subtle top glow */}

          {/* <View className="absolute left-0 right-0 top-0 h-[1px] bg-yellow-400/80" /> */}

          {/* CLOSE */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            className="absolute right-4 top-4 z-20 h-9 w-9 items-center justify-center"
          >
            <Ionicons
              name="close"
              size={24}
              color="rgba(255,255,255,0.65)"
            />
          </TouchableOpacity>

          {/* HEADER */}

          <View className="items-center px-6 pb-5 pt-7">
            {/* Trophy / talent emblem */}

            <View
              className="mb-4 h-14 w-14 items-center justify-center border border-yellow-500/50 bg-yellow-500/10"
              style={{
                borderRadius: 16,
              }}
            >
              <Ionicons
                name="sparkles"
                size={27}
                color="#EAB308"
              />
            </View>

            <Text className="text-center text-[21px] font-extrabold uppercase tracking-[4px] text-yellow-400">
              Choose Talent
            </Text>

            <Text className="mt-2 max-w-[270px] text-center text-[11px] font-medium leading-4 tracking-[0.5px] text-white/45">
              Select a talent to discover challenges and arenas
            </Text>
          </View>

          {/* TALENT GRID */}

          <View className="px-5">
            <View className="flex-row flex-wrap justify-between">
              {TALENTS.map((talent) => (
                <TouchableOpacity
                  key={talent.id}
                  activeOpacity={0.75}
                  onPress={() => {
                    handleTalentPress(talent);
                    onClose()
                   }
                  }
                  style = {{
                    backgroundColor : talent.label === selectedTalent ? "rgba(234, 179, 8, 0.1)" : ""
                  }}
                  className="mb-2.5 h-[82px] w-[48.2%] items-center justify-center border border-yellow-500/40 bg-[#0D0D0D]"
                >
                  {/* icon */}

                  {/* <Ionicons
                    name={talent.icon}
                    size={25}
                    color="#EAB308"
                  /> */}
                  <Text className="mt-2 text-[15px] font-bold uppe rcase tracki ng-[1.2px] text-white">
                      {stageIcons[talent.label]}
                  </Text>
                  {/* label */}

                  <Text className="mt-2 text-[11px] font-bold uppercase tracking-[1.2px] text-yellow-400">
                    {talent.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ALL TALENTS */}

            {/* <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                handleTalentPress("ALL TALENT");
                onClose()
               }
              }
              className="mb-5 mt-1 h-[72px] w-full flex-row items-center justify-center border border-yellow-400 bg-yellow-500/10"
              style={{
                borderRadius: 5,
                shadowColor: "#EAB308",
                backgroundColor : selectedTalent == "ALL TALENT" ?"rgba(234, 179, 8, 0.1)" :"",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Ionicons
                name="grid-outline"
                size={21}
                color="#EAB308"
              />

              <Text className="ml-4 text-[14px] font-extrabold uppercase tracking-[2.5px] text-yellow-400">
                All Talents
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* bottom accent */}

          <View className="h-[2px] w-full bg-yellow-500/20" />
        </View>
      </View>
    </Modal>
  );
};

export default TalentPickerModal;