import { TouchableOpacity, Text, View, Image, useWindowDimensions } from "react-native";

const GoogleButton = ({ onPress }) => {
  const {width ,height} = useWindowDimensions()  

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-[100%] py-4 flex-row items-center justify-center bg-white/90  rounded-lg border border-gray-200"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 12,
        height: height/18,
      }}
    >
   
      <Image
        source={{
          uri: "https://developers.google.com/identity/images/g-logo.png",
        }}
        style={{ width: 15, height: 15, marginRight: 10 }}
      />
  
      <Text
        style={{
          // color: "#E7C977",
          fontSize: width / 32,
          // letterSpacing: 1,
          fontWeight: "600",
        }}
        className="text-black  fon t-me dium"
      >
         Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;