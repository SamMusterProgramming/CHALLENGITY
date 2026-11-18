import React from "react";
import SingingIcon from "../svgIcons/talent/SingingIcon";
import InstrumentalIcon from "../svgIcons/talent/instrumentalIcon";
import MagicIcon from "../svgIcons/talent/MagicIcon";
import DancingIcon from "../svgIcons/talent/DancingIcon";
import ComedyIcon from "../svgIcons/talent/ComedyIcon";
import FitnessIcon from "../svgIcons/talent/FitnessIcon";
import ArtIcon from "../svgIcons/talent/ArtIcon";
import SportIcon from "../svgIcons/talent/sportIcon";
import GuitarIcon from "../svgIcons/talent/guitarIcon";
import RappingIcon from "../svgIcons/talent/rappingIcon";
import BeatboxingIcon from "../svgIcons/talent/beatBoxingIcon";
import ViolinIcon from "../svgIcons/talent/violinIcon";
import DrummingIcon from "../svgIcons/talent/drummingIcon";
import DJingIcon from "../svgIcons/talent/djingIcon";
import BeatMakingIcon from "../svgIcons/talent/beatMakingIcon";
import AcrobaticsIcon from "../svgIcons/talent/acrobaticsIcon";
import KarateIcon from "../svgIcons/talent/karateIcon";
import ParkourIcon from "../svgIcons/talent/parkourIcon";
import SkatingIcon from "../svgIcons/talent/skatingIcon";
import YogaIcon from "../svgIcons/talent/yogaIcon";
import MentalismIcon from "../svgIcons/talent/mentalismIcon";
import ActingIcon from "../svgIcons/talent/actingIcon";
import VentriloquistIcon from "../svgIcons/talent/ventriloquistIcon";


const TalentIcon = ({
  talent,
  size = 32,
  color,
  strokeWidth,
}) => {
  const icons = {
    singing: SingingIcon,
    piano: InstrumentalIcon,
    magic: MagicIcon,
    dancing: DancingIcon,
    comedy: ComedyIcon ,
    fitness : FitnessIcon ,
    art : ArtIcon ,
    sport : SportIcon,
    guitar:GuitarIcon,
    rapping : RappingIcon,
    beatboxing : BeatboxingIcon,
    violin : ViolinIcon,
    drumming : DrummingIcon,
    djing : DJingIcon,
    beatmaking : BeatMakingIcon,
    acrobatics: AcrobaticsIcon,
    karate : KarateIcon,
    parkour : ParkourIcon,
    skating : SkatingIcon,
    yoga : YogaIcon,
    mentalism : MentalismIcon,
    acting : ActingIcon,
    ventriloquism : VentriloquistIcon
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