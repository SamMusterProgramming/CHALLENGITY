// import React, { useEffect, useState } from "react";
// import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// import { countries, stageIcons } from "../../utilities/TypeData";
// import StarArenaButton from "./custom/starArenaButton";
// import FollowArenaButton from "./custom/followArenaButton";
// import { useGlobalContext } from "../../context/GlobalProvider";


// export const ViewArenaHeader = React.memo(
//     ({
//       arenas,
//       selectedArena,
//       setSelectedArena,
//       width,
//       toggleStar,
//       toggleFollower
//     }) => {
//     const PAGE_WIDTH = width;
//     const [arenaIndex, setArenaIndex] = useState(arenas.findIndex(
//         arena => arena._id.toString() === selectedArena._id.toString()
//       ));
//     const {user} = useGlobalContext()

//     const renderItem = ({item})=>{
//         const isStarred = item.isStarred// item.stars?.some(starId => starId.toString() === user._id);
//         const isFollowed = item.isFollower // item.followers?.some(starId => starId.toString() === user._id);

//         return (
//             <View
//               style={{
//                 width,
//               }}
//               className ="items-center justify-center"
//             >
//               <View
//                 style={{
//                   width : width - 32,
//                   backgroundColor:"#111",
//                   borderRadius:9,
//                   overflow:"hidden",
//                   borderWidth:1,
//                   borderColor:
//                   "rgba(234,179,8,0.15)",
//                 //   paddingHorizontal:16,
//                 }}  >
//                 <Image
//                   source={{
//                     uri:
//                     item?.coverImage?.publicUrl,
//                   }}
//                   style={{
//                     width:"100%",
//                     height:150,
//                   }}
//                 />
//                 <View
//                   style={{
//                     padding:16,
//                   }}
//                 >
//                   <View
//                     className="flex-row items-center"  >
//                     <Image
//                       source={{
//                         uri:
//                         item?.profileImage?.publicUrl,
//                       }}
//                       style={{
//                         width:width/5.5,
//                         height:width/5.5,
//                         borderRadius:999,
//                         borderWidth:2,
//                         borderColor:"#eab308",
//                       }}
//                     />
//                     <View
//                       style={{
//                         marginLeft:12,
//                         flex:1,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color:"#fff",
//                           fontWeight:"800",
//                           fontSize:width/26,
//                         }}
//                       >
//                         {item.arenaName}
//                       </Text>
//                       <Text
//                         style={{
//                           color:"#eab308",
//                           marginTop:6,
//                           fontSize:width/30,
//                           fontWeight :800
//                         }}
//                       >
//                         {item.talentType} {'  '} {stageIcons[item.talentType]} {'  .   '} 
//                         <Text
//                         style={{
//                           color:
//                           "rgba(255,255,255,0.5)",
//                           fontSize:width/30,
//                           fontWeight :600
//                         }}  >
//                         {countries.find(c => c.code == item.region)?.name}{'  '} {countries.find(c => c.code == item.region)?.flag}
//                       </Text>
//                       </Text>
//                       {!!item.biography && (
//                         <Text
//                         style={{
//                             color:
//                             "rgba(255,255,255,0.7)",
//                             marginTop:6,
//                             lineHeight:20,
//                         }}
//                         numberOfLines={1}
//                         >
//                         {item.biography} 
//                         </Text>
//                   )}
                   
//                     </View>
//                   </View>
                  
//                   <View
//                    style={{
//                     marginTop: 10,
//                      }}
//                    className = "py- 2 gap- 4 flex-row fle x-1 items-center justify-center">
//                         <StarArenaButton isStarred={isStarred}  width ={width} onPress = {toggleStar} />
//                   </View>
//                   <FollowArenaButton onPress={toggleFollower} width={width} isFollowed = {isFollowed} />

//                   <View
//                         style={{
//                         marginTop: 34,
//                         marginBottom: 18,
//                         // marginHorizontal: 14,
//                         backgroundColor: "#111214",
//                         borderRadius: 9,
//                         // borderWidth: 1,
//                         // borderColor: "rgba(234,179,8,0.12)",
//                         flexDirection: "row",
//                         alignItems : "center",
//                         justifyContent: "space-around",
//                         // paddingVertical: 10,
//                         }}>
//                         <StatItem width={width} value={item.postCount} label="Posts" />
//                         <StatItem width={width} value={item.followerCount} label="Followers" />
//                         <StatItem width={width} value={item.starCount || 0} label="stars" />
//                   </View>

//                 </View>
//               </View>
//             </View>
//           )
//     }


//     return (
//         <View
//         style = {{
//           marginTop: 25,
//           width
//           }}  >
//         <Text
//           style={{
//             color:"#fff",
//             fontSize:width/22,
//             fontWeight:"900",
//             marginLeft:18,
//             marginBottom:16,
//           }} >
//           ARENAS
//         </Text>

//         {/* GOLD DOTS */}

//         {arenas.length > 1 && (
//           <View
//             className="flex-row justify-center items-center"
//             style={{
//               marginBottom:14,
//             }} >
//             {arenas.map((_, index) => (
//               <View
//                 key={index}
//                 style={{
//                   width:
//                     arenaIndex === index
//                       ? 20
//                       : 20,

//                   height:7,
//                   borderRadius:999,
//                   marginHorizontal:4,
//                   backgroundColor:
//                     arenaIndex === index
//                       ? "#eab308"
//                       : "rgba(255,255,255,0.35)",
//                 }}
//               />
//             ))}
//           </View>
//         )}

//         {arenas.length > 1 && (
//           <Text
//             style={{
//               color:"rgba(255,255,255,0.65)",
//               textAlign:"center",
//               marginBottom:14,
//               fontSize:width/34,
//             }}
//           >
//             Swipe to explore arenas
//           </Text>
//         )}

//         <FlatList
//           horizontal
//           pagingEnabled
//           extraData={selectedArena}
//           data = {arenas}
//           keyExtractor={(item) => item._id}
//           showsHorizontalScrollIndicator={false}
//           initialScrollIndex={arenaIndex}
//           onMomentumScrollEnd={(event)=>{
//             const index = Math.round(
//                 event.nativeEvent.contentOffset.x /
//                 PAGE_WIDTH
//               );
//             if(arenaIndex !== index) {
//             setArenaIndex(index);
//             const arena = arenas[index];
//             if(arena){
//               setSelectedArena(arena);
//             }
//            }
//            }}
//           renderItem = {renderItem}
//           getItemLayout={(data, index) => ({
//             length: PAGE_WIDTH,
//             offset: PAGE_WIDTH * index,
//             index,
//           })}
//         />
//       </View>
//       );
//     }
//   );


//   function StatItem({ width,value, label }) {
//     return (
//       <View
//         style={{
//           alignItems: "center",
//         //   width:width/4,
//         //   height:width/4
//         }}
//         className = "items-center justify-center rounde d-full  "
//       >
//         <Text
//           style={{
//             color: "#FFFFFF",
//             fontSize: width/26 ,
//             fontWeight: "800",
//           }}
//         >
//           {value}
//         </Text>
  
//         <Text
//           style={{
//             color: "#c7c3c3",
//             marginTop: 6,
//             fontSize: width/34,
//             letterSpacing: 0.5,
//             fontWeight:"600"
//           }}
//         >
//           {label}
//         </Text>
//       </View>
//     );
//   }

import React,{useEffect,useRef,useState}from"react";
import{
View,
Text,
Image,
FlatList,
TouchableOpacity,
Dimensions,
}from"react-native";
import{LinearGradient}from"expo-linear-gradient";
import{MaterialCommunityIcons}from"@expo/vector-icons";
import{countries,stageIcons}from"../../utilities/TypeData";
import{useGlobalContext}from"../../context/GlobalProvider";
import StarArenaButton from"./custom/starArenaButton";
import FollowArenaButton from"./custom/followArenaButton";

export const ViewArenaHeader=({
arenas=[],
selectedArena,
setSelectedArena,
toggleStar,
toggleFollower,
})=>{
const{width}=Dimensions.get("window");
const{user}=useGlobalContext();
const SPACING = 8;
const CARD_WIDTH = width - SPACING * 2;
const flatListRef=useRef(null);
const[index,setIndex]=useState(0);

const emptyArray = () => {
     const remaingWidth = width - width / 4 
     const numberSquare = Math.round(remaingWidth / 36) - arenas.length
     let array = []
     for (let index = 0; index < numberSquare; index++) {
          array.push(index)
     }
     return array 
}

useEffect(()=>{
    if(!selectedArena||arenas.length===0)return;
        const i=arenas.findIndex(
        arena=>arena._id?.toString()===selectedArena._id?.toString()
    );
    if(i!==-1){
        setIndex(i);
        flatListRef.current?.scrollToIndex({
        index:i,
        animated:false,
    });
    }
},[selectedArena]);

const renderStat=(value,label)=>{

    return(
        <View
            style={{
            alignItems:"center",
            // flex:1,
        }}
        >

            <Text
                style={{
                color:"#FFF",
                fontSize:20,
                fontWeight:"900",
            }}
            >
                {value??0}
            </Text>

            <Text
                style={{
                marginTop:4,
                fontSize:12,
                fontWeight:"600",
                color:"rgba(255,255,255,.55)",
            }}
            >
                {label}
            </Text>

        </View>

    );

};

const renderArena=({item})=>{
const isSelected=
selectedArena?._id?.toString()===
item._id?.toString();
const isStarred=item.isStarred;
const isFollowed=item.isFollower;

const country=
countries.find(
c=>c.code===item.region
);

return(
    <View
    style={{
        width,
        alignItems:"center",
        // marginHorizontal:8,
    }}
    // className = "justify-center items-center"
    >
    
    <View
        activeOpacity={0.96}
        onPress={() => setSelectedArena(item)}
        style = {{
            width:width,
            borderRadius:6,
            overflow:"hidden",
            backgroundColor:"#111214",
            borderWidth:1,
            // borderColor:
            //     selectedArena?._id?.toString() === item._id?.toString()
            //     ? "rgba(255,255,255,.18) "//"rgba(234,179,8,.75)"
            //     : "rgba(255,255,255,.18)",
        }} >
            
            <View
            className = "absolute ">
                <Image
                    source={{
                    uri:item?.coverImage?.publicUrl,
                    }}
                    resizeMode="cover"
                    style={{
                        width:width,
                        height :  CARD_WIDTH  ,
                    }}
                />
                
                <LinearGradient
                    colors={[
                        "#111214",
                        "rgba(17, 18, 20,.92)",
                        "rgba(17, 18, 20,.75)",
                        "rgba(17, 18, 20,.45)",
                        "rgba(17, 18, 20,.18)",
                        "transparent",
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: width / 1.3,
                    }}
                />

                <Image
                    source={{
                    uri:item?.profileImage?.publicUrl,
                    }}
                    style={{
                    position:"absolute",
                    right:22,
                    top:18,
                    width:width/7,
                    height:width/7,
                    borderRadius:50,
                    // borderWidth:3,
                    // borderColor:"#eab308",
                    backgroundColor:"#111",
                    }}
                />
                 <View
                style={{
                // flex:1,
                position:"absolute",
                right:0,
                top:0,
                }}
                >
                    <StarArenaButton
                    width={CARD_WIDTH}
                    isStarred={isStarred}
                    onPress={toggleStar}
                    />
                </View>

            </View>
            <LinearGradient
                    colors={[
                    "transparent",
                    "rgba(17, 18, 20,.45)",
                    "rgba(17, 18, 20,.85)",
                    "#111214",
                    ]}
                    style={{
                    position:"absolute",
                    left:0,
                    right:0,
                    bottom:0,
                    height:CARD_WIDTH,
                    }}
                />
            {/* <View
                style={{
                // flex:1,
                position:"absolute",
                right:0,
                top:0,
                }}
                >
                    <StarArenaButton
                    width={CARD_WIDTH}
                    isStarred={isStarred}
                    onPress={toggleStar}
                    />
            </View> */}

            <View
            style={{
            paddingHorizontal:22,
            paddingTop:18,
            paddingBottom:22,
            }}
            >
                <View
                style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                }}
                >
                    <View style={{flex:1}}>

                        <Text
                        numberOfLines={1}
                        style={{
                        color:"#FFF",
                        fontSize:width/25,
                        fontWeight:"900",
                        }}
                        >
                        {item.arenaName} 
                        </Text>

                        <Text
                        style={{
                        marginTop:12,
                        fontSize:width/30,
                        fontWeight:"700",
                        color:"#eab308",
                        }}
                        >
                            {item.talentType}
                            {"   "}
                            {stageIcons[item.talentType]}
                            {"   •   "}

                        <Text
                        style={{
                        color:"rgba(255,255,255,1)",
                        fontWeight:"700",
                        }}
                        >
                            {country?.name}
                            {" "}
                            {country?.flag}
                        </Text>

                        </Text>

                    </View>

                    {item.verified&&(

                    <View
                    style={{
                    width:34,
                    height:34,
                    borderRadius:17,
                    backgroundColor:"#eab308",
                    justifyContent:"center",
                    alignItems:"center",
                    }}
                    >

                    <MaterialCommunityIcons
                    name="check-bold"
                    size={18}
                    color="#000"
                    />

                    </View>

                    )}

                </View>

                {!!item.biography&&(
                    <Text
                        numberOfLines={1}
                        style={{
                        marginTop:10,
                        fontSize:width/34,
                        lineHeight:22,
                        fontWeight : '700',
                        color:"rgba(255,255,255,1)",
                        width : width /1.5
                        }}
                    >
                        {item.biography}
                    </Text>
                )}
                {/* {!!item.description&&(
                <Text
                numberOfLines={3}
                style={{
                marginTop:10,
                fontSize:13,
                lineHeight:21,
                color:"rgba(255,255,255,.55)",
                }}
                >
                {item.description}
                </Text>
                )} */}
                <View
                style={{
                marginTop:22,
                paddingTop:20,
                borderTopWidth:3,
                borderColor:"rgba(255,255,255,.08)",
                flexDirection:"row",
                flex :1
                }}
                className = "justify-between"
                >
                    {renderStat(item.postCount,"Performances")}
                    {renderStat(item.followerCount,"Followers")}
                    {renderStat(item.starCount,"Stars")}
                    {/* {renderStat(item.viewCount,"Views")} */}
                </View>
                <View
                style={{
                marginTop:22,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                }}
                >
                {/* <View
                style={{
                flex:1,
                marginRight:8,
                }}
                >
                    <StarArenaButton
                    width={CARD_WIDTH}
                    isStarred={isStarred}
                    onPress={toggleStar}
                    />
                </View> */}
                <View
                style={{
                flex:1,
                }}
                >
                    <FollowArenaButton
                    width={CARD_WIDTH}
                    isFollowed={isFollowed}
                    onPress={toggleFollower}
                    />
                </View>
        </View>

</View>

</View>
 </View>

);

};
return (
    <View style={{marginTop:0 ,
                //   marginBottom :24
              
    }}>
    
    {/* TITLE */}
    {/* <Text
    style={{
    color:"#fff",
    fontSize:18,
    fontWeight:"900",
    marginLeft:16,
    marginBottom:14,
    }}
    >
    ARENAS
    </Text> */}
    
        {/* INDICATOR SQUARES */}
        <View
            style={{
                flex:1,
            flexDirection:"row",
            justifyContent:"start",
            paddingTop:12,
            paddingBottom:24,
            paddingHorizontal:8,
            backgroundColor:"#000000",
            width
            }}
            className = "items-end" >
            <Text
                style={{
                color:"#fff",
                fontSize:width/29,
                fontWeight:"900",
                marginRight:16,
                // marginBottom:14,
                }}
                >
                ARENAS
            </Text>
            {arenas.map((a,i)=>{
                const isActive=
                selectedArena?._id?.toString()===
                a._id?.toString();
                return(
                    <View
                    key={a._id}
                    style={{
                    width:isActive?28:28,
                    height:14,
                    borderRadius:2,
                    marginHorizontal:4,
                    marginBottom :2,
                    backgroundColor:isActive
                    ?"#eab308"
                    :"rgba(255,255,255,.92)",
                    }}
                    />
                );
            })}
            {emptyArray().map((a,i)=>{
                return(
                    <View
                    key={a}
                    style={{
                    width:28,
                    height:14,
                    borderRadius:2,
                    marginHorizontal:4,
                    marginBottom :2,
                    backgroundColor: "rgba(255,255,255,.2)",
                    }}
                    />
                );
            })}
        </View>

        {/* HORIZONTAL ARENAS */}
      <View
        style={{
            width,
            alignItems:"center",
            backgroundColor:"#111214",
        }}
        className = "justify-center items-center rounded-xl"
        >
        <FlatList
            horizontal
            pagingEnabled = {true}
            data={arenas}
            keyExtractor={(item) => item._id}
            renderItem={renderArena}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginBottom :24
            }}
            // ItemSeparatorComponent={() => (
            //     <View style={{ width:8 }} />
            // )}
            onMomentumScrollEnd={(e) => {
                const page = Math.round(
                    e.nativeEvent.contentOffset.x / (CARD_WIDTH + 12)
                );

                if (arenas[page]) {
                    setSelectedArena(arenas[page]);
                }
            }}
        />
      </View>
        </View>
    );
    };