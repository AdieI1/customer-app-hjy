import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const pfpplaceholder = require("../../assets/images/profilepic.png");

const deliveries = () => {
  const [selectedTab, setSelectedTab] = useState("active");

  const [showSort, setShowSort] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");

  {/* sorting options */}
  const sortOptions = [
    "Date",
    "A-Z",
    "Fragility",
    "Distance (Short - Long)",
    "Distance (Long - Short)",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* forda header */}
      <LinearGradient colors={["#9E1E21", "#4F0A11"]} style={styles.container}>
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

      {/* for the deliveries container */}
      <View style={styles.body}>

        <View style={styles.card}>

          <View style={styles.cardContent}>

            {/* Deliveries header */}
            <View style={styles.headerRow}>
              <Text style={styles.Deliveries}>Deliveries</Text>

              <TouchableOpacity
                style={styles.sort}
                onPress={() => setShowSort(!showSort)}
              >
                <Text style={[styles.sorttxt, {marginRight: 3}]}>{sortOption} </Text>
                <Ionicons name="chevron-down" size={14} color="#0C56AD" />
              </TouchableOpacity>
            </View>

            {/* for the dropdown */}
            {showSort && (
              <View style={styles.dropdown}>
                {sortOptions.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSortOption(item);
                      setShowSort(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.divider} />

            {/* forda active-history tabs */}
            <View style={styles.tabRow}>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === "active" && styles.tabActive,
                ]}
                onPress={() => setSelectedTab("active")}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "active" && styles.tabTextActive,
                  ]}
                >
                  Active
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === "history" && styles.tabActive,
                ]}
                onPress={() => setSelectedTab("history")}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "history" && styles.tabTextActive,
                  ]}
                >
                  History
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>

        {/* message for empty */}
        <View style={styles.messageContainer}>
          {selectedTab === "active" ? (
            <Text style={styles.message}>
              You have no active deliveries yet
            </Text>
          ) : (
            <Text style={styles.message}>
              You don’t have any deliveries in your history
            </Text>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default deliveries;
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  container: {
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.03,
    paddingBottom: height * 0.03,
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
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
  },

  cardContent: {
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.0013,
  },

  Deliveries: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#E53935",
    lineHeight: width * 0.08,
  },

  sort: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#DCE3F1",
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.030,
    borderRadius: 12,
  },

  sorttxt: {
    color: "#3B5BDB",
    fontSize: width * 0.035,
    fontWeight: "600",
    marginRight: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#CFCFCF",
    marginVertical: height * 0.015,
  },

  tabRow: {
    flexDirection: "row",
    gap: width * 0.03,
  },

  tabButton: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },

  tabActive: {
    backgroundColor: "#34B352",
  },

  tabText: {
    fontSize: width * 0.04,
    color: "#666",
    fontWeight: "500",
  },

  tabTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  messageContainer: {
    marginTop: height * 0.03,
    alignItems: "center",
  },

  message: {
    color: "#666",
    fontSize: width * 0.04,
    textAlign: "center",
  },

  dropdown: {
  position: "absolute",
  top: height * 0.065,
  right: width * 0.04,
  backgroundColor: "#fff",
  borderRadius: 10,
  width: width * 0.6,
  paddingVertical: 6,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
  zIndex: 1000,
},

dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 12,
},

dropdownText: {
  fontSize: width * 0.035,
  color: "#333",
},

card: {
  backgroundColor: "#fff",
  position: "relative",
},
});