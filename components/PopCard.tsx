import { View, type ViewProps } from "react-native"
import { hardShadow } from "@/constants/theme"

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
          borderWidth: border,
          borderColor: "#111111",
          borderRadius: 18,
          ...hardShadow,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}
