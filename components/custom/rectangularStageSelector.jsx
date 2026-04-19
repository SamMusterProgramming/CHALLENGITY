import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";

const RectangularStageSelector = ({
  data = [],
  selectedItem,
  setGlobalSelectedStageName,
  icons = {},
}) => {
  // Distribute items across the rectangle
  const perSide = Math.ceil(data.length / 2);
  const { width ,height } = Dimensions.get("window");


  const topItems = data.slice(0, perSide);
  const bottomItems = data.slice(perSide , perSide * 2);


  const renderItem = (item) => {
    const isSelected = selectedItem === item.name;
    return (
      <Pressable
        key={item.id}
        onPress={() => setGlobalSelectedStageName(item.name)}
        className="items-center justify-center m- 1"
      >
        <View
          className={`items-center justify-center rounded-full p-1 ${
            isSelected ? "bg-gold/35" : "bg-white/10"
          }`}
          style={{ width: width/10, height:  width/10}}
        >
          <Text 
           style={{fontSize : width/15}}
           className="te xt-base">
            {icons[item.name] || "🎭"}
          </Text>
        </View>
        <Text
          className={`mt-2 tex t-[10px] text-center font-bebas tracking-wider  ${
            isSelected ? "text-gold/80" : "text-white"
          }`}
          style={{ width:  width/10  , fontSize : width/38}}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
     className="absolute  inset-0 pointer-events-box-none">
      {/* Top Row */}
      <View 
      style={{width : width }}
      className="absolute top-0 left-0 right- 0 flex-row justify-between bg-[#060606] px-2">
        {topItems.map(renderItem)}
      </View>

      {/* Bottom Row */}
      <View 
      style={{width : width }}
      className="absolute bottom-0 left- 0 right-0 flex-row justify-between bg-[#0e0e0e] px-2">
        {bottomItems.map(renderItem)}
      </View>

      {/* Left Column */}
      {/* <View className="absolute left-0 top-0 bottom-0 justify-evenly bg-[#0b0b0b] px-2 ">
        {leftItems.map(renderItem)}
      </View> */}

      {/* Right Column */}
      {/* <View className="absolute right-0 top-0 bottom-0 justify-evenly bg-[#090808] px-2 ">
        {rightItems.map(renderItem)}
      </View> */}
    </View>
  );
};

export default React.memo(RectangularStageSelector);