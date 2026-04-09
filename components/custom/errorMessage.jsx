import { Text } from "react-native";
import { MotiView } from "moti";

const ErrorMessage = ({ message , color }) => {
  if (!message) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      className=" w-[80%]  mb- 8 text-center items-center justify-center px-3 py-2 border bor der-red-500/30 bg -red-500/10 rounded-md"
    >
      <Text 
      style= {{ color : color , textAlign:"center"}}
      className="text-red-400 text-md">
        • {message}
      </Text>
    </MotiView>
  );
};

export default ErrorMessage;