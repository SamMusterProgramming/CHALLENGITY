import { View, Text, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { countries, COUNTRY_CONTINENTS } from '../../utilities/TypeData';
import CountrySelectorModal from '../modal/countrySelectorModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StageSelectorFooter({selectedTab , setSelectedTab}) {
  const {globalSelectedRegion , userCountryCode, setGlobalSelectedRegion
   } = useGlobalContext()
 
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { width, height } = Dimensions.get("window");
  
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


  return (
    <>
     
     <View
       style = {{
        // zIndex: 1000,
        // elevation: 1000,
       }}
       className="
         mt-4
         mb-2 
         p- 2
         pl-2
         rounded-lg
         bg -[#181818]
         justify-between  w-[96%] gap-4 flex-row" >

       <Pressable
        activeOpacity={0.9}
        onPress={() => setOpen(true)}
        className="flex-row flex-1 rounded-xl bg-[#181818] items-center justify-start ">

           {/* <View className="flex-row items-center flex -1"> */}

             <View
               className="
                 rounded-lg
                 bg -[#1b1b1b]
                 items-center
                 justify-center
               " >
               <Text 
               className =""
               style={{ fontSize: width/12 }}>
                 {countries.find(c => c.code === globalSelectedRegion)?.flag || "🌍"}
               </Text>
             </View>

             <View className="ml-4 ">

               {/* <Text
                 className="
                   text-gray-200
                   font-montserrat
                 "
                 style={{ fontSize: width/45 }}
               >
                 Region Stages
               </Text> */}

               <Text
                 className="
                   text-white
                   text-lg
                   font-black
                   uppercase
                 "
                 style={{ fontSize: width/30 }}
               >
                 {countries.find( c => c.code === globalSelectedRegion)?.name || "Global"}
               </Text>
           </View>
           <MaterialCommunityIcons
                  name={menuOpen ? "chevron-up" : "chevron-down"}
                  size={30}
                  color="rgba(255,255,255,0.95)"
                  style={{
                    marginLeft: "auto",

                  }}
                />
       </Pressable>
        <Pressable
        onPress={() => setMenuOpen((prev) => !prev)}
        style={{
          paddingHorizontal: 16,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000"
        }} >
        <MaterialCommunityIcons
          name={selected.activeIcon}
          size={22}
          color="#EAB308"
        />
          <Text
            style={{
              marginLeft: 8,
              color: "#F5F5F5",
              fontSize: width / 30,
              fontWeight: "900",
            }}
          >
            {selected.label}
          </Text>
          <MaterialCommunityIcons
            name={menuOpen ? "chevron-up" : "chevron-down"}
            size={30}
            color="rgba(255,255,255,0.95)"
            style={{
              marginLeft: 6,
            }}
          />
      </Pressable>

     

     </View>
      {/* DROPDOWN */}

      {menuOpen && (
        <View
          style={{
            position: "absolute",
            top: 70,
            left: 10,
            right: 10,
            padding: 6,
            // width : "100%",
            borderRadius: 14,
            backgroundColor: "#11100D",
            borderWidth: 1,
            borderColor: "rgba(234,179,8,0.32)",
            shadowColor: "#000",
            shadowOpacity: 0.55,
            shadowRadius: 18,
            shadowOffset: {
              width: 0,
              height: 8,
            },
            // elevation: 15,
            zIndex: 1,
          }}
          className = "flex-col justify-start items-center"
        >
          {Object.entries(options).map(([key, option]) => {
            const isSelected = selectedTab === key;
            return (
              <Pressable
                key={key}
                onPress={() => selectTab(key)}
                style={{
                  height: 44,
                  // width : "100%" , 
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isSelected
                    ? "rgba(234,179,8,0.14)"
                    // : pressed
                    // ? "rgba(255,255,255,0.06)"
                    : "transparent",
                }}
              >
                <MaterialCommunityIcons
                  name={
                    isSelected
                      ? option.activeIcon
                      : option.icon
                  }
                  size={21}
                  color={
                    isSelected
                      ? "#EAB308"
                      : "rgba(255,255,255,0.65)"
                  }
                />

                <Text
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    color: isSelected
                      ? "#EAB308"
                      : "rgba(255,255,255,0.82)",
                    fontSize: width / 32,
                    fontWeight: isSelected
                      ? "800"
                      : "600",
                  }}
                >
                  {option.label}
                </Text>

                {isSelected && (
                  <MaterialCommunityIcons
                    name="check"
                    size={18}
                    color="#EAB308"
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
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
  )
}