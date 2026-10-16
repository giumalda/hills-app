import { View, type ViewProps } from "react-native"
import { glassShadow } from "@/constants/theme"
import { LiquidGlass } from "@/components/LiquidGlass"

type Props = ViewProps & {
  bg?: string
  glass?: boolean
  tintColor?: string
}

export function PopCard({
  style,
  bg = "#FFFFFF",
  children,
  glass = false,
  tintColor,
  ...rest
}: Props) {
  const cardStyle = [
    {
      backgroundColor: glass ? "transparent" : bg,
      borderWidth: 1,
      borderColor: glass ? "rgba(255,255,255,0.72)" : "rgba(26,20,15,0.08)",
      borderRadius: 22,
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
