import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ItriMissionModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>ITRI</Text>
            <Text style={styles.subtitle}>WHERE TALENT SPEAKS LOUDER</Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <Text style={styles.title}>
            A STAGE FOR{"\n"}
            <Text style={styles.gold}>REAL TALENT.</Text>
          </Text>

          <Text style={styles.intro}>
            Itri is built around one simple idea:
            talent should matter more than noise.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            THE MISSION
          </Text>

          <Text style={styles.text}>
            Itri is a platform designed to discover, showcase and
            elevate talented people through performance and
            competition.
          </Text>

          <Text style={styles.text}>
            No endless news feeds. No manufactured controversy.
            No need to compete for attention through meaningless
            content.
          </Text>

          <Text style={styles.text}>
            Instead, Itri gives people a place where their ability,
            creativity and performance can speak for themselves.
          </Text>

          <Text style={styles.sectionTitle}>
            FROM LOCAL TO THE WORLD
          </Text>

          <Text style={styles.text}>
            Every journey starts somewhere.
          </Text>

          <Text style={styles.text}>
            Users can create Arenas where performances take place.
            Performers compete, build recognition and prove what
            they can do.
          </Text>

          <Text style={styles.text}>
            The strongest performers and standout talent can earn
            opportunities to move onto bigger stages.
          </Text>

          <View style={styles.stageBox}>
            <Text style={styles.stage}>LOCAL</Text>
            <Text style={styles.arrow}>↓</Text>

            <Text style={styles.stage}>REGIONAL</Text>
            <Text style={styles.arrow}>↓</Text>

            <Text style={styles.stage}>WORLD</Text>
          </View>

          <Text style={styles.text}>
            A performer may begin by competing locally in their
            country, rise to a regional stage such as North Africa,
            and ultimately have the opportunity to compete on a
            global stage.
          </Text>

          <Text style={styles.sectionTitle}>
            PERFORMANCE MATTERS
          </Text>

          <Text style={styles.text}>
            Your reputation on Itri is built through what you do,
            not simply how much attention you can attract.
          </Text>

          <Text style={styles.text}>
            Perform. Compete. Improve. Get recognized.
          </Text>

          <Text style={styles.text}>
            The better you perform, the further your journey can go.
          </Text>

          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>
              "Talent speaks louder."
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            WHY ITRI?
          </Text>

          <Text style={styles.text}>
            We believe social platforms should inspire people,
            not drain them.
          </Text>

          <Text style={styles.text}>
            Itri is about creating an environment where people
            discover talent, support performers, compete fairly
            and celebrate achievement.
          </Text>

          <Text style={styles.text}>
            Whether you are an athlete, musician, artist, creator,
            performer or simply someone with a skill worth showing,
            there should be a stage for you.
          </Text>

          <View style={styles.finalBox}>
            <Text style={styles.finalTitle}>
              FIND YOUR ARENA.
            </Text>

            <Text style={styles.finalTitle}>
              PROVE YOUR TALENT.
            </Text>

            <Text style={styles.finalTitle}>
              EARN YOUR STAGE.
            </Text>
          </View>

          <Text style={styles.footer}>
            ITRI — WHERE TALENT SPEAKS LOUDER
          </Text>

        </ScrollView>
      </View>
    </Modal>
  );
};

export default ItriMissionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  logo: {
    color: "#D4AF37",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 4,
  },

  subtitle: {
    color: "#777",
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 2,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 60,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 39,
    letterSpacing: 1,
    marginBottom: 20,
  },

  gold: {
    color: "#D4AF37",
  },

  intro: {
    color: "#ccc",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 30,
  },

  sectionTitle: {
    color: "#D4AF37",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginTop: 25,
    marginBottom: 14,
  },

  text: {
    color: "#aaa",
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 15,
  },

  stageBox: {
    marginVertical: 25,
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: "#332b16",
    borderRadius: 15,
    backgroundColor: "#0b0b0b",
    alignItems: "center",
  },

  stage: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 3,
  },

  arrow: {
    color: "#555",
    fontSize: 22,
    marginVertical: 7,
  },

  quoteContainer: {
    marginVertical: 30,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#D4AF37",
    backgroundColor: "#0b0b0b",
  },

  quote: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    fontStyle: "italic",
  },

  finalBox: {
    marginTop: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#080808",
  },

  finalTitle: {
    color: "#D4AF37",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 2,
    marginVertical: 5,
    textAlign: "center",
  },

  footer: {
    color: "#555",
    fontSize: 9,
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 45,
  },
});