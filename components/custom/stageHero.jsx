import { View, Text, ImageBackground, Dimensions } from 'react-native';
import CarouselIndicator from './carouselIndicator';
import { stageIcons } from '../../utilities/TypeData';

export default function StageHero({
  title = "Singing",
  region = "United States",
  flag = "",
  description = "Step into the spotlight and let your voice move the world. This is your moment to shine, to be heard, and to rise.",
  image = "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
}) {


    const { width ,height} = Dimensions.get("window");


  return (
    // <>
        <View className="w-full text-center py-2">
          <Text 
            style={{
                fontSize: width / 40,
                lineHeight: width / 36,
                letterSpacing: 0.3,
              }}
            className="text-white text-center uppercase font-bold py-1  leading-tight">
               {title}{' Stage   '} 
                <Text
                  style={{fontSize:width/39}}
                  className="text-gray-100  font-bold  mb-">
                     {stageIcons[title]} 
                </Text>
          </Text>
          <Text 
                style={{
                  fontSize: width / 32,
                  lineHeight: width / 24,
                  letterSpacing: 0.3,
                }}
                className="text-gray-200 text-center lowercase font-normal leading-relaxed">
                    {description && description}
          </Text>
        </View>
   

  );
}