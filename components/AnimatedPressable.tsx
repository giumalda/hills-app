import { useState } from "react"
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Pressable, type PressableProps } from "react-native"

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable)

export function AnimatedPressable({ onPressIn, onPressOut, style, ...props }: PressableProps) {
  const [pressed, setPressed] = useState(false)
  const scale = useSharedValue(1)
  const reduceMotion = useReducedMotion()
  const resolvedStyle = typeof style === "function"
    ? style({ pressed, hovered: false, focused: false })
    : style
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
    />
  )
}
