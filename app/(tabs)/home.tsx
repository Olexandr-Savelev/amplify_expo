import { View, Text, Button } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/userStore";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useSignOutWithRedirect } from "@/hooks/useSignOutWithRedirect";

const HomeScreen = () => {
  const { signOut } = useAuthenticator();
  const signOutWithRedirect = useSignOutWithRedirect();
  const user = useAuthStore((state) => state.user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {user?.name}!</Text>
      <Button
        title="Sign Out"
        onPress={signOutWithRedirect}
      />
    </View>
  );
};

export default HomeScreen;
