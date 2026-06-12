import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
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
    region,
    loadingStages
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
              mb-4 3
              mt-3
              b g-[#111114]
              roun ded-lg
              items-center
            " >
      
            {/* TOP TITLE */}
            <View
              className="
                flex-row
                items-center
                justify-center
                mb- 3
              "  >
      
              <View className="flex-1">
      
                <View className="flex-row flex-1 justify-center items-center">
      
                 
      
                  <View className="ml -2 flex-1 flex-row text-center justify-center items-center">
      
                    <Text
                      className="
                        text-white [#F5D77A]
                        font-bold
                        tracking-[0.6px]
                        mb -2 "
                      style={{
                        fontSize: width /39,
                      }}
                    >
                      {reg?.name?.toUpperCase()} {' '}
                      {/* <Text
                          style={{
                            fontSize: width /36,
                          }}  >
                          STAGES {'  '}
                      </Text>  */}
                      <Text
                          style={{
                            fontSize: width /30,
                          }}  >
                          {reg?.flag}
                      </Text> 
                    </Text>
      
                    <Text
                      className="
                        text-gray-400
                        font-black
                        absolute right-0
                      "
                      style={{
                        fontSize: width * 0.017,
                      }}   >
                      {/* Discover {region === userCountryCode ? "Local Talent " : "Global Talent "}  */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
      
          </View>
        );
      };

    const renderItem = ({ item }) => (
      <StageCard
        stage = {item}
        width={width}
        height={width/3.03}
        region = {region}
        user = {user}
      />
    );

    const renderFooter = () => {
        return(
          <View
          className="
            mt- 2 3
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
              text-center
              text-gray-200
              font- semibold
              leading-5
            "
            style={{
              fontSize: width / 34,
            }}     >
                 Experience live competitions, vote in real time, support rising talent, and showcase your own talent to the world like never before.      
            </Text>

        </View>
        )
    }
  
    return (
  
      <View
        className=" justify-start items-center w-full px -2 ">
              <FlatList
                initialNumToRender={2}
                data={regionStages}
                extraData={loadingStages}
                renderItem={!loadingStages ? renderItem : ()=>{
                return (
                    <View 
                    style={{
                      height: width / 3.3,
                      width :width * 0.49,
                    }}
                    className=" mb-4 flex-1 justify-center items-center">
                      <ActivityIndicator
                        size="small"
                        color="#D4AF37"
                      />
                      <Text
                        className="text-white mt-3 font-semibold"
                        style={{
                          fontSize: width / 38,
                        }}
                      >
                        Loading stages...
                      </Text>
                    </View>
                )
                }}
                keyExtractor={(item, index) =>
                  item._id || index.toString()
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  gap: 8,
                  
                }}
                contentContainerStyle={{
              
                  gap: 8,
        
                }}
             
              />
  
      </View>
    );
  }