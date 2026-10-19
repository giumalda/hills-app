import { View } from "react-native"
import { COLORS, FONTS } from "@/constants/theme"
import { AppText as Text } from "@/components/AppText"

export function SectionTitle({ children, accent = COLORS.red }: { children: string; accent?: string }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ width: 14, height: 28, backgroundColor: accent, borderWidth: 2, borderColor: COLORS.ink, borderRadius: 4 }} />
        <Text style={{ fontFamily: FONTS.display, fontSize: 28, color: COLORS.ink, letterSpacing: -0.5 }}>{children}</Text>
      </View>
    </View>
  )
}
