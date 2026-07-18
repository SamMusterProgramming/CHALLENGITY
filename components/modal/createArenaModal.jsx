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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { countries, STAGES, TALENTS } from "../../utilities/TypeData";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export default function CreateArenaModal({
  isVisible,
  setIsVisible,
  onCreateArena,
  user
}) {
  const { width, height } = useWindowDimensions();
  const {userCountryCode} = useGlobalContext()
  const [arenaName, setArenaName] = useState("");
  const [talentType, setTalentType] = useState("Sport");
  const [region, setRegion] = useState("");
  const [biography, setBiography] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const insets = useSafeAreaInsets();

  const [form , setForm] = useState({
                                    arenaName : user.name.split(" ")[0] + talentType + userCountryCode ,
                                    talentType : "Sport" ,
                                    region : user.country , // countries.find(c => c.code == userCountryCode)?.code,
                                    biography : "",
                                    description : ""
                                    })
  useEffect(() => {
    setForm({...form ,arenaName : user.name.split(" ")[0] + talentType + userCountryCode })
  }, [talentType])
  
  const resetForm = () => {
    setForm({
        arenaName : "" ,
        talentType : "" ,
        region : user.country ,// countries.find(c => c.code == userCountryCode)?.code,
        biography : "",
        description : ""
        })
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
      profileImage : user.profileImage,
      coverImage : user.coverImage
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
          backgroundColor: "#000",
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 10,
        }}
        className ="items-center w-full"
      >
        {/* HEADER */}
  
        <View
          style={{
            // height: 56,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className ="items-center w-full py-6"
        >
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={{
            //   width: 36,
            //   height: 36,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={30}
              color="#888"
            />
          </TouchableOpacity>
  
          <Text
            style={{
              color: "#FFF",
              fontSize: width/20,
              fontWeight: "700",
            }}
          >
            Create Arena
          </Text>
  
          <View
            style={{
            //   width: width/8,
            //   height: width/8,
              borderRadius: 42,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(234,179,8,0.08)",
            //   borderWidth: 1,
            //   borderColor: "rgba(234,179,8,0.30)",
            }}
          >
            <MaterialCommunityIcons
              name="star-four-points"
              size={30}
              color="#eab308"
            />
          </View>
        </View>
  
        {/* HERO */}
  
        {/* <View
          style={{
            alignItems: "center",
            paddingHorizontal: 44,
            paddingTop: 10,
            paddingBottom: 20,
            borderWidth: 4,
            borderColor: "rgba(234,179,8,0.30)",
            borderRadius :18 ,
            paddingBottom:24
          }}
           >
          <Text
            numberOfLines = {1}
            style={{
              marginTop: 14,
              color: "#FFF",
              fontSize: width/26,
              fontWeight: "800",
            }}
          >
            {form.arenaName || "Your Arena"}
          </Text>
  
          <Text
            style={{
              marginTop: 4,
              color: "#8B8B8B",
              fontSize: 14,
            }}
          >
            {form.talentType || "Talent"} • {userCountryCode}
          </Text>
        </View> */}
  
        {/* FORM */}
       
        <ScrollView
        style={{
            // flex: 1,
        }}
        contentContainerStyle={{
            // flexGrow: 1,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        >
        
          <View
            style={{
                paddingHorizontal: 10,
            }}
            className ="gap-2 justify-center items-center w-full"
            >
                <Text
                style={{
                    color: "#eab308",
                    fontSize: width/30,
                    fontWeight: "700",
                    marginBottom: 8,
                    letterSpacing: 1,
                }}
                >
                ARENA NAME
                </Text>
    
                <TextInput
                value={form.arenaName}
                onChangeText={(e) =>
                    setForm({
                    ...form,
                    arenaName: e,
                    })
                }
                placeholder="Music Arena"
                placeholderTextColor="#666"
                style={{
                    height: 50,
                    width : "100%",
                    borderRadius: 8,
                    backgroundColor: "#0C0C0C",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.16)",
                    paddingHorizontal: 14,
                    color: "#FFF",
                }}
                />
            </View>
  
          
  
            {/* BIO */}
    
            <View
            style={{
                paddingHorizontal :10,
                marginTop :40
            }}
            className ="gap-2 justify-center items-center">
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                }}
                >
                <Text
                    style={{
                    color: "#eab308",
                    fontSize: width/30,
                    fontWeight: "700",
                    letterSpacing: 1,
                    }}
                >
                    BIOGRAPHY {' '}
                </Text>
    
                <Text
                    style={{
                    color: "#fff",
                    fontSize: width/32,
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
                placeholderTextColor="#666"
                style={{
                    height: 62,
                    width : "100%",
                    borderRadius: 8,
                    backgroundColor: "#0C0C0C",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.16)",
                    paddingHorizontal: 14,
                    paddingTop: 12,
                    color: "#FFF",
                }}
                />
            </View>
  
            {/* DESCRIPTION */}
    
            <View
            style={{
                paddingHorizontal :10 ,
                marginTop :40
            }}
            className ="gap-2  w-full ">
                <View
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-center",
                    marginBottom: 8,
                }}
                className ="w-full justify-center"
                >
                <Text
                    style={{
                    color: "#eab308",
                    fontSize: width/30,
                    fontWeight: "700",
                    letterSpacing: 1,
                    }}
                >
                    DESCRIPTION {' '}
                </Text>
    
                <Text
                    style={{
                    color: "#fff",
                    fontSize: width/32,
                    }}
                >
                    {form.description.length}/150
                </Text>
                </View>
    
                <TextInput
                multiline
                numberOfLines={2}
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
                placeholderTextColor="#666"
                style={{
                    height: 75,
                    width : width * 0.95,
                    borderRadius: 8,
                    backgroundColor: "#0C0C0C",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.16)",
                    paddingHorizontal: 14,
                    paddingTop: 12,
                    color: "#FFF",
                }}
                />
            </View>

              {/* TALENT */}
    
              <View
              style ={{
                marginTop :40
              }}
              className = "items-center gap-4"
                >
                <Text
                style={{
                    color: "#eab308",
                    fontSize: width/30,
                    fontWeight: "700",
                    marginBottom: 10,
                    letterSpacing: 1,
                    marginLeft :10
                }}
                >
                TALENT TYPE
                </Text>
    
                <View
                className="flex-row flex-wrap justify-between px-2 py-2"
                >
                {TALENTS.map((talent, index) => {
                    const selected =
                    form.talentType === talent;

                    return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.85}
                        onPress={() => {
                        setForm({
                            ...form,
                            talentType: talent,
                        });

                        setTalentType(talent);
                        }}
                        style={{
                        width: "32%",
                        height: 52,
                        marginBottom: 10,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: selected
                            ? "#eab308"
                            : "rgba(255,255,255,0.03)",
                        borderWidth: 1,
                        borderColor: selected
                            ? "#eab308"
                            : "rgba(234,179,8,0.35)",
                        }}
                    >
                        <Text
                        numberOfLines={1}
                        style={{
                            color: selected
                            ? "#000"
                            : "#FFF",

                            fontWeight: "700",
                            fontSize: width / 30,
                        }}
                        >
                        {STAGES[index]}
                        </Text>
                    </TouchableOpacity>
                    );
                })}
                </View>

            </View>
  
            {message ? (
                <Text
                style={{
                    color: "#EF4444",
                    textAlign: "center",
                    fontWeight: "600",
                }}
                >
                {message}
                </Text>
            ) : null}

<View
  style={{
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 12,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(234,179,8,0.20)",
  }}
>
  <Text
    style={{
      color: "#eab308",
      fontSize: width / 32,
      fontWeight: "700",
      marginBottom: 12,
      letterSpacing: 1,
    }}
  >
    REVIEW
  </Text>

  <View className="gap-2">
    <Text
      style={{
        color: "#FFF",
        fontWeight: "700",
        fontSize: width / 26,
      }}
    >
      {form.arenaName || "Unnamed Arena"}
    </Text>

    <Text
      style={{
        color: "#B3B3B3",
        fontSize: width / 34,
      }}
    >
      {form.talentType || "No Talent Selected"} • {userCountryCode}
    </Text>

    {!!form.biography && (
      <Text
        numberOfLines={2}
        style={{
          color: "#E5E5E5",
          fontSize: width / 34,
        }}
      >
        {form.biography}
      </Text>
    )}

    {!!form.description && (
      <Text
        numberOfLines={2}
        style={{
          color: "#8A8A8A",
          fontSize: width / 36,
        }}
      >
        {form.description}
      </Text>
    )}
  </View>
</View>
       
        </ScrollView>
      
        {/* BUTTON */}
  
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
          className ="items-center w-full"
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSubmit}
            style={{
              height: 58,
              borderRadius: 16,
              backgroundColor: "#eab308",
              justifyContent: "center",
              alignItems: "center",
            }}
            className ="items-center w-full"
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "900",
                fontSize: 16,
                letterSpacing: 0.5,
              }}
            >
              LAUNCH ARENA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}