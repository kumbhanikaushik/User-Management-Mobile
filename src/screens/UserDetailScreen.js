import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import useUserStore from "../redux/userStore";

export default function UserDetailScreen({ route, navigation }) {
  const { user: initialUser } = route.params;
  
  const user = useUserStore((state) => 
    state.users.find((u) => u.id === initialUser.id)
  ) || initialUser; 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.profileImg} />
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => navigation.navigate("AddEditUser", { user })}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", paddingVertical: 40, backgroundColor: "#f8f9fa", borderBottomRightRadius: 30, borderBottomLeftRadius: 30 },
  profileImg: { width: 150, height: 150, borderRadius: 75, marginBottom: 15, borderWidth: 5, borderColor: "#fff" },
  name: { fontSize: 24, fontWeight: "bold", color: "#333" },
  email: { fontSize: 16, color: "#666", marginTop: 5 },
  body: { padding: 20 },
  editButton: { backgroundColor: "#4A90E2", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 20 },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});