import React from "react";
import SingingIcon from "../svgIcons/talent/SingingIcon";
import InstrumentalIcon from "../svgIcons/talent/instrumentalIcon";
import MagicIcon from "../svgIcons/talent/MagicIcon";
import DancingIcon from "../svgIcons/talent/DancingIcon";
import ComedyIcon from "../svgIcons/talent/ComedyIcon";
import FitnessIcon from "../svgIcons/talent/FitnessIcon";
import ArtIcon from "../svgIcons/talent/ArtIcon";
import SportIcon from "../svgIcons/talent/sportIcon";


const TalentIcon = ({
  talent,
  size = 32,
  color,
  strokeWidth,
}) => {
  const icons = {
    singing: SingingIcon,
    melody: InstrumentalIcon,
    magic: MagicIcon,
    dancing: DancingIcon,
    comedy: ComedyIcon ,
    fitness : FitnessIcon ,
    art : ArtIcon ,
    sport : SportIcon
  };

  const Icon = icons[talent?.toLowerCase()];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      size={size}
      {...(color !== undefined ? { color } : {})}
      {...(strokeWidth !== undefined ? { strokeWidth } : {})}
    />
  );
};

export default TalentIcon;