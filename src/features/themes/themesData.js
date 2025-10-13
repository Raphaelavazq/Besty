/**
 * All 20 Themes Metadata
 * Maps to the extracted quiz JSON files in /public/data/themes/
 */

export const allThemes = [
  {
    id: "aemter-und-behoerden",
    name: "Ämter und Behörden",
    icon: "Building2",
    color: "from-purple-500 to-indigo-500",
    description: "Offizielle Stellen & Formulare",
    questionCount: 15,
  },
  {
    id: "arbeit",
    name: "Arbeit",
    icon: "Briefcase",
    color: "from-indigo-500 to-purple-500",
    description: "Beruf & Arbeitsalltag",
    questionCount: 20,
  },
  {
    id: "arbeitssuche",
    name: "Arbeitssuche",
    icon: "Search",
    color: "from-purple-600 to-pink-500",
    description: "Bewerbung & Jobsuche",
    questionCount: 11,
  },
  {
    id: "aus--und-weiterbildung",
    name: "Aus- und Weiterbildung",
    icon: "GraduationCap",
    color: "from-blue-500 to-purple-500",
    description: "Bildung & Lernen",
    questionCount: 14,
  },
  {
    id: "banken-und-versicherungen",
    name: "Banken und Versicherungen",
    icon: "Landmark",
    color: "from-purple-500 to-blue-500",
    description: "Finanzen & Versicherungen",
    questionCount: 15,
  },
  {
    id: "betreuung-und-ausbildung-der-kinder",
    name: "Betreuung und Ausbildung der Kinder",
    icon: "Baby",
    color: "from-pink-500 to-purple-500",
    description: "Kinderbetreuung & Erziehung",
    questionCount: 15,
  },
  {
    id: "einkaufen",
    name: "Einkaufen",
    icon: "ShoppingCart",
    color: "from-purple-500 to-pink-500",
    description: "Shopping & Einzelhandel",
    questionCount: 20,
  },
  {
    id: "essen-und-trinken",
    name: "Essen und Trinken",
    icon: "UtensilsCrossed",
    color: "from-orange-500 to-red-500",
    description: "Lebensmittel & Getränke",
    questionCount: 16,
  },
  {
    id: "familie-und-co",
    name: "Familie und Co",
    icon: "Users",
    color: "from-purple-500 to-pink-500",
    description: "Familie, Freunde & Beziehungen",
    questionCount: 15,
  },
  {
    id: "freizeit",
    name: "Freizeit",
    icon: "PartyPopper",
    color: "from-pink-500 to-purple-500",
    description: "Hobbys & Aktivitäten",
    questionCount: 18,
  },
  {
    id: "fuehlen-und-gefuehle",
    name: "Fühlen und Gefühle",
    icon: "Heart",
    color: "from-red-500 to-pink-500",
    description: "Emotionen & Empfindungen",
    questionCount: 18,
  },
  {
    id: "gesundheit",
    name: "Gesundheit",
    icon: "HeartPulse",
    color: "from-green-500 to-blue-500",
    description: "Medizin & Wohlbefinden",
    questionCount: 20,
  },
  {
    id: "koerper",
    name: "Körper",
    icon: "User",
    color: "from-blue-500 to-purple-500",
    description: "Anatomie & Körperteile",
    questionCount: 15,
  },
  {
    id: "mediennutzung",
    name: "Mediennutzung",
    icon: "Smartphone",
    color: "from-purple-500 to-blue-500",
    description: "Digitale Medien & Technik",
    questionCount: 11,
  },
  {
    id: "mobilitaet",
    name: "Mobilität",
    icon: "Car",
    color: "from-blue-500 to-green-500",
    description: "Verkehr & Transport",
    questionCount: 15,
  },
  {
    id: "moebel-und-einrichtung",
    name: "Möbel und Einrichtung",
    icon: "Armchair",
    color: "from-purple-500 to-indigo-500",
    description: "Wohnung & Einrichtung",
    questionCount: 15,
  },
  {
    id: "natur",
    name: "Natur",
    icon: "TreePine",
    color: "from-green-500 to-blue-500",
    description: "Umwelt & Natur",
    questionCount: 16,
  },
  {
    id: "unterricht",
    name: "Unterricht",
    icon: "BookOpen",
    color: "from-indigo-500 to-purple-500",
    description: "Schule & Bildung",
    questionCount: 14,
  },
  {
    id: "wohnen",
    name: "Wohnen",
    icon: "Home",
    color: "from-purple-500 to-pink-500",
    description: "Zuhause & Wohnung",
    questionCount: 20,
  },
  {
    id: "zeit",
    name: "Zeit",
    icon: "Clock",
    color: "from-blue-500 to-purple-500",
    description: "Zeitangaben & Termine",
    questionCount: 13,
  },
];

/**
 * Get theme by ID
 */
export function getThemeById(id) {
  return allThemes.find((theme) => theme.id === id);
}

/**
 * Get all theme IDs
 */
export function getAllThemeIds() {
  return allThemes.map((theme) => theme.id);
}
