export type MenuItem = {
  code: string
  name: string
  tag?: string
  desc?: string
  price: string
}

export type MenuCategory = {
  id: string
  emoji: string
  title: string
  subtitle: string
  color: string
  items: MenuItem[]
}

export const MENU: MenuCategory[] = [
  {
    id: "burger",
    emoji: "🍔",
    title: "BURGER",
    subtitle: "I classici della casa",
    color: "#FED90F",
    items: [
      { code: "01", name: "HILL'S BURGER", desc: "Burger di bovino 100g, cheddar, insalata, pomodoro, ketchup/maionese", price: "€ 4,00" },
      { code: "02", name: "CHEESEBURGER", desc: "Burger di bovino 100g, doppio cheddar, insalata, pomodoro, ketchup/maionese", price: "€ 5,00" },
      { code: "03", name: "BABY BURGER", desc: "Burger di bovino 100g, patatine fritte, ketchup/maionese", price: "€ 3,00 / € 4,00" },
      { code: "04", name: "SPRINGFIELD", desc: "Burger di bovino 100g, cheddar, pomodoro, bacon, ketchup, salsa Hill's", price: "€ 5,00" },
      { code: "05", name: "HOMER", desc: "Burger di manzo 200g, doppio cheddar, pomodoro, bacon, cipolla caramellata, salsa Hill's", price: "€ 9,00" },
      { code: "06", name: "MARGE", desc: "Burger di pollo 100g, grana padano, insalata, pomodoro, ketchup, salsa Hill's", price: "€ 5,00" },
      { code: "07", name: "BART", desc: "Doppio burger 100g, doppio cheddar, insalata, pomodoro, ketchup/maionese", price: "€ 8,00" },
      { code: "08", name: "LISA", tag: "VEG", desc: "Burger di verdure 100g, insalata, pomodoro, cipolla caramellata, ketchup", price: "€ 5,00" },
      { code: "09", name: "MONTGOMERY BURNS", desc: "Doppio burger di bovino 100g, doppio cheddar, doppio bacon, insalata, pomodoro, salsa barbecue", price: "€ 10,00" },
      { code: "11", name: "WINCHESTER", desc: "Burger di manzo 200g, bacon, patatine fritte, insalata, pomodoro, ketchup/maionese", price: "€ 8,00" },
      { code: "12", name: "KRUSTY", desc: "Burger di angus irlandese 200g, cheddar, bacon, rucola, pomodoro, salsa Hill's", price: "€ 10,00" },
      { code: "13", name: "BARNEY", desc: "Burger di bufalo italiano 200g, cheddar, bacon, insalata, pomodoro, uovo occhio di bue, salsa Hill's", price: "€ 10,00" },
      { code: "14", name: "ITALIANO", desc: "Burger di scottona 200g, bacon, cheddar, patate dippers (con buccia), maionese", price: "€ 12,00" },
      { code: "15", name: "AMERICANO", desc: "Burger di angus americano 250g, rucola, pomodoro, bacon, cheddar fuso, salsa Hill's", price: "€ 13,00" },
      { code: "16", name: "ROSTI", desc: "Burger di bovino 100g, cheddar, rosti burger, bacon, cipolla croccante, insalata, pomodoro, salsa barbecue, maionese", price: "€ 9,00" },
    ],
  },
  {
    id: "special",
    emoji: "⭐",
    title: "SPECIAL BURGER",
    subtitle: "Le creazioni gourmet",
    color: "#FF70A6",
    items: [
      { code: "01", name: "ABÈ PISTACCHIOTTO", desc: "Burger di manzo 200g, crema di pistacchio, grana e scaglie, mortadella", price: "€ 10,00" },
      { code: "02", name: "OTTO", tag: "DOPPIO GIANT", desc: "Doppio burger di manzo 250g, insalata, doppio cheddar, doppio bacon, burrata, salsa Hill's", price: "€ 19,00" },
      { code: "03", name: "MC ALLISTER", tag: "DOPPIO GIANT", desc: "Doppio pollo impanato con cornflakes, doppio cheddar, doppio bacon, insalata, anelli di cipolla, burrata, salsa Hill's", price: "€ 20,00" },
      { code: "04", name: "BIG APPU", desc: "Burger di manzo 250g, rucola, pomodorino, burrata, salsa BBQ", price: "€ 15,00" },
    ],
  },
  {
    id: "sfida",
    emoji: "👑",
    title: "PANINI SFIDA",
    subtitle: "Se hai coraggio",
    color: "#FF334B",
    items: [
      { code: "01", name: "HILL'S BOMBA", desc: "Doppio hamburger di bovino 200g, scamorza affumicata, bacon croccante, pulled pork, salsa Hill's", price: "€ 13,90" },
    ],
  },
  {
    id: "fritture",
    emoji: "🍟",
    title: "FRITTURE & PATATINE",
    subtitle: "Piccola / Grande",
    color: "#FFAA00",
    items: [
      { code: "01", name: "MOZZ. STICK BEER BATTERED", price: "€ 4,00 / € 8,00" },
      { code: "02", name: "ANELLONI DI CIPOLLA", price: "€ 4,00 / € 8,00" },
      { code: "03", name: "NUGGETS DI POLLO", price: "€ 3,00 / € 6,00" },
      { code: "04", name: "CREAM CHEESE JALAPENO", price: "€ 4,00 / € 8,00" },
      { code: "05", name: "CROCCHETTE DI PATATE", price: "€ 3,00 / € 6,00" },
      { code: "06", name: "POLPETTINE DI CARNE", desc: "Chiedere disponibilità", price: "€ 4,00 / € 8,00" },
      { code: "07", name: "DISCHI DI CAMEMBERT", price: "€ 4,00 / € 8,00" },
      { code: "08", name: "BITES PULLED PORK", price: "€ 4,00 / € 8,00" },
      { code: "09", name: "PATATINE CLASSICHE", price: "€ 2,50 / € 5,00" },
      { code: "10", name: "RIBBLE FRIES", desc: "Patata rossa dolce", price: "€ 4,00 / € 8,00" },
      { code: "11", name: "DIPPERS", desc: "Patata con buccia", price: "€ 4,00 / € 8,00" },
      { code: "12", name: "PATATA PEPE NERO E CIPOLLA", price: "€ 4,00 / € 8,00" },
      { code: "13", name: "CRISS CUTS", desc: "Patata grigliata", price: "€ 4,00 / € 8,00" },
      { code: "14", name: "CHICKEN DONUTS", desc: "Anelli di pollo al bacon", price: "€ 4,00 / € 8,00" },
    ],
  },
  {
    id: "carne",
    emoji: "🥩",
    title: "PIATTI DI CARNE",
    subtitle: "Con chips",
    color: "#4CC9F0",
    items: [
      { code: "01", name: "BURGER DI SCOTTONA 200g", price: "€ 10,00" },
      { code: "02", name: "BURGER DI MANZO 250g", price: "€ 12,00" },
      { code: "03", name: "BURGER DI CANGURO 250g", price: "€ 12,00" },
      { code: "04", name: "BURGER DI BUFALO 200g", price: "€ 11,00" },
      { code: "05", name: "BURGER DI ANGUS 200g", price: "€ 12,00" },
      { code: "06", name: "COSTINE DI MAIALE IN SALSA BBQ", price: "€ 16,00" },
      { code: "07", name: "ALETTE SPEZIATE", desc: "1/2 kg € 6,50 · 1 kg € 10,00", price: "€ 6,50 / € 10,00" },
      { code: "08", name: "TAGLIATA DI MANZO CONDITA", price: "€ 15,00" },
      { code: "09", name: "ARROSTO MISTO", desc: "2 bombette, 2 salsiccia, 3 alette, pollo condito, porchetta d'Ariccia + chips", price: "€ 15,00" },
      { code: "10", name: "ALETTE PIÙ PICCANTI AL MONDO", desc: "6pz speziate, pollo condito, porchetta d'Ariccia + chips", price: "€ 10,00" },
    ],
  },
  {
    id: "piadine",
    emoji: "🌯",
    title: "PIADINE",
    subtitle: "Piccola / Grande",
    color: "#25D366",
    items: [
      { code: "01", name: "RALPH", desc: "Crudo, mozzarella, funghi, insalata, pomodoro", price: "€ 4,00 / € 5,00" },
      { code: "02", name: "HABRAHAM", desc: "Cotto alla piastra, scamorza affumicata, funghi, rucola", price: "€ 4,00 / € 5,00" },
      { code: "03", name: "LOVE JOY", desc: "Crudo, mozzarella, pomodoro, rucola", price: "€ 4,00 / € 5,00" },
      { code: "04", name: "SPADA", tag: "GRANDE", desc: "Pollo alla piastra, insalata, pomodoro, mais, glassa balsamica", price: "€ 6,50" },
      { code: "05", name: "FAJITAS MEXICANA", tag: "GRANDE", desc: "Tagliata di pollo, peperoni, cipolla, insalata, pomodoro, curry, salsa messicana", price: "€ 8,00" },
      { code: "06", name: "KENT BROCKMAN", tag: "TACOS", desc: "Carne trita, insalata, pomodoro, patatine fritte, salse", price: "€ 5,00" },
    ],
  },
]
