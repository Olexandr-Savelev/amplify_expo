import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useAuthStore } from "@/store/userStore";

export default function TabsLayout() {
  const user = useAuthStore((state) => state.user);

  console.log("User", user);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Welcome" }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Link
              href={user ? "/(tabs)/home" : "/login"}
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="bookmark-o"
                    size={24}
                    color={color}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Link
              href={user ? "/(tabs)/profile" : "/login"}
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <Feather
                    name="message-circle"
                    size={28}
                    color={color}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
