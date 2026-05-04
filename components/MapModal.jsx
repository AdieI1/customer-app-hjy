import { useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Mindanao center
const MINDANAO_REGION = {
  latitude: 7.1907,
  longitude: 125.4553,
  latitudeDelta: 3.0,
  longitudeDelta: 3.0,
};

// Camera limiter
const BOUNDS = {
  north: 10.2,
  south: 4.3,
  east: 127.3,
  west: 121.7,
};

export default function MapModal({ visible, onClose, onConfirm }) {
  const [region, setRegion] = useState(MINDANAO_REGION);
  const [marker, setMarker] = useState(null);

  const mapRef = useRef(null);

  // Clamp region inside Mindanao
  const clampRegion = (r) => {
    return {
      latitude: Math.min(BOUNDS.north, Math.max(BOUNDS.south, r.latitude)),
      longitude: Math.min(BOUNDS.east, Math.max(BOUNDS.west, r.longitude)),
      latitudeDelta: Math.max(1.2, r.latitudeDelta),
      longitudeDelta: Math.max(1.2, r.longitudeDelta),
    };
  };

  const isInsideMindanao = (lat, lng) => {
    
    const mainIsland =
      lat >= 5.0 &&
      lat <= 9.8 &&
      lng >= 122.5 &&
      lng <= 126.8;

    const surigao =
      lat >= 8.8 &&
      lat <= 10.3 &&
      lng >= 125.5 &&
      lng <= 127.3;

    const zamboanga =
      lat >= 6.0 &&
      lat <= 8.5 &&
      lng >= 121.7 &&
      lng <= 123.2;

    return mainIsland || surigao || zamboanga;
  };

  const onMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    // Blocking anything outside Mindanao
    if (!isInsideMindanao(latitude, longitude)) return;

    setMarker({ latitude, longitude });
  };

  const handleConfirm = () => {
    if (!marker) return;

    onConfirm(marker);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          region={region}
          zoomEnabled={true}
          scrollEnabled={true}
          onRegionChangeComplete={(r) => {
            const clamped = clampRegion(r);

            if (
              r.latitude !== clamped.latitude ||
              r.longitude !== clamped.longitude
            ) {
              mapRef.current?.animateToRegion(clamped, 150);
            }

            setRegion(clamped);
          }}
          onPress={onMapPress}
        >
          {marker && <Marker coordinate={marker} />}
        </MapView>

        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Confirm Location
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },

  confirmBtn: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 10,
  },
});