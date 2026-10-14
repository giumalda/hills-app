import { View, type ViewProps, Platform, StyleSheet } from "react-native"
import { BlurView } from "expo-blur"
import { glassShadow } from "@/constants/theme"

type Props = ViewProps & {
  intensity?: number
  tintColor?: string
}

export function LiquidGlass({
  style,
  children,
  intensity = 72,
  tintColor = "rgba(255,255,255,0.38)",
  ...rest
}: Props) {
  return (
    <View
      {...rest}
      style={[
        styles.container,
        glassShadow,
        {
          backgroundColor: Platform.OS === "android" ? "rgba(255,255,255,0.92)" : tintColor,
          borderColor: "rgba(255,255,255,0.78)",
        },
        Platform.OS === "web" ? styles.webGlass : null,
        style,
      ]}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          pointerEvents="none"
          intensity={intensity}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.tint, { backgroundColor: tintColor }]}
      />
      <View pointerEvents="none" style={styles.highlight} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderWidth: 1,
  },
  webGlass: {
    // @ts-expect-error web-only CSS
    backdropFilter: "blur(24px) saturate(180%)",
    // @ts-expect-error web-only CSS
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
  },
  tint: {
    opacity: Platform.OS === "android" ? 1 : 0.48,
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 1,
    right: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.88)",
  },
})
