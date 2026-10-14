import { View, StyleSheet } from "react-native"
import { COLORS } from "@/constants/theme"

/** Sfondo giallo semplice con puntini, come il sito hills-burg1 */
export function DotBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.sun }]} />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: 0.35,
            // @ts-expect-error web-only CSS pattern
            backgroundImage:
              "radial-gradient(rgba(30, 20, 10, 0.1) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          },
        ]}
      />
      <View
        style={{
          position: "absolute",
          top: -80,
          left: -100,
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: COLORS.primary,
          opacity: 0.28,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -60,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: 160,
          backgroundColor: "#FFF6A8",
          opacity: 0.55,
        }}
      />
    </View>
  )
}
