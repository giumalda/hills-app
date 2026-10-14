import { useEffect } from "react"
import { ScrollView, View, Text, Image, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import Animated, {
  cancelAnimation,
  FadeInDown,
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"
import { PopButton } from "@/components/PopButton"
import { AnimatedPressable } from "@/components/AnimatedPressable"
import { DotBackground } from "@/components/DotBackground"
import { SurfaceCard } from "@/components/SurfaceCard"
import { COLORS, FONTS } from "@/constants/theme"
import { HOURS } from "@/data/info"

const todayIndex = new Date().getDay()
const today = HOURS[todayIndex === 0 ? 6 : todayIndex - 1]

const QUICK_LINKS = [
  { title: "Galleria", subtitle: "Guarda i nostri panini", icon: "images-outline" as const, route: "/galleria" },
  { title: "Contatti", subtitle: `${today.day}: ${today.time}`, icon: "location-outline" as const, route: "/contatti" },
]

export default function Home() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isWide = width > 640
  const float = useSharedValue(0)
  const reduceMotion = useReducedMotion()
  const burgerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: reduceMotion ? 0 : float.value }],
  }), [reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      float.value = 0
      return
    }
    float.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 1600 }),
        withTiming(0, { duration: 1600 }),
      ),
      -1,
    )
    return () => cancelAnimation(float)
  }, [float, reduceMotion])

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.sun }}>
      <DotBackground />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: 900, paddingTop: insets.top + 16, paddingHorizontal: 20 }}>
          <Animated.View
            entering={FadeInDown.duration(380).reduceMotion(ReduceMotion.System)}
            style={{
              alignItems: "center",
              backgroundColor: "#FFF8D8",
              borderRadius: 28,
              borderWidth: 1,
              borderColor: "rgba(26,20,15,0.08)",
              paddingHorizontal: 20,
              paddingTop: 12,
              paddingBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 17, color: COLORS.ink }}>HILL&apos;S</Text>
              <Text style={{ fontFamily: FONTS.display, fontSize: 17, color: COLORS.red }}>BURGER</Text>
              <Text style={{ fontFamily: FONTS.sansBold, fontSize: 10, color: "rgba(26,20,15,0.58)" }}>
                · MOTTOLA
              </Text>
            </View>
            <Text style={{ fontFamily: FONTS.display, fontSize: 28, lineHeight: 33, color: COLORS.ink, textAlign: "center", marginTop: 10 }}>
              COSA TI VA OGGI?
            </Text>
            <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 13, color: "rgba(26,20,15,0.68)", textAlign: "center", marginTop: 3 }}>
              Scegli dal menu o crea il tuo panino
            </Text>
            <Animated.View style={[{ marginTop: 2 }, burgerStyle]}>
              <Image
                source={require("@/assets/images/hero-burger.png")}
                accessibilityLabel="Illustrazione di hamburger Hill's"
                style={{ width: Math.min(width - 100, 220), height: Math.min(width - 100, 120) }}
                resizeMode="contain"
              />
            </Animated.View>
            <View style={{ width: "100%", gap: 10, marginTop: 8, maxWidth: 420 }}>
              <PopButton
                label="VAI AL MENU"
                icon="fast-food"
                bg={COLORS.yellow}
                color={COLORS.ink}
                onPress={() => router.push("/menu")}
              />
              <PopButton
                label="CREA IL TUO OMERO"
                icon="construct"
                bg={COLORS.ink}
                color={COLORS.sun}
                onPress={() => router.push("/crea-omero")}
              />
            </View>
          </Animated.View>

          <View style={{ marginTop: 14 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 18, color: COLORS.ink, marginBottom: 10 }}>
              INIZIA DA QUI
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {QUICK_LINKS.map((link) => (
                <AnimatedPressable
                  key={link.title}
                  accessibilityRole="button"
                  onPress={() => router.push(link.route)}
                  style={{ width: isWide ? (Math.min(width, 900) - 52) / 2 : (width - 52) / 2 }}
                >
                  <SurfaceCard padding={10} style={{ minHeight: 80, justifyContent: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                      <Ionicons name={link.icon} size={24} color={COLORS.red} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: FONTS.display, fontSize: 15, color: COLORS.ink }}>{link.title}</Text>
                        <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, color: "rgba(26,20,15,0.62)", marginTop: 2 }}>
                          {link.subtitle}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color="rgba(26,20,15,0.45)" />
                    </View>
                  </SurfaceCard>
                </AnimatedPressable>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}
