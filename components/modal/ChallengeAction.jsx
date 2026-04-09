
  
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Modal from "react-native-modal";

export default function ChallengeAction({
  text,
  action,
  isModalVisible,
  setIsModalVisible,
  joinChallenge,
  removeChallenge,
  addFavourite,
  removeFromFavourite,
  handleTalentParticipation,
  // handleTalentResignition,
  handleVotePost,
  handleFlagPost,
  handleQueue ,
  handleDeletePerformanceStage,
  handleDeletePerformanceQueue,
  setParticipationType,
  handleDeleteContestantStage,
  handleDeleteContestantQueue,
  handleDeleteContestantElimination,
  handleBackInQueue
}) {

  const closeModal = () => {
    setIsModalVisible(false);
  }

  const confirmAction = () => {
    const actions = {
      JN: joinChallenge,
      DT: removeChallenge,
      DCE:handleDeleteContestantElimination,
      FA: addFavourite,
      RF: removeFromFavourite,
      NP: handleTalentParticipation,
      VT: handleVotePost,
      FL: handleFlagPost,
      Q: handleQueue ,
      DPS: handleDeletePerformanceStage,
      DCQ:handleDeleteContestantQueue,
      DPQ: handleDeletePerformanceQueue,
      DCS:handleDeleteContestantStage,
      BIQ :handleBackInQueue
    };
    actions[action]?.();
    closeModal();
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.85}
        useNativeDriver
        hideModalContentWhileAnimating
        statusBarTranslucent
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
      >

        <View className="w-[88%] bg-[#111111] border border-yellow-400/30 rounded-2xl p-4">

          {/* CONTENT */}
          {action !== "help" ? (
            <View className="bg-black/60 rounded-xl px-4 py-3">
              <Text className="text-gray-200 text-[13px] text-center">
                {text}
              </Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="max-h-[300px]"
            >
              <View className="gap-3">

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    🔥 Rounds 1 – 3
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    <Text className="text-yellow-400 font-semibold">22 contestants</Text> compete.
                    The <Text className="text-yellow-400 font-semibold">8 lowest ranked</Text> are eliminated each round.
                  </Text>
                </View>

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    🧨 Round 4
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    The <Text className="text-yellow-400 font-semibold">top 16</Text> advance to knockout stage.
                  </Text>
                </View>

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    ⚔️ Quarter Final
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    Only <Text className="text-yellow-400 font-semibold">8 contestants</Text> remain.
                  </Text>
                </View>

                <View>
                  <Text className="text-yellow-400 text-[13px] font-semibold mb-1">
                    🏆 Final
                  </Text>
                  <Text className="text-gray-300 text-[11px] leading-4">
                    <Text className="text-yellow-400 font-semibold">4 semi finalists</Text> compete.
                    The final <Text className="text-yellow-400 font-semibold">2 battle for the crown</Text>.
                  </Text>
                </View>

              </View>
            </ScrollView>
          )}

          {/* BUTTONS */}
          <View className="flex-row gap-3 mt-4">

            <TouchableOpacity
              onPress={
                 closeModal 
              }
              onPressIn={ ()=> {setParticipationType("") }}
              className="flex-1 bg-zinc-800 rounded-xl py-2 items-center"
            >
              <Text className="text-yellow-400 text-[12px] font-semibold">
                {action !== "OK" && action !== "help" ? "Cancel" : "Ok"}
              </Text>
            </TouchableOpacity>

            {action !== "OK" && action !== "help" && (
              <TouchableOpacity
                onPress={confirmAction}
                className="flex-1 bg-yellow-600 rounded-xl py-2 items-center"
              >
                <Text className="text-gray-900 text-[12px] font-semibold">
                  Confirm
                </Text>
              </TouchableOpacity>
            )}

          </View>

        </View>

      </Modal>

      <StatusBar translucent backgroundColor="transparent" />
    </>
  );
}