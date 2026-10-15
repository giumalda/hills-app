import { Image, Platform, View, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { COLORS } from "@/constants/theme"

export function DotBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#FFF3A6", COLORS.sun, "#F2C400"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          Platform.OS === "web" ? {
            opacity: 0.18,
            backgroundImage:
              "radial-gradient(rgba(26, 20, 15, 0.38) 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          } : null,
        ]}
      />
      {Platform.OS !== "web" ? (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Image
            source={require("../assets/images/dot-pattern.png")}
            resizeMode="repeat"
            style={[StyleSheet.absoluteFill, { opacity: 0.18 }]}
          />
        </View>
      ) : null}
    </View>
  )
}
