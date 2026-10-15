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
            tabBarLabelPosition: "below-icon",
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
                <TabIcon name="home" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="menu"
            options={{
              title: "Menù",
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon name="fast-food" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="crea-omero"
            options={{
              title: "Crea",
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon name="construct" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="galleria"
            options={{
              title: "Galleria",
              href: null,
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon name="images" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="coupon"
            options={{
              title: "Coupon",
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon name="ticket" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="contatti"
            options={{
              title: "Contatti",
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon name="location" color={color} size={size} focused={focused} />
              ),
            }}
          />
        </Tabs>
        <OrderPad />
      </View>
    </OrderProvider>
  )
}

function TabIcon({
  name,
  color,
  size,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap
  color: string
  size: number
  focused: boolean
}) {
  const icon = <Ionicons name={name} size={size} color={color} />

  return focused ? (
    <LiquidGlass intensity={36} tintColor="rgba(255,217,15,0.72)" style={styles.activeIcon}>
      {icon}
    </LiquidGlass>
  ) : (
    <View style={styles.iconContainer}>{icon}</View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 22,
  },
  activeIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: COLORS.sun,
  },
})
