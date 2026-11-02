import React, {
    useMemo,
  } from "react";
  
  import {
    View,
    Text,
  } from "react-native";
import { useGlobalContext } from "../../../../../context/GlobalProvider";
import ArenaPortalIcon from "../../../../svgIcons/ArenaPortalIcon";
import StagePortalIcon from "../../../../svgIcons/StagePortalIcon";
import SpotlightIcon from "../../../../custom/spotlightIcon";
import RisingStarIcon from "../../../../svgIcons/RisingStarIcon";
import { useProfileSpace } from "../../context/ProfileSpaceContext";
import PerformanceIcon from "../../../../svgIcons/others/PerformanceIcon";
import BadgeIcon from "../../../../svgIcons/others/badgeIcon";
import LegacyOverview from "./LegacyOverview";
  

  
  export default function LegacyStats() {
  
    const {
      userArenas,
      userTalents,
      spacing,
      scale,
    } = useGlobalContext();

    const {
      activeSpace,
      changeSpace,
    } = useProfileSpace();
    
    if (activeSpace !== "legacy") {
      return null;
    }

    const stats = useMemo(
      () => [
        {
          id: "performances",
          label: "PERFORMANCES",
          value: userArenas?.length || 0,
          icon:PerformanceIcon,
        },
       
        {
          id: "spotlights",
          label: "SPOTLIGHTS",
          value: 7,
          icon: RisingStarIcon,
        },
        {
          id: "badges",
          label: "BADGES",
          value: userTalents?.length || 0,
          icon: BadgeIcon,
        },
      ],
      [
        userArenas,
        userTalents,
      ]
    );
  
    return (
      <View
        className="w-full"
        style={{
          paddingHorizontal: spacing(18),
          paddingTop: spacing(4),
          paddingBottom: spacing(18),
        }}
      >
        
     

        <LegacyOverview />
      </View>
    );
  }