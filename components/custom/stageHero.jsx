import { View, Text, ImageBackground } from 'react-native';

export default function StageHero({
  title = "Singing Stage",
  region = "United States",
  flag = "",
  description = "Step into the spotlight and let your voice move the world. This is your moment to shine, to be heard, and to rise.",
  image = "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
}) {
  return (
    <View className="w- full  flex- 1 h -54 roun ded-2xl overflow-hidden">
      
      {/* Background Image */}
      <ImageBackground
        source={{ uri: image }}
        className="flex-1 justify-end"
        resizeMode="cover"
      > 
          
        {/* Dark Gradient Overlay */}
        <View className="absolute inset-0 bg-black/70" />
       
        {/* Content */}
        <View className="p-5">
          
          {/* Region */}
         
        

          {/* Title */}
          <Text className="text-white text-xl font-extrabold leading-tight">
            {title} {'  -  '}
             <Text className="text-gray-300 text-sm uppercase tracki ng-widest mb-1">
               {region} {' '}
                  <Text className="text-gray-300  text-lg  uppercase tracking-widest ">
                   {flag}
                  </Text>
             </Text>
          </Text>
         

          {/* Description */}
          <Text className="text-gray-200 text-sm mt-2 leading-relaxed">
            {description}
          </Text>

        </View>
      </ImageBackground>
    </View>
  );
}