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
              mb-2 3
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
      
                  <View className="ml-2">
      
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
                      Discover {region === userCountryCode ? "Local Talent " : "Global Talent "} 
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
        height={width/3.8}
        region = {region}
        user = {user}
      />
    );

    const renderFooter = () => {
        return(
          <View
          className="
            mt-2 3
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
              te xt-center
              text-[#e2ddd0]
              font-black
              trackin g-[1px] "
            style={{
              fontSize: width /28,
            }}
          >
            One Stage. One Spotlight. Your Moment.
          </Text>

          <Text
            className="
              te xt-center
              text-[#bfbfc3]
              mt-2
              leading-5
            "
            style={{
              fontSize: width / 32,
            }}
          >
             Enjoy the competition vote live support rising talent and showcase your own talent to the world like never before
          </Text>

        </View>
        )
    }
  
    return (
  
      <View
        className=" justify-start items-center w-full ">
              <FlatList
                initialNumToRender={2}
                data={regionStages}
                extraData={loadingStages}
                renderItem={!loadingStages ? renderItem : ()=>{
                  return (
                      <View 
                      style={{
                        height: width / 3.6,
                        width,
                      }}
                      className="flex-1 justify-center items-center">
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
                }}
                contentContainerStyle={{
                  paddingBottom: height * 0.04,
                  // paddingHorizontal: width * 0.07,
                }}
                /* HEADER */
                ListHeaderComponent={renderHeader}
                /* FOOTER */
                ListFooterComponent={renderFooter}
              />
  
      </View>
    );
  }