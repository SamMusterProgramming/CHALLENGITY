// import React, {
//     useEffect,
//     useState,
//   } from "react";
  
//   import {
//     View,
//     Text,
//     TouchableOpacity,
//     TextInput,
//     ScrollView,
//     Image,
//   } from "react-native";
  
//   import Modal from "react-native-modal";
  
//   import * as ImagePicker from "expo-image-picker";
  
//   import {
//     MaterialCommunityIcons,
//   } from "@expo/vector-icons";
  
//   import {
//     useSafeAreaInsets,
//   } from "react-native-safe-area-context";
// import { compressImage } from "../../../utilities/fileCompressor";
// import { useGlobalContext } from "../../../context/GlobalProvider";
// import { getUploadImageUrl, getUploadVideoUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from "../../../uploadFileToBlackBlaze";
// import { useLoading } from "../../../context/loadingContext";
  
//   const EditArenaModal = ({
//     isVisible,
//     setIsVisible,
//     arena,
//     width,
//     height,
//     onSave,
//     isLoading = false,
//   }) => {
//     const { showLoading, hideLoading } = useLoading();
//     const insets = useSafeAreaInsets();
//     const [profileImg, setProfileImg] = useState(null)
//     const [coverImg, setCoverImg] = useState(null)
//     const {user} = useGlobalContext()
//     const [form, setForm] = useState({
//       biography: "",
//       description: "",
//       profileImage: null,
//       coverImage: null,
//     });

//     useEffect(() => {
//       if (!arena) return;
//       setForm({
//         biography: arena.biography || "",
//         description: arena.description || "",
//         profileImage:
//           arena.profileImage || null,
//         coverImage:
//           arena.coverImage || null,
//       });
//     }, [arena , isVisible]);
  
//     const pickProfileImage =
//       async () => {
//         try {
//           const result =
//             await ImagePicker.launchImageLibraryAsync(
//               {
//                 mediaTypes: ["images"],
//                 allowsEditing: true,
//                 quality: 0.8,
//                 aspect: [1, 1],
//               }
//             );
  
//           if (
//             !result.canceled &&
//             result.assets?.length
//           ) {
//             const compressedImg = await compressImage(result.assets[0].uri)
//             setProfileImg(compressedImg)
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };
  
//     const pickCoverImage =
//       async () => {
//         try {
//           const result =
//             await ImagePicker.launchImageLibraryAsync(
//               {
//                 mediaTypes: ["images"],
//                 allowsEditing: true,
//                 quality: 0.8,
//                 aspect: [16, 9],
//               }
//             );
  
//           if (
//             !result.canceled &&
//             result.assets?.length
//           ) {
//             const compressedImg = await compressImage(result.assets[0].uri)
//             setCoverImg(compressedImg)
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };
   
//     const hasChanges = (coverImg !== null || profileImg !== null || 
//                       arena.biography.trim() !== form.biography.trim() || arena.description.trim() !== form.description.trim()) &&
//                       (form.biography.trim().length > 7) && (form.description.trim().length > 10)

//     const handleSave = async() => {
//        showLoading("updating ...")
//        const profileImgRes = profileImg ? await getUploadImageUrl(user._id , user.email , "profile" ) : null
//        const coverImgRes = coverImg ? await getUploadImageUrl(user._id , user.email , "cover" ) : null
//        const uploadedProfileImg = profileImg ? await  uploadImageToBlackBlaze(profileImgRes, profileImg ) : null
//        const uploadedCoverImg = coverImg ? await  uploadImageToBlackBlaze(coverImgRes, coverImg ) : null
//        const body = {
//          profileImage :{
//             fileId : uploadedProfileImg?.fileId,
//             fileName : uploadedProfileImg?.fileName
//          },
//          coverImage :{
//             fileId : uploadedCoverImg?.fileId,
//             fileName : uploadedCoverImg?.fileName
//          },
//          description : form.description ,
//          biography : form.biography,
//        }
//       setIsVisible(false)
//       onSave?.(body);
//     };
  
//     return (
//       <Modal
//         isVisible={isVisible}
//         style={{ margin: 0 }}
//         backdropOpacity={1}
//         animationIn="fadeInUp"
//         animationOut="fadeOutDown"
//         useNativeDriver
//         hideModalContentWhileAnimating
//       >
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "#000",
//             paddingTop: insets.top,
//             paddingBottom : insets.bottom
//           }}
//         >
//           {/* HEADER */}
  
//           <View
//             style={{
//               height: 60,
//               paddingHorizontal: 18,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent:
//                 "space-between",
//             }}
//           >
//             <TouchableOpacity
//               onPress={() =>
//                 setIsVisible(false)
//               }
//             >
//               <MaterialCommunityIcons
//                 name="close"
//                 size={30}
//                 color="#999"
//               />
//             </TouchableOpacity>
  
//             <Text
//               style={{
//                 color: "#FFF",
//                 fontSize: width / 22,
//                 fontWeight: "800",
//               }}
//             >
//               Edit Arena
//             </Text>
  
//             <MaterialCommunityIcons
//               name="pencil"
//               size={24}
//               color="#eab308"
//             />
//           </View>
  
//           <ScrollView
//             showsVerticalScrollIndicator={
//               false
//             }
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={{
//               paddingBottom: 20,
//             //   flex:1
//             }}
//           >
//             {/* COVER */}
  
//             <View
//               style={{
//                 marginHorizontal: 10,
//                 marginTop: 10,
//                 borderRadius: 18,
//                 overflow: "hidden",
//                 height: height * 0.22,
//                 borderWidth: 1,
//                 borderColor:
//                   "rgba(234,179,8,0.25)",
//               }}
//             >
//               <Image
//                 source={{
//                   uri: coverImg || arena.coverImage.publicUrl
//                 }}
//                 resizeMode="cover"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
  
//               <TouchableOpacity
//                 onPress={
//                   pickCoverImage
//                 }
//                 style={{
//                   position: "absolute",
//                   right: 14,
//                   top: 14,
//                   width: 42,
//                   height: 42,
//                   borderRadius: 999,
//                   backgroundColor:
//                     "rgba(0,0,0,0.75)",
//                   justifyContent:
//                     "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="camera"
//                   size={20}
//                   color="#eab308"
//                 />
//               </TouchableOpacity>
//             </View>
  
//             {/* PROFILE */}
  
//             <View
//               style={{
//                 alignItems: "center",
//                 marginTop: -45,
//               }}
//             >
//               <View>
//                 <Image
//                   source={{
//                     uri: profileImg || arena.profileImage.publicUrl
//                   }}
//                   style={{
//                     width: 90,
//                     height: 90,
//                     borderRadius: 999,
//                     borderWidth: 4,
//                     borderColor: "#000",
//                   }}
//                 />
  
//                 <TouchableOpacity
//                   onPress={
//                     pickProfileImage
//                   }
//                   style={{
//                     position: "absolute",
//                     right: -2,
//                     bottom: -2,
//                     width: 34,
//                     height: 34,
//                     borderRadius: 999,
//                     backgroundColor:
//                       "#eab308",
//                     justifyContent:
//                       "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <MaterialCommunityIcons
//                     name="pencil"
//                     size={16}
//                     color="#000"
//                   />
//                 </TouchableOpacity>
//               </View>
  
//               <Text
//                 style={{
//                   color: "#FFF",
//                   fontSize:
//                     width / 20,
//                   fontWeight: "800",
//                   marginTop: 12,
//                 }}
//               >
//                 {arena?.arenaName}
//               </Text>
  
//               <Text
//                 style={{
//                   color: "#999",
//                   marginTop: 4,
//                 }}
//               >
//                 {arena?.talentType} •{" "}
//                 {arena?.region}
//               </Text>
//             </View>
  
//             {/* BIO */}
  
//             <View
//               style={{
//                 marginTop: 30,
//                 paddingHorizontal: 12,
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent:
//                     "space-between",
//                   marginBottom: 10,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#eab308",
//                     fontWeight: "700",
//                     fontSize:width/30
//                   }}
//                 >
//                   BIOGRAPHY
//                 </Text>
  
//                 <Text
//                   style={{
//                     color: "#888",
//                   }}
//                 >
//                   {
//                     form.biography
//                       .length
//                   }
//                   /70
//                 </Text>
//               </View>
  
//               <TextInput
//                 multiline
//                 maxLength={70}
//                 value={
//                   form.biography
//                 }
//                 onChangeText={(
//                   text
//                 ) =>
//                   setForm({
//                     ...form,
//                     biography:
//                       text,
//                   })
//                 }
//                 placeholder="Tell people who you are..."
//                 placeholderTextColor="#666"
//                 style={{
//                   height: height/14,
//                   borderRadius: 12,
//                   backgroundColor: "#0A0A0A",
//                   borderWidth: 1,
//                   borderColor:  "rgba(234,179,8,0.15)",
//                   padding: 14,
//                   color: "#FFF",
//                   textAlignVertical: "top",
//                 }}
//               />
//             </View>
  
//             {/* DESCRIPTION */}
  
//             <View
//               style={{
//                 marginTop: 24,
//                 paddingHorizontal: 12,
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent:
//                     "space-between",
//                   marginBottom: 10,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#eab308",
//                     fontWeight: "700",
//                     fontSize:width/30
//                   }}
//                 >
//                   DESCRIPTION
//                 </Text>
  
//                 <Text
//                   style={{
//                     color: "#888",
//                   }}
//                 >
//                   {
//                     form.description
//                       .length
//                   }
//                   /150
//                 </Text>
//               </View>
  
//               <TextInput
//                 multiline
//                 maxLength={150}
//                 value={
//                   form.description
//                 }
//                 onChangeText={(
//                   text
//                 ) =>
//                   setForm({
//                     ...form,
//                     description:
//                       text,
//                   })
//                 }
//                 placeholder="Describe what visitors can expect..."
//                 placeholderTextColor="#666"
//                 style={{
//                   height: height/10,
//                   borderRadius: 12,
//                   backgroundColor: "#0A0A0A",
//                   borderWidth: 1,
//                   borderColor:"rgba(234,179,8,0.15)",
//                   padding: 14,
//                   color: "#FFF",
//                   textAlignVertical: "top",
//                 }}
//               />
//             </View>
  
//             {/* PREVIEW */}
  
//             <View
//               style={{
//                 marginTop: 30,
//                 marginHorizontal: 12,
//                 borderRadius: 16,
//                 padding: 16,
//                 backgroundColor:
//                   "rgba(255,255,255,0.03)",
//                 borderWidth: 1,
//                 borderColor:
//                   "rgba(234,179,8,0.18)",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#eab308",
//                   fontWeight: "700",
//                   marginBottom: 14,
//                   letterSpacing: 1,
//                 }}
//               >
//                 LIVE PREVIEW
//               </Text>
  
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems:
//                     "center",
//                 }}
//               >
//                 <Image
//                   source={{
//                     uri:
//                       form.profileImage
//                         ?.uri ||
//                       form.profileImage
//                         ?.publicUrl ||
//                       "https://placehold.co/200x200/111111/eab308",
//                   }}
//                   style={{
//                     width: 46,
//                     height: 46,
//                     borderRadius: 999,
//                   }}
//                 />
  
//                 <View
//                   style={{
//                     marginLeft: 12,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "#FFF",
//                       fontWeight:
//                         "700",
//                     }}
//                   >
//                     {
//                       arena?.arenaName
//                     }
//                   </Text>
  
//                   <Text
//                     style={{
//                       color:
//                         "#888",
//                     }}
//                   >
//                     {
//                       arena?.talentType
//                     }{" "}
//                     •{" "}
//                     {
//                       arena?.region
//                     }
//                   </Text>
//                 </View>
//               </View>
  
//               {!!form.biography && (
//                 <Text
//                   style={{
//                     color: "#DDD",
//                     marginTop: 14,
//                   }}
//                 >
//                   {
//                     form.biography
//                   }
//                 </Text>
//               )}
  
//               {!!form.description && (
//                 <Text
//                   style={{
//                     color: "#999",
//                     marginTop: 10,
//                   }}
//                 >
//                   {
//                     form.description
//                   }
//                 </Text>
//               )}
//             </View>
//           </ScrollView>
  
//           {/* SAVE BUTTON */}
  
//           <View
//             style={{
//             //   position: "absolute",
//             //   left: 0,
//             //   right: 0,
//             //   bottom:
//             //     insets.bottom +
//             //     12,
//               padding: 12,
//             }}
//           >
//             <TouchableOpacity
//               activeOpacity={0.9}
//               disabled = {!hasChanges}
//               onPress={
//                 handleSave
//               }
//               style={{
//                 height: height/17,
//                 borderRadius: 8,
//                 // borderWidth :0.5,
//                 // borderColor : "#eab308",
//                 backgroundColor: hasChanges ? "#eab308" : "#a5861e",
//                 justifyContent:"center",
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   color: hasChanges ?"#000" : "black",
//                   fontWeight: "800",
//                   fontSize: 16,
//                   letterSpacing: 1,
//                 }}
//                 // className = "bg-[#a5861e]"
//               >
//                 {isLoading
//                   ? "SAVING..."
//                   : "SAVE CHANGES"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   };
  
//   export default EditArenaModal;



import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { compressImage } from "../../../utilities/fileCompressor";
import { useGlobalContext } from "../../../context/GlobalProvider";
import {
  getUploadImageUrl,
  getUploadVideoUrl,
  uploadImageToBlackBlaze,
  uploadVideoToBackblaze,
} from "../../../uploadFileToBlackBlaze";
import { useLoading } from "../../../context/loadingContext";

const GOLD = "#E9BB45";
const BG = "#090A0C";
const SURFACE = "#111316";
const SURFACE_LIGHT = "#17191D";
const BORDER = "rgba(255,255,255,0.075)";
const MUTED = "#858891";
const WHITE = "#F6F6F4";

const EditArenaModal = ({
  isVisible,
  setIsVisible,
  arena,
  width,
  height,
  onSave,
  isLoading = false,
}) => {
  const { showLoading, hideLoading } = useLoading();
  const insets = useSafeAreaInsets();
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    biography: "",
    description: "",
    profileImage: null,
    coverImage: null,
  });

  useEffect(() => {
    if (!arena) return;

    setForm({
      biography: arena.biography || "",
      description: arena.description || "",
      profileImage: arena.profileImage || null,
      coverImage: arena.coverImage || null,
    });

    setProfileImg(null);
    setCoverImg(null);
  }, [arena, isVisible]);

  const pickProfileImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets?.length) {
        const compressedImg = await compressImage(result.assets[0].uri);
        setProfileImg(compressedImg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickCoverImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
        aspect: [16, 9],
      });

      if (!result.canceled && result.assets?.length) {
        const compressedImg = await compressImage(result.assets[0].uri);
        setCoverImg(compressedImg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasChanges =
    (
      coverImg !== null ||
      profileImg !== null ||
      (arena?.biography || "").trim() !== form.biography.trim() ||
      (arena?.description || "").trim() !== form.description.trim()
    ) &&
    form.biography.trim().length > 7 &&
    form.description.trim().length > 10;

  const handleSave = async () => {
    if (!hasChanges || isLoading) return;

    try {
      showLoading("Updating arena...");
      const profileImgRes = profileImg
        ? await getUploadImageUrl(user._id, user.email, "profile")
        : null;
      const coverImgRes = coverImg
        ? await getUploadImageUrl(user._id, user.email, "cover")
        : null;
      const uploadedProfileImg = profileImg
        ? await uploadImageToBlackBlaze(profileImgRes, profileImg)
        : null;
      const uploadedCoverImg = coverImg
        ? await uploadImageToBlackBlaze(coverImgRes, coverImg)
        : null;

      const body = {
        profileImage: {
          fileId: uploadedProfileImg?.fileId,
          fileName: uploadedProfileImg?.fileName,
        },
        coverImage: {
          fileId: uploadedCoverImg?.fileId,
          fileName: uploadedCoverImg?.fileName,
        },
        description: form.description,
        biography: form.biography,
        profileImageToDelete : arena.profileImage ,
        coverImageToDelete : arena.coverImage , 
      };

      setIsVisible(false);
      await onSave?.(body);
    } catch (error) {
      console.log("Failed to update arena:", error);
    } finally {
      hideLoading();
    }
  };

  const profileImageUri =
    profileImg ||
    arena?.profileImage?.publicUrl ||
    arena?.profileImage?.uri;

  const coverImageUri =
    coverImg ||
    arena?.coverImage?.publicUrl ||
    arena?.coverImage?.uri;

  const closeModal = () => {
    setIsVisible(false);
  };

  const SectionHeading = ({ number, title, subtitle }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 17,
      }}
    >
      <View
        style={{
          width: 31,
          height: 31,
          borderRadius: 10,
          backgroundColor: "rgba(233,187,69,0.10)",
          borderWidth: 1,
          borderColor: "rgba(233,187,69,0.17)",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Text
          style={{
            color: GOLD,
            fontSize: 11,
            fontWeight: "800",
            letterSpacing: 0.5,
          }}
        >
          {number}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: WHITE,
            fontSize: 15,
            fontWeight: "800",
            letterSpacing: -0.2,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: MUTED,
            fontSize: 12,
            marginTop: 4,
            lineHeight: 17,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      backdropOpacity={1}
      backdropColor={BG}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={220}
      useNativeDriver
      hideModalContentWhileAnimating
      statusBarTranslucent
      onBackButtonPress={closeModal}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: BG,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* TOP NAVIGATION */}
        <View
          style={{
            height: 62,
            paddingHorizontal: 21,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: BORDER,
          }}
        >
          <TouchableOpacity
            onPress={closeModal}
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              backgroundColor: SURFACE,
              borderWidth: 1,
              borderColor: BORDER,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={21}
              color={WHITE}
            />
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: WHITE,
                fontSize: 13,
                fontWeight: "900",
                letterSpacing: 1.7,
              }}
            >
              ARENA STUDIO
            </Text>
            <Text
              style={{
                color: MUTED,
                fontSize: 10,
                marginTop: 3,
                letterSpacing: 0.6,
              }}
            >
              PROFILE SETTINGS
            </Text>
          </View>

          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              backgroundColor: "rgba(233,187,69,0.10)",
              borderWidth: 1,
              borderColor: "rgba(233,187,69,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={19}
              color={GOLD}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 25,
            paddingBottom: 35,
          }}
        >
          {/* INTRODUCTION */}
          <View style={{ marginBottom: 27 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 11,
              }}
            >
              <View
                style={{
                  width: 21,
                  height: 2,
                  backgroundColor: GOLD,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: GOLD,
                  fontSize: 10,
                  fontWeight: "900",
                  letterSpacing: 2,
                }}
              >
                YOUR SPACE. YOUR IDENTITY.
              </Text>
            </View>

            <Text
              style={{
                color: WHITE,
                fontSize: Math.min(width / 10, 35),
                fontWeight: "900",
                letterSpacing: -1.2,
                lineHeight: Math.min(width / 8.5, 41),
              }}
            >
              Make your{"\n"}
              <Text style={{ color: GOLD }}>arena yours.</Text>
            </Text>

            <Text
              style={{
                color: MUTED,
                fontSize: 13,
                lineHeight: 21,
                marginTop: 12,
                maxWidth: 300,
              }}
            >
              Shape how people discover you. Update your visual identity and
              tell your story in your own words.
            </Text>
          </View>

          {/* SECTION 01 — ARENA IDENTITY */}
          <View
            style={{
              backgroundColor: SURFACE,
              borderRadius: 22,
              padding: 17,
              borderWidth: 1,
              borderColor: BORDER,
              marginBottom: 24,
            }}
          >
            <SectionHeading
              number="01"
              title="Arena identity"
              subtitle="The details people see first."
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: SURFACE_LIGHT,
                borderRadius: 17,
                padding: 13,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.045)",
              }}
            >
              {/* PROFILE IMAGE */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickProfileImage}
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 23,
                  backgroundColor: "#24262B",
                  borderWidth: 1,
                  borderColor: "rgba(233,187,69,0.45)",
                  padding: 3,
                }}
              >
                {profileImageUri ? (
                  <Image
                    source={{ uri: profileImageUri }}
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 19,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account-circle-outline"
                      size={35}
                      color={GOLD}
                    />
                  </View>
                )}

                <View
                  style={{
                    position: "absolute",
                    right: -5,
                    bottom: -5,
                    width: 27,
                    height: 27,
                    borderRadius: 10,
                    backgroundColor: GOLD,
                    borderWidth: 3,
                    borderColor: SURFACE_LIGHT,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera"
                    size={13}
                    color="#111111"
                  />
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text
                  style={{
                    color: MUTED,
                    fontSize: 9,
                    fontWeight: "800",
                    letterSpacing: 1.3,
                    marginBottom: 6,
                  }}
                >
                  YOUR ARENA
                </Text>

                <Text
                  numberOfLines={2}
                  style={{
                    color: WHITE,
                    fontSize: 17,
                    fontWeight: "900",
                    letterSpacing: -0.4,
                  }}
                >
                  {arena?.arenaName || "Your Arena"}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    color: MUTED,
                    fontSize: 11,
                    marginTop: 6,
                  }}
                >
                  {[arena?.talentType, arena?.region]
                    .filter(Boolean)
                    .join("  ·  ") || "Arena profile"}
                </Text>
              </View>

              <MaterialCommunityIcons
                name="check-decagram"
                size={20}
                color={GOLD}
                style={{ marginLeft: 8 }}
              />
            </View>

            <TouchableOpacity
              onPress={pickProfileImage}
              activeOpacity={0.75}
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: BORDER,
              }}
            >
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={16}
                color={GOLD}
              />
              <Text
                style={{
                  color: WHITE,
                  fontSize: 12,
                  fontWeight: "700",
                  marginLeft: 8,
                }}
              >
                Change profile picture
              </Text>
            </TouchableOpacity>
          </View>

          {/* SECTION 02 — VISUALS */}
          <View style={{ marginBottom: 26 }}>
            <SectionHeading
              number="02"
              title="Visual direction"
              subtitle="Give your arena a distinctive look."
            />

            {/* COVER IMAGE EDITOR */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={pickCoverImage}
              style={{
                height: Math.min(height * 0.235, 210),
                minHeight: 150,
                borderRadius: 21,
                overflow: "hidden",
                backgroundColor: "#191B20",
                borderWidth: 1,
                borderColor: "rgba(233,187,69,0.22)",
              }}
            >
              {coverImageUri ? (
                <Image
                  source={{ uri: coverImageUri }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
              ) : null}

              {/* IMAGE OVERLAY */}
              <View
                style={{
                  ...({
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.38)",
                  }),
                }}
              />

              <View
                style={{
                  flex: 1,
                  padding: 17,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0,0,0,0.55)",
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 7,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 9,
                        fontWeight: "900",
                        letterSpacing: 1.5,
                      }}
                    >
                      COVER ART
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 39,
                      height: 39,
                      borderRadius: 13,
                      backgroundColor: GOLD,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="arrow-top-right"
                      size={21}
                      color="#101010"
                    />
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 21,
                      fontWeight: "900",
                      letterSpacing: -0.5,
                    }}
                  >
                    {coverImg ? "New cover selected" : "Set the atmosphere."}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    Tap anywhere to {coverImg ? "replace" : "upload"} your
                    cover image
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* IMAGE GUIDANCE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                paddingHorizontal: 3,
              }}
            >
              <MaterialCommunityIcons
                name="information-outline"
                size={15}
                color={GOLD}
              />
              <Text
                style={{
                  color: MUTED,
                  fontSize: 11,
                  marginLeft: 7,
                  flex: 1,
                  lineHeight: 17,
                }}
              >
                Use a clear, high-quality image that represents your arena.
              </Text>
            </View>
          </View>

          {/* SECTION 03 — BIOGRAPHY */}
          <View
            style={{
              backgroundColor: SURFACE,
              borderRadius: 22,
              padding: 17,
              borderWidth: 1,
              borderColor: BORDER,
              marginBottom: 18,
            }}
          >
            <SectionHeading
              number="03"
              title="Your introduction"
              subtitle="A short line that captures who you are."
            />

            <View
              style={{
                backgroundColor: BG,
                borderRadius: 15,
                padding: 14,
                borderWidth: 1,
                borderColor:
                  form.biography.length > 70
                    ? "#D65B5B"
                    : "rgba(233,187,69,0.18)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="format-quote-open"
                  size={18}
                  color={GOLD}
                />
                <Text
                  style={{
                    color: "#D9D9D9",
                    fontSize: 10,
                    fontWeight: "800",
                    letterSpacing: 1.2,
                    marginLeft: 7,
                  }}
                >
                  BIOGRAPHY
                </Text>

                <View style={{ flex: 1 }} />

                <Text
                  style={{
                    color:
                      form.biography.length >= 70 ? GOLD : MUTED,
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {form.biography.length}/70
                </Text>
              </View>

              <TextInput
                multiline
                maxLength={70}
                value={form.biography}
                onChangeText={(text) =>
                  setForm({ ...form, biography: text })
                }
                placeholder="What should people know about you?"
                placeholderTextColor="#555860"
                selectionColor={GOLD}
                textAlignVertical="top"
                style={{
                  minHeight: 74,
                  color: WHITE,
                  fontSize: 15,
                  lineHeight: 23,
                  padding: 0,
                }}
              />

              <View
                style={{
                  height: 1,
                  backgroundColor: BORDER,
                  marginTop: 11,
                  marginBottom: 10,
                }}
              />

              <Text
                style={{
                  color: MUTED,
                  fontSize: 10,
                  lineHeight: 16,
                }}
              >
                Keep it personal, memorable, and unmistakably you.
              </Text>
            </View>
          </View>

          {/* SECTION 04 — DESCRIPTION */}
          <View
            style={{
              backgroundColor: SURFACE,
              borderRadius: 22,
              padding: 17,
              borderWidth: 1,
              borderColor: BORDER,
              marginBottom: 24,
            }}
          >
            <SectionHeading
              number="04"
              title="Tell your story"
              subtitle="Give visitors a reason to stay and explore."
            />

            <View
              style={{
                backgroundColor: BG,
                borderRadius: 15,
                padding: 14,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.075)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 11,
                }}
              >
                <Text
                  style={{
                    color: "#D9D9D9",
                    fontSize: 10,
                    fontWeight: "800",
                    letterSpacing: 1.2,
                  }}
                >
                  ABOUT THIS ARENA
                </Text>

                <View style={{ flex: 1 }} />

                <Text
                  style={{
                    color:
                      form.description.length >= 150 ? GOLD : MUTED,
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  {form.description.length}/150
                </Text>
              </View>

              <TextInput
                multiline
                maxLength={150}
                value={form.description}
                onChangeText={(text) =>
                  setForm({ ...form, description: text })
                }
                placeholder="Describe your craft, your passion, or what makes your arena different..."
                placeholderTextColor="#555860"
                selectionColor={GOLD}
                textAlignVertical="top"
                style={{
                  minHeight: 125,
                  color: WHITE,
                  fontSize: 14,
                  lineHeight: 23,
                  padding: 0,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 13,
                paddingHorizontal: 2,
              }}
            >
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={17}
                color={GOLD}
                style={{ marginTop: 1 }}
              />
              <Text
                style={{
                  color: MUTED,
                  fontSize: 11,
                  lineHeight: 17,
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                Focus on what makes your arena unique. Visitors should
                understand your world before they explore it.
              </Text>
            </View>
          </View>

          {/* COMPLETION NOTE */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 8,
            }}
          >
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={15}
              color={MUTED}
            />
            <Text
              style={{
                color: MUTED,
                fontSize: 10,
                marginLeft: 7,
                letterSpacing: 0.2,
              }}
            >
              Your changes will update your arena profile.
            </Text>
          </View>
        </ScrollView>

        {/* FIXED ACTION BAR */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 13,
            paddingBottom: 12,
            backgroundColor: BG,
            borderTopWidth: 1,
            borderTopColor: BORDER,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!hasChanges || isLoading}
            onPress={handleSave}
            style={{
              minHeight: 57,
              borderRadius: 17,
              backgroundColor:
                hasChanges && !isLoading ? GOLD : "#29271F",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor:
                hasChanges && !isLoading
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.04)",
            }}
          >
            <Text
              style={{
                color: hasChanges && !isLoading ? "#111111" : "#77736A",
                fontSize: 12,
                fontWeight: "900",
                letterSpacing: 1.1,
              }}
            >
              {isLoading ? "SAVING CHANGES..." : "SAVE ARENA CHANGES"}
            </Text>

            {!isLoading && (
              <MaterialCommunityIcons
                name="arrow-right"
                size={19}
                color={hasChanges ? "#111111" : "#77736A"}
                style={{ marginLeft: 10 }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={closeModal}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 12,
              paddingBottom: 2,
            }}
          >
            <Text
              style={{
                color: MUTED,
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              Cancel and return
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditArenaModal;