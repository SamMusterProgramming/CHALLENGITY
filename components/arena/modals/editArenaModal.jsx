import React, {
    useEffect,
    useState,
  } from "react";
  
  import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
  } from "react-native";
  
  import Modal from "react-native-modal";
  
  import * as ImagePicker from "expo-image-picker";
  
  import {
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  
  import {
    useSafeAreaInsets,
  } from "react-native-safe-area-context";
import { compressImage } from "../../../utilities/fileCompressor";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { getUploadImageUrl, getUploadVideoUrl, uploadImageToBlackBlaze, uploadVideoToBackblaze } from "../../../uploadFileToBlackBlaze";
import { useLoading } from "../../../context/loadingContext";
  
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
    const [profileImg, setProfileImg] = useState(null)
    const [coverImg, setCoverImg] = useState(null)
    const {user} = useGlobalContext()
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
        profileImage:
          arena.profileImage || null,
        coverImage:
          arena.coverImage || null,
      });
    }, [arena , isVisible]);
  
    const pickProfileImage =
      async () => {
        try {
          const result =
            await ImagePicker.launchImageLibraryAsync(
              {
                mediaTypes:
                  ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
                aspect: [1, 1],
              }
            );
  
          if (
            !result.canceled &&
            result.assets?.length
          ) {
            const compressedImg = await compressImage(result.assets[0].uri)
            setProfileImg(compressedImg)
          }
        } catch (error) {
          console.log(error);
        }
      };
  
    const pickCoverImage =
      async () => {
        try {
          const result =
            await ImagePicker.launchImageLibraryAsync(
              {
                mediaTypes:
                  ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
                aspect: [16, 9],
              }
            );
  
          if (
            !result.canceled &&
            result.assets?.length
          ) {
            const compressedImg = await compressImage(result.assets[0].uri)
            setCoverImg(compressedImg)
          }
        } catch (error) {
          console.log(error);
        }
      };
   
    const hasChanges = (coverImg !== null || profileImg !== null || 
                      arena.biography.trim() !== form.biography.trim() || arena.description.trim() !== form.description.trim()) &&
                      (form.biography.trim().length > 7) && (form.description.trim().length > 10)

    const handleSave = async() => {
       showLoading("updating ...")
       const profileImgRes = profileImg ? await getUploadImageUrl(user._id , user.email , "profile" ) : null
       const coverImgRes = coverImg ? await getUploadImageUrl(user._id , user.email , "cover" ) : null
       const uploadedProfileImg = profileImg ? await  uploadImageToBlackBlaze(profileImgRes, profileImg ) : null
       const uploadedCoverImg = coverImg ? await  uploadImageToBlackBlaze(coverImgRes, coverImg ) : null
       const body = {
         profileImage :{
            fileId : uploadedProfileImg?.fileId,
            fileName : uploadedProfileImg?.fileName
         },
         coverImage :{
            fileId : uploadedCoverImg?.fileId,
            fileName : uploadedCoverImg?.fileName
         },
         description : form.description ,
         biography : form.biography,
       }
      setIsVisible(false)
      onSave?.(body);
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
            backgroundColor: "#000",
            paddingTop: insets.top,
            paddingBottom : insets.bottom
          }}
        >
          {/* HEADER */}
  
          <View
            style={{
              height: 60,
              paddingHorizontal: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                setIsVisible(false)
              }
            >
              <MaterialCommunityIcons
                name="close"
                size={30}
                color="#999"
              />
            </TouchableOpacity>
  
            <Text
              style={{
                color: "#FFF",
                fontSize: width / 22,
                fontWeight: "800",
              }}
            >
              Edit Arena
            </Text>
  
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color="#eab308"
            />
          </View>
  
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingBottom: 20,
            //   flex:1
            }}
          >
            {/* COVER */}
  
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 18,
                overflow: "hidden",
                height: height * 0.22,
                borderWidth: 1,
                borderColor:
                  "rgba(234,179,8,0.25)",
              }}
            >
              <Image
                source={{
                  uri: coverImg || arena.coverImage.publicUrl
                }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
  
              <TouchableOpacity
                onPress={
                  pickCoverImage
                }
                style={{
                  position: "absolute",
                  right: 14,
                  top: 14,
                  width: 42,
                  height: 42,
                  borderRadius: 999,
                  backgroundColor:
                    "rgba(0,0,0,0.75)",
                  justifyContent:
                    "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={20}
                  color="#eab308"
                />
              </TouchableOpacity>
            </View>
  
            {/* PROFILE */}
  
            <View
              style={{
                alignItems: "center",
                marginTop: -45,
              }}
            >
              <View>
                <Image
                  source={{
                    uri: profileImg || arena.profileImage.publicUrl
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 999,
                    borderWidth: 4,
                    borderColor: "#000",
                  }}
                />
  
                <TouchableOpacity
                  onPress={
                    pickProfileImage
                  }
                  style={{
                    position: "absolute",
                    right: -2,
                    bottom: -2,
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    backgroundColor:
                      "#eab308",
                    justifyContent:
                      "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={16}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
  
              <Text
                style={{
                  color: "#FFF",
                  fontSize:
                    width / 20,
                  fontWeight: "800",
                  marginTop: 12,
                }}
              >
                {arena?.arenaName}
              </Text>
  
              <Text
                style={{
                  color: "#999",
                  marginTop: 4,
                }}
              >
                {arena?.talentType} •{" "}
                {arena?.region}
              </Text>
            </View>
  
            {/* BIO */}
  
            <View
              style={{
                marginTop: 30,
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent:
                    "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "#eab308",
                    fontWeight: "700",
                    fontSize:width/30
                  }}
                >
                  BIOGRAPHY
                </Text>
  
                <Text
                  style={{
                    color: "#888",
                  }}
                >
                  {
                    form.biography
                      .length
                  }
                  /70
                </Text>
              </View>
  
              <TextInput
                multiline
                maxLength={70}
                value={
                  form.biography
                }
                onChangeText={(
                  text
                ) =>
                  setForm({
                    ...form,
                    biography:
                      text,
                  })
                }
                placeholder="Tell people who you are..."
                placeholderTextColor="#666"
                style={{
                  height: height/14,
                  borderRadius: 12,
                  backgroundColor: "#0A0A0A",
                  borderWidth: 1,
                  borderColor:  "rgba(234,179,8,0.15)",
                  padding: 14,
                  color: "#FFF",
                  textAlignVertical: "top",
                }}
              />
            </View>
  
            {/* DESCRIPTION */}
  
            <View
              style={{
                marginTop: 24,
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent:
                    "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "#eab308",
                    fontWeight: "700",
                    fontSize:width/30
                  }}
                >
                  DESCRIPTION
                </Text>
  
                <Text
                  style={{
                    color: "#888",
                  }}
                >
                  {
                    form.description
                      .length
                  }
                  /150
                </Text>
              </View>
  
              <TextInput
                multiline
                maxLength={150}
                value={
                  form.description
                }
                onChangeText={(
                  text
                ) =>
                  setForm({
                    ...form,
                    description:
                      text,
                  })
                }
                placeholder="Describe what visitors can expect..."
                placeholderTextColor="#666"
                style={{
                  height: height/10,
                  borderRadius: 12,
                  backgroundColor: "#0A0A0A",
                  borderWidth: 1,
                  borderColor:"rgba(234,179,8,0.15)",
                  padding: 14,
                  color: "#FFF",
                  textAlignVertical: "top",
                }}
              />
            </View>
  
            {/* PREVIEW */}
  
            <View
              style={{
                marginTop: 30,
                marginHorizontal: 12,
                borderRadius: 16,
                padding: 16,
                backgroundColor:
                  "rgba(255,255,255,0.03)",
                borderWidth: 1,
                borderColor:
                  "rgba(234,179,8,0.18)",
              }}
            >
              <Text
                style={{
                  color: "#eab308",
                  fontWeight: "700",
                  marginBottom: 14,
                  letterSpacing: 1,
                }}
              >
                LIVE PREVIEW
              </Text>
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems:
                    "center",
                }}
              >
                <Image
                  source={{
                    uri:
                      form.profileImage
                        ?.uri ||
                      form.profileImage
                        ?.publicUrl ||
                      "https://placehold.co/200x200/111111/eab308",
                  }}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 999,
                  }}
                />
  
                <View
                  style={{
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontWeight:
                        "700",
                    }}
                  >
                    {
                      arena?.arenaName
                    }
                  </Text>
  
                  <Text
                    style={{
                      color:
                        "#888",
                    }}
                  >
                    {
                      arena?.talentType
                    }{" "}
                    •{" "}
                    {
                      arena?.region
                    }
                  </Text>
                </View>
              </View>
  
              {!!form.biography && (
                <Text
                  style={{
                    color: "#DDD",
                    marginTop: 14,
                  }}
                >
                  {
                    form.biography
                  }
                </Text>
              )}
  
              {!!form.description && (
                <Text
                  style={{
                    color: "#999",
                    marginTop: 10,
                  }}
                >
                  {
                    form.description
                  }
                </Text>
              )}
            </View>
          </ScrollView>
  
          {/* SAVE BUTTON */}
  
          <View
            style={{
            //   position: "absolute",
            //   left: 0,
            //   right: 0,
            //   bottom:
            //     insets.bottom +
            //     12,
              padding: 12,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              disabled = {!hasChanges}
              onPress={
                handleSave
              }
              style={{
                height: height/17,
                borderRadius: 8,
                // borderWidth :0.5,
                // borderColor : "#eab308",
                backgroundColor: hasChanges ? "#eab308" : "#a5861e",
                justifyContent:"center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: hasChanges ?"#000" : "black",
                  fontWeight: "800",
                  fontSize: 16,
                  letterSpacing: 1,
                }}
                // className = "bg-[#a5861e]"
              >
                {isLoading
                  ? "SAVING..."
                  : "SAVE CHANGES"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  export default EditArenaModal;