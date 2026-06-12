import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { countries, COUNTRY_CONTINENTS } from '../../utilities/TypeData';
import CountrySelectorModal from '../modal/countrySelectorModal';

export default function StageSelectorFooter() {
  const {globalSelectedRegion , userCountryCode, setGlobalSelectedRegion
   } = useGlobalContext()
 
  const [open, setOpen] = useState(false);
  const { width, height } = Dimensions.get("window");


  return (
    <View
    className ="flex- 1 items-center mt- 2 mb- 2 px- 2 ">
     
     <TouchableOpacity
       activeOpacity={0.9}
       onPress={() => setOpen(true)}
       className="
         mt-2
         mb-2 4
         rounded-lg
         bo rder
         bo rder-white/10
         bg-[#181818]
         overflow-hidden " >
       <View className="flex-row w-full items-center justify-between px-2 py-2">

           {/* LEFT */}
           <View className="flex-row items-end flex-1">

             <View
               className="
                 w-14 h-11
                 rounded-lg
                 bg-[#1b1b1b]
                 items-center
                 justify-center
               "
             >
               <Text style={{ fontSize: width/14 }}>
                 {countries.find(c => c.code === globalSelectedRegion)?.flag || "🌍"}
               </Text>
             </View>

             <View className="ml-4 flex-1">

               <Text
                 className="
                   text-gray-400
                   font-montserrat
                 "
                 style={{ fontSize: width/45 }}
               >
                 Region Stages
               </Text>

               <Text
                 className="
                   text-white
                   text-lg
                   font-montserratSemi
                 "
                 style={{ fontSize: width/34 }}
               >
                 {countries.find( c => c.code === globalSelectedRegion)?.name || "Global"}
               </Text>

             </View>

           </View>

           {/* RIGHT */}

           <View
             className="
               px-4 py-3
               rounded-lg
               bg-black
             "
           >
             <Text
               className="
                 text-yellow-500
                 font-montserratSemi
               "
               style={{
                 fontSize: width / 38,
                 fontWeight:700,
               }}
             >
               SELECT
             </Text>
           </View>

       </View>
     </TouchableOpacity>
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
  </View>
  )
}