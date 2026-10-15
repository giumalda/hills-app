import type { ReactNode } from "react"
import { Text, View } from "react-native"
import Animated, { FadeInDown, FadeOutUp, ReduceMotion } from "react-native-reanimated"
import { SurfaceCard } from "@/components/SurfaceCard"
import { COLORS, FONTS } from "@/constants/theme"
import type { BuilderGroup, BuilderOption } from "@/data/burgerBuilder"

type Selections = Record<string, string[]>

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

function BaconStrip({ offset = 0 }: { offset?: number }) {
  return (
    <View style={{ position: "absolute", top: offset, flexDirection: "row", alignItems: "center" }}>
      {[0, 1, 2, 3, 4, 5].map((part) => (
        <View
          key={part}
          style={{
            width: 17,
            height: 12,
            marginLeft: part === 0 ? 0 : -4,
            borderRadius: part % 2 === 0 ? 7 : 5,
            backgroundColor: part % 2 === 0 ? "#B93D30" : "#D65C43",
            borderWidth: 1,
            borderColor: "#8D2C28",
            transform: [{ rotate: part % 2 === 0 ? "-9deg" : "9deg" }],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: 10, height: 2, borderRadius: 2, backgroundColor: "#F4C59A", transform: [{ rotate: "-12deg" }] }} />
        </View>
      ))}
    </View>
  )
}

function IngredientArtwork({ id }: { id: string }): ReactNode {
  switch (id) {
    case "bacon":
      return (
        <View style={{ width: 94, height: 26, justifyContent: "center", alignItems: "center" }}>
          <BaconStrip offset={-3} />
          <BaconStrip offset={6} />
        </View>
      )
    case "uovo":
      return (
        <View style={{ width: 48, height: 27, alignItems: "center", justifyContent: "center" }}>
          <View style={{ position: "absolute", width: 43, height: 25, borderRadius: 15, backgroundColor: "#FFF9E8", borderWidth: 1, borderColor: "#EADCB5", transform: [{ rotate: "-8deg" }] }} />
          <View style={{ width: 16, height: 16, borderRadius: 99, backgroundColor: "#F4B52F", borderWidth: 2, borderColor: "#E79A20" }} />
        </View>
      )
    case "cipolla":
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: -5 }}>
          {[0, 1, 2].map((ring) => (
            <View key={ring} style={{ width: 24, height: 19, borderRadius: 99, borderWidth: 4, borderColor: ring === 1 ? "#9F5C85" : "#C27CA0", backgroundColor: "#FFF1E5", transform: [{ rotate: `${ring * 18 - 18}deg` }] }} />
          ))}
        </View>
      )
    case "patatine-panino":
      return (
        <View style={{ width: 59, height: 27, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 3 }}>
          {["#F4C84D", "#ECA82E", "#FFD96B", "#E9A12B", "#F5C34A"].map((color, index) => (
            <View key={index} style={{ width: 7, height: 17 + (index % 3) * 4, borderRadius: 4, backgroundColor: color, borderBottomWidth: 2, borderBottomColor: "#D18A24", transform: [{ rotate: `${index % 2 ? 8 : -8}deg` }] }} />
          ))}
        </View>
      )
    case "cavolo":
      return (
        <View style={{ width: 72, height: 25, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {[-20, -10, 0, 10, 20].map((angle, index) => (
            <View key={index} style={{ width: 22, height: 15, marginLeft: -6, borderRadius: 14, backgroundColor: index % 2 ? "#76A94D" : "#91B85E", borderBottomWidth: 2, borderBottomColor: "#507C38", transform: [{ rotate: `${angle}deg` }] }}>
              <View style={{ position: "absolute", width: 12, height: 2, top: 6, left: 5, borderRadius: 2, backgroundColor: "#D7E49B", transform: [{ rotate: `${-angle}deg` }] }} />
            </View>
          ))}
        </View>
      )
    case "melanzane":
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          {[0, 1, 2].map((slice) => (
            <View key={slice} style={{ width: 25, height: 19, borderRadius: 99, backgroundColor: "#654178", borderWidth: 2, borderColor: "#42284F", alignItems: "center", justifyContent: "center", transform: [{ rotate: `${slice * 12 - 12}deg` }] }}>
              <View style={{ width: 14, height: 10, borderRadius: 99, backgroundColor: "#D9B5A0" }} />
            </View>
          ))}
        </View>
      )
    case "bovino-100":
    case "scottona-200":
    case "angus-200":
      return (
        <View style={{ width: 162, height: 27, borderRadius: 15, backgroundColor: id === "angus-200" ? "#633426" : id === "scottona-200" ? "#A84A31" : "#91402D", borderWidth: 1, borderColor: "#692C23", borderBottomWidth: 4, borderBottomColor: "#55251F", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <View style={{ position: "absolute", width: 133, height: 2, top: 8, borderRadius: 2, backgroundColor: "#D17A51", transform: [{ rotate: "-2deg" }] }} />
          <View style={{ position: "absolute", width: 116, height: 2, top: 18, borderRadius: 2, backgroundColor: "#622D25", transform: [{ rotate: "2deg" }] }} />
          <View style={{ width: 6, height: 3, borderRadius: 99, backgroundColor: "#E6A36C" }} />
        </View>
      )
    case "pulled-pork":
      return (
        <View style={{ width: 166, height: 27, borderRadius: 13, backgroundColor: "#C67C48", borderBottomWidth: 3, borderBottomColor: "#955333", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
          {[0, 1, 2, 3, 4, 5, 6].map((strand) => (
            <View key={strand} style={{ width: 17, height: 3 + strand % 2, borderRadius: 4, backgroundColor: strand % 2 ? "#E4A16A" : "#9E5A36", transform: [{ rotate: `${strand % 2 ? 13 : -13}deg` }] }} />
          ))}
        </View>
      )
    case "burger-verdure":
      return (
        <View style={{ width: 158, height: 26, borderRadius: 15, backgroundColor: "#719448", borderBottomWidth: 4, borderBottomColor: "#496B36", borderWidth: 1, borderColor: "#52733C", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 7 }}>
          {[0, 1, 2, 3, 4].map((seed) => (
            <View key={seed} style={{ width: 5, height: 3, borderRadius: 99, backgroundColor: "#D9D58A", transform: [{ rotate: `${seed * 25}deg` }] }} />
          ))}
        </View>
      )
    case "cheddar":
      return (
        <View style={{ width: 210, height: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 202, height: 14, backgroundColor: "#F4B72F", borderRadius: 5, transform: [{ rotate: "-2deg" }] }} />
          {[0, 1, 2].map((drop) => (
            <View key={drop} style={{ position: "absolute", left: 49 + drop * 55, bottom: -1 - (drop % 2) * 3, width: 8, height: 9, borderBottomLeftRadius: 99, borderBottomRightRadius: 99, backgroundColor: "#F4B72F" }} />
          ))}
        </View>
      )
    case "provola":
      return (
        <View style={{ width: 194, height: 19, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 13 }}>
          {[0, 1, 2, 3].map((mark) => (
            <View key={mark} style={{ width: 36, height: 13, borderRadius: 8, backgroundColor: "#F0D99D", borderBottomWidth: 2, borderBottomColor: "#D2B876", transform: [{ rotate: `${mark % 2 ? 8 : -8}deg` }] }}>
              <View style={{ width: 12, height: 3, marginTop: 3, marginLeft: 10, borderRadius: 99, backgroundColor: "#C79E61" }} />
            </View>
          ))}
        </View>
      )
    case "bufala":
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {[0, 1, 2, 3].map((slice) => (
            <View key={slice} style={{ width: 26, height: 17, borderRadius: 99, backgroundColor: "#FFF9E8", borderWidth: 2, borderColor: "#E5D9BC", transform: [{ rotate: `${slice * 10 - 14}deg` }] }} />
          ))}
        </View>
      )
    case "gorgonzola":
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: -4 }}>
          {["#D6CDA9", "#C9C397", "#E0D8B7", "#BFC28F"].map((color, piece) => (
            <View key={piece} style={{ width: 30, height: 18, borderRadius: piece % 2 ? 11 : 7, backgroundColor: color, transform: [{ rotate: `${piece * 11 - 16}deg` }] }}>
              <View style={{ position: "absolute", width: 5, height: 3, top: 5, left: 9, borderRadius: 99, backgroundColor: "#75906B" }} />
            </View>
          ))}
        </View>
      )
    case "grana":
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {[0, 1, 2, 3, 4].map((flake) => (
            <View key={flake} style={{ width: 21, height: 9 + (flake % 2) * 5, borderRadius: 5, backgroundColor: flake % 2 ? "#E9CF83" : "#F6E2A9", transform: [{ rotate: `${flake * 17 - 30}deg` }] }} />
          ))}
        </View>
      )
    case "hills":
    case "bbq":
    case "maionese":
    case "nduja":
    case "pistacchio": {
      const sauce = {
        hills: { base: "#E9B83E", line: "#F7D875" },
        bbq: { base: "#783820", line: "#B65A32" },
        maionese: { base: "#F6E6B7", line: "#FFF8E5" },
        nduja: { base: "#BC352C", line: "#EA6541" },
        pistacchio: { base: "#799449", line: "#AFC26C" },
      }[id]
      return (
        <View style={{ width: 130, height: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          {[0, 1, 2, 3, 4].map((dot) => (
            <View key={dot} style={{ width: dot === 2 ? 30 : 23, height: dot % 2 ? 5 : 7, marginLeft: -5, borderRadius: 99, backgroundColor: dot % 2 ? sauce.line : sauce.base, transform: [{ rotate: `${dot % 2 ? 13 : -13}deg` }] }} />
          ))}
        </View>
      )
    }
    default:
      return null
  }
}

function IngredientLayer({ option }: { option: BuilderOption }) {
  const artwork = IngredientArtwork({ id: option.id })
  if (!artwork) return null

  return (
    <Animated.View
      accessibilityLabel={`${option.name}, aggiunto al panino`}
      entering={FadeInDown.duration(300).reduceMotion(ReduceMotion.System)}
      exiting={FadeOutUp.duration(200).reduceMotion(ReduceMotion.System)}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 220,
        height: 34,
        marginTop: -7,
      }}
    >
      {artwork}
      <Text numberOfLines={1} style={{ fontFamily: FONTS.display, fontSize: 7, lineHeight: 9, color: "rgba(26,20,15,0.66)", marginTop: 1 }}>
        {option.name.toUpperCase()}
      </Text>
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
          .map((option) => ({ option })),
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
              <IngredientLayer key={option.id} option={option} />
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
