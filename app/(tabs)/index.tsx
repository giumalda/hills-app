import { ScrollView, View, Text, Image, Linking, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PopButton } from "@/components/PopButton";
import { SectionTitle } from "@/components/SectionTitle";
import { DotBackground } from "@/components/DotBackground";
import { SurfaceCard } from "@/components/SurfaceCard";
import { COLORS, FONTS } from "@/constants/theme";
import { VENUE, FEATURES, REVIEWS } from "@/data/info";

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width > 640;
  const featureW = isWide ? (Math.min(width, 900) - 40 - 16) / 2 : (width - 40 - 12) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.sun }}>
      <DotBackground />

      <ScrollView
        style={{ backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 150, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: 900, paddingTop: insets.top + 12 }}>
          
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink, letterSpacing: -0.5 }}>HILL&apos;S</Text>
            <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.red, letterSpacing: -0.5 }}>BURGER</Text>
            <View style={{ backgroundColor: COLORS.ink, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ color: COLORS.yellow, fontFamily: FONTS.display, fontSize: 10, letterSpacing: 1 }}>{VENUE.by}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, paddingHorizontal: 20, marginBottom: 12 }}>
            {VENUE.tags.map((t) => (
              <View key={t} style={{ backgroundColor: COLORS.ink, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ color: COLORS.white, fontFamily: FONTS.sansBold, fontSize: 10, letterSpacing: 0.5 }}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 52, lineHeight: 52, color: COLORS.ink, letterSpacing: -2 }}>
              {VENUE.heroTop}
            </Text>
            <Text style={{ fontFamily: FONTS.display, fontSize: 52, lineHeight: 54, color: COLORS.red, letterSpacing: -2 }}>
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
                <Text style={{ color: COLORS.white, fontFamily: FONTS.display, fontSize: 14 }}>40+ PANINI!</Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <SurfaceCard padding={18}>
              <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 16, lineHeight: 24, color: COLORS.ink }}>{VENUE.intro}</Text>
            </SurfaceCard>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              <View style={{ flex: 1, minWidth: 150 }}>
                <PopButton label="GUARDA IL MENÙ" icon="fast-food" bg={COLORS.yellow} color={COLORS.ink} onPress={() => router.push("/menu")} />
              </View>
              <View style={{ flex: 1, minWidth: 150 }}>
                <PopButton label="PRENOTA" icon="calendar" bg={COLORS.red} onPress={() => router.push("/prenota")} />
              </View>
              <View style={{ flex: 1, minWidth: 150 }}>
                <PopButton label="CREA OMERO" icon="construct" bg={COLORS.ink} color={COLORS.sun} onPress={() => router.push("/crea-omero")} />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 34 }}>
            <SectionTitle accent={COLORS.pink}>IL LOCALE</SectionTitle>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {FEATURES.map((f) => (
                <SurfaceCard key={f.title} style={{ width: featureW }} padding={14}>
                  <Text style={{ fontSize: 30 }}>{f.emoji}</Text>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 15, color: COLORS.ink, marginTop: 6 }}>{f.title}</Text>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, color: "rgba(17,17,17,0.7)", marginTop: 4, lineHeight: 17 }}>{f.desc}</Text>
                </SurfaceCard>
              ))}
            </View>
          </View>

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
                <SurfaceCard key={r.name} style={{ width: 260 }} padding={16}>
                  <View style={{ flexDirection: "row", gap: 2, marginBottom: 8 }}>
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Ionicons key={i} name="star" size={16} color={COLORS.orange} />
                    ))}
                  </View>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 14, lineHeight: 20, color: COLORS.ink }}>{r.text}</Text>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.red, marginTop: 10 }}>{r.name}</Text>
                </SurfaceCard>
              ))}
            </ScrollView>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 34 }}>
            <SurfaceCard padding={18}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="logo-whatsapp" size={38} color={COLORS.green} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 17, color: COLORS.ink }}>Prenota su WhatsApp!</Text>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 13, color: "rgba(26,20,15,0.7)" }}>Rispondiamo in pochi minuti</Text>
                </View>
                <PopButton label="APRI" bg={COLORS.green} color={COLORS.white} onPress={() => Linking.openURL(VENUE.whatsapp)} />
              </View>
            </SurfaceCard>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
