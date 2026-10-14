import { View, type ViewProps, Platform, StyleSheet } from "react-native"
import { BlurView } from "expo-blur"
import { glassShadow } from "@/constants/theme"

type Props = ViewProps & {
  bg?: string
  border?: number
}

export function PopCard({ style, bg = "#FFFFFF", border = 3, children, ...rest }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderWidth: Math.min(border, 1),
          borderColor: "rgba(255,255,255,0.78)",
          borderRadius: 22,
          overflow: "hidden",
          ...glassShadow,
          ...(Platform.OS === "web"
            ? {
                backdropFilter: "blur(10px) saturate(135%)",
                WebkitBackdropFilter: "blur(10px) saturate(135%)",
              }
            : {}),
        },
        style,
      ]}
      {...rest}
    >
      {Platform.OS !== "web" ? (
        <BlurView pointerEvents="none" intensity={18} tint="light" style={StyleSheet.absoluteFill} />
      ) : null}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: bg === "#FFFFFF" || bg === "#FFFDF0" ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)" },
        ]}
      />
      {children}
    </View>
  )
}
