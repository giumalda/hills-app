import { useState } from "react"
import { ScrollView, View, Text, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { DotBackground } from "@/components/DotBackground"
import { SurfaceCard } from "@/components/SurfaceCard"
import { MenuCard, type MenuCardItem } from "@/components/MenuCard"
import { COLORS, FONTS } from "@/constants/theme"
import {
  allergeni,
  burgers,
  combos,
  fritture,
  insalate,
  piadine,
  piattiCarne,
  specials,
} from "@/data/menu"

type MenuGroup = {
  id: string
  title: string
  subtitle: string
  emoji: string
  items: MenuCardItem[]
}

const MENU_GROUPS: MenuGroup[] = [
  { id: "panini", title: "I panini", subtitle: "Scegli il tuo personaggio", emoji: "🍔", items: burgers },
  { id: "speciali", title: "Speciali", subtitle: "Le novità e i panini fuori serie", emoji: "⭐", items: specials },
  { id: "combo", title: "Menu combo", subtitle: "Il menu completo a 10 €", emoji: "🍟", items: combos },
  {
    id: "piadine",
    title: "Piadine",
    subtitle: "Arrotolate e farcite al momento",
    emoji: "🌯",
    items: piadine.map((item, index) => ({
      n: index + 1,
      name: item.name,
      desc: item.ingredients,
      price: item.price,
    })),
  },
  {
    id: "fritture",
    title: "Fritture",
    subtitle: `Porzione da ${fritture.note.toLowerCase()}`,
    emoji: "🍗",
    items: fritture.items.map((name) => ({ name, desc: fritture.note, price: 6 })),
  },
  {
    id: "patatine",
    title: "Patatine",
    subtitle: "Piccole o grandi, scegli tu",
    emoji: "🍟",
    items: fritture.chips.map((item) => ({
      name: item.name,
      desc: "Scegli la porzione piccola o grande.",
      price: item.price,
    })),
  },
  { id: "carne", title: "Carne", subtitle: "Piatti dalla griglia", emoji: "🥩", items: piattiCarne },
  {
    id: "insalate",
    title: "Insalate",
    subtitle: "Fresche e ricche",
    emoji: "🥗",
    items: insalate.map((item, index) => ({
      n: index + 1,
      name: `Insalata ${index + 1}`,
      desc: item.ingredients,
      price: item.price,
    })),
  },
]

export default function Menu() {
  const insets = useSafeAreaInsets()
  const [activeId, setActiveId] = useState(MENU_GROUPS[0].id)
  const category = MENU_GROUPS.find((group) => group.id === activeId) ?? MENU_GROUPS[0]

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.sun }}>
      <DotBackground />
      <View style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <Text style={{ fontFamily: FONTS.display, fontSize: 34, lineHeight: 38, color: COLORS.ink }}>
            IL MENU
          </Text>
          <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 13, color: "rgba(26,20,15,0.7)" }}>
            Qui comanda il panino!
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          {MENU_GROUPS.map((group) => {
            const selected = group.id === activeId
            return (
              <Pressable
                key={group.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setActiveId(group.id)}
                style={{
                  backgroundColor: selected ? COLORS.ink : "rgba(255,255,255,0.76)",
                  borderWidth: 1,
                  borderColor: selected ? COLORS.ink : "rgba(255,255,255,0.9)",
                  borderRadius: 999,
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text style={{ fontSize: 15 }}>{group.emoji}</Text>
                <Text style={{ fontFamily: FONTS.display, color: selected ? COLORS.sun : COLORS.ink, fontSize: 12 }}>
                  {group.title}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 160, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: 900 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Text style={{ fontSize: 26 }}>{category.emoji}</Text>
            <View>
              <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink }}>
                {category.title}
              </Text>
              <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, color: "rgba(26,20,15,0.65)" }}>
                {category.subtitle}
              </Text>
            </View>
          </View>

          {category.items.map((item, index) => (
            <MenuCard key={`${category.id}-${item.name}-${index}`} item={item} />
          ))}

          {category.id === "insalate" ? (
            <SurfaceCard radius={22} padding={16}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 17, color: COLORS.ink, marginBottom: 8 }}>
                Allergeni
              </Text>
              {allergeni.map(([number, description]) => (
                <Text
                  key={number}
                  style={{ fontFamily: FONTS.sansMedium, fontSize: 11, lineHeight: 16, color: "rgba(26,20,15,0.72)", marginBottom: 4 }}
                >
                  {number}. {description}
                </Text>
              ))}
            </SurfaceCard>
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}
