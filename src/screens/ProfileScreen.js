import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from "react-native";
import { launchImageLibrary } from "react-native-image-picker"; // તમારી પસંદગીની લાયબ્રેરી
import useUserStore from "../redux/userStore";

export default function ProfileScreen({ navigation }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);
  const updateCurrentUser = useUserStore((state) => state.updateCurrentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.first_name || currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [image, setImage] = useState(currentUser?.avatar || "");

  const pickImage = async () => {
    if (!isEditing) return;

    const result = await launchImageLibrary({ mediaType: "photo", quality: 0.7 });
    if (result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };

  const handleUpdate = () => {
    if (!firstName || !email) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    updateCurrentUser({
      first_name: firstName,
      name: firstName,
      email: email,
      avatar: image || "https://via.placeholder.com/150"
    });

    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  if (!currentUser) {
    return (
      <View style={styles.center}>
        <Text>No Profile Data Found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} activeOpacity={isEditing ? 0.7 : 1}>
          <Image
            source={{ uri: image || "https://via.placeholder.com/150" }}
            style={[styles.profileImg, isEditing && styles.editingImage]}
          />
          {isEditing && (
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>Change</Text>
            </View>
          )}
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
        ) : (
          <>
            <Text style={styles.name}>{currentUser.first_name || currentUser.name}</Text>
            <Text style={styles.email}>{currentUser.email}</Text>
          </>
        )}
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        {isEditing ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleUpdate}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setFirstName(currentUser.first_name || currentUser.name);
                setImage(currentUser.avatar);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.actionButtonText}>Edit My Account</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    alignItems: "center", paddingVertical: 40, backgroundColor: "#f8f9fa",
    borderBottomRightRadius: 35, borderBottomLeftRadius: 35, elevation: 3,
  },
  profileImg: { width: 130, height: 130, borderRadius: 65, borderWidth: 4, borderColor: "#fff" },
  editingImage: { opacity: 0.6, borderColor: "#4A90E2" },
  editBadge: { position: 'absolute', bottom: 10, alignSelf: 'center', backgroundColor: '#4A90E2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  editBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 10 },
  email: { fontSize: 16, color: "#666", marginTop: 5 },
  inputContainer: { width: '85%', marginTop: 15 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", marginBottom: 10 },
  body: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#444", marginBottom: 20 },
  actionButton: { backgroundColor: "#f0f2f5", padding: 16, borderRadius: 12, alignItems: "center", marginBottom: 12 },
  actionButtonText: { color: "#4A90E2", fontSize: 16, fontWeight: "bold" },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: "#4CAF50", flex: 1, marginRight: 10 },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: { backgroundColor: "#eee", width: 100 },
  cancelButtonText: { color: "#666" },
  logoutButton: { backgroundColor: "#ffeeee", marginTop: 10 },
  logoutText: { color: "#FF3B30" }
});