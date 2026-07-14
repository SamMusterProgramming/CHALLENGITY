
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
import { CardSim } from "lucide-react-native";

export const ViewArenaHeader=({
arenas=[],
selectedArena,
setSelectedArena,
toggleStar,
toggleFollower,
})=>{
const{width}=Dimensions.get("window");
const{user}=useGlobalContext();
const CARD_WIDTH = width * 0.95;
const SPACING = 14;
const SIDE_PADDING = (width - CARD_WIDTH) / 2;
const ITEM_SIZE = CARD_WIDTH + SPACING;

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
            width:CARD_WIDTH,
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
            // contentContainerStyle={{
            //     marginBottom :24
            // }}
            contentContainerStyle={{
                paddingHorizontal: SIDE_PADDING,
                            // paddingRight:
                //     width -
                //     CARD_WIDTH -
                //     SIDE_PADDING,
                paddingTop: 12,
            }}
            ItemSeparatorComponent={() => (
                <View style={{ width: SPACING }} />
            )}
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