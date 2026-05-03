import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function DeliverySection() {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>Delivery Location</Text> 
      <View style={styles.divider} />

      <Text style={styles.label}>Select Pick-up address</Text>
      <TextInput
        style={styles.input}
        placeholder="Port Area, Cagayan De Oro City..."
      />

      <Text style={styles.label}>Set Drop-off address</Text>
      <TextInput
        style={styles.input}
        placeholder="4441-WXY, Malaybalay City..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: width * 0.04,
    borderRadius: width * 0.04,
    marginBottom: height * 0.015,
  },

  title: {
    fontSize: width * 0.04,
    fontWeight: "700",
    color: "#E53935",
    marginBottom: height * 0.01,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: height * 0.01,
  },

  label: {
    fontSize: width * 0.032,
    color: "#777",
    marginBottom: 4,
  },

  input: {
    backgroundColor: "#F1F2F4",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.03,
    marginBottom: height * 0.012,
    fontSize: width * 0.035,
  },
});