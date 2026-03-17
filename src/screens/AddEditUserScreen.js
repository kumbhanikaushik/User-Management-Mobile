import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import useUserStore from "../redux/userStore";

export default function AddEditUserScreen({ route, navigation }) {
  const { addUser, updateUser } = useUserStore();
  const user = route.params?.user;

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [image, setImage] = useState(user?.avatar || "");

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 0.7 });
    if (result.assets) setImage(result.assets[0].uri);
  };

  const saveUser = () => {
    if (!firstName || !lastName) {
      Alert.alert("Error", "Please fill fields");
      return;
    }

    const userData = {
      id: user?.id || Date.now(),
      first_name: firstName,
      last_name: lastName,
      avatar: image || "https://via.placeholder.com/150",
      email: user?.email || `${firstName.toLowerCase()}@example.com`
    };

    if (user) {
      updateUser(userData);
    } else {
      addUser(userData);
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? <Image source={{ uri: image }} style={styles.profileImage} /> : <Text>Add Photo</Text>}
        </TouchableOpacity>

        <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
        <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />

        <TouchableOpacity style={styles.saveButton} onPress={saveUser}>
          <Text style={styles.saveButtonText}>{user ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 25 },
  imagePicker: { alignSelf: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee", justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  input: { backgroundColor: "#f8f9fa", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", marginBottom: 15 },
  saveButton: { backgroundColor: "#4A90E2", padding: 15, borderRadius: 10, alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold" }
});