import { useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { FadeInDown, ReduceMotion } from "react-native-reanimated"
import { DotBackground } from "@/components/DotBackground"
import { SurfaceCard } from "@/components/SurfaceCard"
import { AnimatedPressable } from "@/components/AnimatedPressable"
import { MenuCard, type MenuCardItem } from "@/components/MenuCard"
import { AppText as Text } from "@/components/AppText"
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
  {
    id: "panini",
    title: "Burger",
    subtitle: "I panini di Springfield",
    emoji: "🍔",
    items: burgers.filter((item) => !item.isChallenge),
  },
  {
    id: "speciali",
    title: "Special Burger",
    subtitle: "Le novità e i panini fuori serie",
    emoji: "⭐",
    items: specials,
  },
  {
    id: "combo",
    title: "Menu Combo",
    subtitle: "Il menu completo a 10 €",
    emoji: "🥤",
    items: combos,
  },
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
    title: "Fritture & Chips",
    subtitle: "Fritture in porzione da 6 pezzi e patatine",
    emoji: "🍟",
    items: [
      ...fritture.items.map((name) => ({ name, desc: fritture.note, price: 6 })),
      ...fritture.chips.map((item) => ({
        name: item.name,
        desc: "Scegli la porzione piccola o grande.",
        price: item.price,
      })),
    ],
  },
  {
    id: "carne",
    title: "Piatti di carne",
    subtitle: "Piatti dalla griglia",
    emoji: "🥩",
    items: piattiCarne,
  },
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

const FEATURED_CHALLENGE = burgers.find((item) => item.isChallenge)

export default function Menu() {
  const insets = useSafeAreaInsets()
  const scrollRef = useRef<ScrollView>(null)
  const categoryScrollRef = useRef<ScrollView>(null)
  const sectionOffsets = useRef<Record<string, number>>({})
  const categoryOffsets = useRef<Record<string, number>>({})
  const [activeId, setActiveId] = useState(MENU_GROUPS[0].id)

  const scrollToGroup = (group: MenuGroup) => {
    setActiveId(group.id)
    categoryScrollRef.current?.scrollTo({
      x: Math.max(0, (categoryOffsets.current[group.id] ?? 0) - 24),
      animated: true,
    })
    scrollRef.current?.scrollTo({
      y: sectionOffsets.current[group.id] ?? 0,
      animated: true,
    })
  }

  const updateActiveGroup = (offsetY: number) => {
    const current = MENU_GROUPS.filter(
      (group) => sectionOffsets.current[group.id] <= offsetY + 100,
    ).at(-1)
    if (current && current.id !== activeId) {
      setActiveId(current.id)
      categoryScrollRef.current?.scrollTo({
        x: Math.max(0, (categoryOffsets.current[current.id] ?? 0) - 24),
        animated: true,
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.sun }}>
      <DotBackground />
      <View style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}>
        <Animated.View
          entering={FadeInDown.duration(320).reduceMotion(ReduceMotion.System)}
          style={{ paddingHorizontal: 20, marginBottom: 12 }}
        >
          <Text style={{ fontFamily: FONTS.display, fontSize: 34, lineHeight: 38, color: COLORS.ink }}>
            IL MENU
          </Text>
          <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 13, color: "rgba(26,20,15,0.7)" }}>
            Qui comanda il panino!
          </Text>
          <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, color: "rgba(26,20,15,0.6)", marginTop: 4 }}>
            Numeri originali della carta · * prodotto a temperatura -20°.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(50).duration(320).reduceMotion(ReduceMotion.System)}>
        <ScrollView
          ref={categoryScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {MENU_GROUPS.map((group) => {
            const selected = group.id === activeId
            return (
              <AnimatedPressable
                key={group.id}
                glass={!selected}
                onLayout={(event) => {
                  categoryOffsets.current[group.id] = event.nativeEvent.layout.x
                }}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => scrollToGroup(group)}
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
              </AnimatedPressable>
            )
          })}
        </ScrollView>
        <AnimatedPressable
          glass
          accessibilityRole="button"
          accessibilityLabel="Vai alla tabella allergeni"
          onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
          style={{
            alignSelf: "center",
            marginTop: 12,
            borderWidth: 1,
            borderColor: "rgba(26,20,15,0.28)",
            borderRadius: 999,
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        >
          <Text style={{ fontFamily: FONTS.display, color: COLORS.ink, fontSize: 12 }}>
            TABELLA ALLERGENI
          </Text>
        </AnimatedPressable>
        </Animated.View>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 160, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={100}
        onScroll={(event) => updateActiveGroup(event.nativeEvent.contentOffset.y)}
        onMomentumScrollEnd={(event) => updateActiveGroup(event.nativeEvent.contentOffset.y)}
        onScrollEndDrag={(event) => updateActiveGroup(event.nativeEvent.contentOffset.y)}
      >
        <View style={{ width: "100%", maxWidth: 900 }}>
          {FEATURED_CHALLENGE ? (
            <Animated.View
              entering={FadeInDown.duration(360).reduceMotion(ReduceMotion.System)}
              style={{ marginBottom: 22 }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontFamily: FONTS.display, fontSize: 13, color: COLORS.primary, letterSpacing: 1 }}>
                  CHALLENGE · N. 49 BIG SIMPSON
                </Text>
                <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink }}>
                  IL PANINO SFIDA HILL&apos;S
                </Text>
                <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, lineHeight: 18, color: "rgba(26,20,15,0.72)" }}>
                  Chiudi la griglia in 20 minuti o non lo paghi. Porzioni da record, zero scuse.
                </Text>
              </View>
              <MenuCard item={FEATURED_CHALLENGE} />
            </Animated.View>
          ) : null}

          {MENU_GROUPS.map((group, groupIndex) => (
            <Animated.View
              key={group.id}
              entering={FadeInDown.delay(groupIndex * 55).duration(340).reduceMotion(ReduceMotion.System)}
              onLayout={(event) => {
                sectionOffsets.current[group.id] = event.nativeEvent.layout.y
              }}
              style={{ marginBottom: 24 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Text style={{ fontSize: 26 }}>{group.emoji}</Text>
                <View>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink }}>
                    {group.title}
                  </Text>
                  <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, color: "rgba(26,20,15,0.65)" }}>
                    {group.subtitle}
                  </Text>
                </View>
              </View>

              {group.items.map((item, index) => (
                <MenuCard key={`${group.id}-${item.name}-${index}`} item={item} />
              ))}
            </Animated.View>
          ))}

          <Animated.View
            entering={FadeInDown.delay(MENU_GROUPS.length * 55).duration(340).reduceMotion(ReduceMotion.System)}
            style={{ marginBottom: 24 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Text style={{ fontSize: 26 }}>ℹ️</Text>
              <View>
                <Text style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink }}>
                  Tabella allergeni
                </Text>
                <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, color: "rgba(26,20,15,0.65)" }}>
                  Elenco degli allergeni presenti nella carta
                </Text>
              </View>
            </View>
            <SurfaceCard radius={22} padding={0} style={{ overflow: "hidden" }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(26,20,15,0.06)",
                  paddingHorizontal: 14,
                  paddingVertical: 11,
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(26,20,15,0.1)",
                }}
              >
                <Text style={{ width: 44, fontFamily: FONTS.display, fontSize: 11, color: COLORS.ink }}>
                  N°
                </Text>
                <Text style={{ flex: 1, fontFamily: FONTS.display, fontSize: 11, color: COLORS.ink }}>
                  ALLERGENE
                </Text>
              </View>
              {allergeni.map(([number, description], index) => (
                <View
                  key={number}
                  accessibilityLabel={`${number}. ${description}`}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderBottomWidth: index === allergeni.length - 1 ? 0 : 1,
                    borderBottomColor: "rgba(26,20,15,0.08)",
                  }}
                >
                  <Text style={{ width: 44, fontFamily: FONTS.display, fontSize: 12, color: COLORS.primary }}>
                    {number}
                  </Text>
                  <Text style={{ flex: 1, fontFamily: FONTS.sansMedium, fontSize: 11, lineHeight: 16, color: "rgba(26,20,15,0.78)" }}>
                    {description}
                  </Text>
                </View>
              ))}
            </SurfaceCard>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}
