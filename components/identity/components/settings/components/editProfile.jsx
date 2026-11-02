
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../../../context/GlobalProvider";
import { updateUserInfo } from "../../../../../apiCalls";

const COLORS = {
  background: "#08090B",
  surface: "#12120F",
  surfaceRaised: "#17150F",
  gold: "#E8B95A",
  goldMuted: "#A88743",
  text: "#F4F0E7",
  secondary: "#8F8A81",
  muted: "#69645C",
  border: "rgba(232,185,90,0.20)",
  error: "#E88787",
};

const BIO_LIMIT = 160;

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  scale,
  spacing,
  multiline = false,
  maxLength,
  autoCapitalize = "words",
  keyboardType = "default",
}) {
  return (
    <View style={{ marginBottom: spacing(20) }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: spacing(9),
        }}
      >
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: scale(11),
            fontWeight: "600",
            letterSpacing: scale(0.5),
          }}
        >
          {label}
        </Text>

        {maxLength ? (
          <Text
            style={{
              color: COLORS.muted,
              fontSize: scale(10),
            }}
          >
            {value.length}/{maxLength}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          minHeight: multiline ? scale(112) : scale(51),
          backgroundColor: COLORS.surface,
          borderWidth: scale(1),
          borderColor: COLORS.border,
          borderRadius: scale(13),
          paddingHorizontal: spacing(15),
          paddingVertical: multiline ? spacing(12) : 0,
          justifyContent: multiline ? "flex-start" : "center",
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          multiline={multiline}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          textAlignVertical={multiline ? "top" : "center"}
          selectionColor={COLORS.gold}
          style={{
            color: COLORS.text,
            fontSize: scale(13),
            lineHeight: multiline ? scale(21) : undefined,
            minHeight: multiline ? scale(85) : undefined,
            padding: 0,
          }}
        />
      </View>
    </View>
  );
}

function SectionHeading({ icon, title, subtitle, scale, spacing }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing(20),
      }}
    >
      <View
        style={{
          width: scale(40),
          height: scale(40),
          borderRadius: scale(12),
          backgroundColor: COLORS.surfaceRaised,
          borderWidth: scale(1),
          borderColor: COLORS.border,
          alignItems: "center",
          justifyContent: "center",
          marginRight: spacing(12),
        }}
      >
        <Ionicons
          name={icon}
          size={scale(19)}
          color={COLORS.gold}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: COLORS.text,
            fontSize: scale(13),
            fontWeight: "700",
            letterSpacing: scale(0.2),
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: COLORS.secondary,
            fontSize: scale(10),
            marginTop: spacing(4),
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

export default function EditProfile( props) {
  const { user, setUser, scale, spacing } = useGlobalContext();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    bio: user?.bio ?? user?.tellus ?? "",
    talent: user?.talent ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "",
    country: user?.country ?? "",
  });

  const [saving, setSaving] = useState(false);

  // Refresh the form if the profile changes while this screen is open.
  useEffect(() => {
    setForm({
      name: user?.name ?? "",
      bio: user?.bio ?? user?.tellus ?? "",
      talent: user?.talent ?? "",
      city: user?.city ?? "",
      state: user?.state ?? "",
      country: user?.country ?? "",
    });
  }, [
    user?.name,
    user?.bio,
    user?.tellus,
    user?.talent,
    user?.city,
    user?.state,
    user?.country,
  ]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const hasChanges =
    form.name !== (user?.name ?? "") ||
    form.bio !== (user?.bio ?? user?.tellus ?? "") ||
    form.talent !== (user?.talent ?? "") ||
    form.city !== (user?.city ?? "") ||
    form.state !== (user?.state ?? "") ||
    form.country !== (user?.country ?? "");

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert("Name required", "Please enter your display name.");
      return;
    }

    if (!hasChanges) {
      Alert.alert("No changes", "Your profile is already up to date.");
      return;
    }

    // if (typeof onSave !== "function") {
    //   Alert.alert(
    //     "Save not connected",
    //     "Connect your profile update API to the onSave prop before saving changes."
    //   );
    //   return;
    // }

    const updatedFields = {
      name: form.name.trim(),
      bio: form.bio.trim(),
      talent: form.talent.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      country: form.country.trim(),
    };

    setSaving(true);

    try {

      const result = await updateUserInfo(user._id, updatedFields); 
      if (!result) {
        throw new Error("The profile update was not confirmed.");
      }

      setUser(result.data);

    //   setUser((currentUser) => ({
    //     ...currentUser,
    //     ...updatedUser,
    //     ...updatedFields,
    //     bio: updatedFields.bio,
    //   }));

    //   Alert.alert("Profile updated", "Your changes have been saved.");
      props.setActiveScreen(null)
    } catch (error) {
      Alert.alert(
        "Unable to save",
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: spacing(12),
          paddingBottom: spacing(28),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing(28),
          }}
        >
          <View style={{ flex: 1, paddingRight: spacing(12) }}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: scale(20),
                fontWeight: "700",
                letterSpacing: scale(-0.4),
              }}
            >
              Your profile
            </Text>

            <Text
              style={{
                color: COLORS.secondary,
                fontSize: scale(11),
                lineHeight: scale(17),
                marginTop: spacing(6),
              }}
            >
              Make your talent, story, and roots yours.
            </Text>
          </View>

          <View
            style={{
              width: scale(43),
              height: scale(43),
              borderRadius: scale(15),
              backgroundColor: COLORS.surfaceRaised,
              borderWidth: scale(1),
              borderColor: COLORS.border,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="create-outline"
              size={scale(21)}
              color={COLORS.gold}
            />
          </View>
        </View>

        {/* PERSONAL DETAILS */}
        <View
          style={{
            padding: spacing(17),
            marginBottom: spacing(18),
            borderWidth: scale(1),
            borderColor: COLORS.border,
            borderRadius: scale(18),
            backgroundColor: "#0D0D0B",
          }}
        >
          <SectionHeading
            icon="person-outline"
            title="Personal details"
            subtitle="The name and story people see."
            scale={scale}
            spacing={spacing}
          />

          <FormField
            label="DISPLAY NAME"
            value={form.name}
            onChangeText={(value) => updateField("name", value)}
            placeholder="Your name"
            scale={scale}
            spacing={spacing}
          />

          <FormField
            label="BIO"
            value={form.bio}
            onChangeText={(value) => updateField("bio", value)}
            placeholder="Tell the world what makes you unique..."
            multiline
            maxLength={BIO_LIMIT}
            autoCapitalize="sentences"
            scale={scale}
            spacing={spacing}
          />
        </View>

        {/* TALENT */}
        <View
          style={{
            padding: spacing(17),
            marginBottom: spacing(18),
            borderWidth: scale(1),
            borderColor: COLORS.border,
            borderRadius: scale(18),
            backgroundColor: "#0D0D0B",
          }}
        >
          <SectionHeading
            icon="trophy-outline"
            title="Talent"
            subtitle="Define what you bring to the stage."
            scale={scale}
            spacing={spacing}
          />

          <FormField
            label="PRIMARY TALENT"
            value={form.talent}
            onChangeText={(value) => updateField("talent", value)}
            placeholder="e.g. Singing, dance, photography"
            autoCapitalize="sentences"
            scale={scale}
            spacing={spacing}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              backgroundColor: COLORS.surfaceRaised,
              padding: spacing(12),
              borderRadius: scale(11),
              marginTop: -spacing(5),
            }}
          >
            <Ionicons
              name="sparkles-outline"
              size={scale(16)}
              color={COLORS.gold}
              style={{ marginRight: spacing(9), marginTop: spacing(1) }}
            />

            <Text
              style={{
                flex: 1,
                color: COLORS.secondary,
                fontSize: scale(10),
                lineHeight: scale(16),
              }}
            >
              Choose the talent you want people to associate with your
              profile. Your existing arena and stage records remain separate.
            </Text>
          </View>
        </View>

        {/* LOCATION */}
        <View
          style={{
            padding: spacing(17),
            marginBottom: spacing(24),
            borderWidth: scale(1),
            borderColor: COLORS.border,
            borderRadius: scale(18),
            backgroundColor: "#0D0D0B",
          }}
        >
          <SectionHeading
            icon="location-outline"
            title="Location"
            subtitle="Represent your region."
            scale={scale}
            spacing={spacing}
          />

          <FormField
            label="CITY"
            value={form.city}
            onChangeText={(value) => updateField("city", value)}
            placeholder="Your city"
            scale={scale}
            spacing={spacing}
          />

          <FormField
            label="STATE / REGION"
            value={form.state}
            onChangeText={(value) => updateField("state", value)}
            placeholder="Your state or region"
            scale={scale}
            spacing={spacing}
          />

          <FormField
            label="COUNTRY CODE"
            value={form.country}
            onChangeText={(value) =>
              updateField("country", value.toUpperCase())
            }
            placeholder="e.g. DZ"
            autoCapitalize="characters"
            maxLength={2}
            scale={scale}
            spacing={spacing}
          />
        </View>

        <Pressable
          onPress={handleSave}
          disabled={saving || !hasChanges}
          accessibilityRole="button"
          accessibilityLabel="Save profile changes"
          style={{
            minHeight: scale(52),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: scale(14),
            backgroundColor:
              saving || !hasChanges ? "#6F5A31" : COLORS.gold,
          }} >
          {saving ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <>
              <Ionicons
                name="checkmark-circle-outline"
                size={scale(19)}
                color={COLORS.background}
                style={{ marginRight: spacing(9) }}
              />

              <Text
                style={{
                  color: COLORS.background,
                  fontSize: scale(12),
                  fontWeight: "800",
                  letterSpacing: scale(1),
                }}
              >
                SAVE CHANGES
              </Text>
            </>
          )}
        </Pressable>

        <Text
          style={{
            color: COLORS.muted,
            fontSize: scale(10),
            lineHeight: scale(15),
            textAlign: "center",
            marginTop: spacing(12),
          }}
        >
          Your username and profile images won't be changed here.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
