
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   useWindowDimensions,
// } from "react-native";
// import Modal from "react-native-modal";
// import { LinearGradient } from "expo-linear-gradient";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TalentPickerModal from "./TalentPickerModal";
// import { stageIcons } from "../../utilities/TypeData";
// import TalentIcon from "../custom/TalentIcon";
// import { talentAvatar } from "../../helper";
// import { enqueueArenaUpload } from "../../services/uploads/uploadQueue";

// const GOLD = "#D8B65A";
// const BACKGROUND = "#090A0C";
// const SURFACE = "#121317";
// const INPUT_BACKGROUND = "#0C0D10";
// const MUTED = "#92939A";
// const BORDER = "#292A2F";

// export default function CreateArenaModal({
//   isVisible,
//   setIsVisible,
//   onCreateArena,
//   user,
// }) {
//   const { width, height } = useWindowDimensions();
//   const { userCountryCode , spacing , scale } = useGlobalContext();
//   const insets = useSafeAreaInsets();

//   const [arenaName, setArenaName] = useState("");
//   const [talentType, setTalentType] = useState("Singing");
//   const [region, setRegion] = useState("");
//   const [biography, setBiography] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [talentPickerVisible, setTalentPickerVisible] = useState(false);

//   const [form, setForm] = useState({
//     arenaName:
//       (user?.name?.split(" ")[0] || "") +
//       "Sport" +
//       (userCountryCode || ""),
//     talentType: "Sport",
//     region: user?.country || "",
//     biography: "",
//     description: "",
//   });

//   const [profileImage, setProfileImage] = useState(
//     user?.profileImage || null
//   );

//   const [coverImage, setCoverImage] = useState(
//     talentAvatar["singing"].cdnUrl || null
//   );

//   const [customProfileImage, setCustomProfileImage] = useState(false);
//   const [customCoverImage, setCustomCoverImage] = useState(false);
//   const [isPickingImage, setIsPickingImage] = useState(false);

//   const getImageUri = (image) => {
//     if (!image) return null;
//     if (typeof image === "string") return image;
//     return image.cdnUrl || image.publicUrl || null;
//   };

//   useEffect(() => {
//     const firstName = user?.name?.split(" ")[0] || "";

//     setForm((previous) => ({
//       ...previous,
//       arenaName: firstName + talentType + (userCountryCode || ""),
//       talentType,
//     }));

//     if (!customCoverImage) {
//       setCoverImage(talentAvatar?.[talentType.toLowerCase()] || null);
//     }
//   }, [talentType, userCountryCode, user?.name, customCoverImage]);

//   useEffect(() => {
//     setForm((previous) => ({
//       ...previous,
//       region: previous.region || user?.country || "",
//     }));
//   }, [user?.country]);

//   const resetForm = () => {
//     setForm({
//       arenaName: "",
//       talentType: "Sport",
//       region: user?.country || "",
//       biography: "",
//       description: "",
//     });

//     setArenaName("");
//     setTalentType("Sport");
//     setRegion("");
//     setBiography("");
//     setDescription("");
//     setMessage("");

//     setProfileImage(user?.profileImage || null);
//     setCoverImage(talentAvatar?.singing || null);
//     setCustomProfileImage(false);
//     setCustomCoverImage(false);
//   };


//   const pickImage = async (type) => {
//     try {
//       setIsPickingImage(true);
//       setMessage("");
  
//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
  
//       if (!permission.granted) {
//         setMessage("Please allow photo library access to select an image.");
//         return;
//       }
  
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ["images"],
//         allowsEditing: true,
//         aspect: type === "profile" ? [1, 1] : [16, 9],
//         quality: 0.85,
//       });
  
//       if (result.canceled || !result.assets?.[0]) return;
  
//       const uri = result.assets[0].uri;
  
//       if (type === "profile") {
//         setProfileImage(uri);
//         setCustomProfileImage(true);
//       } else {
//         setCoverImage(uri);
//         setCustomCoverImage(true);
//       }
//     } catch (error) {
//       console.error("Image picker error:", error);
//       setMessage("Unable to select the image. Please try again.");
//     } finally {
//       setIsPickingImage(false);
//     }
//   };
  



//   // const handleSubmit = async () => {
//   //   const arenaName = form.arenaName.trim();
//   //   const region = form.region.trim();
//   //   const biography = form.biography.trim();
//   //   const description = form.description.trim();
  
//   //   // Validate required fields.
//   //   if (!arenaName || !form.talentType || !region) {
//   //     setMessage("Arena Name, Talent Type and Region are required.");
//   //     return;
//   //   }
  
//   //   if (biography.length < 5 || description.length < 5) {
//   //     setMessage(
//   //       "Biography and description must have at least 5 characters."
//   //     );
//   //     return;
//   //   }
  
//   //   // Keep the image objects intact.
//   //   const arenaData = {
//   //     arenaName,
//   //     talentType: form.talentType,
//   //     region,
//   //     biography,
//   //     description,
//   //     profileImage: profileImage || user?.profileImage || null,
//   //     coverImage: coverImage || talentAvatar?.[form.talentType] || null,
//   //   };
//   //     onCreateArena?.(arenaData);
//   //     resetForm();
//   //     setIsVisible(false);
//   //     setMessage("Arena creation started. You can keep using the app.");
//   // };

//   const handleSubmit = () => {
//     const arenaName = form.arenaName.trim();
//     const region = form.region.trim();
//     const biography = form.biography.trim();
//     const description = form.description.trim();
  
//     if (!arenaName || !form.talentType || !region) {
//       setMessage("Arena Name, Talent Type and Region are required.");
//       return;
//     }
  
//     if (biography.length < 5 || description.length < 5) {
//       setMessage(
//         "Biography and description must have at least 5 characters."
//       );
//       return;
//     }
  
//     const arenaData = {
//       arenaName,
//       talentType: form.talentType,
//       region,
//       biography,
//       description,
//       profileImage: customProfileImage
//         ? profileImage
//         : user?.profileImage || null,
//       coverImage: customCoverImage
//         ? coverImage
//         : talentAvatar?.[form.talentType?.toLowerCase()] || null,
//       customProfileImage,
//       customCoverImage,
//     };
     
//     if (typeof onCreateArena !== "function") {
//       setMessage("Arena creation is not connected. Please try again.");
//       console.error(
//         "CreateArenaModal: onCreateArena prop was not provided."
//       );
//       return;
//     }

//     onCreateArena?.(arenaData);

//     // enqueueArenaUpload({
//     //   userId: user._id,
//     //   userEmail: user.email,
//     //   arenaData,
//     // }).catch((error) => {
//     //   console.error("Failed to enqueue Arena creation:", error);
//     // });
  
//     resetForm();
//     setCustomProfileImage(false);
//     setCustomCoverImage(false);
//     setIsVisible(false);
//   };


//   const updateField = (field, value) => {
//     setForm((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//     setMessage("");
//   };

//   const renderImage = (image, className = "") => {
//     const uri = getImageUri(image);
//     if (!uri) {
//       return (
//         <View
//           className={`items-center justify-center bg-[#202127] ${className}`}
//         >
//           <Ionicons
//             name="image-outline"
//             size={28}
//             color="#777A84"
//           />
//         </View>
//       );
//     }

//     return (
//       <Image
//         source={{ uri }}
//         resizeMode="cover"
//         className={className}
//       />
//     );
//   };

//   const SectionHeading = ({ eyebrow, title, icon }) => (
//     <View className="mb-6 flex-row items-center">
      
//       <View className="mr-3.5 p-2 items-center justify-center rounded-lg bg-[#2d2c24]">
//         <Ionicons name={icon} size={17} color={GOLD} />
//       </View>

//       <View className="flex-1">
//         {/* <Text className="mb-1 text-[10px] font-bold uppercase tracking-[2.5px] text-[#BFA052]">
//           {eyebrow}
//         </Text> */}

//         <Text
//         style = {{
//           fontSize : scale(16)
//          }}
//          className="text-[21px] font-bold tracking-tight text-white">
//           {title}
//         </Text>
//       </View>
//     </View>
//   );

//   const renderInput = ({
//     label,
//     value,
//     onChangeText,
//     placeholder,
//     multiline = false,
//     maxLength,
//     hint,
//   }) => (
//     <View 
//     style = {{
//       marginBottom : scale(16)
//      }}
//     className="mb -6">
//       <View
//        style = {{
//         marginBottom : scale(8)
//        }}
//        className=" flex-row items-center justify-between">
//         <Text 
//          style = {{
//           fontSize : scale(12)
//          }}
//         className="text -[14px] upper case font-semibold text-[#E4E4E7]">
//           {label}
//         </Text>

//         {maxLength ? (
//           <Text 
//           style = {{
//             fontSize : scale(10)
//            }}
//           className="text- [11px] text-[#737680]">
//             {value.length}/{maxLength}
//           </Text>
//         ) : null}
//       </View>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#666974"
//         multiline={multiline}
//         maxLength={maxLength}
//         textAlignVertical={multiline ? "top" : "center"}
//         selectionColor={GOLD}
//         className="rounded-lg border border-[#292A2F] bg-[#0C0D10] px-4 tex t-[15px] leading-6 text-white"
//         style={{
//           height: multiline
//             ? label === "Biography"
//               ? scale(86)
//               : scale(86)
//             : scale(56),
//           paddingTop: multiline ? 15 : 0,
//           paddingBottom: multiline ? 15 : 8,
//           fontSize : scale(11)
//         }}
//       />

//       {hint ? (
//         <Text
//         style = {{
//           fontSize : scale(9.5)
//          }}
//          className="mt-2.5 text-[12px] leading-5 text-[#777A84]">
//           {hint}
//         </Text>
//       ) : null}
//     </View>
//   );

//   return (
//     <Modal
//       isVisible={isVisible}
//       style={{ margin: 0 }}
//       deviceWidth={width}
//       deviceHeight={height}
//       backdropOpacity={0.92}
//       backdropColor="#000000"
//       animationIn="slideInUp"
//       animationOut="slideOutDown"
//       animationInTiming={300}
//       animationOutTiming={220}
//       useNativeDriver
//       hideModalContentWhileAnimating
//       onBackdropPress={() => setIsVisible(false)}
//       onBackButtonPress={() => setIsVisible(false)}
//     >
//       <KeyboardAvoidingView
//         className="flex-1 bg-[#090A0C"
//         style={{
//           paddingTop: insets.top,
//           backgroundColor: BACKGROUND,
//         }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         {/* Header */}
//         <View className="flex-row items-center justify-between px-6 pb-6 pt-4">
//           <View className="flex-1 pr-4">
           

//             <Text 
//              style = {{
//               fontSize : scale(20)
//              }}
//              className=" font-extrabold tracking-tight text-white">
//               Create Arena
//             </Text>

//             <Text
//             style = {{
//               fontSize : scale(12)
//              }}
//              className="mt-2 text-[14px] leading-5 text-[#92939A]">
//               Build a talent space that represents you.
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={() => setIsVisible(false)}
//             activeOpacity={0.7}
//             className="h-12 w-12 items-center justify-center rounded-full border border-[#292A2F] bg-[#141519]"
//           >
//             <Ionicons name="close" size={23} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>

//         <View className="h-px bg-[#202126]" />

//         {/* Scrollable form */}
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           keyboardDismissMode="on-drag"
//           contentContainerStyle={{
//             paddingHorizontal: 24,
//             paddingTop: 30,
//             paddingBottom: 36,
//           }}
//         >
//           {/* About */}
//           <View className="mb-10">
//             <SectionHeading
//               eyebrow="01 / THE STORY"
//               title="Tell your story"
//               icon="document-text-outline"
//             />

//             <Text
//             style = {{
//               fontSize : scale(12),
//               marginBottom : spacing(16)
//              }}
//              className="mb -7  leading-[23px] text-[#92939A]">
//               Give people a reason to discover your arena. Tell them
//               who you are and what makes your space special.
//             </Text>

//             {renderInput({
//               label: "Biography",
//               value: form.biography,
//               onChangeText: (value) =>
//                 updateField("biography", value),
//               placeholder: "Introduce yourself and your arena...",
//               multiline: true,
//               maxLength: 40,
//               hint: "Keep it personal, clear, and memorable.",
//             })}

//             {renderInput({
//               label: "Description",
//               value: form.description,
//               onChangeText: (value) =>
//                 updateField("description", value),
//               placeholder: "What makes your arena different?",
//               multiline: true,
//               maxLength: 80,
//               hint: "Describe the experience people can expect.",
//             })}
//           </View>

//           <View className="mb-10 h-px bg-[#222328]" />

//           {/* Identity */}
//           <View className="mb-10">
//             <SectionHeading
//               eyebrow="02 / YOUR IDENTITY"
//               title="Define your arena"
//               icon="shield-checkmark-outline"
//             />

//             {renderInput({
//               label: "Arena name",
//               value: form.arenaName,
//               onChangeText: (value) =>
//                 updateField("arenaName", value),
//               placeholder: "Give your arena a name",
//               hint: "Choose a name people will recognize.",
//             })}

//             <View 
//              style = {{
//               marginBottom : spacing(16)
//              }}
//             className="mb-6">
//               <Text
//                style = {{
//                 fontSize : scale(12),
//                 marginBottom : spacing(8)
//                }}
//                className="m b-3  font-semibold text-[#E4E4E7]">
//                 Talent type
//               </Text>

//               <TouchableOpacity
//                 onPress={() => setTalentPickerVisible(true)}
//                 activeOpacity={0.8}
//                 className="flex-row items-center rounded-lg border border-[#292A2F] bg-[#0C0D10] p-4"
//               >
//                 <View className="mr-4 h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#201E17]">
//                   {stageIcons?.[form.talentType] ? (
//                     <TalentIcon talent ={form.talentType} size = {30} />
//                   ) : (
//                     <MaterialCommunityIcons
//                       name="trophy-outline"
//                       size={27}
//                       color={GOLD}
//                     />
//                   )}
//                 </View>

//                 <View className="flex-1">
//                   <Text className="text-[16px] font-bold text-white">
//                     {form.talentType || "Choose your talent"}
//                   </Text>

//                   <Text className="mt-1.5 text-[12px] text-[#858791]">
//                     Select your talent
//                   </Text>
//                 </View>

//                 <View className="h-9 w-9 items-center justify-center rounded-full bg-[#1A1B1F]">
//                   <Ionicons
//                     name="chevron-forward"
//                     size={18}
//                     color="#D4D4D8"
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>

//             {renderInput({
//               label: "Region",
//               value: form.region,
//               onChangeText: (value) =>
//                 updateField("region", value),
//               placeholder: "Country or region",
//               hint: "Where is your arena based?",
//             })}
//           </View>

//           <View className="mb-10 h-px bg-[#222328]" />

//           {/* Artwork */}
//           <View className="mb-10">
//             <SectionHeading
//               eyebrow="03 / VISUAL IDENTITY"
//               title="Make it yours"
//               icon="color-palette-outline"
//             />

//             <Text className="mb-7 text-[14px] leading-[23px] text-[#92939A]">
//               Your images give your arena its personality. Choose an
//               avatar and a cover that work together.
//             </Text>

//             {/* Profile avatar */}
//             <View className="mb-7">
//               <Text className="mb-4 text-[14px] font-semibold text-[#E4E4E7]">
//                 Arena profile image
//               </Text>

//               <View className="flex-row items-center">
//                 <View
//                   className="h-[88px] w-[88px] overflow-hidden rounded-[26px] border border-[#38342A] bg-[#17181C]"
//                   style={{ elevation: 5 }}
//                 >
//                   {profileImage ? (
//                     renderImage(profileImage, "h-full w-full")
//                   ) : (
//                     <View className="h-full w-full items-center justify-center">
//                       <Ionicons
//                         name="person-outline"
//                         size={32}
//                         color="#777A84"
//                       />
//                     </View>
//                   )}
//                 </View>

//                 <View className="ml-5 flex-1">
//                   <Text className="text-[15px] font-bold text-white">
//                     Your arena avatar
//                   </Text>

//                   <Text className="mt-1.5 text-[12px] leading-5 text-[#858791]">
//                     A square image that represents your arena.
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => pickImage("profile")}
//                     disabled={isPickingImage}
//                     activeOpacity={0.7}
//                     className="mt-3 self-start flex-row items-center"
//                   >
//                     <Ionicons
//                       name="image-outline"
//                       size={16}
//                       color={GOLD}
//                     />

//                     <Text className="ml-2 text-[13px] font-semibold text-[#D8B65A]">
//                       {customProfileImage
//                         ? "Change image"
//                         : "Choose image"}
//                     </Text>

//                     <Ionicons
//                       name="arrow-forward"
//                       size={14}
//                       color={GOLD}
//                       style={{ marginLeft: 6 }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             {/* Cover artwork */}
//             <View>
//               <View className="mb-4 flex-row items-center justify-between">
//                 <Text className="text-[14px] font-semibold text-[#E4E4E7]">
//                   Cover artwork
//                 </Text>

//                 <Text className="text-[11px] text-[#777A84]">
//                   16:9 recommended
//                 </Text>
//               </View>

//               <View className="overflow-hidden rounded-[24px] border border-[#292A2F] bg-[#111216]">
//                 <View
//                   className="relative overflow-hidden"
//                   style={{ height: Math.min(width * 0.48, 230) }}
//                 >
//                   {coverImage ? (
//                     renderImage(coverImage, "h-full w-full")
//                   ) : (
//                     <View className="h-full w-full items-center justify-center bg-[#202127]">
//                       <Ionicons
//                         name="image-outline"
//                         size={36}
//                         color="#777A84"
//                       />
//                     </View>
//                   )}

//                   <LinearGradient
//                     colors={[
//                       "transparent",
//                       "rgba(0,0,0,0.25)",
//                       "rgba(0,0,0,0.75)",
//                     ]}
//                     locations={[0, 0.5, 1]}
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       right: 0,
//                       bottom: 0,
//                       left: 0,
//                     }}
//                   />

//                   <View className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-2">
//                     <Text className="text-[9px] font-bold uppercase tracking-[2px] text-white">
//                       ARENA COVER
//                     </Text>
//                   </View>

//                   <TouchableOpacity
//                     onPress={() => pickImage("cover")}
//                     disabled={isPickingImage}
//                     activeOpacity={0.8}
//                     className="absolute bottom-4 right-4 flex-row items-center rounded-full border border-white/20 bg-black/60 px-4 py-3"
//                   >
//                     <Ionicons
//                       name="camera-outline"
//                       size={17}
//                       color="#FFFFFF"
//                     />
//                     <Text className="ml-2 text-[12px] font-semibold text-white">
//                       Change cover
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View className="flex-row items-center px-4 py-4">
//                   <Ionicons
//                     name={
//                       customCoverImage
//                         ? "checkmark-circle"
//                         : "sparkles-outline"
//                     }
//                     size={17}
//                     color={GOLD}
//                   />

//                   <Text className="ml-2 flex-1 text-[12px] leading-5 text-[#A1A2AA]">
//                     {customCoverImage
//                       ? "Your custom cover is selected."
//                       : "Using the default artwork for your selected talent."}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {isPickingImage ? (
//               <View className="mt-4 flex-row items-center">
//                 <ActivityIndicator size="small" color={GOLD} />
//                 <Text className="ml-2 text-[12px] text-[#92939A]">
//                   Opening image library...
//                 </Text>
//               </View>
//             ) : null}
//           </View>

//           <View className="mb-10 h-px bg-[#222328]" />

//           {/* Live preview — final section */}
//           <View className="mb-4">
//             <View className="mb-6">
//               <Text className="mb-2 text-[10px] font-bold uppercase tracking-[3px] text-[#BFA052]">
//                 04 / THE FINAL LOOK
//               </Text>

//               <Text className="text-[25px] font-extrabold tracking-tight text-white">
//                 Meet your arena
//               </Text>

//               <Text className="mt-2 text-[14px] leading-[22px] text-[#92939A]">
//                 This is how your arena identity comes together.
//               </Text>
//             </View>

//             <View className="overflow-hidden rounded-[28px] border border-[#292A2F] bg-[#121317]">
//               {/* Preview cover */}
//               <View
//                 className="relative overflow-hidden"
//                 style={{ height: Math.min(width * 0.58, 270) }}
//               >
//                 {coverImage ? (
//                   renderImage(coverImage, "h-full w-full")
//                 ) : (
//                   <View className="h-full w-full items-center justify-center bg-[#202127]">
//                     <Ionicons
//                       name="image-outline"
//                       size={40}
//                       color="#777A84"
//                     />
//                   </View>
//                 )}

//                 <LinearGradient
//                   colors={[
//                     "rgba(0,0,0,0.02)",
//                     "rgba(0,0,0,0.2)",
//                     "rgba(0,0,0,0.88)",
//                   ]}
//                   locations={[0, 0.45, 1]}
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     bottom: 0,
//                     left: 0,
//                   }}
//                 />

//                 <View className="absolute left-5 top-5 flex-row items-center rounded-full border border-white/20 bg-black/35 px-3.5 py-2">
//                   <Ionicons
//                     name="shield-checkmark"
//                     size={13}
//                     color={GOLD}
//                   />

//                   <Text className="ml-2 text-[10px] font-bold uppercase tracking-[2px] text-white">
//                     ARENA PROFILE
//                   </Text>
//                 </View>

//                 <View className="absolute bottom-5 left-5 right-5">
//                   <Text className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#E4C875]">
//                     {form.region || "YOUR REGION"}
//                   </Text>

//                   <Text
//                     numberOfLines={2}
//                     className="text-[29px] font-extrabold leading-[35px] tracking-tight text-white"
//                   >
//                     {form.arenaName.trim() || "Your Arena Name"}
//                   </Text>
//                 </View>
//               </View>

//               {/* Avatar and category */}
//               <View className="px-5 pb-6">
//                 <View className="flex-row items-end">
//                   <View
//                     className="-mt-10 h-[88px] w-[88px] overflow-hidden rounded-[27px] border-4 border-[#121317] bg-[#222328]"
//                     style={{ elevation: 7 }}
//                   >
//                     {profileImage ? (
//                       renderImage(profileImage, "h-full w-full")
//                     ) : (
//                       <View className="h-full w-full items-center justify-center">
//                         <Ionicons
//                           name="person-outline"
//                           size={33}
//                           color="#858791"
//                         />
//                       </View>
//                     )}
//                   </View>

//                   <View className="ml-4 flex-1 pb-1">
//                     <Text className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#777A84]">
//                       TALENT
//                     </Text>

//                     <View className="self-start rounded-full border border-[#4A4129] bg-[#211E16] px-3.5 py-2">
//                       <Text className="text-[12px] font-bold text-[#E4C875]">
//                         {form.talentType || "Talent type"}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* Biography */}
//                 <View className="mt-7">
//                   <Text className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-[#A7A8B0]">
//                     ABOUT
//                   </Text>

//                   <Text className="text-[15px] leading-[25px] text-[#E0E0E5]">
//                     {form.biography.trim() ||
//                       "Your biography will appear here. Introduce yourself and give visitors a sense of your arena."}
//                   </Text>
//                 </View>

//                 <View className="my-6 h-px bg-[#292A2F]" />

//                 {/* Description */}
//                 <View>
//                   <View className="mb-3 flex-row items-center">
//                     <Ionicons
//                       name="sparkles-outline"
//                       size={17}
//                       color={GOLD}
//                     />

//                     <Text className="ml-2 text-[11px] font-bold uppercase tracking-[2px] text-[#A7A8B0]">
//                       THE EXPERIENCE
//                     </Text>
//                   </View>

//                   <Text className="text-[14px] leading-[24px] text-[#B7B8C0]">
//                     {form.description.trim() ||
//                       "Your arena description will appear here. Describe what makes your arena worth discovering."}
//                   </Text>
//                 </View>

//                 <View className="mt-7 flex-row items-center border-t border-[#292A2F] pt-4">
//                   <Ionicons
//                     name="eye-outline"
//                     size={16}
//                     color="#858791"
//                   />

//                   <Text className="ml-2 text-[12px] text-[#858791]">
//                     Live preview · Updates as you edit
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* Validation message */}
//           {message ? (
//             <View className="mt-5 flex-row items-start rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4">
//               <Ionicons
//                 name="alert-circle-outline"
//                 size={19}
//                 color="#F87171"
//               />

//               <Text className="ml-3 flex-1 text-[13px] leading-5 text-red-300">
//                 {message}
//               </Text>

//               <TouchableOpacity onPress={() => setMessage("")}>
//                 <Ionicons
//                   name="close"
//                   size={18}
//                   color="#F87171"
//                 />
//               </TouchableOpacity>
//             </View>
//           ) : null}
//         </ScrollView>

//         {/* Fixed bottom action */}
//         <View
//           className="border-t border-[#24252A] bg-[#090A0C] px-6 pt-4"
//           style={{
//             paddingBottom: Math.max(insets.bottom, 14),
//           }}
//         >
//           <TouchableOpacity
//             onPress={handleSubmit}
//             activeOpacity={0.85}
//             className="overflow-hidden rounded-2xl"
//           >
//             <LinearGradient
//               colors={["#E7CC7A", "#D8B65A", "#BD9640"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               className="flex-row items-center w-full justify-center py-[18px]"
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "100%",
//                 paddingVertical: 18,
//               }}
//             >
//               <Ionicons
//                 name="rocket-outline"
//                 size={20}
//                 color="#17140C"
//               />

//               <Text className="ml-3 text-[14px] font-extrabold uppercase tracking-[1.5px] text-[#17140C]">
//                 Launch Arena
//               </Text>

//               <Ionicons
//                 name="arrow-forward"
//                 size={18}
//                 color="#17140C"
//                 style={{ marginLeft: 10 }}
//               />
//             </LinearGradient>
//           </TouchableOpacity>

//           <Text className="mt-3 text-center text-[10px] tracking-[1px] text-[#696B74]">
//             YOUR ARENA. YOUR IDENTITY.
//           </Text>
//         </View>

//         <TalentPickerModal
//           visible={talentPickerVisible}
//           onClose={() => setTalentPickerVisible(false)}
//           selectedTalent={form.talentType}
//           onSelectTalent={(selectedTalent) => {
//             setForm((previous) => ({
//               ...previous,
//               talentType: selectedTalent,
//             }));

//             setTalentType(selectedTalent);
//             setTalentPickerVisible(false);
//           }}
//         />
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// }



import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TalentPickerModal from "./TalentPickerModal";
import { stageIcons } from "../../utilities/TypeData";
import TalentIcon from "../custom/TalentIcon";
import { talentAvatar } from "../../helper";
import { enqueueArenaUpload, removeUploadJob } from "../../services/uploads/uploadQueue";
import { getArenaByUser } from "../../apiCalls/arenas";

const GOLD = "#D8B65A";
const BACKGROUND = "#090A0C";
const SURFACE = "#121317";
const INPUT_BACKGROUND = "#0C0D10";
const MUTED = "#92939A";
const BORDER = "#292A2F";

const MIN_TEXT_LENGTH = 5;
const MAX_BIOGRAPHY_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 80;

const getImageUri = (image) => {
  if (!image) return null;

  if (typeof image === "string") {
    return image;
  }

  if (typeof image.uri === "string") {
    return image.uri;
  }

  return image.cdnUrl || image.publicUrl || null;
};

const getDefaultCover = (talentType) => {
  if (!talentType) return null;

  return talentAvatar?.[talentType.toLowerCase()] || null;
};

const getDefaultArenaName = (user, talentType, countryCode) => {
  const firstName = user?.name?.trim().split(/\s+/)[0] || "";

  return `${firstName}${talentType}${countryCode || ""}`;
};

export default function CreateArenaModal({
  isVisible,
  setIsVisible,
  onCreateArena,
  user,
}) {
  const { width, height } = useWindowDimensions();
  const { userCountryCode, spacing, scale ,setUserArenas } = useGlobalContext();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState(() => ({
    arenaName: getDefaultArenaName(user, "Sport", userCountryCode),
    talentType: "Sport",
    region: user?.country || "",
    biography: "",
    description: "",
  }));

  const [profileImage, setProfileImage] = useState(
    user?.profileImage || null
  );
  const [coverImage, setCoverImage] = useState(
    getDefaultCover("Sport")
  );

  const [customProfileImage, setCustomProfileImage] = useState(false);
  const [customCoverImage, setCustomCoverImage] = useState(false);

  const [message, setMessage] = useState("");
  const [talentPickerVisible, setTalentPickerVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep user-dependent defaults synchronized without overwriting
  // a region the user has already entered.
  useEffect(() => {
    setForm((previous) => ({
      ...previous,
      region: previous.region || user?.country || "",
    }));
  }, [user?.country]);

  // Update the profile image if the user changes, unless the user
  // has already chosen a custom image in this modal.
  useEffect(() => {
    if (!customProfileImage) {
      setProfileImage(user?.profileImage || null);
    }
  }, [user?.profileImage, customProfileImage]);

  // Update default artwork when the talent changes. A custom cover
  // must never be replaced by the default artwork.
  useEffect(() => {
    if (!customCoverImage) {
      setCoverImage(getDefaultCover(form.talentType));
    }
  }, [form.talentType, customCoverImage]);

  const updateField = useCallback((field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
  }, []);

  const closeModal = useCallback(() => {
    if (isSubmitting || isPickingImage) return;
    setIsVisible(false);
  }, [isSubmitting, isPickingImage, setIsVisible]);

  const resetForm = useCallback(() => {
    setForm({
      arenaName: getDefaultArenaName(user, "Sport", userCountryCode),
      talentType: "Sport",
      region: user?.country || "",
      biography: "",
      description: "",
    });

    setProfileImage(user?.profileImage || null);
    setCoverImage(getDefaultCover("Sport"));

    setCustomProfileImage(false);
    setCustomCoverImage(false);
    setMessage("");
    setTalentPickerVisible(false);
  }, [user, userCountryCode]);

  const pickImage = async (type) => {
    if (isPickingImage || isSubmitting) return;

    try {
      setIsPickingImage(true);
      setMessage("");

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setMessage(
          "Please allow photo library access to select an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: type === "profile" ? [1, 1] : [16, 9],
        quality: 0.85,
      });

      if (result.canceled || !result.assets?.[0]?.uri) {
        return;
      }

      const selectedImage = result.assets[0];

      if (type === "profile") {
        setProfileImage(selectedImage.uri);
        setCustomProfileImage(true);
      } else {
        setCoverImage(selectedImage.uri);
        setCustomCoverImage(true);
      }
    } catch (error) {
      console.error("[CreateArenaModal] Image picker failed:", error);
      setMessage("Unable to select the image. Please try again.");
    } finally {
      setIsPickingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || isPickingImage) return;
    const arenaName = form.arenaName.trim();
    const talentType = form.talentType.trim();
    const region = form.region.trim();
    const biography = form.biography.trim();
    const description = form.description.trim();
    setMessage("");

    if (!arenaName || !talentType || !region) {
      setMessage("Arena Name, Talent Type and Region are required.");
      return;
    }

    if (
      biography.length < MIN_TEXT_LENGTH ||
      description.length < MIN_TEXT_LENGTH
    ) {
      setMessage(
        "Biography and description must have at least 5 characters."
      );
      return;
    }

    if (customProfileImage && !getImageUri(profileImage)) {
      setMessage("Please select a valid profile image.");
      return;
    }

    if (customCoverImage && !getImageUri(coverImage)) {
      setMessage("Please select a valid cover image.");
      return;
    }


    const arenaData = {
      arenaName,
      talentType,
      region,
      biography,
      description,

      // Custom images remain local URIs here. The upload queue
      // must upload them and convert them into image metadata.
      profileImage: customProfileImage
        ? getImageUri(profileImage)
        : user?.profileImage || null,

      coverImage: customCoverImage
        ? getImageUri(coverImage)
        : getDefaultCover(talentType),

      customProfileImage,
      customCoverImage,
    };

    setIsSubmitting(true);

    try {
      const job = await enqueueArenaUpload({
        userId: user._id,
        userEmail: user.email,
        arenaData,
      });
      resetForm();
      setIsVisible(false);
      // return job;
    } catch (error) {
      console.error("❌ [ArenaPage] enqueueArenaUpload failed:", error);
      throw error;
    }finally {
      setIsSubmitting(false);
    }
    
  };

  const renderImage = (image, style = {}) => {
    const uri = getImageUri(image);

    if (!uri) {
      return (
        <View
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#202127",
            },
            style,
          ]}
        >
          <Ionicons
            name="image-outline"
            size={30}
            color="#777A84"
          />
        </View>
      );
    }

    return (
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={[{ width: "100%", height: "100%" }, style]}
      />
    );
  };

  const SectionHeading = ({ title, icon }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing(18),
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          marginRight: 14,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          backgroundColor: "#2D2C24",
        }}
      >
        <Ionicons name={icon} size={19} color={GOLD} />
      </View>

      <Text
        style={{
          flex: 1,
          color: "#FFFFFF",
          fontSize: scale(18),
          fontWeight: "800",
          letterSpacing: -0.4,
        }}
      >
        {title}
      </Text>
    </View>
  );

  const renderInput = ({
    label,
    field,
    placeholder,
    multiline = false,
    maxLength,
    hint,
  }) => {
    const value = form[field];

    return (
      <View style={{ marginBottom: spacing(17) }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: spacing(8),
          }}
        >
          <Text
            style={{
              color: "#E4E4E7",
              fontSize: scale(12),
              fontWeight: "700",
            }}
          >
            {label}
          </Text>

          {maxLength ? (
            <Text
              style={{
                color: MUTED,
                fontSize: scale(10),
              }}
            >
              {value.length}/{maxLength}
            </Text>
          ) : null}
        </View>

        <TextInput
          value={value}
          onChangeText={(text) => updateField(field, text)}
          placeholder={placeholder}
          placeholderTextColor="#666974"
          multiline={multiline}
          maxLength={maxLength}
          editable={!isSubmitting}
          textAlignVertical={multiline ? "top" : "center"}
          selectionColor={GOLD}
          style={{
            minHeight: multiline ? scale(92) : scale(54),
            height: multiline ? scale(92) : scale(54),
            paddingHorizontal: 16,
            paddingVertical: multiline ? 14 : 0,
            borderWidth: 1,
            borderColor: BORDER,
            borderRadius: 12,
            backgroundColor: INPUT_BACKGROUND,
            color: "#FFFFFF",
            fontSize: scale(13),
          }}
        />

        {hint ? (
          <Text
            style={{
              marginTop: 8,
              color: "#777A84",
              fontSize: scale(10),
              lineHeight: scale(16),
            }}
          >
            {hint}
          </Text>
        ) : null}
      </View>
    );
  };

  const handleSelectTalent = (selectedTalent) => {
    setForm((previous) => ({
      ...previous,
      talentType: selectedTalent,
    }));

    setMessage("");
    setTalentPickerVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      deviceWidth={width}
      deviceHeight={height}
      backdropOpacity={0.92}
      backdropColor="#000000"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={220}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: BACKGROUND,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 20,
          }}
        >
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: scale(23),
                fontWeight: "900",
                letterSpacing: -0.6,
              }}
            >
              Create Arena
            </Text>

            <Text
              style={{
                marginTop: 7,
                color: MUTED,
                fontSize: scale(12),
                lineHeight: scale(18),
              }}
            >
              Build a talent space that represents you.
            </Text>
          </View>

          <TouchableOpacity
            onPress={closeModal}
            disabled={isSubmitting || isPickingImage}
            activeOpacity={0.7}
            style={{
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 22,
              borderWidth: 1,
              borderColor: BORDER,
              backgroundColor: "#141519",
            }}
          >
            <Ionicons name="close" size={23} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 1, backgroundColor: "#202126" }} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 26,
            paddingBottom: 32,
          }}
        >
          {/* Story */}
          <View style={{ marginBottom: 26 }}>
            <SectionHeading
              title="Tell your story"
              icon="document-text-outline"
            />

            <Text
              style={{
                marginBottom: 20,
                color: MUTED,
                fontSize: scale(12),
                lineHeight: scale(20),
              }}
            >
              Give people a reason to discover your arena. Tell them
              who you are and what makes your space special.
            </Text>

            {renderInput({
              label: "Biography",
              field: "biography",
              placeholder: "Introduce yourself and your arena...",
              multiline: true,
              maxLength: MAX_BIOGRAPHY_LENGTH,
              hint: "Keep it personal, clear, and memorable.",
            })}

            {renderInput({
              label: "Description",
              field: "description",
              placeholder: "What makes your arena different?",
              multiline: true,
              maxLength: MAX_DESCRIPTION_LENGTH,
              hint: "Describe the experience people can expect.",
            })}
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 28,
              backgroundColor: "#222328",
            }}
          />

          {/* Identity */}
          <View style={{ marginBottom: 26 }}>
            <SectionHeading
              title="Define your arena"
              icon="shield-checkmark-outline"
            />

            {renderInput({
              label: "Arena name",
              field: "arenaName",
              placeholder: "Give your arena a name",
              hint: "Choose a name people will recognize.",
            })}

            <Text
              style={{
                marginBottom: 9,
                color: "#E4E4E7",
                fontSize: scale(12),
                fontWeight: "700",
              }}
            >
              Talent type
            </Text>

            <TouchableOpacity
              onPress={() => setTalentPickerVisible(true)}
              disabled={isSubmitting}
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: spacing(18),
                padding: 14,
                borderWidth: 1,
                borderColor: BORDER,
                borderRadius: 14,
                backgroundColor: INPUT_BACKGROUND,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                  backgroundColor: "#201E17",
                }}
              >
                {stageIcons?.[form.talentType] ? (
                  <TalentIcon talent={form.talentType} size={29} />
                ) : (
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={27}
                    color={GOLD}
                  />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: scale(14),
                    fontWeight: "800",
                  }}
                >
                  {form.talentType || "Choose your talent"}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: "#858791",
                    fontSize: scale(11),
                  }}
                >
                  Select your talent category
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#D4D4D8"
              />
            </TouchableOpacity>

            {renderInput({
              label: "Region",
              field: "region",
              placeholder: "Country or region",
              hint: "Where is your arena based?",
            })}
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 28,
              backgroundColor: "#222328",
            }}
          />

          {/* Artwork */}
          <View style={{ marginBottom: 28 }}>
            <SectionHeading
              title="Make it yours"
              icon="color-palette-outline"
            />

            <Text
              style={{
                marginBottom: 22,
                color: MUTED,
                fontSize: scale(12),
                lineHeight: scale(20),
              }}
            >
              Choose an avatar and a cover image that give your arena
              a distinctive visual identity.
            </Text>

            {/* Profile image */}
            <Text
              style={{
                marginBottom: 13,
                color: "#E4E4E7",
                fontSize: scale(12),
                fontWeight: "700",
              }}
            >
              Arena profile image
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 27,
              }}
            >
              <View
                style={{
                  width: 88,
                  height: 88,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#38342A",
                  borderRadius: 24,
                  backgroundColor: SURFACE,
                }}
              >
                {renderImage(profileImage)}
              </View>

              <View style={{ flex: 1, marginLeft: 17 }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: scale(13),
                    fontWeight: "800",
                  }}
                >
                  Your arena avatar
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: "#858791",
                    fontSize: scale(10),
                    lineHeight: scale(16),
                  }}
                >
                  A square image that represents your arena.
                </Text>

                <TouchableOpacity
                  onPress={() => pickImage("profile")}
                  disabled={isPickingImage || isSubmitting}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    marginTop: 11,
                  }}
                >
                  <Ionicons
                    name="image-outline"
                    size={16}
                    color={GOLD}
                  />

                  <Text
                    style={{
                      marginLeft: 7,
                      color: GOLD,
                      fontSize: scale(11),
                      fontWeight: "700",
                    }}
                  >
                    {customProfileImage ? "Change image" : "Choose image"}
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={14}
                    color={GOLD}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Cover image */}
            <View
              style={{
                marginBottom: 13,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#E4E4E7",
                  fontSize: scale(12),
                  fontWeight: "700",
                }}
              >
                Cover artwork
              </Text>

              <Text
                style={{
                  color: "#777A84",
                  fontSize: scale(10),
                }}
              >
                16:9 recommended
              </Text>
            </View>

            <View
              style={{
                overflow: "hidden",
                borderWidth: 1,
                borderColor: BORDER,
                borderRadius: 22,
                backgroundColor: SURFACE,
              }}
            >
              <View
                style={{
                  height: Math.min(width * 0.48, 230),
                  overflow: "hidden",
                }}
              >
                {renderImage(coverImage)}

                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0,0,0,0.25)",
                    "rgba(0,0,0,0.72)",
                  ]}
                  locations={[0, 0.5, 1]}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.22)",
                    borderRadius: 20,
                    backgroundColor: "rgba(0,0,0,0.35)",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 9,
                      fontWeight: "800",
                      letterSpacing: 1.8,
                    }}
                  >
                    ARENA COVER
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => pickImage("cover")}
                  disabled={isPickingImage || isSubmitting}
                  activeOpacity={0.8}
                  style={{
                    position: "absolute",
                    right: 13,
                    bottom: 13,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 14,
                    paddingVertical: 11,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.22)",
                    borderRadius: 24,
                    backgroundColor: "rgba(0,0,0,0.65)",
                  }}
                >
                  <Ionicons
                    name="camera-outline"
                    size={17}
                    color="#FFFFFF"
                  />

                  <Text
                    style={{
                      marginLeft: 7,
                      color: "#FFFFFF",
                      fontSize: scale(11),
                      fontWeight: "700",
                    }}
                  >
                    Change cover
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 14,
                }}
              >
                <Ionicons
                  name={
                    customCoverImage
                      ? "checkmark-circle"
                      : "sparkles-outline"
                  }
                  size={17}
                  color={GOLD}
                />

                <Text
                  style={{
                    flex: 1,
                    marginLeft: 9,
                    color: "#A1A2AA",
                    fontSize: scale(10),
                    lineHeight: scale(16),
                  }}
                >
                  {customCoverImage
                    ? "Your custom cover is selected."
                    : "Using the default artwork for your selected talent."}
                </Text>
              </View>
            </View>

            {isPickingImage ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <ActivityIndicator size="small" color={GOLD} />
                <Text
                  style={{
                    marginLeft: 9,
                    color: MUTED,
                    fontSize: scale(11),
                  }}
                >
                  Opening image library...
                </Text>
              </View>
            ) : null}
          </View>

          <View
            style={{
              height: 1,
              marginBottom: 28,
              backgroundColor: "#222328",
            }}
          />

          {/* Live preview */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                marginBottom: 9,
                color: "#BFA052",
                fontSize: 10,
                fontWeight: "800",
                letterSpacing: 2.3,
              }}
            >
              04 / THE FINAL LOOK
            </Text>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: scale(24),
                fontWeight: "900",
                letterSpacing: -0.6,
              }}
            >
              Meet your arena
            </Text>

            <Text
              style={{
                marginTop: 8,
                marginBottom: 20,
                color: MUTED,
                fontSize: scale(12),
                lineHeight: scale(19),
              }}
            >
              Your arena identity, brought together in a live preview.
            </Text>

            <View
              style={{
                overflow: "hidden",
                borderWidth: 1,
                borderColor: BORDER,
                borderRadius: 26,
                backgroundColor: SURFACE,
              }}
            >
              <View
                style={{
                  height: Math.min(width * 0.58, 270),
                  overflow: "hidden",
                }}
              >
                {renderImage(coverImage)}

                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.02)",
                    "rgba(0,0,0,0.2)",
                    "rgba(0,0,0,0.88)",
                  ]}
                  locations={[0, 0.45, 1]}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: 22,
                    backgroundColor: "rgba(0,0,0,0.35)",
                  }}
                >
                  <Ionicons
                    name="shield-checkmark"
                    size={13}
                    color={GOLD}
                  />

                  <Text
                    style={{
                      marginLeft: 7,
                      color: "#FFFFFF",
                      fontSize: 9,
                      fontWeight: "800",
                      letterSpacing: 1.6,
                    }}
                  >
                    ARENA PROFILE
                  </Text>
                </View>

                <View
                  style={{
                    position: "absolute",
                    right: 17,
                    bottom: 19,
                    left: 17,
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 7,
                      color: "#E4C875",
                      fontSize: 10,
                      fontWeight: "800",
                      letterSpacing: 2,
                    }}
                  >
                    {(form.region || "YOUR REGION").toUpperCase()}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      color: "#FFFFFF",
                      fontSize: scale(25),
                      fontWeight: "900",
                      lineHeight: scale(32),
                      letterSpacing: -0.5,
                    }}
                  >
                    {form.arenaName.trim() || "Your Arena Name"}
                  </Text>
                </View>
              </View>

              <View style={{ paddingHorizontal: 19, paddingBottom: 21 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginTop: -36,
                  }}
                >
                  <View
                    style={{
                      width: 82,
                      height: 82,
                      overflow: "hidden",
                      borderWidth: 4,
                      borderColor: SURFACE,
                      borderRadius: 25,
                      backgroundColor: "#222328",
                    }}
                  >
                    {renderImage(profileImage)}
                  </View>

                  <View style={{ flex: 1, marginLeft: 13, paddingBottom: 4 }}>
                    <Text
                      style={{
                        marginBottom: 7,
                        color: "#777A84",
                        fontSize: 9,
                        fontWeight: "800",
                        letterSpacing: 1.7,
                      }}
                    >
                      TALENT
                    </Text>

                    <View
                      style={{
                        alignSelf: "flex-start",
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderWidth: 1,
                        borderColor: "#4A4129",
                        borderRadius: 22,
                        backgroundColor: "#211E16",
                      }}
                    >
                      <Text
                        style={{
                          color: "#E4C875",
                          fontSize: scale(11),
                          fontWeight: "800",
                        }}
                      >
                        {form.talentType || "Talent type"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ marginTop: 25 }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: "#A7A8B0",
                      fontSize: 10,
                      fontWeight: "800",
                      letterSpacing: 1.8,
                    }}
                  >
                    ABOUT
                  </Text>

                  <Text
                    style={{
                      color: "#E0E0E5",
                      fontSize: scale(13),
                      lineHeight: scale(22),
                    }}
                  >
                    {form.biography.trim() ||
                      "Your biography will appear here. Introduce yourself and give visitors a sense of your arena."}
                  </Text>
                </View>

                <View
                  style={{
                    height: 1,
                    marginVertical: 20,
                    backgroundColor: BORDER,
                  }}
                />

                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Ionicons
                      name="sparkles-outline"
                      size={17}
                      color={GOLD}
                    />

                    <Text
                      style={{
                        marginLeft: 8,
                        color: "#A7A8B0",
                        fontSize: 10,
                        fontWeight: "800",
                        letterSpacing: 1.8,
                      }}
                    >
                      THE EXPERIENCE
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: "#B7B8C0",
                      fontSize: scale(12),
                      lineHeight: scale(21),
                    }}
                  >
                    {form.description.trim() ||
                      "Your arena description will appear here. Describe what makes your arena worth discovering."}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 24,
                    paddingTop: 14,
                    borderTopWidth: 1,
                    borderTopColor: BORDER,
                  }}
                >
                  <Ionicons
                    name="eye-outline"
                    size={16}
                    color="#858791"
                  />

                  <Text
                    style={{
                      marginLeft: 8,
                      color: "#858791",
                      fontSize: scale(10),
                    }}
                  >
                    Live preview · Updates as you edit
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Validation and submission errors */}
          {message ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 8,
                padding: 14,
                borderWidth: 1,
                borderColor: "rgba(248,113,113,0.25)",
                borderRadius: 15,
                backgroundColor: "rgba(239,68,68,0.08)",
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color="#F87171"
              />

              <Text
                style={{
                  flex: 1,
                  marginLeft: 10,
                  color: "#FCA5A5",
                  fontSize: scale(11),
                  lineHeight: scale(18),
                }}
              >
                {message}
              </Text>

              <TouchableOpacity onPress={() => setMessage("")}>
                <Ionicons
                  name="close"
                  size={18}
                  color="#F87171"
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>

        {/* Fixed bottom action */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 14,
            paddingBottom: Math.max(insets.bottom, 14),
            borderTopWidth: 1,
            borderTopColor: "#24252A",
            backgroundColor: BACKGROUND,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting || isPickingImage}
            activeOpacity={0.85}
            style={{
              overflow: "hidden",
              borderRadius: 15,
              opacity: isSubmitting || isPickingImage ? 0.75 : 1,
            }}
          >
            <LinearGradient
              colors={["#E7CC7A", GOLD, "#BD9640"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                minHeight: 56,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#17140C" />
              ) : (
                <Ionicons
                  name="rocket-outline"
                  size={20}
                  color="#17140C"
                />
              )}

              <Text
                style={{
                  marginLeft: 10,
                  color: "#17140C",
                  fontSize: scale(12),
                  fontWeight: "900",
                  letterSpacing: 1.1,
                }}
              >
                {isSubmitting ? "Starting Arena..." : "Launch Arena"}
              </Text>

              {!isSubmitting ? (
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#17140C"
                  style={{ marginLeft: 10 }}
                />
              ) : null}
            </LinearGradient>
          </TouchableOpacity>

          <Text
            style={{
              marginTop: 11,
              color: "#696B74",
              textAlign: "center",
              fontSize: 9,
              letterSpacing: 1.1,
            }}
          >
            YOUR ARENA. YOUR IDENTITY.
          </Text>
        </View>

        <TalentPickerModal
          visible={talentPickerVisible}
          onClose={() => setTalentPickerVisible(false)}
          selectedTalent={form.talentType}
          onSelectTalent={handleSelectTalent}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
