import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

export default function CargoSection() {
  const [cargoType, setCargoType] = useState(null);
  const [fragility, setFragility] = useState(null);
  const [weight, setWeight] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const cargoOptions = [
    "Electronics",
    "General Goods",
    "Construction",
    "Furniture",
    "Perishable Goods",
  ];

  const fragilityOptions = ["Fragile", "Standard", "Perishable"];

  const openModal = (field) => {
    setActiveField(field);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveField(null);
  };

  const handleSelect = (value) => {
    if (activeField === "cargo") setCargoType(value);
    if (activeField === "fragility") setFragility(value);
    closeModal();
  };

  const getOptions = () => {
    return activeField === "cargo" ? cargoOptions : fragilityOptions;
  };

  const getModalTitle = () => {
    if (activeField === "cargo") return "Select Cargo Type";
    if (activeField === "fragility") return "Select Cargo Fragility";
    return "";
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Cargo Information</Text>

      {/* forda cargo type */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => openModal("cargo")}
      >
        <Text style={cargoType ? styles.value : styles.placeholder}>
          {cargoType || "Select Cargo Type"}
        </Text>
      </TouchableOpacity>

      {/* forda cargo fragility */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => openModal("fragility")}
      >
        <Text style={fragility ? styles.value : styles.placeholder}>
          {fragility || "Select Cargo Fragility"}
        </Text>
      </TouchableOpacity>

      {/* forda weight */}
      <View style={styles.weightContainer}>
            <TextInput
                style={styles.weightInput}
                placeholder="Enter Cargo Weight"
                keyboardType="numeric"
                value={weight}
                onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    setWeight(cleaned);
                }}
            />
        <Text style={[styles.kg, weight ? styles.kgActive : null]}>
          kg
        </Text>
      </View>

      {/* container animation */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* container title */}
            <Text style={styles.modalTitle}>{getModalTitle()}</Text>

            {/* OPTIONS */}
            <FlatList
              data={getOptions()}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            {/* cancel buton */}
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  title: {
    color: "#E53935",
    fontWeight: "700",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#F1F2F4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  placeholder: {
    color: "#888",
  },

  value: {
    color: "#111",
    fontWeight: "500",
  },

  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F4",
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  weightInput: {
    flex: 1,
    paddingVertical: 12,
  },

  kg: {
    color: "#999",
    fontWeight: "600",
    marginLeft: 4,
  },

  kgActive: {
    color: "#555",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "60%",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  optionText: {
    fontSize: 14,
    color: "#111",
  },

  cancel: {
    textAlign: "center",
    marginTop: 10,
    color: "#E53935",
    fontWeight: "600",
  },
});