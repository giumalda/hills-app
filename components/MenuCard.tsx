import { useState } from "react"
import { View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useOrder } from "@/components/order/OrderProvider"
import { SurfaceCard } from "@/components/SurfaceCard"
import { AnimatedPressable } from "@/components/AnimatedPressable"
import { AppText as Text } from "@/components/AppText"
import { COLORS, FONTS } from "@/constants/theme"

export type MenuCardItem = {
  n?: number | string
  name: string
  desc?: string
  price: number | string
  tag?: string
  isChallenge?: boolean
}

function readPrices(price: number | string): number[] {
  if (typeof price === "number") return [price]
  return (price.match(/\d+(?:[.,]\d{1,2})?/g) ?? [])
    .map((value) => Number(value.replace(",", ".")))
    .filter(Number.isFinite)
}

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`
}

export function MenuCard({ item }: { item: MenuCardItem }) {
  const { add, setOpen } = useOrder()
  const [size, setSize] = useState<"piccola" | "grande">("piccola")
  const nameUpper = item.name.toUpperCase()
  const descUpper = (item.desc ?? "").toUpperCase()
  const prices = readPrices(item.price)
  const isMaxiTagliere = nameUpper.includes("MAXI TAGLIERE")
  const hasSizes =
    !isMaxiTagliere &&
    prices.length >= 2 &&
    /(PATATINE|FRIES|RIPPLE|RIBBLE|CRISS|DIPPERS?)/.test(nameUpper + " " + descUpper)
  const sizePrices = prices.length >= 2 ? prices : [5, 10]
  const effectivePrice = hasSizes ? sizePrices[size === "piccola" ? 0 : 1] : prices[0] ?? 0
  const effectiveName = hasSizes ? `${item.name} (${size === "piccola" ? "Piccola" : "Grande"})` : item.name

  return (
    <SurfaceCard
      radius={22}
      padding={16}
      style={{
        marginBottom: 12,
        ...(item.isChallenge
          ? {
              backgroundColor: "#FFF0EB",
              borderColor: "rgba(230,57,43,0.38)",
              borderWidth: 2,
            }
          : {}),
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
        {item.n !== undefined ? (
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.75)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.9)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.ink }}>{item.n}</Text>
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FONTS.display,
                fontSize: 17,
                color: item.isChallenge ? COLORS.primary : COLORS.ink,
                textTransform: "uppercase",
                flexShrink: 1,
              }}
            >
              {effectiveName}
            </Text>
            {item.tag ? (
              <View style={{ backgroundColor: "rgba(230,57,43,0.12)", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontFamily: FONTS.sansBold, fontSize: 9, color: COLORS.primary, textTransform: "uppercase" }}>
                  {item.tag}
                </Text>
              </View>
            ) : null}
          </View>
          {item.desc ? (
            <Text style={{ marginTop: 6, fontFamily: FONTS.sansMedium, fontSize: 12, lineHeight: 17, color: "rgba(26,20,15,0.72)" }}>
              {item.desc}
            </Text>
          ) : null}
        </View>
      </View>

      {hasSizes ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {(["piccola", "grande"] as const).map((option) => {
            const optionPrice = sizePrices[option === "piccola" ? 0 : 1]
            const selected = size === option
            return (
              <AnimatedPressable
                key={option}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setSize(option)}
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  backgroundColor: selected ? COLORS.ink : "rgba(255,255,255,0.75)",
                }}
              >
                <Text style={{ fontFamily: FONTS.display, fontSize: 11, color: selected ? COLORS.sun : "rgba(26,20,15,0.7)", textTransform: "uppercase" }}>
                  {option === "piccola" ? "Piccola" : "Grande"} ({formatPrice(optionPrice)})
                </Text>
              </AnimatedPressable>
            )
          })}
        </View>
      ) : null}

      <View
        style={{
          marginTop: 12,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "rgba(26,20,15,0.1)",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: FONTS.display, fontSize: 18, color: COLORS.ink }}>{formatPrice(effectivePrice)}</Text>
        <AnimatedPressable
          accessibilityRole="button"
          accessibilityLabel={`Aggiungi ${effectiveName} al carrello`}
          onPress={() => {
            add(effectiveName, effectivePrice)
            setOpen(true)
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            backgroundColor: COLORS.ink,
            borderRadius: 999,
            paddingHorizontal: 14,
            paddingVertical: 9,
          }}
        >
          <Ionicons name="add" size={18} color={COLORS.sun} />
          <Text style={{ fontFamily: FONTS.display, fontSize: 12, color: COLORS.sun, textTransform: "uppercase" }}>
            Aggiungi
          </Text>
        </AnimatedPressable>
      </View>
    </SurfaceCard>
  )
}
