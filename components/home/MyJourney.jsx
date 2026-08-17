import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import ArenaCard from "../viewArenas/displayArena/arenaCard";
import StageDisplayer from "../talent/stageDisplayer";
import PerformanceRepresentation from "../spotlight/performance/performanceRepresentation";
import UserPerformanceRepresentation from "../myJourney/userPerformanceReprentation";
import StageJourneyCard from "../myJourney/StageJourneyCard";
import { extractStageEntries } from "../../helper";
import ArenaJourneyCard from "../myJourney/ArenaJourneyCard";
import { router } from "expo-router";

export default function MyJourney({ onScroll }) {
  const {
    user,
    userTalents,
    userArenas,
  } = useGlobalContext();
  const { width, height } = useWindowDimensions();
  const [section, setSection] = useState("arenas");
  const [performancesData , setPerformancesData] = useState([])

  const stats = useMemo(() => {
    const arenas = userArenas?.length || 0;
    const competitions = userTalents?.length || 0;
    const arenaPerformances =
      userArenas?.reduce(
        (total, arena) => total + (arena.posts?.length || 0),
        0
      )  + 
      userTalents?.reduce (
        (total, stage) => total + ( 
              stage.contestants.find(c => c.user_id.toString() == user._id)?.performances.length ||
              stage.queue.find(c => c.user_id == user._id)?.performances.length ||
              stage.eliminations.find(c => c.user_id == user._id)?.performances.length ) , 0
      ) || 0
      ;
    return {   
      arenas,
      competitions,
      performances: arenaPerformances,
    };
  }, [userArenas, userTalents]);


  useEffect(() => {
    let arenaPosts = []
    userArenas.map((a) =>{
        a.posts.map(p =>{
         let post = {...p, 
             src: "arena",
             arenaName :a.arenaName ,
             talentType : a.talentType ,
             region : a.region ,
             profileImage : a.profileImage,
             owner_id : a.owner._id,
            //  arena : a
           }  
         arenaPosts.push(post)
        })
     })
    let stagePosts = []
    userTalents.map( stage => {
        stage.contestants?.find(c => c.user_id == user._id)?.performances?.map(p =>{
            let post = {...p, 
                src: "stage",
                status : "On Stage",
                stageName :stage.name ,
                talentType : stage.name ,
                region : stage.region ,
                owner_id : user._id
              }  
            stagePosts.push(post)
       })
       stage.queue?.find(c => c.user_id == user._id)?.performances?.map(p =>{
        let post = {...p, 
            src: "stage",
            status : "In Queue",
            stageName :stage.name ,
            talentType : stage.name ,
            region : stage.region ,
            owner_id : user._id
          }  
        stagePosts.push(post)
       })
       stage.eliminations?.find(c => c.user_id == user._id)?.performances?.map(p =>{
        let post = {...p, 
            src: "stage",
            status : "In Queue",
            stageName :stage.name ,
            talentType : stage.name ,
            region : stage.region ,
            owner_id : user._id
          }  
        stagePosts.push(post)
       })

    }) 
    arenaPosts.push(...stagePosts)
    setPerformancesData(arenaPosts)
  }, [userArenas, userTalents])
  
  // const arenaData = userArenas
  // const content = []
  // content.push(...userArenas)
  // content.push(...extractStageEntries(userTalents , user._id))
  
  const content = useMemo(() => {
    const arenas = (userArenas || []).map((arena) => ({
      ...arena,
      src: "arena",
    }));
  
    const stages = extractStageEntries(
      userTalents || [],
      user?._id
    ).map((stage) => ({
      ...stage,
      src: "stage",
    }));
  
    return [...arenas, ...stages].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    );
  }, [userArenas, userTalents, user?._id]);

  const listData = useMemo(
    () => [
      {
        _id: "journey-header",
        type: "header",
      },
      {
        _id: "journey-tabs",
        type: "tabs",
      },
      ...content.map((item) => ({
        ...item,
        type: "content",
      })),
    ],
    [content]
  );

  const canScroll = useMemo(() => {
    return (content?.length || 0) > 1;
  }, [section, userArenas, userTalents]);


  const openStage = (entry) =>{

    router.push({
      pathname: "TalentContestRoom",
      params: {
        region: entry.stage.region,
        selectedTalent: entry.stage.name,
        // selectedIcon: getIcon(userTalent.name),
        // regionIcon: getIcon(userTalent.region),
        startIntroduction: "true",
        showGo: "true",
        location: "contest",
        contestant_id: user?._id ?? null,
        startPlayer : "true"
      },
    })
  }

  const openArena = (entry) =>{
    router.push({
      pathname:
        "/arenaDisplayer",
      params: {
        arena_id:
          entry._id,
      },
    });
  }



  const renderItem = ({ item }) => {
    /*
     * HEADER + STATS
     */
    if (item.type === "header") {
      return (
        <View
          style={{
            backgroundColor: "#000",
            paddingTop: 15,
            paddingHorizontal: 12,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: width / 23,
              fontWeight: "900",
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            MY JOURNEY
          </Text>
        </View>
      );
    }

    if (item.type === "tabs") {
      return (
        <View
          style={{
            backgroundColor: "#000",
            paddingTop: 15,
            // paddingHorizontal: 12,
            paddingBottom: 15,
          }}
        >
            <View
            style={{
              flexDirection: "row",
              // paddingBottom: 15,
              paddingVertical: 8,
              borderRadius: 5,
              backgroundColor: "#101010",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.06)",
              width:width * 0.95,
              alignSelf : "center"
            }} >
              <JourneyStat
                icon="stadium-outline"
                value={stats.arenas}
                label="ARENAS"
                width={width}
              />

              <JourneyStat
                icon="trophy-outline"
                value={stats.competitions}
                label="STAGES"
                width={width}
              />

              <JourneyStat
                icon="movie-open-play-outline"
                value={stats.performances}
                label="PERFORMANCES"
                width={width}
              />
          </View>
        </View>
      );
    }

   

    if (item.src === "arena" ) {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <ArenaJourneyCard
                entry={item}
                width={width * 0.95}
                height={width / 2}
                onPress={openArena}
                onPerformancePress={(performance, entry) => {
                
                }}
                />
        
        </View>
      );
    }

    if (item.src === "stage") {
        return (
        <View
            style={{
            width: "100%",
            alignItems: "center",
            marginBottom: 14,
            }}
        >
            <StageJourneyCard
                entry={item}
                width={width * 0.95}
                height={width / 2}
                onPress={openStage}
                onPerformancePress={(performance, entry) => {
                    // Open individual performance
            
                }}
                />
        </View>
        );
    }

    return(
      <EmptyJourney
      onCreateArena={handleCreateArena}
      onExploreStages={handleExploreStages}
    />
     )
   
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    >
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={canScroll}
        // onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: height * 0.04,
        }}
        ListEmptyComponent={
          <EmptyJourney
            section={section}
            width={width}
          />
        }
      />
    </View>
  );
}

function JourneyStat({
  icon,
  value,
  label,
  width,
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={width / 24}
          color="#EAB308"
        />

        <Text
          style={{
            marginLeft: 7,
            color: "#FFF",
            fontSize: width / 30,
            fontWeight: "900",
          }}
        >
          {value}
        </Text>
      </View>

      <Text
        style={{
          marginTop: 5,
          color: "rgba(255,255,255,0.4)",
          fontSize: width / 39,
          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function JourneyTab({
  active,
  icon,
  label,
  onPress,
  width,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 44,
        borderRadius: 9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active
          ? "rgba(234,179,8,0.14)"
          : "transparent",
      }}
    >
      <MaterialCommunityIcons
        name={active ? icon : `${icon}-outline`}
        size={19}
        color={
          active
            ? "#EAB308"
            : "rgba(255,255,255,0.45)"
        }
      />

      <Text
        style={{
          marginLeft: 7,
          color: active
            ? "#EAB308"
            : "rgba(255,255,255,0.55)",
          fontSize: width / 34,
          fontWeight: "800",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// function EmptyJourney({
//   section,
//   width,
// }) {
//   const isCreations = section === "creations";

//   return (
//     <View
//       style={{
//         alignItems: "center",
//         justifyContent: "center",
//         paddingTop: width * 0.25,
//       }}
//     >
//       <MaterialCommunityIcons
//         name={
//           isCreations
//             ? "stadium-outline"
//             : "trophy-outline"
//         }
//         size={46}
//         color="rgba(234,179,8,0.55)"
//       />

//       <Text
//         style={{
//           marginTop: 14,
//           color: "rgba(255,255,255,0.7)",
//           fontSize: width / 29,
//           fontWeight: "700",
//         }}
//       >
//         {isCreations
//           ? "No arenas yet"
//           : "No competitions yet"}
//       </Text>
//     </View>
//   );
// }

const EmptyJourney = ({
  onCreateArena,
  onExploreStages,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-8">

      {/* Icon */}
      <View className="mb-6 h-[72px] w-[72px] items-center justify-center rounded-[24px] border border-yellow-500/20 bg-yellow-500/[0.07]">
        <Ionicons
          name="trophy-outline"
          size={34}
          color="#EAB308"
        />
      </View>

      {/* Title */}
      <Text className="text-center text-[22px] font-bold tracking-[-0.3px] text-white">
        Your journey starts here
      </Text>

      {/* Description */}
      <Text className="mt-3 max-w-[300px] text-center text-[13px] font-medium leading-[20px] text-white/45">
        Create your own arena or step onto a stage
        and make your first performance.
      </Text>

      {/* Primary action */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onCreateArena}
        className="mt-7 h-[48px] w-full max-w-[260px] flex-row items-center justify-center rounded-[15px] bg-yellow-500"
      >
        <Ionicons
          name="add"
          size={19}
          color="#111111"
        />

        <Text className="ml-2 text-[13px] font-bold text-[#111111]">
          Create an Arena
        </Text>
      </TouchableOpacity>

      {/* Secondary action */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onExploreStages}
        className="mt-4 flex-row items-center"
      >
        <Text className="text-[12px] font-semibold text-white/60">
          Explore Stages
        </Text>

        <Ionicons
          name="arrow-forward"
          size={14}
          color="rgba(255,255,255,0.55)"
          style={{
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>

    </View>
  );
};
