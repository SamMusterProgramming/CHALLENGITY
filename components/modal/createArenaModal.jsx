// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   useWindowDimensions,
// } from "react-native";
// import Modal from "react-native-modal";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { countries, STAGES, TALENTS } from "../../utilities/TypeData";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TalentPickerModal from "./TalentPickerModal";



// export default function CreateArenaModal({
//   isVisible,
//   setIsVisible,
//   onCreateArena,
//   user
// }) {
//   const { width, height } = useWindowDimensions();
//   const {userCountryCode} = useGlobalContext()
//   const [arenaName, setArenaName] = useState("");
//   const [talentType, setTalentType] = useState("Sport");
//   const [region, setRegion] = useState("");
//   const [biography, setBiography] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const insets = useSafeAreaInsets();
//   const [talentPickerVisible, setTalentPickerVisible] = useState(false);
//   const [form , setForm] = useState({
//                                     arenaName : user.name.split(" ")[0] + talentType + userCountryCode ,
//                                     talentType : "Sport" ,
//                                     region : user.country , // countries.find(c => c.code == userCountryCode)?.code,
//                                     biography : "",
//                                     description : ""
//                                     })
//   useEffect(() => {
//     setForm({...form ,arenaName : user.name.split(" ")[0] + talentType + userCountryCode })
//   }, [talentType])
  
//   const resetForm = () => {
//     setForm({
//         arenaName : "" ,
//         talentType : "" ,
//         region : user.country ,// countries.find(c => c.code == userCountryCode)?.code,
//         biography : "",
//         description : ""
//         })
//     };

//   const handleSubmit = () => {
//     if (
//       !form.arenaName.trim() ||
//       !form.talentType ||
//       !form.region.trim()
//     ) {
//       setMessage(
//         "Arena Name, Talent Type and Region are required."
//       );
//       return;
//     }
//     if (
//         form.description.trim().length < 5 ||
//         form.biography.trim().length < 5
//       ) {
//         setMessage(
//           "Biograpgy , Description must have at least 5 characters"
//         );
//         return;
//       }

//     const arenaData = {
//       arenaName: form.arenaName.trim(),
//       talentType: form.talentType,
//       region: form.region.trim(),
//       biography: form.biography.trim(),
//       description: form.description.trim(),
//       profileImage : user.profileImage,
//       coverImage : user.coverImage
//     };
    
//     onCreateArena?.(arenaData);
//     resetForm();
//     setIsVisible(false);
//   };

//   return (
//     <Modal
//       isVisible={isVisible}
//       style={{ margin: 0 }}
//       backdropOpacity={1}
//       animationIn="fadeInUp"
//       animationOut="fadeOutDown"
//       useNativeDriver
//       hideModalContentWhileAnimating
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#000",
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom + 10,
//         }}
//         className ="items-center w-full"
//       >
//         {/* HEADER */}
  
//         <View
//           style={{
//             // height: 56,
//             paddingHorizontal: 20,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//           className ="items-center w-full py-6"
//         >
//           <TouchableOpacity
//             onPress={() => setIsVisible(false)}
//             style={{
//             //   width: 36,
//             //   height: 36,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <MaterialCommunityIcons
//               name="close"
//               size={30}
//               color="#888"
//             />
//           </TouchableOpacity>
  
//           <Text
//             style={{
//               color: "#FFF",
//               fontSize: width/20,
//               fontWeight: "700",
//             }}
//           >
//             Create Arena
//           </Text>
  
//           <View
//             style={{
//             //   width: width/8,
//             //   height: width/8,
//               borderRadius: 42,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(234,179,8,0.08)",
//             //   borderWidth: 1,
//             //   borderColor: "rgba(234,179,8,0.30)",
//             }}
//           >
//             <MaterialCommunityIcons
//               name="star-four-points"
//               size={30}
//               color="#eab308"
//             />
//           </View>
//         </View>
  
//         {/* HERO */}
  
//         {/* <View
//           style={{
//             alignItems: "center",
//             paddingHorizontal: 44,
//             paddingTop: 10,
//             paddingBottom: 20,
//             borderWidth: 4,
//             borderColor: "rgba(234,179,8,0.30)",
//             borderRadius :18 ,
//             paddingBottom:24
//           }}
//            >
//           <Text
//             numberOfLines = {1}
//             style={{
//               marginTop: 14,
//               color: "#FFF",
//               fontSize: width/26,
//               fontWeight: "800",
//             }}
//           >
//             {form.arenaName || "Your Arena"}
//           </Text>
  
//           <Text
//             style={{
//               marginTop: 4,
//               color: "#8B8B8B",
//               fontSize: 14,
//             }}
//           >
//             {form.talentType || "Talent"} • {userCountryCode}
//           </Text>
//         </View> */}
  
//         {/* FORM */}
       
//         <ScrollView
//         style={{
//             // flex: 1,
//         }}
//         contentContainerStyle={{
//             // flexGrow: 1,
//             paddingTop: 24,
//             paddingBottom: 24,
//           }}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         >
        
//           <View
//             style={{
//                 paddingHorizontal: 10,
//             }}
//             className ="gap-2 justify-center items-center w-full"
//             >
//                 <Text
//                 style={{
//                     color: "#eab308",
//                     fontSize: width/30,
//                     fontWeight: "700",
//                     marginBottom: 8,
//                     letterSpacing: 1,
//                 }}
//                 >
//                 ARENA NAME
//                 </Text>
    
//                 <TextInput
//                 value={form.arenaName}
//                 onChangeText={(e) =>
//                     setForm({
//                     ...form,
//                     arenaName: e,
//                     })
//                 }
//                 placeholder="Music Arena"
//                 placeholderTextColor="#666"
//                 style={{
//                     height: 50,
//                     width : "100%",
//                     borderRadius: 8,
//                     backgroundColor: "#0C0C0C",
//                     borderWidth: 1,
//                     borderColor: "rgba(255,255,255,0.16)",
//                     paddingHorizontal: 14,
//                     color: "#FFF",
//                 }}
//                 />
//             </View>
  
          
  
//             {/* BIO */}
    
//             <View
//             style={{
//                 paddingHorizontal :10,
//                 marginTop :40
//             }}
//             className ="gap-2 justify-center items-center">
//                 <View
//                 style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     marginBottom: 8,
//                 }}
//                 >
//                 <Text
//                     style={{
//                     color: "#eab308",
//                     fontSize: width/30,
//                     fontWeight: "700",
//                     letterSpacing: 1,
//                     }}
//                 >
//                     BIOGRAPHY {' '}
//                 </Text>
    
//                 <Text
//                     style={{
//                     color: "#fff",
//                     fontSize: width/32,
//                     }}
//                 >
//                     {form.biography.length}/50
//                 </Text>
//                 </View>
    
//                 <TextInput
//                 multiline
//                 maxLength={50}
//                 value={form.biography}
//                 onChangeText={(e) =>
//                     setForm({
//                     ...form,
//                     biography: e,
//                     })
//                 }
//                 placeholder="Tell people who you are..."
//                 placeholderTextColor="#666"
//                 style={{
//                     height: 62,
//                     width : "100%",
//                     borderRadius: 8,
//                     backgroundColor: "#0C0C0C",
//                     borderWidth: 1,
//                     borderColor: "rgba(255,255,255,0.16)",
//                     paddingHorizontal: 14,
//                     paddingTop: 12,
//                     color: "#FFF",
//                 }}
//                 />
//             </View>
  
//             {/* DESCRIPTION */}
    
//             <View
//             style={{
//                 paddingHorizontal :10 ,
//                 marginTop :40
//             }}
//             className ="gap-2  w-full ">
//                 <View
//                 style={{
//                     flexDirection: "row",
//                     // justifyContent: "space-center",
//                     marginBottom: 8,
//                 }}
//                 className ="w-full justify-center"
//                 >
//                 <Text
//                     style={{
//                     color: "#eab308",
//                     fontSize: width/30,
//                     fontWeight: "700",
//                     letterSpacing: 1,
//                     }}
//                 >
//                     DESCRIPTION {' '}
//                 </Text>
    
//                 <Text
//                     style={{
//                     color: "#fff",
//                     fontSize: width/32,
//                     }}
//                 >
//                     {form.description.length}/150
//                 </Text>
//                 </View>
    
//                 <TextInput
//                 multiline
//                 numberOfLines={2}
//                 maxLength={100}
//                 value={form.description}
//                 textAlignVertical="top"
//                 onChangeText={(e) =>
//                     setForm({
//                     ...form,
//                     description: e,
//                     })
//                 }
//                 placeholder="Describe what people can expect..."
//                 placeholderTextColor="#666"
//                 style={{
//                     height: 75,
//                     width : width * 0.95,
//                     borderRadius: 8,
//                     backgroundColor: "#0C0C0C",
//                     borderWidth: 1,
//                     borderColor: "rgba(255,255,255,0.16)",
//                     paddingHorizontal: 14,
//                     paddingTop: 12,
//                     color: "#FFF",
//                 }}
//                 />
//             </View>

//               {/* TALENT */}
    
//               <View
//               style ={{
//                 marginTop :40
//               }}
//               className = "items-center gap-4"
//                 >
//                 <Text
//                 style={{
//                     color: "#eab308",
//                     fontSize: width/30,
//                     fontWeight: "700",
//                     marginBottom: 10,
//                     letterSpacing: 1,
//                     marginLeft :10
//                 }}
//                 >
//                 TALENT TYPE
//                 </Text>

//                 <TouchableOpacity
//   activeOpacity={0.82}
//   onPress={() => setTalentPickerVisible(true)}
//   style={{
//     width: "100%",
//     minHeight: 76,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: talentType
//       ? "rgba(234,179,8,0.38)"
//       : "rgba(255,255,255,0.10)",
//     backgroundColor: talentType
//       ? "rgba(234,179,8,0.07)"
//       : "rgba(255,255,255,0.035)",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,

//     shadowColor: "#EAB308",
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: talentType ? 0.10 : 0,
//     shadowRadius: 14,
//     elevation: talentType ? 3 : 0,
//   }}
// >
//   {/* LEFT ICON */}
//   <View
//     style={{
//       width: 44,
//       height: 44,
//       borderRadius: 13,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: talentType
//         ? "rgba(234,179,8,0.12)"
//         : "rgba(255,255,255,0.05)",
//       borderWidth: 1,
//       borderColor: talentType
//         ? "rgba(234,179,8,0.25)"
//         : "rgba(255,255,255,0.08)",
//     }}
//   >
//     <Ionicons
//       name="sparkles-outline"
//       size={21}
//       color={
//         talentType
//           ? "#EAB308"
//           : "rgba(255,255,255,0.45)"
//       }
//     />
//   </View>

//   {/* TEXT */}
//   <View
//     style={{
//       flex: 1,
//       marginLeft: 14,
//       justifyContent: "center",
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 9,
//         fontWeight: "700",
//         letterSpacing: 1.8,
//         color: "rgba(255,255,255,0.38)",
//         marginBottom: 4,
//       }}
//     >
//       TALENT
//     </Text>

//     <Text
//       numberOfLines={1}
//       style={{
//         fontSize: width / 25,
//         fontWeight: "800",
//         letterSpacing: 0.8,
//         color: talentType
//           ? "#F4C542"
//           : "rgba(255,255,255,0.62)",
//       }}
//     >
//       {talentType || "SELECT YOUR TALENT"}
//     </Text>
//   </View>

//   {/* ARROW */}
//   <View
//     style={{
//       width: 34,
//       height: 34,
//       borderRadius: 10,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "rgba(255,255,255,0.04)",
//     }}
//   >
//     <Ionicons
//       name="chevron-forward"
//       size={20}
//       color={
//         talentType
//           ? "#EAB308"
//           : "rgba(255,255,255,0.45)"
//       }
//     />
//   </View>
// </TouchableOpacity>
    
//                 {/* <View
//                 className="flex-row flex-wrap justify-between px-2 py-2"
//                 >
//                 {TALENTS.map((talent, index) => {
//                     const selected =
//                     form.talentType === talent;

//                     return (
//                     <TouchableOpacity
//                         key={index}
//                         activeOpacity={0.85}
//                         onPress={() => {
//                         setForm({
//                             ...form,
//                             talentType: talent,
//                         });

//                         setTalentType(talent);
//                         }}
//                         style={{
//                         width: "32%",
//                         height: 52,
//                         marginBottom: 10,
//                         borderRadius: 8,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: selected
//                             ? "#eab308"
//                             : "rgba(255,255,255,0.03)",
//                         borderWidth: 1,
//                         borderColor: selected
//                             ? "#eab308"
//                             : "rgba(234,179,8,0.35)",
//                         }}
//                     >
//                         <Text
//                         numberOfLines={1}
//                         style={{
//                             color: selected
//                             ? "#000"
//                             : "#FFF",

//                             fontWeight: "700",
//                             fontSize: width / 30,
//                         }}
//                         >
//                         {STAGES[index]}
//                         </Text>
//                     </TouchableOpacity>
//                     );
//                 })}
//                 </View> */}

//             </View>
  
//             {message ? (
//                 <Text
//                 style={{
//                     color: "#EF4444",
//                     textAlign: "center",
//                     fontWeight: "600",
//                   }}  >
//                   {message}
//                 </Text>
//             ) : null}

//             <View
//               style={{
//                 marginHorizontal: 10,
//                 marginTop: 20,
//                 borderRadius: 12,
//                 padding: 14,
//                 backgroundColor: "rgba(255,255,255,0.03)",
//                 borderWidth: 1,
//                 borderColor: "rgba(234,179,8,0.20)",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#eab308",
//                   fontSize: width / 32,
//                   fontWeight: "700",
//                   marginBottom: 12,
//                   letterSpacing: 1,
//                 }}
//               >
//                 REVIEW
//               </Text>

//               <View className="gap-2">
//                 <Text
//                   style={{
//                     color: "#FFF",
//                     fontWeight: "700",
//                     fontSize: width / 26,
//                   }}
//                 >
//                   {form.arenaName || "Unnamed Arena"}
//                 </Text>

//                 <Text
//                   style={{
//                     color: "#B3B3B3",
//                     fontSize: width / 34,
//                   }}
//                 >
//                   {form.talentType || "No Talent Selected"} • {userCountryCode}
//                 </Text>

//                 {!!form.biography && (
//                   <Text
//                     numberOfLines={2}
//                     style={{
//                       color: "#E5E5E5",
//                       fontSize: width / 34,
//                     }}
//                   >
//                     {form.biography}
//                   </Text>
//                 )}

//                 {!!form.description && (
//                   <Text
//                     numberOfLines={2}
//                     style={{
//                       color: "#8A8A8A",
//                       fontSize: width / 36,
//                     }}
//                   >
//                     {form.description}
//                   </Text>
//                 )}
//               </View>
//             </View>
       
//         </ScrollView>
      
//         {/* BUTTON */}
  
//         <View
//           style={{
//             paddingHorizontal: 10,
//             paddingTop: 10,
//           }}
//           className ="items-center w-full px-6"
//         >
//           <TouchableOpacity
//             activeOpacity={0.9}
//             onPress={handleSubmit}
//             style={{
//               height: 58,
//               borderRadius: 10,
//               backgroundColor: "#eab308",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             className ="items-center w-full"
//           >
//             <Text
//               style={{
//                 color: "#000",
//                 fontWeight: "900",
//                 fontSize: 16,
//                 letterSpacing: 0.5,
//               }}
//             >
//               LAUNCH ARENA
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {talentPickerVisible &&(
//           <TalentPickerModal
//           visible={talentPickerVisible}
//           onClose={() => setTalentPickerVisible(false)}
//           selectedTalent={talentType}
//           onSelectTalent={(talent) => {
//             setForm({
//               ...form,
//               talentType: talent,
//             });
        
//             setTalentType(talent);
//           }}
//         />
//         )}
//       </View>
//     </Modal>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TalentPickerModal from "./TalentPickerModal";
import { stageIcons } from "../../utilities/TypeData";

export default function CreateArenaModal({
  isVisible,
  setIsVisible,
  onCreateArena,
  user,
}) {
  const { width, height } = useWindowDimensions();
  const { userCountryCode } = useGlobalContext();
  const insets = useSafeAreaInsets();

  const [arenaName, setArenaName] = useState("");
  const [talentType, setTalentType] = useState("Sport");
  const [region, setRegion] = useState("");
  const [biography, setBiography] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [talentPickerVisible, setTalentPickerVisible] = useState(false);

  const [form, setForm] = useState({
    arenaName:
      user.name.split(" ")[0] + talentType + userCountryCode,
    talentType: "Sport",
    region: user.country,
    biography: "",
    description: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      arenaName:
        user.name.split(" ")[0] + talentType + userCountryCode,
    });
  }, [talentType]);

  const resetForm = () => {
    setForm({
      arenaName: "",
      talentType: "",
      region: user.country,
      biography: "",
      description: "",
    });
  };

  const handleSubmit = () => {
    if (
      !form.arenaName.trim() ||
      !form.talentType ||
      !form.region.trim()
    ) {
      setMessage(
        "Arena Name, Talent Type and Region are required."
      );
      return;
    }

    if (
      form.description.trim().length < 5 ||
      form.biography.trim().length < 5
    ) {
      setMessage(
        "Biograpgy , Description must have at least 5 characters"
      );
      return;
    }

    const arenaData = {
      arenaName: form.arenaName.trim(),
      talentType: form.talentType,
      region: form.region.trim(),
      biography: form.biography.trim(),
      description: form.description.trim(),
      profileImage: user.profileImage,
      coverImage: user.coverImage,
    };

    onCreateArena?.(arenaData);

    resetForm();
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      backdropOpacity={1}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#050505",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        // className ="justify-between"
      >
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <View
          style={{
            height: 64,
            paddingHorizontal: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor:
              "rgba(255,255,255,0.06)",
          }}
        >
          {/* CLOSE */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsVisible(false)}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                "rgba(255,255,255,0.035)",
              borderWidth: 1,
              borderColor:
                "rgba(255,255,255,0.08)",
            }}
          >
            <Ionicons
              name="close"
              size={22}
              color="rgba(255,255,255,0.65)"
            />
          </TouchableOpacity>

          {/* TITLE */}

          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#F4C542",
                fontSize: width / 23,
                fontWeight: "900",
                letterSpacing: 1.8,
              }}
            >
              CREATE ARENA
            </Text>

            <Text
              style={{
                color:
                  "rgba(255,255,255,0.35)",
                fontSize: 9,
                fontWeight: "600",
                letterSpacing: 1.2,
                marginTop: 3,
              }}
            >
              BUILD YOUR COMPETITION
            </Text>
          </View>

          {/* EMBLEM */}

          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                "rgba(234,179,8,0.09)",
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.28)",
            }}
          >
            <MaterialCommunityIcons
              name="star-four-points"
              size={22}
              color="#EAB308"
            />
          </View>
        </View>

        {/* ===================================================== */}
        {/* CONTENT */}
        {/* ===================================================== */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 14,
            paddingTop: 8,
            paddingBottom: 18,
          }}
        >
          {/* ================================================= */}
          {/* ARENA IDENTITY */}
          {/* ================================================= */}

          <View
            style={{
              padding: 24,
              borderRadius: 8,
              // backgroundColor:
              //   "rgba(255,255,255,0.15)",
              borderWidth: 1,
              // borderColor:
              //   "rgba(255,255,255,0.28)",
            }}
            className = " border-gold/30"
          >
            {/* SECTION LABEL */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 16,
                  borderRadius: 3,
                  backgroundColor: "#EAB308",
                  marginRight: 8,
                }}
              />

              <Text
                style={{
                  color: "#EAB308",
                  fontSize: width/30,
                  fontWeight: "900",
                  letterSpacing: 0.6,
                }}
              >
                ARENA IDENTITY
              </Text>
            </View>

            {/* ARENA NAME */}

            <TextInput
              value={form.arenaName}
              onChangeText={(e) =>
                setForm({
                  ...form,
                  arenaName: e,
                })
              }
              placeholder="Arena Name"
              placeholderTextColor="#555"
              style={{
                height: 48,
                width: "100%",
                borderRadius: 8,
                backgroundColor:
                  "rgba(0,0,0,0.45)",
                borderWidth: 1,
                borderColor:
                  "rgba(234,179,8,0.40)",
                paddingHorizontal: 14,
                color: "#FFF",
                fontSize: 15,
                fontWeight: "700",
                marginBottom : 14
              }}
            />

            {/* TALENT */}

            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() =>
                setTalentPickerVisible(true)
              }
              style={{
                marginTop: 10,
                minHeight: 62,
                borderRadius: 8,
                borderWidth: 1,
                borderColor:
                  "rgba(234,179,8,0.38)",
                backgroundColor:
                  "rgba(234,179,8,0.07)",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,

                // shadowColor: "#EAB308",
                // shadowOffset: {
                //   width: 0,
                //   height: 0,
                // },
                // shadowOpacity: 0.10,
                // shadowRadius: 12,
                // elevation: 3,
              }}
            >
              {/* ICON */}

              <View
                style={{
                  // width: 40,
                  // height: 40,
                  borderRadius: 11,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    "rgba(234,179,8,0.12)",
                  borderWidth: 1,
                  borderColor:
                    "rgba(234,179,8,0.22)",
                }}
                className = "p-2"
              >
                {/* <Ionicons
                  name="sparkles-outline"
                  size={20}
                  color="#EAB308"
                /> */}
                 <Text
                  style={{
                    fontSize: width/22,
                    // fontWeight: "800",
                    // letterSpacing: 0.7,
                    color:
                      "rgba(255,255,255,0.95)",
                  }}
                >
                  {stageIcons[talentType]}
                </Text>
              </View>

              {/* TEXT */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "800",
                    letterSpacing: 0.7,
                    color:
                      "rgba(255,255,255,0.95)",
                  }}
                >
                  TALENT TYPE
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: 3,
                    fontSize: 15,
                    fontWeight: "900",
                    letterSpacing: 0.8,
                    color: "#F4C542",
                  }}
                >
                  {talentType ||
                    "SELECT YOUR TALENT"}
                </Text>
              </View>

              {/* ARROW */}

              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    "rgba(255,255,255,0.04)",
                }}
              >
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#EAB308"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* ================================================= */}
          {/* ABOUT */}
          {/* ================================================= */}

          <View
            style={{
              marginTop: 22,
              padding: 24,
              borderRadius: 8,
              // backgroundColor:
              //   "rgba(255,255,255,0.025)",
              borderWidth: 1,
              // borderColor:
              //   "rgba(255,255,255,0.08)",
            }}
            className = " border-gold/20 bg-[gold]/5"
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 16,
                  borderRadius: 3,
                  backgroundColor: "#EAB308",
                  marginRight: 8,
                }}
              />

              <Text
                style={{
                  color: "#EAB308",
                  fontSize: width/30,
                  fontWeight: "900",
                  letterSpacing: 0.6,
                }}
              >
                ABOUT YOUR ARENA
              </Text>
            </View>

            {/* BIO */}

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.85)",
                    fontSize: width/42,
                    fontWeight: "800",
                    letterSpacing: 1.1,
                  }}
                >
                  BIOGRAPHY
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.85)",
                    fontSize: width/42,
                  }}
                >
                  {form.biography.length}/50
                </Text>
              </View>

              <TextInput
                multiline
                maxLength={50}
                value={form.biography}
                onChangeText={(e) =>
                  setForm({
                    ...form,
                    biography: e,
                  })
                }
                placeholder="Tell people who you are..."
                placeholderTextColor="#AAA"
                style={{
                  height: 58,
                  borderRadius: 8,
                  backgroundColor:
                    "rgba(0,0,0,0.45)",
                  borderWidth: 1,
                  borderColor:
                    "rgba(255,255,255,0.28)",
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  color: "#FFF",
                  fontSize: 13,
                }}
              />
            </View>

            {/* DESCRIPTION */}

            <View
              style={{
                marginTop: 18,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.85)",
                    fontSize: width/42,
                    fontWeight: "800",
                    letterSpacing: 1.1,
                  }}
                >
                  DESCRIPTION
                </Text>

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.80)",
                    fontSize: width/42,
                  }}
                >
                  {form.description.length}/100
                </Text>
              </View>

              <TextInput
                multiline
                maxLength={100}
                value={form.description}
                textAlignVertical="top"
                onChangeText={(e) =>
                  setForm({
                    ...form,
                    description: e,
                  })
                }
                placeholder="Describe what people can expect..."
                placeholderTextColor="#AAA"
                style={{
                  height: 66,
                  borderRadius: 8,
                  backgroundColor:
                    "rgba(0,0,0,0.45)",
                  borderWidth: 1,
                  borderColor:
                    "rgba(255,255,255,0.28)",
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  color: "#FFF",
                  fontSize: 13,
                }}
              />
            </View>
          </View>

          {/* ================================================= */}
          {/* REVIEW */}
          {/* ================================================= */}

          <View
            style={{
              marginTop: 22,
              padding: 14,
              borderRadius: 8,
              backgroundColor:
                "rgba(234,179,8,0.045)",
              borderWidth: 1,
              borderColor:
                "rgba(234,179,8,0.18)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={26}
                  color="#EAB308"
                />

                <Text
                  style={{
                    marginLeft: 7,
                    color: "#EAB308",
                    fontSize: width/30,
                    fontWeight: "900",
                    letterSpacing: 0.5,
                  }}
                >
                  ARENA PREVIEW
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  backgroundColor:
                    "rgba(234,179,8,0.10)",
                }}
              >
                <Text
                  style={{
                    color: "#EAB308",
                    fontSize: width/30,
                    fontWeight: "900",
                  }}
                >
                  {userCountryCode}
                </Text>
              </View>
            </View>

            <Text
              numberOfLines={1}
              style={{
                color: "#FFF",
                fontSize: 16,
                fontWeight: "900",
                letterSpacing: 0.4,
              }}
            >
              {form.arenaName ||
                "Unnamed Arena"}
            </Text>

            <Text
              style={{
                marginTop: 6,
                color:
                  "rgba(255,255,255,0.42)",
                fontSize: width/30,
                fontWeight: "700",
              }}
            >
              {form.talentType ||
                "No Talent Selected"}{" "}
              • {userCountryCode}
            </Text>

            {!!form.biography && (
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 8,
                  color:
                    "rgba(255,255,255,0.68)",
                  fontSize: width/36,
                }}
              >
                {form.biography}
              </Text>
            )}
          </View>

          {/* ERROR */}

          {!!message && (
            <View
              style={{
                marginTop: 22,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 9,
                backgroundColor:
                  "rgba(239,68,68,0.08)",
                borderWidth: 1,
                borderColor:
                  "rgba(239,68,68,0.18)",
              }}
            >
              <Text
                style={{
                  color: "#EF4444",
                  textAlign: "center",
                  fontSize: width/36,
                  fontWeight: "700",
                }}
              >
                {message}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* ===================================================== */}
        {/* LAUNCH */}
        {/* ===================================================== */}

        <View
          style={{
            paddingHorizontal: 18,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopWidth: 1,
            borderTopColor:
              "rgba(255,255,255,0.06)",
            backgroundColor: "#050505",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleSubmit}
            style={{
              height: 56,
              borderRadius: 8,
              backgroundColor: "#EAB308",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",

              shadowColor: "#EAB308",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 14,
              elevation: 6,
            }}
          >
            <MaterialCommunityIcons
              name="rocket-launch-outline"
              size={21}
              color="#000"
            />

            <Text
              style={{
                marginLeft: 10,
                color: "#000",
                fontWeight: "900",
                fontSize: 15,
                letterSpacing: 1.3,
              }}
            >
              LAUNCH ARENA
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#000"
              style={{
                marginLeft: 8,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* ===================================================== */}
        {/* TALENT MODAL */}
        {/* ===================================================== */}

        {talentPickerVisible && (
          <TalentPickerModal
            visible={talentPickerVisible}
            onClose={() =>
              setTalentPickerVisible(false)
            }
            selectedTalent={talentType}
            onSelectTalent={(talent) => {
              setForm({
                ...form,
                talentType: talent,
              });

              setTalentType(talent);
            }}
          />
        )}
      </View>
    </Modal>
  );
}