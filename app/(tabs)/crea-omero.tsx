import { useMemo, useState } from "react"
import { Linking, Pressable, ScrollView, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { DotBackground } from "@/components/DotBackground"
import { GlassCard } from "@/components/GlassCard"
import { COLORS, FONTS } from "@/constants/theme"
import { BUILDER_GROUPS, getBuilderLevel } from "@/data/burgerBuilder"

type Selections = Record<string, string[]>

export default function CreateOmero() {
  const insets = useSafeAreaInsets()
  const [selections, setSelections] = useState<Selections>({})

  const selectedOptions = useMemo(
    () => BUILDER_GROUPS.flatMap((group) => group.options.filter((option) => selections[group.id]?.includes(option.id))),
    [selections],
  )
  const calories = selectedOptions.reduce((sum, option) => sum + option.calories, 0)
  const description = BUILDER_GROUPS
    .map((group) => {
      const names = group.options
        .filter((option) => selections[group.id]?.includes(option.id))
        .map((option) => option.name)
      return names.length > 0 ? `${group.title}: ${names.join(", ")}` : null
    })
    .filter((section): section is string => section !== null)
    .join(" | ")

  const toggleOption = (groupId: string, optionId: string, multiple: boolean) => {
    setSelections((current) => {
      const selected = current[groupId] ?? []
      const next = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : multiple
          ? [...selected, optionId]
          : [optionId]
      return { ...current, [groupId]: next }
    })
  }

  const orderOnWhatsApp = () => {
    const message = [
      "Ciao Hill's! Voglio il mio Omero personalizzato:",
      description,
      `Calorie stimate: ${calories} kcal`,
      "Mi confermate disponibilità e prezzo?",
    ].join("\n")
    void Linking.openURL(`https://wa.me/393332968401?text=${encodeURIComponent(message)}`)
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.sun }}>
      <DotBackground />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: insets.top + 18,
          paddingBottom: 160,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: 900 }}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 32, lineHeight: 38, color: COLORS.ink, textAlign: "center" }}>
              CREA IL TUO OMERO
            </Text>
            <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 13, lineHeight: 20, color: "rgba(26,20,15,0.72)", textAlign: "center", marginTop: 4 }}>
              Scegli pane, carne, formaggi, extra e salse. Costruisci la tua torre di sapore!
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            {BUILDER_GROUPS.map((group, groupIndex) => (
              <GlassCard key={group.id} radius={22} padding={16}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Text style={{ fontSize: 20 }}>{group.emoji}</Text>
                  <Text style={{ fontFamily: FONTS.display, fontSize: 19, color: COLORS.ink }}>
                    {groupIndex + 1}. {group.title}
                  </Text>
                  {group.multiple ? (
                    <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, color: "rgba(26,20,15,0.55)" }}>
                      Scegline più di uno
                    </Text>
                  ) : null}
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                  {group.options.map((option) => {
                    const selected = selections[group.id]?.includes(option.id) ?? false
                    return (
                      <Pressable
                        key={option.id}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        onPress={() => toggleOption(group.id, option.id, group.multiple)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                          borderRadius: 999,
                          borderWidth: 1,
                          borderColor: selected ? COLORS.ink : "rgba(26,20,15,0.12)",
                          backgroundColor: selected ? COLORS.ink : "rgba(255,255,255,0.72)",
                          paddingHorizontal: 12,
                          paddingVertical: 9,
                        }}
                      >
                        <Ionicons
                          name={selected ? "checkmark-circle" : group.multiple ? "add-circle-outline" : "ellipse-outline"}
                          size={15}
                          color={selected ? COLORS.sun : COLORS.ink}
                        />
                        <Text style={{ fontFamily: FONTS.sansBold, fontSize: 11, color: selected ? COLORS.sun : COLORS.ink }}>
                          {option.name}
                        </Text>
                      </Pressable>
                    )
                  })}
                </View>
              </GlassCard>
            ))}
          </View>

          <GlassCard radius={24} padding={18} style={{ marginTop: 14 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 21, color: COLORS.ink }}>
              Il tuo panino 🍔
            </Text>
            <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 12, lineHeight: 19, color: "rgba(26,20,15,0.72)", marginTop: 6 }}>
              {description || "Ancora niente… Homer sta piangendo."}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <Text style={{ fontFamily: FONTS.display, fontSize: 17, color: COLORS.ink }}>
                {calories} kcal circa
              </Text>
              <Text style={{ flex: 1, textAlign: "right", fontFamily: FONTS.sansBold, fontSize: 11, color: COLORS.primary, marginLeft: 10 }}>
                Livello: {getBuilderLevel(calories)}
              </Text>
            </View>
            <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, color: "rgba(26,20,15,0.55)", marginTop: 6 }}>
              Valori calorici indicativi. Il prezzo viene confermato dal locale.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: selectedOptions.length === 0 }}
              disabled={selectedOptions.length === 0}
              onPress={orderOnWhatsApp}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                backgroundColor: COLORS.green,
                borderRadius: 999,
                paddingVertical: 13,
                marginTop: 14,
                opacity: selectedOptions.length === 0 ? 0.5 : 1,
              }}
            >
              <Ionicons name="logo-whatsapp" size={19} color={COLORS.white} />
              <Text style={{ fontFamily: FONTS.display, fontSize: 14, color: COLORS.white, textTransform: "uppercase" }}>
                Ordina su WhatsApp
              </Text>
            </Pressable>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  )
}
