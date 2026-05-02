import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, } from "react-native";
import CargoSection from "./sections/CargoSection";

export default function RequestSheet({ onClose }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, isSmallScreen && { fontSize: 18 }]}>
            Request Delivery
          </Text>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION: Cargo Info */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cargo Information</Text>
        </View>

        <CargoSection />

        {/* SECTION: Delivery Location */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Location</Text>
        </View>

        {/* placeholder for now */}
        <View style={styles.placeholderBox} />

        {/* SECTION: Delivery Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Overview</Text>
        </View>

        <View style={styles.placeholderBox} />

        {/* SECTION: Payment Terms */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Terms</Text>
        </View>

        <View style={styles.placeholderBox} />

        {/* ACTION BUTTONS */}
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Complete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Save as Draft</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E53935",
  },

  closeText: {
    fontSize: 18,
    color: "#999",
  },

  sectionHeader: {
    marginBottom: 6,
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E53935",
  },

  placeholderBox: {
    backgroundColor: "#fff",
    height: 80,
    borderRadius: 12,
    marginBottom: 12,
  },

  primaryBtn: {
    backgroundColor: "#E53935",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  secondaryBtn: {
    backgroundColor: "#9E9E9E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryText: {
    color: "#fff",
    fontWeight: "600",
  },
});