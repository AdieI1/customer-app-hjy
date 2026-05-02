import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react"; // FIX: hooks
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // FIX: Animated included
import { SafeAreaView } from "react-native-safe-area-context";

import RequestSheet from "../../components/RequestSheet";

const { width, height } = Dimensions.get("window");
const pfpplaceholder = require("../../assets/images/profilepic.png");

const Home = () => {

  const [showSheet, setShowSheet] = useState(false);
  const [mounted, setMounted] = useState(false);

  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (showSheet) {
      setMounted(true);

      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setMounted(false);
      });
    }
  }, [showSheet]);

  const openSheet = () => setShowSheet(true);
  const closeSheet = () => setShowSheet(false);

  return (
    <SafeAreaView style={{ flex: 1 }}> {/* FIX: REQUIRED for overlays to work */}

      <View style={{ flex: 1 }}> {/* FIX: root stacking context */}

        <LinearGradient colors={["#4F0A11", "#9E1E21"]} style={styles.container}>
          
          <View style={styles.pfpContainer}>
            <Image source={pfpplaceholder} style={styles.pfp} />

            <View>
              <Text style={styles.welcome}>Welcome!</Text>
              <Text style={styles.Name}>Justine Montefalco.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.draftIcon}>
            <Ionicons name="document-text-outline" size={30} color="#ffffff" />
          </TouchableOpacity>

        </LinearGradient>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          
          {/* forda REQUEST DELIVERY!  */}
          <View style={styles.requestCard}>
            <Text style={styles.requestHeader}>Request Delivery!</Text>
            <Text style={styles.requestSubheader}>Schedule a delivery quick and easy.</Text>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.requestBtn} onPress={openSheet}>
              <Ionicons name="car-outline" size={20} color="#ffffff" />
              <Text style={styles.requestBtnText}>Create Request</Text>
            </TouchableOpacity>
          </View>

          {/* forda ACTIVE REQUESTS  */}
          <View style={styles.activeCard}>
            <Text style={styles.activeHeader}>Active Deliveries</Text>

            <View style={styles.divider} />

            <View style={styles.activeContent}>
              <View style={styles.boxIcon}>
                <Ionicons name="cube-outline" size={35} color="#ffffff" />
              </View>

              <View style={styles.activetxtContainer}>
                <Text style={styles.noactiveHeader}>No active deliveries yet!</Text>
                <Text style={styles.noactiveSubheader}>
                  Tap "Create Request" to schedule your first delivery!
                </Text>
              </View>
            </View>

            <View style={styles.divider} />
          </View>

        </ScrollView>

        {/* BACKDROP FIRST (important layering fix) */}
        {showSheet && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeSheet}
            style={styles.backdrop}
          />
        )}

        {/* SHEET LAST (must be above everything) */}
        {mounted && (
          <Animated.View
            style={[
              styles.sheetContainer,
              { transform: [{ translateY }] }
            ]}
          >
            <RequestSheet onClose={closeSheet} />
          </Animated.View>
        )}

      </View>

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({

  container: {
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.03,
    paddingBottom: height * 0.025,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pfpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  pfp: {
    width: width * 0.18,
    height: width * 0.18,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: width * 0.06,
    marginLeft: width * 0.03,
    fontWeight: "500",
  },

  Name: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    marginLeft: width * 0.03,
    fontWeight: "400",
  },

  draftIcon: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: (width * 0.11) / 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    padding: width * 0.04,
  },

  requestCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: width * 0.05,
  },

  requestHeader: {
    fontSize: width * 0.07,
    fontWeight: "900",
    color: "#DE2226",
  },

  requestSubheader: {
    fontSize: width * 0.035,
    color: "#273342",
  },

  divider: {
    marginTop: height * 0.01,
    height: 1,
    backgroundColor: "#D1D1D1",
    width: "100%",
  },

  requestBtn: {
    marginTop: height * 0.02,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  requestBtnText: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "600",
  },

  activeCard: {
    marginTop: height * 0.02,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: width * 0.05,
  },

  activeHeader: {
    fontSize: width * 0.07,
    fontWeight: "900",
    color: "#DE2226",
  },

  activeContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  boxIcon: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: 12,
    backgroundColor: "#3286E8",
    justifyContent: "center",
    alignItems: "center",
  },

  activetxtContainer: {
    flex: 1,
    marginLeft: 10,
  },

  noactiveHeader: {
    fontSize: width * 0.05,
    fontWeight: "700",
  },

  noactiveSubheader: {
    fontSize: width * 0.035,
    color: "#4E5966",
  },

  sheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,  
    right: 0,
    height: height * 0.85,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 999, // FIX: ensure above everything
    elevation: 20, // FIX: Android layering fix
  },

  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 998,
  },
});