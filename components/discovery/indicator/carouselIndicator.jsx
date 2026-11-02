

import React from "react";
import {
  View,
  Text,
} from "react-native";

import { useGlobalContext } from "../../../context/GlobalProvider";

export default function CarouselIndicator({
  title = "Performances",
  count = 0,
  width,
  currentStage
}) {
  const { colorTheme , scale  , spacing} = useGlobalContext();

  return (
    <View 
    style = {{
      paddingHorizontal : spacing(8),
      paddingVertical : spacing (16),
      // marginBottom : spacing (4)
    }}
    className="w-full bg-black justify-center  ">

      <View className="flex-row items-center   justify-between">

        {/* LEFT */}
        <View
        className ="flex-row items-start justify-start">

          <Text
             style={{
                color:colorTheme,
                fontSize:scale(15),
                fontWeight:"800",
                // letterSpacing:0.2,
                // textTransform:"uppercase",
              }}
            className=" uppercase "
          >
            {title}
          </Text>

        
        </View>

        {/* CENTER DOTS */}
        {count > 1 && (
          <View className="flex-row  items-center gap-2">
            {Array.from({ length: count }).map(
              (_, index) => {

                return (
                  <View
                    key={index}
                    style={{
        
                      width: scale(11),
                      height: scale(11),
                      borderRadius: 999,
                      backgroundColor: currentStage === index ? colorTheme : "rgba(255,255,255,0.25)" ,
                    }}
                  />
                );
              }
            )}

          </View>
        )}

   
       

      </View>

    </View>
  );
}