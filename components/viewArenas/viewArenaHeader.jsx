import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { countries, stageIcons } from "../../utilities/TypeData";
import StarArenaButton from "./custom/starArenaButton";
import FollowArenaButton from "./custom/followArenaButton";
import { useGlobalContext } from "../../context/GlobalProvider";


export const ViewArenaHeader = React.memo(
    ({
      arenas,
      selectedArena,
      setSelectedArena,
      width,
      toggleStar,
      toggleFollower
    }) => {
    const PAGE_WIDTH = width;
    const [arenaIndex, setArenaIndex] = useState(arenas.findIndex(
        arena => arena._id.toString() === selectedArena._id.toString()
      ));
    const {user} = useGlobalContext()

    const renderItem = ({item})=>{
        const isStarred = item.stars?.some(starId => starId.toString() === user._id);
        const isFollowed = item.followers?.some(starId => starId.toString() === user._id);

        return (
            <View
              style={{
                width,
              }}
              className ="items-center justify-center"
            >
              <View
                style={{
                  width : width - 32,
                  backgroundColor:"#111",
                  borderRadius:9,
                  overflow:"hidden",
                  borderWidth:1,
                  borderColor:
                  "rgba(234,179,8,0.15)",
                //   paddingHorizontal:16,
                }}  >
                <Image
                  source={{
                    uri:
                    item?.coverImage?.publicUrl,
                  }}
                  style={{
                    width:"100%",
                    height:150,
                  }}
                />
                <View
                  style={{
                    padding:16,
                  }}
                >
                  <View
                    className="flex-row items-center"  >
                    <Image
                      source={{
                        uri:
                        item?.profileImage?.publicUrl,
                      }}
                      style={{
                        width:width/5.5,
                        height:width/5.5,
                        borderRadius:999,
                        borderWidth:2,
                        borderColor:"#eab308",
                      }}
                    />
                    <View
                      style={{
                        marginLeft:12,
                        flex:1,
                      }}
                    >
                      <Text
                        style={{
                          color:"#fff",
                          fontWeight:"800",
                          fontSize:width/26,
                        }}
                      >
                        {item.arenaName}
                      </Text>
                      <Text
                        style={{
                          color:"#eab308",
                          marginTop:6,
                          fontSize:width/30,
                          fontWeight :800
                        }}
                      >
                        {item.talentType} {'  '} {stageIcons[item.talentType]} {'  .   '} 
                        <Text
                        style={{
                          color:
                          "rgba(255,255,255,0.5)",
                          fontSize:width/30,
                          fontWeight :600
                        }}  >
                        {countries.find(c => c.code == item.region)?.name}{'  '} {countries.find(c => c.code == item.region)?.flag}
                      </Text>
                      </Text>
                      {!!item.biography && (
                        <Text
                        style={{
                            color:
                            "rgba(255,255,255,0.7)",
                            marginTop:6,
                            lineHeight:20,
                        }}
                        numberOfLines={1}
                        >
                        {item.biography} 
                        </Text>
                  )}
                   
                    </View>
                  </View>
                  
                  <View
                   style={{
                    marginTop: 10,
                     }}
                   className = "py- 2 gap- 4 flex-row fle x-1 items-center justify-center">
                        <StarArenaButton isStarred={isStarred}  width ={width} onPress = {toggleStar} />
                  </View>
                  <FollowArenaButton onPress={toggleFollower} width={width} isFollowed = {isFollowed} />

                  <View
                        style={{
                        marginTop: 34,
                        marginBottom: 18,
                        // marginHorizontal: 14,
                        backgroundColor: "#111214",
                        borderRadius: 9,
                        // borderWidth: 1,
                        // borderColor: "rgba(234,179,8,0.12)",
                        flexDirection: "row",
                        alignItems : "center",
                        justifyContent: "space-around",
                        // paddingVertical: 10,
                        }}>
                        <StatItem width={width} value={item.posts.length} label="Posts" />
                        <StatItem width={width} value={item.followers.length} label="Followers" />
                        <StatItem width={width} value={item.stars?.length || 0} label="stars" />
                  </View>

                </View>
              </View>
            </View>
          )
    }


    return (
        <View
        style = {{
          marginTop: 25,
          width
          }}  >
        <Text
          style={{
            color:"#fff",
            fontSize:width/22,
            fontWeight:"900",
            marginLeft:18,
            marginBottom:16,
          }} >
          ARENAS
        </Text>

        {/* GOLD DOTS */}

        {arenas.length > 1 && (
          <View
            className="flex-row justify-center items-center"
            style={{
              marginBottom:14,
            }} >
            {arenas.map((_, index) => (
              <View
                key={index}
                style={{
                  width:
                    arenaIndex === index
                      ? 20
                      : 20,

                  height:7,
                  borderRadius:999,
                  marginHorizontal:4,
                  backgroundColor:
                    arenaIndex === index
                      ? "#eab308"
                      : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </View>
        )}

        {arenas.length > 1 && (
          <Text
            style={{
              color:"rgba(255,255,255,0.65)",
              textAlign:"center",
              marginBottom:14,
              fontSize:width/34,
            }}
          >
            Swipe to explore arenas
          </Text>
        )}

        <FlatList
          horizontal
          pagingEnabled
          extraData={selectedArena}
          data = {arenas}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={arenaIndex}
          onMomentumScrollEnd={(event)=>{
            const index = Math.round(
                event.nativeEvent.contentOffset.x /
                PAGE_WIDTH
              );
            if(arenaIndex !== index) {
            setArenaIndex(index);
            const arena = arenas[index];
            if(arena){
              setSelectedArena(arena);
            }
           }
           }}
          renderItem = {renderItem}
          getItemLayout={(data, index) => ({
            length: PAGE_WIDTH,
            offset: PAGE_WIDTH * index,
            index,
          })}
        />
      </View>
      );
    }
  );


  function StatItem({ width,value, label }) {
    return (
      <View
        style={{
          alignItems: "center",
        //   width:width/4,
        //   height:width/4
        }}
        className = "items-center justify-center rounde d-full  "
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: width/26 ,
            fontWeight: "800",
          }}
        >
          {value}
        </Text>
  
        <Text
          style={{
            color: "#c7c3c3",
            marginTop: 6,
            fontSize: width/34,
            letterSpacing: 0.5,
            fontWeight:"600"
          }}
        >
          {label}
        </Text>
      </View>
    );
  }