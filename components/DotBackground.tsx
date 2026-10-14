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
            opacity: 0.22,
            backgroundImage:
              "radial-gradient(rgba(30, 20, 10, 0.18) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          },
        ]}
      />
    </View>
  )
}
