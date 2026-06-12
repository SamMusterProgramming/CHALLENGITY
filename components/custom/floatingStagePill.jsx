import React, { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function FloatingStagePill({
  label,
  index,
  width,
  height
}) {
  const driftX = useSharedValue(0);
  const driftY = useSharedValue(0);

  /**
   * Layout:
   *
   *  [0]     [1]     [2]
   *
   *  [3]  EXPLORE  [4]
   *
   *  [5]     [6]     [7]
   */

  const positions = useMemo(
    () => [
      // TOP ROW
      {
        x: -width * 0.4,
        y: - height/2.2,
      },
      {
        x: 0,
        y: -height/2.2,
      },
      {
        x: width * 0.4,
        y: -height/2.2,
      },

      // CTA ROW
      {
        x: -width * 0.40,
        y: 0,
      },
      {
        x: width * 0.37,
        y: 0,
      },

      // BOTTOM ROW
      {
        x: -width * 0.4,
        y: height/2.2,
      },
      {
        x: 0,
        y: height/2.2,
      },
      {
        x: width * 0.38,
        y: height/2.2,
      },
    ],
    [width]
  );
  const base = positions[index] ?? {
    x: 0,
    y: 0,
  };

  useEffect(() => {
    const xAmplitude = 4 + Math.random() * 6;
    const yAmplitude = 4 + Math.random() * 6;

    driftX.value = withRepeat(
      withSequence(
        withTiming(xAmplitude, {
          duration: 2500 + Math.random() * 1000,
        }),
        withTiming(-xAmplitude, {
          duration: 2500 + Math.random() * 1000,
        })
      ),
      -1,
      true
    );

    driftY.value = withRepeat(
      withSequence(
        withTiming(yAmplitude, {
          duration: 3000 + Math.random() * 1200,
        }),
        withTiming(-yAmplitude, {
          duration: 3000 + Math.random() * 1200,
        })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: base.x + driftX.value,
      },
      {
        translateY: base.y + driftY.value,
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          zIndex: 2,
        },
        animatedStyle,
      ]}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderWidth: 1,
          borderColor: "rgba(212,175,55,0.15)",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: width/30,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      </View>
    </Animated.View>
  );
}