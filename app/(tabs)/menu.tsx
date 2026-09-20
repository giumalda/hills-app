import { useState } from "react"
import { ScrollView, View, Text, Pressable, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PopCard } from "@/components/PopCard"
import { COLORS, softHardShadow } from "@/constants/theme"
import { MENU, type MenuItem } from "@/data/menu"

function ItemRow({ item, accent }: { item: MenuItem; accent: string }) {
  return (
    <PopCard bg={COLORS.white} border={3} style={{ padding: 14, marginBottom: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
        <View
          style={{
            backgroundColor: accent,
            borderWidth: 2,
            borderColor: COLORS.ink,
            borderRadius: 8,
            width: 38,
            height: 38,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "900", color: COLORS.ink, fontSize: 15 }}>{item.code}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: "900", color: COLORS.ink }}>{item.name}</Text>
            {item.tag ? (
              <View style={{ backgroundColor: COLORS.pink, borderWidth: 1.5, borderColor: COLORS.ink, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1 }}>
                <Text style={{ fontSize: 9, fontWeight: "900", color: COLORS.ink }}>{item.tag}</Text>
              </View>
            ) : null}
          </View>
          {item.desc ? (
            <Text style={{ fontSize: 12.5, color: "rgba(17,17,17,0.65)", marginTop: 4, lineHeight: 17 }}>{item.desc}</Text>
          ) : null}
        </View>
        <View style={{ backgroundColor: COLORS.yellow, borderWidth: 2, borderColor: COLORS.ink, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text style={{ fontWeight: "900", color: COLORS.ink, fontSize: 13 }}>{item.price}</Text>
        </View>
      </View>
    </PopCard>
  )
}

export default function Menu() {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const [active, setActive] = useState(MENU[0].id)
  const category = MENU.find((c) => c.id === active)!

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.cream }}>
      <View style={{ paddingTop: insets.top + 14, paddingBottom: 8, backgroundColor: COLORS.yellow, borderBottomWidth: 3, borderBottomColor: COLORS.ink }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 12, alignItems: "center" }}>
          <View style={{ width: "100%", maxWidth: 900 }}>
            <Text style={{ fontSize: 34, fontWeight: "900", color: COLORS.ink, letterSpacing: -1 }}>SCEGLI IL TUO</Text>
            <Text style={{ fontSize: 34, fontWeight: "900", color: COLORS.red, letterSpacing: -1, marginTop: -6 }}>PERSONAGGIO</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
          {MENU.map((c) => {
            const on = c.id === active
            return (
              <Pressable
                key={c.id}
                onPress={() => setActive(c.id)}
                style={{
                  backgroundColor: on ? c.color : COLORS.white,
                  borderWidth: 3,
                  borderColor: COLORS.ink,
                  borderRadius: 999,
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  ...(on ? softHardShadow : { shadowOpacity: 0, elevation: 0 }),
                }}
              >
                <Text style={{ fontSize: 16 }}>{c.emoji}</Text>
                <Text style={{ fontWeight: "900", color: COLORS.ink, fontSize: 12.5 }}>{c.title}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, alignItems: "center" }} showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%", maxWidth: 900 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Text style={{ fontSize: 26 }}>{category.emoji}</Text>
            <View>
              <Text style={{ fontSize: 22, fontWeight: "900", color: COLORS.ink }}>{category.title}</Text>
              <Text style={{ fontSize: 13, color: "rgba(17,17,17,0.6)", fontWeight: "600" }}>{category.subtitle}</Text>
            </View>
          </View>
          {category.items.map((item) => (
            <ItemRow key={category.id + item.code} item={item} accent={category.color} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
