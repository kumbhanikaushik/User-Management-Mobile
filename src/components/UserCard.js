import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function UserCard({ user, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Text style={styles.arrow}>〉</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f0f0f0' },
  info: { marginLeft: 15, flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  email: { fontSize: 14, color: "#777", marginTop: 2 },
  arrow: { fontSize: 18, color: "#ccc", marginLeft: 5 }
});