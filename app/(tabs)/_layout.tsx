import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Platform, StyleSheet, View } from "react-native"
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useEffect } from "react"
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
            tabBarLabelStyle: { fontSize: 10, fontFamily: FONTS.sansBold, marginTop: 4 },
            tabBarItemStyle: {
              borderRadius: 20,
              marginHorizontal: 4,
              paddingVertical: 4
            },
            tabBarBackground: () => (
              <LiquidGlass
                pointerEvents="none"
                intensity={80}
                tintColor="rgba(255,255,255,0.5)"
                style={[StyleSheet.absoluteFillObject, { borderRadius: 40 }]}
              />
            ),
            tabBarStyle: {
              position: "absolute",
              left: 16,
              right: 16,
              bottom: Platform.OS === "web" ? 24 : insets.bottom + 16,
              height: 80,
              borderRadius: 40,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.5)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 10 },
              elevation: 10,
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
  const scale = useSharedValue(1)
  const reduceMotion = useReducedMotion()
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reduceMotion ? 1 : scale.value }],
  }), [reduceMotion])

  useEffect(() => {
    scale.value = withSpring(focused ? 1.08 : 1, {
      damping: 14,
      stiffness: 240,
      reduceMotion: ReduceMotion.System,
    })
  }, [focused, scale])

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.iconContainer, focused && styles.activeIcon]}>
        <Ionicons name={name} size={size} color={focused ? COLORS.ink : color} />
        {focused && (
          <Text style={{ fontFamily: FONTS.sansBold, fontSize: 10, color: COLORS.ink, marginTop: 2 }}>
            {/* Il testo viene gestito qui per essere incluso nello stile attivo */}
          </Text>
        )}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  activeIcon: {
    backgroundColor: COLORS.sun,
    borderWidth: 1,
    borderColor: "rgba(26,20,15,0.12)",
  },
})
