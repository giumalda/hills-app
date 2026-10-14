export type MenuItem = {
  n?: number | string;
  name: string;
  desc: string;
  price: number;
  tag?: string;
  img?: "classic" | "chicken" | "combo";
  isChallenge?: boolean;
};

export const burgers: MenuItem[] = [
  { n: 1, name: "HILLS BURGER", desc: "Burger di bovino 100gr, formaggio cheddar, insalata, pomodoro, ketch./maion.", price: 5, img: "classic" },
  { n: 2, name: "CHEESEBURGER", desc: "Burger di bovino 100gr, doppio cheddar, insalata, pomodoro, ketch./maion.", price: 6 },
  { n: 3, name: "BABY BURGER", desc: "Burger di bovino 100gr, *patatine fritte, ketch./maion.", price: 5 },
  { n: 4, name: "SPRINGFIELD", desc: "Burger di bovino 100gr, formaggio cheddar, pomodoro, bacon, ketchup, salsa hill's.", price: 6 },
  { n: 5, name: "HOMER", desc: "*Burger di manzo 200gr, doppio cheddar, pomodoro, bacon, cipolla caramellata, salsa hill's.", price: 10, img: "classic" },
  { n: 6, name: "MARGE", desc: "Burger di pollo 100gr, grana padano, insalata, pomodoro, ketchup, salsa hill's.", price: 6, img: "chicken" },
  { n: 7, name: "BART", desc: "Doppio burger 100gr, doppio cheddar, insalata, pomodoro, ketch./maion.", price: 10 },
  { n: 8, name: "LISA", tag: "Vegetariano", desc: "*Burger di verdure 100gr, insalata, pomodoro, cipolla caramellata, ketchup.", price: 6 },
  { n: 9, name: "MONTGOMERY BURNS", desc: "Doppio burger di bovino 100gr, doppio cheddar, doppio bacon, insalata, pomodoro, salsa barbecue.", price: 11 },
  { n: 10, name: "MOY SZYSLAK", desc: "*Burger di pollo con panatura corn flakes, formaggio cheddar, insalata, pomodoro, ketch./maion.", price: 10, img: "chicken" },
  { n: 11, name: "WINCHESTER", desc: "*Burger di manzo 200gr, bacon, *patatine fritte, insalata, pomodoro, ketch./maion.", price: 11 },
  { n: 12, name: "KRUSTY CLOWN", desc: "*Burger di angus irlandese 200gr, formaggio cheddar, bacon, rucola, pomodoro, salsa hill's.", price: 12, img: "classic" },
  { n: 13, name: "BARNEY", desc: "*Burger di scottona 200gr, formaggio cheddar, bacon, insalata, pomodoro, uovo occhio di bue, salsa hill's.", price: 12 },
  { n: 14, name: "ITALIANO", desc: "*Burger di scottona 200gr, bacon, formaggio cheddar, patata dippers (con buccia), maionese.", price: 13 },
  { n: 15, name: "AMERICANO", desc: "*Burger di angus irlandese 200gr, rucola, pomodoro, bacon, formaggio cheddar fuso, salsa hill's.", price: 13, img: "classic" },
  { n: 16, name: "ROSTI", desc: "Burger di bovino 100gr, formaggio cheddar, *Rosti burger (hamburger di patate), bacon, cipolla croccante, insalata, pomodoro, salsa barbecue, maionese.", price: 10 },
  { n: 17, name: "TROY McCLURE", desc: "*Burger di chianina 200gr, pomodorini, cipolla caramellata, mozzarella di bufala, paté di olive nere, salsa boscaiola.", price: 11 },
  { n: 18, name: "MAGGIE", desc: "Cotoletta di pollo, insalata, pomodoro, *patatine fritte, bacon, ketch./maion.", price: 6, img: "chicken" },
  { n: 19, name: "GRAN SCOTTONA", tag: "New", desc: "*Burger di scottona 200gr, insalata, pomodorini, mozzarella di bufala, crema di noci.", price: 13 },
  { n: 20, name: "PREMIUM BIG", desc: "*Burger di manzo 200gr avvolto da formaggio cheddar e bacon, insalata, pomodoro, salsa hill's.", price: 10 },
  { n: 21, name: "GRAN CHIANINA", desc: "*Burger di chianina 200gr, insalata, pomodoro, formaggio cheddar, bacon, ketch./maion.", price: 11 },
  { n: 22, name: "ROYAL BACON BBQ", desc: "3 Burger di bovino 100gr, formaggio cheddar fuso, bacon, *anelli di cipolla, salsa barbecue.", price: 15, img: "classic" },
  { n: 23, name: "PATTY", desc: "*Burger di manzo 200gr, cipolla caramellata, n'duja piccante, mozzarella di bufala, insalata.", price: 10 },
  { n: 24, name: "BURGER NZERT", desc: "*Burger di manzo 200gr, insalata, pomodoro, mozzarella di bufala, uovo occhio di bue, bacon, salsa hill's.", price: 10 },
  { n: 25, name: "YOM CHI", desc: "*Burger di manzo 200gr, insalata, pomodoro, formaggio brie, melanzane grigliate, bacon, salsa hill's.", price: 10 },
  { n: 26, name: "UOMO DEI FUMETTI", desc: "Porchetta di ariccia (con prosciutto cotto, scamorza affumicata, formaggio cheddar), maxi uccelletto (di bacon, scamorza affumicata, cheddar, *patatine fritte), insalata, maionese.", price: 13 },
  { n: 27, name: "LENNY LEONARD", tag: "Giant", desc: "*Burger di manzo (GIANT) 250gr, doppio cheddar, maxi uccelletto (di bacon, scamorzine, cheddar), insalata, melanzane grigliate, salsa hill's.", price: 15, img: "classic" },
  { n: 28, name: "JOE QUIMBY", tag: "New", desc: "Doppio *Burger di pollo con panatura corn flakes 200gr, doppio cheddar, doppio bacon, insalata, salsa hill's.", price: 20, img: "chicken" },
  { n: 29, name: "SECCO JONES", desc: "*Burger di scottona 200gr, doppio cheddar, doppio bacon, rucola, pomodoro, salsa a scelta.", price: 12 },
  { n: 30, name: "SPIDER PORK", desc: "Spalla di maiale magra tenerissima sfilacciata (Pulled Pork), insalata, salsa barbecue.", price: 8 },
  { n: 31, name: "TELESPALLA BOB", desc: "Tagliata di manzo al sangue, rucola, pomodorino, grana padano, glassa balsamica.", price: 8 },
  { n: 32, name: "NED FLANDERS", tag: "New", desc: "*Burger di manzo 200g, doppio cheddar, bacon, gorgonzola, *patatine, salsa hill's.", price: 11 },
  { n: 33, name: "SNAKE", desc: "*Kebab di pollo e tacchino, insalata, *patatine, ketch./maion.", price: 5 },
  { n: 34, name: "SELMA", tag: "New", desc: "*Burger di manzo 200g, provola affumicata, bacon, cipolla croccante, rucola, pomodoro e salsa hill's.", price: 10 },
  { n: 35, name: "CENTRALE NUCLEARE", desc: "Salsiccia di maiale piccante, n'duja calabrese, peperoncino.", price: 7 },
  { n: 36, name: "EDNA", desc: "Salmone affumicato, philadelphia, zucchine grigliate.", price: 7 },
  { n: 37, name: "CARL", desc: "Salsiccia alla piastra, *patatine, ketch./maion.", price: 5 },
  { n: 38, name: "NELSON", desc: "Bombette alla piastra, *patatine, ketch./maion.", price: 5 },
  { n: 39, name: "MILHOUSE", desc: "Uccelletti, *patatine, ketch./maion.", price: 5 },
  { n: 40, name: "WILLIE", desc: "Porchetta di ariccia, insalata, funghi, ketch./maion.", price: 8 },
  { n: 41, name: "APU", tag: "Vegetariano", desc: "*Burger di verdure, verdure grigliate, glassa balsamica.", price: 6 },
  { n: 42, name: "SEYMOUR SKINNER", desc: "Cotoletta di pollo, *patatine, ketch./maion.", price: 5, img: "chicken" },
  { n: 43, name: "HOT DOG", desc: "Wurstel, ketch./maion.", price: 3 },
  { n: 44, name: "HOT DOG CHIPS", desc: "Wurstel, *patatine, ketch./maion.", price: 4 },
  { n: 45, name: "SUPER HOT DOG", desc: "Wurstel, bacon, formaggio cheddar, ketch./maion.", price: 5 },
  { n: 46, name: "HOT DOG AMERICANO", desc: "Wurstel, cheddar, bacon, insalata, pomodoro, cipolla croccante, ketch./maion.", price: 6 },
  { n: 47, name: "U'VUCCIR", tag: "Finalista Burger Battle 2025", desc: "*Burger di bovino 100gr, formaggio cheddar, bacon, uccelletti, zucchine alla poverella, salsa barbecue.", price: 8, img: "classic" },
  { n: 48, name: "HILLS BOMBA", desc: "Doppio burger di bovino 200gr, scamorza affumicata, doppio bacon, pulled pork, salsa hill's.", price: 15 },
  { n: 49, name: "BIG SIMPSON", tag: "Panino Sfida — se lo mangi in 20 minuti non lo paghi!!!", desc: "3 Burger di bovino 100gr, 2 fette di porchetta di ariccia, bombette, maxi uccelletto, formaggio cheddar, bacon, insalata, pomodoro, salsa a scelta (contorno di *patatine).", price: 30, img: "classic", isChallenge: true },
];

export const specials: MenuItem[] = [
  { name: "HERB SIMPSON", desc: "Doppio bovino 250gr, doppio cheddar fuso, doppio bacon, pulled pork, figliata di mozzarella.", price: 25, img: "classic" },
  { name: "MONA SIMPSON", desc: "Hamburger bovino 250gr, insalata, pomodoro, pulled pork, cheddar fuso, figliata di mozzarella.", price: 20 },
  { n: 50, name: "ABE PISTACCHIOTTO", desc: "*Burger di manzo 200gr, crema di pistacchio, grana a scaglie, mortadella.", price: 10 },
  { n: 51, name: "OTTO", tag: "Doppio Giant Burger", desc: "Doppio *Burger di manzo 250gr, insalata, doppio cheddar, doppio bacon, burrata, salsa hill's.", price: 20, img: "classic" },
  { n: 52, name: "IL PANZINO", tag: "New", desc: "*Burger di Scottona 200g, provola affumicata, n'duja di Spilinga, cavolo rosso, bacon croccante, cipolla fresca e maionese.", price: 12 },
  { n: 53, name: "BIG APU", tag: "New — chiedere disponibilità", desc: "*Tartare di carne cruda abbattuta di scottona 150g, olio di oliva, n'duja di Spilinga, grana a scaglie, cavolo rosso, insalata e salsa hill's.", price: 15 },
  { n: 54, name: "SHERRI E TERRY", tag: "Pistacchioso Giant", desc: "*Burger di scottona 200gr, insalata, doppio cheddar, doppio bacon, burrata, crema di pistacchio.", price: 16 },
  { n: 55, name: "ARTIE", tag: "New", desc: "Triplo *Burger di manzo 200gr, triplo cheddar, provola affumicata e pulled pork.", price: 20, img: "classic" },
];

export const combos: MenuItem[] = [
  { n: 1, name: "MENU' HILL'S", desc: "Panino Hills + Coca-Cola + Patatine fritte", price: 10, img: "combo" },
  { n: 2, name: "MENU' PORKETTA", desc: "Panino (porchetta, provola, patatine) + Birra Peroni 1846 + Patatine fritte", price: 10, img: "combo" },
  { n: 3, name: "MENU PULLED", desc: "Piadina (pulled, insalata, patatine, cipolla, salse) + Coca-Cola + Patatine fritte", price: 10, img: "combo" },
  { n: 4, name: "MENU CICKEN", desc: "Panino (cotoletta, insalata, pomodoro, maionese) + Coca-Cola + n°5 Nuggets", price: 10, img: "combo" },
];

export const allergeni: [string, string][] = [
  ["1", "Cereali contenenti glutine e prodotti derivati (grano, segale, orzo, avena, farro, kamut)"],
  ["2", "Crostacei e prodotti a base di crostacei"],
  ["3", "Uova e prodotti a base di uova"],
  ["4", "Pesce e prodotti a base di pesce"],
  ["5", "Arachidi e prodotti a base di arachidi"],
  ["6", "Soia e prodotti a base di soia"],
  ["7", "Latte e prodotti a base di latte"],
  ["8", "Frutta a guscio e loro prodotti (mandorle, nocciole, noci, noci di acagiù, di pecan, del brasile, pistacchi, noci macadamia)"],
  ["9", "Sedano e prodotti a base di sedano"],
  ["10", "Senape e prodotti a base di senape"],
  ["11", "Semi di sesamo e prodotti a base di sesamo"],
  ["12", "Solfiti in concentrazione superiore a 10mg/kg"],
  ["13", "Lupini e prodotti a base di lupini"],
  ["14", "Molluschi e prodotti a base di molluschi"],
];

export const piadine = [
  { name: "RALPH", ingredients: "Crudo, mozzarella, funghi, insalata, pomodoro", price: 7.0 },
  { name: "HABRAHAM", ingredients: "Cotto, scamorza affumicata, funghi, rucola", price: 7.0 },
  { name: "LOVE JOY", ingredients: "Crudo, mozzarella, pomodoro, rucola", price: 7.0 },
  { name: "SPADA", ingredients: "Pollo alla piastra, insalata, pomodoro, mozzarella, salsa hill's", price: 9.0 },
  { name: "FAJITAS MEXICANA", ingredients: "Tagliata di pollo, cipolla, insalata, pomodoro, curry, salsa messicana", price: 9.0 },
];

export const fritture = {
  note: "6 PZ € 6,00",
  items: [
    "*MOZZ. STICK BEER BATTERED",
    "*ANELLONI DI CIPOLLA",
    "*NUGGETS DI POLLO",
    "*STRIP CHICKEN (HOME MADE)",
    "*CREAM CHEESE JALAPENO",
    "*CROCCHETTE DI PATATE",
    "*POLPETTINE DI CARNE",
    "*DISCHI DI CAMEMBERT",
    "*BITES PULLED PORK",
    "*ANELLI DI FORMAGGIO GOUDA CON BACON",
    "*STICK DI CHEDDAR",
  ],
  chips: [
    { name: "*PATATINE CLASSICHE", price: "€ 4,00 / € 8,00" },
    { name: "*RIBBLE FRIES (patata rossa dolce)", price: "€ 5,00 / € 10,00" },
    { name: "*DIPPERS (patata con buccia)", price: "€ 5,00 / € 10,00" },
    { name: "*CRISS CUTS (patata grigliata)", price: "€ 5,00 / € 10,00" },
    { name: "*DIPPERS (con cheddar fuso e bacon croccante)", price: "€ 8,00 / € 16,00" },
  ],
};

export const piattiCarne = [
  { name: "*BURGER DI SCOTTONA 200g + verdure", price: 13.0 },
  { name: "*BURGER DI MANZO 200g + verdure", price: 13.0 },
  { name: "*BURGER DI ANGUS 200g + verdure", price: 13.0 },
  { name: "ZAMPINA + BOMBETTE + *chips", price: 10.0 },
  { name: "COTOLETTA DI POLLO (HOME MADE) + *chips", price: 7.0 },
  { name: "COSTATA DI SCOTTONA (600g circa) + *chips (chiedere disponib.)", price: 25.0 },
  { name: "COSTINE DI MAIALE IN SALSA BBQ + *chips", price: 17.0 },
  { name: "*ALETTE SPEZIATE FRITTE", price: "€ 8,00 / 8pz" },
  { name: "*ALETTE SPEZIATE FRITTE ALLA N'DUJA DI SPILINGA", price: "€ 10,00 / 8pz" },
  { name: "MAXI TAGLIERE DI *ALETTE SPEZIATE FRITTE + *chips", price: "€ 25,00 / 20pz" },
  { name: "*ALETTE PIÙ PICCANTI AL MONDO (chiedere disponib.)", price: "€ 10,00 / 6pz" },
  { name: "TAGLIATA DI MANZO CONDITA (300/350g) rucola, grana, pomodorino e glassa", price: 18.0 },
  { name: "TARTARE DI CARNE CRUDA ABBATTUTA DI SCOTTONA 150g CONDITA CON OLIO DI OLIVA BIO, PEPE NERO E LIME, ACCOMPAGNATO CON CAVOLO ROSSO ALLA PIASTRA (chiedere disponib.)", price: 13.0 },
];

export const insalate = [
  { ingredients: "INSALATA VERDE, POMODORINO, RUCOLA, OLIVE NERE, GRANA PADANO, PULLED PORK, GOCCE DI SALSA BBQ.", price: 10.0 },
  { ingredients: "INSALATA VERDE, RUCOLA, POMODORINO, GAMBERETTI, TONNO, SALSA COCKTAIL.", price: 10.0 },
  { ingredients: "INSALATA VERDE, FUNGHI SOTT'OLIO, CRUDO, GRANA PADANO, POMODORINO, MOZZARELLA DI BUFALA.", price: 10.0 },
  { ingredients: "INSALATA VERDE, TONNO, POMODORINO, GRANA PADANO, SALMONE AFFUMICATO, SALSA HILL'S.", price: 11.0 },
  { ingredients: "INSALATA VERDE, PETTO DI POLLO, MAIS, POMODORINO, MOZZARELLA DI BUFALA.", price: 11.0 },
  { ingredients: "INSALATA VERDE, *KEBAB, FUNGHI SOTT'OLIO, GRANA PADANO, SALSA YOGURT.", price: 11.0 },
];

export const reviews = [
  {
    name: "Marco D.",
    text: "Il Big Simpson è una follia. Ci ho provato, ho perso, l'ho pagato. Rifarei tutto.",
    stars: 5,
  },
  {
    name: "Giulia R.",
    text: "Panini enormi e salse fatte bene. Il Sherri e Terry con la crema di pistacchio è top.",
    stars: 5,
  },
  {
    name: "Andrea P.",
    text: "Menu combo a 10€ imbattibile per rapporto qualità-prezzo. Servizio veloce anche il sabato.",
    stars: 5,
  },
  {
    name: "Sara M.",
    text: "Atmosfera divertentissima e personale super gentile. Il Krusty Clown è il mio preferito.",
    stars: 4,
  },
];
