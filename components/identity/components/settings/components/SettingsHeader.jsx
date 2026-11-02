import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../../../context/GlobalProvider";

const COLORS = {
  gold: "#E8B95A",
  text: "#F4F0E7",
  secondary: "#8F8A81",
  border: "rgba(232, 185, 90, 0.18)",
  surface: "#14130F",
  pressed: "#211B10",
};

export default function SettingsHeader({
  title = "SETTINGS",
  subtitle = "Shape your ITRI experience.",
  onClose,
  onBack,
  showBack = false,
}) {
  const { scale, spacing } = useGlobalContext();

  return (
    <View
      style={{
        paddingHorizontal: spacing(22),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: "#08090B",
        borderBottomWidth: scale(1),
        borderBottomColor: COLORS.border,
      }}
    >
      <View
        style={{
          minHeight: scale(48),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Dedicated back-button column */}
        <View
          style={{
            width: scale(48),
            marginRight: spacing(14),
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {showBack ? (
            <Pressable
              onPress={onBack}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Back to settings menu"
              style={({ pressed }) => ({
                width: scale(42),
                height: scale(42),
                borderRadius: scale(14),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed
                  ? COLORS.pressed
                  : COLORS.surface,
                borderWidth: scale(1),
                borderColor: COLORS.border,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              })}
            >
              <Ionicons
                name="arrow-back"
                size={scale(19)}
                color={COLORS.gold}
              />
            </Pressable>
          ) : (
            <View
              style={{
                width: scale(4),
                height: scale(32),
                borderRadius: scale(2),
                backgroundColor: COLORS.gold,
              }}
            />
          )}
        </View>

        {/* Title and subtitle share one aligned text column */}
        <View
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
            paddingRight: spacing(12),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.text,
              fontSize: scale(14),
              fontWeight: "700",
              letterSpacing: scale(1.1),
            }}
          >
            {title}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: COLORS.secondary,
              fontSize: scale(11),
              lineHeight: scale(16),
              marginTop: spacing(5),
            }}
          >
            {subtitle}
          </Text>
        </View>

        {/* Fixed-size close button */}
        <Pressable
          onPress={onClose}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Close settings"
          style={({ pressed }) => ({
            width: scale(42),
            height: scale(42),
            flexShrink: 0,
            borderRadius: scale(21),
            borderWidth: scale(1),
            borderColor: COLORS.border,
            backgroundColor: pressed
              ? COLORS.pressed
              : "transparent",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: spacing(4),
            transform: [{ scale: pressed ? 0.94 : 1 }],
          })}
        >
          <Ionicons
            name="close"
            size={scale(22)}
            color={COLORS.gold}
          />
        </Pressable>
      </View>

      {/* Subtle premium accent */}
      <View
        style={{
          height: scale(1),
        //   marginTop: spacing(16),
          backgroundColor: "rgba(255,255,255,0.045)",
        }}
      />
    </View>
  );
}