export type ActivitySlug = "musique" | "danse" | "peinture" | "langues";

export type Activity = {
  slug: ActivitySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
};

export const activities: Activity[] = [
  {
    slug: "musique",
    name: "Musique",
    tagline: "Éveil musical, chant et instruments",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    description:
      "Piano, violon, guitare, batterie, saxophone, formation musicale, éveil musical et groupe de musique : nos cours couvrent toutes les envies, du tout-petit qui découvre le rythme jusqu'au musicien confirmé qui veut jouer en groupe.",
    highlights: [
      "Cours individuels de 30 minutes par semaine",
      "Éveil musical dès 3 ans",
      "Groupe de musique gratuit selon le niveau",
    ],
  },
  {
    slug: "danse",
    name: "Danse",
    tagline: "Classique, modern jazz, street jazz, éveil",
    image:
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1600&q=80",
    description:
      "De l'éveil corporel des plus jeunes à la danse classique, en passant par le modern jazz, le street jazz et le jazz adulte, nos cours offrent un cadre joyeux et exigeant pour développer son geste et son écoute.",
    highlights: [
      "À partir de 3 ans",
      "Cours de 1h à 1h30",
      "Tarifs dégressifs à partir du 2ᵉ élève",
    ],
  },
  {
    slug: "peinture",
    name: "Peinture",
    tagline: "Aquarelle, huile et techniques mixtes",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1600&q=80",
    description:
      "Les ateliers de peinture mêlent aquarelle et huile, en sessions guidées de 2 à 3 heures. Que vous soyez débutant·e ou confirmé·e, vous trouverez un espace pour expérimenter et avancer à votre rythme.",
    highlights: [
      "Ateliers de 2h ou 3h",
      "Aquarelle, huile, techniques mixtes",
      "Pour adultes — débutants bienvenus",
    ],
  },
  {
    slug: "langues",
    name: "Langues étrangères",
    tagline: "Anglais et italien, en petits groupes",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80",
    description:
      "Cours d'anglais et d'italien en petits groupes conviviaux, axés sur la conversation et la pratique régulière. Une manière douce et efficace de progresser tout au long de l'année.",
    highlights: [
      "Anglais — à partir de 10 ans",
      "Italien — adultes",
      "Groupes restreints, conversation",
    ],
  },
];

export type NewsPost = {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const news: NewsPost[] = [
  {
    slug: "concert-printemps-2026",
    date: "12 mars 2026",
    category: "Événement",
    title: "Concert de printemps : les élèves sur scène",
    excerpt:
      "Rendez-vous le 28 mars à 19h pour le concert annuel — entrée libre, ouvert à tous.",
    body: [
      "Comme chaque année, les élèves de toutes les classes de musique se réunissent sur scène pour partager le travail d'une année. Au programme : piano, violon, guitare, batterie et un final tous ensemble avec le groupe de musique.",
      "Le concert aura lieu le 28 mars à 19h à la salle des fêtes. L'entrée est libre — venez nombreux soutenir vos enfants, vos proches et nos intervenants.",
    ],
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "atelier-aquarelle-mercredi-soir",
    date: "28 février 2026",
    category: "Atelier",
    title: "Nouvel atelier de peinture aquarelle",
    excerpt:
      "Sandrine ouvre un cours hebdomadaire le mercredi soir — places limitées à 8 participants.",
    body: [
      "À la demande de plusieurs adhérents, nous ouvrons un nouveau créneau d'aquarelle le mercredi soir, de 18h30 à 20h30, au Carrefour des associations.",
      "Pour conserver une attention individuelle, le groupe est limité à 8 participants. Les inscriptions sont ouvertes — premier arrivé, premier servi.",
    ],
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "assemblee-generale-2026",
    date: "10 février 2026",
    category: "Vie de l'asso",
    title: "Assemblée générale 2026",
    excerpt:
      "Bilan de l'année écoulée, perspectives, et élection du nouveau bureau. Tous les adhérents sont bienvenus.",
    body: [
      "L'assemblée générale annuelle de l'association se tiendra le 22 février à 18h. Au programme : bilan moral et financier, perspectives pour l'année à venir, et élection du nouveau bureau.",
      "Tous les adhérents sont invités à participer. C'est aussi un moment privilégié pour rencontrer l'équipe et proposer de nouvelles idées.",
    ],
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
  },
];

export type ScheduleEntry = {
  activity: string;
  category: ActivitySlug;
  day: string;
  time: string;
  duration: string;
  place: string;
  teacher: string;
};

export const schedule: ScheduleEntry[] = [
  { activity: "Danse : Classique", category: "danse", day: "Lundi", time: "17h00 – 21h00", duration: "1h15 ou 1h30", place: "École de danse", teacher: "Angélique" },
  { activity: "Danse : Classique", category: "danse", day: "Mercredi", time: "16h00 – 21h00", duration: "1h, 1h15 ou 1h30", place: "École de danse", teacher: "Angélique" },
  { activity: "Danse : Classique", category: "danse", day: "Jeudi", time: "17h00 – 19h30", duration: "1h15 ou 1h30", place: "École de danse", teacher: "Angélique" },
  { activity: "Danse : Jazz adulte", category: "danse", day: "Jeudi", time: "19h30 – 21h00", duration: "1h30", place: "École de danse", teacher: "Angélique" },
  { activity: "Danse : Modern Jazz", category: "danse", day: "Vendredi", time: "17h00 – 21h00", duration: "1h15 ou 1h30", place: "École de danse", teacher: "Clara" },
  { activity: "Danse : Street Jazz", category: "danse", day: "Mardi", time: "17h00 – 21h00", duration: "1h15 ou 1h30", place: "École de danse", teacher: "Marie" },
  { activity: "Danse : Éveil", category: "danse", day: "Mercredi", time: "10h00 – 12h00", duration: "1h", place: "École de danse", teacher: "Angélique" },
  { activity: "Atelier Peinture : Huile / Aquarelle", category: "peinture", day: "Lundi", time: "9h00 – 12h00", duration: "3h", place: "Carrefour des associations", teacher: "Madeleine" },
  { activity: "Atelier Peinture : Aquarelle", category: "peinture", day: "Lundi", time: "17h30 – 19h30", duration: "2h", place: "Carrefour des associations", teacher: "Madeleine" },
  { activity: "Atelier Peinture : Huile", category: "peinture", day: "Mercredi", time: "14h00 – 17h00", duration: "3h", place: "Carrefour des associations", teacher: "Madeleine" },
  { activity: "Langue étrangère : Italien", category: "langues", day: "Mardi", time: "14h30 – 15h45", duration: "1h15", place: "Carrefour des associations", teacher: "Mauricio" },
  { activity: "Langue étrangère : Italien", category: "langues", day: "Mardi", time: "16h00 – 18h30", duration: "1h15", place: "École de musique", teacher: "Marieangela" },
  { activity: "Langue étrangère : Anglais", category: "langues", day: "Mardi", time: "13h00 – 16h00", duration: "1h", place: "École de musique", teacher: "Steve" },
  { activity: "Musique : Piano", category: "musique", day: "Lundi", time: "16h00 – 20h00", duration: "30 min", place: "École de musique", teacher: "Florence" },
  { activity: "Musique : Piano", category: "musique", day: "Jeudi", time: "15h00 – 16h00", duration: "30 min", place: "École de musique", teacher: "Florence" },
  { activity: "Musique : Piano", category: "musique", day: "Mercredi", time: "9h30 – 18h00", duration: "30 min", place: "École de musique", teacher: "Monique" },
  { activity: "Musique : Violon", category: "musique", day: "Mercredi", time: "9h30 – 18h00", duration: "30 min", place: "École de musique", teacher: "Monique" },
  { activity: "Musique : Formation Musicale", category: "musique", day: "Mercredi", time: "12h00 – 14h00", duration: "2h", place: "École de musique", teacher: "Monique" },
  { activity: "Musique : Guitare acoustique ou électrique", category: "musique", day: "Lundi", time: "16h00 – 20h00", duration: "30 min", place: "École de musique", teacher: "Benoit" },
  { activity: "Musique : Guitare acoustique ou électrique", category: "musique", day: "Mardi", time: "16h00 – 19h00", duration: "30 min", place: "École de musique", teacher: "Benoit" },
  { activity: "Musique : Guitare acoustique ou électrique", category: "musique", day: "Mercredi", time: "11h00 – 17h00", duration: "30 min", place: "École de musique", teacher: "Benoit" },
  { activity: "Musique : Éveil musical", category: "musique", day: "Mercredi", time: "10h00 – 10h45", duration: "45 min", place: "École de musique", teacher: "Benoit" },
  { activity: "Musique : Batterie & percussions", category: "musique", day: "Samedi", time: "9h00 – 12h00", duration: "30 min", place: "École de musique", teacher: "Vincent" },
  { activity: "Musique : Saxophone", category: "musique", day: "Non défini", time: "Non défini", duration: "30 min", place: "École de musique", teacher: "Patrice" },
  { activity: "Musique : Groupe de Musique", category: "musique", day: "Samedi (tous les 15 jours)", time: "14h00 – 15h30", duration: "1h30", place: "École de musique", teacher: "Fred & Jordan" },
];

export type TarifEntry = {
  activity: string;
  category: ActivitySlug;
  weekly: string;
  price: string;
  age: string;
};

export const tarifs: TarifEntry[] = [
  { activity: "Danse : Classique, Jazz, Éveil", category: "danse", weekly: "1 élève · 1h à 1h30", price: "120 € / trimestre — hors commune 160 €", age: "À partir de 3 ans" },
  { activity: "Danse : Classique, Jazz, Éveil", category: "danse", weekly: "2ᵉ élève · 1h à 1h30", price: "96 € / trimestre — hors commune 128 €", age: "À partir de 3 ans" },
  { activity: "Danse : Classique, Jazz, Éveil", category: "danse", weekly: "3ᵉ élève · 1h à 1h30", price: "96 € / trimestre — hors commune 128 €", age: "À partir de 3 ans" },
  { activity: "Danse : Classique, Jazz, Éveil", category: "danse", weekly: "1 cours supplémentaire · 1h à 1h30", price: "66 € / trimestre — hors commune 89 €", age: "À partir de 3 ans" },
  { activity: "Danse : Classique, Jazz, Éveil", category: "danse", weekly: "2 cours supplémentaires · 1h à 1h30", price: "105 € / trimestre — hors commune 140 €", age: "À partir de 3 ans" },
  { activity: "Musique : Piano", category: "musique", weekly: "30 min", price: "150 € / trimestre — hors commune 200 €", age: "À partir de 6 ans" },
  { activity: "Musique : Violon", category: "musique", weekly: "30 min", price: "150 € / trimestre — hors commune 200 €", age: "À partir de 6 ans" },
  { activity: "Musique : Guitare", category: "musique", weekly: "30 min", price: "150 € / trimestre — hors commune 200 €", age: "À partir de 7 ans" },
  { activity: "Musique : Batterie et percussions", category: "musique", weekly: "30 min", price: "150 € / trimestre — hors commune 200 €", age: "À partir de 6 ans" },
  { activity: "Musique : Saxophone", category: "musique", weekly: "30 min", price: "150 € / trimestre — hors commune 200 €", age: "À partir de 10 ans" },
  { activity: "Musique : Formation Musicale", category: "musique", weekly: "1h", price: "50 € / trimestre — hors commune 80 €", age: "À partir de 6 ans" },
  { activity: "Musique : Éveil musical", category: "musique", weekly: "45 min", price: "66 € / trimestre — hors commune 95 €", age: "De 3 à 5 ans" },
  { activity: "Musique : Groupe de Musique", category: "musique", weekly: "1h30", price: "Gratuit", age: "Selon le niveau" },
  { activity: "Langue étrangère : Italien", category: "langues", weekly: "1h15", price: "70 € / trimestre — hors commune 95 €", age: "Adulte" },
  { activity: "Langue étrangère : Anglais", category: "langues", weekly: "1h", price: "90 € / trimestre — hors commune 120 €", age: "À partir de 10 ans" },
  { activity: "Atelier peinture : Aquarelle", category: "peinture", weekly: "2h", price: "90 € / trimestre — hors commune 120 €", age: "Adulte" },
  { activity: "Atelier peinture : Huile / Aquarelle", category: "peinture", weekly: "3h", price: "110 € / trimestre — hors commune 150 €", age: "Adulte" },
];

export const NAV_LINKS = [
  { href: "/about", label: "Qui sommes-nous" },
  { href: "/activites", label: "Activités" },
  { href: "/horaires", label: "Horaires" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
] as const;
