export type BuilderOption = {
  id: string
  name: string
  calories: number
}

export type BuilderGroup = {
  id: string
  title: string
  emoji: string
  multiple: boolean
  options: BuilderOption[]
}

export const BUILDER_GROUPS: BuilderGroup[] = [
  {
    id: "pane",
    title: "Il pane",
    emoji: "🍞",
    multiple: false,
    options: [
      { id: "bun-classico", name: "Bun classico", calories: 200 },
      { id: "bun-sesamo", name: "Bun al sesamo", calories: 230 },
      { id: "bun-nero", name: "Bun nero al carbone", calories: 240 },
      { id: "piadina", name: "Piadina", calories: 260 },
    ],
  },
  {
    id: "carne",
    title: "La carne",
    emoji: "🥩",
    multiple: false,
    options: [
      { id: "bovino-100", name: "Burger di bovino 100gr", calories: 250 },
      { id: "scottona-200", name: "Burger di scottona 200gr", calories: 450 },
      { id: "angus-200", name: "Burger di angus 200gr", calories: 470 },
      { id: "pulled-pork", name: "Pulled pork", calories: 380 },
      { id: "burger-verdure", name: "Burger di verdure (vegetariano)", calories: 180 },
    ],
  },
  {
    id: "formaggi",
    title: "Formaggi",
    emoji: "🧀",
    multiple: true,
    options: [
      { id: "cheddar", name: "Cheddar fuso", calories: 120 },
      { id: "provola", name: "Provola affumicata", calories: 140 },
      { id: "bufala", name: "Mozzarella di bufala", calories: 150 },
      { id: "gorgonzola", name: "Gorgonzola", calories: 160 },
      { id: "grana", name: "Grana a scaglie", calories: 110 },
    ],
  },
  {
    id: "extra",
    title: "Gli extra",
    emoji: "🥓",
    multiple: true,
    options: [
      { id: "bacon", name: "Bacon croccante", calories: 180 },
      { id: "uovo", name: "Uovo occhio di bue", calories: 90 },
      { id: "cipolla", name: "Cipolla caramellata", calories: 70 },
      { id: "patatine-panino", name: "Patatine dentro al panino", calories: 250 },
      { id: "cavolo", name: "Cavolo rosso", calories: 30 },
      { id: "melanzane", name: "Melanzane grigliate", calories: 60 },
    ],
  },
  {
    id: "salse",
    title: "Le salse",
    emoji: "🥫",
    multiple: true,
    options: [
      { id: "hills", name: "Salsa hill's", calories: 90 },
      { id: "bbq", name: "BBQ", calories: 80 },
      { id: "maionese", name: "Maionese", calories: 100 },
      { id: "nduja", name: "N'duja di Spilinga", calories: 110 },
      { id: "pistacchio", name: "Crema di pistacchio", calories: 130 },
    ],
  },
]

export function getBuilderLevel(calories: number): string {
  if (calories >= 1800) return "🏅 La Costina — badge segreto sbloccato!"
  if (calories >= 1400) return "🍩 Espansione Cintura"
  if (calories >= 1000) return "☢️ Doppio turno alla Centrale"
  if (calories >= 600) return "🛹 Merenda di Bart"
  return "🥗 Dieta di Marge"
}
