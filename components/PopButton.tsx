import { View, type PressableProps } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { hardShadow, COLORS } from "@/constants/theme"
import { AnimatedPressable } from "@/components/AnimatedPressable"
import { AppText as Text } from "@/components/AppText"

type Props = PressableProps & {
  label: string
  bg?: string
  color?: string
  icon?: keyof typeof Ionicons.glyphMap
}

export function PopButton({ label, bg = COLORS.red, color = "#FFFFFF", icon, style, ...rest }: Props) {
  return (
    <AnimatedPressable
      {...rest}
      glass={false}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          borderWidth: 3,
          borderColor: "#111111",
          borderRadius: 999,
          paddingVertical: 14,
          paddingHorizontal: 22,
          ...(pressed ? { shadowOpacity: 0, elevation: 0 } : hardShadow),
        },
        typeof style === "function" ? undefined : style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {icon ? <Ionicons name={icon} size={20} color={color} /> : null}
        <Text style={{ color, fontSize: 16, fontWeight: "900", letterSpacing: 0.5 }}>{label}</Text>
      </View>
    </AnimatedPressable>
  )
}
