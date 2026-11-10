
import React from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../context/GlobalProvider";

export default function CircleBuilder() {
  const {
    user,
    spacing,
    scale,
  } = useGlobalContext();

  const GOLD = "#E8B95A";

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
            Your circle starts here.
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
            Discover people, reconnect with friends, and
            build a network around the talents and passions
            that bring people together. Your next connection
            could be closer than you think.
          </Text>

          {/* DISCOVER PEOPLE CTA */}
          <Pressable
            onPress={() => {
              // Connect your people-discovery navigation here.
            }}
            accessibilityRole="button"
            accessibilityLabel="Discover people"
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
              name="search"
              size={scale(19)}
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
              Discover People
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

          {/* GROW YOUR CIRCLE */}
          <Pressable
            onPress={() => {
              // Connect your network/friends navigation here.
            }}
            accessibilityRole="button"
            accessibilityLabel="Grow your circle"
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
                name="people-outline"
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
                Grow Your Circle
              </Text>

              <Text
                style={{
                  marginTop: spacing(4),
                  color: "rgba(244,240,232,0.53)",
                  fontSize: scale(10),
                  lineHeight: scale(15),
                }}
              >
                Find familiar faces, meet new talent, and
                make meaningful connections.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={scale(18)}
              color={GOLD}
            />
          </Pressable>

        </View>
      </View>
    </>
  );
}
