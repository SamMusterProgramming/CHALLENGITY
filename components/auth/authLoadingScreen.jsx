import { View, Text } from "react-native";
import { MotiView } from "moti";

export default function AuthLoadingScreen() {
  return (
    <View className="flex-1 bg-[#0b0d0f] justify-center items-center">

      {/* PULSE RINGS */}
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          from={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            loop: true,
            delay: i * 400,
            duration: 2000,
          }}
          className="absolute w-32 h-32 rounded-full border border-yellow-500"
        />
      ))}

      {/* CORE */}
      <MotiView
        from={{ scale: 0.7 }}
        animate={{ scale: 1.1 }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1200,
        }}
        className="w-20 h-20 rounded-full bg-yellow-500"
      />

      {/* TEXT */}
      <Text className="text-gray-400 absolute bottom-[100] mt- 6 text-sm tracking-wide">
        Authenticating...
      </Text>
    </View>
  );
}
