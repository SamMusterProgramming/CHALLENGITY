

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from "react-native";

import Modal from "react-native-modal";

export default function ChallengeAction({
  text,
  action,
  isModalVisible,
  setIsModalVisible,
  joinChallenge,
  removeChallenge,
  toggleFavourite,
  handleTalentParticipation,
  // handleTalentResignition,
  handleVotePost,
  handleFlagPost,
  handleQueue,
  handleDeletePerformanceStage,
  handleDeletePerformanceQueue,
  setParticipationType,
  handleDeleteContestantStage,
  handleDeleteContestantQueue,
  handleDeleteContestantElimination,
  handleBackInQueue,
}) {
  
  const {width , height} = useWindowDimensions()
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const confirmAction = () => {
    const actions = {
      JN: joinChallenge,
      DT: removeChallenge,
      DCE: handleDeleteContestantElimination,
      FA: toggleFavourite,
      RF: toggleFavourite,
      NP: handleTalentParticipation,
      VT: handleVotePost,
      FL: handleFlagPost,
      Q: handleQueue,
      DPS: handleDeletePerformanceStage,
      DCQ: handleDeleteContestantQueue,
      DPQ: handleDeletePerformanceQueue,
      DCS: handleDeleteContestantStage,
      BIQ: handleBackInQueue,
    };
    actions[action]?.();
    closeModal();
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        backdropOpacity={0.9}
        useNativeDriver
        hideModalContentWhileAnimating
        statusBarTranslucent
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
        }}
      >

        {/* MODAL CONTAINER */}
        <View
          className="
            w-[78%]
            bg-[#141415]
            bor der
            bor der-[#F5D77A]/20
            rounded-[20px]
            overflow-hidden
          "
        >

          {/* TOP GOLD LINE */}
          {/* <View className="h-[2px] w-full bg-[#F5D77A]" /> */}

          {/* HEADER */}
          <View
            className="
              px-5
              pt-5
              pb-4
              bord er-b
              bor der-white/5
            "
          >

            <View
              className="
                flex-row
                items-center
                justify-between
              "
            >

              <View>
                <Text
                  className="
                    text-[#F5D77A]
                    text-[11px]
                    tracking-[2px]
                    font-semibold
                  "
                  style={{
                    fontSize:width /38
                  }}
                >
                 TALENTIFY
                </Text>

                <Text
                  className="
                    text-white
                    tex t-[16px]
                    mt-1
                    font-black
                    tracking-wide
                  "
                  style={{
                    fontSize:width /30
                  }}
                >
                  {action === "help"
                    ? "Competition Rules"
                    : "Confirm Action"}
                </Text>
              </View>

              <View
                className="
                  px-2
                  py-[3px]
                  bg-[#F5D77A]/10
                  border
                  bor der-[#F5D77A]/20
                  rounded-[5px]
                "
              >
                <Text
                  className="
                    text-[#F5D77A]
                    text-[10px]
                    font-semibold
                    tracking-[1px]
                  " >
                  LIVE
                </Text>
              </View>

            </View>

          </View>

          {/* BODY */}
          {action !== "help" ? (

            <View className="px-5 py-5">

              <View
                className="
                  b g-[#1d1d1e] bor der bord er-white/5 rounded-[5px] px-4 py-4  " >
                <Text
                  
                  className="
                    text-[#E4E4E7]
                    leading-6
                    text-center
                    font-medium
                  "
                  style={{
                    fontSize:width /33
                  }}
                >
                  {text}
                </Text>

              </View>

            </View>

          ) : (

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="max-h-[340px]"
              contentContainerStyle={{
                padding: 18,
                gap: 14,
              }}
            >

              {/* ROUND 1 */}
              <View
                className="
                  bg-[#151518]
                  border
                  border-white/5
                  rounded-[5px]
                  p-4 " >

                <View
                  className="
                    flex-row
                    items-center
                    justify-between
                    mb-2 " >

                  <Text
                    className="
                      text-[#F5D77A]
                      text-[13px]
                      font-bold
                      tracking-wide
                    "
                  >
                    🔥 Rounds 1 – 3
                  </Text>

                  <View className="w-2 h-2 rounded-full bg-[#F5D77A]" />

                </View>

                <Text
                  className="
                    text-[#D4D4D8]
                    text-[11px]
                    leading-5
                  "
                >
                  <Text className="text-[#F5D77A] font-bold">
                    22 contestants
                  </Text>{" "}
                  compete. The{" "}
                  <Text className="text-[#F5D77A] font-bold">
                    8 lowest ranked
                  </Text>{" "}
                  are eliminated every round.
                </Text>

              </View>

              {/* ROUND 4 */}
              <View
                className="
                  bg-[#151518]
                  border
                  border-white/5
                  rounded-[5px]
                  p-4
                "
              >

                <View
                  className="
                    flex-row
                    items-center
                    justify-between
                    mb-2
                  "
                >

                  <Text
                    className="
                      text-[#F5D77A]
                      text-[13px]
                      font-bold
                      tracking-wide
                    "
                  >
                    🧨 Round 4
                  </Text>

                  <View className="w-2 h-2 rounded-full bg-[#F5D77A]" />

                </View>

                <Text
                  className="
                    text-[#D4D4D8]
                    text-[11px]
                    leading-5 "  >
                  The{" "}
                  <Text className="text-[#F5D77A] font-bold">
                    top 16 contestants
                  </Text>{" "}
                  advance into the knockout phase.
                </Text>

              </View>

              {/* QUARTER */}
              <View
                className="
                  bg-[#151518]
                  border
                  border-white/5
                  rounded-[5px]
                  p-4
                "
              >

                <View
                  className="
                    flex-row
                    items-center
                    justify-between
                    mb-2
                  "
                >

                  <Text
                    className="
                      text-[#F5D77A]
                      text-[13px]
                      font-bold
                      tracking-wide
                    "
                  >
                    ⚔️ Quarter Final
                  </Text>

                  <View className="w-2 h-2 rounded-full bg-[#F5D77A]" />

                </View>

                <Text
                  className="
                    text-[#D4D4D8]
                    text-[11px]
                    leading-5
                  "
                >
                  Only{" "}
                  <Text className="text-[#F5D77A] font-bold">
                    8 contestants
                  </Text>{" "}
                  survive and move forward.
                </Text>

              </View>

              {/* FINAL */}
              <View
                className="
                  bg-[#151518]
                  border
                  border-white/5
                  rounded-[5px]
                  p-4
                "
              >

                <View
                  className="
                    flex-row
                    items-center
                    justify-between
                    mb-2
                  "
                >

                  <Text
                    className="
                      text-[#F5D77A]
                      text-[13px]
                      font-bold
                      tracking-wide
                    "
                  >
                    🏆 Final
                  </Text>

                  <View className="w-2 h-2 rounded-full bg-[#F5D77A]" />

                </View>

                <Text
                  className="
                    text-[#D4D4D8]
                    text-[11px]
                    leading-5 " >
                  <Text className="text-[#F5D77A] font-bold">
                    4 semi finalists
                  </Text>{" "}
                  compete. The final{" "}
                  <Text className="text-[#F5D77A] font-bold">
                    2 battle for the crown
                  </Text>
                  .
                </Text>

              </View>

            </ScrollView>

          )}

          {/* BUTTONS */}
          <View
            className="
              flex-row
              gap-3
              px-5
              pb-5
              pt-1 "  >

            {/* CANCEL */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={closeModal}
              onPressIn={() => {
                setParticipationType("");
              }}
              className="
                flex-1
                p-4
                bg-[#2f2f30]
                border
                border-white/5
                rounded-[10px]
                items-center
                justify-center
              "
            >

              <Text
                className="
                  text-[#A1A1AA]
                  font-bold
                  tracking-[1px]
                "
                style={{
                  fontSize:width /38
                }}
              >
                {action !== "OK" && action !== "help"
                  ? "CANCEL"
                  : "OK"}
              </Text>

            </TouchableOpacity>

            {/* CONFIRM */}
            {action !== "OK" &&
              action !== "help" && (

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={confirmAction}
                className="
                  flex-1
                  h- [48px]
                  p-4
                  bg-[#7d6a09]/70
                  rounded-[10px]
                  items-center
                  justify-center
                "
              >

                <Text
                  className="
                    text-[#ffffff]
                    font-bold
                    tracking-[1px]
                  "
                  style={{
                    fontSize:width /38
                  }}
                >
                  CONFIRM
                </Text>

              </TouchableOpacity>

            )}

          </View>

        </View>

      </Modal>

      <StatusBar
        translucent
        backgroundColor="transparent"
      />
    </>
  );
}