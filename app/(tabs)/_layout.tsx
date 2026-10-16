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
                intensity={58}
                tintColor="rgba(255,255,255,0.3)"
                style={[StyleSheet.absoluteFillObject, { borderRadius: 28 }]}
              />
            ),
            tabBarStyle: {
              position: "absolute",
              left: 10,
              right: 10,
              bottom: Platform.OS === "web" ? 8 : insets.bottom + 8,
              height: 78,
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderTopColor: "transparent",
              shadowColor: "#000",
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: Platform.OS === "android" ? 6 : 0,
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
