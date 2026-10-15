import { Platform, ScrollView, View, Text, Linking, useWindowDimensions } from "react-native"
import { WebView } from "react-native-webview"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { PopCard } from "@/components/PopCard"
import { DotBackground } from "@/components/DotBackground"
import { SectionTitle } from "@/components/SectionTitle"
import { AnimatedPressable } from "@/components/AnimatedPressable"
import { COLORS } from "@/constants/theme"
import { VENUE, HOURS, SERVICES, SOCIAL_LINKS } from "@/data/info"

const TODAY = new Date().getDay() // 0=Sun
// Map JS day index to HOURS array (HOURS[0] = Monday)
const todayIdx = TODAY === 0 ? 6 : TODAY - 1

export default function Contatti() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const maxW = Math.min(width, 900)
  const serviceW = maxW > 640 ? (maxW - 40 - 24) / 3 : (maxW - 40 - 12) / 2

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.sun }}>
      <DotBackground />
      <ScrollView style={{ backgroundColor: "transparent" }} contentContainerStyle={{ alignItems: "center", paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
      <View style={{ width: "100%", maxWidth: 900, paddingTop: insets.top + 16, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 34, fontWeight: "900", color: COLORS.ink, letterSpacing: -1, marginBottom: 4 }}>CONTATTI</Text>
        <Text style={{ fontSize: 15, fontWeight: "700", color: COLORS.ink, opacity: 0.8, marginBottom: 20 }}>{VENUE.fullName}</Text>

        {/* Quick actions */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          <AnimatedPressable style={{ flex: 1 }} onPress={() => Linking.openURL(VENUE.phoneHref)}>
            <PopCard bg={COLORS.red} style={{ padding: 16, alignItems: "center" }}>
              <Ionicons name="call" size={26} color={COLORS.white} />
              <Text style={{ color: COLORS.white, fontWeight: "900", marginTop: 6, fontSize: 13 }}>CHIAMA</Text>
            </PopCard>
          </AnimatedPressable>
          <AnimatedPressable style={{ flex: 1 }} onPress={() => Linking.openURL(VENUE.whatsapp)}>
            <PopCard bg={COLORS.green} style={{ padding: 16, alignItems: "center" }}>
              <Ionicons name="logo-whatsapp" size={26} color={COLORS.white} />
              <Text style={{ color: COLORS.white, fontWeight: "900", marginTop: 6, fontSize: 13 }}>WHATSAPP</Text>
            </PopCard>
          </AnimatedPressable>
        </View>

        <PopCard bg={COLORS.cream} style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <View style={{ backgroundColor: COLORS.pink, borderWidth: 2, borderColor: COLORS.ink, borderRadius: 10, width: 44, height: 44, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="location" size={22} color={COLORS.ink} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "rgba(17,17,17,0.6)" }}>Dove siamo</Text>
              <Text style={{ fontSize: 15, fontWeight: "900", color: COLORS.ink }}>{VENUE.address}</Text>
            </View>
        </PopCard>

        <View style={{ height: 240, overflow: "hidden", borderRadius: 22, borderWidth: 2, borderColor: COLORS.ink, marginBottom: 24 }}>
          {Platform.OS === "web" ? (
            <iframe
              title="Mappa di Hill's Burger a Mottola"
              src={VENUE.mapEmbed}
              loading="lazy"
              style={{ border: 0, width: "100%", height: "100%" }}
            />
          ) : (
            <WebView
              source={{ uri: VENUE.mapEmbed }}
              accessibilityLabel="Mappa di Hill's Burger a Mottola"
              javaScriptEnabled
              domStorageEnabled
              style={{ flex: 1 }}
            />
          )}
        </View>

        <SectionTitle accent={COLORS.pink}>SEGUICI</SectionTitle>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 24 }}>
          {SOCIAL_LINKS.map((social) => (
            <AnimatedPressable
              key={social.title}
              accessibilityRole="link"
              accessibilityLabel={social.title}
              onPress={() => Linking.openURL(social.url)}
              style={{ flex: 1 }}
            >
              <PopCard bg={COLORS.white} style={{ padding: 13, alignItems: "center" }}>
                <Ionicons name={social.icon} size={25} color={social.color} />
                <Text style={{ fontSize: 10, fontWeight: "900", color: COLORS.ink, marginTop: 5 }}>{social.title}</Text>
              </PopCard>
            </AnimatedPressable>
          ))}
        </View>

        {/* Hours */}
        <SectionTitle accent={COLORS.orange}>ORARI</SectionTitle>
        <PopCard bg={COLORS.white} style={{ padding: 8, marginBottom: 24 }}>
          {HOURS.map((h, i) => {
            const isToday = i === todayIdx
            const closed = h.time === "Chiuso"
            return (
              <View
                key={h.day}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 11,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  backgroundColor: isToday ? COLORS.yellow : "transparent",
                  borderBottomWidth: i === HOURS.length - 1 ? 0 : 1.5,
                  borderBottomColor: "rgba(17,17,17,0.08)",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: isToday ? "900" : "700", color: COLORS.ink }}>{h.day}</Text>
                  {isToday ? (
                    <View style={{ backgroundColor: COLORS.red, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1 }}>
                      <Text style={{ fontSize: 9, fontWeight: "900", color: COLORS.white }}>OGGI</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={{ fontSize: 14, fontWeight: "800", color: closed ? COLORS.red : COLORS.ink }}>{h.time}</Text>
              </View>
            )
          })}
        </PopCard>

        {/* Services */}
        <SectionTitle accent={COLORS.pink}>SERVIZI</SectionTitle>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {SERVICES.map((s) => (
            <PopCard key={s.title} bg={COLORS.cream} style={{ width: serviceW, padding: 12 }}>
              <Text style={{ fontSize: 24 }}>{s.emoji}</Text>
              <Text style={{ fontSize: 13, fontWeight: "900", color: COLORS.ink, marginTop: 4 }}>{s.title}</Text>
              <Text style={{ fontSize: 11, color: "rgba(17,17,17,0.6)", marginTop: 2 }}>{s.desc}</Text>
            </PopCard>
          ))}
        </View>
      </View>
      </ScrollView>
    </View>
  )
}
