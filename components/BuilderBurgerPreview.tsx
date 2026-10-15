import { Text, View } from "react-native"
import Animated, { FadeInDown, FadeOutUp, ReduceMotion } from "react-native-reanimated"
import { SurfaceCard } from "@/components/SurfaceCard"
import { COLORS, FONTS } from "@/constants/theme"
import type { BuilderGroup, BuilderOption } from "@/data/burgerBuilder"

type Selections = Record<string, string[]>

type IngredientVisual = {
  symbol: string
  color: string
  accent: string
  kind: "meat" | "cheese" | "extra" | "sauce"
}

const INGREDIENT_VISUALS: Record<string, IngredientVisual> = {
  "bovino-100": { symbol: "🥩", color: "#8D3C25", accent: "#642718", kind: "meat" },
  "scottona-200": { symbol: "🥩", color: "#A7442A", accent: "#672818", kind: "meat" },
  "angus-200": { symbol: "🔥", color: "#713827", accent: "#46231B", kind: "meat" },
  "pulled-pork": { symbol: "🐷", color: "#C87842", accent: "#99502E", kind: "meat" },
  "burger-verdure": { symbol: "🌱", color: "#5D8A3A", accent: "#3C622D", kind: "meat" },
  cheddar: { symbol: "🧀", color: "#F7B928", accent: "#E39416", kind: "cheese" },
  provola: { symbol: "🧀", color: "#F4D78D", accent: "#D7B85F", kind: "cheese" },
  bufala: { symbol: "🥛", color: "#FFF5D9", accent: "#E6D8B6", kind: "cheese" },
  gorgonzola: { symbol: "🧀", color: "#D5C99C", accent: "#89936B", kind: "cheese" },
  grana: { symbol: "✨", color: "#F1D890", accent: "#D2B75F", kind: "cheese" },
  bacon: { symbol: "🥓", color: "#C54B35", accent: "#8E2D27", kind: "extra" },
  uovo: { symbol: "🍳", color: "#F4C94B", accent: "#E99E32", kind: "extra" },
  cipolla: { symbol: "🧅", color: "#B36A8C", accent: "#85496D", kind: "extra" },
  "patatine-panino": { symbol: "🍟", color: "#E9A52A", accent: "#C8781D", kind: "extra" },
  cavolo: { symbol: "🥬", color: "#7E9E4A", accent: "#587238", kind: "extra" },
  melanzane: { symbol: "🍆", color: "#76518B", accent: "#4C3769", kind: "extra" },
  hills: { symbol: "⭐", color: "#F5C84A", accent: "#D69B2A", kind: "sauce" },
  bbq: { symbol: "🔥", color: "#9C412B", accent: "#6B2D24", kind: "sauce" },
  maionese: { symbol: "🥚", color: "#FFF1C9", accent: "#E2D39E", kind: "sauce" },
  nduja: { symbol: "🌶️", color: "#D84A35", accent: "#A92D2D", kind: "sauce" },
  pistacchio: { symbol: "🌰", color: "#87A64C", accent: "#607A36", kind: "sauce" },
}

function Bread({ breadId, breadName, placeholder = false }: { breadId?: string; breadName?: string; placeholder?: boolean }) {
  const isPiadina = breadId === "piadina"
  const isBlack = breadId === "bun-nero"
  const breadColor = isBlack ? "#38312F" : breadId === "bun-sesamo" ? "#E6A84D" : "#D99849"
  const labelColor = isBlack ? COLORS.cream : "#542B16"

  if (isPiadina) {
    return (
      <View
        accessibilityLabel="Piadina scelta come pane"
        style={{
          width: 224,
          height: 34,
          borderRadius: 999,
          backgroundColor: "#D4A45D",
          borderBottomWidth: 5,
          borderBottomColor: "#B77C3D",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.display, fontSize: 9, color: "#542B16" }}>
          PIADINA · {breadName?.toUpperCase()}
        </Text>
      </View>
    )
  }

  return (
    <View
      accessibilityLabel={placeholder ? "Scegli un tipo di pane" : `${breadName} scelto come pane`}
      style={{
        width: placeholder ? 200 : 224,
        height: placeholder ? 42 : 53,
        borderTopLeftRadius: 120,
        borderTopRightRadius: 120,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        backgroundColor: placeholder ? "#E8C990" : breadColor,
        borderBottomWidth: 6,
        borderBottomColor: placeholder ? "#D6B574" : isBlack ? "#272220" : "#B97032",
        borderStyle: placeholder ? "dashed" : "solid",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 6,
        overflow: "hidden",
      }}
    >
      {breadId === "bun-sesamo" ? (
        <Text style={{ position: "absolute", top: 7, fontSize: 15, color: "#713E20" }}>
          ·  · ·  ·
        </Text>
      ) : null}
      <Text style={{ fontFamily: FONTS.display, fontSize: 9, color: placeholder ? "#80643D" : labelColor }}>
        {placeholder ? "SCEGLI IL PANE" : breadName?.toUpperCase()}
      </Text>
    </View>
  )
}

function IngredientLayer({ groupId, option }: { groupId: string; option: BuilderOption }) {
  const visual = INGREDIENT_VISUALS[option.id]
  if (!visual) return null

  const isMeat = visual.kind === "meat"
  const isCheese = visual.kind === "cheese"
  const width = isMeat ? 198 : isCheese ? 218 : 208

  return (
    <Animated.View
      accessibilityLabel={`${option.name}, aggiunto al panino`}
      entering={FadeInDown.duration(300).reduceMotion(ReduceMotion.System)}
      exiting={FadeOutUp.duration(200).reduceMotion(ReduceMotion.System)}
      style={{
        width,
        minHeight: isMeat ? 31 : isCheese ? 23 : 25,
        marginTop: -8,
        borderRadius: isMeat ? 13 : isCheese ? 5 : visual.kind === "sauce" ? 999 : 8,
        backgroundColor: visual.color,
        borderBottomWidth: isMeat ? 5 : 2,
        borderBottomColor: visual.accent,
        borderWidth: isMeat ? 1 : 0,
        borderColor: visual.accent,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 9,
        transform: [{ rotate: isCheese ? "-1deg" : isMeat ? "0.5deg" : "0deg" }],
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={{ fontSize: 13, lineHeight: 17 }}>{visual.symbol}</Text>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: FONTS.display,
            fontSize: groupId === "salse" ? 8 : 9,
            color: isCheese || option.id === "maionese" || option.id === "grana" ? "#4B321B" : COLORS.white,
          }}
        >
          {option.name.toUpperCase()}
        </Text>
      </View>
    </Animated.View>
  )
}

export function BuilderBurgerPreview({ groups, selections }: { groups: BuilderGroup[]; selections: Selections }) {
  const breadGroup = groups.find((group) => group.id === "pane")
  const selectedBread = breadGroup?.options.find((option) => selections.pane?.includes(option.id))
  const selectedIngredients = groups.flatMap((group) =>
    group.id === "pane"
      ? []
      : group.options
          .filter((option) => selections[group.id]?.includes(option.id))
          .map((option) => ({ groupId: group.id, option })),
  )
  const hasIngredients = selectedIngredients.length > 0

  return (
    <Animated.View entering={FadeInDown.delay(50).duration(340).reduceMotion(ReduceMotion.System)}>
      <SurfaceCard radius={24} padding={16} style={{ marginBottom: 14, overflow: "hidden" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <View>
            <Text style={{ fontFamily: FONTS.display, fontSize: 19, color: COLORS.ink }}>
              Il tuo Omero prende forma
            </Text>
            <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 10, color: "rgba(26,20,15,0.58)", marginTop: 2 }}>
              Ogni scelta aggiunge il suo strato!
            </Text>
          </View>
          <View style={{ backgroundColor: "#FFF1B8", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
            <Text style={{ fontFamily: FONTS.display, fontSize: 10, color: COLORS.ink }}>
              {selectedIngredients.length} {selectedIngredients.length === 1 ? "INGREDIENTE" : "INGREDIENTI"}
            </Text>
          </View>
        </View>

        <View
          accessibilityLabel={`Illustrazione del panino: ${[
            selectedBread?.name,
            ...selectedIngredients.map(({ option }) => option.name),
          ].filter(Boolean).join(", ") || "nessun ingrediente selezionato"}`}
          accessibilityRole="image"
          style={{
            minHeight: 188,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingTop: 10,
            paddingBottom: 8,
            borderRadius: 18,
            backgroundColor: "#FFF9DD",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Bread breadId={selectedBread?.id} breadName={selectedBread?.name} placeholder={!selectedBread} />
            {[...selectedIngredients].reverse().map(({ groupId, option }) => (
              <IngredientLayer key={option.id} groupId={groupId} option={option} />
            ))}
            {selectedIngredients.length === 0 ? (
              <View
                style={{
                  width: 200,
                  height: 29,
                  marginTop: -5,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "rgba(26,20,15,0.28)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 9, color: "rgba(26,20,15,0.55)" }}>
                  SCEGLI GLI INGREDIENTI
                </Text>
              </View>
            ) : null}
            <View
              style={{
                width: selectedBread?.id === "piadina" ? 222 : 190,
                height: selectedBread?.id === "piadina" ? 16 : 26,
                marginTop: -5,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
                borderTopLeftRadius: 7,
                borderTopRightRadius: 7,
                backgroundColor: selectedBread?.id === "bun-nero" ? "#38312F" : "#D99849",
                borderBottomWidth: 5,
                borderBottomColor: selectedBread?.id === "bun-nero" ? "#272220" : "#B97032",
              }}
            />
          </View>
          <Text style={{ fontFamily: FONTS.sansMedium, fontSize: 9, color: "rgba(26,20,15,0.52)", marginTop: 8 }}>
            {hasIngredients ? "Il panino cambia mentre scegli" : "Inizia scegliendo pane e ingredienti"}
          </Text>
        </View>
      </SurfaceCard>
    </Animated.View>
  )
}
