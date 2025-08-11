


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChallengifyHeader = () => {
  return (
    <View
    className ="g-[#f29756] w-full text-center mt-[10px] gap-2 items-center px- flex-col"
     style={styles.container}>
      <Text className="text-4xl  font-bold text-secondary">
                                    Challengify
      </Text> 
      {/* <Text style={styles.title}> Welcome to Challengify</Text> */}
      <Text style={styles.subtitle}>Unleash Talent. Share Challenges. Break Records.</Text>
      <Text style={styles.description}>
        Step into the spotlight with <Text style={styles.bold}>Challengify</Text> — the ultimate stage where everyday legends rise!
        {/* Whether you're conquering quirky dares, showcasing jaw-dropping skills, or chasing Guinness-level greatness,
        Challengify is your arena. */}
      </Text>
      {/* <Text style={styles.description}>
          Whether you're conquering quirky dares, showcasing jaw-dropping skills, or chasing Guinness-level greatness,
        Challengify is your arena.
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 0,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: "white",
    // '#b561ed',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#5ca9f0',
    marginTop : 20 ,
    marginBottom: 8,
    textAlign:"center"
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginTop : 0 ,
    marginBottom: 0,
    lineHeight: 22,
    textAlign:"center"
  },
  bold: {
    fontWeight: '800',
    color: '#f29756',
  },
  callToAction: {
    fontSize: 17,
    color: '#D2691E',
    fontWeight: '800',
    marginTop : 40 ,
    marginTop: 0,
  },
});

export default ChallengifyHeader;