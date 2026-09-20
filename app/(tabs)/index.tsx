import { ScrollView, View, Text, Image, Linking, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { PopCard } from "@/components/PopCard"
import { PopButton } from "@/components/PopButton"
import { SectionTitle } from "@/components/SectionTitle"
import { COLORS } from "@/constants/theme"
import { VENUE, FEATURES, REVIEWS } from "@/data/info"

export default function Home() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const isWide = width > 640
  const featureW = isWide ? (Math.min(width, 900) - 40 - 16) / 2 : (width - 40 - 12) / 2

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.sky }}
      contentContainerStyle={{ paddingBottom: 48, alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: "100%", maxWidth: 900, paddingTop: insets.top + 12 }}>
        {/* Brand bar */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "900", color: COLORS.ink, letterSpacing: -0.5 }}>HILL&apos;S</Text>
          <Text style={{ fontSize: 22, fontWeight: "900", color: COLORS.red, letterSpacing: -0.5 }}>BURGER</Text>
          <View style={{ backgroundColor: COLORS.ink, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ color: COLORS.yellow, fontSize: 10, fontWeight: "900", letterSpacing: 1 }}>{VENUE.by}</Text>
          </View>
        </View>

        {/* Tag pills */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, paddingHorizontal: 20, marginBottom: 12 }}>
          {VENUE.tags.map((t) => (
            <View key={t} style={{ backgroundColor: COLORS.ink, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 }}>
              <Text style={{ color: COLORS.white, fontSize: 10, fontWeight: "800", letterSpacing: 0.5 }}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Hero */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 52, lineHeight: 52, fontWeight: "900", color: COLORS.ink, letterSpacing: -2 }}>
            {VENUE.heroTop}
          </Text>
          <Text style={{ fontSize: 52, lineHeight: 54, fontWeight: "900", color: COLORS.red, letterSpacing: -2 }}>
            {VENUE.heroBottom}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 8, marginBottom: 4 }}>
          <View style={{ position: "relative" }}>
            <Image
              source={require("@/assets/images/hero-burger.png")}
              style={{ width: Math.min(width - 40, 420), height: Math.min(width - 40, 420) }}
              resizeMode="contain"
            />
            <View
              style={{
                position: "absolute",
                top: 6,
                right: 10,
                backgroundColor: COLORS.red,
                borderWidth: 3,
                borderColor: COLORS.ink,
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 8,
                transform: [{ rotate: "12deg" }],
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "900", fontSize: 14 }}>40+ PANINI!</Text>
            </View>
          </View>
        </View>

        {/* Intro */}
        <View style={{ paddingHorizontal: 20 }}>
          <PopCard bg={COLORS.cream} style={{ padding: 18 }}>
            <Text style={{ fontSize: 16, lineHeight: 24, color: COLORS.ink, fontWeight: "600" }}>{VENUE.intro}</Text>
          </PopCard>

          <View style={{ flexDirection: "row", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <View style={{ flex: 1, minWidth: 150 }}>
              <PopButton label="GUARDA IL MENÙ" icon="fast-food" bg={COLORS.yellow} color={COLORS.ink} onPress={() => router.push("/menu")} />
            </View>
            <View style={{ flex: 1, minWidth: 150 }}>
              <PopButton label="PRENOTA" icon="calendar" bg={COLORS.red} onPress={() => router.push("/prenota")} />
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={{ paddingHorizontal: 20, marginTop: 34 }}>
          <SectionTitle accent={COLORS.pink}>IL LOCALE</SectionTitle>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {FEATURES.map((f) => (
              <PopCard key={f.title} bg={COLORS.white} style={{ width: featureW, padding: 14 }}>
                <Text style={{ fontSize: 30 }}>{f.emoji}</Text>
                <Text style={{ fontSize: 15, fontWeight: "900", color: COLORS.ink, marginTop: 6 }}>{f.title}</Text>
                <Text style={{ fontSize: 12, color: "rgba(17,17,17,0.7)", marginTop: 4, lineHeight: 17 }}>{f.desc}</Text>
              </PopCard>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={{ marginTop: 34 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <SectionTitle accent={COLORS.orange}>RECENSIONI</SectionTitle>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {REVIEWS.map((r) => (
              <PopCard key={r.name} bg={COLORS.cream} style={{ width: 260, padding: 16 }}>
                <View style={{ flexDirection: "row", gap: 2, marginBottom: 8 }}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Ionicons key={i} name="star" size={16} color={COLORS.orange} />
                  ))}
                </View>
                <Text style={{ fontSize: 14, lineHeight: 20, color: COLORS.ink, fontWeight: "500" }}>{r.text}</Text>
                <Text style={{ fontSize: 13, fontWeight: "900", color: COLORS.red, marginTop: 10 }}>{r.name}</Text>
              </PopCard>
            ))}
          </ScrollView>
        </View>

        {/* WhatsApp CTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 34 }}>
          <PopCard bg={COLORS.green} style={{ padding: 18 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Ionicons name="logo-whatsapp" size={38} color={COLORS.white} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: "900", color: COLORS.white }}>Prenota su WhatsApp!</Text>
                <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>Rispondiamo in pochi minuti</Text>
              </View>
              <PopButton label="APRI" bg={COLORS.white} color={COLORS.green} onPress={() => Linking.openURL(VENUE.whatsapp)} />
            </View>
          </PopCard>
        </View>
      </View>
    </ScrollView>
  )
}
