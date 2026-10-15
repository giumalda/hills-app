import { useEffect } from "react"
import { ScrollView, View, Text, Image, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Link } from "expo-router"
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
import { FEATURES, HOURS } from "@/data/info"

const todayIndex = new Date().getDay()
const today = HOURS[todayIndex === 0 ? 6 : todayIndex - 1]

const QUICK_LINKS = [
  { title: "Coupon", subtitle: "Scopri le promozioni attive", icon: "ticket-outline" as const, href: "/coupon" as const },
  { title: "Contatti", subtitle: "Orari e come arrivare", icon: "location-outline" as const, href: "/contatti" as const },
]

export default function Home() {
  const insets = useSafeAreaInsets()
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
    <View style={{ flex: 1, backgroundColor: COLORS.sky }}>
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
              backgroundColor: "#D8F5FF",
              borderRadius: 30,
              borderWidth: 2,
              borderColor: COLORS.ink,
              paddingHorizontal: 20,
              paddingTop: 18,
              paddingBottom: 18,
              ...{
                shadowColor: COLORS.ink,
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 0,
                elevation: 5,
              },
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 7 }}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 25, color: COLORS.ink, letterSpacing: -0.6 }}>
                HILL&apos;S
              </Text>
              <Text style={{ fontFamily: FONTS.display, fontSize: 25, color: COLORS.red, letterSpacing: -0.6 }}>
                BURGER
              </Text>
              <View style={{ backgroundColor: COLORS.ink, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4 }}>
                <Text style={{ fontFamily: FONTS.display, fontSize: 10, color: COLORS.yellow, letterSpacing: 0.5 }}>
                  BY ANTONIO
                </Text>
              </View>
            </View>
            <View style={{ alignSelf: "stretch", backgroundColor: COLORS.ink, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, marginTop: 15 }}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 10, letterSpacing: 1.1, color: COLORS.yellow, textAlign: "center" }}>
                HAMBURGHERIA · FAST FOOD · PANINOTECA · MOTTOLA (TA)
              </Text>
            </View>
            <Text style={{ fontFamily: FONTS.display, fontSize: 29, lineHeight: 34, color: COLORS.ink, textAlign: "center", marginTop: 14 }}>
              QUI COMANDA
            </Text>
            <Text style={{ fontFamily: FONTS.display, fontSize: 33, lineHeight: 38, color: COLORS.red, textAlign: "center" }}>
              IL PANINO!
            </Text>
            <Animated.View style={[{ marginTop: 7 }, burgerStyle]}>
              <Image
                source={require("@/assets/images/hero-burger.png")}
                accessibilityLabel="Illustrazione di hamburger Hill's"
                style={{ width: Math.min(width - 100, 260), height: Math.min(width - 100, 155) }}
                resizeMode="contain"
              />
            </Animated.View>
            <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 13, lineHeight: 20, color: COLORS.ink, textAlign: "center", marginTop: 4, marginBottom: 14 }}>
              40 e più panini a tema Simpson, carni selezionate e patatine dorate.
            </Text>
            <View style={{ width: "100%", gap: 10, maxWidth: 460 }}>
              <Link href="/menu" asChild>
                <PopButton label="GUARDA IL MENU" icon="fast-food" bg={COLORS.yellow} color={COLORS.ink} />
              </Link>
              <Link href="/crea-omero" asChild>
                <PopButton label="CREA IL TUO OMERO" icon="construct" bg={COLORS.ink} color={COLORS.sun} />
              </Link>
            </View>
          </Animated.View>

          <Link href="/coupon" asChild>
            <AnimatedPressable accessibilityRole="button" style={{ marginTop: 22 }}>
              <View
                style={{
                  backgroundColor: "#FFF8D8",
                  borderWidth: 2,
                  borderColor: COLORS.ink,
                  borderRadius: 24,
                  padding: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 13,
                }}
              >
                <View style={{ width: 54, height: 54, borderRadius: 999, backgroundColor: COLORS.yellow, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="ticket" size={27} color={COLORS.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 11, color: COLORS.red, letterSpacing: 0.8 }}>
                    IN EVIDENZA
                  </Text>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 18, color: COLORS.ink }}>
                    Coupon del giorno e della settimana
                  </Text>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 11, lineHeight: 16, color: "rgba(26,20,15,0.7)", marginTop: 3 }}>
                    Apri le promozioni per vedere le offerte e i coupon attivi.
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.ink} />
              </View>
            </AnimatedPressable>
          </Link>

          <View style={{ marginTop: 24 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.ink, marginBottom: 11 }}>
              INIZIA DA QUI
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {QUICK_LINKS.map((link) => (
                <Link key={link.title} href={link.href} asChild>
                  <AnimatedPressable
                    accessibilityRole="button"
                    style={{ width: isWide ? (Math.min(width, 900) - 52) / 2 : (width - 52) / 2 }}
                  >
                    <SurfaceCard padding={13} style={{ minHeight: 88, justifyContent: "center" }}>
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
                </Link>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.ink, marginBottom: 11 }}>
              BENVENUTI A SPRINGFIELD
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {FEATURES.map((feature) => (
                <SurfaceCard
                  key={feature.title}
                  padding={14}
                  style={{ width: isWide ? (Math.min(width, 900) - 52) / 2 : (width - 52) / 2, minHeight: 112 }}
                >
                  <Text style={{ fontSize: 25 }}>{feature.emoji}</Text>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 14, color: COLORS.ink, marginTop: 5 }}>
                    {feature.title}
                  </Text>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, lineHeight: 15, color: "rgba(26,20,15,0.68)", marginTop: 3 }}>
                    {feature.desc}
                  </Text>
                </SurfaceCard>
              ))}
            </View>
          </View>

          <Link href="/contatti" asChild>
            <AnimatedPressable accessibilityRole="button" style={{ marginTop: 18 }}>
              <SurfaceCard padding={15}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 999, backgroundColor: "rgba(230,57,43,0.1)", alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="time-outline" size={22} color={COLORS.red} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: FONTS.display, fontSize: 14, color: COLORS.ink }}>
                      {today.day} · {today.time}
                    </Text>
                    <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 11, color: "rgba(26,20,15,0.63)", marginTop: 3 }}>
                      Piazza Trieste, 35 · Mottola (TA)
                    </Text>
                  </View>
                  <Ionicons name="navigate-outline" size={19} color={COLORS.ink} />
                </View>
              </SurfaceCard>
            </AnimatedPressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  )
}
