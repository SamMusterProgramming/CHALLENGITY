import { TouchableOpacity, Text, View, Image, useWindowDimensions } from "react-native";
import { GoogleLogo } from "./googleLogo";

const GoogleButton = ({ onPress }) => {
  const {width ,height} = useWindowDimensions()  

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-[100%] py-4 flex-row items-center gap-4 justify-center bg-white/90  rounded-xl border border-gray-200"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        // marginTop: 12,
        height: height/18,
      }}
    >
   
      <GoogleLogo size={width / 18} />

      <Text
        style={{
          // color: "#E7C977",
          fontSize: width / 32,
          // letterSpacing: 1,
          fontWeight: "700",
        }}
        className="text-black uppercase fon t-me dium"
      >
         Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;