

// import React, { useMemo, useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   Pressable,
//   Dimensions,
//   ScrollView,
//   Animated,
//   Easing,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { talentStages } from "../../utilities/TypeData";
// import TalentIcon from "../custom/TalentIcon";

// const { height } = Dimensions.get("window");

// const MODAL_HEIGHT = Math.min(height * 0.78, 750);

// const TALENT_CATEGORIES = [
//   {
//     id: "music",
//     label: "Music & Instruments",
//     description: "Voice, rhythm, instruments and sound",
//     icon: "musical-notes",
//     talents: [
//       "Singing", "Rapping", "Beatboxing", "Guitar", "Piano",
//       "Violin", "Drumming", "DJing", "Beatmaking",
//     ],
//   },
//   {
//     id: "dance",
//     label: "Dance & Physical",
//     description: "Movement, athleticism and physical performance",
//     icon: "body",
//     talents: [
//       "Dancing", "Fitness", "Acrobatics", "Karate",
//       "Parkour", "Skating", "Yoga",
//     ],
//   },
//   {
//     id: "entertainment",
//     label: "Magic & Entertainment",
//     description: "Illusion, comedy and live entertainment",
//     icon: "sparkles",
//     talents: [
//       "Magic", "Mentalism", "Comedy", "Acting", "Ventriloquism",
//       "Juggling", "Puppetry", "Fire Performance", "Stunts",
//       "TaleSpin",
//     ],
//   },
//   {
//     id: "creative",
//     label: "Creative & Visual Arts",
//     description: "Art, design and creative expression",
//     icon: "color-palette",
//     talents: [
//       "Art", "Photography", "Filmmaking", "Animation",
//       "Design", "Fashion", "Makeup",
//     ],
//   },
//   {
//     id: "technology",
//     label: "Technology",
//     description: "Innovation and technical creativity",
//     icon: "hardware-chip",
//     talents: ["Tech"],
//   },
//   {
//     id: "other",
//     label: "Other Talents",
//     description: "Unique skills and extraordinary abilities",
//     icon: "star",
//     talents: [
//       "Modeling", "Eating", "Cooking", "Speedcubing", "Whistling",
//     ],
//   },
// ];

// const TalentPickerModal = ({
//   visible,
//   onClose,
//   selectedTalent,
//   onSelectTalent,
//   onSelectAll,
// }) => {
//   const [modalVisible, setModalVisible] = useState(visible);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const animation = useRef(new Animated.Value(0)).current;
//   const closingRef = useRef(false);

//   const currentCategory = useMemo(
//     () =>
//       TALENT_CATEGORIES.find(
//         (category) => category.id === selectedCategory
//       ),
//     [selectedCategory]
//   );

//   const categoryTalents = useMemo(() => {
//     if (!currentCategory) return [];

//     return currentCategory.talents
//       .map((name) =>
//         talentStages.find((talent) => talent.name === name)
//       )
//       .filter(Boolean);
//   }, [currentCategory]);

//   useEffect(() => {
//     if (visible) {
//       closingRef.current = false;
//       setModalVisible(true);
//       setSelectedCategory(null);

//       animation.setValue(0);

//       requestAnimationFrame(() => {
//         Animated.timing(animation, {
//           toValue: 1,
//           duration: 260,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }).start();
//       });
//     } else if (modalVisible) {
//       closeAnimation();
//     }
//   }, [visible]);

//   const closeAnimation = () => {
//     if (closingRef.current) return;

//     closingRef.current = true;

//     Animated.timing(animation, {
//       toValue: 0,
//       duration: 190,
//       easing: Easing.in(Easing.cubic),
//       useNativeDriver: true,
//     }).start(({ finished }) => {
//       if (finished) {
//         setModalVisible(false);
//         setSelectedCategory(null);
//         closingRef.current = false;
//       }
//     });
//   };

//   const handleClose = () => {
//     closeAnimation();
//     onClose?.();
//   };

//   const handleTalentPress = (talent) => {
//     onSelectTalent?.(talent.name);
//     handleClose();
//   };

//   const animatedModalStyle = {
//     opacity: animation,
//     transform: [
//       {
//         scale: animation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0.96, 1],
//         }),
//       },
//       {
//         translateY: animation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [12, 0],
//         }),
//       },
//     ],
//   };

//   const animatedBackdropStyle = {
//     opacity: animation.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1],
//     }),
//   };

//   const renderCategory = (category) => (
//     <TouchableOpacity
//       key={category.id}
//       activeOpacity={0.78}
//       onPress={() => setSelectedCategory(category.id)}
//       style={{
//         width: "48.3%",
//         minHeight: 132,
//         marginBottom: 12,
//         borderRadius: 16,
//         backgroundColor: "#10100F",
//         borderWidth: 1,
//         borderColor: "rgba(232,190,102,0.30)",
//         alignItems: "center",
//         justifyContent: "center",
//         paddingHorizontal: 15,
//         paddingVertical: 19,
//       }}
//     >
//       <View
//         style={{
//           width: 45,
//           height: 45,
//           borderRadius: 14,
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "rgba(232,190,102,0.11)",
//           borderWidth: 1,
//           borderColor: "rgba(232,190,102,0.27)",
//           marginBottom: 13,
//         }}
//       >
//         <Ionicons
//           name={category.icon}
//           size={21}
//           color="#E8BE66"
//         />
//       </View>

//       <Text
//         style={{
//           color: "#F0D18D",
//           fontSize: 10,
//           fontWeight: "900",
//           letterSpacing: 0.7,
//           textAlign: "center",
//           textTransform: "uppercase",
//           lineHeight: 15,
//         }}
//       >
//         {category.label}
//       </Text>

//       {/* <Text
//         style={{
//           color: "rgba(255,255,255,0.48)",
//           fontSize: 9,
//           marginTop: 6,
//           textAlign: "center",
//           lineHeight: 13,
//         }}
//       >
//         {category.description}
//       </Text> */}
//     </TouchableOpacity>
//   );

//   const renderTalent = (talent) => {
//     const isSelected = selectedTalent === talent.name;

//     return (
//       <TouchableOpacity
//         key={talent.id}
//         activeOpacity={0.75}
//         onPress={() => handleTalentPress(talent)}
//         style={{
//           width: "30.5%",
//           minHeight: 103,
//           marginBottom: 10,
//           borderRadius: 14,
//           alignItems: "center",
//           justifyContent: "center",
//           paddingHorizontal: 7,
//           paddingVertical: 12,
//           backgroundColor: isSelected
//             ? "rgba(232,190,102,0.14)"
//             : "#10100F",
//           borderWidth: 1,
//           borderColor: isSelected
//             ? "rgba(232,190,102,0.85)"
//             : "rgba(232,190,102,0.22)",
            
//         }}
//       >
//         <TalentIcon talent={talent.name} size={50} />

//         <Text
//           style={{
//             marginTop: 9,
//             color: isSelected ? "#F5D58E" : "#E9E3D8",
//             fontSize: 9,
//             fontWeight: "800",
//             letterSpacing: 0.45,
//             textAlign: "center",
//             lineHeight: 13,
//           }}
//         >
//           {talent.name.toUpperCase()}
//         </Text>

//         {isSelected && (
//           <View
//             style={{
//               position: "absolute",
//               top: 7,
//               right: 7,
//             }}
//           >
//             <Ionicons
//               name="checkmark-circle"
//               size={13}
//               color="#E8BE66"
//             />
//           </View>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <Modal
//       visible={modalVisible}
//       transparent 
//       animationType="none"
//       statusBarTranslucent
//       onRequestClose={handleClose}
//       // backdropColor={"rgba(0,0,0,0.8)"}
//     >
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "center",
//           paddingHorizontal: 20,
//           backgroundColor : "rgba(0,0,0,0.6)"
//         }}
//       >
//         {/* ANIMATED BACKDROP */}

//         <Animated.View
//           pointerEvents="none"
//           style={[
//             {
//               position: "absolute",
//               top: 0,
//               bottom: 0,
//               left: 0,
//               right: 0,
//               backgroundColor: "rgba(0,0,0,0.78)",
//             },
//             animatedBackdropStyle,
//           ]}
//         />

//         <Pressable
//           onPress={handleClose}
//           style={{
//             position: "absolute",
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//           }}
//         />

//         {/* ANIMATED MODAL */}

//         <Animated.View
//           style={[
//             {
//               width: "100%",
//               maxWidth: 430,
//               height: MODAL_HEIGHT,
//               borderRadius: 20,
//               overflow: "hidden",
//               backgroundColor: "#080808",
//               borderWidth: 1,
//               borderColor: "rgba(232,190,102,0.42)",
//               shadowColor: "#EAB308",
//               shadowOffset: { width: 0, height: 0 },
//               shadowOpacity: 0.22,
//               shadowRadius: 24,
//               elevation: 20,
//             },
//             animatedModalStyle,
//           ]}
//         >
//           {/* HEADER */}

//           <View
//             style={{
//               alignItems: "center",
//               paddingTop: 25,
//               paddingBottom: 20,
//               paddingHorizontal: 22,
//             }}
//           >
//             <TouchableOpacity
//               activeOpacity={0.7}
//               onPress={handleClose}
//               style={{
//                 position: "absolute",
//                 right: 13,
//                 top: 12,
//                 zIndex: 10,
//                 width: 36,
//                 height: 36,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Ionicons
//                 name="close"
//                 size={23}
//                 color="rgba(255,255,255,0.65)"
//               />
//             </TouchableOpacity>

//             <View
//               style={{
//                 width: 49,
//                 height: 49,
//                 borderRadius: 15,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "rgba(232,190,102,0.11)",
//                 borderWidth: 1,
//                 borderColor: "rgba(232,190,102,0.42)",
//                 marginBottom: 13,
//               }}
//             >
//               <Ionicons
//                 name={currentCategory ? "grid" : "sparkles"}
//                 size={24}
//                 color="#E8BE66"
//               />
//             </View>

//             <Text
//               style={{
//                 color: "#E8BE66",
//                 fontSize: 19,
//                 fontWeight: "900",
//                 letterSpacing: 2.5,
//                 textAlign: "center",
//               }}
//             >
//               {currentCategory
//                 ? currentCategory.label
//                 : "CHOOSE TALENT"}
//             </Text>

//             <Text
//               style={{
//                 color: "rgba(255,255,255,0.48)",
//                 fontSize: 10,
//                 fontWeight: "500",
//                 marginTop: 7,
//                 letterSpacing: 0.35,
//                 textAlign: "center",
//               }}
//             >
//               {currentCategory
//                 ? currentCategory.description
//                 : "Explore a category and discover your talent"}
//             </Text>
//           </View>

//           {/* BACK NAVIGATION */}

//           <View
//             style={{
//               height: 37,
//               justifyContent: "center",
//               paddingHorizontal: 21,
//             }}
//           >
//             {currentCategory && (
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 onPress={() => setSelectedCategory(null)}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <Ionicons
//                   name="arrow-back"
//                   size={15}
//                   color="#E8BE66"
//                 />

//                 <Text
//                   style={{
//                     marginLeft: 7,
//                     color: "#E8BE66",
//                     fontSize: 10,
//                     fontWeight: "800",
//                     letterSpacing: 1,
//                   }}
//                 >
//                   ALL CATEGORIES
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* FIXED CONTENT AREA */}

//           {currentCategory ? (
//             <View
//               style={{
//                 flex: 1,
//                 paddingHorizontal: 19,
//                 paddingTop: 5,
//                 paddingBottom: 20,
//                 justifyContent: "center",
//               }}
//             >
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{
//                   flexGrow: 1,
//                   justifyContent: "center",
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     flexWrap: "wrap",
//                     justifyContent: "center",
//                     alignContent: "center",
//                     gap: 12,
                    
//                   }}
//                 >
//                   {categoryTalents.map(renderTalent)}
//                 </View>
//               </ScrollView>
//             </View>
//           ) : (
//             <ScrollView
//               style={{ flex: 1 }}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{
//                 paddingHorizontal: 19,
//                 paddingTop: 5,
//                 paddingBottom: 20,
      
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   flexWrap: "wrap",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {TALENT_CATEGORIES.map(renderCategory)}
//               </View>
//             </ScrollView>
//           )}

//           {/* FOOTER ACCENT */}

//           <View
//             style={{
//               height: 2,
//               width: "100%",
//               backgroundColor: "rgba(232,190,102,0.23)",
//             }}
//           />
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// export default TalentPickerModal;



import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { talentStages } from "../../utilities/TypeData";
import TalentIconSelector from "../common/talentIconSelector";
import { useGlobalContext } from "../../context/GlobalProvider";

const { height } = Dimensions.get("window");

const MODAL_HEIGHT = height * 0.88;

const GOLD = "#E8B95A";
const GOLD_LIGHT = "#F5D58E";

// --------------------------------------------------
// TALENT ICON REGISTRY
// Maps your semantic icon IDs to actual Ionicons.
// No TalentIcon component or old custom SVGs.
// --------------------------------------------------

const TALENT_ICON_MAP = {
  "microphone-stage": "mic",
  microphone: "mic",
  "mouth-sound": "volume-high",
  guitar: "musical-notes",
  "piano-keys": "grid",
  violin: "musical-notes",
  "drum-kit": "radio",
  turntables: "disc",
  "beat-machine": "headset",

  dancer: "body",
  dumbbell: "barbell",
  acrobatics: "fitness",
  karate: "hand-left",
  parkour: "walk",
  skateboard: "bicycle",
  "lotus-pose": "leaf",

  "magic-wand": "sparkles",
  "mind-reading": "eye",
  "comedy-mask": "happy",
  "theater-masks": "people",
  "ventriloquist-dummy": "chatbubbles",
  "juggling-balls": "ellipse",
  "hand-puppet": "hand-left",
  "stunt-performer": "flash",
  storytelling: "book",

  "paint-palette": "color-palette",
  camera: "camera",
  "film-camera": "film",
  "animation-frames": "images",
  "design-tools": "brush",
  "fashion-hanger": "shirt",
  "makeup-brush": "color-fill",

  microchip: "hardware-chip",

  runway: "person",
  food: "fast-food",
  "chef-hat": "restaurant",
  "rubiks-cube": "cube",
  whistle: "musical-note",
};

const getTalentIcon = (iconKey) => {
  return TALENT_ICON_MAP[iconKey] || "sparkles";
};

// --------------------------------------------------
// CATEGORY DATA
// --------------------------------------------------

const TALENT_CATEGORIES = [
  {
    id: "music",
    label: "Music & Instruments",
    description: "Voice, rhythm, instruments and sound",
    icon: "musical-notes",
    talentIds: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
  },
  {
    id: "physical",
    label: "Dance & Physical",
    description: "Movement, athleticism and physical performance",
    icon: "body",
    talentIds: ["9", "10", "11", "12", "13", "14", "15"],
  },
  {
    id: "entertainment",
    label: "Magic & Entertainment",
    description: "Illusion, comedy and live entertainment",
    icon: "sparkles",
    talentIds: ["16", "17", "18", "19", "20", "21", "22", "24", "25"],
  },
  {
    id: "creative",
    label: "Creative & Visual Arts",
    description: "Art, design and creative expression",
    icon: "color-palette",
    talentIds: ["26", "27", "28", "29", "30", "31", "32"],
  },
  {
    id: "technology",
    label: "Technology",
    description: "Innovation and technical creativity",
    icon: "hardware-chip",
    talentIds: ["33"],
  },
  {
    id: "other",
    label: "Other Talents",
    description: "Unique skills and extraordinary abilities",
    icon: "star",
    talentIds: ["34", "35", "36", "37", "38"],
  },
];

// --------------------------------------------------
// REUSABLE TALENT ICON
// --------------------------------------------------

const TalentIconDisplay = ({ icon, size = 42, color = GOLD }) => {
  return (
    <View
      style={{
        width: size + 12,
        height: size + 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons
        name={getTalentIcon(icon)}
        size={size}
        color={color}
      />
    </View>
  );
};

// --------------------------------------------------
// MODAL
// --------------------------------------------------

const TalentPickerModal = ({
  visible,
  onClose,
  selectedTalent,
  onSelectTalent,
  onSelectAll,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {scale , spacing} = useGlobalContext();

  const animation = useRef(new Animated.Value(0)).current;
  const closingRef = useRef(false);

  // --------------------------------------------------
  // TALENT DATA
  // --------------------------------------------------

  const allTalents = useMemo(
    () => (Array.isArray(talentStages) ? talentStages : []),
    []
  );

  const currentCategory = useMemo(() => {
    return (
      TALENT_CATEGORIES.find(
        (category) => category.id === selectedCategory
      ) || null
    );
  }, [selectedCategory]);

  const categoryTalents = useMemo(() => {
    if (!currentCategory) return [];

    return allTalents.filter((talent) =>
      currentCategory.talentIds.includes(String(talent.id))
    );
  }, [currentCategory, allTalents]);

  const selectedTalentData = useMemo(() => {
    if (!selectedTalent) return null;

    return (
      allTalents.find(
        (talent) =>
          talent.name === selectedTalent ||
          talent.label === selectedTalent
      ) || null
    );
  }, [selectedTalent, allTalents]);

  // --------------------------------------------------
  // CATEGORY NAVIGATION
  // --------------------------------------------------

  const handleCategoryPress = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  // --------------------------------------------------
  // CLOSE ANIMATION
  // --------------------------------------------------

  const closeAnimation = useCallback(() => {
    if (closingRef.current) return;

    closingRef.current = true;

    Animated.timing(animation, {
      toValue: 0,
      duration: 190,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setModalVisible(false);
        setSelectedCategory(null);
      }

      closingRef.current = false;
    });
  }, [animation]);

  // --------------------------------------------------
  // OPEN / CLOSE EFFECT
  // --------------------------------------------------

  useEffect(() => {
    if (visible) {
      closingRef.current = false;

      setModalVisible(true);
      setSelectedCategory(null);
      animation.setValue(0);

      requestAnimationFrame(() => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
    } else if (modalVisible) {
      closeAnimation();
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    closeAnimation();
    onClose?.();
  }, [closeAnimation, onClose]);

  const handleTalentPress = useCallback(
    (talent) => {
      onSelectTalent?.(talent.name);
      handleClose();
    },
    [onSelectTalent, handleClose]
  );

  // --------------------------------------------------
  // ANIMATED STYLES
  // --------------------------------------------------

  const animatedModalStyle = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        }),
      },
    ],
  };

  const animatedBackdropStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  // --------------------------------------------------
  // CATEGORY CARD
  // --------------------------------------------------

  const renderCategory = (category) => {
    const count = allTalents.filter((talent) =>
      category.talentIds.includes(String(talent.id))
    ).length;

    return (
      <TouchableOpacity
        key={category.id}
        activeOpacity={0.78}
        onPress={() => handleCategoryPress(category.id)}
        style={{
          width: "48.3%",
          minHeight: scale(100),
          marginBottom: 12,
          borderRadius: 16,
          backgroundColor: "#10100F",
          borderWidth: 1,
          borderColor: "rgba(232,185,90,0.30)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 15,
          paddingVertical: 19,
        }}
      >
        {/* <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(232,185,90,0.11)",
            borderWidth: 1,
            borderColor: "rgba(232,185,90,0.27)",
            marginBottom: 13,
          }}
        >
          <Ionicons
            name={category.icon}
            size={21}
            color={GOLD}
          />
        </View> */}

        <Text
          style={{
            color: GOLD_LIGHT,
            fontSize: 10,
            fontWeight: "900",
            letterSpacing: 0.7,
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 15,
          }}
        >
          {category.label}
        </Text>

        <Text
          style={{
            color: "rgba(255,255,255,0.62)",
            fontSize: 9,
            marginTop: 5,
            fontWeight: "700",
          }}
        >
          {count} TALENTS
        </Text>
      </TouchableOpacity>
    );
  };

  // --------------------------------------------------
  // TALENT CARD
  // --------------------------------------------------

  const renderTalent = (talent) => {
    const isSelected =
      selectedTalent === talent.name ||
      selectedTalent === talent.label;

    return (
      <TouchableOpacity
        key={talent.id}
        activeOpacity={0.75}
        onPress={() => handleTalentPress(talent)}
        style={{
          width: "30.5%",
          minHeight: 103,
          marginBottom: 10,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 7,
          paddingVertical: 12,
          // backgroundColor: isSelected
          //   ? "rgba(232,185,90,0.14)"
          //   : "#10100F",
          borderWidth: 1,
          borderColor: isSelected
            ? "rgba(232,185,90,0.85)"
            : "rgba(232,185,90,0.30)",
        }}
      >
        {/* <TalentIconDisplay
          icon={talent.icon}
          size={39}
          color={isSelected ? GOLD_LIGHT : GOLD}
        /> */}

        <TalentIconSelector code = { talent.label } size={55}/>

        <Text
          style={{
            marginTop: 7,
            color: isSelected ? GOLD_LIGHT : "#E9E3D8",
            fontSize: 9,
            fontWeight: "800",
            letterSpacing: 0.45,
            textAlign: "center",
            lineHeight: 13,
          }}
        >
          {(talent.label || talent.name).toUpperCase()}
        </Text>

        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 7,
              right: 7,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={13}
              color={GOLD}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // --------------------------------------------------
  // SELECTED TALENT INFORMATION
  // --------------------------------------------------

  const renderSelectedTalent = () => {
    if (!selectedTalentData) return null;

    return (
      <View
        style={{
          marginHorizontal: 19,
          marginTop: 2,
          marginBottom: 13,
          padding: 12,
          borderRadius: 15,
          // backgroundColor: "rgba(232,185,90,0.075)",
          // borderWidth: 1,
          // borderColor: "rgba(232,185,90,0.34)",
        }}
      >
        <Text
          style={{
            color: GOLD,
            fontSize: 8,
            fontWeight: "900",
            letterSpacing: 1.6,
            marginBottom: 9,
          }}
        >
          SELECTED TALENT
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              // width: 49,
              // height: 49,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "rgba(232,185,90,0.12)",
              // borderWidth: 1,
              // borderColor: "rgba(232,185,90,0.25)",
            }}
          >
              <TalentIconSelector code = {selectedTalentData.label} size={65}/>
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
          >
            <Text
              style={{
                color: GOLD_LIGHT,
                fontSize: 12,
                fontWeight: "900",
                letterSpacing: 0.5,
              }}
            >
              {selectedTalentData.label || selectedTalentData.name}
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: 9,
                lineHeight: 14,
                marginTop: 5,
              }}
            >
              {selectedTalentData.description ||
                "Showcase your skills and express your talent."}
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={19}
            color={GOLD}
            style={{ marginLeft: 7 }}
          />
        </View>
      </View>
    );
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        {/* BACKDROP */}

        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.78)",
            },
            animatedBackdropStyle,
          ]}
        />

        <Pressable
          onPress={handleClose}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />

        {/* MODAL CONTAINER */}

        <Animated.View
          style={[
            {
              width: "100%",
              maxWidth: 430,
              height: MODAL_HEIGHT,
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: "#080808",
              borderWidth: 1,
              borderColor: "rgba(232,185,90,0.42)",
              // shadowColor: GOLD,
              // shadowOffset: { width: 0, height: 0 },
              // shadowOpacity: 0.22,
              // shadowRadius: 24,
              // elevation: 20,
            },
            animatedModalStyle,
          ]}
          className = "justify-between"
        >
          {/* HEADER */}

          <View
            style={{
              alignItems: "center",
              paddingTop: 25,
              paddingBottom: 20,
              paddingHorizontal: 22,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClose}
              style={{
                position: "absolute",
                right: 13,
                top: 12,
                zIndex: 10,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="close"
                size={33}
                color="rgba(255,255,255,0.75)"
              />
            </TouchableOpacity>

            <View
              style={{
                width: 49,
                height: 49,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(232,185,90,0.11)",
                borderWidth: 1,
                borderColor: "rgba(232,185,90,0.42)",
                marginBottom: 13,
              }}
            >
              <Ionicons
                name={currentCategory ? "grid" : "sparkles"}
                size={24}
                color={GOLD}
              />
            </View>

            <Text
              style={{
                color: GOLD,
                fontSize: 19,
                fontWeight: "900",
                letterSpacing: 2.5,
                textAlign: "center",
              }}
            >
              {currentCategory
                ? currentCategory.label
                : "CHOOSE TALENT"}
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.62)",
                fontSize: 10,
                fontWeight: "500",
                marginTop: 7,
                letterSpacing: 0.35,
                textAlign: "center",
              }}
            >
              {currentCategory
                ? currentCategory.description
                : "Explore a category and discover your talent"}
            </Text>
          </View>

          {/* BACK NAVIGATION */}

        

          {/* CATEGORY / TALENT CONTENT */}

          {currentCategory ? (
            <>
              

                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 19,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                  className = "justify-center items-center"
                >
                    <View
                      style={{
                        height: 37,
                        justifyContent: "center",
                        paddingHorizontal: 21,
                        marginBottom : scale(10)
                      }} >
                      {currentCategory && (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={handleBackToCategories}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}  >
                          <Ionicons
                            name="arrow-back"
                            size={15}
                            color={GOLD}
                          />

                          <Text
                            style={{
                              marginLeft: 7,
                              color: GOLD,
                              fontSize: 10,
                              fontWeight: "800",
                              letterSpacing: 1,
                            }}
                          >
                            ALL CATEGORIES
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignContent: "center",
                        gap: 12,
                      }}
                    >
                      {categoryTalents.map(renderTalent)}
                    </View>

                    {categoryTalents.length === 0 && (
                      <Text
                        style={{
                          color: "#E9E3D8",
                          textAlign: "center",
                          fontSize: 12,
                          padding: 20,
                        }}
                      >
                        No talents found in this category.
                      </Text>
                    )}
        
                </View>
            </>
          ) : (
            // <ScrollView
            //   style={{ flex: 1 }}
            //   showsVerticalScrollIndicator={false}
            //   contentContainerStyle={{
            //     paddingHorizontal: 19,
            //     paddingTop: 5,
            //     paddingBottom: 20,
            //   }}
            // >

            <View
              style={{
                flex: 1,
                paddingHorizontal: 19,
                paddingTop: 5,
                paddingBottom: 5,
              }}
              className = "justify-center items-center"
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  paddingHorizontal: 19,
                }}
              >
                {TALENT_CATEGORIES.map(renderCategory)}
              </View>
            </View>
            // </ScrollView>
          )}

          {/* SELECTED TALENT DESCRIPTION */}

          {renderSelectedTalent()}

          {/* FOOTER ACCENT */}

          <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "rgba(232,185,90,0.23)",
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default TalentPickerModal;
