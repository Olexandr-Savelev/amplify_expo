import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import amplifyconfig from "../src/amplifyconfiguration.json";
import { useAuthStore } from "@/store/userStore";
import { fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth";

import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";

Amplify.configure(amplifyconfig);

export default function RootLayout() {
  return (
    <Authenticator.Provider>
      <MainLayout />
    </Authenticator.Provider>
  );
}

function MainLayout() {
  const { authStatus } = useAuthenticator();
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          await getUser();
          router.replace("/");
          break;
        case "signedOut":
          setUser(null);
          router.replace("/");
          break;
      }
    });

    getUser();

    return () => unsubscribe();
  }, []);

  const getUser = async (): Promise<void> => {
    try {
      const fullUser = await fetchUserAttributes();
      setUser({
        id: fullUser.sub,
        name: fullUser.name,
        email: fullUser.email,
      });
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  if (authStatus === "configuring") {
    console.log("authStatus", authStatus);
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "" }}
      />
    </Stack>
  );
}
