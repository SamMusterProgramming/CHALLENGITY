import React from "react";
import { View, Text } from "react-native";

export default function LoadingActivity({
  visible = false,
  text = "Loading...",
  opacity = 0.85,
}) {
  const [MotiView, setMotiView] = React.useState(null);

  React.useEffect(() => {
    if (visible) {
      import("moti").then((mod) => {
        setMotiView(() => mod.MotiView);
      });
    }
  }, [visible]);

  if (!visible) return null;

  if (!MotiView) return null; // or simple fallback UI

  return (

      <View
        className="flex- 1 h-[100%] items-center justify-center"
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
      >
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              loop: true,
              delay: i * 300,
              duration: 1600,
            }}
            className="absolute w-20 h-20 rounded-full border-2 border-gold"
          />
        ))}

        <MotiView
          from={{ scale: 0.9 }}
          animate={{ scale: 1.05 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 1000,
          }}
          className="w-8 h-8 rounded-full bg-gold"
        />

        {text ? (
          <Text className="absolute bottom-[35%] mt-6 text-gray-300 text-sm tracking-wide">
            {text}
          </Text>
        ) : null}
      </View>

  );
}