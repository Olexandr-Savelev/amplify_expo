import React from "react";
import { View, Text, Button } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useAuthStore } from "@/store/userStore";
import { useSignOutWithRedirect } from "@/hooks/useSignOutWithRedirect";

export default function ProfileScreen() {
  const { signOut } = useAuthenticator();
  const user = useAuthStore((state) => state.user);
  const signOutWithRedirect = useSignOutWithRedirect();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.name}!</Text>
      <Button
        title="Sign Out"
        onPress={signOut}
      />
    </View>
  );
}
