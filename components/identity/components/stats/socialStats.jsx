


export function StatItem({
    icon,
    value,
    label,
    textSize,
    iconSize,
    color
  }) {
    return (
      <View
        style={{
          // flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          className ="gap-1"
        >
          <MaterialCommunityIcons
            name={icon}
            size={iconSize}
            color= {color}
          />
  
          <Text
            style={{
              color: "#F1F1F2",
              fontSize: textSize + 2 ,
              fontWeight: "600",
              letterSpacing: -0.2,
            }}
          >
            {value} 
          </Text>
        </View>
  
        <Text
          style={{
            marginTop: 4,
            color: "#85878A",
            fontSize: textSize-1,
            fontWeight: "600",
            letterSpacing : 1.3
          }}
        >
          {label}
        </Text>
      </View>
    );
  }