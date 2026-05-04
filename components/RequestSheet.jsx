import { useState } from "react"; // added
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MapModal from "./MapModal"; // FIXED PATH
import CargoSection from "./sections/CargoSection";
import DeliverySection from "./sections/DeliverySection";
import OverviewSection from "./sections/OverviewSection";
import PaymentSection from "./sections/PaymentSection";

const { width, height } = Dimensions.get("window");

export default function RequestSheet({ onClose }) {
  const isSmallScreen = width < 360;

  const [mapVisible, setMapVisible] = useState(false); // added
  const [activeField, setActiveField] = useState(null); // added

  const [pickup, setPickup] = useState(null); // added
  const [dropoff, setDropoff] = useState(null); // added

  const openMap = (type) => { // added
    setActiveField(type);
    setMapVisible(true);
  };

  const handleConfirm = (coords) => { // added
    if (activeField === "pickup") setPickup(coords);
    if (activeField === "dropoff") setDropoff(coords);
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.title, isSmallScreen && { fontSize: 20 }]}>
            Request Delivery
          </Text>

          <Text style={styles.subtitle}>
            Enter the required details to request a delivery.
          </Text>
        </View>

        <View style={styles.divider} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <CargoSection />

        <DeliverySection
          pickup={pickup} // added
          dropoff={dropoff} // added
          onOpenMap={openMap} // added
        />

        <OverviewSection />

        <PaymentSection />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Complete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Save as Draft</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <MapModal
        visible={mapVisible} // added
        onClose={() => setMapVisible(false)} // added
        onConfirm={handleConfirm} // FIXED CLEAN
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    borderTopLeftRadius: width * 0.06,
    borderTopRightRadius: width * 0.06,
    overflow: "hidden",
  },

  headerContainer: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.0006,
    alignItems: "center",
  },

  headerCenter: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: width * 0.05,
  },

  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 6,
  },

  closeText: {
    fontSize: width * 0.05,
    color: "#999",
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#E53935",
    textAlign: "center",
  },

  subtitle: {
    fontSize: width * 0.03,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
    marginBottom: 10,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#d8d1d1",
    marginTop: height * 0.01,
  },

  scrollContent: {
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.01,
    paddingBottom: height * 0.08,
  },

  buttonContainer: {
    marginTop: height * 0.02,
    gap: 12,
  },

  primaryBtn: {
    backgroundColor: "#E53935",
    paddingVertical: height * 0.018,
    borderRadius: width * 0.03,
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: width * 0.04,
  },

  secondaryBtn: {
    backgroundColor: "#9E9E9E",
    paddingVertical: height * 0.018,
    borderRadius: width * 0.03,
    alignItems: "center",
  },

  secondaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: width * 0.04,
  },
});