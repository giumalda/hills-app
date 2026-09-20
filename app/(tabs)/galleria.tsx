import { ScrollView, View, Text, Image, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PopCard } from "@/components/PopCard"
import { COLORS } from "@/constants/theme"

const IMAGES = [
  { src: require("@/assets/images/hero-burger.png"), title: "Hill's Signature", tag: "SIMPSON", bg: COLORS.yellow },
  { src: require("@/assets/images/gallery-smash.png"), title: "Deconstructed Smash", tag: "BURGER", bg: COLORS.white },
  { src: require("@/assets/images/gallery-onion.png"), title: "Anelloni di Cipolla", tag: "FRITTURE", bg: COLORS.white },
  { src: require("@/assets/images/gallery-chips.png"), title: "Burger & Chips", tag: "LOCALE", bg: COLORS.white },
]

const TAG_COLORS: Record<string, string> = {
  SIMPSON: COLORS.red,
  BURGER: COLORS.pink,
  FRITTURE: COLORS.orange,
  LOCALE: COLORS.sky,
}

export default function Galleria() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const maxW = Math.min(width, 900)
  const isWide = maxW > 640
  const cardW = isWide ? (maxW - 40 - 16) / 2 : maxW - 40

  return (
    <ScrollView style={{ backgroundColor: COLORS.pink }} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={{ width: "100%", maxWidth: 900, paddingTop: insets.top + 16, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 34, fontWeight: "900", color: COLORS.ink, letterSpacing: -1 }}>GALLERIA</Text>
        <Text style={{ fontSize: 15, fontWeight: "700", color: COLORS.ink, marginBottom: 20, opacity: 0.8 }}>
          Uno sguardo a quello che ti aspetta 🍔
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          {IMAGES.map((img) => (
            <PopCard key={img.title} bg={img.bg} style={{ width: cardW, padding: 0, overflow: "hidden" }}>
              <Image source={img.src} style={{ width: "100%", height: 200 }} resizeMode="cover" />
              <View style={{ padding: 14, borderTopWidth: 3, borderTopColor: COLORS.ink, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.cream }}>
                <Text style={{ fontSize: 15, fontWeight: "900", color: COLORS.ink }}>{img.title}</Text>
                <View style={{ backgroundColor: TAG_COLORS[img.tag], borderWidth: 2, borderColor: COLORS.ink, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 }}>
                  <Text style={{ fontSize: 10, fontWeight: "900", color: img.tag === "LOCALE" ? COLORS.ink : COLORS.white }}>{img.tag}</Text>
                </View>
              </View>
            </PopCard>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
