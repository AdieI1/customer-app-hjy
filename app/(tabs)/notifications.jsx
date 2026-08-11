import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationCard from "../../components/NotificationsCard";

const { width, height } = Dimensions.get("window");
const pfpplaceholder = require("../../assets/images/profilepic.png");

export default function Notifications() {
  const notifications = [
    {
      id: "1",
      title: "Your Delivery is now In Transit to Pickup!",
      cargo: "Electronics",
      route: "Port Area - Malaybalay",
      time: "10 sec ago",
    },
    {
      id: "2",
      title: "Your Delivery is now Approved",
      cargo: "Electronics",
      route: "Port Area - Malaybalay",
      time: "10 min ago",
    },
    {
      id: "3",
      title: "Your Delivery is now Approved",
      cargo: "Electronics",
      route: "Port Area - Malaybalay",
      time: "10 min ago",
    },
  ];

  const handleViewDetails = (notification) => {
    console.log("View details:", notification.id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#9E1E21", "#4F0A11"]}
        style={styles.header}
      >
        <View style={styles.profileContainer}>
          <Image source={pfpplaceholder} style={styles.pfp} />

          <View>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.name}>Christopher Lee</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons
            name="notifications-outline"
            size={27}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Notifications</Text>

          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>Sort</Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color="#315BB5"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onViewDetails={() =>
                handleViewDetails(notification)
              }
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D7D9E4",
  },

  header: {
    paddingTop: height * 0.035,
    paddingHorizontal: width * 0.03,
    paddingBottom: height * 0.025,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  pfp: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "500",
    marginLeft: width * 0.025,
  },

  name: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "700",
    marginLeft: width * 0.025,
  },

  headerIcon: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    flex: 1,
    backgroundColor: "#D7D9E4",
  },

  titleRow: {
    backgroundColor: "#F7F8FC",
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.012,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pageTitle: {
    color: "#E53935",
    fontSize: width * 0.055,
    fontWeight: "800",
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D5DDF3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },

  sortText: {
    color: "#315BB5",
    fontSize: 15,
    fontWeight: "700",
    marginRight: 3,
  },

  list: {
    padding: width * 0.03,
    paddingBottom: height * 0.05,
  },
});