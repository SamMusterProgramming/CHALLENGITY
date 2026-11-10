
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../context/GlobalProvider";
import CreateArenaModal from "../../../../modal/createArenaModal";
import {
  createArenaByUser,
  getArenaByUser,
} from "../../../../../apiCalls/arenas";

import {
  removeUploadJob,
  subscribeToUploadQueue,
  UPLOAD_TYPE,
} from "../../../../../services/uploads";

export default function LegacyBuilder() {
  const {
    user,
    setUserArenas,
    setSelectedArena,
    spacing,
    scale,
  } = useGlobalContext();

  const [openModal, setOpenModal] = useState(false);
  const [progressionExpanded, setProgressionExpanded] = useState(false);

  const GOLD = "#E8B95A";

  // Animated chevron
  const arrowRotation = useRef(new Animated.Value(1)).current;

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleProgression = () => {
    const nextExpanded = !progressionExpanded;

    // Smoothly animate the card's height and content
    LayoutAnimation.configureNext({
      duration: 420,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    setProgressionExpanded(nextExpanded);

    // Rotate the arrow slightly after the layout begins moving
    Animated.timing(arrowRotation, {
      toValue: nextExpanded ? 1 : 0,
      duration: 350,
      delay: 60,
      useNativeDriver: true,
    }).start();
  };

  const arrowStyle = {
    transform: [
      {
        rotate: arrowRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

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
        console.error(
          "[ArenaListener] Failed to refresh arenas:",
          error
        );
      }
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  /*
   * =========================================================
   * STAGE PROGRESSION
   * =========================================================
   */

  const stageLevels = [
    {
      number: "01",
      title: "LOCAL STAGE",
      subtitle: "Represent your region",
      icon: "location-outline",
    },
    {
      number: "02",
      title: "REGIONAL STAGE",
      subtitle: "Represent your continent",
      icon: "earth-outline",
    },
    {
      number: "03",
      title: "GLOBAL STAGE",
      subtitle: "Compete with the world",
      icon: "globe-outline",
    },
  ];

  const renderStageProgression = () => (
    <View
      style={{
        marginTop: spacing(20),
        // paddingHorizontal: spacing(13),
        paddingVertical: spacing(12),
        // borderRadius: scale(10),
        // backgroundColor: "#11110F",
        // borderWidth: 1,
        borderColor: "rgba(232,185,90,0.13)",
      }}
      className = "border-t-2 border-b-2"
    >
      {/* COLLAPSIBLE PROGRESSION HEADER */}

      <Pressable
        onPress={toggleProgression}
        accessibilityRole="button"
        accessibilityLabel="Toggle stage progression"
        accessibilityState={{
          expanded: progressionExpanded,
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: scale(22),
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
              color: "rgba(232,185,90,0.85)",
              fontSize: scale(9),
              fontWeight: "900",
              letterSpacing: scale(1.8),
            }}
          >
            THE ROAD TO THE WORLD STAGE
          </Text>
        </View>

        <View
          style={{
            width: scale(25),
            height: scale(25),
            borderRadius: scale(7),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(232,185,90,0.09)",
            borderWidth: 1,
            borderColor: "rgba(232,185,90,0.15)",
          }}
        >
          <Animated.View style={arrowStyle}>
            <Ionicons
              name = "chevron-down"
              size={scale(14)}
              color={GOLD}
            />
          </Animated.View>
        </View>
      </Pressable>

      {/* COLLAPSIBLE CONTENT */}

      {progressionExpanded && (
        <View>
          {/* PROGRESSION STEPS */}

          <View
            style={{
              marginTop: spacing(19),
            }}
          >
            {stageLevels.map((stage, index) => {
              const isLast = index === stageLevels.length - 1;

              return (
                <View
                  key={stage.number}
                  style={{
                    flexDirection: "row",
                    minHeight: isLast ? scale(43) : scale(57),
                  }}
                >
                  {/* TIMELINE */}

                  <View
                    style={{
                      width: scale(34),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: scale(30),
                        height: scale(30),
                        borderRadius: scale(9),
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          index === 0
                            ? "rgba(232,185,90,0.15)"
                            : "rgba(255,255,255,0.035)",
                        borderWidth: 1,
                        borderColor:
                          index === 0
                            ? "rgba(232,185,90,0.45)"
                            : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <Ionicons
                        name={stage.icon}
                        size={scale(15)}
                        color={
                          index === 0
                            ? GOLD
                            : "rgba(255,255,255,0.42)"
                        }
                      />
                    </View>

                    {!isLast && (
                      <View
                        style={{
                          width: 1,
                          flex: 1,
                          marginVertical: 3,
                          backgroundColor: "rgba(232,185,90,0.20)",
                        }}
                      />
                    )}
                  </View>

                  {/* STAGE DETAILS */}

                  <View
                    style={{
                      flex: 1,
                      paddingLeft: spacing(11),
                      paddingBottom: isLast ? 0 : spacing(13),
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            index === 0
                              ? "#E8D4A6"
                              : "rgba(244,240,232,0.72)",
                          fontSize: scale(10),
                          fontWeight: "900",
                          letterSpacing: scale(0.8),
                        }}
                      >
                        {stage.title}
                      </Text>

                      {index === 0 && (
                        <View
                          style={{
                            marginLeft: spacing(8),
                            paddingHorizontal: spacing(6),
                            paddingVertical: 2,
                            borderRadius: 4,
                            backgroundColor: "rgba(232,185,90,0.12)",
                          }}
                        >
                          <Text
                            style={{
                              color: GOLD,
                              fontSize: scale(7),
                              fontWeight: "900",
                              letterSpacing: 0.6,
                            }}
                          >
                            START HERE
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text
                      style={{
                        marginTop: 3,
                        color: "rgba(244,240,232,0.42)",
                        fontSize: scale(9),
                      }}
                    >
                      {stage.subtitle}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* QUALIFICATION NOTE */}

          <View
            style={{
              marginTop: spacing(15),
              paddingTop: spacing(12),
              borderTopWidth: 1,
              borderTopColor: "rgba(255,255,255,0.065)",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Ionicons
              name="ribbon-outline"
              size={scale(15)}
              color={GOLD}
              style={{ marginTop: 1 }}
            />

            <Text
              style={{
                flex: 1,
                marginLeft: spacing(8),
                color: "rgba(244,240,232,0.55)",
                fontSize: scale(9),
                lineHeight: scale(15),
              }}
            >
              Win your local competition to earn an invitation
              to the regional stage. Regional champions move
              one step closer to the global spotlight.
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  /*
   * =========================================================
   * MAIN SECTION
   * =========================================================
   */

  return (
    <>
      <View
        style={{
          width: "100%",
          paddingBottom: spacing(16),
        }}
      >
        <View
          style={{
            paddingHorizontal: spacing(4),
            paddingTop: spacing(22),
            paddingBottom: spacing(20),
          }}
        >
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

          {/* SECTION EYEBROW */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: spacing(12),
            }} >
            <View
              style={{
                width: scale(18),
                height: "80%",
                backgroundColor: GOLD,
                marginRight: spacing(8),
              }}
            />

            <Text
              style={{
                color: GOLD,
                fontSize: scale(11),
                fontWeight: "900",
                letterSpacing: scale(2),
              }}
            >
              YOUR JOURNEY STARTS HERE
            </Text>
          </View>

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
              marginTop: spacing(24),
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

          {/* =================================================
              FIND YOUR STAGE
          ================================================= */}

          <View
            style={{
              marginTop: spacing(27),
              borderRadius: scale(12),
            }}
          >
            {/* TITLE */}

            <Text
              style={{
                marginTop: spacing(15),
                color: "#F4F0E8",
                fontSize: scale(18),
                lineHeight: scale(26),
                fontWeight: "900",
                letterSpacing: -0.4,
              }}
            >
              Find Your Stage.
            </Text>

            {/* CARD TOP */}

            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: spacing(16),
            }} >
            <View
              style={{
                width: scale(18),
                height: "80%",
                backgroundColor: GOLD,
                marginRight: spacing(8),
              }}
            />

            <Text
              style={{
                color: GOLD,
                fontSize: scale(11),
                fontWeight: "900",
                letterSpacing: scale(2),
              }}
            >
                 THE COMPETITION
            </Text>
          </View>

            {/* DESCRIPTION */}

            <Text
              style={{
                marginTop: spacing(9),
                color: "rgba(244,240,232,0.66)",
                fontSize: scale(11),
                lineHeight: scale(18),
              }}
            >
              Every great journey starts somewhere. Find a
              competition in your region, represent your
              community, and prove what your talent can do.
            </Text>

            {/* TALENT REQUIREMENT - ALWAYS VISIBLE */}

            <View
              style={{
                marginTop: spacing(16),
                // padding: spacing(11),
                borderRadius: scale(8),
                backgroundColor: "rgba(255,255,255,0.035)",
                // borderWidth: 1,
                // borderColor: "rgba(255,255,255,0.055)",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >

              <View
                style={{
                  flex: 1,
                  // marginLeft: spacing(9),
                }}
              >
                <Text
                  style={{
                    color: "#E9D6AA",
                    fontSize: scale(9),
                    fontWeight: "900",
                    letterSpacing: 0.5,
                  }}
                >
                  ONE STAGE. ONE DEFINED TALENT.
                </Text>

                <Text
                  style={{
                    marginTop: spacing(5),
                    color: "rgba(244,240,232,0.52)",
                    fontSize: scale(9),
                    lineHeight: scale(15),
                  }}
                >
                  Each stage has its own talent category.
                  Choose a stage that matches your craft
                  and compete against creators in that field.
                </Text>
              </View>
            </View>

            {/* COLLAPSIBLE STAGE PROGRESSION */}

            {renderStageProgression()}

            {/* CTA */}

            <Pressable
              onPress={() => {
                // Connect your stage-discovery navigation here.
              }}
              accessibilityRole="button"
              accessibilityLabel="Find a Stage"
              style={{
                marginTop: spacing(19),
                minHeight: scale(46),
                paddingHorizontal: spacing(14),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(7),
                backgroundColor: GOLD,
                borderWidth: 1,
                borderColor: "#F2CC79",
              }}
            >
              <Ionicons
                name="compass-outline"
                size={scale(17)}
                color="#15120B"
              />

              <Text
                style={{
                  marginLeft: spacing(8),
                  color: "#15120B",
                  fontSize: scale(11),
                  fontWeight: "900",
                  letterSpacing: 0.5,
                }}
              >
                Explore Available Stages
              </Text>

              <Ionicons
                name="arrow-forward"
                size={scale(15)}
                color="#15120B"
                style={{
                  marginLeft: spacing(9),
                }}
              />
            </Pressable>

            {/* FOOTER */}

            <Text
              style={{
                marginTop: spacing(12),
                textAlign: "center",
                color: "rgba(244,240,232,0.30)",
                fontSize: scale(8),
                fontWeight: "700",
                letterSpacing: 1.2,
              }}
            >
              YOUR REGION. YOUR TALENT. YOUR MOMENT.
            </Text>
          </View>
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
