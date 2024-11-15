import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useRouter } from "expo-router";

export function useSignOutWithRedirect() {
  const { signOut } = useAuthenticator();
  const router = useRouter();

  const signOutWithRedirect = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return signOutWithRedirect;
}
