import { TouchableOpacity, Text, View, Image } from "react-native";

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-[100%] mt-4 flex-row items-center justify-center bg-white py-3 rounded-md border border-gray-200"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* GOOGLE LOGO */}
      <Image
        source={{
          uri: "https://developers.google.com/identity/images/g-logo.png",
        }}
        style={{ width: 18, height: 18, marginRight: 10 }}
      />

      {/* TEXT */}
      <Text
        style={{ fontSize: 14 }}
        className="text-black font-medium"
      >
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;