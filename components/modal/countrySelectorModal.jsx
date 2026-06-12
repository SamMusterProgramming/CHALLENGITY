// import React from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   FlatList,
//   Pressable,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { countries } from "../../utilities/TypeData";
// import { Ionicons } from "@expo/vector-icons";

// export default function CountrySelectorModal({
//   visible,
//   onClose,
//   onSelect,
// }) {
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => {
//         onSelect(item.code);
//         onClose();
//       }}
//       className="flex-1 m-2 p-2 rounded-sm bg-[#111] border border-white/10 items-center justify-center"
//     >
//       <Text className="text-lg">{item.flag}</Text>
//       <Text
//         numberOfLines={1}
//         className="text-gray-300 text-xs mt-1 font-bebas tracking-wider text-center"
//       >
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <Modal
//       visible={visible}
//       animationType="fade"
//       transparent
//     >
//       {/* 🎬 Cinematic Background */}
//       <Pressable
//         onPress={onClose}
//         className="flex-1 bg-black/80 justify-center items-center"
//       >
//         {/* ✨ Modal Container */}
//         <Pressable
//           onPress={() => {}}
//           className="w-[95%] max-h-[75%] rounded-2xl overflow-hidden border border-yellow-500/20"
//         >
//           {/* 🔥 Subtle Gold Glow */}
//           <LinearGradient
//             colors={["rgba(255,215,0,0.2)", "transparent"]}
//             style={{ height: 30, width: "100%", position: "absolute", top: 0 }}
//           />

//           <View className="bg-[#0b0b0f] p-1">

//             {/* 🎬 Header */}
//             {/* <Text className="text-white text-lg font-extrabold tracking-widest text-center mb-3">
//               SELECT REGION
//             </Text> */}

//             {/* 🌍 Countries Grid */}
//             <FlatList
//               data={countries}
//               keyExtractor={(item) => item.code}
//               numColumns={5}
//               renderItem={renderItem}
//               showsVerticalScrollIndicator={false}
//             />

//           </View>
//         </Pressable>

//       <TouchableOpacity
//             onPress={() => onClose()}
//             className="absolute bg-slate-100 rounded-full  bottom-[30] p-1">
//                 <Ionicons name="close"  size={30}  color={"while"} />
//       </TouchableOpacity>   
//       </Pressable>
    
//     </Modal>
//   );
// }


import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// const REGIONS = [
//   {
//     id: "local",
//     title: "Local Region",
//     icon: "📍",
//     description: "Use your detected location",
//   },
//   {
//     id: "africa",
//     title: "Africa",
//     icon: "🌍",
//   },
//   {
//     id: "america",
//     title: "Americas",
//     icon: "🌎",
//   },
//   {
//     id: "asia",
//     title: "Asia",
//     icon: "🌏",
//   },
//   {
//     id: "europe",
//     title: "Europe",
//     icon: "🇪🇺",
//   },
//   {
//     id: "oceania",
//     title: "Oceania",
//     icon: "🌊",
//   },
// ];
const REGIONS = [
  {
    id: "local",
    title: "Local Region",
    icon: "📍",
    description: "Use your detected location",
  },

  // AFRICA
  {
    id: "northAfrica",
    title: "North Africa",
    icon: "🌍",
  },
  {
    id: "westAfrica",
    title: "West Africa",
    icon: "🌍",
  },
  {
    id: "eastAfrica",
    title: "East Africa",
    icon: "🌍",
  },
  {
    id: "centralAfrica",
    title: "Central Africa",
    icon: "🌍",
  },
  {
    id: "southernAfrica",
    title: "Southern Africa",
    icon: "🌍",
  },

  // AMERICAS
  {
    id: "northAmerica",
    title: "North America",
    icon: "🌎",
  },
  {
    id: "centralAmerica",
    title: "Central America",
    icon: "🌎",
  },
  {
    id: "caribbean",
    title: "Caribbean",
    icon: "🏝️",
  },
  {
    id: "southAmerica",
    title: "South America",
    icon: "🌎",
  },

  // EUROPE
  {
    id: "westernEurope",
    title: "Western Europe",
    icon: "🇪🇺",
  },
  {
    id: "easternEurope",
    title: "Eastern Europe",
    icon: "🇪🇺",
  },
  {
    id: "northernEurope",
    title: "Northern Europe",
    icon: "🇪🇺",
  },
  {
    id: "southernEurope",
    title: "Southern Europe",
    icon: "🇪🇺",
  },

  // ASIA
  {
    id: "middleEast",
    title: "Middle East",
    icon: "🕌",
  },
  {
    id: "southAsia",
    title: "South Asia",
    icon: "🌏",
  },
  {
    id: "eastAsia",
    title: "East Asia",
    icon: "🌏",
  },
  {
    id: "southeastAsia",
    title: "Southeast Asia",
    icon: "🌏",
  },
  {
    id: "centralAsia",
    title: "Central Asia",
    icon: "🌏",
  },

  // OCEANIA
  {
    id: "australiaNewZealand",
    title: "Australia & New Zealand",
    icon: "🦘",
  },
  {
    id: "pacificIslands",
    title: "Pacific Islands",
    icon: "🌊",
  },
];

export default function CountrySelectorModal({
  visible,
  onClose,
  onSelect,
  countries,
  userCountryCode,
  COUNTRY_CONTINENTS,
}) {

  const { width } = useWindowDimensions();

  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    if (!visible) {
      setSelectedRegion(null);
    }
  }, [visible]);

  const regionCountries = useMemo(() => {

    if (!selectedRegion) return [];

    const codes =
      COUNTRY_CONTINENTS[selectedRegion] || [];

    return countries.filter(country =>
      codes.includes(country.code)
    );

  }, [selectedRegion, countries, COUNTRY_CONTINENTS]);

  const closeModal = () => {
    setSelectedRegion(null);
    onClose();
  };

  const renderRegion = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (item.id === "local") {
            onSelect(userCountryCode);
            closeModal();
            return;
          }
          setSelectedRegion(item.id);
        }}
        style={{
          width: "31%",
          // aspectRatio: 1,
          marginBottom: 12,
          borderRadius: 16,
          backgroundColor: "#0F0F0F",
          borderWidth: 1,
          borderColor: "rgba(234,179,8,0.15)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
        className = "py-5"
      >
        {/* Icon */}
        <Text
          style={{
            fontSize: width / 18,
            marginBottom: 8,
          }}  >
          {item.icon}
        </Text>
  
        {/* Title */}
        <Text
          style={{
            color: "#fff",
            fontSize: width / 44,
            fontWeight: "700",
            textAlign: "center",
          }}
          numberOfLines={1} >
          {item.title}
        </Text>
  
        {/* Local subtitle */}
        {!!item.description && (
          <Text
            style={{
              color: "#888",
              fontSize: width / 42,
              textAlign: "center",
              marginTop: 4,
            }}
            numberOfLines={2}
          >
            Local
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderCountry = ({ item }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          onSelect(item.code);
          closeModal();
        }}
        style={{
          width: "31%",
          aspectRatio: 1,
          margin: "1%",
        }}
        className="
          bg-[#111111]
          border
          border-white/10
          rounded-2xl
           
          px-2
          items-center
          justify-center  " >
        <Text
          style={{
            fontSize: width / 20,
          }}
        >
          {item.flag}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            fontSize: width / 44,
          }}
          className="
            text-white
            text-center
            mt-2
            font-montserratSemi
          "
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable
        onPress={closeModal}
        className="
          flex-1
          bg-black/85
          justify-center
          items-center
        "
      >

        <Pressable
          onPress={() => {}}
          className="
            w-[95%]
            h-[85%]
            rounded-3xl
            overflow-hidden
            border
            border-yellow-500/20
          "
        >

          <LinearGradient
            colors={[
              "rgba(255,215,0,0.15)",
              "transparent",
            ]}
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: 50,
            }}
          />

          <View
            className="flex-1  bg-[#090909]"
            style={{
              padding: 18,
            }}
          >
            {/* HEADER */}

            <View className="mb-5">
              <Text
                className="
                  text-white
                  text-center
                  font-montserratSemi
                "
                style={{
                  fontSize: width / 30,
                }}   >
                {selectedRegion
                  ? "Choose Country"
                  : "Choose Region"}
              </Text>
              <Text
                className="
                  text-gray-400
                  text-center
                  mt-2
                "
                style={{
                  fontSize: width / 36,
                }}
              >
                Discover talent from around the world
              </Text>
            </View>

            {/* BACK BUTTON */}

            {selectedRegion && (
            <View
            className ="w-full mb-4 flex-row justify-between">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedRegion(null)
                }
                className="
                  flex-row
                  items-center
                  self-start
                "
              >
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color="white"
                />

                <Text
                  className="
                    text-white
                    ml-1
                    font-montserratSemi
                  "
                  style={{
                    fontSize: width / 36,
                  }}
                >
                  Back To Regions
                </Text>

              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                className="
                  bg -white
                  rounded-full
                  p-2
                "
              >
                
                <Text
                  className="
                    ml-1
                    font-montserratSemi
                    text-white
                  "
                  style={{
                    fontSize: width / 36,
                  }}
                >
                  Exit
                </Text>
              </TouchableOpacity>
            </View>
            )}

            {/* CONTENT */}

            {/* <FlatList
              key={selectedRegion ? "countries-grid" : "regions-list"}
              data={
                selectedRegion
                  ? regionCountries
                  : REGIONS
              }
              keyExtractor={(item) =>
                item.code || item.id
              }
              renderItem={
                selectedRegion
                  ? renderCountry
                  : renderRegion
              }
              numColumns={
                selectedRegion
                  ? 4
                  : 3
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 30,
              }}
              columnWrapperStyle={
                selectedRegion
                  ? {
                      justifyContent: "space-between",
                    }
                  : undefined
              }
            /> */}

          <FlatList
            key={selectedRegion ? "countries-grid" : "regions-grid"}
            data={selectedRegion ? regionCountries : REGIONS}
            keyExtractor={(item) => item.code || item.id}
            renderItem={
              selectedRegion
                ? renderCountry
                : renderRegion
            }
            numColumns={selectedRegion ? 3 : 3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />

          </View>

        </Pressable>

      </Pressable>
    </Modal>
  );
}