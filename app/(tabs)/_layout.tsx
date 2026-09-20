import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Platform } from "react-native"
import { COLORS } from "@/constants/theme"

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.ink,
        tabBarInactiveTintColor: "rgba(17,17,17,0.4)",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "800" },
        tabBarStyle: {
          backgroundColor: COLORS.yellow,
          borderTopWidth: 3,
          borderTopColor: COLORS.ink,
          height: Platform.OS === "web" ? 68 : 88,
          paddingTop: 8,
          paddingBottom: Platform.OS === "web" ? 8 : 28,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menù",
          tabBarIcon: ({ color, size }) => <Ionicons name="fast-food" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="galleria"
        options={{
          title: "Galleria",
          tabBarIcon: ({ color, size }) => <Ionicons name="images" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="prenota"
        options={{
          title: "Prenota",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contatti"
        options={{
          title: "Contatti",
          tabBarIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
