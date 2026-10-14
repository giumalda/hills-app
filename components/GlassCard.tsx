import { View, type ViewProps, Platform, StyleSheet } from "react-native"
import { BlurView } from "expo-blur"
import { glassShadow } from "@/constants/theme"

type Props = ViewProps & {
  intensity?: number
  radius?: number
  padding?: number
}

/** Liquid-glass card come sul sito */
export function GlassCard({ style, children, intensity = 18, radius = 24, padding = 18, ...rest }: Props) {
  const radiusStyle = { borderRadius: radius, overflow: "hidden" as const }

  if (Platform.OS === "web") {
    return (
      <View
        {...rest}
        style={[
          styles.webGlass,
          radiusStyle,
          { padding },
          glassShadow,
          style,
        ]}
      >
        {children}
      </View>
    )
  }

  return (
    <View style={[radiusStyle, glassShadow, style]} {...rest}>
      <BlurView intensity={intensity} tint="light" style={[StyleSheet.absoluteFill, radiusStyle]} />
      <View
        style={[
          StyleSheet.absoluteFill,
          radiusStyle,
          { backgroundColor: "rgba(255,255,255,0.55)", borderWidth: 1, borderColor: "rgba(255,255,255,0.7)" },
        ]}
      />
      <View style={{ padding }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  webGlass: {
    backgroundColor: "rgba(255,255,255,0.58)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    // @ts-expect-error web CSS
    backdropFilter: "blur(10px) saturate(135%)",
    // @ts-expect-error web CSS
    WebkitBackdropFilter: "blur(10px) saturate(135%)",
  },
})
