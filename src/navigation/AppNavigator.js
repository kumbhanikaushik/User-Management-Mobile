import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUserStore from "../redux/userStore";

import LoginScreen from "../screens/LoginScreen";
import UserListScreen from "../screens/UserListScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import AddEditUserScreen from "../screens/AddEditUserScreen";
import ProfileScreen from "../screens/ProfileScreen"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Users" component={UserListScreen} />
          <Stack.Screen name="UserDetail" component={UserDetailScreen} />
          <Stack.Screen name="AddEditUser" component={AddEditUserScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}