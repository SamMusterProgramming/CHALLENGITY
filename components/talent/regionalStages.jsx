import {
    View,
    Text,
    FlatList,
  } from 'react-native';
  
  import React from 'react';
  
  import { stageIcons , countries } from '../../utilities/TypeData';
import StageCard from './stageCard';
import { useGlobalContext } from '../../context/GlobalProvider';
  
  /* TEMP CARD PLACEHOLDER */
 
  
  export default function RegionalStages({
    regionStages,
    user,
    height,
    width,
    region
  }) {
   
    const {userCountryCode} = useGlobalContext()

    const renderHeader = () => {
        const reg = countries.find(
          (c) => c.code === region
        );
        
        return (
          <View
            className="
              w-full
              mb-2
              mt-2
              b g-[#111114]
              roun ded-lg
            " >
      
            {/* TOP TITLE */}
            <View
              className="
                flex-row
                items-center
                justify-between
                mb- 3
              "  >
      
              <View className="flex-1">
      
                <View className="flex-row items-center">
      
                  <Text
                    style={{
                      fontSize: width * 0.09,
                    }}
                  >
                    {reg?.flag}
                  </Text>
      
                  <View className="ml-3">
      
                    <Text
                      className="
                        text-[#F5D77A]
                        font-bebas
                        tracking-[1px]
                      "
                      style={{
                        fontSize: width * 0.028,
                      }}
                    >
                      {reg?.name?.toUpperCase()} STAGES
                    </Text>
      
                    <Text
                      className="
                        text-white
                        font-black
                      "
                      style={{
                        fontSize: width * 0.027,
                      }}
                    >
                      Discover {region === userCountryCode ? "Local Talent 📍 " : "Global Talent  🌐"} 
                    </Text>
      
                  </View>
      
                </View>
      
              </View>
             
      
            </View>
      
            {/* DESCRIPTION CARD */}
            {/* <View
              className="
                bg-[#111114]
                border
                border-[#F5D77A]/10
                rounded-[5px]
                overflow-hidden
              "
            >
      
              <View className="px-4 py-4">
      
                <Text
                  className="
                    text-[#E4E4E7]
                    leading-6
                  "
                  style={{
                    fontSize: width * 0.031,
                  }}
                >
                  Explore the most exciting talent stages
                  across{" "}
                  <Text className="text-[#F5D77A] font-semibold">
                    {region?.name}
                  </Text>
                  . Discover rising performers, support local
                  creators, and step into arenas where talent,
                  passion, and competition come alive.
                </Text>
      
              </View>
      
            </View> */}
      
          </View>
        );
      };

    const renderItem = ({ item }) => (
      <StageCard
        stage = {item}
        width={width}
        height={width/4}
        region = {region}
        user = {user}
      />
    );


    const renderFooter = () => {
        return(
          <View
          className="
            mt-3
            b g-[#222226]
            bor der
            b order-[#F5D77A]/10
            roun ded-[5px]
            px- 2 4
            py-2
            overflow-hidden
          "
        >

         
          <Text
            className="
              text-start
              text-[#e2ddd0]
              font-black
              trackin g-[1px]
            "
            style={{
              fontSize: width * 0.028,
            }}
          >
            Pick a stage. Own the spotlight.
          </Text>

          <Text
            className="
              text-start
              text-[#A1A1AA]
              mt-2
              leading-5
            "
            style={{
              fontSize: width * 0.03,
            }}
          >
            Explore performances, join the competition,
            and let your talent be seen.
          </Text>

        </View>
        )
    }
  
    return (
  
      <View
        // style={{
        //   height: height,
        //   width: width,
        // }}
        className=" justify-start items-center w-full ">
          
              <FlatList
                data={regionStages}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  item._id || index.toString()
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
                contentContainerStyle={{
                  paddingBottom: height * 0.04,
                  // paddingHorizontal: width * 0.03,
                }}
        
                /* HEADER */
                ListHeaderComponent={renderHeader}
        
                /* FOOTER */
                ListFooterComponent={renderFooter}
        
              />
  
      </View>
    );
  }