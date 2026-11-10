// import React, {
//     useMemo,
//   } from "react";
  
//   import {
//     View,
//     Text,
//     Pressable,
//   } from "react-native";
  

  

// import LegacyIcon from "../../../svgIcons/others/legacyIcon";
// import CircleIcon from "../../../svgIcons/others/circleIcon";
// import { useGlobalContext } from "../../../../context/GlobalProvider";
// import { useProfileSpace } from "../context/ProfileSpaceContext";

// export default function ProfileSpace({
//   }) {
//     const {
//       scale,
//       spacing,
//     } = useGlobalContext();

//     const {
//       activeSpace,
//       changeSpace,
//     } = useProfileSpace();
  
//     const spaces = useMemo(
//       () => [
//         {
//           id: "legacy",
//           title: "LEGACY",
//           description: "ARENAS · STAGES · SPOTLIGHTS",
//           icon: LegacyIcon,
//         },
//         {
//           id: "circle",
//           title: "CIRCLE",
//           description: "FRIENDS · FOLLOWERS · FOLLOWING",
//           icon: CircleIcon,
//         },
//       ],
//       []
//     );
  
//     return (
//       <View
//         className="w-[95%] self-center"
//         style={{
//           // paddingHorizontal: spacing(18),
//           paddingTop: spacing(16),
//           paddingBottom: spacing(22),
//         }}
//       >
  
//         {/* ================================================== */}
//         {/* SPACES                                            */}
//         {/* ================================================== */}
  
//         <View
//           className="flex-row"
//           style={{
//             gap: spacing(10),
//           }}
//         >
//           {spaces.map((space) => {
//             const Icon = space.icon;
//             const isActive =
//               activeSpace === space.id;
  
//             return (
//               <Pressable
//                 key={space.id}
//                 onPress={() =>
//                   changeSpace(space.id)
//                 }
//                 className="flex-1   overflow-hidden"
//                 style={{
//                   minHeight: spacing(112),
//                   // padding : spacing (22),
//                   borderRadius: scale(15),
//                   borderWidth: scale(1),
//                   borderColor: isActive
//                     ? "rgba(232,185,90,0.68)"
//                     : "rgba(255,255,255,0.40)",
//                   backgroundColor:
//                     isActive
//                       ? "rgba(0,0,0.1)"//"rgba(232,185,90,0.045)"
//                       : "rgba(0,0,0.1)",
  
//                   paddingHorizontal: spacing(20),
//                   paddingVertical: spacing(20),
//                 }}
//               >
  
//                 {/* ======================================== */}
//                 {/* ICON + TITLE                              */}
//                 {/* ======================================== */}
  
//                 <View
//                   className="flex-col gap-2 items-center justify-center"
//                   style={{
//                     minHeight: spacing(34),
//                   }}
//                 >
//                   <Icon
//                     size={scale(30)}
//                   />
  
//                   <Text
//                     style={{
//                       marginLeft: spacing(7),
//                       color: isActive
//                         ? "#F4C542"
//                         : "rgba(255,255,255,0.88)",
//                       fontSize: scale(13),
//                       lineHeight: spacing(17),
//                       fontWeight: "800",
//                       letterSpacing: scale(1.5),
//                     }}
//                   >
//                     {space.title}
//                   </Text>
//                 </View>
  
//                 {/* ======================================== */}
//                 {/* DESCRIPTION                               */}
//                 {/* ======================================== */}
  
//                 <Text
//                   numberOfLines={2}
//                   className="text-center"
//                   style={{
//                     marginTop: spacing(6),
//                     color: isActive
//                       ? "rgba(232,185,90,0.62)"
//                       : "rgba(255,255,255,0.38)",
//                     fontSize: scale(7.5),
//                     lineHeight: spacing(15),
//                     fontWeight: "600",
//                     letterSpacing: scale(0.25),
//                   }}  >
//                   {space.description}
//                 </Text>
  
        
//               </Pressable>
//             );
//           })}
//         </View>
  
//       </View>
//     );
//   }


import React, { useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { useGlobalContext } from "../../../../context/GlobalProvider";
import { useProfileSpace } from "../context/ProfileSpaceContext";
import LegacyIcon from "../../../svgIcons/others/legacyIcon";
import CircleIcon from "../../../svgIcons/others/circleIcon";

export default function rofileSpace() {
  const { scale, spacing } = useGlobalContext();
  const { activeSpace, changeSpace } = useProfileSpace();

  const spaces = useMemo(
    () => [
      {
        id: "legacy",
        title: "LEGACY",
        description: "ARENAS · STAGES · SPOTLIGHTS",
        icon: LegacyIcon,
      },
      {
        id: "circle",
        title: "CIRCLE",
        description: "FRIENDS · FOLLOWERS · FOLLOWING",
        icon: CircleIcon,
      },
    ],
    []
  );

  const active =
    spaces.find((space) => space.id === activeSpace) ?? spaces[0];

  const inactive =
    spaces.find((space) => space.id !== active.id) ?? spaces[1];

  const activeOpacity = useRef(new Animated.Value(1)).current;
  const inactiveOpacity = useRef(new Animated.Value(1)).current;
  const activeScale = useRef(new Animated.Value(1)).current;
  const inactiveScale = useRef(new Animated.Value(1)).current;

  const hasMounted = useRef(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    animationRef.current?.stop();

    activeOpacity.setValue(0.78);
    inactiveOpacity.setValue(0.78);
    activeScale.setValue(0.985);
    inactiveScale.setValue(0.985);

    animationRef.current = Animated.parallel([
      Animated.timing(activeOpacity, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(inactiveOpacity, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(activeScale, {
        toValue: 1,
        stiffness: 120,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }),
      Animated.spring(inactiveScale, {
        toValue: 1,
        stiffness: 120,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }),
    ]);

    animationRef.current.start();

    return () => animationRef.current?.stop();
  }, [
    activeSpace,
    activeOpacity,
    inactiveOpacity,
    activeScale,
    inactiveScale,
  ]);

  const ActiveIcon = active.icon;
  const InactiveIcon = inactive.icon;

  return (
    <View
      className="w-full self-center"
      style={{
        paddingHorizontal: spacing(16),
        paddingTop: spacing(16),
      }}
    >
      <View
        style={{
          width: "100%",
          height: spacing(120),
          borderRadius: scale(8),
          overflow: "hidden",
          // backgroundColor: "#17150F",
          borderWidth: 1,
          // borderColor: "rgba(255,255,255,0.10)",
        }}
      >
        {/* Interlocking surfaces */}
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 150"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
         
          {/* Active surface */}
          {/* <Path
            d="
              M0 0
              H92
              C92 28 92 52 112 65
              C125 74 140 74 158 74
              H170
              C190 74 202 88 202 108
              C270 108 330 120 400 108
              V150
              H0
              Z
            "
            fill="#17150F"
          /> */}

          {/* Muted surface */}
          <Path
            d="
              M92 0
              H400
              V108
              C330 120 270 108 202 108
              C202 88 190 74 170 74
              H158
              C140 74 125 74 112 65
              C92 52 92 28 92 0
              Z
            "
            fill="#111418"
          />

          {/* Shared boundary */}
          {/* <Path
            d="
              M92 0
              C92 28 92 52 112 65
              C125 74 140 74 158 74
              H170
              C190 74 202 88 202 108
              H400
            "
            fill="none"
            stroke="rgba(220,184,105,0.38)"
            strokeWidth="1.15"
            strokeLinejoin="round"
            strokeLinecap="round"
          /> */}

        </Svg>

        {/* Selected identity: bottom-left */}
        <Pressable
          onPress={() => changeSpace(active.id)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }} >
          <Animated.View
            style={{
              position: "absolute",
              left: spacing(2),
              bottom: spacing(0),
              width: "84%",
              alignItems: "flex-start",
              opacity: activeOpacity,
              transform: [{ scale: activeScale }],
            }}
          >
            <ActiveIcon size={scale(34)} />

            <Text
              style={{
                color: "#E8C879",
                fontSize: scale(15),
                fontWeight: "800",
                letterSpacing: 2,
                marginTop: spacing(16),
              }}
            >
              {active.title}
            </Text>

            <Text
              numberOfLines={2}
              style={{
                width: "100%",
                color: "rgba(232,200,121,0.60)",
                fontSize: scale(9),
                fontWeight: "600",
                letterSpacing: 0.8,
                marginTop: spacing(12),
                lineHeight: scale(11),
              }}
            >
              {active.description}
            </Text>
          </Animated.View>
        </Pressable>

        {/* Muted identity: deliberately asymmetric layout */}
        <Pressable
          onPress={() => changeSpace(inactive.id)}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "77%",
            height: "57.3%",
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: spacing(8),
              left: "8%",
              right: "5%",
              opacity: inactiveOpacity,
              transform: [{ scale: inactiveScale }],
            }}
          >
            {/* Icon sits close to the curved joint */}
            <View
              style={{
                // alignItems: "flex-start",
                paddingLeft: spacing(12),
                paddingTop : spacing (4)
              }}
              className = "flex-row items-end "
            >
              <InactiveIcon
                size={scale(32)}
                color="#85898E"
              />
               <Text
                  style={{
                    marginLeft: spacing(44),
                    // marginTop: spacing(2),
                    color: "#A0A3A7",
                    fontSize: scale(12),
                    fontWeight: "800",
                    letterSpacing: 1.8,
                  }}
                >
                  {inactive.title}
                </Text>
            </View>

            {/* Title is intentionally shifted right */}
            {/* <Text
              style={{
                marginLeft: spacing(59),
                // marginTop: spacing(2),
                color: "#A0A3A7",
                fontSize: scale(12),
                fontWeight: "800",
                letterSpacing: 1.8,
              }}
            >
              {inactive.title}
            </Text> */}

            {/* Description stays within the muted card's text column */}
            <Text
              numberOfLines={2}
              style={{
                marginLeft: spacing(92),
                marginTop: spacing(10),
                width: "78%",
                color: "#777C82",
                fontSize: scale(8),
                fontWeight: "600",
                letterSpacing: 0.3,
                lineHeight: scale(10),
                flexWrap: "wrap",
              }}
            >
              {inactive.description}
            </Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
