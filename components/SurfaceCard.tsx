import { View, type ViewProps } from "react-native"
import { glassShadow } from "@/constants/theme"

type Props = ViewProps & {
  radius?: number
  padding?: number
}

export function SurfaceCard({ style, children, radius = 22, padding = 18, ...rest }: Props) {
  return (
    <View
      {...rest}
      style={[
        {
          borderRadius: radius,
          borderWidth: 1,
          borderColor: "rgba(26,20,15,0.08)",
          backgroundColor: "#FFFEFA",
          padding,
          ...glassShadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}
