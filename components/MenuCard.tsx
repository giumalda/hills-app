import { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { MenuItem } from "@/data/menu"
import { useOrder } from "@/components/order/OrderProvider"
import { GlassCard } from "@/components/GlassCard"
import { COLORS, FONTS } from "@/constants/theme"

function toPrice(price: number | string): number {
  if (typeof price === "number") return price
  const n = parseFloat(String(price).replace(/[^0-9,.]/g, "").replace(",", "."))
  return Number.isFinite(n) ? n : 0
}

export function MenuCard({ item }: { item: MenuItem }) {
  const { add, setOpen } = useOrder()
  const nameUpper = item.name.toUpperCase()
  const descUpper = (item.desc || "").toUpperCase()
  const isMaxiTagliere = nameUpper.includes("MAXI TAGLIERE")

  const hasSizes =
    !isMaxiTagliere &&
    (nameUpper.includes("PATATINE") ||
      nameUpper.includes("RIPPLE") ||
      nameUpper.includes("RIBBLE") ||
      nameUpper.includes("CRISS") ||
      nameUpper.includes("DIPPER") ||
      nameUpper.includes("FRIES") ||
      descUpper.includes("DIPPER") ||
      descUpper.includes("RIPPLE") ||
      descUpper.includes("RIBBLE"))

  const [size, setSize] = useState<"piccola" | "grande">("piccola")
  const effectivePrice = hasSizes ? (size === "piccola" ? 5.0 : 10.0) : toPrice(item.price)
  const effectiveName = hasSizes ? `${item.name} (${size === "piccola" ? "Piccola" : "Grande"})` : item.name
  const priceStr = `€ ${effectivePrice.toFixed(2).replace(".", ",")}`

  return (
    <GlassCard radius={24} padding={16} style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
        {item.n !== undefined ? (
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.7)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.85)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.ink }}>{item.n}</Text>
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 17, color: COLORS.ink, textTransform: "uppercase", flexShrink: 1 }}>
              {effectiveName}
            </Text>
            {item.tag ? (
              <View style={{ backgroundColor: "rgba(230,57,43,0.12)", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontFamily: FONTS.sansBold, fontSize: 9, color: COLORS.primary, textTransform: "uppercase" }}>{item.tag}</Text>
              </View>
            ) : null}
          </View>
          {item.desc ? (
            <Text style={{ marginTop: 8, fontFamily: FONTS.sansMedium, fontSize: 12, lineHeight: 17, color: "rgba(26,20,15,0.72)" }}>
              {item.desc}
            </Text>
          ) : null}
        </View>
      </View>

      {hasSizes ? (
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          {(["piccola", "grande"] as const).map((s) => (
            <Pressable
              key={s}
              onPress={() => setSize(s)}
              style={{
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: size === s ? COLORS.ink : "rgba(255,255,255,0.75)",
              }}
            >
              <Text style={{ fontFamily: FONTS.display, fontSize: 11, color: size === s ? COLORS.sun : "rgba(26,20,15,0.7)", textTransform: "uppercase" }}>
                {s === "piccola" ? "Piccola (5€)" : "Grande (10€)"}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <View
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: "rgba(26,20,15,0.1)",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: FONTS.display, fontSize: 18, color: COLORS.ink }}>{priceStr}</Text>
        <Pressable
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
            paddingVertical: 10,
          }}
        >
          <Ionicons name="add" size={18} color={COLORS.sun} />
          <Text style={{ fontFamily: FONTS.display, fontSize: 12, color: COLORS.sun, textTransform: "uppercase" }}>Aggiungi</Text>
        </Pressable>
      </View>
    </GlassCard>
  )
}
