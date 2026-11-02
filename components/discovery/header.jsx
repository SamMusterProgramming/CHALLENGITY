// import { View, Text, TouchableOpacity, Dimensions, Pressable } from 'react-native'
// import React, { useState } from 'react'
// import { useGlobalContext } from '../../context/GlobalProvider';
// import { countries, COUNTRY_CONTINENTS } from '../../utilities/TypeData';
// import CountrySelectorModal from '../modal/countrySelectorModal';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import CountryFlag from '../common/CountryFlag';

// export default function Header({selectedTab , setSelectedTab}) {
//   const {globalSelectedRegion , userCountryCode, setGlobalSelectedRegion ,scale
//    } = useGlobalContext()
 
//   const [open, setOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { width, height } = Dimensions.get("window");
  
//   const options = {
//     stages: {
//       label: "STAGES",
//       icon: "trophy-outline",
//       activeIcon: "trophy",
//     },
//     arenas: {
//       label: "ARENAS",
//       icon: "stadium-outline",
//       activeIcon: "stadium",
//     },
//   };

//   const selected = options[selectedTab];

//   const selectTab = (tab) => {
//     setSelectedTab(tab);
//     setMenuOpen(false);
//   };


//   return (
//     <>
     
//      <View
//        style = {{
//         // zIndex: 1000,
//         // elevation: 1000,
//        }}
//        className="
//          mt-2
//          mb-4
//          p- 2
//          px-2
//          rounded-lg
//          bg -[#181818]
//          justify-center   w-[96%] gap-4 flex-row" >

//        <Pressable
//         activeOpacity={0.9}
//         onPress={() => setOpen(true)}
//         style = {{
//             padding : scale(12)
//         }}
//         className="flex-row w-[50%]  rounded-xl bg-[#201e1e] items-center justify-start ">

//            {/* <View className="flex-row items-center flex -1"> */}

//              <View
//                className="
//                  rounded-lg
//                  bg -[#1b1b1b]
//                  items-center
//                  justify-center
//                " >
         
//                <CountryFlag code={globalSelectedRegion} size={scale(16)} />
//              </View>

//              <View className="ml-4 flex-1 ">
//                <Text
//                  numberOfLines={1}
//                  className="
//                    text-white
//                    tex t-lg
//                    font-black
//                    uppercase
                  
//                  "
//                  style={{ fontSize: scale(12) }}
//                >
//                  {countries.find( c => c.code === globalSelectedRegion)?.name || "Global"}
//                </Text>
//            </View>
//            <MaterialCommunityIcons
//                   name={menuOpen ? "chevron-up" : "chevron-down"}
//                   size={30}
//                   color="rgba(255,255,255,0.95)"
//                   style={{
//                     marginLeft: "auto",
//                   }}
//                 />
//        </Pressable>

//         <Pressable
//         onPress={() => setMenuOpen((prev) => !prev)}
//         style={{
//           paddingHorizontal: 16,
//           borderRadius: 12,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "start",
//           // backgroundColor: "#000"
//         }}
//         className="flex-row w-[50%] p-2 rounded-xl bg-[#201e1e] items-center justify-start "
//          >
//         <MaterialCommunityIcons
//           name={selected.activeIcon}
//           size={scale(16)}
//           color="#EAB308"
//         />
//           <Text
//             style={{
//               marginLeft: 8,
//               color: "#F5F5F5",
//               fontSize: scale(12),
//               fontWeight: "900",
//             }}
//           >
//             {selected.label}
//           </Text>
//           <MaterialCommunityIcons
//             name={menuOpen ? "chevron-up" : "chevron-down"}
//             size={30}
//             color="rgba(255,255,255,0.95)"
//             style={{
//               marginLeft: "auto",
//             }}
//           />
//       </Pressable>

     

//      </View>
//       {/* DROPDOWN */}

//       {menuOpen && (
//         <View
//           style={{
//             position: "absolute",
//             top: 70,
//             left: 10,
//             right: 10,
//             padding: 6,
//             // width : "100%",
//             borderRadius: 14,
//             backgroundColor: "#11100D",
//             borderWidth: 1,
//             borderColor: "rgba(234,179,8,0.32)",
//             shadowColor: "#000",
//             shadowOpacity: 0.55,
//             shadowRadius: 18,
//             shadowOffset: {
//               width: 0,
//               height: 8,
//             },
//             // elevation: 15,
//             zIndex: 1,
//           }}
//           className = "flex-col justify-start items-center"
//         >
//           {Object.entries(options).map(([key, option]) => {
//             const isSelected = selectedTab === key;
//             return (
//               <Pressable
//                 key={key}
//                 onPress={() => selectTab(key)}
//                 style={{
//                   height: 44,
//                   // width : "100%" , 
//                   paddingHorizontal: 12,
//                   borderRadius: 10,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   backgroundColor: isSelected
//                     ? "rgba(234,179,8,0.14)"
//                     // : pressed
//                     // ? "rgba(255,255,255,0.06)"
//                     : "transparent",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name={
//                     isSelected
//                       ? option.activeIcon
//                       : option.icon
//                   }
//                   size={21}
//                   color={
//                     isSelected
//                       ? "#EAB308"
//                       : "rgba(255,255,255,0.65)"
//                   }
//                 />

//                 <Text
//                   style={{
//                     flex: 1,
//                     marginLeft: 10,
//                     color: isSelected
//                       ? "#EAB308"
//                       : "rgba(255,255,255,0.82)",
//                     fontSize: width / 32,
//                     fontWeight: isSelected
//                       ? "800"
//                       : "600",
//                   }}
//                 >
//                   {option.label}
//                 </Text>

//                 {isSelected && (
//                   <MaterialCommunityIcons
//                     name="check"
//                     size={18}
//                     color="#EAB308"
//                   />
//                 )}
//               </Pressable>
//             );
//           })}
//         </View>
//       )}
//      <CountrySelectorModal
//           visible={open}
//           onClose={() => setOpen(false)}
//           onSelect={(code) => {
//             setGlobalSelectedRegion(code);
//           }}
//           countries={countries}
//           userCountryCode={userCountryCode}
//           COUNTRY_CONTINENTS={COUNTRY_CONTINENTS}
//         />
//   </>
//   )
// }



import { View, Text, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { countries, COUNTRY_CONTINENTS } from "../../utilities/TypeData";
import CountrySelectorModal from "../modal/countrySelectorModal";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CountryFlag from "../common/CountryFlag";

export default function Header({ selectedTab, setSelectedTab }) {
  const {
    globalSelectedRegion,
    userCountryCode,
    setGlobalSelectedRegion,
    scale,
  } = useGlobalContext();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { width } = Dimensions.get("window");

  const options = {
    stages: {
      label: "STAGES",
      icon: "trophy-outline",
      activeIcon: "trophy",
    },
    arenas: {
      label: "ARENAS",
      icon: "stadium-outline",
      activeIcon: "stadium",
    },
  };

  const selected = options[selectedTab];

  const selectTab = (tab) => {
    setSelectedTab(tab);
    setMenuOpen(false);
  };

  const countryName =
    countries.find((c) => c.code === globalSelectedRegion)?.name ||
    "Global";

  return (
    <>
      <View
        className="w-full self-center"
        style={{
          marginTop: scale(5),
          marginBottom: scale(10),
        }} >


        {/* DISCOVERY IDENTITY */}
        <View
        className="flex-row justify-center items-center"
        style={{
          height: scale(42),
          paddingHorizontal: scale(4),
        }}   >
        {/* <View
          style={{
            width: scale(3),
            height: scale(28),
            borderRadius: scale(2),
            backgroundColor: "#E8B95A",
            marginRight: scale(10),
          }}
        /> */}

        <View className="flex-1 justify-center items-center">
          <View className="flex-row  items-center">
            <Text
              style={{
                color: "#F5F5F2",
                fontSize: scale(20),
                lineHeight: scale(21),
                fontWeight: "900",
                letterSpacing: scale(0.8),
              }}
            >
              DISCOVER
            </Text>

            <View
              style={{
                marginLeft: scale(8),
                marginTop: scale(1),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="globe-outline"
                size={scale(15)}
                color="#E8B95A"
              />
            </View>
          </View>

          {/* <Text
            style={{
              marginTop: scale(3),
              color: "rgba(255,255,255,0.54)",
              fontSize: scale(8),
              lineHeight: scale(11),
              fontWeight: "700",
              letterSpacing: scale(0.75),
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            TALENT · STAGES · ARENAS · SPOTLIGHTS
          </Text> */}

          <Text
            style={{
              marginTop: scale(4),
              color: "#E8B95A",
              fontSize: scale(9),
              lineHeight: scale(10),
              fontWeight: "600",
              letterSpacing: scale(0.9),
            }}
          >
            EXPLORE BEYOND YOUR WORLD
          </Text>
        </View>


          {/* <MaterialCommunityIcons
            name="layers-search-outline"
            size={scale(22)}
            color="rgba(232,185,90,0.72)"
          /> */}
        </View>

        {/* SELECTORS */}
        <View
          className="flex-row w-full"
          style={{
            marginTop: scale(16),
            gap: scale(7),
          }}
        >
          {/* COUNTRY */}
          <Pressable
            onPress={() => setOpen(true)}
            style={{
              flex: 1,
              // minHeight: scale(52),
              paddingHorizontal: scale(11),
              paddingVertical: scale(12),
              borderRadius: scale(12),
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.055)",
              backgroundColor: "#171717",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                // width: scale(30),
                // height: scale(30),
                borderRadius: scale(9),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#202020",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.045)",
              }}
            >
              <CountryFlag
                code={globalSelectedRegion}
                size={scale(17)}
              />
            </View>

            <View
              style={{
                marginLeft: scale(9),
                flex: 1,
              }}
            >
              {/* <Text
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontSize: scale(7),
                  fontWeight: "800",
                  letterSpacing: scale(0.8),
                  marginBottom: scale(2),
                }}
              >
                REGION
              </Text> */}

              <Text
                numberOfLines={1}
                style={{
                  color: "#F3F3F1",
                  fontSize: scale(11),
                  fontWeight: "800",
                }}
                className = "uppercase"
              >
                {countryName}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-down"
              size={scale(20)}
              color="rgba(255,255,255,0.58)"
            />
          </Pressable>

          {/* CONTENT TYPE */}
          <Pressable
            onPress={() => setMenuOpen((prev) => !prev)}
            style={{
              flex: 1,
              // minHeight: scale(52),
              paddingHorizontal: scale(11),
              borderRadius: scale(12),
              borderWidth: 1,
              borderColor: menuOpen
                ? "rgba(232,185,90,0.30)"
                : "rgba(255,255,255,0.055)",
              backgroundColor: menuOpen
                ? "#191714"
                : "#171717",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: scale(30),
                // height: scale(30),
                borderRadius: scale(9),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: menuOpen
                  ? "rgba(232,185,90,0.10)"
                  : "#202020",
              }}
            >
              <MaterialCommunityIcons
                name={selected.activeIcon}
                size={scale(17)}
                color="#E8B95A"
              />
            </View>

            <View
              style={{
                marginLeft: scale(9),
                flex: 1,
              }}
            >
              {/* <Text
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontSize: scale(7),
                  fontWeight: "800",
                  letterSpacing: scale(0.8),
                  marginBottom: scale(2),
                }}
              >
                EXPLORE
              </Text> */}

              <Text
                style={{
                  color: "#F3F3F1",
                  fontSize: scale(11),
                  fontWeight: "900",
                  letterSpacing: scale(0.25),
                }}
              >
                {selected.label}
              </Text>
            </View>

            <MaterialCommunityIcons
              name={menuOpen ? "chevron-up" : "chevron-down"}
              size={scale(20)}
              color="rgba(255,255,255,0.58)"
            />
          </Pressable>
        </View>
      </View>

      {/* CONTENT TYPE DROPDOWN */}
      {menuOpen && (
        <View
          style={{
            position: "absolute",
            top: scale(101),
            left: "2%",
            right: "2%",
            padding: scale(6),
            borderRadius: scale(14),
            backgroundColor: "#11100D",
            borderWidth: 1,
            borderColor: "rgba(232,185,90,0.24)",
            shadowColor: "#000",
            shadowOpacity: 0.65,
            shadowRadius: 18,
            shadowOffset: {
              width: 0,
              height: 8,
            },
            elevation: 15,
            zIndex: 1000,
          }}
          className="flex-col"
        >
          {Object.entries(options).map(([key, option]) => {
            const isSelected = selectedTab === key;

            return (
              <Pressable
                key={key}
                onPress={() => selectTab(key)}
                style={{
                  height: scale(44),
                  paddingHorizontal: scale(11),
                  borderRadius: scale(10),
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isSelected
                    ? "rgba(232,185,90,0.10)"
                    : "transparent",
                }}
              >
                <MaterialCommunityIcons
                  name={
                    isSelected
                      ? option.activeIcon
                      : option.icon
                  }
                  size={scale(20)}
                  color={
                    isSelected
                      ? "#E8B95A"
                      : "rgba(255,255,255,0.52)"
                  }
                />

                <Text
                  style={{
                    flex: 1,
                    marginLeft: scale(10),
                    color: isSelected
                      ? "#E8B95A"
                      : "rgba(255,255,255,0.80)",
                    fontSize: scale(10),
                    fontWeight: isSelected
                      ? "900"
                      : "700",
                    letterSpacing: scale(0.35),
                  }}
                >
                  {option.label}
                </Text>

                {isSelected && (
                  <MaterialCommunityIcons
                    name="check"
                    size={scale(17)}
                    color="#E8B95A"
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}

      {/* COUNTRY SELECTOR */}
      <CountrySelectorModal
        visible={open}
        onClose={() => setOpen(false)}
        onSelect={(code) => {
          setGlobalSelectedRegion(code);
        }}
        countries={countries}
        userCountryCode={userCountryCode}
        COUNTRY_CONTINENTS={COUNTRY_CONTINENTS}
      />
    </>
  );
}