import { View, StyleSheet, useWindowDimensions } from "react-native"
import { COLORS } from "@/constants/theme"

type CloudSpec = {
  top: number
  left: number
  scale: number
  opacity?: number
}

const CLOUDS: CloudSpec[] = [
  { top: 40, left: -30, scale: 1.1 },
  { top: 120, left: 180, scale: 0.85 },
  { top: 220, left: 20, scale: 1.25 },
  { top: 340, left: 220, scale: 0.95 },
  { top: 480, left: -40, scale: 1.15 },
  { top: 600, left: 150, scale: 1.0 },
  { top: 760, left: 40, scale: 1.2 },
  { top: 920, left: 200, scale: 0.9 },
  { top: 1080, left: -20, scale: 1.1 },
  { top: 1240, left: 160, scale: 1.05 },
]

function Cloud({ top, left, scale, opacity = 1 }: CloudSpec) {
  const s = scale
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top,
        left,
        width: 160 * s,
        height: 70 * s,
        opacity,
      }}
    >
      <View
        style={[
          styles.puff,
          {
            width: 70 * s,
            height: 52 * s,
            borderRadius: 35 * s,
            left: 10 * s,
            bottom: 0,
          },
        ]}
      />
      <View
        style={[
          styles.puff,
          {
            width: 90 * s,
            height: 68 * s,
            borderRadius: 45 * s,
            left: 40 * s,
            bottom: 4 * s,
          },
        ]}
      />
      <View
        style={[
          styles.puff,
          {
            width: 62 * s,
            height: 48 * s,
            borderRadius: 31 * s,
            left: 100 * s,
            bottom: 0,
          },
        ]}
      />
      <View
        style={[
          styles.base,
          {
            width: 140 * s,
            height: 36 * s,
            borderRadius: 18 * s,
            left: 8 * s,
            bottom: 0,
          },
        ]}
      />
    </View>
  )
}

/** Sfondo cielo azzurro con nuvole cartoon stile Simpson */
export function CloudBackground() {
  const { height, width } = useWindowDimensions()
  const repeats = Math.max(2, Math.ceil(height / 400) + 2)

  const clouds: CloudSpec[] = []
  for (let i = 0; i < repeats; i++) {
    for (const c of CLOUDS) {
      clouds.push({
        ...c,
        top: c.top + i * 700,
        left: (c.left / 320) * Math.min(width, 900) + (i % 2 === 0 ? 0 : 40),
        opacity: 0.95,
      })
    }
  }

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.sky, overflow: "hidden" }]}>
      {clouds.map((c, i) => (
        <Cloud key={i} {...c} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  puff: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: COLORS.ink,
  },
  base: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: COLORS.ink,
  },
})
