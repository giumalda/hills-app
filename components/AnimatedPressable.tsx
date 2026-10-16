import { useState } from "react"
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Pressable, StyleSheet, type PressableProps } from "react-native"
import { LiquidGlass } from "@/components/LiquidGlass"

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
    ? style({ pressed, hovered: false })
    : style
  const borderRadius = StyleSheet.flatten(resolvedStyle)?.borderRadius ?? 22
  const renderedChildren = typeof children === "function"
    ? children({ pressed, hovered: false })
    : children
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
        <LiquidGlass
          pointerEvents="none"
          shadow={false}
          intensity={24}
          style={[StyleSheet.absoluteFillObject, { borderRadius }]}
        />
      ) : null}
      {renderedChildren}
    </AnimatedPressableBase>
  )
}
