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
            tabBarLabelStyle: { fontSize: 10, fontFamily: FONTS.sansBold, marginTop: 2 },
            tabBarItemStyle: { borderRadius: 999, marginHorizontal: 2, paddingHorizontal: 2 },
            tabBarBackground: () => (
              <LiquidGlass
                pointerEvents="none"
                intensity={68}
                tintColor="rgba(255,255,255,0.4)"
                style={[StyleSheet.absoluteFillObject, { borderRadius: 40 }]}
              />
            ),
            tabBarStyle: {
              position: "absolute",
              left: 24,
              right: 24,
              bottom: Platform.OS === "web" ? 24 : insets.bottom + 24,
              height: 70,
              borderRadius: 40,
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderTopColor: "transparent",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
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
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Animated.View>
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
    backgroundColor: COLORS.sun,
    borderWidth: 1,
    borderColor: "rgba(26,20,15,0.12)",
  },
})
