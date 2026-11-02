import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../context/GlobalProvider";
import CreateArenaModal from "../../../../modal/createArenaModal";
import { createArenaByUser, getArenaByUser } from "../../../../../apiCalls/arenas";
import { removeUploadJob, subscribeToUploadQueue, UPLOAD_TYPE } from "../../../../../services/uploads";


export default function LegacyBuilder() {
  const {
    user,
    setUserArenas,
    setSelectedArena,
    spacing,
    scale,
  } = useGlobalContext();

  const [openModal, setOpenModal] = useState(false);
  const GOLD = "#E8B95A";

  const createArena = async (formData) => {
    try {
      const result = await createArenaByUser(user._id, formData);
      if (!result || result.message) return;
      setUserArenas(result.arenas);
      setSelectedArena(result.selectedArena);
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to create arena:", error);
    }
  };


  useEffect(() => {
    const userId = user?._id;
    if (!userId) return;
    let active = true;
    const unsubscribe = subscribeToUploadQueue(async ({ event, job }) => {
      if (!active) return;
      if (event !== "job_completed") return;
      if (job?.type !== UPLOAD_TYPE.ARENA) return;
      try {
        await getArenaByUser(userId, setUserArenas);
        if (!active) return;

        if (job?.id) {
          await removeUploadJob(job.id);
        }
      } catch (error) {
        console.error("[ArenaListener] Failed to refresh arenas:", error);
      }
    });
  
    return () => {
      active = false;
      console.log("[ArenaListener] Unsubscribing from upload queue");
      unsubscribe?.();
    };
  }, []);


  return (
    <>
      <View
        style={{
          width: "100%",
          // paddingHorizontal: spacing(10),
          // paddingTop: spacing(20),
          paddingBottom: spacing(16),
          // marginTop : - 2.5
        }}
      >
        {/* LEGACY BUILDER CARD */}
        <View
          style={{
            paddingHorizontal: spacing(20),
            paddingTop: spacing(22),
            paddingBottom: spacing(20),
          }}
          // className= "border-x-[rgba(232,185,90,0.38)] border-b-[rgba(232,185,90,0.38)] rounded-b-xl border-[1px]"
        >
          {/* EYEBROW */}
        
    

          {/* TITLE */}
          <Text
            style={{
              color: "#F4F0E8",
              fontSize: scale(20),
              lineHeight: scale(32),
              fontWeight: "900",
              letterSpacing: scale(-0.5),
            }}
          >
            Build your legacy.
          </Text>

          {/* INTRODUCTION */}
          <Text
            style={{
              marginTop: spacing(10),
              color: "rgba(244,240,232,0.72)",
              fontSize: scale(12),
              lineHeight: scale(20),
            }}
          >
            Your talent is what makes you unique. Give it a
            space to grow, stand out, and be recognized.
          </Text>

       

          {/* CREATE ARENA CTA */}
          <Pressable
            onPress={() => setOpenModal(true)}
            accessibilityRole="button"
            accessibilityLabel="Create an Arena"
            style={{
              width: "100%",
              marginTop : spacing(24) ,
              paddingVertical: scale(12),
              paddingHorizontal: spacing(16),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: GOLD,
              borderRadius: scale(7),
              borderWidth: 1,
              borderColor: "#F2CC79",
            }}
          >
            <Ionicons
              name="add"
              size={scale(21)}
              color="#15120B"
            />

            <Text
              style={{
                marginLeft: spacing(8),
                color: "#15120B",
                fontSize: scale(13),
                fontWeight: "900",
                letterSpacing: scale(0.35),
              }}
            >
              Create Your Arena
            </Text>

            <Ionicons
              name="arrow-forward"
              size={scale(16)}
              color="#15120B"
              style={{
                marginLeft: spacing(10),
              }}
            />
          </Pressable>

          {/* SEPARATOR */}
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.07)",
              marginTop: spacing(21),
              marginBottom: spacing(18),
            }}
          />

          {/* FIND A STAGE */}
          <Pressable
            onPress={() => {
              // Connect your stage-discovery navigation here.
            }}
            accessibilityRole="button"
            accessibilityLabel="Find a Stage"
            style={{
              minHeight: scale(58),
              paddingHorizontal: spacing(12),
              paddingVertical: spacing(10),
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(232,185,90,0.17)",
              borderRadius: scale(7),
              backgroundColor: "rgba(232,185,90,0.035)",
            }}
          >
            <View
              style={{
                width: scale(38),
                height: scale(38),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(232,185,90,0.09)",
                borderRadius: scale(6),
              }}
            >
              <Ionicons
                name="trophy-outline"
                size={scale(19)}
                color={GOLD}
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: spacing(12),
              }}
            >
              <Text
                style={{
                  color: "#F4F0E8",
                  fontSize: scale(12),
                  fontWeight: "800",
                }}
              >
                Find Your Stage
              </Text>

              <Text
                style={{
                  marginTop: spacing(4),
                  color: "rgba(244,240,232,0.53)",
                  fontSize: scale(10),
                  lineHeight: scale(15),
                }}
              >
                Compete with your talent. Chase the spotlight.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={scale(18)}
              color={GOLD}
            />
          </Pressable>

          {/* FOOTER */}
          {/* <Text
            style={{
              marginTop: spacing(19),
              color: "rgba(244,240,232,0.38)",
              fontSize: scale(9),
              fontWeight: "700",
              letterSpacing: scale(1.1),
              textAlign: "center",
            }}
          >
            YOUR TALENT. YOUR ARENA. YOUR LEGACY.
          </Text> */}
        </View>
      </View>

      {/* EXISTING CREATE ARENA MODAL */}
      {openModal && (
        <CreateArenaModal
          user={user}
          isVisible={openModal}
          setIsVisible={setOpenModal}
          onCreateArena={createArena}
        />
      )}
    </>
  );
}