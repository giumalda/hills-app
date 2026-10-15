import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Platform, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { COLORS, FONTS } from "@/constants/theme"
import { OrderPad } from "@/components/order/OrderPad"
import { OrderProvider } from "@/components/order/OrderProvider"
import { LiquidGlass } from "@/components/LiquidGlass"

export default function TabsLayout() {
  const insets = useSafeAreaInsets()

  return (
    <OrderProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.ink,
            tabBarInactiveTintColor: "rgba(26,20,15,0.62)",
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 10, fontFamily: FONTS.sansBold, marginTop: 2 },
            tabBarItemStyle: { borderRadius: 999, marginHorizontal: 1, paddingHorizontal: 1 },
            tabBarBackground: () => (
              <LiquidGlass
                pointerEvents="none"
                intensity={76}
                tintColor="rgba(255,255,255,0.42)"
                style={[StyleSheet.absoluteFillObject, { borderRadius: 999 }]}
              />
            ),
            tabBarStyle: {
              position: "absolute",
              left: 10,
              right: 10,
              bottom: Platform.OS === "web" ? 8 : Math.max(insets.bottom, 8),
              height: 78,
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderTopColor: "transparent",
              shadowColor: "#000",
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused ? styles.activeIcon : undefined}>
                  <Ionicons name="home" size={size} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="menu"
            options={{
              title: "Menù",
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused ? styles.activeIcon : undefined}>
                  <Ionicons name="fast-food" size={size} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="crea-omero"
            options={{
              title: "Crea",
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused ? styles.activeIcon : undefined}>
                  <Ionicons name="construct" size={size} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="galleria"
            options={{
              title: "Galleria",
              tabBarButton: () => null,
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused ? styles.activeIcon : undefined}>
                  <Ionicons name="images" size={size} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="coupon"
            options={{
              title: "Coupon",
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused ? styles.activeIcon : undefined}>
                  <Ionicons name="ticket" size={size} color={color} />
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="contatti"
            options={{
              title: "Contatti",
              tabBarIcon: ({ color, size, focused }) => (
                <View style={focused ? styles.activeIcon : undefined}>
                  <Ionicons name="location" size={size} color={color} />
                </View>
              ),
            }}
          />
        </Tabs>
        <OrderPad />
      </View>
    </OrderProvider>
  )
}

const styles = StyleSheet.create({
  activeIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255,217,15,0.7)",
  },
})
