import { View, type ViewProps } from "react-native"
import { glassShadow } from "@/constants/theme"
import { LiquidGlass } from "@/components/LiquidGlass"

type Props = ViewProps & {
  radius?: number
  padding?: number
  glass?: boolean
  tintColor?: string
}

export function SurfaceCard({
  style,
  children,
  radius = 22,
  padding = 18,
  glass = false,
  tintColor,
  ...rest
}: Props) {
  const cardStyle = [
    {
      borderRadius: radius,
      borderWidth: 1,
      borderColor: glass ? "rgba(255,255,255,0.72)" : "rgba(26,20,15,0.08)",
      backgroundColor: glass ? "transparent" : "#FFFEFA",
      padding,
      ...glassShadow,
    },
    style,
  ]

  if (glass) {
    return (
      <LiquidGlass
        {...rest}
        intensity={48}
        tintColor={tintColor ?? "rgba(255,255,255,0.34)"}
        style={cardStyle}
      >
        {children}
      </LiquidGlass>
    )
  }

  return <View {...rest} style={cardStyle}>{children}</View>
}
