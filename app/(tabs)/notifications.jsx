import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const pfpplaceholder = require("../../assets/images/profilepic.png");

const Notifications = () => {
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
      <LinearGradient
        colors={["#9E1E21", "#4F0A11"]} style={styles.container}>
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

      {/* notifications container */}
      <View style={styles.body}>

        <View style={styles.card}>

          <View style={styles.cardContent}>

            {/* notification title */}
            <View style={styles.headerRow}>
              <Text style={styles.Deliveries}>Notifications</Text>

              <TouchableOpacity
                style={styles.sort}
                onPress={() => setShowSort(!showSort)}
              >
                <Text style={[styles.sorttxt, { marginRight: 3 }]}>
                  {sortOption}
                </Text>
                <Ionicons name="chevron-down" size={14} color="#0C56AD" />
              </TouchableOpacity>
            </View>

            {/* forda dropdown  */}
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

          </View>

        </View>
         {/* empty notif message */}
        <Text style={styles.emptymessage}>You currently dont have notifications right now.</Text>
            

      </View>

    </SafeAreaView>
  );
};

export default Notifications;

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
  sorttxt: {
    color: "#3B5BDB",
    fontSize: width * 0.035,
    fontWeight: "600",
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

  emptymessage: {
    color: "#666",
    fontSize: width * 0.04,
    textAlign: "center",
    marginTop: height * 0.025,
  }
});