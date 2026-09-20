import { Text, View } from "react-native"
import { COLORS } from "@/constants/theme"

export function SectionTitle({ children, accent = COLORS.red }: { children: string; accent?: string }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ width: 14, height: 28, backgroundColor: accent, borderWidth: 2, borderColor: COLORS.ink, borderRadius: 4 }} />
        <Text style={{ fontSize: 28, fontWeight: "900", color: COLORS.ink, letterSpacing: -0.5 }}>{children}</Text>
      </View>
    </View>
  )
}
