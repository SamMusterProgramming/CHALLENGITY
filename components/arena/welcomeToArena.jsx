import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function WelcomeToArena({
  onCreateArena,onScroll
}) {
  const { width, height } =
    useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#050505",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          minHeight: height,
          paddingBottom: 40,
        }}
        onScroll={onScroll}
      >
        {/* HERO */}

        <View
          style={{
            alignItems: "center",
            paddingTop: height * 0.02,
            paddingHorizontal: 25,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 999,
              backgroundColor:
                "rgba(234,179,8,0.08)",
              justifyContent:
                "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.15)",
            }}
          >
            <MaterialCommunityIcons
              name="star-four-points"
              size={32}
              color="#eab308"
            />
          </View>

          <Text
            style={{
              color: "#eab308",
              fontSize: width / 24,
              fontWeight: "900",
              marginTop: 20,
              letterSpacing: 2,
            }}
          >
            YOUR ARENA
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: width / 15,
              fontWeight: "900",
              textAlign: "center",
              marginTop: 12,
              lineHeight: 45,
            }}
          >
            Where Talent
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: width / 15,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Becomes Identity
          </Text>

          <Text
            style={{
              color: "#9CA3AF",
              textAlign: "center",
              marginTop: 20,
              lineHeight: 24,
              fontSize: width / 26,
            }}
          >
            Create your personal talent space,
            showcase your journey, build an
            audience, and let people discover
            what makes you unique.
          </Text>
        </View>

        {/* BENEFITS */}

        <View
          style={{
            marginTop: 40,
            paddingHorizontal: 18,
          }}
        >
          {[
            "Share talent-focused content",
            "Build your followers",
            "Create your personal brand",
            "Receive support and feedback",
            "Showcase achievements",
            "Earn Spotlight recognition",
          ].map((item) => (
            <View
              key={item}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,

                backgroundColor:
                  "#111214",

                borderRadius: 18,

                paddingVertical: 14,
                paddingHorizontal: 16,

                borderWidth: 1,
                borderColor:
                  "rgba(234,179,8,0.08)",
              }}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#eab308"
              />

              <Text
                style={{
                  color: "#FFFFFF",
                  marginLeft: 12,
                  fontSize: width / 27,
                  fontWeight: "600",
                }}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* SPOTLIGHT */}

        <View
          style={{
            marginHorizontal: 18,
            marginTop: 20,

            backgroundColor:
              "#111214",

            borderRadius: 22,

            borderWidth: 1,
            borderColor:
              "rgba(234,179,8,0.15)",

            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="star-circle"
              size={26}
              color="#eab308"
            />

            <Text
              style={{
                color: "#eab308",
                fontWeight: "800",
                fontSize: width / 22,
                marginLeft: 10,
              }}
            >
              Spotlight
            </Text>
          </View>

          <Text
            style={{
              color: "#D1D5DB",
              marginTop: 12,
              lineHeight: 22,
              fontSize: width / 28,
            }}
          >
            Exceptional Arena creators may
            be featured in Spotlight and
            discovered by audiences across
            regions and talent communities.
          </Text>
        </View>

        {/* JOURNEY */}

        <View
          style={{
            alignItems: "center",
            marginTop: 35,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "800",
              fontSize: width / 19,
              textAlign: "center",
            }}
          >
            Your Journey Starts Here
          </Text>

          <Text
            style={{
              color: "#9CA3AF",
              textAlign: "center",
              marginTop: 10,
              lineHeight: 22,
              fontSize: width / 28,
            }}
          >
            Create your first Arena and
            begin building your presence
            within the Itri community.
          </Text>
        </View>

        {/* CTA */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onCreateArena}
          style={{
            marginHorizontal: 22,
            marginTop: 30,

            height: 62,

            borderRadius: 20,

            backgroundColor:
              "#eab308",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "900",
              fontSize: width / 22,
            }}
          >
            Create My Arena
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#71717A",
            textAlign: "center",
            marginTop: 14,
            fontSize: width / 32,
          }}
        >
          Takes less than a minute
        </Text>
      </ScrollView>
    </View>
  );
}