import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { useGlobalContext } from "../../../../../context/GlobalProvider";
import { enqueueCoverUpload, enqueueProfileUpload } from "../../../../../services/uploads";
import { compressImage } from "../../../../../utilities/fileCompressor";

// Replace these paths with the actual locations in your project.


const COLORS = {
    gold: "#E8B95A",
    goldMuted: "#A88743",
    background: "#08090B",
    surface: "#14130F",
    border: "#30281B",
    text: "#F4F0E7",
    secondary: "#8F8A81",
    muted: "#777168",
  };
  
  export default function Appearance() {
    const { user, scale, spacing } = useGlobalContext();
  
    // Pending local selections. These do not upload automatically.
    const [profileImg, setProfileImg] = useState(null);
    const [coverImg, setCoverImg] = useState(null);
    const [saving, setSaving] = useState(false);
  
    const hasChanges = Boolean(profileImg || coverImg);
  
    const profileImageUri =
      profileImg ||
      user?.profileImage?.cdnUrl ||
      user?.profileImage?.publicUrl ||
      user?.profile_img ||
      null;
  
    const coverImageUri =
      coverImg ||
      user?.coverImage?.cdnUrl ||
      user?.coverImage?.publicUrl ||
      user?.cover_img ||
      null;
  
    // --------------------------------------------------
    // IMAGE PICKER
    // --------------------------------------------------
  
    const pickImage = useCallback(async (setImage, aspect) => {
      if (saving) return;
  
      try {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
  
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please allow photo library access to select an image."
          );
          return;
        }
  
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect,
          quality: 1,
        });
  
        if (!result.canceled && result.assets?.[0]?.uri) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error("Image picker failed:", error);
  
        Alert.alert(
          "Unable to select image",
          "Please try again."
        );
      }
    }, [saving]);
  
    // --------------------------------------------------
    // CANCEL PENDING CHANGES
    // --------------------------------------------------
  
    const handleCancel = useCallback(() => {
      if (saving) return;
  
      setProfileImg(null);
      setCoverImg(null);
    }, [saving]);
  
    // --------------------------------------------------
    // CONFIRM AND QUEUE IMAGE UPLOADS
    // --------------------------------------------------
  
    const handleConfirm = useCallback(async () => {
      if (saving || !hasChanges) return;
  
      if (!user?._id || !user?.email) {
        Alert.alert(
          "Unable to save",
          "Your account information is unavailable."
        );
        return;
      }
  
      setSaving(true);
  
      try {
        const jobs = [];
  
        if (profileImg) {
          jobs.push({
            type: "profile",
            run: async () => {
              const compressedUri = await compressImage(profileImg);
              await enqueueProfileUpload({
                userId: user._id,
                userEmail: user.email,
                imageUri: compressedUri,
                deleteFileId: user.profileImage?.fileId || null,
                deleteFileName: user.profileImage?.fileName || null,
              });
            },
          });
        }
  
        if (coverImg) {
          jobs.push({
            type: "cover",
            run : async () => {
              const compressedUri = await compressImage(coverImg);
              await enqueueCoverUpload({
                userId: user._id,
                userEmail: user.email,
                imageUri: compressedUri,
                deleteFileId: user.coverImage?.fileId || null,
                deleteFileName: user.coverImage?.fileName || null,
              });
            },
          });
        }
  
        // Process each selected image independently.
        const results = await Promise.allSettled(
          jobs.map((job) => job.run())
        );
  
        const succeeded = [];
        const failed = [];
  
        results.forEach((result, index) => {
          const type = jobs[index].type;
  
          if (result.status === "fulfilled") {
            succeeded.push(type);
          } else {
            failed.push(type);
  
            console.error(
              `Failed to queue ${type} image:`,
              result.reason
            );
          }
        });
  
        // Clear only selections successfully added to their queues.
        if (succeeded.includes("profile")) {
          setProfileImg(null);
        }
  
        if (succeeded.includes("cover")) {
          setCoverImg(null);
        }
  
        if (failed.length > 0) {
          const failedNames = failed
            .map((type) =>
              type === "profile" ? "profile photo" : "cover image"
            )
            .join(" and ");
  
          Alert.alert(
            "Some changes weren't submitted",
            `We couldn't submit your ${failedNames}. Your remaining selections are preserved so you can retry.`
          );
        } else {
          Alert.alert(
            "Changes submitted",
            "Your selected images have been added to the upload queue."
          );
        }
      } catch (error) {
        console.error("Failed to submit image changes:", error);
  
        Alert.alert(
          "Unable to save",
          "Something went wrong while preparing your images."
        );
      } finally {
        setSaving(false);
      }
    }, [
      saving,
      hasChanges,
      user,
      profileImg,
      coverImg,
    ]);
  
    // --------------------------------------------------
    // REUSABLE TEXT STYLES
    // --------------------------------------------------
  
    const sectionLabelStyle = {
      color: COLORS.goldMuted,
      fontSize: scale(10),
      fontWeight: "700",
      letterSpacing: scale(1.3),
      marginBottom: spacing(16),
    };
  
    const descriptionStyle = {
      color: COLORS.secondary,
      fontSize: scale(10),
      lineHeight: scale(16),
    };
  
    const cardStyle = {
      padding: spacing(16),
      backgroundColor: COLORS.surface,
      borderWidth: scale(1),
      borderColor: COLORS.border,
      borderRadius: scale(18),
    };
  
    const actionButtonStyle = {
      minHeight: scale(40),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing(12),
      borderRadius: scale(10),
      borderWidth: scale(1),
      borderColor: COLORS.goldMuted,
    };
  
    // --------------------------------------------------
    // UI
    // --------------------------------------------------
  
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: spacing(18),
            paddingBottom: spacing(20),
          }}
        >
          {/* INTRODUCTION */}
  
          <View style={{ marginBottom: spacing(24) }}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: scale(14),
                fontWeight: "700",
                letterSpacing: scale(0.3),
              }}
            >
              PROFILE APPEARANCE
            </Text>
  
            <Text
              style={{
                ...descriptionStyle,
                marginTop: spacing(6),
              }}
            >
              Make your profile recognizable with a photo and cover
              that reflect your personality.
            </Text>
          </View>
  
          {/* PROFILE PHOTO */}
  
          <View
            style={{
              ...cardStyle,
              marginBottom: spacing(18),
            }}
          >
            <Text style={sectionLabelStyle}>
              PROFILE PHOTO
            </Text>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: scale(82),
                  height: scale(82),
                  borderRadius: scale(41),
                  overflow: "hidden",
                  backgroundColor: COLORS.background,
                  borderWidth: scale(1),
                  borderColor: COLORS.goldMuted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {profileImageUri ? (
                  <Image
                    source={{ uri: profileImageUri }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons
                    name="person-outline"
                    size={scale(32)}
                    color={COLORS.gold}
                  />
                )}
              </View>
  
              <View
                style={{
                  flex: 1,
                  minWidth: 0,
                  marginLeft: spacing(16),
                }}
              >
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: scale(12),
                    fontWeight: "600",
                  }}
                >
                  Your profile photo
                </Text>
  
                <Text
                  style={{
                    ...descriptionStyle,
                    marginTop: spacing(5),
                    marginBottom: spacing(12),
                  }}
                >
                  Displayed alongside your name throughout ITRI.
                </Text>
  
                <Pressable
                  disabled={saving}
                  onPress={() =>
                    pickImage(setProfileImg, [1, 1])
                  }
                  style={{
                    ...actionButtonStyle,
                    alignSelf: "flex-start",
                    opacity: saving ? 0.5 : 1,
                  }}
                >
                  <Ionicons
                    name="camera-outline"
                    size={scale(15)}
                    color={COLORS.gold}
                  />
  
                  <Text
                    style={{
                      color: COLORS.gold,
                      fontSize: scale(10),
                      fontWeight: "600",
                      marginLeft: spacing(7),
                    }}
                  >
                    {profileImg ? "Change photo" : "Choose photo"}
                  </Text>
                </Pressable>
              </View>
            </View>
  
            {profileImg && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: spacing(14),
                  paddingTop: spacing(12),
                  borderTopWidth: scale(1),
                  borderTopColor: COLORS.border,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={scale(15)}
                  color={COLORS.gold}
                />
  
                <Text
                  style={{
                    color: COLORS.gold,
                    fontSize: scale(10),
                    marginLeft: spacing(7),
                  }}
                >
                  New photo selected — not saved yet
                </Text>
              </View>
            )}
          </View>
  
          {/* COVER IMAGE */}
  
          <View style={cardStyle}>
            <Text style={sectionLabelStyle}>
              COVER IMAGE
            </Text>
  
            <View
              style={{
                height: scale(150),
                borderRadius: scale(12),
                overflow: "hidden",
                backgroundColor: COLORS.background,
                borderWidth: scale(1),
                borderColor: COLORS.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {coverImageUri ? (
                <Image
                  source={{ uri: coverImageUri }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Ionicons
                    name="image-outline"
                    size={scale(30)}
                    color={COLORS.goldMuted}
                  />
  
                  <Text
                    style={{
                      color: COLORS.secondary,
                      fontSize: scale(10),
                      marginTop: spacing(8),
                    }}
                  >
                    No cover image
                  </Text>
                </View>
              )}
  
              <View
                style={{
                  position: "absolute",
                  right: spacing(10),
                  bottom: spacing(10),
                }}
              >
                <Pressable
                  disabled={saving}
                  onPress={() =>
                    pickImage(setCoverImg, [16, 9])
                  }
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: COLORS.background,
                    opacity: saving ? 0.5 : 1,
                  }}
                >
                  <Ionicons
                    name="image-outline"
                    size={scale(15)}
                    color={COLORS.gold}
                  />
  
                  <Text
                    style={{
                      color: COLORS.gold,
                      fontSize: scale(10),
                      fontWeight: "600",
                      marginLeft: spacing(7),
                    }}
                  >
                    {coverImg ? "Change cover" : "Choose cover"}
                  </Text>
                </Pressable>
              </View>
            </View>
  
            <Text
              style={{
                ...descriptionStyle,
                marginTop: spacing(12),
              }}
            >
              Choose a wide image that complements your profile
              and showcases your style.
            </Text>
  
            {coverImg && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: spacing(14),
                  paddingTop: spacing(12),
                  borderTopWidth: scale(1),
                  borderTopColor: COLORS.border,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={scale(15)}
                  color={COLORS.gold}
                />
  
                <Text
                  style={{
                    color: COLORS.gold,
                    fontSize: scale(10),
                    marginLeft: spacing(7),
                  }}
                >
                  New cover selected — not saved yet
                </Text>
              </View>
            )}
          </View>
  
          {/* BOTTOM ACTIONS */}
  
          <View
            style={{
              flexDirection: "row",
              gap: spacing(12),
              marginTop: spacing(24),
            }}
          >
            <Pressable
              disabled={saving || !hasChanges}
              onPress={handleCancel}
              style={{
                flex: 1,
                minHeight: scale(50),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(13),
                borderWidth: scale(1),
                borderColor: "rgba(255, 255, 255, 0.4)",
                opacity: saving || !hasChanges ? 0.45 : 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.text,
                  fontSize: scale(12),
                  fontWeight: "600",
                }}
              >
                Cancel
              </Text>
            </Pressable>
  
            <Pressable
              disabled={saving || !hasChanges}
              onPress={handleConfirm}
              style={{
                flex: 1.6,
                minHeight: scale(50),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(13),
                backgroundColor: COLORS.gold,
                opacity: saving || !hasChanges ? 0.45 : 1,
              }}
            >
              <Ionicons
                name={
                  saving
                    ? "hourglass-outline"
                    : "checkmark-circle-outline"
                }
                size={scale(17)}
                color={COLORS.background}
              />
  
              <Text
                style={{
                  color: COLORS.background,
                  fontSize: scale(11),
                  fontWeight: "700",
                  marginLeft: spacing(8),
                }}
              >
                {saving ? "Submitting..." : "Confirm changes"}
              </Text>
            </Pressable>
          </View>
  
          <Text
            style={{
              color: COLORS.muted,
              fontSize: scale(9),
              lineHeight: scale(14),
              textAlign: "center",
              marginTop: spacing(12),
            }}
          >
            Your changes won't be submitted until you confirm.
          </Text>
        </ScrollView>
      </View>
    );
  }