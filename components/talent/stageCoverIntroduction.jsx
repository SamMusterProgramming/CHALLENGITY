import React, { useEffect, useMemo } from 'react';
import { View, Text, Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { MotiView, AnimatePresence } from 'moti';
import { Image } from 'react-native';
import { AnimatedCard } from './animatedCard';
import { countries } from '../../utilities/TypeData';
import { images } from '../../constants';

const { width, height } = Dimensions.get('window');

const stageIcons = {
  Singing: '🎤',
  Comedy: '😂',
  Fitness: '💪',
  Sports: '🏆',
  Melody: '🎸',
};

const regionFlags = {
  Asia: '🌏',
  Europe: '🌍',
  Africa: '🌍',
  America: '🌎',
  USA: '🇺🇸',
  Canada: '🇨🇦',
};

// const AnimatedCard = ({ contestant, index }) => {
//   const translateX = useSharedValue(-width);
//   const translateY = useSharedValue(-height / 2);
//   const rotate = useSharedValue(-20);
//   const scale = useSharedValue(0.6);

//   useEffect(() => {
//     const delay = 1200 + index * 500;

//     translateX.value = withDelay(
//       delay,
//       withSpring(index * 90 - width / 3, {
//         damping: 14,
//         stiffness: 90,
//       })
//     );

//     translateY.value = withDelay(
//       delay,
//       withSpring(0, {
//         damping: 12,
//       })
//     );

//     rotate.value = withDelay(
//       delay,
//       withTiming(0, {
//         duration: 800,
//         easing: Easing.out(Easing.exp),
//       })
//     );

//     scale.value = withDelay(
//       delay,
//       withSpring(1, {
//         damping: 10,
//       })
//     );
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: translateX.value },
//       { translateY: translateY.value },
//       { rotate: `${rotate.value}deg` },
//       { scale: scale.value },
//     ],
//   }));

//   return (
//     <Animated.View
//       style={[
//         {
//           position: 'absolute',
//           bottom: 40,
//           left: width / 2 - 40,
//         },
//         animatedStyle,
//       ]}
//     >
//       <View
//         style={{
//           width: 72,
//           alignItems: 'center',
//         }}
//       >
//         <View
//           style={{
//             width: 64,
//             height: 64,
//             borderRadius: 32,
//             overflow: 'hidden',
//             borderWidth: 2,
//             borderColor: '#facc15',
//             backgroundColor: '#111',
//             shadowColor: '#facc15',
//             shadowOpacity: 0.8,
//             shadowRadius: 12,
//             elevation: 12,
//           }}
//         >
//           <Image
//             source={{
//               uri:
//                 contestant?.performances?.[0]?.thumbnail?.publicUrl ||
//                 'https://picsum.photos/200',
//             }}
//             resizeMode="cover"
//             style={{ width: '100%', height: '100%' }}
//           />
//         </View>

//         <Text
//           numberOfLines={1}
//           style={{
//             marginTop: 6,
//             color: 'white',
//             fontWeight: '900',
//             fontSize: width/45,
//             letterSpacing: 1,
//             textShadowColor: 'black',
//             textShadowOffset: { width: 0, height: 2 },
//             textShadowRadius: 6,
//           }}
//         >
//           {contestant?.name || 'CONTESTANT'}
//         </Text>
//       </View>
//     </Animated.View>
//   );
// };


export default function StageCoverIntroduction({
  stageData,
  onFinish,
  visible = true,
}) {
  const contestants = useMemo(
    () => stageData?.contestants || [],
    [stageData]
  );

  useEffect(() => {
    const duration = Math.max(5500, contestants.length * 600 + 3000);

    const timer = setTimeout(() => {
      onFinish?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [contestants]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <MotiView
        from = {{ opacity: 0 }}
        animate = {{ opacity: 1 }}
        // exit = {{ opacity: 0 }}
        transition = {{ type: 'timing', duration: 600 }}
        style = {{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          zIndex: 9999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* BACKGROUND */}
        <Image
          source={{
            uri:
              'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop',
          }}
          resizeMode="cover"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.35,
          }}
        />

        {/* DARK OVERLAY */}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        />

        {/* HEADER LIGHT */}
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, type: 'timing', duration: 800 }}
          style={{
            position: 'absolute',
            top: height * 0.32,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#facc15',
              fontSize: 16,
              fontWeight: '900',
              letterSpacing: 2,
              textShadowColor: '#facc15',
              textShadowRadius: 18,
            }}
          >
            LIVE STAGE
          </Text>
        </MotiView>

       

        {/* CENTER PANEL */}
        <MotiView
          from={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 600, type: 'spring' }}
          style={{
            position : "absolute",
            width: width * 0.64,
            paddingVertical: 30,
            paddingHorizontal: 24,
            borderRadius: 26,
            backgroundColor: 'rgba(0,0,0,0.45)',
            borderWidth: 1,
            borderColor: 'rgba(250,204,21,0.25)',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <View
            style={{
              position: 'absolute',
            //   width: 260,
              height: 260,
              borderRadius: 999,
              backgroundColor: 'rgba(250,204,21,0.08)',
            }}
          />

          <Text
            style={{
              color: 'white',
              fontSize: width/34,
              fontWeight: '900',
              letterSpacing: 0.5,
              textShadowColor: 'rgba(250,204,21,0.7)',
              textShadowRadius: 18,
            }}
          >
            {stageData?.name?.toUpperCase()} {'  '} {stageIcons[stageData?.name]}
          </Text>

          <Text
            style={{
              color: '#d4d4d4',
              marginTop: 12,
              fontWeight: '800',
              fontSize: width/38,
              letterSpacing: 1,
            }}
          >
            ROUND {stageData?.round || 1}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 22,
              gap: 22,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: '#facc15',
                  fontSize: width/32,
                  fontWeight: '900',
                }}
              >
                {contestants.length}
              </Text>

              <Text
                style={{
                  color: '#e5e5e5',
                  letterSpacing: 2,
                  fontSize: width/40,
                  marginTop: 4,
                }}
              >
                ON STAGE
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: '#facc15',
                  fontSize: width/32,
                  fontWeight: '900',
                }}
              >
                {stageData?.queue?.length || 0}
              </Text>

              <Text
                style={{
                  color: '#e5e5e5',
                  letterSpacing: 2,
                  fontSize: width/40,
                  marginTop: 4,
                }}
              >
                IN QUEUE
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: 'white',
              marginTop: 24,
              fontSize: width/32,
              fontWeight: '900',
              letterSpacing: 1,
              textShadowColor: 'black',
              textShadowRadius: 12,
            }}  >
            {countries.find(c => c.code == stageData?.region)?.name.toUpperCase()} {' '}
            {countries.find(c => c.code == stageData?.region)?.flag }
          </Text>
        </MotiView>

        {/* CONTESTANT ROLL OUT */}
        <View
            style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 10,
            pointerEvents: 'none', // important so it doesn't block UI
            }}
            className = "justify-center w-full items-center"
        >
            {contestants.map((c, i) => (
            <AnimatedCard
                key={c?.user_id || i}
                contestant={c}
                index={i}
                total={contestants.length}
            />
            ))}
        </View>
                    
      </MotiView>
    </AnimatePresence>
  );
}

/*
USAGE

const [showIntro, setShowIntro] = useState(true);

<StageIntroOverlay
  visible={showIntro}
  stageData={stageData}
  onFinish={() => setShowIntro(false)}
/>

IMPORTANT:
Install:

npm install moti react-native-reanimated

babel.config.js:
plugins: ['react-native-reanimated/plugin']

*/
