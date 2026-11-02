
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../../../context/GlobalProvider";

const COLORS = {
  gold: "#E8B95A",
  goldMuted: "#A88743",
  text: "#F4F0E7",
  secondary: "#8F8A81",
  muted: "#777168",
  surface: "#14130F",
  pressed: "#211B10",
  divider: "#30281B",
};

const MENU_SECTIONS = [
  {
    id: "profile",
    title: "YOUR PROFILE",
    items: [
      {
        id: "editProfile",
        title: "Edit profile",
        description: "Your name, bio, and personal details",
        icon: "person-outline",
      },
      {
        id: "appearance",
        title: "Profile appearance",
        description: "Your profile photo and cover",
        icon: "images-outline",
      },
    ],
  },
  {
    id: "community",
    title: "YOUR COMMUNITY",
    items: [
      {
        id: "circle",
        title: "Manage circle",
        description: "Friends, followers, and following",
        icon: "people-outline",
      },
      {
        id: "talent",
        title: "Arenas & stages",
        description: "Your performances and competitions",
        icon: "trophy-outline",
      },
    ],
  },
  {
    id: "account",
    title: "PREFERENCES & ACCOUNT",
    items: [
      {
        id: "privacy",
        title: "Privacy & security",
        description: "Manage privacy and account security",
        icon: "shield-checkmark-outline",
      },
      {
        id: "preferences",
        title: "Preferences",
        description: "Customize your ITRI experience",
        icon: "options-outline",
      },
      {
        id: "help",
        title: "Help & support",
        description: "Get help with your account",
        icon: "help-circle-outline",
      },
    ],
  },
];

export default function SettingsMenu({ onSelectItem , onLogout }) {
  const { scale, spacing } = useGlobalContext();

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: spacing(18),
        paddingBottom: spacing(30),
      }}
    >
      {/* Top border separating the menu from the header */}
      {/* <View
        style={{
          height: scale(1),
          backgroundColor: COLORS.divider,
          marginBottom: spacing(24),
          marginHorizontal: spacing(10),
        }}
      /> */}

      {MENU_SECTIONS.map((section, sectionIndex) => (
        <View
          key={section.id}
          className="w-full"
          style={{
            marginBottom:
              sectionIndex === MENU_SECTIONS.length - 1
                ? 0
                : spacing(26),
          }}
        >
          {/* Section heading */}
          <View
            className="flex-row items-center"
            style={{
              paddingHorizontal: spacing(10),
              marginBottom: spacing(14),
            }}
          >
            <Text
              className="font-bold"
              style={{
                color: COLORS.goldMuted,
                fontSize: scale(10),
                letterSpacing: scale(1.5),
              }}
            >
              {section.title}
            </Text>
          </View>

          {/* Menu items */}
          <View className="w-full">
            {section.items.map((item, itemIndex) => (
              <Pressable
                key={item.id}
                onPress={() => onSelectItem?.(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`${item.title}. ${item.description}`}
                className="w-full flex-row items-center"
                style={{
                    flexDirection: "row",
                    paddingHorizontal: spacing(10),
                    paddingVertical: spacing(10),
                    marginBottom:
                      itemIndex === section.items.length - 1
                        ? 0
                        : spacing(7),
                    borderRadius: scale(14),
                    backgroundColor: "transparent",
                  }}
              >
                {/* Icon */}
                <View
                  className="items-center justify-center"
                  style={{
                    width: scale(50),
                    height: scale(45),
                    borderRadius: scale(14),
                    backgroundColor: COLORS.surface,
                    marginRight: spacing(14),
                    flexShrink: 0,
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={scale(25)}
                    color={COLORS.gold}
                  />
                </View>

                {/* Title and description */}
                <View
                  className="flex-1 justify-center"
                  style={{ minWidth: 0 }}
                >
                  <Text
                    className="font-semibold"
                    numberOfLines={1}
                    style={{
                      color: COLORS.text,
                      fontSize: scale(14),
                      letterSpacing: scale(0.1),
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      color: COLORS.secondary,
                      fontSize: scale(11),
                    //   lineHeight: scale(15),
                      marginTop: spacing(4),
                    }}
                  >
                    {item.description}
                  </Text>
                </View>

                {/* Arrow */}
                <View
                  className="items-center justify-center"
                  style={{
                    width: scale(24),
                    marginLeft: spacing(8),
                    flexShrink: 0,
                  }}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={scale(17)}
                    color={COLORS.muted}
                  />
                </View>
              </Pressable>
            ))}
          </View>

          {/* Section separator */}
          {sectionIndex < MENU_SECTIONS.length - 1 && (
            <View
              style={{
                height: scale(1),
                backgroundColor: COLORS.divider,
                marginTop: spacing(20),
                marginHorizontal: spacing(10),
              }}
            />
          )}
        </View>
      ))}

      {/* Sign Out */}
      <View
        style={{
          marginTop: spacing(22),
          paddingTop: spacing(18),
          borderTopWidth: scale(1),
          borderTopColor: COLORS.divider,
          marginHorizontal: spacing(10),
        }}
      >
        <Pressable
          onPress={() => onLogout()}
          accessibilityRole="button"
          accessibilityLabel="Log out of your account"
          className="flex-row items-center"
          style={{
            paddingVertical: spacing(12),
            paddingHorizontal: spacing(4),
            borderRadius: scale(14),
          }}
        >
          <View
            className="items-center justify-center"
            style={{
              width: scale(45),
              height: scale(45),
              borderRadius: scale(13),
              backgroundColor: "rgba(190, 75, 75, 0.10)",
              marginRight: spacing(14),
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={scale(23)}
              color="#D47770"
            />
          </View>

          <View className="flex-1">
            <Text
              className="font-semibold"
              style={{
                color: "#D47770",
                fontSize: scale(14),
              }}
            >
              Log Out
            </Text>

            <Text
              style={{
                color: COLORS.secondary,
                fontSize: scale(11),
                marginTop: spacing(4),
              }}
            >
              Sign out of your ITRI account
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={scale(17)}
            color={COLORS.muted}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}
