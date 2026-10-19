import { View, type ViewProps, Platform, StyleSheet } from "react-native"
import { BlurView } from "expo-blur"
import { glassShadow } from "@/constants/theme"

type Props = ViewProps & {
  intensity?: number
  tintColor?: string
  shadow?: boolean
}

export function LiquidGlass({
  style,
  children,
  intensity = 72,
  tintColor = "rgba(255,255,255,0.38)",
  shadow = true,
  ...rest
}: Props) {
  return (
    <View
      {...rest}
      style={[
        styles.container,
        shadow ? glassShadow : null,
        {
          backgroundColor: "transparent",
          borderColor: "rgba(255,255,255,0.64)",
        },
        Platform.OS === "web" ? styles.webGlass : null,
        style,
      ]}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          pointerEvents="none"
          intensity={intensity}
          tint="systemThinMaterialLight"
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.tint,
          Platform.OS === "android" && styles.androidTint,
          { backgroundColor: tintColor },
        ]}
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
    backdropFilter: "blur(24px) saturate(180%)",
  },
  tint: {
    opacity: 0.32,
  },
  androidTint: {
    opacity: 0.68,
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 1,
    right: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.72)",
  },
})
