
import React from "react";
import { Image } from "react-native";



export const talentImages = {
    singing: require("../../assets/talent/singing.jpg"),
    rapping: require("../../assets/talentIcons/rapping.webp"),
    beatboxing: require("../../assets/talent/beatboxing.jpeg"),
    guitar: require("../../assets/talentIcons/guitar.webp"),
    piano: require("../../assets/talentIcons/piano.webp"),
    violin: require("../../assets/talentIcons/violin.webp"),
    drumming: require("../../assets/talentIcons/drumming.webp"),
    djing: require("../../assets/talentIcons/djing.webp"),
    flute: require("../../assets/talentIcons/flute.webp"),
  
    dancing: require("../../assets/talentIcons/dancing.webp"),
    fitness: require("../../assets/talentIcons/fitness.webp"),
    acrobatics: require("../../assets/talentIcons/acrobatics.webp"),
    karate: require("../../assets/talentIcons/karate.webp"),
    parkour: require("../../assets/talentIcons/parkour.webp"),
    skating: require("../../assets/talentIcons/skating.webp"),
    yoga: require("../../assets/talentIcons/yoga.webp"),
  
    magic: require("../../assets/talentIcons/magic.webp"),
    mentalism: require("../../assets/talentIcons/mentalism.webp"),
    comedy: require("../../assets/talentIcons/comedy.webp"),
    // acting: require("../../assets/talentIcons/acting.webp"),
    ventriloquism: require("../../assets/talentIcons/ventriloquism.webp"),
    juggling: require("../../assets/talentIcons/juggling.webp"),
    puppetry: require("../../assets/talentIcons/puppetry.webp"),
    stunts: require("../../assets/talentIcons/stunts.webp"),
    talespin: require("../../assets/talentIcons/talespin.webp"),
  
    art: require("../../assets/talentIcons/art.webp"),
    photography: require("../../assets/talentIcons/photography.webp"),
    filmmaking: require("../../assets/talentIcons/filmmaking.webp"),
    animation: require("../../assets/talentIcons/animation.webp"),
    design: require("../../assets/talent/design.jpg"),
    fashion: require("../../assets/talentIcons/modeling.webp"),
    makeup: require("../../assets/talentIcons/makeup.webp"),
  
    tech: require("../../assets/talentIcons/tech.webp"),
    // modeling: require("../../assets/talentIcons/modeling.webp"),
    eating: require("../../assets/talentIcons/eating.webp"),
    cooking: require("../../assets/talentIcons/cooking.webp"),
    speedcubing: require("../../assets/talentIcons/speedcubing.webp"),
    whistling: require("../../assets/talentIcons/whistling.webp"),
  };
  
export default function TalentIconSelector({ code, size = 32 }) {
    const normalizedCode = code?.toLowerCase()?.trim();
  
    if (!normalizedCode) return null;
  
    const source = talentImages[normalizedCode];
  
    if (!source) return null;
  
    return (
      <Image
        source={source}
        style={{
          width: size,
          height: size,
        //   borderRadius : 999
        }}
        resizeMode="contain"
      />
    );
  }

