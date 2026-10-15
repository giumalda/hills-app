import { useState } from "react"
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { BlurView } from "expo-blur"
import { Platform, Pressable, StyleSheet, View, type PressableProps } from "react-native"

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable)

type Props = PressableProps & {
  glass?: boolean
}

export function AnimatedPressable({
  onPressIn,
  onPressOut,
  style,
  children,
  glass = false,
  ...props
}: Props) {
  const [pressed, setPressed] = useState(false)
  const scale = useSharedValue(1)
  const reduceMotion = useReducedMotion()
  const resolvedStyle = typeof style === "function"
    ? style({ pressed, hovered: false, focused: false })
    : style
  const borderRadius = StyleSheet.flatten(resolvedStyle)?.borderRadius ?? 22
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reduceMotion ? 1 : scale.value }],
  }), [reduceMotion])

  return (
    <AnimatedPressableBase
      {...props}
      onPressIn={(event) => {
        setPressed(true)
        if (!reduceMotion) {
          scale.value = withSpring(0.97, {
            damping: 16,
            stiffness: 260,
            reduceMotion: ReduceMotion.System,
          })
        }
        onPressIn?.(event)
      }}
      onPressOut={(event) => {
        setPressed(false)
        scale.value = withSpring(1, {
          damping: 16,
          stiffness: 260,
          reduceMotion: ReduceMotion.System,
        })
        onPressOut?.(event)
      }}
      style={[resolvedStyle, animatedStyle]}
    >
      {glass ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, styles.glass, { borderRadius }]}
        >
          {Platform.OS === "ios" ? (
            <BlurView
              pointerEvents="none"
              intensity={24}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
          ) : null}
          <View pointerEvents="none" style={styles.glassTint} />
          <View pointerEvents="none" style={styles.highlight} />
        </View>
      ) : null}
      {children}
    </AnimatedPressableBase>
  )
}

const stylesWeb = {
  // @ts-expect-error web-only CSS
  backdropFilter: "blur(14px) saturate(160%)",
  // @ts-expect-error web-only CSS
  WebkitBackdropFilter: "blur(14px) saturate(160%)",
}

const styles = StyleSheet.create({
  glass: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.58)",
    ...Platform.select({ web: stylesWeb }),
  },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 1,
    right: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.78)",
  },
})
