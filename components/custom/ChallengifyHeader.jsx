


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChallengifyHeader = () => {
  return (
    <View
    className ="g-[#f29756] text-center items-center px- flex-col"
     style={styles.container}>
      <Text style={styles.title}>🌟 Welcome to Challengify</Text>
      <Text style={styles.subtitle}>Unleash Talent. Share Challenges. Break Records.</Text>
      <Text style={styles.description}>
        Step into the spotlight with <Text style={styles.bold}>Challengify</Text> — the ultimate stage where everyday legends rise!
        Whether you're conquering quirky dares, showcasing jaw-dropping skills, or chasing Guinness-level greatness,
        Challengify is your arena.

        {/* Unleash Talent. Share Challenges. Break Records.
       Step into the spotlight with Challengify — the ultimate stage where everyday legends rise! Whether you're conquering quirky dares, showcasing jaw-dropping skills, or chasing Guinness-level greatness, Challengify is your arena. Built with the power of Expo + React Native, this sleek, dynamic app brings global challengers together to compete, inspire, and celebrate talent like never before.
Ready to defy limits? Start your challenge today. */}
 {/* 💪🎬🏆 */}
      </Text>
      {/* <Text style={styles.description}>
        Built with the power of <Text style={styles.bold}>Expo + React Native</Text>, this sleek, dynamic app brings global challengers
        together to compete, inspire, and celebrate talent like never before.
      </Text> */}
      <Text style={styles.callToAction}> Start your challenge today. 💪🎬🏆</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 0,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: "white",
    // '#b561ed',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#5ca9f0',
    marginBottom: 8,
  },
  description: {
    fontSize: 11,
    color: '#fff',
    marginBottom: 4,
    lineHeight: 18,
    textAlign:"center"
  },
  bold: {
    fontWeight: '600',
    color: '#f29756',
  },
  callToAction: {
    fontSize: 13,
    color: '#D2691E',
    fontWeight: '500',
    marginTop: 0,
  },
});

export default ChallengifyHeader;