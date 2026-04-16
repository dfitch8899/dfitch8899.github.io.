export interface FreelanceSite {
  name: string;
  location: string;
  category: string;
  palette: string[]; // 2-3 hex colors
  accentLabel: string; // short brand vibe descriptor
  url?: string; // live demo url if available
  batch: "athens" | "belpre" | "bonus";
}

export const freelanceSites: FreelanceSite[] = [
  // ── Athens batch ──────────────────────────────────────────────────
  {
    name: "Smiling Skull Saloon",
    location: "Athens, OH",
    category: "Dive Bar",
    palette: ["#0a0a0a", "#cc1a1a", "#b84a0a"],
    accentLabel: "Dark · Blood Red · Biker",
    batch: "athens",
  },
  {
    name: "Uptown Dog",
    location: "Athens, OH",
    category: "Pet Hotel & Grooming",
    palette: ["#f5f0e8", "#7a9e7e", "#c07a50"],
    accentLabel: "Cream · Sage · Boutique",
    batch: "athens",
  },
  {
    name: "Stephen's",
    location: "Athens, OH",
    category: "Cocktail Bar",
    palette: ["#0d0b09", "#c49a28", "#1a1208"],
    accentLabel: "Near-Black · Amber · Speakeasy",
    batch: "athens",
  },
  {
    name: "Casa Nueva",
    location: "Athens, OH",
    category: "Cantina & Co-op",
    palette: ["#b85c38", "#d4a017", "#2d5a27"],
    accentLabel: "Terra Cotta · Gold · Bohemian",
    batch: "athens",
  },
  {
    name: "Athena Cinema",
    location: "Athens, OH",
    category: "Art House Cinema",
    palette: ["#0a0a0a", "#6b1a2a", "#c9a227"],
    accentLabel: "True Black · Burgundy · Gold",
    batch: "athens",
  },
  {
    name: "Bagel Street Deli",
    location: "Athens, OH",
    category: "Deli",
    palette: ["#f5f0e0", "#d4a017", "#8b1a1a"],
    accentLabel: "Cream · Mustard · Punchy Red",
    batch: "athens",
  },

  // ── Belpre / Washington County batch ─────────────────────────────
  {
    name: "Dragon House",
    location: "Belpre, OH",
    category: "Chinese Restaurant",
    palette: ["#0a0a0a", "#8b0000", "#1a5c3a"],
    accentLabel: "Black · Ruby · Jade",
    batch: "belpre",
  },
  {
    name: "Q-Wagon BBQ",
    location: "Belpre, OH",
    category: "BBQ Food Truck",
    palette: ["#1a0a00", "#c44b0a", "#f5c842"],
    accentLabel: "Charcoal · Ember · Smoke Yellow",
    batch: "belpre",
  },
  {
    name: "Village Cakery",
    location: "Vincent, OH",
    category: "Bakery",
    palette: ["#fdf6ee", "#d4789a", "#8b5e3c"],
    accentLabel: "Warm White · Dusty Rose · Mocha",
    batch: "belpre",
  },
  {
    name: "Neff's Country Loft",
    location: "Belpre area, OH",
    category: "Quilt & Fabric Shop",
    palette: ["#f5ece0", "#8b6914", "#4a3728"],
    accentLabel: "Linen · Harvest Gold · Walnut",
    batch: "belpre",
  },
  {
    name: "Boathouse BBQ",
    location: "Belpre, OH",
    category: "BBQ Restaurant",
    palette: ["#0d1a0d", "#8b2500", "#c49a28"],
    accentLabel: "Dark Green · Rust · Gold",
    batch: "belpre",
  },
  {
    name: "Der Dog Haus",
    location: "Washington County, OH",
    category: "Hot Dog Stand",
    palette: ["#1a0a00", "#d44000", "#f5c842"],
    accentLabel: "Dark · Red-Orange · Mustard",
    batch: "belpre",
  },
  {
    name: "The Ohio Redwood",
    location: "Washington County, OH",
    category: "American Diner",
    palette: ["#1a0505", "#8b1a1a", "#c49a28"],
    accentLabel: "Deep Burgundy · Amber · Heritage",
    batch: "belpre",
  },
  {
    name: "Belpre Hardware",
    location: "Belpre, OH",
    category: "Hardware Store",
    palette: ["#0a0d1a", "#1a4a8b", "#c44b0a"],
    accentLabel: "Navy · Steel Blue · Orange",
    batch: "belpre",
  },
  {
    name: "Blennerhassett Hotel",
    location: "Parkersburg, WV",
    category: "Historic Hotel",
    palette: ["#0d0a05", "#2a1a0a", "#c49a28"],
    accentLabel: "Near-Black · Dark Wood · Gold",
    batch: "belpre",
  },
  {
    name: "Napoli's Pizza",
    location: "Washington County, OH",
    category: "Pizza Restaurant",
    palette: ["#1a0000", "#8b1a00", "#f5c842"],
    accentLabel: "Dark · Tomato Red · Parmesan",
    batch: "belpre",
  },
  {
    name: "Schultz's Restaurant",
    location: "Belpre, OH",
    category: "Family Diner",
    palette: ["#fdf6ee", "#2a4a8b", "#c44b0a"],
    accentLabel: "Cream · Navy · Warm Orange",
    batch: "belpre",
  },
  {
    name: "Little Caesars Belpre",
    location: "Belpre, OH",
    category: "Pizza Chain",
    palette: ["#1a0000", "#8b1a00", "#f5a800"],
    accentLabel: "Dark · Deep Red · Caesar Gold",
    batch: "belpre",
  },

  // ── Bonus ─────────────────────────────────────────────────────────
  {
    name: "Meigs County Sheriff",
    location: "Pomeroy, OH",
    category: "Law Enforcement",
    palette: ["#08090c", "#1b2a4a", "#c4952a"],
    accentLabel: "Near-Black · Navy · Sheriff Gold",
    batch: "bonus",
  },
];

export const BATCH_LABELS: Record<FreelanceSite["batch"], string> = {
  athens: "Athens, OH",
  belpre: "Belpre / Washington County",
  bonus: "Bonus",
};
