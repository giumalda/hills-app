import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Platform, View } from "react-native"
import { COLORS, FONTS } from "@/constants/theme"
import { OrderPad } from "@/components/order/OrderPad"
import { OrderProvider } from "@/components/order/OrderProvider"

export default function TabsLayout() {
  return (
    <OrderProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.ink,
            tabBarInactiveTintColor: "rgba(26,20,15,0.48)",
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 11, fontFamily: FONTS.sansBold },
            tabBarStyle: {
              backgroundColor: Platform.OS === "web" ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.96)",
              borderTopWidth: 1,
              borderTopColor: "rgba(255,255,255,0.85)",
              height: Platform.OS === "web" ? 68 : 88,
              paddingTop: 8,
              paddingBottom: Platform.OS === "web" ? 8 : 28,
              position: "absolute",
              elevation: 0,
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
            name="crea-omero"
            options={{
              title: "Crea",
              tabBarIcon: ({ color, size }) => <Ionicons name="construct" size={size} color={color} />,
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
            name="coupon"
            options={{
              title: "Coupon",
              tabBarIcon: ({ color, size }) => <Ionicons name="ticket" size={size} color={color} />,
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
        <OrderPad />
      </View>
    </OrderProvider>
  )
}
