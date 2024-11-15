import { Authenticator } from "@aws-amplify/ui-react-native";
import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomSignIn from "@/components/Authenticator/CustomSignIn";

export default function AuthScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.replace("/");
              }}
            >
              <Ionicons
                name="arrow-back-circle-outline"
                size={36}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Authenticator
        // components={{ SignIn: CustomSignIn }}
        initialState="signIn"
        loginMechanisms={["email"]}
        socialProviders={["google"]}
        signUpAttributes={["name", "email"]}
      />
    </>
  );
}
