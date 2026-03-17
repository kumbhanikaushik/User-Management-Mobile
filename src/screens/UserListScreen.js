import React, { useEffect, useLayoutEffect } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import useUserStore from "../redux/userStore";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

export default function UserListScreen({ navigation }) {
  const { users, loading, page, fetchUsers, currentUser } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers(1);
    }
  }, []);

  // ✅ Header Right Button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Profile", { user: currentUser })}
        >
          <Text style={{ fontSize: 16, color: "#4A90E2" }}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentUser]);

  if (loading && page === 1) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigation.navigate("UserDetail", { user: item })}
          />
        )}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={!loading && <Text style={styles.noData}>No Users Found</Text>}
        ListFooterComponent={loading ? <Loader /> : null}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEditUser")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  noData: { textAlign: "center", marginTop: 50 },
  fab: { position: "absolute", bottom: 60, right: 30, backgroundColor: "#4A90E2", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", elevation: 5 },
  fabText: { color: "#fff", fontSize: 30, fontWeight: "bold" },
});