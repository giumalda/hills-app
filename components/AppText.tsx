import { Text as NativeText, Platform, StyleSheet, type TextProps, type TextStyle } from "react-native"
import { FONTS } from "@/constants/theme"

function fontForWeight(weight: TextStyle["fontWeight"]): string {
  if (weight === "900" || weight === "800" || weight === "bold") return FONTS.display
  if (weight === "700") return FONTS.sansBold
  if (weight === "600") return FONTS.sans
  return FONTS.sansMedium
}

export function AppText({ style, ...props }: TextProps) {
  const flattenedStyle = StyleSheet.flatten(style)
  const hasFontFamily = typeof flattenedStyle?.fontFamily === "string"
  const resolvedStyle: TextStyle = {
    ...flattenedStyle,
    fontFamily: flattenedStyle?.fontFamily ?? fontForWeight(flattenedStyle?.fontWeight),
    ...(Platform.OS === "android" ? { includeFontPadding: false } : {}),
    ...(!hasFontFamily && flattenedStyle?.fontWeight ? { fontWeight: "normal" } : {}),
  }

  return <NativeText {...props} style={resolvedStyle} />
}
