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
    <>

       
  
        <View className="mt- 2 py- 2">
    
          <Text 
            style={{
                fontSize: width / 36,
                lineHeight: width / 24,
                letterSpacing: 0.3,
              }}
            className="text-white uppercase font-bold py-2 leading-tight">
            {title}{' Stage   '} 
                <Text
                style={{fontSize:width/20}}
                className="text-gray-100  font-bold  mb-">
                     {stageIcons[title]} 
                </Text>
          </Text>
          <Text 
                    style={{fontSize:width/35}}
                    className="text-gray-200 lowercase font-normal font-monts errat leading-relaxed">
                        {description}
          </Text>
         

          

        </View>
    </>

  );
}