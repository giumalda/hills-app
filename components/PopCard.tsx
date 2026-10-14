import { View, type ViewProps } from "react-native"
import { glassShadow } from "@/constants/theme"

type Props = ViewProps & {
  bg?: string
}

export function PopCard({ style, bg = "#FFFFFF", children, ...rest }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: "rgba(26,20,15,0.08)",
          borderRadius: 22,
          ...glassShadow,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}
