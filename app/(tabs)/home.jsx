import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActiveDeliveryCard from "../../components/ActiveDeliveryCard";
import NoActiveDeliveryCard from "../../components/NoActiveDeliveryCard";
import RequestSheet from "../../components/RequestSheet";

const { width, height } = Dimensions.get("window");
const pfpplaceholder = require("../../assets/images/profilepic.png");

const Home = () => {
  const router = useRouter();
  const [showSheet, setShowSheet] = useState(false);

  const translateY = useRef(
    new Animated.Value(height)
  ).current;

  const activeDelivery = {
    cargoName: "Electronics Cargo",
    status: "intransit",
    date: "3/30/2026",
    route: "Port Area - Malaybalay",
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: showSheet ? 0 : height,
      duration: showSheet ? 300 : 250,
      useNativeDriver: true,
    }).start();
  }, [showSheet]);

  const openSheet = () => setShowSheet(true);
  const closeSheet = () => setShowSheet(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <LinearGradient
          colors={["#4F0A11", "#9E1E21"]}
          style={styles.header}
        >
          <View style={styles.pfpContainer}>
            <Image
              source={pfpplaceholder}
              style={styles.pfp}
            />

            <View>
              <Text style={styles.welcome}>
                Welcome!
              </Text>

              <Text style={styles.name}>
                Justine Montefalco.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.draftIcon}>
            <Ionicons
              name="document-text-outline"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </LinearGradient>

        {/* BODY */}
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* REQUEST DELIVERY */}
          <View style={styles.requestCard}>
            <Text style={styles.requestHeader}>
              Request Delivery!
            </Text>

            <Text style={styles.requestSubheader}>
              Schedule a delivery quick and easy.
            </Text>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.requestBtn}
              onPress={openSheet}
              activeOpacity={0.8}
            >
              <Ionicons
                name="car-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.requestBtnText}>
                Create Request
              </Text>
            </TouchableOpacity>
          </View>

          {/* ACTIVE DELIVERY */}
        {activeDelivery ? (
          <ActiveDeliveryCard
            delivery={activeDelivery}
            onViewDetails={() => router.push("/deliveries")}
          />
        ) : (
          <NoActiveDeliveryCard />
        )}

        </ScrollView>

        {/* BACKDROP */}
        {showSheet && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeSheet}
            style={styles.backdrop}
          />
        )}

        {/* REQUEST SHEET */}
        {showSheet && (
          <Animated.View
            style={[
              styles.sheetContainer,
              {
                transform: [
                  { translateY },
                ],
              },
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
  safeArea: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  container: {
    flex: 1,
  },

  header: {
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

  name: {
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
    flex: 1,
    backgroundColor: "#EDEEF5",
  },

  scrollContent: {
    padding: width * 0.04,
    paddingBottom: height * 0.04,
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
    marginLeft: 5,
  },

  sheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.85,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 999,
    elevation: 20,
  },

  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 998,
  },
});